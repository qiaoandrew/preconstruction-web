import { useState } from 'react';
import { GetStaticProps } from 'next';
import SEO from '@/components/SEO/SEO';
import SearchPage from '@/components/pages/SearchPage';
import Footer from '@/components/navigation/Footer';
import { BlogPreviewType } from '@/types/types';
import { getBlogPreviews } from '@/lib/notion';

type BlogsProps = {
  blogs: BlogPreviewType[];
};

export default function Blog({ blogs }: BlogsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <SEO title='Blog | REMAX Metropolis' />
      <SearchPage
        title='Our Blogs'
        placeholder='Search blogs...'
        searchQuery={searchQuery}
        handleChangeQuery={handleChangeQuery}
        itemType='blogs'
        items={blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        noItemsMessage='No blogs found.'
      />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getBlogPreviews();
  return {
    props: {
      blogs,
    },
    revalidate: 1,
  };
};
