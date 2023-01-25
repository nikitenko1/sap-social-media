import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const post = useSelector((state) => state.post);
  const { loading, post: _post } = post;

  // Get the userId param from the URL.
  let { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id, token));
  }, [id, token, dispatch]);

  return loading || _post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to={`/group/${_post.group}`} className="btn">
        Back To Posts
      </Link>
      <PostItem post={_post} showActions={false} />
      <CommentForm postId={_post._id} />
      <div className="comments">
        {_post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={_post._id} />
        ))}
      </div>
    </>
  );
};

export default Post;
