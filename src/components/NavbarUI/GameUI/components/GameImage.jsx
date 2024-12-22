import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function GameImage({ image }) {
      return (
            <LazyLoadImage
                  
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src={image}

            />
      )
}