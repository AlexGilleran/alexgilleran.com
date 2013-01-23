define([
  'js/views/about-me/aboutmeview',
  'js/views/blog/blogview',
  'js/views/project/projectlistview'
], function(AboutMeView, BlogView, ProjectListView){
	var structureData = [{
			id : 'nav-about-me',
			label : 'about me',
			url: 'about_me',
			contentView: AboutMeView,
			open: true,
			theme: {
				icon: 'img/about_me_icon.svg',
				color: {
					r: 204,
					g: 70,
					b: 73
				}
			}
		}, {
			id : 'nav-projects',
			label : 'projects',
			url: 'projects',
			contentView: ProjectListView,
			theme: {
				icon: 'img/projects_icon.svg',
				color: {
					r: 204,
					g: 183,
					b: 39
				}
			}
		}, {
			id : 'nav-blog',
			label : 'blog',
			url : 'blog',
			contentView: BlogView,
			theme: {
				icon: 'img/blog_icon.svg',
				color: {
					r: 142,
					g: 204,
					b: 48
				}
			}
		}, {
			// Spacer
		}, {
			id : 'nav-linkedin',
			label : 'linkedin',
			url : 'http://www.linkedin.com/profile/view?id=82976163',
			theme: {
				icon: 'img/linkedin_icon.svg',
				color: {
					r: 96,
					g: 168,
					b: 204
				}
			}
		}, {
			id : 'nav-twitter',
			label : 'twitter',
			url : 'http://www.twitter.com/AlexGilleran',
			theme: {
				icon: 'img/twitter_icon.svg',
				color: {
					r: 49,
					g: 130,
					b: 204
				}
			}
		}, {
			id : 'nav-github',
			label : 'github',
			url : 'http://github.com/AlexGilleran',
			theme: {
				icon: 'img/github_icon.svg',
				color: {
					r: 46,
					g: 65,
					b: 77
				}
			}
		}
	];
	
	return structureData;
});