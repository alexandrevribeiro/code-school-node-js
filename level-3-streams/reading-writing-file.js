var fs  = require('fs');

var file = fs.createReadStream('readme.md');
var newFile = fs.createWriteStream('readme_copy.md');

// Pipes the file into the newFile
file.pipe(newFile);