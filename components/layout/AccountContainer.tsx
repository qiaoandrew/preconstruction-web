export default function AccountContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-5 mb-24 mt-16 max-w-[400px] text-center xs:mx-auto md:mt-16 xl:mb-36 2xl:mt-24'>
      {children}
    </div>
  );
}
