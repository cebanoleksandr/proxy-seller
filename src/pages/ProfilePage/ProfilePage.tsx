import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './ProfilePage.scss';
import { useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { getUserById } from '../../api/user';
import { useDispatch } from 'react-redux';
import { setUserAC } from '../../redux/userReducer';
import { avatarUrls } from '../../utils/avatars';

export const ProfilePage = () => {
  const { id } = useParams();
  const user = useAppSelector(state => state.user.item);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(+id!)
      .then(res => {
        dispatch(setUserAC(res.data));
      })
  }, []);

  const goToPosts = () => {
    navigate(`/user/${id}/posts`);
  }

  const goToAlbums = () => {
    navigate(`/user/${id}/albums`);
  }

  return (
    <div className="profile">
      <Helmet>
        <title>Profile Page</title>
      </Helmet>

      <div className="board">
        <img
          src={avatarUrls[+id! - 1]}
          className="main-ava"
          alt=""
        />
      </div>

      <div className="prodile-data">
        <div className="prodile-data__main">
          <h1>{user?.name}</h1>

          <button className="btn btn-success mr10" onClick={goToPosts}>
            Posts
          </button>

          <button className="btn btn-danger" onClick={goToAlbums}>
            Albums
          </button>
        </div>

        <div className="prodile-data__detail">
          <p className="info">
            <strong>City: </strong> {user?.address.city}
          </p>

          <p className="info">
            <strong>Work: </strong> {user?.company.name}
          </p>

          <p className="info">
            <i className="far fa-envelope email"></i> {user?.email}
          </p>

          <p className="info">
            <i className="fas fa-phone phone"></i> {user?.phone}
          </p>

          <p className="info">
            <i className="fas fa-globe web"></i> {user?.website}
          </p>
        </div>
      </div>
    </div>
  );
}
