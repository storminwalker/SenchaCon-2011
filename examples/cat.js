
var fs = require("fs");

var filePath = process.argv[2];

var stream = fs.createReadStream(filePath);
stream.pipe(process.stdout);

// node cat.js "./resources/test.txt"