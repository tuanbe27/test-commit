import React from 'react';
import { GrAttachment } from 'react-icons/gr';
import { FaFileImage, FaGift, FaSmile } from 'react-icons/fa';
import { emojis } from '../icons/faceIcon';

const MessageSend = () => {
  return (
    <div className="message-send-section">
      <input type="checkbox" name="" id="emoji" />
      {/* Attachment */}
      <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <GrAttachment />
      </div>
      {/* Add image */}
      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <label htmlFor="pic">
          <FaFileImage />
        </label>
      </div>
      {/* Add gift */}
      <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <FaGift />
      </div>
      {/* Add message input */}
      <div className="message-type">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control"
        />
        <div className="file hover-gift">
          <label htmlFor="emoji">
            <FaSmile />
          </label>
        </div>
      </div>
      <div className="file">❤</div>
      <div className="emoji-section">
        <div className="imoji">
          {emojis.map((e) => (
            <span>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
