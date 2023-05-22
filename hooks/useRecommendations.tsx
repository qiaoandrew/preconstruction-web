import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Listing } from '@/types/types';

export type Recommendation = {
  type: 'pre-construction' | 'sale' | 'rent';
  listing: Listing;
};

export default function useRecommendations(
  type: 'pre-construction' | 'sale' | 'rent',
  query: string,
  pageNum: number,
  resultsPerPage: number,
  filterValues?: any
) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const preConstructionListings = useSelector(
    (state: RootState) => state.preConstructionListings.preConstructionListings
  );

  const fetchRecommendations = useCallback(
    async (
      query: string,
      type: 'pre-construction' | 'sale' | 'rent',
      pageNum: number,
      resultsPerPage: number,
      filterValues?: any
    ) => {
      console.log(filterValues);

      try {
        const { data: listings } = await axios.get<Listing[]>(
          `/api/listings/search?${query ? `query=${query}&` : ''}type=${
            type === 'sale' ? 'sale' : 'lease'
          }&pageNum=${pageNum}&resultsPerPage=${resultsPerPage}`
        );

        setRecommendations(
          listings.map((listing) => ({
            listing,
            type,
          }))
        );
      } catch (error) {
        console.log('Error occured!', error);
      }
    },
    []
  );

  const debouncedGetRecommendations = useRef(
    debounce(fetchRecommendations, 300)
  );

  useEffect(() => {
    if (type === 'pre-construction') {
      let queryFilteredListings = preConstructionListings;

      if (query) {
        queryFilteredListings = queryFilteredListings.filter(
          (listing) =>
            listing.title.toLowerCase().startsWith(query.toLowerCase()) ||
            listing.subtitle.includes(query.toLowerCase())
        );
      }

      if (filterValues) {
        if (filterValues.price.at(0)) {
          queryFilteredListings = queryFilteredListings.filter(
            (listing) => Number(listing.priceLow) >= filterValues.price.at(0)
          );
        }

        if (filterValues.price.at(1)) {
          queryFilteredListings = queryFilteredListings.filter(
            (listing) => Number(listing.priceHigh) <= filterValues.price.at(1)
          );
        }

        if (filterValues.occupancy.size > 0) {
          queryFilteredListings = queryFilteredListings.filter((listing) =>
            filterValues.occupancy.has(listing.occupancy)
          );
        }

        if (filterValues.status.size > 0) {
          queryFilteredListings = queryFilteredListings.filter((listing) =>
            filterValues.status.has(listing.status)
          );
        }
      }

      queryFilteredListings = queryFilteredListings.slice(
        pageNum * resultsPerPage - resultsPerPage,
        pageNum * resultsPerPage
      );

      setRecommendations(
        queryFilteredListings.map((listing) => ({
          listing,
          type: 'pre-construction',
        }))
      );
    } else {
      debouncedGetRecommendations.current(
        query,
        type,
        pageNum,
        resultsPerPage,
        filterValues
      );
    }
  }, [
    query,
    type,
    preConstructionListings,
    debouncedGetRecommendations,
    pageNum,
    resultsPerPage,
    filterValues,
  ]);

  return recommendations;
}
