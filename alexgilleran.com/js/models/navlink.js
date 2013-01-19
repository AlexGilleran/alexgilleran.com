define(['backbone'], function(Backbone) {
	var NavLink = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this)
		},

		href : function() {
			if (this.get('url')) {
				return this.get('url');
			} else {
				return '#';
			}
		}
	});

	return NavLink;
});
