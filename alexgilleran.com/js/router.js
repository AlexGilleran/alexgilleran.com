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
		
		trackPageView: function() {
			var url = Backbone.history.getFragment();
			return _gaq.push(['_trackPageview', "/" + url]);
		},
		
		initialize : function() {
			this.structure = new Structure();
		    this.on('all', this.trackPageView);
			
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