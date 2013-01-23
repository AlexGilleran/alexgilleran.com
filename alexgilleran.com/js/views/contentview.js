define([
  'jquery',     
  'underscore', 
  'backbone',
  'jquery.color',
  'text!templates/content-background.txt'     
], function($, _, Backbone, $color, RGBATemplate){
	var ContentView = Backbone.View.extend({
		rgbaTemplate: Handlebars.compile(RGBATemplate),
		
		initialize : function() {
			this.setWidth = _.bind(this.setWidth, this);
			
			this.listenTo(this.model, 'change:open', this.render);
			
			this.render();
		},
		
		render : function() {
			this.changeBackground();
		},
		
		changeBackground : function() {
			var themeColor = this.model.get('currentNode').get('theme').color;
			var color = $color(themeColor.r, themeColor.g, themeColor.b, 0.2);
			
			this.$el.animate({backgroundColor : color}, 1500);
		},

		setWidth : function(width) {
			this.$el.width(width);
		}
  	});
  	
  	return ContentView;
});