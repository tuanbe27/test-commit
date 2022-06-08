import React from 'react';
import moment from 'moment';
import LoadingSpinner from './LoadingSpinner';

const Message = ({
  messages,
  myInfo,
  currentFriend,
  scrollRef,
  isLoading,
  handleFocusMessage,
  typing,
}) => {
  return (
    <>
      <div className="message-show" onClick={handleFocusMessage}>
        {isLoading ? (
          <LoadingSpinner />
        ) : messages && messages.length ? (
          messages.map((message, index) => {
            let view = '';
            if (message.senderId === myInfo._id) {
              view = (
                <div ref={scrollRef} className="my-message">
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">
                        {message.message.image.length ? (
                          <img src={message.message.image} alt="" />
                        ) : (
                          message.message.text
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="time">
                    {moment(message.createdAt).format('MMM Do YY')}
                  </div>
                </div>
              );
            }

            if (message.senderId === currentFriend._id) {
              view = (
                <div ref={scrollRef} className="fd-message">
                  <div className="image-message-time">
                    <img src={currentFriend.image} alt="" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text">
                          {message.message.image.length ? (
                            <img src={message.message.image} alt="" />
                          ) : (
                            message.message.text
                          )}
                        </p>
                      </div>
                      <div className="time">
                        {moment(message.createdAt).format('MMM Do YY')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return view;
          })
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>
              Bắt đầu cuộc trò chuyện với{' '}
              <strong>{currentFriend.fullName}</strong>
            </h2>
          </div>
        )}
      </div>
      {typing &&
      typing.message.length &&
      typing.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={currentFriend.image} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time">Typing Message ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Message;
