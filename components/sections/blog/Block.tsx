import Image from 'next/image';

type BlockProps = {
  block: any;
};

export default function Block({ block }: BlockProps) {
  const generateText = (richText: any) => {
    return richText.map((rawText: any, i: number) => {
      if (rawText.href) {
        return (
          <a
            href={rawText.text.link.url}
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-4'
            key={`text-${i}`}
          >
            {rawText.text.content}
          </a>
        );
      } else {
        return (
          <span
            className={`
            ${rawText.annotations.bold ? 'font-semibold' : ''} 
            ${rawText.annotations.italic ? 'italic' : ''}
            ${
              rawText.annotations.underline
                ? 'underline underline-offset-2'
                : ''
            }`}
            key={`text-${i}`}
          >
            {rawText.text.content}
          </span>
        );
      }
    });
  };

  if (block.type === 'h2') {
    return (
      <h2 className='h2 mb-2 mt-10 md:mb-4 md:mt-16'>
        {generateText(block.richText)}
      </h2>
    );
  } else if (block.type === 'h3') {
    return (
      <h3 className='h3 mb-2 mt-8 md:mb-4'>{generateText(block.richText)}</h3>
    );
  } else if (block.type === 'p') {
    return (
      <p className='text-base mb-3 leading-relaxed text-blue1 md:mb-4 md:text-lg md:leading-loose'>
        {generateText(block.richText)}
      </p>
    );
  } else if (block.type === 'ol') {
    return (
      <ol className='flex list-inside list-disc flex-col gap-3 md:gap-4'>
        {block.items.map((richText: any, i: number) => (
          <li
            className='text-base leading-relaxed text-blue1 md:text-lg md:leading-loose'
            key={`text-${i}`}
          >
            {generateText(richText)}
          </li>
        ))}
      </ol>
    );
  } else if (block.type === 'ul') {
    return (
      <ul className='flex list-inside list-decimal flex-col gap-3 md:gap-4'>
        {block.items.map((richText: any, i: number) => (
          <li
            className='text-base leading-relaxed text-blue1 md:text-lg md:leading-loose'
            key={`text-${i}`}
          >
            {generateText(richText)}
          </li>
        ))}
      </ul>
    );
  } else if (block.type === 'img') {
    return (
      <Image src={block.url} alt='blog image' width={2000} height={1000} />
    );
  } else {
    return null;
  }
}
