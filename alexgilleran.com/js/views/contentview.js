define([
  'jquery',     
  'underscore', 
  'backbone',
  'jquery.color',    
], function($, _, Backbone, $color){
	var ContentView = Backbone.View.extend({
		
		initialize : function() {
			this.setWidth = _.bind(this.setWidth, this);
			
			this.listenTo(this.model, 'change:currentNode', this.render);
			
			this.render();
		},
		
		render : function() {
			this.changeBackground();
		},
		
		changeBackground : function() {
			var themeColor = this.model.get('currentNode').get('theme').color;
			var color = $color(themeColor.r, themeColor.g, themeColor.b, 0.2);
			
			this.$el.animate({backgroundColor : color}, 500);
		},

		setWidth : function(width) {
			this.$el.width(width);
		}
  	});
  	
  	return ContentView;
});