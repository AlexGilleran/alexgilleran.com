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
			label : 'about me',
		}, {
			id : 'resume',
			label : 'resume',
		}, {
			id : 'projects',
			label : 'projects',
		}, {
			id : 'blog',
			label : 'blog',
		}, {
			id : 'linkedin',
			label : 'linkedin',
			url : 'http://www.linkedin.com/profile/view?id=82976163&trk=hb_tab_pro_top',
			icon: 'img/linkedin_logo.svg'
		}, {
			id : 'twitter',
			label : 'twitter',
			url : 'http://www.twitter.com/AlexGilleran',
			icon: 'img/twitter_logo.svg'
		}, {
			id : 'github',
			label : 'github',
			url : 'http://github.com/AlexGilleran',
			icon: 'img/github_logo.svg'
		}],
	});

	return NavModel;
});
