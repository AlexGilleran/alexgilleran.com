define([
 'backbone',
 'js/models/navnode',
 ], function(Backbone, NavNode) {
	var ExternalLink = Backbone.Collection.extend({
		model: NavNode,
		url: 'data/externallinks.json',
		
		initialize : function() {
		
		},
	});

	return ExternalLink;
});