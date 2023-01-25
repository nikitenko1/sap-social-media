import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../actions/group';
import GroupItem from './GroupItem';
import Spinner from '../layout/Spinner';

const AllGroups = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const group = useSelector((state) => state.group);
  const { groups, loading } = group;

  useEffect(() => {
    dispatch(getGroups(auth.token));
  }, [auth.token, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="custom">All Groups</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
      </p>
      <div className="profiles">
        {groups?.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </div>
    </>
  );
};

export default AllGroups;
