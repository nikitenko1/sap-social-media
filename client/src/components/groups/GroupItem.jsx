import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteGroup } from '../../actions/group';
import GroupFollowerButton from './GroupFollowerButtons';

const GroupItem = ({ group }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { name, _id, subject, about, owner } = group;

  return (
    <>
      <div className="profile bg-light">
        <div>
          <h2>{subject}</h2>
          <hr className="my" />
          <h3>{name}</h3>
          <p className="my">About : {about && <span>{about}</span>}</p>
          <Link to={`/group/${_id}`} className="btn btn-primary">
            view group
          </Link>
          <hr className="my" />
          <GroupFollowerButton group={group} />
          <hr className="my" />
          {!auth.loading && owner.toString() === auth.user._id && (
            <button
              onClick={(e) => dispatch(deleteGroup(_id, auth.token))}
              type="button"
              className="btn btn-danger"
            >
              <FaRegTrashAlt />
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupItem;
