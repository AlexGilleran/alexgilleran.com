define(['backbone'], function(Backbone) {
	var NavLink = Backbone.Model.extend({
		initialize : function() {

		},

		href : function() {
			if (this.url) {
				return url;
			} else {
				return '#';
			}
		}
	});

	return NavLink;
});
