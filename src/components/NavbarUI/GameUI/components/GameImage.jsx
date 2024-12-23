import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function GameImage({ image }) {
      return (
            <LazyLoadImage

                  alt={image.name}
                  className="z-0 w-full h-full object-cover"
                  src={image}

            />
      )
}