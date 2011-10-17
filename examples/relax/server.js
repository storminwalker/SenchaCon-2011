
var extjs = require("node-extjs"),
	express = require("express"),
	config = require("./config/config.js");
	
// configure the app...
var app = express.createServer();
config.express.configure(app, express);

// set up routes...
require('./routes/speakers')(app);

// listen...
app.listen(config.host.port, config.host.hostname);
console.log("Express web server listening on 4006");

