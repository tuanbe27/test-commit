const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('dotenv').config({ path: 'backend/config/config.env' });
require('./config/database')();
const authRoute = require('./routes/auth.route');
const messengerRoute = require('./routes/friend.route');
const { handleSocket } = require('./controllers/socket.controller');

const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('short'));

io.on('connection', (socket) => {
  console.log('Connecting....');
  global.io = io;
  global.socket = socket;
  handleSocket(socket, io);
});

app.get('/', (_, res) => {
  res.send('<h1>Wellcome to my chat application</h1>');
});
app.use('/api/auth', authRoute);
app.use('/api/messenger', messengerRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
