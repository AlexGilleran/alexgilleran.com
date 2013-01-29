define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var Blog = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this)
		},
		
		fetch : function() {
			
		},
	});

	return Blog;
});
