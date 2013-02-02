define([
 'backbone',
 'js/models/navnode',
 ], function(Backbone, NavNode) {
	var Structure = Backbone.Collection.extend({
		model: NavNode,
		url: 'data/structure.json',
		attributes: {},
		
		initialize : function() {
			this.on('change:open', this.onOpenNodeChanged)
			this.on('reset', this.onReset)
		},
		
		onReset : function(structure, options) {
			this.forEach(function(node) {
				if (node.get('open')) {
					structure.set('currentNode', node);
				}
			});
			
			structure.set('structureReady', true);
		},
		
		onOpenNodeChanged : function(changedNode, opened, options) {
			// If the node has been opened, we must close all the other nodes
			if (opened) {
				this.forEach(function(listNode) {
					if (listNode != changedNode) {
						listNode.set('open', false);
					}
				})
				
				this.set('currentNode', changedNode);
			}
		},
		
		set: Backbone.Model.prototype.set,
		get: Backbone.Model.prototype.get,
		_validate: Backbone.Model.prototype._validate,
		
		/**
	    set: function(prop, value) {
	        if (value === undefined) {
	            return this.attributes[prop]
	        } else {
	            this._attributes[prop] = value;
	            this.trigger('change:' + prop, value);
	        }
	    },
		
	    get: function(prop, value) {
	        if (value === undefined) {
	            return this.attributes[prop]
	        } else {
	            this._attributes[prop] = value;
	            this.trigger('change:' + prop, value);
	        }
	    },**/
	});

	return Structure;
});
