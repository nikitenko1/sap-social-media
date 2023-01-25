import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Followings = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const profile = useSelector((state) => state.profile);
  const { profiles, loading } = profile;

  useEffect(() => {
    dispatch(getProfiles(auth.token));
  }, [auth.token, dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="sapir">followings</h1>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((p) =>
                profile.following.includes(p.user._id) ? (
                  <ProfileItem key={p._id} profile={p} />
                ) : null
              )
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Followings;
