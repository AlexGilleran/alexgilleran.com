require.config({
	baseUrl: '',
	paths: {
		jquery: 'js/lib/jquery-1.9.0',
		underscore: 'js/lib/underscore',
		backbone: 'js/lib/backbone',
		handlebars: 'js/lib/handlebars-1.0.rc.1',
		showdown: 'js/lib/showdown',
		'jquery.color': 'js/lib/jquery.color-2.1.1',
		'jquery.tinyscrollbar': 'js/lib/jquery.tinyscrollbar',
		text: 'text'
	},
  	shim: {
		jquery: {
			exports: '$'
    	},
    	'jquery.color': {
            deps: ['jquery'],
            exports: 'jQuery.Color'
       	},
    	'jquery.tinyscrollbar': ['jquery'],
		underscore: {
			exports: '_'
    	},
    	backbone: {
      		deps: ["underscore", "jquery"],
      		exports: "Backbone"
    	},
		handlebars: {
			exports: 'Handlebars'
    	}
  	}
});

require([
  // Load our app module and pass it to our definition function
  'js/app',
], function(App){
  // The "app" dependency is passed in as "App"
	App.initialize();
});







