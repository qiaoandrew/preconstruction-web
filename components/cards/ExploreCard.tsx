import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type ExploreCardProps = {
  placement: 'grid' | 'carousel';
  label: string;
  route: string;
  image: StaticImageData;
};

export default function ExploreCard({
  placement,
  label,
  route,
  image,
}: ExploreCardProps) {
  return (
    <Link href={route}>
      <div
        className={`relative overflow-hidden rounded-lg border border-blue1 md:rounded-xl 2xl:rounded-3xl ${
          placement === 'carousel' && 'w-[280px] md:w-[360px]'
        }`}
      >
        <Image
          src={image}
          alt={label}
          className='aspect-[280/190] object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-blue1 via-transparent' />
        <h4 className='absolute bottom-6 left-6 font-display text-2xl font-semibold text-white xl:bottom-8 xl:left-8 xl:text-3xl 2xl:bottom-9 2xl:left-9 2xl:text-4xl'>
          {label}
        </h4>
      </div>
    </Link>
  );
}
