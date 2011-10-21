
var app = require("express").createServer();

app.get("/", function(request, response) {
	response.redirect("/hello/sencha");
});

app.get("/hello/sencha", function(request, response) {
	response.send("Hello SenchaCon!");
});

app.listen(4005);
