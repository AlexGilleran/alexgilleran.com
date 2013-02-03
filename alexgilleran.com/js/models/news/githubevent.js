define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/newsitem'
], function($, _, Backbone, NewsItem) {
	var GithubEvent = NewsItem.extend({
		
		initialize : function() {
			this.set('date', new Date(this.get('created_at')));
			this.set('source', 'github');
			this.set('url', 'http://github.com/' + this.get('repo').name);
		}
		
	});
	
	return GithubEvent;
});

