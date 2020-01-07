const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

server.listen(port);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/form', (req, res) => {
    res.render('form');
});

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('send-message', data => {
        io.emit('message', data);
    });
});
