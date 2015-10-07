require.config({
  baseUrl: '',
  paths: {
    'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
    'underscore': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'backbone': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min',
    'handlebars': 'http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.2/handlebars.min',
    'showdown': 'http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min',
    'jquery.color': 'lib/jquery.color-2.1.1',
    'jquery.tinyscrollbar': 'lib/jquery.tinyscrollbar',
    'text': 'text'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    'jquery.color': ['jquery'],
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
], function (App) {
  // The "app" dependency is passed in as "App"
  App.initialize();
});







