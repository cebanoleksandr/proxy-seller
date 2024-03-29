import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './AlbumDetailPage.scss';
import { useEffect } from 'react';
import { getAlbumsPhotos } from '../../api/photo';
import { setPhotosAC } from '../../redux/photosReducer';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { PhotoContainer } from '../../components/PhotoContainer/PhotoContainer';

export const AlbumDetailPage = () => {
  const photos = useAppSelector(state => state.photos.items);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    getAlbumsPhotos(+id!)
      .then(res => {
        dispatch(setPhotosAC(res.data));
      })
  }, []);

  const movePhotoCard = (dragIndex: number, hoverIndex: number) => {
    const item = photos[dragIndex];
    const newItems = [...photos];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    dispatch(setPhotosAC(newItems));
  };

  return (
    <div className="album-detail">
      <Helmet>
        <title>Album Page</title>
      </Helmet>

      <h1>Photos for album {id}</h1>

      <DndProvider backend={HTML5Backend}>
        <div className="photos">
          {photos.map((photo, index) => (
            <PhotoContainer key={photo.id} index={index} photo={photo} moveItem={movePhotoCard}>
              <PhotoCard photo={photo} />
            </PhotoContainer>
          ))}
        </div>
      </DndProvider>
    </div>
  );
}
