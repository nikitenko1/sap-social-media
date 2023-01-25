import React from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const SearchResult = () => {
  const auth = useSelector((state) => state.auth);
  const { profiles, loading } = useSelector((state) => state.profile);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="sapir">Pal's</h1>
          <p className="lead">
            <FaUsers />
            Browse and connect with our Pal's
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) =>
                auth.user._id !== profile.user._id ? (
                  <ProfileItem key={profile._id} profile={profile} />
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

export default SearchResult;
