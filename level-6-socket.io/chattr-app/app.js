var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Client connected...');

    // Listen for 'messages' events
    socket.on('chat-message', function(data) {
        console.log(data);
        // Broadcasts message to all other clients connected
        socket.broadcast.emit('chat-message', data);
    });
});

httpServer.listen(8080, function() {
    console.log('listening on *:8080');
});