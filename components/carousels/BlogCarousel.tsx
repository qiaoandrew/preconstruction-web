import Link from 'next/link';
import Carousel from '../layout/Carousel';
import BlogCard from '../cards/BlogCard';
import { BlogPreviewType } from '@/types/types';

type BlogCarouselProps = {
  blogs: BlogPreviewType[];
};

export default function BlogCarousel({ blogs }: BlogCarouselProps) {
  return (
    <section className='mb-section'>
      <div className='mx-container-sm mb-5 flex items-end justify-between'>
        <h2 className='h2'>Blogs</h2>
        <Link href='/blog'>
          <p className='sm:text-base font-display text-sm text-blue1 underline underline-offset-4 md:text-lg'>
            View More
          </p>
        </Link>
      </div>

      <Carousel mrItem='mr-6'>
        {blogs.map((blog) => (
          <BlogCard
            placement='carousel'
            title={blog.title}
            description={blog.description}
            date={blog.date}
            image={blog.image}
            route={`/blog/${blog.id}`}
            key={blog.id}
          />
        ))}
      </Carousel>
    </section>
  );
}
