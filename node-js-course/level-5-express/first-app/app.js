var express = require('express');
var githubApi = require('./modules/github-api');

var app = express();

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});


app.get('/github/users/:username', function(req, response) {

    var username = req.params.username;

    githubApi.getUser(username, function(err, user) {

        if (!err)
            response.write(JSON.stringify(user));
    });
});

app.listen(8080);