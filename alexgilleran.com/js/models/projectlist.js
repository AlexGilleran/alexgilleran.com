define([
	'jquery',
	'underscore',
	'backbone',
	'js/models/project'
], function($, _, Backbone, Project) {
	var ProjectList = Backbone.Collection.extend({
		model: Project,
		url: 'data/projects/projects.json', 
		
		defaults : {
			'ready' : false
		},
		
		initialize : function() {

		},
		
		fetch : function() {
			projectList = this;
			
			$.ajax(this.url, {
				success : function(data, textStatus, jqXhr) {
					projectList.unreadyProjectCount = data.projects.length;
					
					data.projects.forEach(function(projectData) {
						var project = new Project(projectData);
						projectList.listenTo(project, 'change:ready', projectList.onProjectReady)
						project.fetch();
						projectList.add(project);
					});
				}
			});
		},
		
		onProjectReady : function(project) {
			this.unreadyProjectCount--;
			
			if (this.unreadyProjectCount <= 0) {
				this.set('ready', true);
			}
		},
		
	});

	return ProjectList;
});
