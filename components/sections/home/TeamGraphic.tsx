import Image from 'next/image';
import ricky from '@/public/img/team/ricky-rathore.png';
import sabina from '@/public/img/team/sabina-hassan.png';
import sujan from '@/public/img/team/sujan-vijayakumar.png';
import yvette from '@/public/img/team/yvette-johnson.png';

export default function TeamGraphic() {
  return (
    <div className='mx-auto mb-12 grid max-w-[332px] grid-cols-2 gap-8 pt-8 md:max-w-[400px] md:gap-9'>
      <Image
        src={sabina}
        alt='Sabina Hassan'
        className='-mt-8 overflow-hidden rounded-md border border-blue1'
      />
      <Image
        src={ricky}
        alt='Ricky Rathore'
        className='overflow-hidden rounded-md border border-blue1'
      />
      <Image
        src={sujan}
        alt='Sujan Vijayakumar'
        className='-mt-8 overflow-hidden rounded-md border border-blue1'
      />
      <Image
        src={yvette}
        alt='Yvette Johnson'
        className='overflow-hidden rounded-md border border-blue1'
      />
    </div>
  );
}
