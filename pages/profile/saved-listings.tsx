import { useState } from 'react';
import useSavedListings from '@/hooks/useSavedListings';
import SEO from '@/components/SEO/SEO';
import SearchPage from '@/components/pages/SearchPage';

export default function SavedListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const savedListings = useSavedListings(searchQuery);

  return (
    <>
      <SEO title='Saved Listings | REMAX Metropolis' />
      <SearchPage
        title='Saved Listings'
        itemType='listings'
        searchQuery={searchQuery}
        handleChangeQuery={(e) => setSearchQuery(e.target.value)}
        items={savedListings}
        placeholder='Search saved listings...'
      />
    </>
  );
}
