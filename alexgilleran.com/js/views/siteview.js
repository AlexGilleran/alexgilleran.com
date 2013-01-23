define([
  'jquery',     
  'underscore', 
  'backbone',
  'js/views/contentview',
  'js/views/navigation/navview',   
  'js/views/socialasideview',   
], function($, _, Backbone, ContentView, NavView, SocialAsideView){
	var SiteView = Backbone.View.extend({
  		el: $('body'),
		
		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);
			$(window).resize(this.fitWindow);
			
			this.render();
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
			
			var contentWidth = this.$el.innerWidth() - $('#site-header').width() - this.navView.$el.width() - this.asideView.$el.width() - generalMargin * 2;
			this.contentView.setWidth(contentWidth);
		}
  	});
  	
  	return SiteView;
});