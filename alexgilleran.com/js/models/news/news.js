define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/newsitem',
	'js/models/news/tweetlist',
	'js/models/news/githublist'
], function($, _, Backbone, NewsItem, TweetList, GitHubList) {
	var News = Backbone.Collection.extend({
		model: NewsItem,
		
		sources: [
			new TweetList(),
			new GitHubList()
		],
		
		initialize : function() {
			this.sources.forEach(function(source) {
				this.listenTo(source, 'add', this.onNewItem);
			}, this);
		},
		
		onNewItem : function(model, collection, properties) {
			this.add(model);
		},		
		
		fetch : function() {
			var fetchList = [];
			
			this.sources.forEach(function(source) {
				fetchList.push(source.fetch({update: true}));
			}, this);
			
			return $.when.apply(null, fetchList);
		},
		
		comparator : function(newsItem1, newsItem2) {
			if (newsItem1.date() > newsItem2.date()) {
				return -1;
			} else if (newsItem1.date() < newsItem2.date()) {
				return 1;
			} else {
				return 0;
			}
		}
	});
	
	return News;
})
