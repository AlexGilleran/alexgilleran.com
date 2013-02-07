define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'js/models/externallinks', 
  'js/views/content/contentview',
  'js/views/navigation/navview',   
  'js/views/aside/newsasideview',   
  'js/views/navigation/headerlinksview',  
  'text!templates/nav-link.css' 
], function($, _, Backbone, Handlebars, ExternalLinks, ContentView, NavView, NewsAsideView, HeaderLinksView, CSSTemplate) {
	var SiteView = Backbone.View.extend({
		cssTemplate : Handlebars.compile(CSSTemplate),
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

			var headerLinks = new ExternalLinks();
			
			var siteView = this;
			headerLinks.fetch().done(function() {
				if ($(window).width() <= 480) {
					headerLinks.add(siteView.model.models, {at: 0});
				} else {
					siteView.model.forEach(siteView.insertStyles, siteView);
				}
				
				headerLinks.forEach(siteView.insertStyles, siteView);
				
				siteView.HeaderLinksView = new HeaderLinksView({
					el : $('#site-header'), 
					model : headerLinks
				});
				
				siteView.renderAsideView();
				
				siteView.fitWindow();
				
				window.isTouchDevice = !!('ontouchstart' in document.documentElement);
				if (window.isTouchDevice) {
					$('.nav-link-text').css('color', '#FFFFFF');
				}
			});
		},
		
		insertStyles : function(node) {
			var customCss = this.cssTemplate({
				'id': node.get('id'),
				'r': node.get('theme').color.r,
				'g': node.get('theme').color.g,
				'b': node.get('theme').color.b,
			});
			
			$('#dynamic-styles').append(customCss)
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
			
			if ((window.prevWidth > 480 && currentWidth <= 480) ||
				window.prevWidth <= 480 && currentWidth > 480) {
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
			if ($(window).width() > 480) {
				contentWidth -= this.navView.$el.outerWidth(true) + generalMargin;
			}
			
			this.$el.find('#content-row').css('top', this.$el.find('#site-header').height());
			this.$el.find('#content').width(contentWidth);			
			this.$el.find('#content-aside').css('left', $('#content-main').width() + generalMargin + 2);
		}
  	});
  	
  	return SiteView;
});