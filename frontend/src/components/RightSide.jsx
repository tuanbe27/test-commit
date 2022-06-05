import React from 'react';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = ({
  currentFriend,
  inputHandle,
  newMessage,
  sendMessageHandler,
  handleKeyDown,
  messages,
  myInfo,
  scrollRef,
  handleSendEmoji,
  handleSendImage,
  isLoading,
  messageInputRef,
  handleFocusMessage,
  activeUser,
}) => {
  return (
    <div className='col-9'>
      <div className='right-side'>
        <input type='checkbox' id='dot' />
        <div className='row'>
          <div className='col-8'>
            <div className='message-screen'>
              <div className='header'>
                <div className='image-name'>
                  <div className='image'>
                    <img src={currentFriend.image} alt='' />
                    {activeUser &&
                    activeUser.length &&
                    activeUser.some(
                      (user) => user.userId === currentFriend._id
                    ) ? (
                      <div className='active-icon'></div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='name'>
                    <h3>{currentFriend.fullName}</h3>
                  </div>
                </div>
                <div className='icons'>
                  <div className='icon'>
                    <FaPhoneAlt />
                  </div>
                  <div className='icon'>
                    <FaVideo />
                  </div>
                  <label htmlFor='dot'>
                    <div className='icon'>
                      <IoEllipsisVertical />
                    </div>
                  </label>
                </div>
              </div>
              <Message
                messages={messages}
                currentFriend={currentFriend}
                myInfo={myInfo}
                scrollRef={scrollRef}
                isLoading={isLoading}
                handleFocusMessage={handleFocusMessage}
              />
              <MessageSend
                inputHandle={inputHandle}
                newMessage={newMessage}
                sendMessageHandler={sendMessageHandler}
                handleKeyDown={handleKeyDown}
                handleSendEmoji={handleSendEmoji}
                handleSendImage={handleSendImage}
                messageInputRef={messageInputRef}
              />
            </div>
          </div>
          <div className='col-4'>
            <FriendInfo activeUser={activeUser} currentFriend={currentFriend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
