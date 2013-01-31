define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var Project = Backbone.Model.extend({
		initialize : function() {
			
		},
		
		fetch : function(params) {
			var project = this;
			
			return $.ajax(this.get('descriptionUrl'), {
				success : function(data, textStatus, jqXhr) {
					project.set('description', data);
				}
			});
		},
	});

	return Project;
});
