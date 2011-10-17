var path = require("path");

var config = {
	name : "WDCNZ Relax",
	host: {
		port: 4006,
		hostname: "0.0.0.0"
	},
	express: {
		configure: function(app, express) {
			app.configure(function(){
			  app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
			  app.use(express.bodyParser());
			  app.use(express.methodOverride());
			  app.use(express.cookieParser());
			  app.use(app.router);
			  app.use(express.static(__dirname + '/../public'));
			  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
			});
		}
	},
	db: {
		name: "wdcnz",
		configure: function(cradle) {
			cradle.setup({ 
				host: 'localhost',
				port: 5984,
				options: { 
					cache: true, 
					raw: false 
				}
			});
		}
	}
}

module.exports = config;
