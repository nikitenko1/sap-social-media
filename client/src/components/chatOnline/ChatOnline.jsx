import './chatOnline.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getFriends } from '../../actions/profile';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.profile);

  const [onlineFriends, setOnlineFriends] = useState([]);
  const [NOTonlineFriends, setNOTOnlineFriends] = useState([]);

  useEffect(() => {
    dispatch(getFriends(token));
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.some((ou) => ou.userId === f.user._id))
    );
    setNOTOnlineFriends(
      friends.filter((f) => !onlineUsers.some((ou) => ou.userId === f.user._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`,
        token
      );

      if (res.data !== null) {
        setCurrentChat(res.data);
      }

      // if there isnt already conversation between this 2 users , we create
      // a new conversation between them.
      else {
        const body = {
          senderId: currentId,
          receiverId: user._id,
        };
        const res = await axios.post(`/conversations/`, body, token);

        setCurrentChat(res.data);
      }
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o.user)}
        >
          <div className="chatOnlineImgContainer">
            {o.photo && (
              <img className="chatOnlineImg" src={`${o.photo.url}`} alt="..." />
            )}
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.user.name}</span>
        </div>
      ))}
      {/* NOTonlineFriends */}
      {NOTonlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o.user)}
        >
          <div className="chatOnlineImgContainer">
            {o.photo && (
              <img className="chatOnlineImg" src={`${o.photo.url}`} alt="..." />
            )}
            <div className="chatOnlineBadgeOff"></div>
          </div>
          <span className="chatOnlineName">{o?.user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
