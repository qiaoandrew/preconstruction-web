import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  ListingType,
  ListingGroupType,
  ListingRecommendationType,
} from '@/types/types';

export default function useRecommendations(
  type: ListingGroupType,
  query: string,
  pageNum: number,
  resultsPerPage: number,
  filterValues?: any
) {
  const [recommendations, setRecommendations] = useState<
    ListingRecommendationType[]
  >([]);
  const preConstructionListings = useSelector(
    (state: RootState) => state.preConstructionListings.preConstructionListings
  );

  const fetchRecommendations = useCallback(
    async (apiUrl: string, type: ListingGroupType) => {
      try {
        const { data: listings } = await axios.get<ListingType[]>(apiUrl);

        setRecommendations(
          listings.map((listing) => ({
            listing,
            type,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const debouncedGetRecommendations = useRef(
    debounce(fetchRecommendations, 300)
  );

  useEffect(() => {
    if (type === 'pre-construction') {
      const filteredPreConstructionListings = filterPreConstructionListings(
        preConstructionListings,
        query,
        filterValues,
        pageNum,
        resultsPerPage
      );

      setRecommendations(
        filteredPreConstructionListings.map((listing) => ({
          listing,
          type: 'pre-construction',
        }))
      );
    } else {
      debouncedGetRecommendations.current(
        getAPIUrl(query, type, pageNum, resultsPerPage, filterValues),
        type
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

function filterPreConstructionListings(
  preConstructionListings: ListingType[],
  query: string,
  filterValues: any,
  pageNum: number,
  resultsPerPage: number
) {
  let filteredPreConstructionListings = preConstructionListings;

  if (query) {
    filteredPreConstructionListings = filteredPreConstructionListings.filter(
      (listing) =>
        listing.title.toLowerCase().startsWith(query.toLowerCase()) ||
        listing.subtitle.includes(query.toLowerCase())
    );
  }

  if (filterValues.price) {
    filteredPreConstructionListings = filteredPreConstructionListings
      .filter((listing) => Number(listing.priceLow) >= filterValues.price.at(0))
      .filter(
        (listing) => Number(listing.priceHigh) <= filterValues.price.at(1)
      );
  }

  if (filterValues.occupancy.size > 0) {
    filteredPreConstructionListings = filteredPreConstructionListings.filter(
      (listing) => filterValues.occupancy.has(listing.occupancy)
    );
  }

  if (filterValues.status.size > 0) {
    filteredPreConstructionListings = filteredPreConstructionListings.filter(
      (listing) => filterValues.status.has(listing.status)
    );
  }

  filteredPreConstructionListings = filteredPreConstructionListings.slice(
    pageNum * resultsPerPage - resultsPerPage,
    pageNum * resultsPerPage
  );

  return filteredPreConstructionListings;
}

function getAPIUrl(
  query: string,
  type: ListingGroupType,
  pageNum: number,
  resultsPerPage: number,
  filterValues?: any
): string {
  let url = `/api/listings/search?${query ? `query=${query}&` : ''}type=${
    type === 'for-sale' ? 'sale' : 'lease'
  }&pageNum=${pageNum}&resultsPerPage=${resultsPerPage}`;

  if (filterValues.price) {
    url += `&minPrice=${filterValues.price.at(
      0
    )}&maxPrice=${filterValues.price.at(1)}`;
  }

  if (filterValues.bedrooms) {
    url += `&minBeds=${filterValues.bedrooms.at(0)}`;
  }

  if (filterValues.bathrooms) {
    url += `&minBaths=${filterValues.bathrooms.at(0)}`;
  }

  if (filterValues.parking) {
    url += `&minParkingSpaces=${filterValues.parking.at(0)}`;
  }

  if (filterValues.size) {
    url += `&minSqft=${filterValues.size.at(0)}&maxSqft=${filterValues.size.at(
      1
    )}`;
  }

  return url;
}
