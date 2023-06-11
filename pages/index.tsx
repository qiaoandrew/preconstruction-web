import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getBlogPreviews } from '@/lib/notion';
import { BlogPreviewType, ListingType } from '@/types/types';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import Hero from '@/components/sections/home/Hero';
import Explore from '@/components/sections/home/Explore';
import ListingsCarousel from '@/components/carousels/ListingsCarousel';
import SellYourProperty from '@/components/sections/home/SellYourProperty';
import BlogCarousel from '@/components/carousels/BlogCarousel';
import Footer from '@/components/navigation/Footer';
import { getPreConstructionListings } from '@/util/firebase/preConstructionListings';

type HomeProps = {
  blogs: BlogPreviewType[];
  preConstructionListings: ListingType[];
  saleListings: ListingType[];
  rentListings: ListingType[];
};

export default function Home({
  blogs,
  preConstructionListings,
  saleListings,
  rentListings,
}: HomeProps) {
  return (
    <>
      <SEO
        title='Find Your Home | REMAX Metropolis'
        description="Let's work together and find a home you'll love."
      />
      <Header />
      <Hero />
      <Explore />
      <ListingsCarousel
        title='Pre-Construction'
        route='/pre-construction'
        listings={preConstructionListings}
      />
      <ListingsCarousel
        title='For Sale'
        route='/for-sale'
        listings={saleListings}
      />
      <ListingsCarousel
        title='For Rent'
        route='/for-rent'
        listings={rentListings}
      />
      <SellYourProperty />
      <BlogCarousel blogs={blogs} />
      <Footer />
    </>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const blogs = await getBlogPreviews();
    const preConstructionListings = await getPreConstructionListings();
    const { data: saleListings } = await axios.get(
      `${BASE_URL}/api/listings/search?type=sale&pageNum=1&resultsPerPage=5`
    );
    const { data: rentListings } = await axios.get(
      `${BASE_URL}/api/listings/search?type=lease&pageNum=1&resultsPerPage=5`
    );
    return {
      props: {
        blogs,
        preConstructionListings: preConstructionListings.slice(0, 5),
        saleListings,
        rentListings,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
