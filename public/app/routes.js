

Ext.Router.draw(function(map) {
	map.connect("/",  {controller: "presentation", action: "index"});
	map.connect("/:page",  {controller: "presentation", action: "index"});
	map.connect("/admin",  {controller: "presentation", action: "admin"});
	map.connect("/admin/:page",  {controller: "presentation", action: "admin"});
});
