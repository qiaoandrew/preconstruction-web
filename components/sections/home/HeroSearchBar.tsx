import { useEffect, useRef, useState } from 'react';
import useRecommendations from '@/hooks/useRecommendations';
import Button from '@/components/UI/Button';
import HeroRecommendations from './HeroRecommendations';
import HeroDropdown from './HeroDropdown';
import { Search } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function HeroSearchBar() {
  const [query, setQuery] = useState('');
  const [isRecommendationsVisible, setIsRecommendationsVisible] =
    useState(false);
  const [searchBarHeight, setSearchBarHeight] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: 'Pre-Construction',
    value: 'pre-construction',
    route: 'pre-construction',
  });

  const searchBarRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const recommendations = useRecommendations(selectedItem.value, query, 1, 10);

  useEffect(() => {
    const setHeight = () => {
      setSearchBarHeight(searchBarRef.current?.clientHeight ?? 0);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative mx-auto flex max-w-[560px] flex-col gap-12 lg:max-w-[720px] lg:flex-row lg:gap-0'>
      <div className='relative flex-grow'>
        <div className='relative'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={searchBarRef}
            placeholder={`Search for ${selectedItem.label.toLowerCase()}...`}
            onFocus={() => setIsRecommendationsVisible(true)}
            onBlur={() =>
              setTimeout(() => setIsRecommendationsVisible(false), 200)
            }
            className='text-base w-full rounded-md border border-blueGrey2 py-3.5 pl-11 pr-4 text-blue1 outline-none lg:rounded-r-none lg:pr-[196px]'
          />

          <Search
            size={18}
            color={COLORS.blue1}
            className='absolute left-4 top-1/2 -translate-y-1/2'
          />
        </div>

        <HeroDropdown
          dropdownRef={dropdownRef}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>

      <Button
        type='route'
        route={`/${selectedItem.route}/listings&query=${query}`}
        hierarchy='primary'
        padding='px-10 py-3.5'
        font='font-medium'
        border='lg:rounded-l-none lg:rounded-r-md'
        classes='w-full lg:w-auto text-center'
      >
        Search
      </Button>

      <HeroRecommendations
        recommendations={recommendations}
        isRecommendationsVisible={isRecommendationsVisible}
        searchBarHeight={searchBarHeight}
      />
    </div>
  );
}
