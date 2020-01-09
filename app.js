const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

let MESSAGE = 'Hello World';

server.listen(port);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {
        msg: MESSAGE
    });
});

app.get('/form', (req, res) => {
    res.render('form', {
        msg: MESSAGE
    });
});

io.on('connection', socket => {
    // socket.on('disconnect', () => {});

    socket.on('send-message', data => {
        MESSAGE = data;
        io.emit('message', data);
    });
});
