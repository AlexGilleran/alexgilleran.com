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
		
			$(document).ready(function() {
				structure = new Structure();
				structure.fetch();
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