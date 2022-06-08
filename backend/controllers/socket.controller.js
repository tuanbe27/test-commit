let users = [];
const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userId === userId);
  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findFriend = (id) => {
  return users.find((u) => u.userId === id);
};

module.exports.handleSocket = (socket, io) => {
  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', users);
  });

  socket.on('sendMessage', (data) => {
    const user = findFriend(data.receiverId);
    if (user) {
      socket.to(user.socketId).emit('getMessage', {
        senderId: data.senderId,
        senderName: data.senderName,
        receiverId: data.receiverId,
        createdAt: data.time,
        message: {
          text: data.message.text,
          image: data.message.image,
        },
      });
    }
  });

  socket.on('userTyping', (data) => {
    const user = findFriend(data.receiverId);
    if (user) {
      socket.to(user.socketId).emit('typing', {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message.trim(),
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User is disconnect...');
    removeUser(socket.id);
    io.emit('getUser', users);
  });
};
