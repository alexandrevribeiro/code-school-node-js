var http = require('http');

// "request" and "response" and streams and EventEmitters

http.createServer(function(request, response) {
    response.writeHead(200);

    request.on('readble', function() {
      var chunk = null;
      while ((chunk = request.read()) !== null) {
        response.write(chunk);
      }
    });

    request.on('end', function() {
      response.end();
    });

    // The event listeners created above can just be replaced by:
    // request.pipe(response);
    
}).listen(8080);
console.log('listening on port 8080...');