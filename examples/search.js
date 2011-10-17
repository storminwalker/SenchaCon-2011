var http = require("http"),
	qs = require("querystring");

var search = function(searchFor) {
	searchFor = searchFor.substring(0, searchFor.length - 1);
	var google = http.get({
		host: "ajax.googleapis.com",
		path:  "/ajax/services/search/web?" + qs.stringify({ v: "1.0", q: searchFor })
	}, function(response) {
	});
	
	google.on("response", function(response) {
		response.setEncoding("utf8");
		var body = [];
		response.on("data", function(chunk) { body.push(chunk); });
		response.on("end", function() {
			var searchResults = JSON.parse(body.join(""));
			var results = searchResults["responseData"]["results"];
			for (var i = 0, len = results.length; i < len; i++) {
				console.log(results[i]["url"]);
			}
		});
	});
};

stdin = process.openStdin();
stdin.setEncoding("utf8");
stdin.on("data", search);