define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'jquery.color',
  'jquery.tinyscrollbar',
  'text!templates/contentframe.html'
], function($, _, Backbone, Handelbars, $color, $tinyscrollbar, ContentTemplate){
	var ContentView = Backbone.View.extend({
		contentTemplate : Handlebars.compile(ContentTemplate),
		
		initialize : function() {
			this.fitWindow = _.bind(this.fitWindow, this);
			
			this.listenTo(this.model, 'change:currentNode', this.render);
			
			this.render();
		},
		
		render : function() {
			this.$el.find('.fade-wrapper').stop(true, true);
			
			var svgIcon = this.model.get('currentNode').get('theme').iconTemplate({
				'class': 'content-icon-background',
				'r': this.model.get('currentNode').get('theme').color.r,
				'g': this.model.get('currentNode').get('theme').color.g,
				'b': this.model.get('currentNode').get('theme').color.b,
				'a': '0.1',
			});
			
			var newContent = this.contentTemplate({
				'title': this.model.get('currentNode').get('label'),
				'r': this.model.get('currentNode').get('theme').color.r,
				'g': this.model.get('currentNode').get('theme').color.g,
				'b': this.model.get('currentNode').get('theme').color.b,
				'background-icon': svgIcon 
			});
			
			this.$el.html(newContent);
			var scrollDiv = this.$el.find('.content-text');
			scrollDiv.tinyscrollbar({
				axis: 'y'
			});
			
			var View = this.model.get('currentNode').get('contentView');
			this.nodeView = new View({
				el: this.$el.find('.overview'), 
				model: this.model.get('currentNode').get('model')
			});
			
			var fadeWrappers = this.$el.find('.fade-wrapper');
			this.changeBackground();
			
			var newFadeWrapper = fadeWrappers.last();
			newFadeWrapper.fadeIn(500, function() {
				scrollDiv.tinyscrollbar_update();
			});
			
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

		fitWindow : function(width) {
			this.$el.width(width);
			this.$el.find('.content-text').tinyscrollbar_update();
		}
  	});
  	
  	return ContentView;
});