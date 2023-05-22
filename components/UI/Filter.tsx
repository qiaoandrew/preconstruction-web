import { XCircle } from 'react-feather';

export type Filter = {
  id: string;
  label: string;
  type: 'range' | 'selectOne' | 'selectMany';
  options?: string[];
  min?: number;
  max?: number;
};

type FilterProps = {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Filter[];
  filterValues: any;
  setFilterValues: React.Dispatch<React.SetStateAction<any>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
};

export default function Filter({
  showFilter,
  setShowFilter,
  filters,
  filterValues,
  setFilterValues,
  setPageNum,
}: FilterProps) {
  return (
    <div
      className={`transition-300 absolute top-[calc(100%+24px)] z-50 w-full ${
        showFilter
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className='no-scrollbar max-h-[50vh] overflow-y-scroll overscroll-contain rounded-lg border border-blueGrey2 bg-white px-6 pb-10 pt-6 text-left'>
        {filters.map((filter) => (
          <div className='mb-9 last:mb-0' key={filter.id}>
            <p className='mb-4 text-lg font-medium'>{filter.label}</p>
            {filter.type === 'selectMany' && (
              <Select
                type='many'
                id={filter.id}
                options={filter.options || []}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                setPageNum={setPageNum}
              />
            )}
            {filter.type === 'selectOne' && (
              <Select
                type='one'
                id={filter.id}
                options={filter.options || []}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                setPageNum={setPageNum}
              />
            )}
            {filter.type === 'range' && (
              <Range
                id={filter.id}
                min={filter.min as number}
                max={filter.max as number}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                setPageNum={setPageNum}
              />
            )}
          </div>
        ))}
      </div>

      <XCircle
        size={32}
        onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
        className='transition-300 absolute right-6 top-6 cursor-pointer hover:scale-105'
      />
    </div>
  );
}

type SelectProps = {
  type: 'one' | 'many';
  id: string;
  options: string[];
  filterValues: any;
  setFilterValues: React.Dispatch<React.SetStateAction<any>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
};

function Select({
  type,
  id,
  options,
  filterValues,
  setFilterValues,
  setPageNum,
}: SelectProps) {
  const handleChange = (option: string) => {
    const newFilterValues = new Set(filterValues[id]);
    if (type === 'many') {
      setPageNum(1);
      if (newFilterValues.has(option)) {
        newFilterValues.delete(option);
      } else {
        newFilterValues.add(option);
      }
      setFilterValues({ ...filterValues, [id]: newFilterValues });
    } else {
      if (newFilterValues.has(option)) {
        setFilterValues({ ...filterValues, [id]: new Set() });
      } else {
        setFilterValues({ ...filterValues, [id]: new Set([option]) });
      }
    }
  };

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-2.5 xl:gap-x-4'>
      {options.map((option) => (
        <div
          className={`transition-100 cursor-pointer rounded-full border border-blue1 px-3.5 py-1.5 
          ${
            filterValues[id].has(option)
              ? 'bg-blue1 text-white'
              : 'bg-white text-blue1'
          }
          `}
          onClick={() => handleChange(option)}
          key={option}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

type RangeProps = {
  id: string;
  min: number;
  max: number;
  filterValues: any;
  setFilterValues: React.Dispatch<React.SetStateAction<any>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
};

function Range({
  id,
  min,
  max,
  filterValues,
  setFilterValues,
  setPageNum,
}: RangeProps) {
  const updateFilterValues = (isMin: boolean, input: any) => {
    setPageNum(1);
    if (/^\d+$/.test(input)) {
      const newFilterValues = [...filterValues[id]];
      newFilterValues[isMin ? 0 : 1] = Math.max(
        Math.min(parseInt(input), max),
        min
      );
      setFilterValues({ ...filterValues, [id]: newFilterValues });
    } else if (input === '') {
      const newFilterValues = [...filterValues[id]];
      newFilterValues[isMin ? 0 : 1] = 0;
      setFilterValues({ ...filterValues, [id]: newFilterValues });
    }
  };

  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterValues(true, e.target.value);
  };

  const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterValues(false, e.target.value);
  };

  return (
    <div className='flex items-center justify-start gap-5'>
      <input
        type='text'
        value={filterValues[id][0]}
        onChange={handleChangeMin}
        className='transition-300 w-[128px] rounded-sm border border-blueGrey2 bg-white py-2 text-center outline-none focus:border-blueGrey1'
      />

      <p className='text-base text-blue1'>-</p>

      <input
        type='text'
        value={filterValues[id][1]}
        onChange={handleChangeMax}
        className='transition-300 w-[128px] rounded-sm border border-blueGrey2 bg-white py-2 text-center outline-none focus:border-blueGrey1'
      />
    </div>
  );
}
