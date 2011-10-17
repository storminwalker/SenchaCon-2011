
XERO.views.Viewport = Ext.extend(Ext.Panel, {
    
	id: 'viewport',
    fullscreen: true,
	monitorOrientation: true,
	scroll: false,
	layout: "card",
	
    initComponent: function() {
        XERO.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});