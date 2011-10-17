
var tty = require("tty"),
	net = require("net");
	
var host = process.argv[2] || "localhost",
	port = process.argv[3] || "4003";
	
var client = net.createConnection(port, host);

client.pipe(process.stdout);
process.stdin.pipe(client);

tty.setRawMode(true);

process.stdin.resume();