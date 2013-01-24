define([
	'jquery.color',
	'text!templates/link.html', 
	'text!templates/spacer.html',
	'text!templates/nav-link.css'
], function($color, LinkTemplate, SpacerTemplate, CSSTemplate){
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
		
		initialize : function() {
			if (this.model.get('theme')) {
				this.openColor = $color(this.model.get('theme').color.r, this.model.get('theme').color.g, this.model.get('theme').color.b);
				this.invisible = $color(255, 255, 255, 0);
			}
		
			this.listenTo(this.model, 'change:open', this.setOpenStyling);
			
			this.render();
		},

		render : function() {
			var model = this.model;
			
			if (model.get('id')) {
				var svgTemplate = model.get('theme').iconTemplate;
				
				var iconSvg;
				if (svgTemplate) {
					iconSvg = svgTemplate({r:255,b:255,g:255,a:0.8,'class':'nav-link-icon'});
				}
				
				var linkHtml = this.linkTemplate({
					'label' : model.get('label'),
					'url' : model.get('url'),
					'svg': iconSvg,
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
			
			this.setOpenStyling();
		},
		
		onClick : function(event) {
			$(event.target).blur();
			
			if (this.model.get('contentView')) {
				event.preventDefault();	
				this.model.set('open', true);
			}
		},

		setOpenStyling : function() {
			if(this.model.get('open')) {
				this.$el.find('.nav-link').animate({color : this.openColor}, 500);
			} else {
				this.$el.find('.nav-link').animate({color : this.invisible}, 500);
			}
		}
	});

	return NavLinkView;
});