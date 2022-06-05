const router = require('express').Router();
const {
  getFriends,
  sendMessage,
  getMessage,
  sendImage,
} = require('../controllers/friend.controller');
const { authGuard } = require('../middleware/auth.middleware');

router.get('/friend/:id', authGuard, getMessage);
router.get('/friends', authGuard, getFriends);
router.post('/send', authGuard, sendMessage);
router.post('/send-image', authGuard, sendImage);

module.exports = router;
