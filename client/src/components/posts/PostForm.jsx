import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ groupId }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="aviv">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }, groupId, auth.token));
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
