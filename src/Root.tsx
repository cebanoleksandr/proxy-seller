import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PostsPage } from './pages/PostsPage/PostsPage';
import { AlbumsPage } from './pages/AlbumsPage/AlbumsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { FavoritesAlbumsPage } from './pages/FavoritesAlbumsPage/FavoritesAlbumsPage';
import { FavoritePostsPage } from './pages/FavoritePostsPage/FavoritePostsPage';
import { PostDetailPage } from './pages/PostDetailPage/PostDetailPage';
import { AlbumDetailPage } from './pages/AlbumDetailPage/AlbumDetailPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="user/:id/posts" element={<PostsPage />} />
        <Route path="user/:id/albums" element={<AlbumsPage />} />
        <Route path="favorite/albums" element={<FavoritesAlbumsPage />} />
        <Route path="favorite/posts" element={<FavoritePostsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="posts/:id" element={<PostDetailPage />} />
        <Route path="albums/:id" element={<AlbumDetailPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);