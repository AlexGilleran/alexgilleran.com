define([
 'backbone',
 'js/models/navnode',
 ], function(Backbone, NavNode) {
	var ExternalLink = Backbone.Collection.extend({
		model: NavNode,
		url: 'data/externallinks.json',
		
		initialize : function() {
		
		},
		
		displayableNodesCount : function() {
			var count = 0;
			
			this.forEach(function(node) {
				if (!node.get('hidden')) {
					count++;
				}
			});
				
			return count;
		}
	});

	return ExternalLink;
});