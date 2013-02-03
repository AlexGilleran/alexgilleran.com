define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'js/models/news/news',
  'js/views/aside/news/tweetview',
  'js/views/aside/news/githubeventview',
  'text!templates/asideframe.html',
], function($, _, Backbone, Handlebars, News, TweetView, GithubEventView, AsideFrameTemplate){
	var NewsAsideView = Backbone.View.extend({
		frameTemplate : Handlebars.compile(AsideFrameTemplate),
		itemViews : {
			'twitter' : TweetView,
			'github' : GithubEventView
		},
		model: new News(),

		initialize : function() {
			this.renderList = _.bind(this.renderList, this);
			
			this.render();
			
			var asideView = this;
			
			this.model.fetch()
			.done(this.renderList)
			.done(function() {
				asideView.listenTo(asideView.model, 'add', asideView.addNewsItem)
			});
		},
		
		onResize : function() {
			$('.aside-text').tinyscrollbar_update();
		},
		
		render : function() {
			this.$el.html(this.frameTemplate({
				'aside-id' : 'aside-social',
				'title' : 'news'
			}));
			
			this.scrollDiv = this.$el.find('.aside-text');
			this.scrollDiv.tinyscrollbar({
				axis: 'y'
			});
			
			
			$(window).resize(this.onResize);
			
			var newsAsideView = this;	
			this.$el.find('.fade-wrapper').fadeIn(500, function() {
				newsAsideView.scrollDiv.tinyscrollbar_update();
			});
		},
		
		renderList : function() {
			var upperBound = 10;
			if (this.model.length < 10) {
				upperBound = this.model.length;
			}
			
			for (i=0; i < upperBound; i++) {
				this.addNewsItem(this.model.at(i));
			}
		},
		
		addNewsItem : function(newsItem) {			
			var newsItemView = new this.itemViews[newsItem.get('source')]({model: newsItem});
			
			if (newsItemView.display) {
				this.$el.find('.overview').append(newsItemView.$el);
				this.scrollDiv.tinyscrollbar_update();
			}			
		}
  	});
  	
  	return NewsAsideView;
});