define([
 'backbone',
 'js/models/navnode',
 ], function(Backbone, NavNode) {
	var Structure = Backbone.Model.extend({
		nodeList: [],
		
		defaults : {
			ready: false
		},
		
		initialize : function() {
			
		},

		fetch : function() {
			var structure = this;
			
			$.ajax('data/structure.json', {
				success : function(structureData, textStatus, jqXHR) {
					structureData.data.forEach(function(nodeData) {
						navNode = new NavNode(nodeData);
						structure.listenTo(navNode, 'change:open', this.onOpenNodeChanged);
						
						if (navNode.get('open')) {
							structure.set('currentNode', navNode);
						}				
						
						structure.nodeList.push(navNode);
					});
					
					structure.set('ready', true);
				},
				error : function(xhr, status, error) {
					alert(error);
				}
			});
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
		},
		
		nodeCount : function() {
			var count = 0;
			
			this.nodeList.forEach(function(node) {
				if (!node.isSpacer()) {
					count++;
				}
			});
			
			return count;
		},
		
		spacerCount : function() {
			var count = 0;
			
			this.nodeList.forEach(function(node) {
				if (node.isSpacer()) {
					count++;
				}
			});
			
			return count;
		},
	});

	return Structure;
});
