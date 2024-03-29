import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../utils/types';
import './UserCard.scss';
import { avatarUrls } from '../../utils/avatars';

type Props = {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const goToPosts = () => {
    navigate(`user/${user.id}/posts`);
  }

  const goToAlbums = () => {
    navigate(`user/${user.id}/albums`);
  }

  return (
    <div className="user-card">
      <div className="mb10 text-center">
        <img
          src={avatarUrls[user.id - 1]}
          className="user-card__ava"
          alt=""
        />
      </div>

      <h3 className="text-center">
        <Link to={"/profile/" + user.id} className="link">
          {user.name}
        </Link>
      </h3>

      <button className="btn btn-block btn-success mb10" onClick={goToPosts}>
        Posts
      </button>

      <button className="btn btn-block btn-danger" onClick={goToAlbums}>
        Albums
      </button>
    </div>
  );
}
