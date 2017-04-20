var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    // Emits the 'messages' event on the client
    client.emit('messages', { hello: 'world'});
});

httpServer.listen(8080, function() {
    console.log('listening on *:8080');
});