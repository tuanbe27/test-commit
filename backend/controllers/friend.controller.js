const User = require('../models/auth.model');

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
          fullName: '$lastName' + ' ' + '$firstName',
        },
      },
    ]);
    res.status(200).json({ friends: listFriends });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: 'Internal Server Error' });
  }
};

module.exports = { getFriends };
