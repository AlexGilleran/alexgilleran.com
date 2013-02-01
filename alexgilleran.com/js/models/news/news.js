define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/newsitem',
	'js/models/news/tweetlist'
], function($, _, Backbone, NewsItem, TweetList) {
	var News = Backbone.Collection.extend({
		model: NewsItem,
		tweetList: new TweetList(),
		
		initialize : function() {
			this.tweetList.on('all', function(eventName, arg1, arg2, arg3) {
  				this.trigger(eventName, arg1, arg2, arg3);
  			}, this);
		},
		
		fetch : function() {
			this.tweetList.fetch();
		},
		
		comparator : function(newsitem) {
			return newsitem.date();
		}
	});
	
	return News;
})
