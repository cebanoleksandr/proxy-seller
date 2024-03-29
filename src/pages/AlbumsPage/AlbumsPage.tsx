import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet';
import './AlbumsPage.scss';
import { Search } from '../../components/Search/Search';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAlbums } from '../../api/album';
import { useParams, useSearchParams } from 'react-router-dom';
import { setAlbumsAC } from '../../redux/albumsReducer';
import { AlbumCard } from '../../components/AlbumCard/AlbumCard';
import { filterAlbums } from '../../utils/helpers';
import { Filters } from '../../components/Filters/Filters';
import { AlbumContainer } from '../../components/AlbumContainer/AlbumContainer';

export const AlbumsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [filterOrder, setFilterOrder] = useState(order);
  const [isLoading, setISLoading] = useState(false);
  const albums = useAppSelector(state => state.albums.items);
  const filteredAlbums = filterAlbums(albums, { query, order });
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    setISLoading(true);
    getAlbums(+id!)
      .then(res => {
        dispatch(setAlbumsAC(res.data));
      })
      .finally(() => {
        setISLoading(false);
      })
  }, [searchQuery, filterOrder]);

  const changeQuery = (value: string) => {
    setSearchQuery(value);
  }

  const changeOrder = (value: string) => {
    setFilterOrder(value);
  }

  const moveAlbumCard = (dragIndex: number, hoverIndex: number) => {
    const item = filteredAlbums[dragIndex];
    const newItems = [...filteredAlbums];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    dispatch(setAlbumsAC(newItems));
  };

  return (
    <div className="albums">
      <Helmet>
        <title>Albums Page</title>
      </Helmet>

      <div className="filters-container">
        <div className="search-filter">
          <Search
            searchQuery={searchQuery}
            changeQuery={changeQuery}
            placeholder="Search albums..."
          />
        </div>

        <div className="filters">
          <Filters changeQuery={changeQuery} changeOrder={changeOrder} />
        </div>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div>
          {!filteredAlbums.length && !isLoading && (
            <h1 className="text-center">There are no albums</h1>
          )}
          {filteredAlbums.map((album, index) => (
            <AlbumContainer key={album.id} index={index} album={album} moveItem={moveAlbumCard}>
              <AlbumCard album={album} />
            </AlbumContainer>
          ))}
        </div>
      </DndProvider>
    </div>
  );
}
