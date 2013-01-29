define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var Projects = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this)
		},
		
		fetch : function() {
			
		},
	});

	return Projects;
});
