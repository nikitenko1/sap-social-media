import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUsers } from 'react-icons/fa';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

const Profiles = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="custom">Pal's</h1>
          <p className="lead">
            <FaUsers />
            Browse and connect with our Pal's
          </p>
          <div className="profiles">
            {profiles.length > 0 && !!auth.user._id ? (
              profiles.map((item) =>
                auth.user._id !== item.user._id ? (
                  <ProfileItem key={item._id} profile={item} />
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

export default Profiles;
