
var app = require('express').createServer(),
    cradle = require('cradle');

var db = (new(cradle.Connection)()).database('wdcnz');

app.get("/", function(request, response) {
	response.redirect("/wdcnz/speakers");
});

app.get("/wdcnz/speakers", function(request, response) {
	db.view('speakers/all', function (err, docs) {
		response.send(docs.map(function(doc) {
			return {
				speaker: doc.speaker,
				title: doc.title,
				synopsis: doc.synopsis
			};
		}));
	});
});

app.listen(4006);
console.log("Express web server listening on 4006");

