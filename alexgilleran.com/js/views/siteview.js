define([
  'jquery',     
  'underscore', 
  'backbone',
  'js/models/externallinks', 
  'js/views/content/contentview',
  'js/views/navigation/navview',   
  'js/views/aside/newsasideview',   
  'js/views/navigation/headerlinksview',   
], function($, _, Backbone, ExternalLinks, ContentView, NavView, NewsAsideView, HeaderLinksView){
	var SiteView = Backbone.View.extend({
  		el: $('body'),
		
		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);
			$(window).resize(this.fitWindow);
			
			if (this.model.get('structureReady')) {
				this.render();
			}
			
			this.listenTo(this.model, 'change:structureReady', this.render);
			this.listenTo(this.model, 'change:currentNode', this.renderAsideView);
		},
		
		render: function() {
			this.navView = new NavView({el: $('#main-nav'), model: this.model});
			this.contentView = new ContentView({el: $('#content-main'), model: this.model});
			
			var headerLinks = new ExternalLinks();
			
			
			if ($(window).width() <= 640) {
				headerLinks.add(this.model.models);
			}
			
			this.HeaderLinksView = new HeaderLinksView({
				el : $('#external-links'), 
				model : headerLinks
			});
			
			this.renderAsideView();
			
			this.fitWindow();
		},
		
		renderAsideView : function() {
			var AsideView = this.model.get('currentNode').get('aside');
			
			if (!AsideView) {
				AsideView = NewsAsideView;
			}
			
			if (this.AsideView != AsideView) {
				this.AsideView = AsideView;
				this.asideView = new AsideView({el : $('#content-aside')});
			}
		},

		fitWindow : function() {
			var generalMargin = this.$el.position().left;
			
			this.navView.resizeNavButtons();
			
			var contentWidth = this.$el.innerWidth();
			if ($(window).width() > 640) {
				contentWidth -= this.navView.$el.outerWidth(true) - generalMargin;
			}
			
			this.$el.find('#content').width(contentWidth);			
			this.$el.find('#content-aside').css('left', $('#content-main').width() + generalMargin + 2);
		}
  	});
  	
  	return SiteView;
});