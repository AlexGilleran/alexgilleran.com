define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'showdown',
  'text!templates/project.html'
], function($, _, Backbone, Handlebars, Showdown, ProjectTemplate){
	var ProjectListView = Backbone.View.extend({
		projectTemplate : Handlebars.compile(ProjectTemplate),
		converter : new Showdown.converter(),
		
		initialize : function () {
			_.bindAll(this);
						
			this.model.fetch().done(this.render);
		},
		
		render : function() {
			for (i = 0; i < this.model.length; i++) {
				var project = this.model.at(i);
				
				var technologies = function() {
					var allTechnologies = '';
					for(j = 0; j < project.get('technologies').length; j++) {
						allTechnologies = allTechnologies + project.get('technologies')[j];
						
						if (j < project.get('technologies').length - 1) {
							allTechnologies = allTechnologies + ", ";
						}
					}
					
					return allTechnologies;
				};
				
				this.$el.append(this.projectTemplate({
					url : project.get('url'),
					title : project.get('title'),
					subtitle : project.get('subtitle'),
					img : project.get('image'),
					description : this.converter.makeHtml(project.get('description')),
					technologies : technologies()
				}));
				
				if (i < this.model.length - 1) {
					this.$el.append('<hr />');
				}
			}
		},
  	});
  	
  	return ProjectListView;
});

