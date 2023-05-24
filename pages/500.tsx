import Header from '@/components/navigation/Header';
import Button from '@/components/UI/Button';

export default function Page500() {
  return (
    <>
      <Header />
      <div className='mx-container mt-[18vh] h-full min-h-[460px] text-center'>
        <h1 className='mb-2 text-[140px] font-semibold leading-tight xs:text-[160px]'>
          <span className='text-gradient bg-gradient'>500</span>
        </h1>
        <p className='mb-12 text-xl font-medium text-blue1 xs:text-2xl'>
          Something went wrong.
        </p>
        <Button
          type='route'
          route='/'
          hierarchy='primary'
          padding='px-6 py-3'
          font='font-medium'
        >
          Return Home
        </Button>
      </div>
    </>
  );
}
