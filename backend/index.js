require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socketUtil = require('./utils/socket');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));

// routes
app.use('/api/bins', require('./routes/bins'));

// start server + socket
const server = require('http').createServer(app);
const io = socketUtil.init(server);

io.on('connection', socket => {
  console.log('socket connected', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

// connect mongo
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smartwaste', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => console.log('Backend listening on', PORT));
  })
  .catch(err => console.error('MongoDB connection error', err));
