import { Comment } from '../../utils/types';
import './CommentCard.scss';

type Props = {
  comment: Comment;
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  return (
    <div className="comment-card mb10">
      <strong>{comment.email}: </strong> {comment.body}
    </div>
  );
}
