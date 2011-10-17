
XERO.views.Map = Ext.extend(Ext.Map, {
	
	itemId: 'vizmap',
	useCurrentLocation: false,
	defaultPosition: {
		lat: 39, 
		lng: 10
	},
	
	initComponent: function() {
		this.mapOptions = {
			center: new google.maps.LatLng(this.defaultPosition.lat, this.defaultPosition.lng),
			zoom: 2
		};
		
		this.socket = new XERO.utils.Socket({
			host: "50.57.108.117",
			port: 8000,
			listeners: {
				message: function(cmp, msg) {
					if(msg && msg.location) {
						this.addMarker(msg.location);
					}
				},
				scope: this 
			}
		});
  		
  		XERO.views.Map.superclass.initComponent.call(this);
  		
  		this.socket.start();
    },
    /*
    addMarker: function(title, position) {
    	return new google.maps.Marker({ 
			map: this.map, 
			title : config.title || "",
			position: new google.maps.LatLng(position.lat, position.lng)  
		});
    },*/
    
    removeMarker: function(marker) {
    	marker.setMap(null);
    },
    
    addMarker: function(location) {
    	console.log(location);
    	
    	var marker = new google.maps.Marker({ 
			map: this.map, 
			title : location.city || location.country_name,
			position: new google.maps.LatLng(location.latitude, location.longitude)  
		});
		
		Ext.defer(function() {
			this.removeMarker(marker);
		}, 2000, this);
    	/*
    	var geometry = {
			coordinates: [
				location.longitude, 
				location.latitude
			],
			type: "Marker",
			id: id,
			radius: 10,
			text: location.city || location.country_name
		  };

		  this.map.add(this.po.geoJson().features([{ geometry: geometry }]));
		  
		  Ext.defer(function() {
		  	Ext.fly(id).remove();
		  }, 500);
		*/
	}
    
});

Ext.reg("xero-views-map", XERO.views.Map);