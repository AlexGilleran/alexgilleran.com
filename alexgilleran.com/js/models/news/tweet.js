define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/news/newsitem'
], function($, _, Backbone, NewsItem) {
	var Tweet = NewsItem.extend({
		
		initialize : function() {
			//this.onProjectReady = _.bind(this.onProjectReady, this);
			this.set('source', 'twitter');
			this.set('date', new Date(this.get('created_at')));
			this.set('url', 'http://twitter.com/' + this.get('from_user') + '/status/' + this.get('id_str'));
		},
	});
	
	return Tweet;
});
