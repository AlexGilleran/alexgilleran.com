define([
  'jquery',     
  'underscore', 
  'backbone',
  'js/views/content/contentview',
  'js/views/navigation/navview',   
  'js/views/socialasideview',   
], function($, _, Backbone, ContentView, NavView, SocialAsideView){
	var SiteView = Backbone.View.extend({
  		el: $('body'),
		
		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);
			$(window).resize(this.fitWindow);
			
			if (this.model.get('ready')) {
				this.render();
			}
			
			this.listenTo(this.model, 'change:ready', this.render);
		},
		
		render: function() {
			this.navView = new NavView({el: $('#main-nav'), model: this.model});
			this.contentView = new ContentView({el: $('#content'), model: this.model});
			
			var AsideView = this.model.get('currentNode').get('aside');
			if (!AsideView) {
				AsideView = SocialAsideView;
			}
			
			this.asideView = new AsideView({el : $('#content-aside')});
			
			this.fitWindow();
		},

		fitWindow : function() {
			var generalMargin = this.$el.position().left;
			this.navView.fitWindow();
			
			var contentWidth = this.$el.innerWidth() - $('#site-header').outerWidth(true) - this.navView.$el.outerWidth(true) - this.asideView.$el.outerWidth(true) - generalMargin * 2 - 2;
			this.contentView.fitWindow(contentWidth);
		}
  	});
  	
  	return SiteView;
});