/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import Link from 'next/link';
import { ListingRecommendationType } from '@/types/types';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

type RecommendationsProps = {
  loading: boolean;
  recommendations: ListingRecommendationType[];
  isRecommendationsVisible: boolean;
  searchBarHeight: number;
};

export default function HeroRecommendations({
  loading,
  recommendations,
  isRecommendationsVisible,
  searchBarHeight,
}: RecommendationsProps) {
  return (
    <div
      className={`transition-300 absolute inset-x-0 z-10 ${
        isRecommendationsVisible
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      style={{ top: `calc(${searchBarHeight}px + 28px)` }}
    >
      <div className='no-scrollbar transition-300 mx-auto max-h-[300px] max-w-[560px] overflow-y-scroll overscroll-y-contain rounded-xl border border-blueGrey2 bg-white text-left lg:max-w-[720px]'>
        {loading ? (
          <LoadingSpinner size={24} classes='my-6' />
        ) : recommendations.length > 0 ? (
          recommendations.map(
            ({ type, listing }: ListingRecommendationType, i: number) => (
              <Fragment key={listing.id}>
                <Link
                  href={`/${type}/listings/${listing.id}`}
                  className='transition-300 flex items-center justify-between hover:bg-grey1'
                >
                  <div className='flex flex-1 items-center justify-between gap-6 px-4 py-2 md:py-4'>
                    <div>
                      <p className='text-base mb-1.5 font-display font-bold text-blue1 lg:text-lg'>
                        {listing.title}
                      </p>
                      <p className='lg:text-base line-clamp-1 font-sans text-sm text-blueGrey1'>
                        {listing.subtitle}
                      </p>
                    </div>

                    <p className='text-base hidden font-medium text-blue1 md:block'>
                      {listing.priceString}
                    </p>
                  </div>

                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    width={150}
                    height={100}
                    className='h-20 w-32 object-cover md:h-24 md:w-44'
                  />
                </Link>
                {i !== recommendations.length - 1 && (
                  <div className='border-b border-blueGrey2' />
                )}
              </Fragment>
            )
          )
        ) : (
          <p className='text-base p-4 font-medium text-blue1 lg:p-6'>
            No listings match your search!
          </p>
        )}
      </div>
    </div>
  );
}
