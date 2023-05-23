import { Oval } from 'react-loader-spinner';
import { COLORS } from '@/constants/colors';

type LoadingSpinnerProps = {
  size?: number;
  classes?: string;
};

export default function LoadingSpinner({
  size = 60,
  classes,
}: LoadingSpinnerProps) {
  return (
    <div className={`grid place-content-center ${classes}`}>
      <Oval
        width={60}
        height={60}
        color={COLORS.blue1}
        secondaryColor={COLORS.blueGrey1}
        ariaLabel='oval-loading'
        strokeWidth={6}
        strokeWidthSecondary={7}
      />
    </div>
  );
}
