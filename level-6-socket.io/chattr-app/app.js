var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(clientSocket) {
    console.log('Client connected...');

    // Listens for 'join' event and sets the 'nickname' associated with this socket
    clientSocket.on('join', function(name) {
        clientSocket.nickname = name;
        clientSocket.broadcast.emit('join', name);
        console.log(name + ' joined!');
    });

    // Listen for 'messages' events
    clientSocket.on('chat-message', function(msg) {
        var message = clientSocket.nickname + ': ' + msg;
        console.log(message);

        // Broadcasts the message to all other sockets connected
        clientSocket.broadcast.emit('chat-message', message);

        // Then sends the same message back to our socket
        clientSocket.emit('chat-message', message);        
    });
});

httpServer.listen(8080, function() {
    console.log('listening on *:8080');
});