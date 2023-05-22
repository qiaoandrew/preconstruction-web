import { useState } from 'react';
import SEO from '@/components/SEO/SEO';
import ListingSearchPage from '@/components/pages/ListingSearchPage';
import { FOR_SALE_FILTERS } from '@/constants/filters';

export default function ForSale() {
  const [filterValues, setFilterValues] = useState<any>({
    price: [0, 10000000],
    bedrooms: new Set(),
    bathrooms: new Set(),
    parking: new Set(),
    size: [0, 10000],
  });

  return (
    <>
      <SEO title='Search For Sale | REMAX Metropolis' />
      <ListingSearchPage
        title='For Sale'
        filters={FOR_SALE_FILTERS}
        type='for-sale'
        searchPlaceholder='Search for sale...'
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </>
  );
}
