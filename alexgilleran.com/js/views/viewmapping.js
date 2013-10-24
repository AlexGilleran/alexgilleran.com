define([
  'js/views/content/blurbview',
  'js/views/project/projectlistview'
], function(BlurbView, ProjectListView){
	// This is just a mapping from view names to actual view objects loaded up
	// using requirejs - we can't use require() on the paths because it kills
	// optimisation into a single JS file.
	return {
		'blurbview': BlurbView,
		'projectlistview': ProjectListView
	};
});