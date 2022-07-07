const router = require('express').Router();
const {
  getFriends,
  sendMessage,
  getMessage,
  sendImage,
  getFriendWithLastMessage,
  deleteImage,
} = require('../controllers/friend.controller');
const { authGuard } = require('../middleware/auth.middleware');

router.get('/friend/:id', authGuard, getMessage);
router.get('/friends', authGuard, getFriends);
router.get('/friends/messages', authGuard, getFriendWithLastMessage);
router.post('/send', authGuard, sendMessage);
router.post('/send-image', authGuard, sendImage);
router.post('/delete-image', authGuard, deleteImage);

module.exports = router;
