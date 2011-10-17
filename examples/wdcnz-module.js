
var util = require("util");

var wdcnz = exports;

var printName = function(name, from) {
	console.log("private");
	util.log("Hello " + name + " from " + from);
}

var print = function(name, from) {
	console.log("public");
	printName(name, from);
}

wdcnz.print = print;

