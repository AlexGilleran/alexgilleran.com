define([
  'jquery',
  'underscore',
  'backbone',
  'js/router', // Request router.js
], function($, _, Backbone, Router){
	var initialize = function(){
		Router.initialize();
  	}

	return {
		initialize: initialize
	};
});