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
		},
		
		
		fetch : function() {
			eventList = this;
			
			return $.ajax({
				dataType: "jsonp",
				url: this.url,
				cache: true,
				success: function(data, status, jqXhr) {
					eventList.update(data.data);
				}
			});
		}
		
	});
	
	return TweetList;
})

