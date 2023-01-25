import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';

const Posts = ({ groupId, owner }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts(groupId, token));
  }, [token, groupId, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <PostForm groupId={groupId} />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} owner={owner} />
        ))}
      </div>
    </>
  );
};

export default Posts;
