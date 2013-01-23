define([
	'text!templates/link.html', 
	'text!templates/spacer.html',
	'text!templates/nav-link.css'
], function(LinkTemplate, SpacerTemplate, CSSTemplate){
	var NavLinkView = Backbone.View.extend({
		linkTemplate : Handlebars.compile(LinkTemplate),
		spacerTemplate : Handlebars.compile(SpacerTemplate),
		cssTemplate : Handlebars.compile(CSSTemplate),
		
		tagName: 'li',
		attributes: {
			'class': 'nav-list-item'
		},

		events: {
			'click': 'onClick'
		},
		
		onClick : function(event) {
			if (model.open()){
				event.preventDefault();
			};
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var model = this.model;
			
			if (model.get('id')) {
				var linkHtml = this.linkTemplate({
					'label' : model.get('label'),
					'url' : model.get('url'),
					'id' : model.get('id'),
					'icon-url' : model.get('theme').icon,
					'target' : model.target()
				});
				
				this.$el.html(linkHtml);
				
				var customCss = this.cssTemplate({
					'id': model.get('id'),
					'r': model.get('theme').color.r,
					'g': model.get('theme').color.g,
					'b': model.get('theme').color.b,
				});
				
				$('#dynamic-styles').append(customCss);
			} else {
				this.$el.html(this.spacerTemplate());
			}
		}
	});

	return NavLinkView;
});