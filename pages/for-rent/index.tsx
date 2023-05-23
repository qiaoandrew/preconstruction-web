import { useState } from 'react';
import SEO from '@/components/SEO/SEO';
import ListingSearchPage from '@/components/pages/ListingSearchPage';
import { FOR_RENT_FILTERS } from '@/constants/filters';

export default function ForRent() {
  const [filterValues, setFilterValues] = useState<any>({
    price: [1, 10000000],
    bedrooms: '',
    bathrooms: '',
    parking: '',
    size: [1, 10000],
  });

  return (
    <>
      <SEO title='Search For Rent | REMAX Metropolis' />
      <ListingSearchPage
        title='For Rent'
        filters={FOR_RENT_FILTERS}
        type='for-rent'
        searchPlaceholder='Search for rent...'
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </>
  );
}
