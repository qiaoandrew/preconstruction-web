import { Search, Sliders } from 'react-feather';

type SearchBarProps = {
  searchQuery: string;
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showFilterButton: boolean;
  filterButtonOnClick: () => void;
  classes?: string;
};

export default function SearchBar({
  searchQuery,
  handleChangeQuery,
  placeholder,
  showFilterButton,
  filterButtonOnClick,
  classes,
}: SearchBarProps) {
  return (
    <div className={`relative ${classes}`}>
      <input
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChangeQuery}
        className={`text-base w-full rounded-md border border-blueGrey2 py-3.5 pl-11 text-blue1 outline-none ${
          showFilterButton ? 'pr-12' : 'pr-4'
        }`}
      />

      <Search size={20} className='absolute left-4 top-1/2 -translate-y-1/2' />

      {showFilterButton && (
        <Sliders
          size={24}
          onClick={filterButtonOnClick}
          className='absolute right-5 top-1/2 -translate-y-1/2 rotate-90 cursor-pointer'
        />
      )}
    </div>
  );
}
