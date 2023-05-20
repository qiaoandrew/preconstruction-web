/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import remaxGraphic from '@/public/img/logos/graphic.png';
import { COLORS } from '@/constants/colors';

type BlogCardProps = {
  placement: 'carousel' | 'grid' | 'search';
  title: string;
  description: string;
  date: string;
  image: string;
  route: string;
};

export default function BlogCard({
  placement,
  title,
  description,
  date,
  image,
  route,
}: BlogCardProps) {
  return (
    <Link href={route} className='group'>
      <div
        className={`relative h-full overflow-hidden rounded-lg border border-blueGrey2 bg-grey1 text-left md:rounded-xl 2xl:rounded-3xl ${
          placement === 'carousel' ? 'w-[280px] md:w-[360px] 2xl:w-[400px]' : ''
        }`}
      >
        <div className='relative'>
          <img
            src={image ? image : remaxGraphic.src}
            alt={title}
            className='aspect-[280/160] w-full object-cover'
            width={600}
            height={400}
          />
          <div className='absolute bottom-3 right-4 rounded-full bg-grey1 px-3 py-2 md:bottom-5 md:right-6'>
            <p className='text-sm text-blue1'>{date}</p>
          </div>
        </div>

        <div
          className={`transition-300 whitespace-normal bg-grey1 group-hover:bg-grey2 md:px-6 md:pb-8 2xl:px-7 2xl:pb-10 ${
            placement === 'carousel' ? 'px-4 pb-6 pt-4' : 'px-5 pb-7 pt-5'
          }`}
        >
          <h4
            className={`mb-2 line-clamp-1 font-display font-semibold text-blue1 md:mb-2.5 md:text-xl xl:text-2xl ${
              placement === 'carousel' ? 'text-lg' : 'text-xl'
            }`}
          >
            {title}
          </h4>
          <p className='md:text-base mb-5 line-clamp-3 text-sm leading-relaxed text-blueGrey1 md:mb-6 md:leading-relaxed'>
            {description}
          </p>
          <div className='flex justify-end'>
            <div className='flex items-center gap-1.5'>
              <p className='md:text-base text-sm font-[450]'>Read More</p>
              <ArrowRight width={18} height={18} color={COLORS.blue1} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
