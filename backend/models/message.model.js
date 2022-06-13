const { model, Schema } = require('mongoose');

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    senderName: {
      type: String,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    message: {
      text: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
    },
    status: {
      type: String,
      enum: ['seen', 'unseen'],
      default: 'unseen',
    },
  },
  { timestamps: true }
);

module.exports = model('messages', messageSchema);
