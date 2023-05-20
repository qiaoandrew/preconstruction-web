import { ChevronDown } from 'react-feather';

const DROPDOWN_ITEMS = [
  {
    label: 'Pre-Construction',
    value: 'pre-construction',
    route: 'pre-construction',
  },
  { label: 'For Sale', value: 'sale', route: 'for-sale' },
  { label: 'For Rent', value: 'lease', route: 'for-rent' },
];

type HeroDropdownProps = {
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: { label: string; value: string; route: string };
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{ label: string; value: string; route: string }>
  >;
};

export default function HeroDropdown({
  dropdownRef,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedItem,
  setSelectedItem,
}: HeroDropdownProps) {
  return (
    <div
      ref={dropdownRef}
      className='mt-6 flex justify-end lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0'
    >
      <div
        className='relative flex items-center gap-5 lg:pr-2'
        onClick={() =>
          setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen)
        }
      >
        <div className='hidden h-9 w-0.25 bg-blueGrey2 lg:block' />
        <div className='flex cursor-pointer items-center gap-2'>
          <p className='text-base text-left text-blue1 lg:w-32'>
            {selectedItem.label}
          </p>
          <ChevronDown
            size={20}
            className={`transition-300 lg:mr-2 ${
              isDropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
        <div
          className={`transition-300 absolute right-0 top-full pt-7 lg:w-full ${
            isDropdownOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <div className='flex min-w-[180px] cursor-pointer flex-col gap-3 rounded-md border border-blueGrey2 bg-white py-5 pl-5 pr-5 text-right lg:text-left'>
            {DROPDOWN_ITEMS.map((item) => (
              <p
                className='text-base text-blue1'
                onClick={() => setSelectedItem(item)}
                key={item.value}
              >
                {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
