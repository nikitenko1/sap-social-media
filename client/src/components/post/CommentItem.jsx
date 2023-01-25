import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteComment } from '../../actions/post';

const CommentItem = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { _id, text, name, photo, user, date } = comment;

  // https://stackoverflow.com/questions/13272406/convert-string-with-commas-to-array
  var objectStringArray = new Function('return [' + photo + '];')();

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img my-1"
            src={objectStringArray[0]?.url}
            alt="..."
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => dispatch(deleteComment(postId, _id, auth.token))}
            type="button"
            className="btn btn-danger"
          >
            <FaRegTrashAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
