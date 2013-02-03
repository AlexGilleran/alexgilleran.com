define([
	'jquery',
	'backbone',
	'handlebars',
	'js/views/aside/news/newsitemview',
	'js/util/linkify',
  	'text!templates/news/tweet.html'
], function($, Backbone, Handlebars, NewsItemView, linkify, TweetTemplate){
	var TweetView = NewsItemView.extend({
		tweetTemplate : Handlebars.compile(TweetTemplate),
		
		initialize : function() {
			NewsItemView.prototype.initialize.call(this);
		},
		
		createText : function() {
			tweetView = this;
			
			return this.tweetTemplate({
				'author' : tweetView.model.get('from_user'),
				'tweet-text' : linkify(tweetView.model.get('text'))
			});
		},
	
	});

	return TweetView;
});