import React from 'react';

const Friends = ({ friend, myInfo }) => {
  const { msgInfo } = friend;
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
