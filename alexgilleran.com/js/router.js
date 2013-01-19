define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/navview'
],function($, _, Backbone, NavView){
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
		
		Backbone.history.start();
		
		$(document).ready(function() {
			navView = new NavView({el: $('#main-nav')});
		});
	};

	return {
		initialize : initialize
	};
});