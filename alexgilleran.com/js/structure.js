define([
	'handlebars',
	'js/views/content/blurbview',
	'js/views/blog/blogview',
	'js/views/project/projectlistview',
	'js/models/blurb',
	'text!templates/icons/about_me_icon.svg',
	'text!templates/icons/projects_icon.svg',
	'text!templates/icons/blog_icon.svg',
	'text!templates/icons/linkedin_icon.svg',
	'text!templates/icons/twitter_icon.svg',
	'text!templates/icons/github_icon.svg'
], function(Handlebars, BlurbView, BlogView, ProjectListView, Blurb, AboutMeIconTemplate, ProjectsIconTemplate, BlogIconTemplate, LinkedInIconTemplate, TwitterIconTemplate, GithubIconTemplate){
	var structureData = [{
			id : 'nav-about-me',
			label : 'about me',
			url: 'about_me',
			contentView: BlurbView,
			model: new Blurb({'urlRoot' : 'data/aboutme.md'}),
			open: true,
			theme: {
				iconTemplate: Handlebars.compile(AboutMeIconTemplate),				color: {
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
				iconTemplate: Handlebars.compile(ProjectsIconTemplate),
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
				iconTemplate: Handlebars.compile(BlogIconTemplate),
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
				iconTemplate: Handlebars.compile(LinkedInIconTemplate),
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
				iconTemplate: Handlebars.compile(TwitterIconTemplate),
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
				iconTemplate: Handlebars.compile(GithubIconTemplate),
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