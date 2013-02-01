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
			this.render();
			
			this.listenTo(this.model, 'add', this.onNewNews);
			
			this.model.fetch();
		},
		
		render : function() {
			this.$el.html(this.frameTemplate({
				'aside-id' : 'aside-social',
				'title' : 'news'
			}));
			
			var scrollDiv = this.$el.find('.aside-text');
			scrollDiv.tinyscrollbar({
				axis: 'y'
			});
						
			this.$el.find('.fade-wrapper').fadeIn(500);
		},
		
		onNewNews : function(model, collection, options) {
			var newsItemHtml = this.newsItemTemplate({
				source: model.source(),
				text: model.text(),
				date: model.date()
			});
			
			this.$el.find('.overview').append(newsItemHtml);
		}
  	});
  	
  	return SocialAsideView;
});