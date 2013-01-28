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
			var spacerRatio = 0.5;
			
			var navNodes = $('.nav-node');
			var navLinkCount = this.model.nodeCount() + (this.model.spacerCount() * spacerRatio);
			var totalSpacing = navNodes.outerHeight(true) - navNodes.innerHeight();
			var totalBorder = navNodes.outerHeight(false) - navNodes.innerHeight();

			// Side length not taking into account margins
			var simpleSideLength = this.$el.height() / navLinkCount;
			
			// The height of the top and bottom nav links borders, distributed over all links 
			var distributedBorders = totalBorder / navLinkCount;
			
			// The space in between each link, distributed over all of them
			var distributedSpacing = (totalSpacing * (navLinkCount - 1) / navLinkCount);
						
			var sideLength = (simpleSideLength + distributedBorders) - distributedSpacing;

			// Set the width of the whole <nav>
			this.$el.width(sideLength + totalBorder);

			// Set the height/width of nav link oblongs
			navNodes.height(sideLength).width(sideLength);
			this.$el.find('.spacer').height(simpleSideLength * 0.5 - totalBorder).width(sideLength);

			// Remove the top margin of the top link
			navNodes.last().css('margin-bottom', 0);
		},
	});

	return NavView;
});
