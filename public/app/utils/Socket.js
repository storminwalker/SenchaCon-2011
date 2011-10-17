
XERO.utils.Socket = Ext.extend(Ext.util.Observable, {
    
    host: "localhost",
    port: 80,
    
    constructor: function(config){
        this.addEvents("message");
        this.state = "stopped";
        XERO.utils.Socket.superclass.constructor.call(this, config);      
    },

	onClose: function() {
		if(this.getState() == "paused") {
			return;
		}
		if(this.getState() == "retrying") {
		  	console.log("still no socket, retrying in 3 seconds");
		  	Ext.defer(this.start, this, 3000);
		} else {
		  	this.setState("retrying");
		  	console.log("socket lost, retrying immediately");
		  	Ext.defer(this.start, this, 200);
		}
	},
	
	onOpen: function() {
		this.setState("started");
		console.log(Ext.util.Format.format("socket {0} listening on {1} started", this.host, this.port));
	},
	
	onMessage: function(message) {
		message = Ext.decode(message);  
		this.fireEvent("message", this, message);
	},
	
	sendMessage: function(type, message) {
		this.socket.emit(type, message);
	},
	
	getState: function() {
		return this.state;
	},
	
	setState: function(state) {
		this.state = state;
	},

	start: function() {
		this.socket = io.connect(this.host || document.location.hostname, { 
			port: this.port || 8000 
		});

		this.socket.on('message', Ext.createDelegate(this.onMessage, this));
		this.socket.on('disconnect',Ext.createDelegate(this.onClose, this));
		this.socket.on('connect', Ext.createDelegate(this.onOpen, this));
	}
});
