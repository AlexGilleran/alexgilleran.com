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
			
			this.listenTo(this.model, 'change:ready', this.onProjectReady);
			
			this.model.fetch({success: this.render});
		},
		
		render : function() {
			for (i = 0; i < this.model.length; i++) {
				var project = this.model.at(i);
								
				this.$el.append(this.projectTemplate({
					url : project.get('url'),
					title : project.get('title'),
					subtitle : project.get('subtitle'),
					img : project.get('image'),
					description : this.converter.makeHtml(project.get('description'))
				}));
				
				if (i < this.model.length - 1) {
					this.$el.append('<hr />');
				}
			}
		},
  	});
  	
  	return ProjectListView;
});

