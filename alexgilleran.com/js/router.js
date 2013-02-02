define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/siteview',
  'js/models/structure'
],function($, _, Backbone, SiteView, Structure){
	var AppRouter = Backbone.Router.extend({
		routes : {
			// Default
			'*actions' : 'defaultAction'
		},
		
		defaultAction : function() {
			structure = new Structure();
			structure.fetch({error: function(error){alert(error);}});
		
			$(document).ready(function() {
				SiteView = new SiteView({model : structure});
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