import { useState } from 'react';
import Link from 'next/link';
import { NESTED_ROUTES } from '@/constants/routes';
import { MenuRouteType } from '@/types/types';
import { COLORS } from '@/constants/colors';
import { ChevronDown } from 'react-feather';

export default function DesktopMenu() {
  return (
    <nav className='hidden items-center gap-10 xl:flex'>
      {NESTED_ROUTES.map((route) => {
        if (route.type === 'dropdown') {
          return <MenuDropdown route={route} key={route.text} />;
        } else {
          return (
            <Link href={route.link || ''} key={route.text}>
              <p className='text-base font-display font-medium text-blue1'>
                {route.text}
              </p>
            </Link>
          );
        }
      })}
    </nav>
  );
}

function MenuDropdown({ route }: { route: MenuRouteType }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className='relative hover:cursor-default'
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <div className='flex items-center gap-1 py-3'>
        <p className='text-base font-display font-medium text-blue1'>
          {route.text}
        </p>
        <ChevronDown
          size={16}
          color={COLORS.blue1}
          className={`transition-300 ${
            dropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <div
        className={`transition-300 absolute top-full flex w-[200px] flex-col gap-3 rounded-md border border-blueGrey2 bg-white p-4 ${
          dropdownOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {route.dropdown &&
          route.dropdown.map((route) => (
            <Link
              href={route.link}
              key={route.text}
              onClick={() => setDropdownOpen(false)}
            >
              <p className='text-base font-display font-medium text-blue1'>
                {route.text}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
