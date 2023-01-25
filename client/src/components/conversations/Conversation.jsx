import './conversation.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../actions/alert';

const Conversation = ({ conversation }) => {
  const [friendProfile, setFriendProfile] = useState(null);

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m === user._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/profile/user/${friendId}`, token);
        setFriendProfile(res.data);
      } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }
    };
    getUser();
  }, [conversation, token]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={friendProfile ? `${friendProfile.photo.url}` : ''}
        alt="... "
      />
      <span className="conversationName">
        {friendProfile ? friendProfile.user.name : ''}
      </span>
    </div>
  );
};

export default Conversation;
