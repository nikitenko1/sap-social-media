import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import FollowersButtons from './FollowersButtons';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Get the userId param from the URL.
  let { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [id, dispatch]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <div className="my-2">
            <FollowersButtons profile={profile} />
          </div>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
