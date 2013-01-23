define(['backbone'], function(Backbone) {
	var NavNode = Backbone.Model.extend({
		initialize : function() {
			_.bindAll(this)
		},
		
		defaults : {
			'open': false
		},

		target : function() {
			// If there's no content view for an element, open the url in a new window/tab
			if (!this.get('contentView')) {
				return '_blank'
			} else {
				return '_self';
			}
		},
	});

	return NavNode;
});
