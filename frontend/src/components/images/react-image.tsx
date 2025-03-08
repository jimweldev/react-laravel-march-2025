import { Img } from 'react-image';
import fallbackImage from '@/assets/images/no-image-available.jpg';

interface ReactImageProps {
  src: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

const ReactImage = ({
  src,
  alt = '',
  fallback = fallbackImage,
  className = '',
}: ReactImageProps) => {
  return (
    <Img
      className={className}
      src={src}
      alt={alt}
      loader={<div className="bg-primary h-full w-full animate-pulse"></div>}
      unloader={
        <img className={className} src={fallback} alt="Image not found" />
      }
    />
  );
};

export default ReactImage;
