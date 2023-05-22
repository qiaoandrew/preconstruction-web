import axios from 'axios';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Recommendation } from './useRecommendations';

export default function useSavedListings(searchQuery: string) {
  const [savedListings, setSavedListings] = useState<Recommendation[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const preConstructionListings = useSelector(
    (state: RootState) => state.preConstructionListings.preConstructionListings
  );

  useEffect(() => {
    const savedListingsQueryRef = query(
      collection(db, 'savedListings'),
      where('uid', '==', user?.uid || ''),
      limit(1)
    );

    const unsubscribe = onSnapshot(savedListingsQueryRef, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        const savedListings = doc.data().savedListings;

        for (const { id, type } of savedListings) {
          if (type === 'pre-construction') {
            const listing = preConstructionListings.find(
              (listing) => listing.id === id
            );

            if (listing) {
              setSavedListings((prevSavedListings) => {
                if (
                  prevSavedListings.some(({ listing }) => listing.id === id)
                ) {
                  return prevSavedListings;
                }

                return [...prevSavedListings, { listing, type }];
              });
            }
          } else {
            const { data: listing } = await axios.get(`/api/listings/${id}`);

            if (listing) {
              setSavedListings((prevSavedListings) => {
                if (
                  prevSavedListings.some(({ listing }) => listing.id === id)
                ) {
                  return prevSavedListings;
                }
                return [...prevSavedListings, { listing, type }];
              });
            }
          }
        }
      });
    });

    return () => unsubscribe();
  }, [user?.uid, preConstructionListings]);

  return searchQuery
    ? savedListings.filter(
        ({ listing }) =>
          listing?.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          listing?.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : savedListings;
}
