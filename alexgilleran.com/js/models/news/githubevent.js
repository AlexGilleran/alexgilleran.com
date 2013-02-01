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
			return new Date(this.get('created_at'));
		},
		
		text: function() {
			if (this.get('type') == 'PushEvent') {
				return this.get('payload').commits[0].message;
			} else if (this.get('type') == 'CreateEvent') {
				return this.get('payload').description.message;
			}
		},
		
		source: function() {
			return 'github';
		}
	});
	
	return Tweet;
});

