
var tty = require("tty"),
	net = require("net");
	
var server = net.createServer(function(socket) {

	var shell = tty.open("/bin/bash");
	
	var bashSocket = shell[0];
	bashSocket.pipe(socket);
	socket.pipe(bashSocket);
	
	var childProcess = shell[1];
	childProcess.on("end", function() {
		console.log("socket closed");
		socket.close();
	});
});

console.log("we're listening...");
server.listen(4003);

// telnet localhost 4003