import { useState } from 'react';
import SEO from '@/components/SEO/SEO';
import ListingSearchPage from '@/components/pages/ListingSearchPage';
import { PRE_CONSTRUCTION_FILTERS } from '@/constants/filters';

export default function PreConstruction() {
  const [filterValues, setFilterValues] = useState<any>({
    price: [0, 10000000],
    occupancy: new Set(),
    status: new Set(),
  });

  return (
    <>
      <SEO title='Search Pre-Construction | REMAX Metropolis' />
      <ListingSearchPage
        title='Pre-Construction'
        filters={PRE_CONSTRUCTION_FILTERS}
        type='pre-construction'
        searchPlaceholder='Search pre-construction...'
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </>
  );
}
