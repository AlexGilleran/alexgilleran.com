define([
  'jquery',     
  'underscore', 
  'backbone',
  'jquery.color',
  'text!templates/contentframe.html'
], function($, _, Backbone, $color, ContentTemplate){
	var ContentView = Backbone.View.extend({
		contentTemplate : Handlebars.compile(ContentTemplate),
		
		initialize : function() {
			this.setWidth = _.bind(this.setWidth, this);
			
			this.listenTo(this.model, 'change:currentNode', this.render);
			
			this.render();
		},
		
		render : function() {
			var newContent = this.contentTemplate({
				'title': this.model.get('currentNode').get('label'),
				'r': this.model.get('currentNode').get('theme').color.r,
				'g': this.model.get('currentNode').get('theme').color.g,
				'b': this.model.get('currentNode').get('theme').color.b
			});
			
			this.$el.append(newContent);
			var fadeWrappers = this.$el.find('.fade-wrapper');
			
			this.changeBackground();
			
			var newFadeWrapper = fadeWrappers.last();
			newFadeWrapper.fadeIn(500);
			
			if (fadeWrappers.length > 1) {
				var oldFadeWrapper = newFadeWrapper.prev();
				
				oldFadeWrapper.fadeOut(500, function() {
					oldFadeWrapper.remove();
				});
			}
			
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