define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var Project = Backbone.Model.extend({
		initialize : function() {
			
		},
		
		fetch : function() {
			project = this;
			
			$.ajax(this.descriptionUrl, {
				success : function(data, textStatus, jqXhr) {
					project.set('description', data);
					project.set('ready', true);
				}
			});
		},
	});

	return Project;
});
