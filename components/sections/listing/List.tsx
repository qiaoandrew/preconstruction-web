import { List as ListType } from '@/types/types';

export default function List({ title, data }: ListType) {
  return (
    <div>
      <h3 className='h3 mb-3 md:mb-5'>{title}</h3>
      <ul className='grid gap-2'>
        {data.map((item, i) => (
          <li className='grid grid-cols-[auto_1fr] gap-x-3' key={`item-${i}`}>
            <div className='mt-2 h-1.5 w-1.5 rounded-full bg-blue1' />
            <p className='text-base text-blue1'>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
