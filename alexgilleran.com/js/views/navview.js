define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'models/navmodel',
  'text!../../templates/link.html',
  'text!../../templates/nav.html'
], function($, _, Backbone, Handlebars, NavModel, LinkTemplate, NavTemplate)	{
	var NavView = Backbone.View.extend({	
		linkTemplate : Handlebars.compile(LinkTemplate),
		
		navTemplate : Handlebars.compile(NavTemplate),
		
		model: new NavModel(),
	
		events : {
	
		},
	
		initialize : function() {
			this.listenTo($(document), 'ready', this.resize);
			this.listenTo($(window), 'resize', this.resize);
			
			this.render();
		},
	
		render : function() {			
			this.$el.html(this.navTemplate());
			var navList = $('#nav-list');
			
			this.model.forEach(function(link) {			
				navList.append(this.linkTemplate(link));
			}, this);
			
			this.resize();
		},
		
		resize: function() {
			var navLink = $('.nav-link');
			var navLinkCount = this.model.length;
			var totalMargin = navLink.outerHeight(true) - navLink.outerHeight(false);  
			
			var mainNavWidth = $('body').height() / navLinkCount;
			var linkSideLength = mainNavWidth - totalMargin;
			
			// Set the width of the whole <nav>
			this.$el.width(mainNavWidth);
			
			// Set the height/width of nav link oblongs
			navLink.height(linkSideLength).width(linkSideLength);
		}
	});
	
	return NavView;
});