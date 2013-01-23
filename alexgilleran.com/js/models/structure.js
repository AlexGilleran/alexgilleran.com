define([
 'backbone',
 'js/models/navnode',
 'js/data/structuredata'
 ], function(Backbone, NavNode, structureData) {
	var Structure = Backbone.Model.extend({
		nodeList: [],
		
		initialize : function() {
	
		},

		fetch : function() {
			structureData.forEach(function(nodeData) {
				navNode = new NavNode(nodeData);
				this.listenTo(navNode, 'change:open', this.onOpenNodeChanged);
				
				if (navNode.get('open')) {
					this.set('currentNode', navNode);
				}				
				
				this.nodeList.push(navNode);
			}, this);
		},
		
		onOpenNodeChanged : function(changedNode, opened, options) {
			// If the node has been opened, we must close all the other nodes
			if (opened) {
				this.nodeList.forEach(function(listNode) {
					if (listNode != changedNode) {
						listNode.set('open', false);
					}
				})
				
				this.set('currentNode', changedNode);
			}
		}
	});

	return Structure;
});
