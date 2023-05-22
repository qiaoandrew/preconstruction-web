import BlogCard from '../cards/BlogCard';
import Row3 from '../layout/Row3';
import Header from '../navigation/Header';
import SearchBar from '../UI/SearchBar';
import { BlogPreview } from '@/types/types';

type SearchPageProps = {
  title: string;
  itemType: string;
  items: any[];
  searchQuery: string;
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function SearchPage({
  title,
  itemType,
  items,
  searchQuery,
  handleChangeQuery,
  placeholder,
}: SearchPageProps) {
  return (
    <>
      <Header />
      <div className='mx-container-sm mb-section mt-16 md:text-center lg:mt-24'>
        <h1 className='h1 mb-5 md:mb-6'>{title}</h1>
        <div className='relative mx-auto mb-9 md:mb-16 md:max-w-[700px] xl:mb-20'>
          <SearchBar
            searchQuery={searchQuery}
            handleChangeQuery={handleChangeQuery}
            placeholder={placeholder}
            showFilterButton={false}
          />
        </div>
        <Row3>
          {itemType === 'listings' ? (
            <></>
          ) : (
            items.map((blog: BlogPreview) => (
              <BlogCard
                placement='grid'
                title={blog.title}
                description={blog.description}
                image={blog.image}
                date={blog.date}
                route={`/blog/${blog.id}`}
                key={blog.id}
              />
            ))
          )}
        </Row3>
      </div>
    </>
  );
}
