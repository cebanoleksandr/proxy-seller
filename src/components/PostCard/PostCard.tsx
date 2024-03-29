import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleLikeAC } from '../../redux/postsReducer';
import { Post } from '../../utils/types';
import './PostCard.scss';
import { getFavoritePosts } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

type Props = {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavorite = useAppSelector(state => state.posts.favorites).some(f => f.id === post.id);

  const toggleLike = () => {
    const saverFavoritePosts = getFavoritePosts();
    const currentFavoritePosts = saverFavoritePosts.some(f => f.id === post.id)
      ? saverFavoritePosts.filter(f => f.id !== post.id)
      : [...saverFavoritePosts, post];

    localStorage.setItem('favoritePosts', JSON.stringify(currentFavoritePosts));
    
    dispatch(toggleLikeAC(post.id));
  }

  const openPost = () => {
    navigate(`/posts/${post.id}`);
  }

  return (
    <div className="post-card mb10">
      <h2>{post.title}</h2>

      <div className="actions">
        <i className={classNames('fas fa-heart fa-2x mr10 heart', {
          'red': isFavorite,
          'white': !isFavorite
        })} onClick={toggleLike}></i> 

        <button className="btn btn-success" onClick={openPost}>
          Open
        </button>
      </div>
    </div>
  );
}
