var hello = require('./custom-hello');
var gb  = require('./custom-goodbye');
var requestMaker = require('./request-maker');

hello();
gb.goodbye();

requestMaker("Here's looking at you, kid.");
requestMaker("Something else.");