define(['backbone', 'js/models/navlink'], function(Backbone, NavLink) {
	var NavModel = Backbone.Collection.extend({
		model : NavLink,

		initialize : function(links) {
			this.fetch();
		},

		fetch : function() {
			this.linkData.forEach(function(link) {
				this.add(new NavLink(link));
			}, this);
		},

		linkData : [{
			id : 'about-me',
			label : 'About Me',
		}, {
			id : 'resume',
			label : 'Resume',
		}, {
			id : 'projects',
			label : 'Projects',
		}, {
			id : 'blog',
			label : 'Blog',
		}, {
			id : 'linkedin',
			label : 'LinkedIn',
			url : 'http://www.linkedin.com/profile/view?id=82976163&trk=hb_tab_pro_top'
		}, {
			id : 'twitter',
			label : 'Twitter',
			url : 'http://www.twitter.com/AlexGilleran'
		}, {
			id : 'github',
			label : 'Github',
			url : 'http://github.com/AlexGilleran'
		}],
	});

	return NavModel;
});
