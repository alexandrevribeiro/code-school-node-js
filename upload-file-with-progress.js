var http = require('http');
var fs  = require('fs');

// "request" and "response" and streams and EventEmitters

http.createServer(function(request, response) {    
    var newFile = fs.createWriteStream('readme_copy.md');

    // Pipes the request sent to the new file
    request.pipe(newFile);

    request.on('end', function() {
        response.end('uploaded!')
    });
}).listen(8080);

// Using it:
// curl --upload-file readme.md http://localhost:8080