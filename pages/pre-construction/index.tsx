import { useState, useRef } from 'react';
import useRecommendations, { Recommendation } from '@/hooks/useRecommendations';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import SearchBar from '@/components/UI/SearchBar';
import ListingCard from '@/components/cards/ListingCard';
import { ArrowLeft, ArrowRight, Map, XCircle } from 'react-feather';
import { COLORS } from '@/constants/colors';
import ListingsMap from '@/components/map/ListingsMap';
import Filter from '@/components/UI/Filter';
import { PRE_CONSTRUCTION_FILTERS } from '@/constants/filters';

export default function PreConstruction() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [filterValues, setFilterValues] = useState<any>({
    price: [0, 10000000],
    occupancy: new Set(),
    status: new Set(),
  });

  const listingsContainerRef = useRef<HTMLDivElement>(null);

  const recommendations = useRecommendations(
    'pre-construction',
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
    if (recommendations.length === 12) {
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
      <SEO title='Search Pre-Construction | REMAX Metropolis' />
      <div className='h-100dvh flex flex-col'>
        <Header />
        <div className='ml-container-lg grid flex-grow overflow-y-hidden pt-8 xl:grid-cols-2 xl:gap-8 xl:pt-14'>
          <div className='flex flex-col overflow-y-hidden'>
            <h1 className='h2 mb-3'>Pre-Construction</h1>

            <div className='relative mb-6 xl:mb-9'>
              <SearchBar
                searchQuery={searchQuery}
                handleChangeQuery={handleChangeQuery}
                placeholder='Search pre-construction'
                showFilterButton={true}
                filterButtonOnClick={() =>
                  setShowFilter((prevShowFilter) => !prevShowFilter)
                }
              />

              <Filter
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                filters={PRE_CONSTRUCTION_FILTERS}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                setPageNum={setPageNum}
              />
            </div>

            <div
              ref={listingsContainerRef}
              className='no-scrollbar flex-grow overflow-y-scroll pb-24 xl:pb-28'
            >
              <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 4xl:grid-cols-3'>
                {recommendations.length > 0 ? (
                  recommendations.map(({ type, listing }) => (
                    <ListingCard
                      title={listing.title}
                      subtitle={listing.subtitle}
                      priceString={listing.priceString}
                      datePosted={listing.datePosted}
                      image={listing.images[0]}
                      route={`/${type}/${listing.id}`}
                      placement='search'
                      key={listing.id}
                    />
                  ))
                ) : (
                  <p className='text-base font-medium text-blue1 lg:text-lg'>
                    No listings match your search!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='hidden overflow-y-hidden xl:block'>
            <ListingsMap recommendations={recommendations} />
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
              recommendations.length === 12 ? 'cursor-pointer' : 'opacity-40'
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
          <XCircle
            color={COLORS.blue1}
            size={36}
            onClick={() => setShowMobileMap(false)}
            className='absolute right-5 top-5 z-50 cursor-pointer'
          />
          <ListingsMap recommendations={recommendations} />
        </div>
      )}
    </>
  );
}
