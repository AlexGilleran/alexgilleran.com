define(['jquery', 'underscore', 'backbone', 'handlebars', 'js/models/navmodel', 'text!templates/link.html', 'text!templates/nav.html'], function($, _, Backbone, Handlebars, NavModel, LinkTemplate, NavTemplate) {
	var NavView = Backbone.View.extend({
		linkTemplate : Handlebars.compile(LinkTemplate),

		navTemplate : Handlebars.compile(NavTemplate),

		model : new NavModel(),

		events : {

		},

		initialize : function() {
			var resize = _.bind(this.resize, this);
			$(window).resize(resize);

			this.render();
		},

		render : function() {
			this.$el.html(this.navTemplate());
			var navList = $('#nav-list');

			this.model.forEach(function(link) {
				navList.append(this.linkTemplate({
					label : link.get('label'),
					url : link.get('url'),
					id : link.get('id'),
					'icon-url': link.get('icon')
				}));
			}, this);

			this.resize(this);
		},

		resize : function(context) {
			var navLink = $('.nav-link');
			var navLinkCount = this.model.length;
			var totalMargin = navLink.outerHeight(true) - navLink.innerHeight();

			var mainNavWidth = (this.$el.height() - totalMargin) / navLinkCount;
			var linkSideLength = mainNavWidth - totalMargin;

			// Set the width of the whole <nav>
			this.$el.width(mainNavWidth);

			// Set the height/width of nav link oblongs
			navLink.height(linkSideLength).width(linkSideLength);
		}
	});

	return NavView;
}); 