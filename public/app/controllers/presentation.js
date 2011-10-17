
Ext.regController("presentation", {

	initPresentation: function(request) {
		return {
			listeners: {
				next: this.next,
				back: this.back,
				scope: this
			}
		};
	},
	
	index: function(request) {
		if(! request.page) {
			Ext.History.add("/1"); // first page
		}
		
		var options = this.initPresentation(request);
		this.showPresentation(options, parseInt(request.page));
	},
	
	admin: function(request) {
		if(! request.page) {
			Ext.History.add("/admin/1"); // first page
		}
		
		var options = this.initPresentation(request);
		
		Ext.apply(options.listeners, {
			cardswitch: function(cmp, newCard, oldCard, index) {
				Ext.History.add("/admin/" + (++index));
				
				if(newCard.getEl().down("div.map")) {
					this.renderMap(newCard);
				}
				
				if(this.socket) {
					this.socket.sendMessage("gotopage", index);
				}	
			},
			scope: this
		});
		
		this.showPresentation(options, parseInt(request.page));
	},
	
	showPresentation: function(options, pageIndex) {
	
		this.socket = new XERO.utils.Socket({
			host: document.location.hostname,
			port: 8080,
			listeners: {
				message: function(cmp, msg) {
					if(msg.page) {
						this.goToPage(msg.page);
					}
				},
				scope: this 
			}
		});
  		
  		this.socket.start();
  		
		options = options || {};
		options.xtype = "xero-views-presentation";
		
		options.items = this.getSlides();
		
		options.listeners = options.listeners || {};
		
		Ext.applyIf(options.listeners, {
			cardswitch: function(cmp, newCard, oldCard, index) {
				Ext.History.add("/" + (++index));
				
				if(newCard.getEl().down("div.map")) {
					this.renderMap(newCard);
				}
			},
			scope: this
		});

		if (!this.presentationPanel) {
            this.presentationPanel = this.render(options, "viewport");
        }
        
        if(pageIndex) {
        	--pageIndex;
        }
        
      	this.presentationPanel.show(pageIndex);
	},
	
	getSlides: function() {
		var items = [];
		Ext.fly("presentation").select("div.slide").each(function(div, cpx, index) {
			//div.insertHtml("beforeEnd", Ext.util.Format.format('<span class="pageIndex">{0}</span>', ++index));
			items.push({
				xtype: "panel",
    			styleHtmlContent: true,
    			noAnimation: (div.hasCls("noanimation") === true),
    			html: div.dom.outerHTML
    		});  		
    	});
		return items;
	},
	
	goToPage: function(page) {
		if(this.presentationPanel) {
			page = page - 1;
			this.presentationPanel.goToPage(page);
		}
	},
	
	next: function() {
		if(this.presentationPanel) {
			this.presentationPanel.goNext();
		}
	},
	
	back: function() {
		if(this.presentationPanel) {
			this.presentationPanel.goBack();
		}
	},
	
	renderMap: function(panel) {
		if(! panel.map) {
			panel.map = new XERO.views.Map();
			
			panel.add(panel.map);
			panel.doLayout();
		}
	}
});