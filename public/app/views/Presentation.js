
XERO.views.Presentation = Ext.extend(Ext.Carousel, {
    
	cls: "xero-carousel",
	scroll: false,
	indicator: false,
	
    initComponent: function() {
    	this.addEvents("next", "back", "end", "start");
    	
        XERO.views.Presentation.superclass.initComponent.apply(this, arguments);
    },
    
    onRender: function() {
        XERO.views.Presentation.superclass.onRender.apply(this, arguments);

		if(this.el) {
	   		this.bindKeyEvents();
	   	}
    },
    
    show: function(pageIndex) {
    	XERO.views.Presentation.superclass.show.call(this);
    	
    	if(pageIndex) {
    		this.setActiveItem(pageIndex);
    	}
    },
    
	bindKeyEvents: function() {
		Ext.getBody().on("keydown", function(e) {
			var key = e.browserEvent.keyCode;
			switch(key) {
				case 39:
					this.fireEvent("next", this);
					break;
				case 37:
					this.fireEvent("back", this);;
					break;
			}
		}, this);
	},
	
	goToPage: function(index) {
		var items = this.layout.getLayoutItems(),
            oldIndex = items.indexOf(this.layout.activeItem);
            
        if(oldIndex === (index - 1)) { // go next
        	return this.goNext();
        } else if (oldIndex === (index + 1)) { // go back
        	return this.goBack();
        } else {
        	var page = items[index];
			this.setActiveItem(page);
        }
        return this;	
	},
	
	goNext: function() {
        var next = this.layout.getNext();
		if(next.noAnimation !== true) {
			return this.next();
		}
        if (next) {
        	this.goToCard(next);
        }
        return this;
    },
    
    goBack: function() {
        var prev = this.layout.getPrev();
        if(prev.noAnimation !== true) {
			return this.prev();
		}
        if (prev) {
            this.goToCard(prev);
        }
        return this;
    },
    
    goToCard : function(newCard) {
        this.currentScroll = {x: 0, y: 0};
        this.oldCard = this.layout.activeItem;
        
        if (newCard != this.oldCard && this.isCardInRange(newCard) && this.onBeforeCardSwitch(newCard, this.oldCard, this.items.indexOf(newCard), true) !== false) {
            this.layout.activeItem = newCard;
            if (this.horizontal) {
                this.currentScroll.x = -this.getCardOffset(newCard);
            }
            else {
                this.currentScroll.y = -this.getCardOffset(newCard);
            }
        }
        
        this.updateCardPositions(false);
        this.onTransitionEnd();
    }
	
});

Ext.reg("xero-views-presentation", XERO.views.Presentation);
