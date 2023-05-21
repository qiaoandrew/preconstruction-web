import SEO from '../SEO/SEO';
import Footer from '../navigation/Footer';
import Header from '../navigation/Header';
import Introduction from '../sections/listing/Introduction';
import ListingMap from '../sections/listing/ListingMap';
import Table from '../sections/listing/Table';
import List from '../sections/listing/List';
import Button from '../UI/Button';
import {
  Button as ButtonType,
  List as ListType,
  Table as TableType,
} from '@/types/types';

type ListingPageProps = {
  type: 'pre-construction' | 'sale' | 'rent';
  id: string;
  title: string;
  subtitle: string;
  priceString: string;
  datePosted: string;
  images: string[];
  description: string;
  longitude: number;
  latitude: number;
  tables?: TableType[];
  lists?: ListType[];
  links?: ButtonType[];
  documents?: ButtonType[];
};

export default function ListingPage({
  type,
  id,
  title,
  subtitle,
  priceString,
  datePosted,
  images,
  description,
  longitude,
  latitude,
  tables,
  lists,
  links,
  documents,
}: ListingPageProps) {
  return (
    <>
      <SEO title={`${title} | REMAX Metropolis`} />
      <Header />
      <div className='grid gap-16 md:gap-24 xl:gap-36'>
        <Introduction
          type={type}
          id={id}
          title={title}
          subtitle={subtitle}
          priceString={priceString}
          datePosted={datePosted}
          images={images}
          description={description}
          links={links}
        />
        <ListingMap longitude={longitude} latitude={latitude} />
        {tables && (
          <div className='mx-container-sm grid gap-16 md:gap-24 xl:gap-36'>
            {tables.map((table) => (
              <Table
                title={table.title}
                keyValueData={table.keyValueData}
                listData={table.listData}
                key={table.title}
              />
            ))}
          </div>
        )}
        {lists && (
          <div className='mx-container-sm grid gap-16 md:gap-24 lg:grid-cols-2 xl:gap-36'>
            {lists.map((list) => (
              <List title={list.title} data={list.data} key={list.title} />
            ))}
          </div>
        )}
        {documents && (
          <div className='mx-container-sm'>
            <h3 className='h3 mb-6 md:mb-8'>Documents</h3>
            <div className='mx-container-sm flex flex-col gap-6 sm:flex-row sm:flex-wrap'>
              {documents.map((link, i) => (
                <Button
                  type='link'
                  link={link.link}
                  padding='px-6 py-3'
                  hierarchy={i === 0 ? 'primary' : 'secondary'}
                  font='font-[450]'
                  classes='text-center'
                  key={`link-${i}`}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
