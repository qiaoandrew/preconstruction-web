type HeroProps = {
  title: string;
  date: string;
  image: string;
};

export default function Hero({ title, date, image }: HeroProps) {
  return (
    <>
      <h1 className='h1 mb-4 md:mb-8 md:text-7xl'>{title}</h1>
      <p className='text-base mb-6 text-right text-blue1 md:mb-10 md:text-lg'>
        {date}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className='w-full' />
    </>
  );
}
