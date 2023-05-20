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
  classes,
  children,
}: ButtonProps) {
  let buttonClasses = `rounded-full cursor-pointer text-md ${font} ${padding} ${classes} `;
  if (hierarchy === 'primary') {
    buttonClasses += 'bg-gradient text-white';
  } else if (hierarchy === 'secondary') {
    buttonClasses += 'border border-blue1 bg-white text-blue1';
  }

  if (type === 'route') {
    return (
      <Link href={route as string} className={buttonClasses}>
        {children}
      </Link>
    );
  } else if (type === 'onClick') {
    return (
      <button type='button' onClick={onClick} className={buttonClasses}>
        {children}
      </button>
    );
  } else if (type === 'link') {
    return (
      <a href={link} target='_blank' rel='noreferrer' className={buttonClasses}>
        {children}
      </a>
    );
  } else {
    return (
      <button type='submit' className={buttonClasses}>
        {children}
      </button>
    );
  }
}
