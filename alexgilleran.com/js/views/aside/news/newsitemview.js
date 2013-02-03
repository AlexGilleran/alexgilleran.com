define([
	'jquery',
	'backbone',
	'handlebars',
  	'js/util/prettydate',
  	'text!templates/news/newsitem.html'
], function($, Backbone, Handlebars, prettyDate, NewsItemTemplate){
	var NewsItemView = Backbone.View.extend({
		newsItemTemplate : Handlebars.compile(NewsItemTemplate),
		
		tagName: 'article',
				
		attributes : {
			'class' : 'news-item'
		},
				
		initialize : function() {
			this.render();
		},

		render : function() {
			var text = this.createText();
			
			// If there's no text, don't show anything
			if (text && this.model.get('date')) {
				this.display = true;
				
				var LogoSvgTemplate = window.icons[this.model.get('source')];
				
				var logoSvg = LogoSvgTemplate({
					r: 255,
					b: 255,
					g: 255,
					a: 1,
					'class': 'news-source-logo'
				});
				
				var newsItemView = this;
				var newsItemHtml = this.newsItemTemplate({
					logo: logoSvg,
					source: newsItemView.model.get('source'),
					'text': text,
					date: prettyDate(newsItemView.model.get('date')),
					url: newsItemView.model.get('url')
				});
				
				this.$el.addClass('source-' + this.model.get('source'))
				this.$el.append(newsItemHtml);	
			}
		},
	});

	return NewsItemView;
});