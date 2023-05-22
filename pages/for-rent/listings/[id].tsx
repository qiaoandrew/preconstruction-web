import axios from 'axios';
import { GetServerSideProps } from 'next';
import ListingPage from '@/components/pages/ListingPage';
import { Listing } from '@/types/types';

type ForSaleListingProps = {
  listing: Listing;
};

export default function ForRentListing({ listing }: ForSaleListingProps) {
  return <ListingPage type='sale' {...listing} />;
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
