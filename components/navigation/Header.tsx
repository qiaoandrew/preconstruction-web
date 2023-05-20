import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleMobileMenu } from '@/store/slices/mobileMenuSlice';
import { User } from 'react-feather';
import DesktopMenu from '@/components/navigation/DesktopMenu';
import remaxLogo from '@/public/img/logos/logo-big.png';
import Button from '@/components/UI/Button';
import { COLORS } from '@/constants/colors';

export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className='mx-container-lg z-40 mt-9 flex h-12 items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href='/'>
          <Image src={remaxLogo} alt='REMAX logo' className='w-[106px]' />
        </Link>
        <DesktopMenu />
      </div>

      <div className='hidden xl:flex xl:items-center'>
        {user ? (
          <Link href='/profile' className='bg-gradient rounded-full p-2.5'>
            <User size={24} color={COLORS.white} />
          </Link>
        ) : (
          <>
            <Button
              type='route'
              route='/log-in'
              hierarchy='tertiary'
              padding='px-6 py-'
              font='font-display font-medium'
            >
              Log In
            </Button>
            <Button
              type='route'
              route='/sign-up'
              hierarchy='primary'
              padding='px-6 py-3'
              font='font-display font-medium'
            >
              Sign Up
            </Button>
          </>
        )}
      </div>

      <Button
        type='onClick'
        onClick={() => dispatch(toggleMobileMenu())}
        hierarchy='primary'
        font='font-[450]'
        padding='py-2.5'
        classes='w-24 text-center xl:hidden'
      >
        Menu
      </Button>
    </header>
  );
}
