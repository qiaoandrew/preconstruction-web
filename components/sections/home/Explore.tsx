import Row3 from '@/components/layout/Row3';
import ExploreCard from '@/components/cards/ExploreCard';
import ExploreCarousel from '@/components/carousels/ExploreCarousel';
import preConstructionGraphic from '@/public/img/graphics/pre-construction.png';
import forSaleGraphic from '@/public/img/graphics/for-sale.png';
import forRentGraphic from '@/public/img/graphics/for-rent.png';

export const CARDS = [
  {
    label: 'Pre-Construction',
    route: '/pre-construction',
    image: preConstructionGraphic,
  },
  {
    label: 'For Sale',
    route: '/for-sale',
    image: forSaleGraphic,
  },
  {
    label: 'For Rent',
    route: '/for-rent',
    image: forRentGraphic,
  },
];

export default function Explore() {
  return (
    <section className='mb-section'>
      <h2 className='h2 mx-container-sm mb-5'>Explore</h2>
      <div className='xl:hidden'>
        <ExploreCarousel />
      </div>
      <div className='mx-container-sm hidden xl:block'>
        <Row3>
          {CARDS.map((card) => (
            <ExploreCard
              placement='grid'
              label={card.label}
              route={card.route}
              image={card.image}
              key={card.label}
            />
          ))}
        </Row3>
      </div>
    </section>
  );
}
