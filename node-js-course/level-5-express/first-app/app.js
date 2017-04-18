var express = require('express');
var githubApi = require('./modules/github-api');

var app = express();

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/github/users/:username', function(req, response) {

    var username = req.params.username;

    githubApi.getUser(username, function(err, user) {
        if (err) return;        

        githubApi.getRepos(username, function (repoErr, repos) {
            if (err) return;
            response.locals = { name : user.name, repos: repos};
            response.render('github-user.ejs');
            response.end();
        });
    });
});

app.get('/github/users/:username/json', function(req, response) {

    githubApi.getUser(req.params.username, function(err, user) {
        if (err) {
            console.error(err);
            response.write(err);            
        } else {
            response.write(JSON.stringify(user));
        }
        response.end();
    });
});

app.listen(8080);