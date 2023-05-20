import Button from '@/components/UI/Button';
import TeamGraphic from './TeamGraphic';

export default function SellYourProperty() {
  return (
    <section className='mx-container-sm mb-section grid items-center gap-8 md:grid-cols-2'>
      <div className='md:-mt-16'>
        <h2 className='h2 mb-3 md:mb-5'>Sell Your Property</h2>
        <p className='text-base mb-9 leading-relaxed text-blue1 md:mb-14 lg:text-lg lg:leading-relaxed xl:text-xl xl:leading-relaxed'>
          Looking to sell your property? Contact our award-winning sales
          representative team to get started today!
        </p>

        <div className='hidden gap-7 md:flex'>
          <Button
            type='route'
            route='/contact/agent'
            hierarchy='primary'
            font='font-medium'
            padding='px-6 py-3'
          >
            Contact Agent
          </Button>

          <Button
            type='route'
            route='/team#our-agents'
            hierarchy='secondary'
            font='font-medium'
            padding='px-6 py-3'
          >
            Our Team
          </Button>
        </div>
      </div>

      <TeamGraphic />

      <div className='flex flex-col gap-5 md:hidden'>
        <Button
          type='route'
          route='/contact/agent'
          hierarchy='primary'
          font='font-medium'
          padding='py-3'
          classes='w-full text-center'
        >
          Contact Agent
        </Button>

        <Button
          type='route'
          route='/team#our-agents'
          hierarchy='secondary'
          font='font-medium'
          padding='py-3'
          classes='w-full text-center'
        >
          Our Team
        </Button>
      </div>
    </section>
  );
}
