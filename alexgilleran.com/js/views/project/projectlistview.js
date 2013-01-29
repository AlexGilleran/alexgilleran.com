define([
  'jquery',     
  'underscore', 
  'backbone',
  'handlebars',
  'text!templates/project.html'
], function($, _, Backbone, Handlebars, ProjectTemplate){
	var ProjectListView = Backbone.View.extend({
		projectTemplate : Handlebars.compile(ProjectTemplate),
		
		initialize : function () {
			this.model.fetch();
			
			if (this.model.get('ready')) {
				this.render();
			} else {
				this.listenTo(this.model, 'change:ready', this.render);
			}
		},
		
		render : function () {
			this.model.forEach(function(project) {
				var description = project.get('descriptionUrl'); 
				
				this.$el.append(this.projectTemplate({
					url : project.get('url'),
					title : project.get('title'),
					subtitle : project.get('subtitle'),
					img : project.get('image'),
					description : description
				}));
			}, this);
		}
  	});
  	
  	return ProjectListView;
});