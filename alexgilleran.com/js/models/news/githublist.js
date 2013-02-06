define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/githubevent'
], function($, _, Backbone, GitHubEvent) {
	var GithubList = Backbone.Collection.extend({
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
					if (Array.isArray(data.data)) {
						eventList.update(data.data);
					}
				}
			});
		}
		
	});
	
	return GithubList;
})

