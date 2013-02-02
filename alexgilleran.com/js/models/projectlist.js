define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/project'
], function($, _, Backbone, Project) {
	var ProjectList = Backbone.Collection.extend({
		model: Project,
		url: 'data/projects/projects.json', 
		
		initialize : function() {

		},
		
		fetch : function() {
			var projectList = this;
			var projectFetches = [];
			
			return $.when($.ajax(this.url, {
				success : function(data, textStatus, jqXhr) {
					
					data.projects.forEach(function(projectData) {
						var project = new Project(projectData);
						projectList.add(project);
						projectFetches.push(project.fetch());
					}, projectList);
				}
			}))
			.then(function() {return $.when.apply(null, projectFetches)});
		}
	});
	
	return ProjectList;
});
