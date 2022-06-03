import React from 'react';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';
import { useSelector } from 'react-redux';

const RightSide = () => {
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-screen">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={myInfo.image} alt="" />
                  </div>
                  <div className="name">
                    <h3>{myInfo.username}</h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>
                  <div className="icon">
                    <FaVideo />
                  </div>
                  <label htmlFor="dot">
                    <div className="icon">
                      <IoEllipsisVertical />
                    </div>
                  </label>
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
