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
			$(window).resize(this.fitWindow);
			
			this.listenTo(this.model, 'change:open', this.openNode);
			
			this.openNode(this.model.get('currentNode'), true);
		},
				
		openNode : function(node, open) {
			if (open) {
				if (node.get('ready')) {
					this.render();
				} else {
					node.once('change:ready', this.openNode, this);
				}
			}
		},
		
		render : function() {
			contentFrame = this; 
			require([
				this.model.get('currentNode').get('contentViewUrl'),
				contentFrame.model.get('currentNode').get('model')['url']
			], function(View, Model) {
				contentFrame.$el.find('.fade-wrapper').stop(true, true);
				
				var svgIcon = contentFrame.model.get('currentNode').get('theme').iconTemplate({
					'class': 'content-icon-background',
					'r': contentFrame.model.get('currentNode').get('theme').color.r,
					'g': contentFrame.model.get('currentNode').get('theme').color.g,
					'b': contentFrame.model.get('currentNode').get('theme').color.b,
					'a': '0.05',
				});
				
				var newContent = contentFrame.contentTemplate({
					'title': contentFrame.model.get('currentNode').get('label'),
					'node-class': contentFrame.model.get('currentNode').get('id'),
					'background-icon': svgIcon 
				});
				
				contentFrame.$el.html(newContent);
				var scrollDiv = contentFrame.$el.find('.content-text');
				
				scrollDiv.tinyscrollbar({
					axis: 'y',
					invertscroll: window.isTouchDevice
				});
								
				contentFrame.nodeView = new View({
					el: contentFrame.$el.find('.overview'), 
					model: new Model(contentFrame.model.get('currentNode').get('model')['attributes'])
				});
				
				contentFrame.listenTo(contentFrame.nodeView, 'sizeChanged', contentFrame.fitWindow);
				
				var fadeWrappers = contentFrame.$el.find('.fade-wrapper');
				contentFrame.changeBackground();
				
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
			});
		},
		
		changeBackground : function() {
			var themeColor = this.model.get('currentNode').get('theme').color;
			var color = $.Color(themeColor.r, themeColor.g, themeColor.b, 0.15);
			
			this.$el.animate({backgroundColor : color}, 500);
		},

		fitWindow : function(topDiff) {
			var top = 0;
			
			if (topDiff) {
				top = -1 * this.$el.find('.overview').position().top;
			}
			
			if (topDiff > 0) {
				top = top - topDiff;
			}
			
			if (top < 0) {
				top = 0;
			}
			
			this.$el.find('.content-text').tinyscrollbar_update(top);
		}
  	});
  	
  	return ContentView;
});