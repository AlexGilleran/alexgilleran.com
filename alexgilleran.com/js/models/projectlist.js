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
			//this.onProjectReady = _.bind(this.onProjectReady, this);
		},
		
		fetch : function(params) {
			var projectList = this;
			
			$.ajax(this.url, {
				success : function(data, textStatus, jqXhr) {
					var projectFetches = [];
					
					data.projects.forEach(function(projectData) {
						var project = new Project(projectData);
						projectList.add(project);
						projectFetches.push(project.fetch());
					}, projectList);
					
					$.when.apply(null, projectFetches).done(params.success);
				}
			});
		}
	});
	
	return ProjectList;
});
