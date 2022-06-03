const router = require('express').Router();
const { getFriends } = require('../controllers/friend.controller');
const { authGuard } = require('../middleware/auth.middleware');

router.get('/friends', authGuard, getFriends);

module.exports = router;
