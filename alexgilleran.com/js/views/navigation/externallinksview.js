define([
	'jquery', 
	'underscore', 
	'backbone', 
	'handlebars', 
	'js/models/externallinks', 
	'js/views/navigation/linkboxview', 
	'text!templates/nav.html',
	'text!templates/external-link.html'
], function($, _, Backbone, Handlebars, ExternalLinks, LinkBoxView, NavTemplate, LinkTemplate) {
	var ExternalLinksView = Backbone.View.extend({
		model: new ExternalLinks(),
		navTemplate : Handlebars.compile(NavTemplate),
	
		initialize : function() {
			this.render = _.bind(this.render, this);
			var externalLinksView = this;
			
			this.model.fetch().done(externalLinksView.render);
		},

		render : function() {
			this.model.forEach(function(link) {
				var navLinkView = new LinkBoxView({model: link, attributes: {'class': 'nav-list-item'}, 'LinkTemplate': LinkTemplate});
				this.$el.append(navLinkView.$el);
			}, this);
		},
	});

	return ExternalLinksView;
});
