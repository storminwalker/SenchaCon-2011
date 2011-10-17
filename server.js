var	http = require('http'),
  	static = require('node-static');
  	
var folder = new(static.Server)('./public');

var fileHandler = function (request, response) {
	request.addListener('end', function () {
		folder.serve(request, response);
	})
};

var server = http.createServer(fileHandler);
server.listen(8080);

console.log("Server started at http://*:8080");	

var io = require('socket.io').listen(server);
io.configure(function() {
	io.set('transports', ['websocket', 'xhr-polling']);
	io.enable('browser client minification');
	io.enable('browser client etag');
	io.set('log level', 1);
});

io.sockets.on("connection", function(socket) {
	console.log("socket connected");	
	
	socket.on("gotopage", function(pageIndex) {
		socket.broadcast.send(JSON.stringify({
			page: pageIndex
		}));
	});
});

console.log("Socket server started at ws://*:8080");	
