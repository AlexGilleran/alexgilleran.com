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
			icon: 'img/about_me_icon.svg'
		}, {
			id : 'projects',
			label : 'projects',
			icon: 'img/projects_icon.svg'
		}, {
			id : 'blog',
			label : 'blog',
			icon: 'img/blog_logo.svg'
		}, {
			spacer : 'true'
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
