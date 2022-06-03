const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
require('dotenv').config({ path: 'backend/config/config.env' });
require('./config/database')();
const authRoute = require('./routes/auth.route');
const messengerRoute = require('./routes/friend.route');

const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('short'));

app.get('/', (_, res) => {
  res.send('<h1>Wellcome to my chat application</h1>');
});
app.use('/api/auth', authRoute);
app.use('/api/messenger', messengerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
