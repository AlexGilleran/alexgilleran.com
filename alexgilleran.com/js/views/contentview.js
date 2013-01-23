define([
  'jquery',     
  'underscore', 
  'backbone'     
], function($, _, Backbone){
	var ContentView = Backbone.View.extend({
		initialize : function() {
			this.setWidth = _.bind(this.setWidth, this);
		},

		setWidth : function(width) {
			this.$el.width(width);
		}
  	});
  	
  	return ContentView;
});