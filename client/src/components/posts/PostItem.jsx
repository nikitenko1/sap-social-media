import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { FaRegThumbsUp, FaRegThumbsDown, FaRegTrashAlt } from 'react-icons/fa';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ post, owner }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { _id, text, photo, name, user, likes, comments, date } = post;
  // https://stackoverflow.com/questions/13272406/convert-string-with-commas-to-array
  var objectStringArray = new Function('return [' + photo + '];')();

  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={objectStringArray[0]?.url}
              alt="..."
            />
          </Link>
          <h4>{name}</h4>
          <small>comments: {comments.length}</small>
        </div>

        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>

          {
            <>
              <button
                onClick={(e) => dispatch(addLike(_id, auth.token))}
                type="button"
                className="btn btn-light"
              >
                <FaRegThumbsUp />{' '}
                <span>{likes?.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                onClick={(e) => dispatch(removeLike(_id, auth.token))}
                type="button"
                className="btn btn-light"
              >
                <FaRegThumbsDown />
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{' '}
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>

              {!auth.loading &&
                (owner === auth.user._id || user === auth.user._id) && (
                  <button
                    onClick={(e) => dispatch(deletePost(_id, auth.token))}
                    type="button"
                    className="btn btn-danger"
                  >
                    <FaRegTrashAlt />
                  </button>
                )}
            </>
          }
        </div>
      </div>
    </>
  );
};

export default PostItem;
