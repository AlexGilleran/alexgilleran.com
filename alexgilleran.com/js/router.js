define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/siteview'
],function($, _, Backbone, SiteView){
	var AppRouter = Backbone.Router.extend({
		routes : {
			// Default
			'*actions' : 'defaultAction'
		}
	});

	var initialize = function() {
		var app_router = new AppRouter;
		
		app_router.on('defaultAction', function(actions) {
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		});
		
		$(document).ready(function() {
			SiteView = new SiteView();
		});
		
		Backbone.history.start();
	};

	return {
		initialize : initialize
	};
});