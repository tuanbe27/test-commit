import React from 'react';
import moment from 'moment';

const Friends = ({ friend, myInfo, lastMessage }) => {
  let { msgInfo } = friend;
  if (lastMessage) {
    msgInfo = lastMessage;
  }
  return (
    <div className="friend" id={friend._id}>
      <div className="friend-image">
        <div className="image">
          <img src={friend.image} alt="" />
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{friend.fullName}</h4>
          <div className="msg-time">
            {msgInfo && msgInfo.senderId === myInfo._id ? (
              <span>You: </span>
            ) : (
              <span>{friend.firstName + ': '}</span>
            )}
            {msgInfo && msgInfo.message.text ? (
              <span>
                {msgInfo.message.text.length >= 10
                  ? msgInfo.message.text.slice(0, 10) + '... '
                  : msgInfo.message.text + ' '}
              </span>
            ) : msgInfo && msgInfo.message.image ? (
              <span>Send an image </span>
            ) : (
              <span>Connect you</span>
            )}
            <span>
              · {msgInfo && moment(msgInfo.createdAt).startOf('mini').fromNow()}
            </span>
          </div>
        </div>
        {myInfo._id === msgInfo?.senderId ? (
          <div className="seen-unseen-icon">
            <img src={friend.image} alt="" />
          </div>
        ) : (
          <div className="seen-unseen-icon">
            <div className="seen-icon"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
