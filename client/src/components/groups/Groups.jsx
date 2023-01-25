import { useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import GroupItem from './GroupItem';

const Groups = () => {
  const group = useSelector((state) => state.group);
  const { groups, loading } = group;

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="custom">My Groups</h1>
      <p className="lead">
        <i className="material-icons"></i>
      </p>
      <div className="profiles">
        {groups?.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </div>
    </>
  );
};

export default Groups;
