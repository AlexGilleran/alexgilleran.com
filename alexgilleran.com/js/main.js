require.config({
	paths: {
		jquery: 'lib/jquery-1.9.0',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		handlebars: 'lib/handlebars-1.0.rc.1',
		text: 'lib/text',
	},
  	shim: {
		jquery: {
			exports: '$'
    	},
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
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});







