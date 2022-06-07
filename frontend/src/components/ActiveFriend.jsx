import React from 'react';

const ActiveFriend = ({ user, setCurrentFriend }) => {
  return (
    <div className="active-friend">
      <div className="image-active-icon">
        <div className="image" onClick={() => setCurrentFriend(user.userInfo)}>
          <img src={user.userInfo.image} alt="" />
          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriend;
