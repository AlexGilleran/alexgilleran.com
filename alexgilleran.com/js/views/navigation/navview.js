define([
	'jquery', 
	'underscore', 
	'backbone', 
	'handlebars', 
	'js/models/structure', 
	'js/views/navigation/navlinkview', 
	'text!templates/nav.html'
], function($, _, Backbone, Handlebars, Structure, NavLinkView, NavTemplate) {
	var NavView = Backbone.View.extend({
		navTemplate : Handlebars.compile(NavTemplate),
		
		events : {
			'click .nav-link': 'linkClicked'
		},

		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);

			this.render();
		},

		render : function() {
			this.$el.html(this.navTemplate());
			var navList = $('#nav-list');

			this.model.nodeList.forEach(function(navnode) {
				var navLinkView = new NavLinkView({model: navnode});
				navList.append(navLinkView.$el);
			}, this);

			this.fitWindow(this);
		},

		fitWindow : function() {
			var navLink = $('.nav-resizeable');
			var navLinkCount = this.model.nodeList.length;
			var totalSpacing = navLink.outerHeight(true) - navLink.innerHeight();
			var totalBorder = navLink.outerHeight(false) - navLink.innerHeight();

			// Side length not taking into account margins
			var simpleSideLength = this.$el.height() / navLinkCount;
			
			// The height of the top and bottom nav links borders, distributed over all links 
			var distributedBorders = totalBorder / navLinkCount;
			
			// The space in between each link, distributed over all of them
			var distributedSpacing = (totalSpacing * (navLinkCount - 1) / navLinkCount);
						
			var sideLength = (simpleSideLength + distributedBorders) - distributedSpacing;

			// Set the width of the whole <nav>
			this.$el.width(sideLength);

			// Set the height/width of nav link oblongs
			navLink.height(sideLength).width(sideLength);

			// Remove the top margin of the top link
			navLink.last().css('margin-bottom', 0);
		},
		
		linkClicked : function(event)	{
			var clickedLink = $(event.target);
			
			if (clickedLink.attr('target') != '_blank')	{
				event.preventDefault();
				
				this.trigger('navigate', {pageId: clickedLink.attr('id')});
			}
		}
	});

	return NavView;
});
