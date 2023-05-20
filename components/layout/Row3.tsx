type Row3Props = {
  classes?: string;
  children: React.ReactNode;
};

export default function Row3({ classes, children }: Row3Props) {
  return (
    <div
      className={`grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12 ${classes}`}
    >
      {children}
    </div>
  );
}
