define([ 
     'jquery', 
     'underscore',
     'backbone'
], function($, _, Backbone) {
	var Blurb = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this);
		},

		fetch : function() {
			blurb = this;
			return $.ajax(this.url(), {
				dataType : 'text',
				success : function(data, textStatus, jqXhr) {
					blurb.set('blurb-text', data);
				},
				error : function(jqXhr, textStatus, errorThrown) {
					alert('fuck! ' + textStatus);
				}
			});
		},

		url : function() {
			return this.get('urlRoot');
		}
	});

	return Blurb;
});
