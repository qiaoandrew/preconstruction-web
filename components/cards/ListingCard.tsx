/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { formatDatePosted } from '@/util/helpers';

type ListingCardProps = {
  title: string;
  subtitle: string;
  priceString: string;
  datePosted: string;
  image: string;
  route: string;
  placement: 'carousel' | 'grid' | 'search';
};

export default function ListingCard({
  title,
  subtitle,
  priceString,
  datePosted,
  image,
  route,
  placement,
}: ListingCardProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const borderRounding = `${
    placement === 'carousel'
      ? 'w-[280px] rounded-xl 3xs:rounded-2xl md:w-[360px] md:rounded-xl 2xl:w-[400px] 2xl:rounded-3xl 3xl:rounded-4xl'
      : ''
  } ${
    placement === 'grid'
      ? 'rounded-xl 2xs:rounded-2xl md:rounded-xl 2xl:rounded-3xl'
      : ''
  } ${
    placement === 'search' ? 'rounded-xl 2xs:rounded-2xl md:rounded-lg' : ''
  }`;
  const padding = `${
    placement === 'carousel' ? 'px-4 pb-8 pt-4 md:px-6 2xl:px-7 2xl:pb-10' : ''
  } ${placement === 'grid' ? 'px-5 pb-8 pt-4 xs:px-7 md:px-6 md:pb-10' : ''} ${
    placement === 'search'
      ? 'px-5 pb-6 pt-4 2xs:px-6 2xs:pb-8 xs:px-8 xs:pb-10 sm:px-5 sm:pb-7 md:px-4 md:pb-5 md:pt-3 lg:pb-6 2xl:px-5 3xl:px-6 3xl:pb-7 3xl:pt-4 4xl:px-4 4xl:pb-6 4xl:pt-3 5xl:px-5 5xl:pb-7 5xl:pt-4'
      : ''
  }`;
  const titleStyles = `line-clamp-1 font-display font-semibold text-blue1 ${
    placement === 'carousel'
      ? 'mb-1 text-xl md:mb-2 md:text-2xl 2xl:text-3xl'
      : ''
  } 
    ${
      placement === 'grid'
        ? 'mb-2 text-2xl xs:text-3xl sm:text-2xl 3xl:text-3xl'
        : ''
    }
    ${
      placement === 'search'
        ? 'mb-1 text-xl 2xs:mb-1.5 2xs:text-2xl md:mb-1 md:text-xl 2xl:mb-1.5 3xl:text-2xl 4xl:mb-1 4xl:text-xl 5xl:mb-1.5 5xl:text-xl'
        : ''
    }`;
  const subtitleStyles = `line-clamp-1 text-blueGrey1 
  ${
    placement === 'carousel'
      ? '3xs:text-base mb-2.5 text-sm md:mb-4 md:text-lg'
      : ''
  } 
  ${
    placement === 'grid'
      ? 'text-base sm:text-base mb-4 xs:text-lg 3xl:text-lg'
      : ''
  }
  ${
    placement === 'search'
      ? 'text-base lg:text-base 2xl:text-base 4xl:text-base mb-2 2xs:mb-3 md:mb-2 md:text-sm lg:mb-2.5 xl:text-sm 3xl:mb-3 3xl:text-lg 4xl:mb-2 5xl:mb-3'
      : ''
  }`;
  const priceStyles = `font-medium text-blue1 
    ${placement === 'carousel' ? 'text-base md:text-lg 2xl:text-xl' : ''} 
    ${
      placement === 'grid'
        ? 'text-base sm:text-base 2xs:text-lg 3xl:text-lg'
        : ''
    }
    ${
      placement === 'search'
        ? 'text-base lg:text-base 4xl:text-base md:text-sm 3xl:text-lg'
        : ''
    }`;
  const dateStyles = `font-medium text-blue1
    ${placement === 'carousel' ? 'text-base md:text-lg 2xl:text-xl' : ''} 
    ${
      placement === 'grid'
        ? 'text-base sm:text-base 2xs:text-lg 3xl:text-lg'
        : ''
    } 
    ${
      placement === 'search'
        ? 'text-base lg:text-base 4xl:text-base md:text-sm 3xl:text-lg'
        : ''
    }`;
  const accountRequiredStyles = `text-center text-lg font-medium leading-normal text-white 
    ${placement === 'carousel' ? 'md:text-2xl md:leading-normal' : ''} 
    ${
      placement === 'grid'
        ? 'xs:text-xl xs:leading-normal sm:text-2xl sm:leading-normal'
        : ''
    }`;

  return (
    <Link href={user ? route : '/sign-up'} className='group'>
      <div
        className={`relative h-full overflow-hidden border border-blueGrey2 bg-grey1 ${borderRounding}`}
      >
        <div
          className={`absolute inset-0 grid place-content-center bg-blue1 bg-opacity-80 px-3 backdrop-blur-md ${
            user ? 'hidden' : ''
          } ${borderRounding}`}
        >
          <p className={accountRequiredStyles}>Log in or sign up to view!</p>
        </div>

        <img
          src={image}
          alt={title}
          className='aspect-[280/150] w-full object-cover'
          width={400}
          height={200}
        />

        <div
          className={`transition-300 whitespace-normal bg-grey1 group-hover:bg-grey2 ${padding}`}
        >
          <h4 className={titleStyles}>{title}</h4>

          <p className={subtitleStyles}>{subtitle}</p>

          <div className='flex justify-between'>
            <p className={priceStyles}>{priceString}</p>
            <p className={dateStyles}>{formatDatePosted(datePosted)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
