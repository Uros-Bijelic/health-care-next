import { LoaderCircleIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button, ButtonProps } from './button';

type Props = {
  children?: ReactNode;
  isLoading?: boolean;
} & ButtonProps;

const LoadingButton = ({ children, isLoading = false, ...rest }: Props) => {
  return (
    <Button {...rest}>
      {isLoading && <LoaderCircleIcon className="animate-spin" />} {children}
    </Button>
  );
};

export default LoadingButton;
