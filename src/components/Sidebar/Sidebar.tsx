import React from 'react';
import './Sidebar.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  isSidebar: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isSidebar, onClose }) => {
  return (
    <div className={classNames('sidebar', {
      'closed-sidebar': !isSidebar
    })}>
      <i className="fas fa-times-circle fa-lg close-icon" onClick={onClose}></i>
      
      <div className="text-center">
        <img
          src="https://previews.123rf.com/images/rotorania/rotorania2304/rotorania230413594/202835608-cartoon-man-with-happy-expression-3d-render-illustration-square-image.jpg"
          className="ava"
          alt=""
        />  
      </div>

      <ul className="sidenav-list">
        <li className="sidenav-item mb10" onClick={onClose}>
          <Link to="/" className="link sidenav-link">Home</Link>
        </li>

        <li className="sidenav-item mb10" onClick={onClose}>
          <Link to="/contacts" className="link sidenav-link">Contacts</Link>
        </li>

        <li className="sidenav-item mb10" onClick={onClose}>
          <Link to="/favorite/posts" className="link sidenav-link">Favorite posts</Link>
        </li>

        <li className="sidenav-item mb10" onClick={onClose}>
          <Link to="/favorite/albums" className="link sidenav-link">Favorite albums</Link>
        </li>
      </ul>
    </div>
  );
}