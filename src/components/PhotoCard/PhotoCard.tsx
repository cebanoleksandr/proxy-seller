import { Photo } from '../../utils/types';
import './PhotoCard.scss';

type Props = {
  photo: Photo;
}

export const PhotoCard: React.FC<Props> = ({ photo }) => {
  return (
    <div className="photo-card">
      <img
        src={photo.thumbnailUrl}
        className="photo-url"
        alt=""
      />

      <h2 className="text-center">{photo.title}</h2>
    </div>
  );
}
