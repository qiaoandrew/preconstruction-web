import Button from '../UI/Button';
import { COLORS } from '@/constants/colors';
import { XCircle } from 'react-feather';

type ListingPopupProps = {
  title: string;
  subtitle: string;
  image: string;
  closePopup: () => void;
  route: string;
};

export default function ListingPopup({
  title,
  subtitle,
  image,
  closePopup,
  route,
}: ListingPopupProps) {
  return (
    <div className='flex flex-col'>
      <XCircle
        size={24}
        color={COLORS.blue1}
        onClick={closePopup}
        className='transition-300 z-50 cursor-pointer self-end hover:scale-105'
      />
      <p className='-mt-3 mb-1.5 font-display text-xl font-semibold text-blue1'>
        {title}
      </p>
      <p className='mb-3 font-sans text-md leading-normal text-blueGrey1'>
        {subtitle}
      </p>
      <img
        src={image}
        alt={title}
        width={600}
        height={300}
        className='mb-4 aspect-[3/2] rounded-sm border border-blue1 object-cover'
      />
      <Button
        type='route'
        route={route}
        hierarchy='primary'
        font='font-sans text-white text-sm'
        padding='py-3'
        border='rounded-full'
        classes='w-full text-center'
      >
        View Listing
      </Button>
    </div>
  );
}
