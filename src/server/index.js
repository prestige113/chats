var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.send();
});

io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('chat message', function (msg) {
        console.log('message' + msg);
        io.emit('chat message', msg)
    })
});

http.listen(3001, function () {
    console.log('listen on 3001')
});



