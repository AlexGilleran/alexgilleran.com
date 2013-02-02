define([
  'jquery',     
  'underscore', 
  'backbone',
  'js/views/content/contentview',
  'js/views/navigation/navview',   
  'js/views/aside/socialasideview',   
  'js/views/navigation/externallinksview',   
], function($, _, Backbone, ContentView, NavView, SocialAsideView, ExternalLinksView){
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
			this.externalLinksView = new ExternalLinksView({el: $('#external-links')});
						
			this.fitWindow();
		},
		
		renderAsideView : function() {
			var AsideView = this.model.get('currentNode').get('aside');
			
			if (!AsideView) {
				AsideView = SocialAsideView;
			}
			
			if (this.AsideView != AsideView) {
				this.AsideView = AsideView;
				this.asideView = new AsideView({el : $('#content-aside')});
			}
		},

		fitWindow : function() {
			var generalMargin = this.$el.position().left;
			//this.navView.fitWindow();
			
			this.navView.resizeNavButtons();
			
			var contentWidth = this.$el.innerWidth() - this.navView.$el.outerWidth(true)- generalMargin; //- this.asideView.$el.outerWidth(true) ;
			
			this.$el.find('#content').width(contentWidth);			
			this.$el.find('#content-aside').css('left', $('#content-main').width() + generalMargin + 2);
		}
  	});
  	
  	return SiteView;
});