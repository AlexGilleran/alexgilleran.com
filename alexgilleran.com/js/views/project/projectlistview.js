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
		
		events : {
			'click .project-expander' : 'onExpanderClicked',
			'click .project-collapser' : 'onExpanderClicked'
		},
		
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
				
				var $descriptionDiv = this.$el.find('.project-description').last();
				$descriptionDiv.attr('natural-height', $descriptionDiv.height());
				$descriptionDiv.height($descriptionDiv.find('p').first().outerHeight(true));
				this.trigger('sizeChanged');
			}
		},
		
		toggleExpansion : function($descriptionDiv) {
			var view = this;
			
			var heightBefore = $descriptionDiv.height(); 
			var heightAfter;
			
			if ($descriptionDiv.attr('expanded')) {
				$descriptionDiv.parent().find('.project-expander').show();
				$descriptionDiv.parent().find('.project-collapser').hide();
				$descriptionDiv.attr('expanded', '');
				heightAfter = $descriptionDiv.find('p').first().outerHeight(true);
			} else {
				$descriptionDiv.parent().find('.project-expander').hide();
				$descriptionDiv.parent().find('.project-collapser').show();
				$descriptionDiv.attr('expanded', 'true');
				heightAfter = $descriptionDiv.attr('natural-height');
			}
			
			$descriptionDiv.animate(
				{'height' : heightAfter},
				{duration: 500, complete: function() {
					view.trigger('sizeChanged', heightBefore - heightAfter);
				}
			});
			
		},
		
		onExpanderClicked : function(event) {
			event.preventDefault();
			event.stopPropagation();
			
			$target = $(event.target)
			this.toggleExpansion($target.parent().find('.project-description'));
		}
  	});
  	
  	return ProjectListView;
});

