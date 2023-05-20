type TextInputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  iconOnClick?: () => void;
  classes?: string;
};

export default function TextInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
  iconOnClick,
  classes,
}: TextInputProps) {
  return (
    <div className={`${classes}`}>
      <div className='relative'>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`transition-300 w-full rounded-sm border border-blueGrey2 px-4 py-3 outline-none focus:border-blueGrey1 ${
            icon ? 'pr-6' : ''
          }`}
        />

        {icon ? (
          <div
            onClick={iconOnClick}
            className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer'
          >
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}
