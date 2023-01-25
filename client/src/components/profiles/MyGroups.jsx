import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import GroupItem from '../groups/GroupItem';
import { getGroups } from '../../actions/group';
import { useEffect } from 'react';

const MyGroups = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loading, profile } = useSelector((state) => state.profile);
  const { loading: grouploading, groups } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(getGroups(auth.token));
  }, [auth.token, dispatch]);

  return (
    <>
      {loading || grouploading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="custom">groups i follow</h1>

          <div className="profiles">
            {groups.length > 0 ? (
              groups.map((group) =>
                profile.followingGroups.includes(group._id) ? (
                  <GroupItem key={group._id} group={group} />
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

export default MyGroups;
