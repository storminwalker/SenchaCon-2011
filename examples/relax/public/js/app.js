Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View'
]);

Ext.onReady(function(){

	var model = Ext.define("Speaker", {
        extend: "Ext.data.Model",
        fields: [
           {name: "name"},
           {name: "title"},
           {name: "synopsis"}
        ]
    });

    var store = Ext.create("Ext.data.Store", {
        model: "Speaker",
        proxy: {
            type: "rest",
            url: "/wdcnz/speakers"
        }
    });
    store.load();
	
	var speakersview = Ext.create("Ext.Panel", {
        frame: true,
        width: 535,
        title: 'WDCNZ Speakers',
        items: Ext.create("Ext.view.View", {
            store: store,
            tpl: [
                '<tpl for=".">',
                	'<div class="speaker">',
						'<div><h2>{name}<h2></div>',
						'<div>{title}</div>',
						'<div>{synopsis}</div>',
					'</div>',
				'</tpl>',
                '<div class="x-clear"></div>'
            ],
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No speakers to display'
        })
    });
	
	speakersview.render(document.body);
	
    var form = Ext.create("Ext.form.Panel", {
        url: '/wdcnz/speakers/',
        frame: true,
        title: 'Enter speaker',
        bodyStyle: "padding:5px 5px 0",
        width: 500,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Name',
            name: 'name',
            allowBlank:false
        },{
            fieldLabel: 'Title',
            name: 'title',
            allowBlank:false
        },{
	        xtype: 'textareafield',
            fieldLabel: 'Synopsis',
            name: 'synopsis'
        }],

        buttons: [{
            text: 'Save',
            handler: function() {
	            var form = this.up('form').getForm();
	            form.submit({
					success: function(form, action) {
						store.load();
						Ext.Msg.alert('Success', action.result.msg);
					},
					failure: function(form, action) {
						Ext.Msg.alert('Failed', action.result.msg);
					}
				});
				form.clear();
	        }
        }]
    });

    form.render(document.body);
});