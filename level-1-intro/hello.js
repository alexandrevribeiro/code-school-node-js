var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200);
    response.write('Dog is running.');

    setTimeout(function() {
        response.end('Dog is done.');
    }, 5000); // 5 seconds    
}).listen(8080);
console.log('listening on port 8080...');