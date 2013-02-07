define([
	'jquery', 
	'underscore', 
	'backbone', 
	'handlebars', 
	'js/models/structure', 
	'js/views/navigation/linkboxview', 
	'text!templates/nav.html',
	'text!templates/link.html' 
], function($, _, Backbone, Handlebars, Structure, NavLinkView, NavTemplate, LinkTemplate) {
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
				if (!navnode.get('hidden')) {
					var navLinkView = new NavLinkView({model: navnode, attributes: {'class': 'nav-list-item'}, 'LinkTemplate': LinkTemplate});
					navList.append(navLinkView.$el);
				}
			}, this);

			this.resizeNavButtons();
		},
		
		resizeNavButtons : function() {
			this.$el.css('width', '');
			var width = this.$el.width();
			
			var navNodes = this.$el.find('.nav-node');
			navNodes.width(width).height(width);

			// Remove the bottom margin of the bottom button
			navNodes.last().css('margin-bottom', 0);
			lastButtonBottom = navNodes.last().offset().top + navNodes.last().outerHeight(true)
			
			if (lastButtonBottom > (this.$el.offset().top + this.$el.outerHeight(true))) {
				this.fitWindow(navNodes);
			}
		},

		fitWindow : function(navNodes) {
			var navLinkCount = this.model.displayableNodesCount();
			var firstNode = navNodes.first()
			var totalSpacing = firstNode.outerHeight(true) - firstNode.innerHeight();
			var totalBorder = firstNode.outerHeight(false) - firstNode.innerHeight();		
			
			var sideLength = (this.$el.height() - (totalSpacing - totalBorder) * (navLinkCount - 1) - totalBorder * navLinkCount) / navLinkCount - totalBorder - 1; 

			// Set the width of the whole <nav>
			this.$el.width(sideLength + totalBorder);

			// Set the height/width of nav link oblongs
			navNodes.height(sideLength).width(sideLength);
		},
	});

	return NavView;
});
