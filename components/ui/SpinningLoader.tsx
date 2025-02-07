import { ShellIcon } from 'lucide-react';

type Props = {
  asOverlay?: boolean;
};

const SpinningLoader = ({ asOverlay = false }: Props) => {
  const centeredStyles = {
    postion: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  };

  return (
    <div
      className={
        asOverlay
          ? 'flex-center absolute left-0 top-0 z-[1000000] h-screen w-full bg-slate-950/95'
          : ''
      }
      style={asOverlay ? centeredStyles : {}}
    >
      <div className={`flex-center min-h-full p-2`}>
        <ShellIcon width={50} height={50} className="file-cyan-500 animate-spin text-cyan-500" />
      </div>
    </div>
  );
};

export default SpinningLoader;
