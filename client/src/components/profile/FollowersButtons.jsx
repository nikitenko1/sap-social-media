import { useDispatch, useSelector } from 'react-redux';
import { removeFollower, addFollower } from '../../actions/profile';

const FollowersButtons = ({ profile }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { followers, _id } = profile;

  return (
    <div>
      {
        <>
          {followers?.filter((follower) => follower === auth.user._id).length >
          0 ? (
            <button
              className="btn btn-primary"
              onClick={(e) => dispatch(removeFollower(_id, auth.token))}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="btn btn-primary"
              //addFollowingGroup, id of the group
              onClick={(e) => dispatch(addFollower(_id, auth.token))}
            >
              Follow
            </button>
          )}
        </>
      }
    </div>
  );
};

export default FollowersButtons;
