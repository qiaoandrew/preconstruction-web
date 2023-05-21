/* eslint-disable @next/next/no-img-element */
import Button from '@/components/UI/Button';
import Carousel from '@/components/layout/Carousel';
import { formatDatePosted } from '@/util/helpers';
import { Button as ButtonType } from '@/types/types';
import useIsListingSaved from '@/hooks/useIsListingSaved';
import { COLORS } from '@/constants/colors';
import { TbHeartPlus, TbHeartMinus } from 'react-icons/tb';

type ListingIntroductionProps = {
  id: string;
  type: 'pre-construction' | 'sale' | 'rent';
  title: string;
  subtitle: string;
  priceString: string;
  datePosted: string;
  images: string[];
  description: string;
  links?: ButtonType[];
};

export default function Introduction({
  id,
  type,
  title,
  subtitle,
  priceString,
  datePosted,
  images,
  description,
  links,
}: ListingIntroductionProps) {
  const { isSaved, toggleSave } = useIsListingSaved(type, id);

  return (
    <section className='mt-10 md:mt-16 2xl:mt-20'>
      <div className='mx-container-sm mb-8 md:mb-12'>
        <div className='mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4'>
          <h1 className='font-display text-4xl font-bold md:text-5xl 2xl:text-6xl 3xl:text-7xl'>
            <span className='text-gradient'>{title}</span>
          </h1>
          <p className='font-display text-2xl font-bold text-blue1 lg:text-5xl'>
            {priceString}
          </p>
        </div>
        <div className='flex flex-wrap justify-between gap-x-5 gap-y-3'>
          <p className='text-base text-blueGrey1 sm:text-lg 2xl:text-xl'>
            {subtitle}
          </p>
          <p className='text-base text-blueGrey1 sm:text-lg 2xl:text-xl'>
            {formatDatePosted(datePosted)}
          </p>
        </div>
      </div>

      <div className='relative'>
        <Carousel mrItem='mr-5' classes='mb-7 md:mb-9'>
          {images.map((image, i) => (
            <img
              src={image}
              alt={title}
              className='inline-block aspect-[3/2] w-[300px] rounded-lg object-cover md:w-[400px] md:rounded-xl xl:w-[480px]'
              width={2000}
              height={1000}
              key={`image-${i}`}
            />
          ))}
        </Carousel>

        <div
          onClick={toggleSave}
          className={`transition-300 absolute right-5 top-4 flex cursor-pointer items-center gap-1.5 rounded-full border border-blue1 px-4 py-2 xs:right-7 xs:top-7 xl:right-10 xl:top-8 3xl:right-[calc((100vw-(1280px))/2)] ${
            isSaved ? 'bg-blue1' : 'bg-white'
          }`}
        >
          <p
            className={`transition-300 text-base ${
              isSaved ? 'text-white' : 'text-blue1'
            }`}
          >
            {isSaved ? 'Remove' : 'Save'}
          </p>
          {isSaved ? (
            <TbHeartMinus size={20} color={COLORS.white} />
          ) : (
            <TbHeartPlus size={20} color={COLORS.blue1} />
          )}
        </div>
      </div>

      <div className='mx-container-sm'>
        <p
          className={`text-base max-w-[800px] leading-relaxed text-blue1 xl:text-lg xl:leading-relaxed ${
            links ? 'mb-12 xl:mb-16' : ''
          }`}
        >
          {description}
        </p>
      </div>

      {links && (
        <div className='mx-container-sm flex flex-col gap-6 sm:flex-row sm:flex-wrap'>
          {links.map((link, i) => (
            <Button
              type='link'
              link={link.link}
              padding='px-6 py-3'
              hierarchy={i === 0 ? 'primary' : 'secondary'}
              font='font-[450]'
              classes='text-center'
              key={`link-${i}`}
            >
              {link.label}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}
