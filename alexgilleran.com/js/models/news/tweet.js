define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/newsitem'
], function($, _, Backbone, NewsItem) {
	var Tweet = NewsItem.extend({
		
		initialize : function() {
			//this.onProjectReady = _.bind(this.onProjectReady, this);
		},
		
		date: function() {
			return this.get('created_at');
		},
		
		text: function() {
			return this.get('text');
		},
		
		source: function() {
			return 'twitter';
		}
	});
	
	return Tweet;
});
