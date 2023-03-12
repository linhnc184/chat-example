const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/views/index.html`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.broadcast.emit('hi');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('app is started on 3000');
});
