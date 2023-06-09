import Link from 'next/link';

type ButtonProps = {
  type: 'route' | 'link' | 'onClick' | 'submit';
  onClick?: () => void;
  route?: string;
  link?: string;
  hierarchy: 'primary' | 'secondary' | 'tertiary';
  bg?: string;
  font?: string;
  padding?: string;
  border?: string;
  classes?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export default function Button({
  type,
  onClick,
  route,
  link,
  hierarchy,
  font,
  padding,
  border,
  icon,
  classes,
  children,
}: ButtonProps) {
  let buttonClasses = `relative rounded-full outline-none cursor-pointer text-md ${font} ${padding} ${border} ${classes} `;
  if (hierarchy === 'primary') {
    buttonClasses += 'bg-gradient text-white';
  } else if (hierarchy === 'secondary') {
    buttonClasses += 'border border-blue1 bg-white text-blue1';
  }

  const iconComponent = icon ? (
    <div className='absolute right-5 top-1/2 -translate-y-1/2'>{icon}</div>
  ) : null;

  if (type === 'route') {
    return (
      <Link href={route as string} className={buttonClasses}>
        {children}
        {iconComponent}
      </Link>
    );
  } else if (type === 'onClick') {
    return (
      <button type='button' onClick={onClick} className={buttonClasses}>
        {children}
        {iconComponent}
      </button>
    );
  } else if (type === 'link') {
    return (
      <a href={link} target='_blank' rel='noreferrer' className={buttonClasses}>
        {children}
        {iconComponent}
      </a>
    );
  } else {
    return (
      <button type='submit' className={buttonClasses}>
        {children}
        {iconComponent}
      </button>
    );
  }
}
