var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    console.log('Client connected...');

    // Emits the 'messages' event on the client
    client.emit('messages', { hello: 'world'});
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(8080);