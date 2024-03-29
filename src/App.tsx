import React, { useEffect, useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BackDrop } from './components/DropBack/DropBack';
import { useAppDispatch } from './redux/hooks';
import { setFavoritePostsAC } from './redux/postsReducer';
import { getFavoriteAlbums, getFavoritePosts } from './utils/helpers';
import { setFavoriteAlbumsAC } from './redux/albumsReducer';

export const App = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      const favoritePosts = getFavoritePosts();
      dispatch(setFavoritePostsAC(favoritePosts));
    }, 0);
    
    setTimeout(() => {
      const favoriteAlbums = getFavoriteAlbums();
      dispatch(setFavoriteAlbumsAC(favoriteAlbums));
    }, 0);
  }, []);

  const onClose = () => {
    setIsSidebar(false);
  }

  const onOpen = () => {
    setIsSidebar(true);
  }

  return (
    <div className="app">
      <Header onOpen={onOpen} />
      <Sidebar isSidebar={isSidebar} onClose={onClose} />
      {isSidebar && <BackDrop onClick={onClose} />}

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
