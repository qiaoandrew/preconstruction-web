import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Listing } from '@/types/types';
import Carousel from '../layout/Carousel';
import ListingCard from '../cards/ListingCard';

type ListingsCarouselProps = {
  title: string;
  listings: Listing[];
  route: string;
};

export default function ListingsCarousel({
  title,
  listings,
  route,
}: ListingsCarouselProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <section className='mb-section'>
      <div className='mx-container-sm mb-5 flex items-center justify-between'>
        <h2 className='h2'>{title}</h2>
        <Link
          href={route}
          className='sm:text-base font-display text-sm text-blue1 underline underline-offset-4 md:text-lg'
        >
          View More
        </Link>
      </div>

      <Carousel gap='gap-6'>
        {listings.map((listing) => (
          <ListingCard
            title={listing.title}
            subtitle={listing.subtitle}
            priceString={listing.priceString}
            datePosted={listing.datePosted}
            image={listing.images[0]}
            route={`${route}/listings/${listing.id}`}
            placement='carousel'
            key={listing.id}
          />
        ))}
      </Carousel>
    </section>
  );
}
