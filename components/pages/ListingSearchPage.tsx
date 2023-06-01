import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useSearchResults from '@/hooks/useSearchResults';
import Header from '../navigation/Header';
import SearchBar from '../UI/SearchBar';
import Filter from '../UI/Filter';
import ListingCard from '../cards/ListingCard';
import ListingsMap from '../map/ListingsMap';
import LoadingSpinner from '../UI/LoadingSpinner';
import { ListingGroupType } from '@/types/types';
import { ArrowLeft, ArrowRight, Map, X } from 'react-feather';
import { COLORS } from '@/constants/colors';

type ListingSearchPageProps = {
  title: string;
  filters: any;
  type: ListingGroupType;
  searchPlaceholder: string;
  filterValues: any;
  setFilterValues: any;
};

export default function ListingSearchPage({
  title,
  filters,
  type,
  searchPlaceholder,
  filterValues,
  setFilterValues,
}: ListingSearchPageProps) {
  const router = useRouter();
  const { query } = router.query;

  const [searchQuery, setSearchQuery] = useState(query ? query.toString() : '');
  const [showFilter, setShowFilter] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [showMobileMap, setShowMobileMap] = useState(false);

  const listingsContainerRef = useRef<HTMLDivElement>(null);

  const { loading, searchResults } = useSearchResults(
    type,
    searchQuery,
    pageNum,
    12,
    filterValues
  );

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPageNum(1);
  };

  const handleIncrementPage = () => {
    listingsContainerRef.current?.scrollTo(0, 0);
    if (searchResults.length === 12) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  const handleDecrementPage = () => {
    listingsContainerRef.current?.scrollTo(0, 0);
    if (pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  return (
    <>
      <div className='h-100dvh flex flex-col'>
        <Header />
        <div className='ml-container-lg grid flex-grow overflow-y-hidden pt-8 xl:grid-cols-2 xl:gap-8 xl:pt-14'>
          <div className='flex flex-col overflow-y-hidden'>
            <h2 className='h2 mb-3'>{title}</h2>
            <div className='relative mb-6 xl:mb-9'>
              <SearchBar
                searchQuery={searchQuery}
                handleChangeQuery={handleChangeQuery}
                placeholder={searchPlaceholder}
                showFilterButton={true}
                filterButtonOnClick={() =>
                  setShowFilter((prevShowFilter) => !prevShowFilter)
                }
              />

              <Filter
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                filters={filters}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                setPageNum={setPageNum}
              />
            </div>

            <div
              ref={listingsContainerRef}
              className='no-scrollbar flex-grow overflow-y-scroll pb-24 xl:pb-28'
            >
              {loading ? (
                <LoadingSpinner />
              ) : searchResults.length > 0 ? (
                <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 4xl:grid-cols-3'>
                  {searchResults.map(({ type, listing }) => (
                    <ListingCard
                      title={listing.title}
                      subtitle={listing.subtitle}
                      priceString={listing.priceString}
                      datePosted={listing.datePosted}
                      image={listing.images[0]}
                      route={`/${type}/listings/${listing.id}`}
                      placement='search'
                      key={listing.id}
                    />
                  ))}
                </div>
              ) : (
                <p className='text-base font-medium text-blue1 lg:text-lg'>
                  No listings match your search!
                </p>
              )}
            </div>
          </div>

          <div className='hidden overflow-y-hidden xl:block'>
            <ListingsMap recommendations={searchResults} />
          </div>
        </div>
      </div>

      <div className='absolute inset-x-5 bottom-2 flex items-center justify-between py-4 xs:inset-x-7 xl:inset-x-10'>
        <div className='flex justify-start gap-4'>
          <div
            onClick={handleDecrementPage}
            className={`transition-300 grid h-12 w-12 place-content-center rounded-md border border-blue1 bg-white hover:bg-grey1 ${
              pageNum === 1 ? 'opacity-40' : 'cursor-pointer'
            }`}
          >
            <ArrowLeft size={24} color={COLORS.blue1} />
          </div>
          <div
            onClick={handleIncrementPage}
            className={`transition-300 grid h-12 w-12 place-content-center rounded-md border border-blue1 bg-white hover:bg-grey1 ${
              searchResults.length === 12 ? 'cursor-pointer' : 'opacity-40'
            }`}
          >
            <ArrowRight size={24} color={COLORS.blue1} />
          </div>
        </div>

        <div
          onClick={() => setShowMobileMap(true)}
          className='bg-gradient grid h-12 w-12 cursor-pointer place-content-center rounded-md xl:hidden'
        >
          <Map color={COLORS.white} size={24} />
        </div>
      </div>
      {showMobileMap && (
        <div className='absolute inset-0 z-50 xl:hidden'>
          <div
            onClick={() => setShowMobileMap(false)}
            className='transition-300 absolute right-5 top-5 z-50 grid h-12 w-12 cursor-pointer place-content-center rounded-md border border-blue1 bg-white hover:bg-grey1'
          >
            <X color={COLORS.blue1} size={24} />
          </div>

          <ListingsMap recommendations={searchResults} />
        </div>
      )}
    </>
  );
}
