import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { COLORS } from '@/constants/colors';

type CarouselProps = {
  mrItem: string;
  classes?: string;
  children: React.ReactNode[];
};

export default function Carousel({ mrItem, classes, children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollLeft -= 250;
  };

  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollLeft += 250;
  };

  return (
    <div className={`relative ${classes}`}>
      <div
        ref={carouselRef}
        className='no-scrollbar px-container-sm w-screen overflow-y-hidden overflow-x-scroll scroll-smooth whitespace-nowrap'
      >
        {children.map((child, i) => (
          <div
            className={`inline-block ${mrItem} last:mr-0`}
            key={`child-${i}`}
          >
            {child}
          </div>
        ))}
      </div>

      <div
        onClick={scrollLeft}
        className='transition-300 absolute left-5 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer rounded-full bg-blueGrey2 p-3 opacity-70 hover:opacity-100 md:block 3xl:left-[calc((100%-1280px)/2-28px)]'
      >
        <ChevronLeft size='100%' color={COLORS.blue1} className='-ml-0.5' />
      </div>

      <div
        onClick={scrollRight}
        className='transition-300 absolute right-5 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer rounded-full bg-blueGrey2 p-3 opacity-70 hover:opacity-100 md:block 3xl:right-[calc((100%-1280px)/2-28px)]'
      >
        <ChevronRight size='100%' className='-mr-0.5' />
      </div>
    </div>
  );
}
