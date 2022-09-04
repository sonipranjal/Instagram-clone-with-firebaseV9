import { BiLoaderCircle } from 'react-icons/bi';

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-10">
      <BiLoaderCircle size={50} className="animate-spin" />
    </div>
  );
};

export default LoadingOverlay;
