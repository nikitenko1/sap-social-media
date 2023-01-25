import './messenger.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import Conversation from '../conversations/Conversation';
import ChatOnline from '../chatOnline/ChatOnline';
import Message from '../message/Message';
import { setAlert } from '../../actions/alert';

// https://stackoverflow.com/questions/69207410/socket-io-one-to-one-chat
const Messenger = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();
  //useEffect 1
  useEffect(() => {
    socket.current = io('ws://localhost:8900');

    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  //useEffect 2
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //useEffect 3
  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, [user, socket]);

  //useEffect 4
  useEffect(() => {
    const getConversations = async () => {
      try {
        // If users refresh or user is offline and returns,
        // all messages for that user will be fetched from the server.
        // get all conversations of the user
        const res = await axios.get('/conversations');
        setConversations(res.data);
      } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }
    };
    getConversations();
  }, [user._id, dispatch]);

  //useEffect 5
  useEffect(() => {
    // If users refresh or user is offline and returns,
    // all messages for that user will be fetched from the server.
    //get all messages in a conversation
    const getMessages = async () => {
      try {
        if (currentChat !== null) {
          const res = await axios.get(`/messages/${currentChat._id}`);
          setMessages(res.data);
        }
      } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
      }
    };
    getMessages();
  }, [currentChat, socket, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`/messages`, message, token);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
  };

  //useEffect 6
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)} key={c._id}>
              <Conversation conversation={c} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      key={m._id}
                      message={m}
                      own={m.sender === user._id}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
