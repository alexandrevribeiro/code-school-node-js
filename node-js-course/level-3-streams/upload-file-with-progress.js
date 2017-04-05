var http = require('http');
var fs  = require('fs');

// "request" and "response" and streams and EventEmitters

http.createServer(function(request, response) {    
    var newFile = fs.createWriteStream('readme_copy.md');
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;


    request.on('readable', function() {
        var chunk = null;

        while((chunk = request.read()) != null) {
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileBytes) * 100;
            response.write('Progress: ' + parseInt(progress, 10) + '%\n');
        }
    });

    // Pipes the sent file to the new file
    request.pipe(newFile);

    request.on('end', function() {
        response.write('Progress: 100%\n');
        response.end('Uploaded!');
    });
}).listen(8080);
console.log('listening on port 8080...');

// Using it:
// curl --upload-file large_file.png http://localhost:8080