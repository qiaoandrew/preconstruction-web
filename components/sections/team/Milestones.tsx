import Row3 from '@/components/layout/Row3';
import { Clock, DollarSign, Users } from 'react-feather';
import { COLORS } from '@/constants/colors';

export const MILESTONES = [
  {
    title: '$1.6B+',
    description:
      'Amount in real estate transactions our award-winning agents have closed since 2018.',
    icon: <DollarSign size={40} color={COLORS.blue1} />,
  },
  {
    title: '5.3 Hours',
    description:
      'Between January and June of 2022, our agents successfully closed a deal every 5.3 hours.',
    icon: <Clock size={40} color={COLORS.blue1} />,
  },
  {
    title: '240 Agents',
    description:
      "Our team of 240 highly skilled agents won the Consumer's Choice Award in 2021.",
    icon: <Users size={40} color={COLORS.blue1} />,
  },
];

export default function Milestones() {
  return (
    <section className='mb-section mx-container-sm'>
      <h2 className='h2 mb-5 md:mb-7'>Our Milestones</h2>
      <Row3>
        {MILESTONES.map((milestone) => (
          <div
            className='flex flex-col rounded-xl border border-blueGrey2 bg-grey1 px-8 pb-9 pt-8 xl:px-10 xl:pb-12 xl:pt-10'
            key={milestone.title}
          >
            <div className='mb-5 self-end'>{milestone.icon}</div>
            <p className='mb-3 font-display text-3xl font-bold text-blue1'>
              {milestone.title}
            </p>
            <p className='text-base leading-relaxed text-blueGrey1'>
              {milestone.description}
            </p>
          </div>
        ))}
      </Row3>
    </section>
  );
}
