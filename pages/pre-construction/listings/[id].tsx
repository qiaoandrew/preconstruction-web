import { GetServerSideProps } from 'next';
import { getPreConstructionListings } from '@/util/firebase/preConstructionListings';
import { ListingType } from '@/types/types';
import ListingPage from '@/components/pages/ListingPage';

export default function PreConstructionListing({
  listing,
}: {
  listing: ListingType;
}) {
  return <ListingPage type='pre-construction' {...listing} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const listings = await getPreConstructionListings();
  const listing = listings.find((listing) => listing.id === params?.id);

  return {
    props: {
      listing,
    },
  };
};
