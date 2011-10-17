
var http = require("http");

var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		"Content-Type": "text/html"
	});
	
	setTimeout(function() {
		response.end("<html><body><h1>Hello WDCNZ!!!</h1></body></html>\n");
	}, 2000);
});

server.listen(4001);