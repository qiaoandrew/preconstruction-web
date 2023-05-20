type InputFeedbackProps = {
  state: 'success' | 'error';
  children: React.ReactNode;
};

export default function InputFeedback({ state, children }: InputFeedbackProps) {
  return (
    <div className='mt-2 text-left md:mt-3'>
      <p
        className={`text-base leading-relaxed ${
          state === 'success' ? 'text-green' : 'text-red'
        }`}
      >
        {children}
      </p>
    </div>
  );
}
