var express = require('express');
var request = require('request');
var url = require('url');

var app = express();

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});


app.get('/github/users/:username/json', function(req, response) {

    var username = req.params.username;

    var urlOptions = {
        protocol: 'https',
        host: 'api.github.com',
        pathname: '/users/' + username
    };

    var reqOptions = {
        headers: {
            'User-Agent': 'vribeiro-alexandre'
        }
    };

    var githubUrl = url.format(urlOptions);
    request(githubUrl, reqOptions).pipe(response);
});

app.listen(8080);