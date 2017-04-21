var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
var redisClient = require('redis').createClient();

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

var storeMessage = function(name, message) {
    var messageObj = JSON.stringify({name: name, message: message});

    redisClient.lpush('messages', messageObj, function(err, response) {
        // Keeps only the newest 10 items
        redisClient.ltrim('messages', 0, 9);
    });
};

io.on('connection', function(clientSocket) {
    console.log('Client connected...');

    // Listens for 'join' event and sets the 'nickname' associated with this socket
    clientSocket.on('join', function(name) {
        clientSocket.nickname = name;
        clientSocket.broadcast.emit('join', name);
        console.log(name + ' joined!');

        // Gets the stored messages and emit the 'chat-message' for each of them.
        // The '0, -1' means you want to get from the first item (0) to the last one (-1)
        redisClient.lrange('messages', 0, -1, function(err, messages) {
            // Reverse so they are emitted in correct order
            messages.reverse();

            messages.forEach(function(message) {
                var msgObj = JSON.parse(message);
                clientSocket.emit('chat-message', msgObj.name + ': ' + msgObj.message);
            });
        });
    });

    // Listen for 'messages' events
    clientSocket.on('chat-message', function(msg) {
        var message = clientSocket.nickname + ': ' + msg;
        console.log(message);

        // Broadcasts the message to all other sockets connected
        clientSocket.broadcast.emit('chat-message', message);

        // Then sends the same message back to our socket
        clientSocket.emit('chat-message', message);  

        // Stores the message
        storeMessage(clientSocket.nickname, msg);
    });
});

httpServer.listen(8080, function() {
    console.log('listening on *:8080');
});