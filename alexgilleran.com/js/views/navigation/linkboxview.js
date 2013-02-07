define([
	'jquery',
	'backbone',
	'handlebars',
	'jquery.color',
	'text!templates/spacer.html',
], function($, Backbone, Handlebars, $Color, SpacerTemplate){
	var NavLinkView = Backbone.View.extend({
		spacerTemplate : Handlebars.compile(SpacerTemplate),
		
		tagName: 'li',
		
		events: {
		//	'click': 'onClick'
		},
		
		initialize : function() {
			this.linkTemplate = Handlebars.compile(this.options.LinkTemplate);
			
			if (this.model.get('theme')) {
				this.openColor = $.Color(this.model.get('theme').color.r, this.model.get('theme').color.g, this.model.get('theme').color.b);
				this.invisible = $.Color(255, 255, 255, 0);
			}
		
			this.listenTo(this.model, 'change:open', this.setOpenStyling);
			
			this.render();
		},

		render : function() {
			var model = this.model;
			
			var linkHtml = this.linkTemplate({
				'label' : model.get('label'),
				'url' : model.get('url'),
				'id' : model.get('id'),
				'icon-url' : model.get('theme').icon,
				'target' : model.target()
			});
			
			this.$el.html(linkHtml);
			
			this.setOpenStyling();
		
			if (this.model.get('ready')) {
				this.renderIcon();
			}
			
			this.listenTo(this.model, 'change:ready', this.renderIcon);	
		},
		
		renderIcon : function() {
			var svgTemplate = this.model.get('theme').iconTemplate;
			
			var iconSvg;
			if (svgTemplate) {
				iconSvg = svgTemplate({r:255,b:255,g:255,a:1,'class':'nav-link-icon'});
				this.$el.find('.nav-link').append(iconSvg);
			}
			
			this.setOpenStyling();
		},
		
		onClick : function(event) {
			$(event.target).blur();
			
			if (this.model.get('contentViewUrl')) {
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