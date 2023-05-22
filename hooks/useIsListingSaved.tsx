import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ListingGroupType } from '@/types/types';

type SavedListing = {
  type: ListingGroupType;
  id: string;
};

export default function useIsListingSaved(type: ListingGroupType, id: string) {
  const [isSaved, setIsSaved] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const queryRef = query(
      collection(db, 'savedListings'),
      where('uid', '==', user?.uid || '')
    );

    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const savedListings = doc.data().savedListings;

        const isSaved = savedListings.some((savedListing: SavedListing) => {
          return savedListing.id === id && savedListing.type === type;
        });

        setIsSaved(isSaved);
      });
    });

    return () => unsubscribe();
  }, [user, id, type]);

  const toggleSave = async () => {
    const savedListingsRef = collection(db, 'savedListings');
    const queryRef = query(savedListingsRef, where('uid', '==', user?.uid));
    const querySnapshot = await getDocs(queryRef);

    if (!querySnapshot.empty) {
      const savedListingsDoc = querySnapshot.docs[0];
      const savedListings = savedListingsDoc.data().savedListings;

      const isSaved = savedListings.some(
        (savedListing: SavedListing) =>
          savedListing.id === id && savedListing.type === type
      );

      await updateDoc(savedListingsDoc.ref, {
        savedListings: isSaved
          ? arrayRemove({ id, type })
          : arrayUnion({ id, type }),
      });
    } else {
      await addDoc(savedListingsRef, {
        uid: user?.uid,
        savedListings: [{ id, type }],
      });
    }
  };

  return { isSaved, toggleSave };
}
