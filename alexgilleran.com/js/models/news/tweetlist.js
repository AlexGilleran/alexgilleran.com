define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/tweet'
], function($, _, Backbone, Tweet) {
	var TweetList = Backbone.Collection.extend({
		model: Tweet,
		url : 'http://search.twitter.com/search.json?q=from:AlexGilleran',
		
		initialize : function() {
			
		},
		
		fetch : function() {
			tweetList = this;
			
			return $.ajax({
				dataType: "jsonp",
				url: this.url,
				cache: true,
				success: function(data, status, jqXhr) {
					tweetList.update(data.results);
				}
			});
		}
		
	});
	
	return TweetList;
})
