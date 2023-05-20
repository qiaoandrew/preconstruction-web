import HeroSearchBar from './HeroSearchBar';

export default function Hero() {
  return (
    <section className='mx-container-sm section z-10 mt-21 text-center lg:mt-30'>
      <h1 className='mx-auto mb-5 max-w-[558px] font-display text-6xl font-[750] leading-snug text-blue1 sm:text-7xl lg:mb-7 lg:text-9xl'>
        <span className='text-gradient'>
          Explore real estate with Metropolis.
        </span>
      </h1>
      <p className='text-base mb-8 text-blue1 sm:text-lg lg:mb-14 lg:text-xl'>
        Let&apos;s work together and find a home you&apos;ll love.
      </p>
      <HeroSearchBar />
    </section>
  );
}
