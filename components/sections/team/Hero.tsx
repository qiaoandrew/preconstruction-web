import Button from '@/components/UI/Button';
import TeamGraphic from '../home/TeamGraphic';

export default function Hero() {
  return (
    <section className='mx-container-sm mb-section mt-16 grid items-center gap-8 md:grid-cols-2 lg:mt-30'>
      <div>
        <h1 className='h1 mb-5 md:mb-7'>Meet Your Metropolis Agents.</h1>
        <p className='text-base mb-8 max-w-[556px] leading-relaxed text-blue1 md:mb-14 lg:text-xl lg:leading-relaxed'>
          Our award-winning agents are ready to assist with all your real estate
          needs.
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
            route='#our-agents'
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
          route='#our-agents'
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
