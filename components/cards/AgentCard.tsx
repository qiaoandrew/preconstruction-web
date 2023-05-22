/* eslint-disable @next/next/no-img-element */
import { Agent } from '../sections/team/Agents';
import defaultIcon from '@/public/img/team/default.jpeg';
import { changeGoogleDriveURL } from '@/util/helpers';
import { COLORS } from '@/constants/colors';
import { Mail, Phone } from 'react-feather';

export default function AgentCard({
  name,
  position,
  email,
  phone,
  image,
}: Agent) {
  return (
    <div className='h-full overflow-hidden rounded-xl border border-blueGrey2 3xl:rounded-2xl'>
      <div className='bg-white pt-4'>
        <img
          src={image ? changeGoogleDriveURL(image) : defaultIcon.src}
          alt={name}
          className='mx-auto max-w-[170px]'
          width={800}
          height={800}
        />
      </div>
      <div className='h-full bg-grey1 px-7 pb-9 pt-6 xl:px-8 xl:pb-11'>
        <p className='mb-2 font-display text-2xl font-bold 3xl:text-3xl'>
          {name}
        </p>
        <p className='mb-4 text-lg text-blueGrey1 3xl:mb-5'>{position}</p>

        <div className='grid gap-4'>
          {email ? (
            <div className='flex items-center gap-3'>
              <Mail width={20} height={20} color={COLORS.blue1} />
              <a
                href={`mailto:${email}`}
                className='text-base break-all text-blue1'
              >
                {email}
              </a>
            </div>
          ) : null}

          {phone ? (
            <div className='flex items-center gap-3'>
              <Phone width={20} height={20} color={COLORS.blue1} />
              <a href={`tel:${phone}`} className='text-base text-blue1'>
                {phone}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
