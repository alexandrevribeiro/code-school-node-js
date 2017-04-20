var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Client connected...');

    // Listens for 'join' event and sets the 'nickname' associated with this socket
    socket.on('join', function(name) {
        socket.nickname = name;
        console.log(name + ' joined!');
    });

    // Listen for 'messages' events
    socket.on('chat-message', function(msg) {
        var message = socket.nickname + ': ' + msg;
        console.log(message);

        // Broadcasts the message to all other sockets connected
        socket.broadcast.emit('chat-message', message);

        // Then sends the same message back to our socket
        socket.emit('chat-message', message);        
    });
});

httpServer.listen(8080, function() {
    console.log('listening on *:8080');
});