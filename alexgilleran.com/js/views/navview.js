define(['jquery',
 'underscore', 
 'backbone',
  'handlebars', 
 'js/models/navmodel', 
 'text!templates/link.html', 
 'text!templates/nav.html', 
 'text!templates/spacer.html'
], function($, _, Backbone, Handlebars, NavModel, LinkTemplate, NavTemplate, Spacer) {
	var NavView = Backbone.View.extend({
		linkTemplate : Handlebars.compile(LinkTemplate),
		navTemplate : Handlebars.compile(NavTemplate),
		spacerTemplate : Handlebars.compile(Spacer),

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
				if (!link.get('spacer')) {
					navList.append(this.linkTemplate({
						label : link.get('label'),
						url : link.get('url'),
						id : link.get('id'),
						'icon-url': link.get('icon')
					}));
				} else {
					navList.append(this.spacerTemplate());
				}
			}, this);

			this.resize(this);
		},

		resize : function(context) {
			var navLink = $('.nav-resizeable');
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