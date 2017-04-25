$(function () {
    var serverSocket = io();

    var requestNickname = function(joinCallback) {
        var nickname = prompt('What is your nickname?');

        if (nickname)        
            joinCallback(nickname);
        else {
            var result = confirm('A nickname is required. Do you want to enter it again?');
            if (result)
                requestNickname(joinCallback);
            else
                return;
        }
    };
    
    serverSocket.on('connect', function (data) {
        
        var joinCallback = function(nickname) {
            serverSocket.emit('join', nickname);
        };

        requestNickname(joinCallback);
    });


    // Listen the 'chat message' from the server
    serverSocket.on('chat-message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });

    serverSocket.on('join', function (name) {

        if (!name) return;

        var msg = name + ' joined!';
        $('#joined-users').append($('<li>').text(msg));
        $('#joined-users-container').fadeIn('slow');

        setTimeout(function () {
            $('#joined-users-container').fadeOut('slow', function () {
                $('#joined-users li').remove();
            });
        }, 3000);
    });

    serverSocket.on('add-chatter', function(name) {
        var $chatter = $('li').text(name).data('name', name);
        $('#connected-users').append($chatter);
    });

    serverSocket.on('remove-chatter', function(name) {
        var $chatter = $('li').text(name).data('name', name);
        $('#connected-users li[data-name="' + name + '"]').remove();
    });

    $('form').submit(function () {
        var message = $('#message_input').val();
        $('#message_input').val('');

        // Emits the 'messages' event on the server
        serverSocket.emit('chat-message', message);
        return false;
    });
});