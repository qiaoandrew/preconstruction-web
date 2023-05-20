import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { toggleMobileMenu } from '@/store/slices/mobileMenuSlice';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Button from '../UI/Button';
import { NESTED_ROUTES } from '@/constants/routes';
import { Route } from '@/types/types';
import { ChevronDown } from 'react-feather';

export default function MobileMenu() {
  const [openDropdown, setOpenDropdown] = useState('');

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const mobileMenuOpen = useSelector(
    (state: RootState) => state.mobileMenu.isOpen
  );

  return (
    <div
      className={`transition-300 fixed inset-0 z-50 flex flex-col bg-white px-5 xl:hidden
      ${
        mobileMenuOpen
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className='mb-6 mt-9 flex h-12 items-center self-end'>
        <Button
          type='onClick'
          onClick={() => dispatch(toggleMobileMenu())}
          hierarchy='primary'
          font='font-[450]'
          padding='py-3'
          classes='w-24 text-center justify-self-end'
        >
          Close
        </Button>
      </div>
      <nav className='flex flex-grow flex-col gap-5 overflow-x-hidden overflow-y-scroll pb-4'>
        {(NESTED_ROUTES as Route[]).map((route) => {
          if (route.type === 'dropdown') {
            return (
              <Dropdown
                route={route}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                key={route.text}
              />
            );
          } else {
            return (
              <Link
                href={route.link as string}
                key={route.text}
                onClick={() => dispatch(toggleMobileMenu())}
              >
                <p className='font-display text-2xl font-semibold text-blue1'>
                  {route.text}
                </p>
              </Link>
            );
          }
        })}
      </nav>
      <div className='flex flex-col gap-4 pb-12 pt-4'>
        {user ? (
          <>
            <Button
              type='onClick'
              onClick={() => {
                router.push('/profile');
                dispatch(toggleMobileMenu());
              }}
              hierarchy='primary'
              font='font-medium'
              padding='py-3'
              classes='w-full text-center'
            >
              Profile
            </Button>
            <Button
              type='onClick'
              onClick={async () => {
                await signOut(auth);
                dispatch(toggleMobileMenu());
              }}
              hierarchy='secondary'
              font='font-medium'
              padding='py-3'
              classes='w-full text-center'
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              type='onClick'
              onClick={() => {
                router.push('/sign-up');
                dispatch(toggleMobileMenu());
              }}
              hierarchy='primary'
              font='font-medium'
              padding='py-3'
              classes='w-full text-center'
            >
              Sign Up
            </Button>
            <Button
              type='onClick'
              onClick={() => {
                router.push('/log-in');
                dispatch(toggleMobileMenu());
              }}
              hierarchy='secondary'
              font='font-medium'
              padding='py-3'
              classes='w-full text-center'
            >
              Log In
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

type DropdownProps = {
  route: Route;
  openDropdown: string;
  setOpenDropdown: (value: string) => void;
};

function Dropdown({ route, openDropdown, setOpenDropdown }: DropdownProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div
      onClick={() =>
        openDropdown !== route.text
          ? setOpenDropdown(route.text)
          : setOpenDropdown('')
      }
    >
      <div className='flex cursor-pointer justify-between'>
        <p className='font-display text-2xl font-semibold text-blue1'>
          {route.text}
        </p>
        <ChevronDown
          size={24}
          className={`transition-300 ${
            openDropdown === route.text ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <div
        className={`mt-4 flex flex-col gap-5 rounded-md border border-blueGrey2 px-4 py-5 ${
          openDropdown === route.text ? 'block' : 'hidden'
        }`}
      >
        {route.dropdown &&
          route.dropdown.map((route) => (
            <Link
              href={route.link}
              key={route.text}
              onClick={() => dispatch(toggleMobileMenu())}
            >
              <p className='font-display text-lg font-semibold text-blue1'>
                {route.text}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
