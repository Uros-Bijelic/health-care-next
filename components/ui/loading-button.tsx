import { LoaderCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button, ButtonProps } from './button';

type Props = {
  children?: ReactNode;
  isLoaderSpinning?: boolean;
} & ButtonProps;

const LoadingButton = ({ children, isLoaderSpinning = false, ...rest }: Props) => {
  return (
    <Button {...rest}>
      {isLoaderSpinning && <LoaderCircleIcon className="animate-spin" />} {children}
    </Button>
  );
};

export default LoadingButton;
