import { useState } from 'react';
import SEO from '@/components/SEO/SEO';
import ListingSearchPage from '@/components/pages/ListingSearchPage';
import { FOR_SALE_FILTERS } from '@/constants/filters';

export default function ForSale() {
  const [filterValues, setFilterValues] = useState<any>({
    sortBy: '',
    price: [1, 10000000],
    bedrooms: '',
    bathrooms: '',
    parking: '',
    size: [1, 10000],
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
