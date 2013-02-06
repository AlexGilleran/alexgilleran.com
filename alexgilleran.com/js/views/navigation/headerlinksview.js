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
			var externalLinksView = this;
			
			this.model.fetch({update : true, remove : false}).done(externalLinksView.render);
		},

		render : function() {
			this.model.forEach(function(link) {
				if (!link.get('hidden')) {
					var navLinkView = new LinkBoxView({model: link, attributes: {'class': 'nav-list-item'}, 'LinkTemplate': LinkTemplate});
					this.$el.append(navLinkView.$el);
				}
			}, this);
		},
	});

	return HeaderLinksView;
});
