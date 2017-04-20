var request = require('request');
var url = require('url');
var githubAcc = require('./github-account');

var githubHost = githubAcc.username + ':' + githubAcc.password + '@api.github.com';

var callGithubApi = function (pathname, callback) {

    var reqOptions = {
        json: true,
        headers: { 'User-Agent': 'vribeiro-alexandre' }
    };

    var urlOptions = {
        protocol: 'https',
        host: githubHost,
        pathname: pathname
    };

    var githubUrl = url.format(urlOptions);
    console.log('Requesting... ' + githubUrl);

    request(githubUrl, reqOptions, function (err, res, jsonObj) {
        callback(err, jsonObj);
    });
};

var githubApi = {
    getUser: function (username, callback) {
        var pathname = '/users/' + username;
        callGithubApi(pathname, callback);
    },
    getRepos: function (username, callback) {
        var pathname = '/users/' + username + '/repos';
        callGithubApi(pathname, callback);
    }
};




module.exports = githubApi;