import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../../redux/hooks';
import './PostDetailPage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostById } from '../../api/post';
import { setPostAC } from '../../redux/postReducer';
import { getComments } from '../../api/comments';
import { setCommentsAC } from '../../redux/commentsReducer';
import { CommentCard } from '../../components/CommentCard/CommentCard';

export const PostDetailPage = () => {
  const [isComments, setIsComments] = useState(false);
  const post = useAppSelector(state => state.post.item);
  const comments = useAppSelector(state => state.comments.items);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getPostById(+id!)
      .then(res => {
        dispatch(setPostAC(res.data));
      })

    getComments(+id!)
      .then(res => {
        dispatch(setCommentsAC(res.data));
      })
  }, []);

  const openComments = () => {
    setIsComments(true);
  }

  const closeComments = () => {
    setIsComments(false);
  }

  return (
    <div className="post-detail">
      <Helmet>
        <title>Post Page</title>
      </Helmet>

      <div className="post-detail__main mb10">
        <h1>{post?.title}</h1>

        <p>{post?.body}</p>
      </div>

      {isComments ? (
        <>
          <button className="btn btn-danger mb10" onClick={closeComments}>
            Close comments
          </button>

          <div>
            {comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      ) : (
        <button className="btn btn-primary" onClick={openComments}>
          Open comments
        </button>
      )}
    </div>
  );
}
