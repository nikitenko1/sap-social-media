import { useDispatch, useSelector } from 'react-redux';
import { removeGroupFollower, addGroupFollower } from '../../actions/group';

const GroupFollowerButtons = ({ group }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { followers, _id } = group;

  return (
    <>
      {followers?.filter((follower) => follower === auth.user._id).length >
      0 ? (
        <button
          className="btn btn-primary"
          onClick={(e) => dispatch(removeGroupFollower(_id, auth.token))}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={(e) => dispatch(addGroupFollower(_id, auth.token))}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default GroupFollowerButtons;
