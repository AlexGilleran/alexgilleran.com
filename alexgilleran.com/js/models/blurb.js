define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var Blurb = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this)
		},
		
		fetch : function() {
			if (!this.get('blurb-text'))	{
				blurb = this;
				$.ajax(this.url(), {
					success : function(data, textStatus, jqXhr) {
						blurb.set('blurb-text', data);
					}
				});
			}
		},
		
		url: function() {
			return this.get('urlRoot');
		}
	});

	return Blurb;
});
