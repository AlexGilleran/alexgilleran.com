define([
	'jquery', 
	'underscore', 
	'backbone', 
	'handlebars', 
	'js/models/structure', 
	'js/views/navigation/linkboxview', 
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

			this.model.forEach(function(navnode) {
				var navLinkView = new NavLinkView({model: navnode});
				navList.append(navLinkView.$el);
			}, this);

			//this.fitWindow(this);
			this.resizeNavButtons();
		},
		
		resizeNavButtons : function() {
			this.$el.css('width', '');
			var width = this.$el.width();
			
			var navNodes = $('.nav-node');
			navNodes.width(width).height(width);

			// Remove the bottom margin of the bottom button
			navNodes.last().css('margin-bottom', 0);
			lastButtonBottom = navNodes.last().offset().top + navNodes.last().outerHeight(true)
			
			if (lastButtonBottom > (this.$el.offset().top + this.$el.outerHeight(true))) {
				this.fitWindow(navNodes);
			}
		},

		fitWindow : function(navNodes) {
			var navLinkCount = this.model.nodeCount();
			var totalSpacing = navNodes.outerHeight(true) - navNodes.innerHeight();
			var totalBorder = navNodes.outerHeight(false) - navNodes.innerHeight();		
			
			var sideLength = (this.$el.height() - totalSpacing * (navLinkCount - 1)) / navLinkCount; 

			// Set the width of the whole <nav>
			this.$el.width(sideLength + totalBorder);

			// Set the height/width of nav link oblongs
			navNodes.height(sideLength).width(sideLength);
		},
	});

	return NavView;
});
