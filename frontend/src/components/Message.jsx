import React from 'react';

const Message = () => {
  return (
    <div className="message-show">
      {/* my message */}
      <div className="my-message">
        <div className="image-message">
          <div className="my-text">
            <p className="message-text">How are you?</p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>
      <div className="my-message">
        <div className="image-message">
          <div className="my-text">
            <p className="message-text">
              <img src="/image/blade.png" alt="" />
            </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>
      {/* friend message */}
      <div className="fd-message">
        <div className="image-message-time">
          <img src="/image/blade.png" alt="" />
          <div className="message-time">
            <div className="fd-text">
              <p className="message-text">I am fine</p>
            </div>
            <div className="time">3 Jan 2022</div>
          </div>
        </div>
      </div>
      <div className="fd-message">
        <div className="image-message-time">
          <img src="/image/blade.png" alt="" />
          <div className="message-time">
            <div className="fd-text">
              <p className="message-text">And You</p>
            </div>
            <div className="time">3 Jan 2022</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
