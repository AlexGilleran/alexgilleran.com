define(['jquery', 'underscore', 'backbone', 'handlebars', 'js/models/navmodel', 'text!templates/link.html', 'text!templates/nav.html', 'text!templates/spacer.html'], function($, _, Backbone, Handlebars, NavModel, LinkTemplate, NavTemplate, Spacer) {
	var NavView = Backbone.View.extend({
		linkTemplate : Handlebars.compile(LinkTemplate),
		navTemplate : Handlebars.compile(NavTemplate),
		spacerTemplate : Handlebars.compile(Spacer),

		model : new NavModel(),

		events : {

		},

		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);

			this.render();
		},

		render : function() {
			this.$el.html(this.navTemplate());
			var navList = $('#nav-list');

			this.model.forEach(function(link) {
				if (!link.get('spacer')) {
					navList.append(this.linkTemplate({
						label : link.get('label'),
						url : link.get('url'),
						id : link.get('id'),
						'icon-url' : link.get('icon')
					}));
				} else {
					navList.append(this.spacerTemplate());
				}
			}, this);

			this.fitWindow(this);
		},

		fitWindow : function() {
			var navLink = $('.nav-resizeable');
			var navLinkCount = this.model.length;
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
		}
	});

	return NavView;
});
