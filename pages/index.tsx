import axios from 'axios';
import { GetStaticProps } from 'next';
import { getBlogPreviews } from '@/lib/notion';
import { Listing } from '@/types/types';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import Hero from '@/components/sections/home/Hero';

type HomeProps = {
  blogs: any[];
  saleListings: Listing[];
  rentListings: Listing[];
};

export default function Home({ blogs, saleListings, rentListings }: HomeProps) {
  return (
    <>
      <SEO
        title='Find Your Home | REMAX Metropolis'
        description="Let's work together and find a home you'll love."
      />
      <Header />
      <Hero />
    </>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const blogs = await getBlogPreviews();
    const { data: saleListings } = await axios.get(
      `${BASE_URL}/api/listings/search?type=sale&pageNum=1&resultsPerPage=5`
    );
    const { data: rentListings } = await axios.get(
      `${BASE_URL}/api/listings/search?type=lease&pageNum=1&resultsPerPage=5`
    );
    return {
      props: { blogs, saleListings, rentListings },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 1,
    };
  }
};
