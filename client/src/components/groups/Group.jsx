import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getGroupById } from '../../actions/group';
import Posts from '../posts/Posts';
import GroupFollowerButtons from './GroupFollowerButtons';

const Group = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { group, loading } = useSelector((state) => state.group);

  // Get the userId param from the URL.
  let { id } = useParams();

  useEffect(() => {
    dispatch(getGroupById(id, auth.token));
  }, [getGroupById, group]);

  return (
    <>
      {group === null || loading ? (
        <Spinner />
      ) : (
        <>
          <div className="my-2">
            <GroupFollowerButtons group={group} />
          </div>
          <Link to="/myNotebookGroup" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> {group.name}'s
            files
          </Link>

          <div className="a">
            <h2>{group.name}</h2>
            <p>{group.about}</p>
          </div>

          <Posts groupId={id} owner={group.owner} />
        </>
      )}
    </>
  );
};

export default Group;
