define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/githubevent'
], function($, _, Backbone, GitHubEvent) {
	var TweetList = Backbone.Collection.extend({
		model: GitHubEvent,
		url : 'https://api.github.com/users/AlexGilleran/events/public',
		
		initialize : function() {
			this.fetch = _.bind(this.fetch, this);
		},
		
	});
	
	return TweetList;
})

