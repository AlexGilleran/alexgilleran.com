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
			_.bindAll(this);
			
			// If there's already data in the model, render based on it.
			if (this.model.get('blurb-text')) {
				this.render();
			} else {
				this.model.fetch().done(this.render);
			}
		},
		
		render: function() {
			var blurbMd = this.model.get('blurb-text');
			var blurbHtml = this.converter.makeHtml(blurbMd);
			
			this.$el.html(blurbHtml);
			
			this.trigger('sizeChanged');
		},
	});
	
	return BlurbView;
});