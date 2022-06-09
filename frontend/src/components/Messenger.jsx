import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisH, FaEdit, FaSistrix } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFriends,
  getMessages,
  sendMessage,
  sendImageMassage,
} from '../store/actions/messenger.action';
import { IS_LOADING, SOCKET_MESSAGE } from '../store/types/messenger.type';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';

import toast, { Toaster } from 'react-hot-toast';
import useSound from 'use-sound';
import io from 'socket.io-client';
import notificationSound from '../audio/notification.mp3';
import sendingSound from '../audio/sending.mp3';

const Messenger = () => {
  const dispatch = useDispatch();

  const [notificationPlay] = useSound(notificationSound);
  const [sendingPlay] = useSound(sendingSound);

  const scrollRef = useRef();
  const socket = useRef();
  const messageInputRef = useRef(null);

  const [currentFriend, setCurrentFriend] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [socketMessage, setSocketMessage] = useState('');
  const [typing, setTyping] = useState('');
  const [activeUser, setActiveUser] = useState([]);

  const { friends, messages, isLoading } = useSelector(
    (state) => state.messenger
  );
  const { myInfo } = useSelector((state) => state.auth);

  // Socket
  useEffect(() => {
    socket.current = io('ws://localhost:3001');
    socket.current.on('getMessage', (data) => {
      setSocketMessage(data);
    });

    socket.current.on('typing', (data) => {
      setTyping(data);
    });
  }, []);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit(`userTyping`, {
      senderId: myInfo._id,
      receiverId: currentFriend._id,
      message: e.target.value,
    });
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    sendingPlay();
    let data = {
      senderId: myInfo._id,
      receiverId: currentFriend._id,
      message: '❤',
    };

    socket.current.emit('sendMessage', {
      senderId: myInfo._id,
      senderName: myInfo.firstName,
      receiverId: currentFriend._id,
      message: {
        text: '❤',
        image: '',
      },
      time: new Date(),
    });

    dispatch(sendMessage(data));
  };

  const handleFocusMessage = (e) => {
    messageInputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendingPlay();
      let data = {
        senderId: myInfo._id,
        receiverId: currentFriend._id,
        message: newMessage.trim(),
      };

      if (newMessage.trim().length) {
        socket.current.emit('sendMessage', {
          senderId: myInfo._id,
          senderName: myInfo.firstName,
          receiverId: currentFriend._id,
          message: {
            text: newMessage.trim(),
            image: '',
          },
          time: new Date(),
        });
        socket.current.emit(`userTyping`, {
          senderId: myInfo._id,
          receiverId: currentFriend._id,
          message: '',
        });
        dispatch(sendMessage(data));
        setNewMessage('');
      }
    }
  };

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [dispatch, friends]);

  useEffect(() => {
    if (currentFriend && currentFriend !== '') {
      dispatch(getMessages(currentFriend._id));
      dispatch({ type: IS_LOADING });
    }
  }, [dispatch, currentFriend._id, currentFriend]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  const handleSendEmoji = (emo) => {
    setNewMessage(newMessage + emo);
    socket.current.emit(`userTyping`, {
      senderId: myInfo._id,
      receiverId: currentFriend._id,
      message: newMessage + emo,
    });
    messageInputRef.current.focus();
  };

  const handleSendImage = (e) => {
    if (e.target.files.length !== 0) {
      sendingPlay();
      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + '_' + imageName;

      const formData = new FormData();

      formData.append('senderId', myInfo._id);
      formData.append('senderName', myInfo.firstName);
      formData.append('receiverId', currentFriend._id);
      formData.append('newImageName', newImageName);
      formData.append('image', e.target.files[0]);
      dispatch(sendImageMassage(formData));
    }
  };

  useEffect(() => {
    socket.current.emit('addUser', myInfo._id, myInfo);
  }, [myInfo]);

  useEffect(() => {
    socket.current.on('getUser', (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo._id);
      setActiveUser(filterUser);
    });
  }, [myInfo._id]);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === myInfo._id
      ) {
        dispatch({
          type: SOCKET_MESSAGE,
          payload: {
            message: socketMessage,
          },
        });
      }
    }
  }, [currentFriend, dispatch, myInfo._id, socketMessage]);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend._id &&
      socketMessage.receiverId === myInfo._id
    ) {
      notificationPlay();
      toast.success(`${socketMessage.senderName} send a new message`);
      setSocketMessage('');
    }
  }, [currentFriend._id, myInfo._id, notificationPlay, socketMessage]);

  return (
    <div className="messenger">
      <Toaster
        position={'top-right'}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '18px',
          },
        }}
      />
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={myInfo.image} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.fullName}</h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>

            <div className="active-friends">
              {activeUser && activeUser.length
                ? activeUser.map((user) => {
                    return (
                      <ActiveFriend
                        setCurrentFriend={setCurrentFriend}
                        user={user}
                      />
                    );
                  })
                : ''}
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fr) => {
                    return (
                      <div onClick={() => setCurrentFriend(fr)}>
                        <div
                          className={
                            currentFriend._id === fr._id
                              ? 'hover-friend active'
                              : 'hover-friend'
                          }
                        >
                          <Friends myInfo={myInfo} friend={fr} />
                        </div>
                      </div>
                    );
                  })
                : 'No friend'}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            myInfo={myInfo}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessageHandler={sendMessageHandler}
            handleKeyDown={handleKeyDown}
            messages={messages}
            scrollRef={scrollRef}
            handleSendEmoji={handleSendEmoji}
            handleSendImage={handleSendImage}
            isLoading={isLoading}
            messageInputRef={messageInputRef}
            handleFocusMessage={handleFocusMessage}
            activeUser={activeUser}
            typing={typing}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Messenger;
