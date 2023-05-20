import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import remaxLogo from '@/public/img/logos/logo-small.png';

export default function Footer() {
  const firstHalf = ROUTES.slice(0, Math.ceil(ROUTES.length / 2));
  const secondHalf = ROUTES.slice(Math.ceil(ROUTES.length / 2));

  return (
    <div className='grid items-center gap-7 bg-blue1 px-5 pb-9 pt-6 md:grid-cols-[1fr_auto] lg:px-12 lg:pb-12 lg:pt-9'>
      <div>
        <Link href='/#'>
          <Image src={remaxLogo} alt='REMAX logo' className='mb-4 w-[105px]' />
        </Link>
        <p className='mb-2 text-lg font-medium text-white lg:text-xl'>
          RE/MAX Metropolis Realty Brokerage
        </p>
        <p className='mb-2 text-sm text-white'>
          Independently Owned and Operated
        </p>
        <p className='mb-2 text-sm text-white'>
          8321 Kennedy Rd Unit 21, Markham, ON L3R 5N4
        </p>
        <p className='text-sm text-white'>905-824-0788</p>
      </div>

      <div className='flex justify-between gap-12'>
        <div className='flex flex-col gap-2.5'>
          {firstHalf.map((route) => (
            <Link href={route.link} key={route.text}>
              <p className='text-base font-[450] text-white'>{route.text}</p>
            </Link>
          ))}
        </div>

        <div className='flex flex-col justify-start gap-2.5'>
          {secondHalf.map((route) => (
            <Link href={route.link} key={route.text}>
              <p className='text-base font-[450] text-white'>{route.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
