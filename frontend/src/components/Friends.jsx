import React from 'react';

const Friends = ({ data }) => {
  return (
    <div className="friend" id={data._id}>
      <div className="friend-image">
        <div className="image">
          <img src={data.image} alt="" />
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{data.fullName}</h4>
        </div>
      </div>
    </div>
  );
};

export default Friends;
