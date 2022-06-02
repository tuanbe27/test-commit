import React from 'react';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = () => {
  return (
    <div className="col-9">
      <div className="right-side">
        <div className="row">
          <div className="col-8">
            <div className="message-screen">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src="/image/blade.png" alt="" />
                  </div>
                  <div className="name">
                    <h3>User</h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>
                  <div className="icon">
                    <FaVideo />
                  </div>
                  <div className="icon">
                    <BsFillChatDotsFill />
                  </div>
                </div>
              </div>
              <Message />
              <MessageSend />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
