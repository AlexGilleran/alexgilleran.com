define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'js/views/aside/news/newsitemview',
  	'text!templates/news/githubevent.html'
], function($, _, Backbone, Handlebars, NewsItemView, GitHubEventTemplate){
	var GitHubEventView = NewsItemView.extend({		
		eventTemplate : Handlebars.compile(GitHubEventTemplate),
		
		initialize : function() {
			NewsItemView.prototype.initialize.call(this);
		},
		
		eventDescriptions : {
			'PushEvent' : function(eventView) {
				return 'pushed ' + eventView.model.get('payload').size + ' new commits to ';
			},
			'CreateEvent' : function(eventView) {
				var message = 'created a new ' + eventView.model.get('payload').ref_type;
				
				if (eventView.model.get('payload').ref_type == 'repository') {
					return message + ':'
				} else {
					return message + ' named ' + eventView.model.get('payload').ref + ' in' 
				}
			}
		},
		
		createText : function() {
			eventView = this;
			
			var eventDescFunction = this.eventDescriptions[eventView.model.get('type')];
			if (eventDescFunction) {
				return this.eventTemplate({
					'username' : eventView.model.get('actor').login,
					'user-url' : 'http://github.com/' + eventView.model.get('actor').login,
					'event-description' : eventDescFunction(eventView),
					'repo-url' : eventView.model.get('url'),
					'repo-name' : eventView.model.get('repo').name.split('/')[1],
					'commits': function() {
						if (eventView.model.get('payload').commits) {
							var commits = [];
							
							eventView.model.get('payload').commits.forEach(function(commit) {
								commits.push({
									message: commit.message,
									url: eventView.model.get('url') + '/' + commit.sha
								});
							});
							
							return commits;
						}
						
						return null;
					}()
				});
			} else {
				return '';
			}
		},
	});

	return GitHubEventView;
});