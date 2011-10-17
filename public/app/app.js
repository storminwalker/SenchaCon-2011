
Ext.regApplication({
	name: "XERO",
	
	icon: 'resources/images/icon.png',
	glossOnIcon: false,
	
	defaultUrl: "/",
	defaultTarget: "viewport",

	fullscreen: true,

	launch: function() {
		this.viewport = new XERO.views.Viewport({
      		application: this
    	});
    }
});

Ext.ns("XERO.utils", "XERO.widgets", "XERO.panels", "XERO.plugins");