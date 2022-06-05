import React from 'react';
import { GrAttachment } from 'react-icons/gr';
import { FaFileImage, FaGift, FaSmile } from 'react-icons/fa';
import { emojis } from '../icons/faceIcon';

const MessageSend = ({
  inputHandle,
  newMessage,
  sendMessageHandler,
  handleKeyDown,
  handleSendEmoji,
  handleSendImage,
  messageInputRef
}) => {
  return (
    <div className='message-send-section'>
      <input type='checkbox' name='' id='emoji'/>
      {/* Attachment */}
      <div className='file hover-attachment'>
        <div className='add-attachment'>Add Attachment</div>
        <GrAttachment />
      </div>
      {/* Add image */}
      <div className='file hover-image'>
        <div className='add-image'>Add Image</div>
        <input onChange={handleSendImage} type="file" name="" id="pic" className='form-control' />
        <label htmlFor='pic'>
          <FaFileImage />
        </label>
      </div>
      {/* Add gift */}
      <div className='file hover-gift'>
        <div className='add-gift'>Add gift</div>
        <FaGift />
      </div>
      {/* Add message input */}
      <div className='message-type' >
        <input
          type='text'
          name='message'
          id='message'
          placeholder='Aa'
          value={newMessage}
          onChange={inputHandle}
          onKeyDown={handleKeyDown}
          className='form-control'
          autoFocus
          ref={messageInputRef}
        />
        <div className='file hover-gift' >
          <label htmlFor='emoji' id='emoji-show'>
            <FaSmile />
          </label>
        </div>
      </div>
      <div onClick={sendMessageHandler} className='file'>
        ❤
      </div>
      <div className='emoji-section'>
        <div className='emoji'>
          {emojis.map((e) => (
            <span className='face-icon' onClick={()=>handleSendEmoji(e)}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
