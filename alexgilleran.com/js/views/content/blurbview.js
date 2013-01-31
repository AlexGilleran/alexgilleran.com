define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'showdown'
], function($, _, Backbone, Handlebars, Showdown){
	var BlurbView = Backbone.View.extend({
		converter : new Showdown.converter(),
		
		initialize : function() {
			// If there's already data in the model, render based on it.
			if (this.model.get('blurb-text')) {
				this.render();
			}
			
			// Rerender on changes to the model (caused by the fetch completing)
			this.listenTo(this.model, 'change', this.render);
			this.model.fetch();
		},
		
		render: function() {
			var blurbMd = this.model.get('blurb-text');
			var blurbHtml = this.converter.makeHtml(blurbMd);
			
			this.$el.html(blurbHtml);
		},
	});
	
	return BlurbView;
});