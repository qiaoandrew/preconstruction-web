import axios from 'axios';
import { GetServerSideProps } from 'next';
import ListingPage from '@/components/pages/ListingPage';
import { ListingType } from '@/types/types';

type ForRentListingProps = {
  listing: ListingType;
};

export default function ForRentListing({ listing }: ForRentListingProps) {
  return <ListingPage type='for-rent' {...listing} />;
}

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: listing } = await axios.get(
    `${NEXT_PUBLIC_BASE_URL}/api/listings/${params?.id}`
  );

  return {
    props: {
      listing,
    },
  };
};
