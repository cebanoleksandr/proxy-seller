import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Album } from '../../utils/types';
import './AlbumCard.scss';
import { getFavoriteAlbums } from '../../utils/helpers';
import { toggleLikeAlbumsAC } from '../../redux/albumsReducer';
import { useNavigate } from 'react-router-dom';

type Props = {
  album: Album;
}

export const AlbumCard: React.FC<Props> = ({ album }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavorite = useAppSelector(state => state.albums.favorites).some(f => f.id === album.id);

  const toggleLike = () => {
    const savedFavoriteAlbums = getFavoriteAlbums();
    const currentFavoriteAlbums = savedFavoriteAlbums.some(f => f.id === album.id)
      ? savedFavoriteAlbums.filter(f => f.id !== album.id)
      : [...savedFavoriteAlbums, album];

    localStorage.setItem('favoriteAlbums', JSON.stringify(currentFavoriteAlbums));
    
    dispatch(toggleLikeAlbumsAC(album.id));
  }

  const openAlbum = () => {
    navigate(`/albums/${album.id}`)
  }

  return (
    <div className="album-card mb10">
      <h2>{album.title}</h2>
      
      <div className="actions">
        <i className={classNames('fas fa-heart fa-2x mr10 heart', {
          'red': isFavorite,
          'white': !isFavorite
        })} onClick={toggleLike}></i> 

        <button className="btn btn-warning" onClick={openAlbum}>
          Open
        </button>
      </div>
    </div>
  );
}
