import { Fragment, useState } from 'react';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import useSearchResults from '@/hooks/useSearchResults';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import Footer from '@/components/navigation/Footer';
import { ListingSearchResultType } from '@/types/types';
import Button from '@/components/UI/Button';

export default function CompareListings() {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [query3, setQuery3] = useState('');

  const [showResults1, setShowResults1] = useState(false);
  const [showResults2, setShowResults2] = useState(false);
  const [showResults3, setShowResults3] = useState(false);

  const [selectedListing1, setSelectedListing1] =
    useState<ListingSearchResultType | null>(null);
  const [selectedListing2, setSelectedListing2] =
    useState<ListingSearchResultType | null>(null);
  const [selectedListing3, setSelectedListing3] =
    useState<ListingSearchResultType | null>(null);

  const { loading: loading1, searchResults: searchResults1 } = useSearchResults(
    'all',
    query1,
    1,
    12
  );
  const { loading: loading2, searchResults: searchResults2 } = useSearchResults(
    'all',
    query2,
    1,
    12
  );
  const { loading: loading3, searchResults: searchResults3 } = useSearchResults(
    'all',
    query3,
    1,
    12
  );

  return (
    <>
      <SEO title='Compare Listings | REMAX Metropolis' />
      <Header />
      <div className='mx-container-sm mb-section mt-16 min-h-[60vh] md:text-center lg:mt-24'>
        <h1 className='mb-3 text-center sm:mb-4 xl:mb-5'>
          <span className='h1'>Compare Listings</span>
        </h1>
        <p className='mb-9 text-center text-md text-blue1 sm:text-lg lg:mb-12 lg:text-xl'>
          Select listings and compare them side by side.
        </p>
        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:gap-10 xl:grid-cols-3 2xl:gap-12'>
          <ListingSearch
            query={query1}
            setQuery={setQuery1}
            showResults={showResults1}
            setShowResults={setShowResults1}
            selectedListing={selectedListing1}
            setSelectedListing={setSelectedListing1}
            loading={loading1}
            searchResults={searchResults1}
          />

          <ListingSearch
            query={query2}
            setQuery={setQuery2}
            showResults={showResults2}
            setShowResults={setShowResults2}
            selectedListing={selectedListing2}
            setSelectedListing={setSelectedListing2}
            loading={loading2}
            searchResults={searchResults2}
          />

          <ListingSearch
            query={query3}
            setQuery={setQuery3}
            showResults={showResults3}
            setShowResults={setShowResults3}
            selectedListing={selectedListing3}
            setSelectedListing={setSelectedListing3}
            loading={loading3}
            searchResults={searchResults3}
            classes='hidden xl:block'
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

type ListingSearchProps = {
  query: string;
  setQuery: (query: string) => void;
  showResults: boolean;
  setShowResults: (showResults: boolean) => void;
  selectedListing: ListingSearchResultType | null;
  setSelectedListing: (selectedListing: ListingSearchResultType | null) => void;
  loading: boolean;
  searchResults: ListingSearchResultType[];
  classes?: string;
};

function ListingSearch({
  query,
  setQuery,
  showResults,
  setShowResults,
  selectedListing,
  setSelectedListing,
  loading,
  searchResults,
  classes,
}: ListingSearchProps) {
  const { listing, type } = selectedListing || {};

  return (
    <div className={`${classes}`}>
      <div className='relative'>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder='Search for listings...'
          className='w-full rounded-xs border border-blueGrey2 px-2.5 py-2 text-sm outline-none lg:rounded-sm lg:px-5 lg:py-3.5 lg:text-md'
        />

        <div
          className={`transition-300 no-scrollbar absolute inset-x-0 top-[calc(100%+24px)] max-h-[360px] overflow-y-scroll rounded-sm border border-blueGrey2 bg-white text-left lg:rounded-md ${
            showResults
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          {loading ? (
            <LoadingSpinner size={48} classes='py-6' />
          ) : searchResults.length > 0 ? (
            searchResults.map((searchResult, i) => (
              <>
                <div
                  onClick={() => {
                    setSelectedListing(searchResult);
                    setQuery(searchResult.listing.title);
                  }}
                  className='transition-300 cursor-pointer px-2.5 py-2 hover:bg-grey1 lg:px-5 lg:py-4'
                  key={searchResult.listing.id}
                >
                  <p className='mb-1 text-sm font-medium text-blue1 lg:text-lg'>
                    {searchResult.listing.title}
                  </p>
                  <p className='text-xs lg:text-md'>
                    {searchResult.listing.subtitle}
                  </p>
                </div>
                {i !== searchResults.length - 1 && (
                  <div className='border-b border-blueGrey2' />
                )}
              </>
            ))
          ) : (
            <p className='p-4 text-blue1'>No results found.</p>
          )}
        </div>
      </div>

      {listing && (
        <div className='flex flex-col text-left'>
          <img
            src={listing.images[0]}
            alt={listing.title}
            className='mb-6 mt-10 aspect-video rounded-xs object-cover lg:rounded-md'
          />
          <p className='mb-1 font-display text-lg font-bold text-blue1 md:text-xl 2xl:mb-2 2xl:text-2xl'>
            {listing.title}
          </p>
          <p className='mb-4 text-sm text-blueGrey1 md:mb-6 md:text-md 2xl:mb-8 2xl:text-lg'>
            {listing.subtitle}
          </p>
          {listing.tables &&
            listing.tables.map((table) => (
              <div className='mb-6 md:mb-10 2xl:mb-12' key={table.title}>
                <p className='mb-2 text-md font-medium text-blue1 md:mb-3 md:text-lg 2xl:mb-4'>
                  {table.title}
                </p>
                <div>
                  {table.keyValueData &&
                    Object.entries(table.keyValueData).map(
                      ([key, value], i) => (
                        <Fragment key={key}>
                          <p className='text-sm text-blue1 md:text-md'>
                            {key}:{' '}
                            <span className='text-blueGrey1'>{value}</span>
                          </p>
                          {i !==
                            Object.keys(table.keyValueData as any).length -
                              1 && (
                            <div className='my-2 border-b border-blueGrey2 md:my-3' />
                          )}
                        </Fragment>
                      )
                    )}

                  {table.listData &&
                    table.listData.map((listItem, i) => (
                      <Fragment key={listItem}>
                        <p className='text-sm text-blueGrey1 md:text-md'>
                          {listItem}
                        </p>
                        {table.listData && i !== table.listData.length - 1 && (
                          <div className='my-2 border-b border-blueGrey2 md:my-3' />
                        )}
                      </Fragment>
                    ))}
                </div>
              </div>
            ))}
          <Button
            type='route'
            route={`/${type}/listings/${listing.id}`}
            hierarchy='primary'
            padding='py-3'
            classes='w-full text-center'
          >
            View Listing
          </Button>
        </div>
      )}
    </div>
  );
}
