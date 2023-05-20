import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Listing } from '@/types/types';

export type Recommendation = {
  type: string;
  listing: Listing;
};

export default function useRecommendations(type: string, query: string) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const preConstructionListings = useSelector(
    (state: RootState) => state.preConstructionListings.preConstructionListings
  );

  const fetchRecommendations = useCallback(
    async (query: string, type: string) => {
      const { data: listings } = await axios.get<Listing[]>(
        `/api/listings/search?${
          query ? `query=${query}&` : ''
        }type=${type}&pageNum=1&resultsPerPage=10`
      );

      setRecommendations(
        listings.map((listing) => ({
          listing,
          type,
        }))
      );
    },
    []
  );

  const debouncedGetRecommendations = useRef(
    debounce(fetchRecommendations, 300)
  );

  useEffect(() => {
    if (type === 'pre-construction') {
      if (query === '') {
        setRecommendations(
          preConstructionListings
            .slice(0, 10)
            .map((listing) => ({ listing, type: 'pre-construction' }))
        );
      } else {
        setRecommendations(
          preConstructionListings
            .filter(
              (listing) =>
                listing.title.toLowerCase().startsWith(query.toLowerCase()) ||
                listing.subtitle.includes(query.toLowerCase())
            )
            .slice(0, 10)
            .map((listing) => ({ listing, type: 'pre-construction' }))
        );
      }
    } else {
      debouncedGetRecommendations.current(query, type);
    }
  }, [query, type, preConstructionListings, debouncedGetRecommendations]);

  return recommendations;
}
