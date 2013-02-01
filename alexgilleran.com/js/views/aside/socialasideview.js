define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'js/models/news/news',
  'text!templates/asideframe.html',
  'text!templates/newsitem.html'
], function($, _, Backbone, Handlebars, News, AsideFrameTemplate, NewsItemTemplate){
	var SocialAsideView = Backbone.View.extend({
		newsItemTemplate : Handlebars.compile(NewsItemTemplate),
		frameTemplate : Handlebars.compile(AsideFrameTemplate),
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
		
		render : function() {
			this.$el.html(this.frameTemplate({
				'aside-id' : 'aside-social',
				'title' : 'news'
			}));
			
			this.scrollDiv = this.$el.find('.aside-text');
			this.scrollDiv.tinyscrollbar({
				axis: 'y'
			});
			
			var socialAsideView = this;	
			this.$el.find('.fade-wrapper').fadeIn(500, function() {
				socialAsideView.scrollDiv.tinyscrollbar_update();
			});
		},
		
		renderList : function() {
			this.model.forEach(function(newsItem) {
				this.addNewsItem(newsItem);
			}, this);
		},
		
		addNewsItem : function(newsItem) {
			var newsItemHtml = this.newsItemTemplate({
				source: newsItem.source(),
				text: newsItem.text(),
				date: newsItem.date()
			});
			
			this.$el.find('.overview').append(newsItemHtml);
			
			this.scrollDiv.tinyscrollbar_update();
		}
  	});
  	
  	return SocialAsideView;
});