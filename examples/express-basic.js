
var app = require("express").createServer();

app.get("/", function(request, response) {
	response.redirect("/hello/wdcnz");
});

app.get("/hello/wdcnz", function(request, response) {
	response.send("Hello WDCNZ!");
});

app.listen(4005);