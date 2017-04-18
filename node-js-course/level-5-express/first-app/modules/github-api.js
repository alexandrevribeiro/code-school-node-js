var request = require('request');
var url = require('url');

var githubHost = 'api.github.com';

var reqOptions = {
    headers: {
        'User-Agent': 'vribeiro-alexandre'
    },
    json: true
};

var githubApi = {
    getUser: function(username, callback) {

        var urlOptions = {
            protocol: 'https',
            host: githubHost,
            pathname: '/users/' + username
        };

        var githubUrl = url.format(urlOptions);

        request(githubUrl, reqOptions, function(err, res, body) {
            
            if (err)
                callback(err);
            else {
                callback(null, body);
            }            
        });
    }
};


module.exports = githubApi;