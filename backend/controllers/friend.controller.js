const User = require('../models/auth.model');
const Message = require('../models/message.model');
const { ObjectId } = require('mongoose').Types;
const formidable = require('formidable');
const { cloudinary } = require('../config/cloudinary');
const { isFileValid } = require('../shared.js/checkExtFile');
const fs = require('fs');

const getFriends = async (req, res) => {
  try {
    const listFriends = await User.aggregate([
      {
        $match: { email: { $ne: req.user.email } },
      },
      {
        $sort: {
          firstName: 1,
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          image: 1,
          fullName: { $concat: ['$firstName', ' ', '$lastName'] },
        },
      },
    ]);
    res.status(200).json({ friends: listFriends });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'Internal Server Error' });
  }
};

const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  if (senderId !== req.user._id) {
    return res.status(400).json({ errorMessage: 'Invalid request!' });
  }
  try {
    const insertMessage = await Message.create({
      senderId: ObjectId(senderId),
      receiverId: ObjectId(receiverId),
      message: {
        text: message,
        image: '',
      },
    });
    res.status(200).json({
      status: 'Success',
      message: insertMessage,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Internal Server Error',
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { senderId: ObjectId(userId) },
                { receiverId: ObjectId(id) },
              ],
            },
            {
              $and: [
                { receiverId: ObjectId(userId) },
                { senderId: ObjectId(id) },
              ],
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 20,
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    res.status(200).json({
      status: 'Success',
      message: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      errorMessage: 'Internal Server Error',
    });
  }
};

const sendImage = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.parse(req, async (err, fields, files) => {
    const { senderId, senderName, receiverId, newImageName } = fields;
    const { image } = files;
    const error = [];

    if (!senderId) {
      error.push('Please provide senderId');
    }

    if (!receiverId) {
      error.push('Please provide receiverId');
    }

    if (!newImageName) {
      error.push('Please provide newImageName');
    }
    if (Object.keys(files).length === 0) {
      error.push('Please provide user image');
    }

    if (error.length > 0) {
      fs.unlinkSync(image.filepath);
      return res.status(400).json({
        status: 'Fail',
        errorMessage: 'Invalid request!',
      });
    }

    // checks if the file is valid
    const isValid = isFileValid(image);

    if (!isValid) {
      fs.unlinkSync(image.filepath);
      // throes error if file isn't valid
      return res.status(400).json({
        status: 'Fail',
        errorMessage: 'The file type is not a valid type',
      });
    }

    try {
      const uploadToCloud = await cloudinary.v2.uploader.upload(
        image.filepath,
        {
          public_id: newImageName,
        }
      );

      let newMessage = {
        senderId: ObjectId(senderId),
        receiverId: ObjectId(receiverId),
        message: {
          text: '',
          image: uploadToCloud.secure_url,
        },
      };

      const insertMessage = await Message.create(newMessage);

      res.status(200).json({ status: 'Success', message: insertMessage });
      await new Promise((resolve) => setTimeout(resolve, 500));
      newMessage.senderName = senderName;
      global.io.emit('getMessage', newMessage);
    } catch (error) {
      fs.unlinkSync(image.filepath);
      console.log(error);
      res.status(500).json({
        status: 'Fail',
        errorMessage: error.message,
      });
    }
  });
};

module.exports = { getFriends, sendMessage, getMessage, sendImage };
