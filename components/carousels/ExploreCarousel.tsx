import Carousel from '../layout/Carousel';
import ExploreCard from '../cards/ExploreCard';
import { CARDS } from '../sections/home/Explore';

export default function ExploreCarousel() {
  return (
    <Carousel mrItem='mr-6'>
      {CARDS.map((card) => (
        <ExploreCard
          placement='carousel'
          label={card.label}
          route={card.route}
          image={card.image}
          key={card.label}
        />
      ))}
    </Carousel>
  );
}
