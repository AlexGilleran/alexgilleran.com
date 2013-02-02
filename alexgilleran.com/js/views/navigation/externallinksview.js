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
			this.model.nodeList.forEach(function(navnode) {
				var navLinkView = new NavLinkView({model: navnode});
				this.$el.append(navLinkView.$el);
			}, this);
		},
	});

	return NavView;
});
