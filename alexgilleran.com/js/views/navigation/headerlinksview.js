define([
	'jquery', 
	'underscore', 
	'backbone', 
	'handlebars', 
	'js/views/navigation/linkboxview', 
	'text!templates/nav.html',
	'text!templates/external-link.html'
], function($, _, Backbone, Handlebars, LinkBoxView, NavTemplate, LinkTemplate) {
	var HeaderLinksView = Backbone.View.extend({
		navTemplate : Handlebars.compile(NavTemplate),
	
		initialize : function() {
			this.render = _.bind(this.render, this);
			this.fitWindow = _.bind(this.fitWindow, this);
			
			var externalLinksView = this;
			
			this.render();
			
			$(window).resize(this.fitWindow);
		},

		render : function() {
			var externalLinksUl = this.$el.find('#external-links')
			externalLinksUl.html('');
			
			this.model.forEach(function(link) {
				if (!link.get('hidden')) {
					var navLinkView = new LinkBoxView({model: link, attributes: {'class': 'nav-list-item'}, 'LinkTemplate': LinkTemplate});
					externalLinksUl.append(navLinkView.$el);
				}
			}, this);
			
			this.fitWindow();
		},
		
		fitWindow : function() {
			var navNodes = this.$el.find('.external-link');
			var firstNode = navNodes.first()
			var totalSpacing = firstNode.outerWidth(true) - firstNode.innerWidth();
			var marginHeight = 0;
			var sideLength = 60
			
			if ($(window).width() <= 480) {
				var navLinkCount = this.model.displayableNodesCount();
				var totalBorder = firstNode.outerWidth(false) - firstNode.innerWidth();	
				
				navNodes.last().css('margin-right', '0');
				
				sideLength = (this.$el.width() - (totalSpacing - totalBorder) * (navLinkCount - 1) - totalBorder * navLinkCount) / navLinkCount;
				marginHeight = this.$el.find('.header-text').height() + (totalSpacing - totalBorder);
			} else if ($(window).width() <= 800) {
				sideLength = 30;
			}

			this.$el.find('.external-links-nav').css('margin-top', marginHeight);
			this.$el.height(sideLength + totalSpacing + marginHeight);
			
			// Set the height/width of nav link oblongs
			navNodes.height(sideLength).width(sideLength);
		},
	});

	return HeaderLinksView;
});
