define([
  'jquery',     
  'underscore', 
  'backbone',
  'js/views/asideview',
  'js/views/contentview',
  'js/views/navview',   
], function($, _, Backbone, AsideView, ContentView, NavView){
	var SiteView = Backbone.View.extend({
  		el: $('body'),
  		
		navView : new NavView({el: $('#main-nav')}),
		contentView : new ContentView({el: $('#content')}),
		asideView : new AsideView({el: $('#content-aside')}),

		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);
			$(window).resize(this.fitWindow);
			
			this.render();
		},
		
		render: function() {
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