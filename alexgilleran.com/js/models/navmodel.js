define([
	'backbone',
	'models/navlink'
], function(Backbone, NavLink) {
	var NavModel = Backbone.Collection.extend({
		model : NavLink,

		initialize : function(links) {
			this.fetch();
		},

		fetch: function() {
			this.linkData.forEach(function(link) {
				this.add(new NavLink(link));
			}, this);
		},

		linkData : [
		{
			id : 'linkedin',
			label : 'LinkedIn',
			url : 'http://www.linkedin.com/profile/view?id=82976163&trk=hb_tab_pro_top'
		},{
			id : 'twitter',
			label : 'Twitter',
			url : 'http://www.twitter.com/AlexGilleran'
		}, {
			id : 'github',
			label : 'Github',
			url : 'http://github.com/AlexGilleran'
		}, {
			id : 'panniering',
			label : 'Panniering',
			url : 'http://panniering.com'
		}],
	});
	
	return NavModel;
}); 