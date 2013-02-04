define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/siteview',
  'js/models/structure'
],function($, _, Backbone, SiteView, Structure){
	var AppRouter = Backbone.Router.extend({
		routes : {
			':nodeId' : 'openNode',
			'*actions': 'openDefault'
		},
		
		openDefault : function() {
			this.structure.setCurrentNodeById('about-me');	
		},
		
		openNode : function(nodeId) {
			if (nodeId) {
				this.structure.setCurrentNodeById(nodeId);
			} else {
				openDefault();
			}
		},
		
		initialize : function() {
			this.structure = new Structure();
			
			var router = this;
			this.structure.fetch({error: function(error){alert(error);}})
			.done(function() {
				router.siteView = new SiteView({model : router.structure});
			});
		}
	});

	var initialize = function() {
		var app_router = new AppRouter;
		
		Backbone.history.start();
	};

	return {
		initialize : initialize
	};
});