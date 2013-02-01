define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/tweet'
], function($, _, Backbone, Tweet) {
	var TweetList = Backbone.Collection.extend({
		model: Tweet,
		url : 'http://search.twitter.com/search.json?rpp=5&q=from:AlexGilleran&callback=?',
		
		initialize : function() {
			
		},
		
		fetch : function() {
			tweetList = this;
			
			return $.getJSON(this.url, function(data, status, jqXhr) {
					tweetList.update(data.results);
				}
			);
		}
		
	});
	
	return TweetList;
})