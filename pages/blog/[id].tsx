import { GetServerSideProps } from 'next';
import { getBlocks, getLanding, getPageId } from '@/lib/notion';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Hero from '@/components/sections/blog/Hero';
import Block from '@/components/sections/blog/Block';

type BlogProps = {
  landing: any;
  blocks: any;
};

export default function Blog({ landing, blocks }: BlogProps) {
  return (
    <>
      <SEO
        title={`${landing.title} | REMAX Metropolis`}
        description={landing.description}
      />
      <Header />
      <div className='mx-5 mb-26 mt-14 xs:mx-7 md:mx-auto md:mb-44 md:mt-20 md:w-[720px]'>
        <Hero title={landing.title} date={landing.date} image={landing.image} />
        {blocks.map((block: any) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pageId = await getPageId(params?.id as string);
  const landing = await getLanding(pageId);
  const blocks = await getBlocks(pageId);
  return {
    props: {
      landing,
      blocks,
    },
  };
};
