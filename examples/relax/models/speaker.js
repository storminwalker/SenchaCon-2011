
var cradle = require("cradle"),
	config = require("../config/config.js");

config.db.configure(cradle);

var connection = new (cradle.Connection);
var db = connection.database(config.db.name);

var Speaker = exports = module.exports = function Speaker(name, title, synopsis) {
 	this.name = name;
 	this.title = title;
	this.synopsis = synopsis;
	this.createdDate = new Date();
};

Speaker.prototype.validate = function(callback) {
	var errors = [];
	if(Ext.isEmpty(this.name)) {
		errors.push("Name is required");
	}
	if(Ext.isEmpty(this.title)) {
		errors.push("Title is required");
	}
	if(Ext.isEmpty(this.synopsis)) {
		errors.push("Synopsis is required");
	}
	
	return callback(errors.length === 0 ? null : new Error(errors));
};

Speaker.prototype.save = function(callback) {
	db.save(this, function(err, doc) {
		callback(err, doc);
	});
};

exports.count = function(callback) {
	db.view("speakers/all", function(err, docs) {
		callback(null, docs.length);
	});
};

exports.get = function(id, callback) {
	db.get(id, function(err, doc) {
		callback(err, doc);
	});
};

exports.all = function(callback) {
	db.view('speakers/all', function (err, docs) {
		callback(err, docs.map(function(item) {
			return item;
		}));
	});
}
