import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';

export default function CompareListings() {
  return (
    <>
      <SEO title='Compare Listings | REMAX Metropolis' />
      <Header />
      <div className='mx-container-sm mb-section mt-16 md:text-center lg:mt-24'>
        <h1 className='mb-3 text-center sm:mb-4 xl:mb-5'>
          <span className='h1'>Compare Listings</span>
        </h1>
        <p className='mb-9 text-center text-md text-blue1 sm:text-lg lg:mb-12 lg:text-xl'>
          Select listings and compare them side by side.
        </p>
        <div className='grid grid-cols-2 gap-4'></div>
      </div>
    </>
  );
}
