define(['backbone'], function(Backbone) {
	var NavNode = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this)
			
			if (!this.isSpacer()) {
				var navNode = this;
				require(['text!' + navNode.get('theme').iconTemplateUrl], function(iconTemplate) {
					navNode.get('theme').iconTemplate = Handlebars.compile(iconTemplate);
					
					if (!window.icons) {
						window.icons = {};
					}
					window.icons[navNode.get('id')] = navNode.get('theme').iconTemplate;
					
					navNode.set('ready', true);
				});
			}
		},
		
		defaults : {
			'open': false,
			'ready': false
		},

		target : function() {
			// If there's no content view for an element, open the url in a new window/tab
			if (!this.get('contentViewUrl')) {
				return '_blank'
			} else {
				return '_self';
			}
		},
		
		isSpacer : function() {
			return !this.get('id');
		}
	});

	return NavNode;
});
