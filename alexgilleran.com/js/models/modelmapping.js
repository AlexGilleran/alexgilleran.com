define([
  'js/models/blurb',
  'js/models/projectlist'
], function(Blurb, Project){
	// This is just a mapping from view names to actual view objects loaded up
	// using requirejs - we can't use require() on the paths because it kills
	// optimisation into a single JS file.
	return {
		'blurb': Blurb,
		'projectlist': Project
	};
});