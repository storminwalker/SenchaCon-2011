
var	geoip = require("geoip"),
	path = require("path");

Ext.define("XERO.controller.Viz", {
    extend: "Ext.app.Controller",

	hitCount: 0,
	clients: [],
	
	// init the routing...
    init: function(app) {
		this.initGeoLookup();
        
        app.server.get('/*', Ext.bind(this.serveTrackingGif, this));
    },
    
    onLaunch: function() {
    	var me = this;
        var task = {
			run: this.broadcastHits,
			scope: this,
			interval: 5000 //5 seconds
		};
		
		this.application.io.sockets.on("connection", function(client){
			if(me.clients.length == 0) {
				Ext.TaskManager.start(task);
			}
			
			me.clients.push(client);
			
			client.on('disconnect', function(client){ 
				// stop the task runner - only collect hits when a connection is live
				me.clients = Ext.Array.remove(me.clients, client);
				if(me.clients.length == 0) {
					Ext.TaskManager.stop(task);
				}
			})
		});leftleft
    },
    
    initGeoLookup: function() {
		var cityPath = path.normalize(__dirname + '/../geoip/GeoLiteCity.dat');
		try {
			this.cityDb = new geoip.City(cityPath);
			console.log("GEOIP database initialized");
		} catch(err) {
			console.log("Cannot init GEOIP database");
		}
	},
    
    serveTrackingGif: function(req, res, next) {
    	next();

		var qs = Ext.Object.fromQueryString(req.url);
		qs.ip = qs.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
		
	    this.broadcastLocation({
	    	ip: qs.ip
	    });
	    this.hitCount++;
	},

	broadcastLocation: function(data) {
		var me = this,
			remoteAddress;
      		
		if(data.ip == "127.0.0.1") {
			remoteAddress = "8.8.8.8";
		} else {
			remoteAddress = data.ip;
		}
	
		this.cityDb.lookup(remoteAddress, function(err, location) {
			if(location && location.latitude) {
				Ext.apply(data, {
					type: "location",
					timestamp: new Date(),
					location: location
				});
				me.application.io.sockets.emit("message", data);
			}		
		});
	},
	
	broadcastHits: function() {
		var hits = this.hitCount;
		this.hitCount = 0;
		
		this.application.io.sockets.emit("message", {
			type: "hits",
			timestamp: new Date(),
			hits: hits
		});
		
		delete hits;
	}
})
    
