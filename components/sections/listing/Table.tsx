import { Table as TableType } from '@/types/types';
import { calculateHiddenClasses } from '@/util/helpers';

export default function Table({ title, listData, keyValueData }: TableType) {
  return (
    <div>
      <h3 className='h3 mb-6 md:mb-8'>{title}</h3>
      <div className='grid gap-8 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-12 2xl:gap-x-16'>
        {listData &&
          listData.map((item, i) => (
            <div className='relative' key={`item-${i}`}>
              <p className='text-blue text-base font-[450]'>{item}</p>
              <hr
                className={`absolute -bottom-4 w-full text-blueGrey2 ${calculateHiddenClasses(
                  i,
                  listData.length
                )}`}
              />
            </div>
          ))}
        {keyValueData &&
          Object.entries(keyValueData).map(([key, value], i) => (
            <div className='relative' key={key}>
              <div className='flex justify-between'>
                <p className='text-blue text-base font-[450]'>{key}</p>
                <p className='text-blue text-base'>{value}</p>
              </div>
              <hr
                className={`absolute -bottom-4 w-full text-blueGrey2 ${calculateHiddenClasses(
                  i,
                  Object.keys(keyValueData).length
                )}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
