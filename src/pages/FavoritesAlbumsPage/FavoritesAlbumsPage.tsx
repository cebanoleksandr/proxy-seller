import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/Search/Search';
import './FavoritesAlbumsPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AlbumCard } from '../../components/AlbumCard/AlbumCard';
import { useSearchParams } from 'react-router-dom';
import { filterAlbums } from '../../utils/helpers';
import { Filters } from '../../components/Filters/Filters';
import { setFavoriteAlbumsAC } from '../../redux/albumsReducer';
import { AlbumContainer } from '../../components/AlbumContainer/AlbumContainer';

export const FavoritesAlbumsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [filterOrder, setFilterOrder] = useState(order);
  const favoriteAlbums = useAppSelector(state => state.albums.favorites);
  const filteredFavoriteAlbums = filterAlbums(favoriteAlbums, { query, order });
  const dispatch = useAppDispatch();

  const changeQuery = (value: string) => {
    setSearchQuery(value);
  }

  const changeOrder = (value: string) => {
    setFilterOrder(value);
  }

  const moveAlbumCard = (dragIndex: number, hoverIndex: number) => {
    const item = filteredFavoriteAlbums[dragIndex];
    const newItems = [...filteredFavoriteAlbums];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    dispatch(setFavoriteAlbumsAC(newItems));
  };

  return (
    <div className="favorite-albums">
      <Helmet>
        <title>Favorite albums</title>
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
          {!filteredFavoriteAlbums.length && (
            <h1 className="text-center">There are no albums</h1>
          )}
          {filteredFavoriteAlbums.map((album, index) => (
            <AlbumContainer key={album.id} index={index} album={album} moveItem={moveAlbumCard}>
              <AlbumCard album={album} />
            </AlbumContainer>
          ))}
        </div>
      </DndProvider>
    </div>
  );
}
