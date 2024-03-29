import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

type Props = {
  onOpen: () => void;
}

export const Header: React.FC<Props> = ({ onOpen }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'nav__link is-active' : 'nav__link';
  const favoritePosts = useAppSelector(state => state.posts.favorites);
  const favoriteAlbums = useAppSelector(state => state.albums.favorites);

  return (
    <div className="header bg-primary">
      <div className="header-container">
        <div className="logo-container">
          <i className="fas fa-bars fa-3x bars" onClick={onOpen}></i>
        </div>

        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink className={getLinkClass} to="/contacts">
              Contacts
            </NavLink>
          </li>

          <li className="nav__item favorite-post-item">
            <NavLink className={getLinkClass} to="/favorite/posts">
              Favorite posts
            </NavLink>
            {!!favoritePosts.length && (
              <div className="favorite-post-count">
                <strong>
                  {favoritePosts.length < 10 ? favoritePosts.length : '9+'}
                </strong>
              </div>
            )}
          </li>

          <li className="nav__item favorite-album-item">
            <NavLink className={getLinkClass} to="/favorite/albums">
              Favorite albums
            </NavLink>
            {!!favoriteAlbums.length && (
              <div className="favorite-album-count">
                <strong>
                  {favoriteAlbums.length < 10 ? favoriteAlbums.length : '9+'}
                </strong>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
