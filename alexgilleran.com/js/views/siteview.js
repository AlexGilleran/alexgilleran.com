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
			this.onWindowResize = _.bind(this.onWindowResize, this);
			
			window.prevWidth = $(window).width();
			$(window).resize(this.onWindowResize);
			
			if (this.model.get('structureReady')) {
				this.render();
			}
			
			this.listenTo(this.model, 'change:structureReady', this.render);
			this.listenTo(this.model, 'change:currentNode', this.renderAsideView);
		},
		
		render: function() {
			this.navView = new NavView({el: $('#main-nav'), model: this.model});
			this.contentView = new ContentView({el: $('#content-main'), model: this.model});
			
			var siteView = this;
			
			var headerLinks = new ExternalLinks();
			
			headerLinks.fetch().done(function() {
				if ($(window).width() <= 640) {
					headerLinks.add(siteView.model.models, {at: 0});
				}
				
				siteView.HeaderLinksView = new HeaderLinksView({
					el : $('#site-header'), 
					model : headerLinks
				});
				
				siteView.renderAsideView();
				
				siteView.fitWindow();
				
				var isTouchDevice = 'ontouchstart' in document.documentElement;
				if (isTouchDevice) {
					$('.nav-link-text').css('color', '#FFFFFF');
				}
			});
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
		
		onWindowResize : function() {
			currentWidth = $(window).width();
			
			if ((window.prevWidth > 640 && currentWidth <= 640) ||
				window.prevWidth <= 640 && currentWidth > 640) {
				this.render();
			} else {
				this.fitWindow();
			}
			
			window.prevWidth = currentWidth;
		},

		fitWindow : function() {			
			var generalMargin = this.$el.position().left;
			
			this.navView.resizeNavButtons();
			
			var contentWidth = this.$el.innerWidth();
			if ($(window).width() > 640) {
				contentWidth -= this.navView.$el.outerWidth(true) + generalMargin;
			}
			
			this.$el.find('#content-row').css('top', this.$el.find('#site-header').height());
			this.$el.find('#content').width(contentWidth);			
			this.$el.find('#content-aside').css('left', $('#content-main').width() + generalMargin + 2);
		}
  	});
  	
  	return SiteView;
});