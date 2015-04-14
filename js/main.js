/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("js/models/navnode",["underscore","backbone","handlebars"],function(e,t,n){var r=t.Model.extend({initialize:function(){e.bindAll(this);if(!this.isSpacer()){var t=this;require(["text!"+t.get("theme").iconTemplateUrl],function(e){t.get("theme").iconTemplate=n.compile(e),window.icons||(window.icons={}),window.icons[t.get("id")]=t.get("theme").iconTemplate,t.set("ready",!0)})}},defaults:{open:!1,ready:!1},target:function(){return this.get("contentView")?"_self":"_blank"},isSpacer:function(){return!this.get("id")}});return r}),define("js/models/externallinks",["backbone","js/models/navnode"],function(e,t){var n=e.Collection.extend({model:t,url:"data/externallinks.json",initialize:function(){},displayableNodesCount:function(){var e=0;return this.forEach(function(t){t.get("hidden")||e++}),e}});return n}),define("js/views/content/blurbview",["jquery","underscore","backbone","handlebars","showdown"],function(e,t,n,r,i){var s=n.View.extend({converter:new i.converter,initialize:function(){t.bindAll(this),this.model.get("blurb-text")?this.render():this.model.fetch().done(this.render)},render:function(){var e=this.model.get("blurb-text"),t=this.converter.makeHtml(e);this.$el.html(t),this.trigger("sizeChanged")}});return s}),define("text",["module"],function(e){var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),l=[],c=e.config&&e.config()||{};t={version:"2.0.3",strip:function(e){if(e){e=e.replace(i,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:c.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),n!==-1&&(t=i.substring(n+1,i.length),t=t==="strip",i=i.substring(0,n)),{moduleName:r,ext:i,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+"."+s.ext,h=n.toUrl(l),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.moduleName+"."+o.ext,a=r.toUrl(o.moduleName+"."+o.ext)+".js";t.load(u,r,function(n){var r=function(e){return i(a,e)};r.asModule=function(e,t){return i.asModule(e,a,t)},t.write(e,u,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())t.get=function(e,n,r){var i=t.createXhr();i.open("GET",e,!0),c.onXhr&&c.onXhr(i,e),i.onreadystatechange=function(t){var s,o;i.readyState===4&&(s=i.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=i,r(o)):n(i.responseText))},i.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};return t}),define("text!templates/project.html",[],function(){return'<article class="project full-width">\r\n	<h2 class="project-title">{{title}}</h2>\r\n			\r\n	<div class="project-meta full-width">\r\n		<img class="project-icon" src={{img}} />\r\n		<h3 class="project-subtitle">{{subtitle}}</h3>\r\n		<div class="project-technologies">{{technologies}}</div>\r\n		<a class="project-link" href="http://{{url}}">{{url}}</a>\r\n	</div>\r\n	\r\n	<div class="project-description full-width">\r\n		{{{description}}}\r\n	</div>\r\n	\r\n	<a class="project-expander" href="#">Read more</a>\r\n	<a class="project-collapser" href="#">Read less</a>\r\n</article>'}),define("js/views/project/projectlistview",["jquery","underscore","backbone","handlebars","showdown","text!templates/project.html"],function(e,t,n,r,s,o){var u=n.View.extend({projectTemplate:r.compile(o),converter:new s.converter,events:{"click .project-expander":"onExpanderClicked","click .project-collapser":"onExpanderClicked"},initialize:function(){t.bindAll(this),this.model.fetch().done(this.render)},render:function(){for(i=0;i<this.model.length;i++){var e=this.model.at(i),t=function(){var t="";for(j=0;j<e.get("technologies").length;j++)t+=e.get("technologies")[j],j<e.get("technologies").length-1&&(t+=", ");return t};this.$el.append(this.projectTemplate({url:e.get("url"),title:e.get("title"),subtitle:e.get("subtitle"),img:e.get("image"),description:this.converter.makeHtml(e.get("description")),technologies:t()}));var n=this.$el.find(".project-description").last();n.height(n.find("p").first().outerHeight(!0)),this.trigger("sizeChanged")}},toggleExpansion:function(t){var n=this,r=t.height(),i;t.attr("expanded")?(t.parent().find(".project-expander").css("display","block"),t.parent().find(".project-collapser").css("display","none"),t.attr("expanded",""),i=t.find("p").first().outerHeight(!0)):(t.parent().find(".project-expander").css("display","none"),t.parent().find(".project-collapser").css("display","block"),t.attr("expanded","true"),i=0,t.children().each(function(){i+=e(this).outerHeight(!0)})),t.animate({height:i},{duration:500,complete:function(){n.trigger("sizeChanged",r-i)}})},onExpanderClicked:function(t){t.preventDefault(),t.stopPropagation(),$target=e(t.target),this.toggleExpansion($target.parent().find(".project-description"))}});return u}),define("js/views/viewmapping",["js/views/content/blurbview","js/views/project/projectlistview"],function(e,t){return{blurbview:e,projectlistview:t}}),define("js/models/blurb",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({initialize:function(){t.bindAll(this)},fetch:function(){return blurb=this,e.ajax(this.url(),{dataType:"text",success:function(e,t,n){blurb.set("blurb-text",e)},error:function(e,t,n){alert("fuck! "+t)}})},url:function(){return this.get("urlRoot")}});return r}),define("js/models/project",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({initialize:function(){},fetch:function(t){var n=this;return e.ajax(this.get("descriptionUrl"),{dataType:"text",success:function(e,t,r){n.set("description",e)}})}});return r}),define("js/models/projectlist",["jquery","underscore","backbone","js/models/project"],function(e,t,n,r){var i=n.Collection.extend({model:r,url:"data/projects/projects.json",initialize:function(){},fetch:function(){var t=this,n=[];return e.when(e.ajax(this.url,{success:function(e,i,s){e.projects.forEach(function(e){var i=new r(e);t.add(i),n.push(i.fetch())},t)}})).then(function(){return e.when.apply(null,n)})}});return i}),define("js/models/modelmapping",["js/models/blurb","js/models/projectlist"],function(e,t){return{blurb:e,projectlist:t}}),define("text!templates/contentframe.html",[],function(){return'<div class="fade-wrapper {{node-class}}">\r\n	<header id="content-header">\r\n		<h1 id="content-header-text" class="section-header-text {{node-class}}-color">{{title}}</h1>\r\n	</header>\r\n	\r\n	<div class="content-text section-text">\r\n		<div class="scrollbar">\r\n			<div class="track">\r\n				<div class="thumb">\r\n					<div class="end {{node-class}}-bgcolor"></div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n    	<div class="viewport">\r\n        	<div class="overview">\r\n		\r\n			</div>\r\n		</div>\r\n	</div>\r\n	\r\n	{{{background-icon}}}\r\n</div>'}),define("js/views/content/contentview",["jquery","underscore","backbone","handlebars","jquery.color","jquery.tinyscrollbar","js/views/viewmapping","js/models/modelmapping","text!templates/contentframe.html"],function(e,t,n,r,i,s,o,u,a){var f=n.View.extend({contentTemplate:r.compile(a),initialize:function(){this.fitWindow=t.bind(this.fitWindow,this),e(window).resize(this.fitWindow),this.listenTo(this.model,"change:open",this.openNode),this.openNode(this.model.get("currentNode"),!0)},openNode:function(e,t){t&&(e.get("ready")?this.render():e.once("change:ready",this.openNode,this))},render:function(){contentFrame=this;var e=u[contentFrame.model.get("currentNode").get("model")["class"]],t=o[this.model.get("currentNode").get("contentView")];contentFrame.$el.find(".fade-wrapper").stop(!0,!0);var n=contentFrame.model.get("currentNode").get("theme").iconTemplate({"class":"content-icon-background",r:contentFrame.model.get("currentNode").get("theme").color.r,g:contentFrame.model.get("currentNode").get("theme").color.g,b:contentFrame.model.get("currentNode").get("theme").color.b,a:"0.05"}),r=contentFrame.contentTemplate({title:contentFrame.model.get("currentNode").get("label"),"node-class":contentFrame.model.get("currentNode").get("id"),"background-icon":n});contentFrame.$el.html(r);var i=contentFrame.$el.find(".content-text");i.tinyscrollbar({axis:"y",invertscroll:window.isTouchDevice}),contentFrame.nodeView=new t({el:contentFrame.$el.find(".overview"),model:new e(contentFrame.model.get("currentNode").get("model").attributes)}),contentFrame.listenTo(contentFrame.nodeView,"sizeChanged",contentFrame.fitWindow);var s=contentFrame.$el.find(".fade-wrapper");contentFrame.changeBackground();var a=s.last();a.fadeIn(500,function(){i.tinyscrollbar_update()});if(s.length>1){var f=a.prev();f.fadeOut(500,function(){f.remove()})}},changeBackground:function(){var t=this.model.get("currentNode").get("theme").color,n=e.Color(t.r,t.g,t.b,.15);this.$el.animate({backgroundColor:n},500)},fitWindow:function(e){var t=0;e&&(t=-1*this.$el.find(".overview").position().top),e>0&&(t-=e),t<0&&(t=0),this.$el.find(".content-text").tinyscrollbar_update(t)}});return f}),define("js/models/structure",["backbone","js/models/navnode"],function(e,t){var n=e.Collection.extend({model:t,url:"data/structure.json",attributes:{},nodeDictionary:{},initialize:function(){this.on("change:open",this.onOpenNodeChanged),this.on("reset",this.onReset),this.setCurrentNodeById=_.bind(this.setCurrentNodeById,this)},onReset:function(e,t){this.forEach(function(e){this.nodeDictionary[e.get("id")]=e},this),e.set("structureReady",!0)},setCurrentNodeById:function(e){this.get("structureReady")?(this.nodeDictionary[e]||(e="error"),this.set("currentNode",this.nodeDictionary[e]),this.nodeDictionary[e].set("open",!0)):this.once("change:structureReady",function(){this.setCurrentNodeById(e)},this)},onOpenNodeChanged:function(e,t,n){t&&(this.forEach(function(t){t!=e&&t.set("open",!1)}),this.set("currentNode",e))},displayableNodesCount:function(){var e=0;return this.forEach(function(t){t.get("hidden")||e++}),e},set:e.Model.prototype.set,get:e.Model.prototype.get,_validate:e.Model.prototype._validate});return n}),define("text!templates/spacer.html",[],function(){return'<div class="spacer"></div>\r\n'}),define("js/views/navigation/linkboxview",["jquery","backbone","handlebars","jquery.color","text!templates/spacer.html"],function(e,t,n,r,i){var s=t.View.extend({spacerTemplate:n.compile(i),tagName:"li",events:{},initialize:function(){this.linkTemplate=n.compile(this.options.LinkTemplate),this.model.get("theme")&&(this.openColor=e.Color(this.model.get("theme").color.r,this.model.get("theme").color.g,this.model.get("theme").color.b),this.invisible=e.Color(255,255,255,0)),this.listenTo(this.model,"change:open",this.setOpenStyling),this.render()},render:function(){var e=this.model,t=this.linkTemplate({label:e.get("label"),url:e.get("url"),id:e.get("id"),"icon-url":e.get("theme").icon,target:e.target()});this.$el.html(t),this.setOpenStyling(),this.model.get("ready")&&this.renderIcon(),this.listenTo(this.model,"change:ready",this.renderIcon)},renderIcon:function(){var e=this.model.get("theme").iconTemplate,t;e&&(t=e({r:255,b:255,g:255,a:1,"class":"nav-link-icon"}),this.$el.find(".nav-link").append(t)),this.setOpenStyling()},onClick:function(t){e(t.target).blur(),this.model.get("contentViewUrl")&&(t.preventDefault(),this.model.set("open",!0))},setOpenStyling:function(){this.model.get("open")?this.$el.find(".nav-link").animate({color:this.openColor},500):this.$el.find(".nav-link").animate({color:this.invisible},500)}});return s}),define("text!templates/nav.html",[],function(){return'<ul id="nav-list">\r\n 	\r\n</ul>\r\n\r\n'}),define("text!templates/link.html",[],function(){return'<a id="{{id}}" class="oblong nav-link glass nav-node" href="{{url}}" target="{{target}}">\r\n	\r\n	<!--<img class="nav-link-icon" src="{{icon-url}}" />-->\r\n	{{{svg}}}\r\n	\r\n	<span class="nav-link-text-wrapper">\r\n		<span class="nav-link-text">{{label}}</span>\r\n	</span>\r\n</a>'}),define("js/views/navigation/navview",["jquery","underscore","backbone","handlebars","js/models/structure","js/views/navigation/linkboxview","text!templates/nav.html","text!templates/link.html"],function(e,t,n,r,i,s,o,u){var a=n.View.extend({navTemplate:r.compile(o),initialize:function(){this.fitWindow=t.bind(this.fitWindow,this),this.render()},render:function(){this.$el.html(this.navTemplate());var t=e("#nav-list");this.model.forEach(function(e){if(!e.get("hidden")){var n=new s({model:e,attributes:{"class":"nav-list-item"},LinkTemplate:u});t.append(n.$el)}},this),this.resizeNavButtons()},resizeNavButtons:function(){this.$el.css("width","");var e=this.$el.width(),t=this.$el.find(".nav-node");t.width(e).height(e),t.last().css("margin-bottom",0),lastButtonBottom=t.last().offset().top+t.last().outerHeight(!0),lastButtonBottom>this.$el.offset().top+this.$el.outerHeight(!0)&&this.fitWindow(t)},fitWindow:function(e){var t=this.model.displayableNodesCount(),n=e.first(),r=n.outerHeight(!0)-n.innerHeight(),i=n.outerHeight(!1)-n.innerHeight(),s=(this.$el.height()-(r-i)*(t-1)-i*t)/t-i-1;this.$el.width(s+i),e.height(s).width(s)}});return a}),define("js/models/news/newsitem",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({initialize:function(){}});return r}),define("js/models/news/tweet",["jquery","underscore","backbone","js/models/news/newsitem"],function(e,t,n,r){var i=r.extend({initialize:function(){this.set("source","twitter"),this.set("date",new Date(this.get("created_at"))),this.set("url","http://twitter.com/"+this.get("from_user")+"/status/"+this.get("id_str"))}});return i}),define("js/models/news/tweetlist",["jquery","underscore","backbone","js/models/news/tweet"],function(e,t,n,r){var i=n.Collection.extend({model:r,url:"http://search.twitter.com/search.json?q=from:AlexGilleran",initialize:function(){},fetch:function(){return tweetList=this,e.ajax({dataType:"jsonp",url:this.url,cache:!0,success:function(e,t,n){tweetList.update(e.results)}})}});return i}),define("js/models/news/githubevent",["jquery","underscore","backbone","js/models/news/newsitem"],function(e,t,n,r){var i=r.extend({initialize:function(){this.set("date",new Date(this.get("created_at"))),this.set("source","github"),this.set("url","http://github.com/"+this.get("repo").name)}});return i}),define("js/models/news/githublist",["jquery","underscore","backbone","js/models/news/githubevent"],function(e,t,n,r){var i=n.Collection.extend({model:r,url:"https://api.github.com/users/AlexGilleran/events/public",initialize:function(){},fetch:function(){return eventList=this,e.ajax({dataType:"jsonp",url:this.url,cache:!0,success:function(e,t,n){Array.isArray(e.data)&&eventList.update(e.data)}})}});return i}),define("js/models/news/news",["jquery","underscore","backbone","js/models/news/newsitem","js/models/news/tweetlist","js/models/news/githublist"],function(e,t,n,r,i,s){var o=n.Collection.extend({model:r,sources:[new i,new s],initialize:function(){this.sources.forEach(function(e){this.listenTo(e,"add",this.onNewItem)},this)},onNewItem:function(e,t,n){this.add(e)},fetch:function(){var t=[];return this.sources.forEach(function(e){t.push(e.fetch())},this),e.when.apply(e,t)},comparator:function(e,t){return e.get("date")>t.get("date")?-1:e.get("date")<t.get("date")?1:0}});return o}),define("js/util/prettydate",[],function(){function e(e){var t=((new Date).getTime()-e.getTime())/1e3,n=Math.floor(t/86400),r=Math.ceil(n/7);if(isNaN(n)||n<0||r>=52)return;return n==0&&(t<60&&"just now"||t<120&&"1 minute ago"||t<3600&&Math.floor(t/60)+" minutes ago"||t<7200&&"1 hour ago"||t<86400&&Math.floor(t/3600)+" hours ago")||n==1&&"Yesterday"||n<7&&n+" days ago"||r==1&&r+" week ago"||r<52&&r+" weeks ago"}return e}),define("text!templates/news/newsitem.html",[],function(){return'{{{logo}}}\r\n{{{text}}}\r\n	\r\n<a class="news-source aside-social-color" href="{{url}}">{{date}} via {{source}}</a>'}),define("js/views/aside/news/newsitemview",["jquery","backbone","handlebars","js/util/prettydate","text!templates/news/newsitem.html"],function(e,t,n,r,i){var s=t.View.extend({newsItemTemplate:n.compile(i),tagName:"article",attributes:{"class":"news-item"},initialize:function(){this.render()},render:function(){var e=this.createText();if(e&&this.model.get("date")){this.display=!0;var t=window.icons[this.model.get("source")],n=t({r:255,b:255,g:255,a:1,"class":"news-source-logo"}),i=this,s=this.newsItemTemplate({logo:n,source:i.model.get("source"),text:e,date:r(i.model.get("date")),url:i.model.get("url")});this.$el.addClass("source-"+this.model.get("source")),this.$el.append(s)}}});return s}),define("js/util/linkify",[],function(){var e=function(e){var t=["\\b((?:https?|ftp)://[^\\s\"'<>]+)\\b","\\b(www\\.[^\\s\"'<>]+)\\b","\\b(\\w[\\w.+-]*@[\\w.-]+\\.[a-z]{2,6})\\b","([#|@][a-z0-9]+)"];return t=new RegExp(t.join("|"),"gi"),e.replace(t,function(e,t,n,r,i){return t?'<a href="'+t+'">'+t+"</a>":n?'<a href="http://'+n+'">'+n+"</a>":r?'<a href="mailto:'+r+'">'+r+"</a>":i?'<a href="http://twitter.com/'+i+'">'+i+"</a>":e})};return e}),define("text!templates/news/tweet.html",[],function(){return'<div class="news-text">\r\n	<a href="http://twitter.com/{{author}}">@{{author}}</a>: {{{tweet-text}}}\r\n</div>\r\n'}),define("js/views/aside/news/tweetview",["jquery","backbone","handlebars","js/views/aside/news/newsitemview","js/util/linkify","text!templates/news/tweet.html"],function(e,t,n,r,i,s){var o=r.extend({tweetTemplate:n.compile(s),initialize:function(){r.prototype.initialize.call(this)},createText:function(){return tweetView=this,this.tweetTemplate({author:tweetView.model.get("from_user"),"tweet-text":i(tweetView.model.get("text"))})}});return o}),define("text!templates/news/githubevent.html",[],function(){return'<div class="news-text">\r\n	<a href="{{user-url}}">{{username}}</a> {{event-description}} <a href="{{repo-url}}">{{repo-name}}</a>{{#if commits}}:{{else}}.{{/if}}\r\n</div>\r\n\r\n{{#if commits}}\r\n	<ul class="news-appendices">\r\n		{{#each commits}}\r\n			<li class="news-appendix"><a class="news-appendix-link" href="{{this.url}}">{{this.message}}</a></li>\r\n		{{/each}}\r\n	</ul>\r\n{{/if}}'}),define("js/views/aside/news/githubeventview",["jquery","underscore","backbone","handlebars","js/views/aside/news/newsitemview","text!templates/news/githubevent.html"],function(e,t,n,r,i,s){var o=i.extend({eventTemplate:r.compile(s),initialize:function(){i.prototype.initialize.call(this)},eventDescriptions:{PushEvent:function(e){return"pushed "+e.model.get("payload").size+" new commits to "},CreateEvent:function(e){var t="created a new "+e.model.get("payload").ref_type;return e.model.get("payload").ref_type=="repository"?t+":":t+" named "+e.model.get("payload").ref+" in"}},createText:function(){eventView=this;var e=this.eventDescriptions[eventView.model.get("type")];return e?this.eventTemplate({username:eventView.model.get("actor").login,"user-url":"http://github.com/"+eventView.model.get("actor").login,"event-description":e(eventView),"repo-url":eventView.model.get("url"),"repo-name":eventView.model.get("repo").name.split("/")[1],commits:function(){if(eventView.model.get("payload").commits){var e=[];return eventView.model.get("payload").commits.forEach(function(t){e.push({message:t.message,url:eventView.model.get("url")+"/commits/"+t.sha})}),e}return null}()}):""}});return o}),define("text!templates/asideframe.html",[],function(){return'<div class="fade-wrapper {{aside-id}}">\r\n	<header id="aside-header">\r\n		<h1 id="aside-header-text" class="section-header-text {{aside-id}}-color">{{title}}</h1>\r\n	</header>\r\n	\r\n	<div class="aside-text section-text">\r\n		<div class="scrollbar">\r\n			<div class="track">\r\n				<div class="thumb">\r\n					<div class="end {{aside-id}}-bgcolor"></div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n    	<div class="viewport">\r\n        	<div class="overview">\r\n				\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'}),define("js/views/aside/newsasideview",["jquery","underscore","backbone","handlebars","js/models/news/news","js/views/aside/news/tweetview","js/views/aside/news/githubeventview","text!templates/asideframe.html"],function(e,t,n,r,s,o,u,a){var f=n.View.extend({frameTemplate:r.compile(a),itemViews:{twitter:o,github:u},model:new s,initialize:function(){this.renderList=t.bind(this.renderList,this),this.render(),this.listenTo(this.model,"add",this.addNewsItem),this.model.fetch()},onResize:function(){e(".aside-text").tinyscrollbar_update()},render:function(){this.$el.html(this.frameTemplate({"aside-id":"aside-social",title:"news"})),this.scrollDiv=this.$el.find(".aside-text"),this.scrollDiv.tinyscrollbar({axis:"y"}),e(window).resize(this.onResize);var t=this;this.$el.find(".fade-wrapper").fadeIn(500,function(){t.scrollDiv.tinyscrollbar_update()})},renderList:function(){var e=10;this.model.length<10&&(e=this.model.length);for(i=0;i<e;i++)this.addNewsItem(this.model.at(i))},addNewsItem:function(e){var t=new(this.itemViews[e.get("source")])({model:e});t.display&&(this.$el.find(".overview").append(t.$el),this.scrollDiv.tinyscrollbar_update())}});return f}),define("text!templates/external-link.html",[],function(){return'<a id="{{id}}" class="oblong nav-link external-link" href="{{url}}" target="{{target}}">\r\n	\r\n	{{{svg}}}\r\n	\r\n	<span class="nav-link-text-wrapper">\r\n		<span class="nav-link-text">{{label}}</span>\r\n	</span>\r\n</a>'}),define("js/views/navigation/headerlinksview",["jquery","underscore","backbone","handlebars","js/views/navigation/linkboxview","text!templates/nav.html","text!templates/external-link.html"],function(e,t,n,r,i,s,o){var u=n.View.extend({navTemplate:r.compile(s),initialize:function(){this.render=t.bind(this.render,this),this.fitWindow=t.bind(this.fitWindow,this);var n=this;this.render(),e(window).resize(this.fitWindow)},render:function(){var e=this.$el.find("#external-links");e.html(""),this.model.forEach(function(t){if(!t.get("hidden")){var n=new i({model:t,attributes:{"class":"nav-list-item"},LinkTemplate:o});e.append(n.$el)}},this),this.fitWindow()},fitWindow:function(){var t=this.$el.find(".external-link"),n=t.first(),r=n.outerWidth(!0)-n.innerWidth(),i=0,s=60;if(e(window).width()<=480){var o=this.model.displayableNodesCount(),u=n.outerWidth(!1)-n.innerWidth();t.last().css("margin-right","0"),s=(this.$el.width()-(r-u)*(o-1)-u*o)/o,i=this.$el.find(".header-text").height()+(r-u)}else e(window).width()<=800&&(s=30);this.$el.find(".external-links-nav").css("margin-top",i),this.$el.height(s+r+i),t.height(s).width(s)}});return u}),define("text!templates/nav-link.css",[],function(){return"#{{id}}	{\r\n	background: rgba({{r}}, {{g}}, {{b}}, 1);\r\n}\r\n\r\n#{{id}}:focus, #{{id}}:hover {\r\n	background: rgba({{r}}, {{g}}, {{b}}, 0.6);\r\n}\r\n\r\n.{{id}}-color, .{{id}} a {\r\n	color: rgb({{r}}, {{g}}, {{b}});\r\n}\r\n\r\n.{{id}}-bgcolor {\r\n	background-color: rgb({{r}}, {{g}}, {{b}});\r\n}\r\n"}),define("js/views/siteview",["jquery","underscore","backbone","handlebars","js/models/externallinks","js/views/content/contentview","js/views/navigation/navview","js/views/aside/newsasideview","js/views/navigation/headerlinksview","text!templates/nav-link.css"],function(e,t,n,r,i,s,o,u,a,f){var l=n.View.extend({cssTemplate:r.compile(f),el:e("body"),initialize:function(){this.fitWindow=t.bind(this.fitWindow,this),this.onWindowResize=t.bind(this.onWindowResize,this),window.prevWidth=e(window).width(),e(window).resize(this.onWindowResize),this.model.get("structureReady")&&this.render(),this.listenTo(this.model,"change:structureReady",this.render),this.listenTo(this.model,"change:currentNode",this.renderAsideView)},render:function(){this.navView=new o({el:e("#main-nav"),model:this.model}),this.contentView=new s({el:e("#content-main"),model:this.model});var t=new i,n=this;t.fetch().done(function(){e(window).width()<=480?t.add(n.model.models,{at:0}):n.model.forEach(n.insertStyles,n),t.forEach(n.insertStyles,n),n.HeaderLinksView=new a({el:e("#site-header"),model:t}),n.renderAsideView(),n.fitWindow(),window.isTouchDevice="ontouchstart"in document.documentElement,window.isTouchDevice&&e(".nav-link-text").css("color","#FFFFFF")})},insertStyles:function(t){var n=this.cssTemplate({id:t.get("id"),r:t.get("theme").color.r,g:t.get("theme").color.g,b:t.get("theme").color.b});e("#dynamic-styles").append(n)},renderAsideView:function(){var t=this.model.get("currentNode").get("aside");t||(t=u),this.AsideView!=t&&(this.AsideView=t,this.asideView=new t({el:e("#content-aside")}))},onWindowResize:function(){currentWidth=e(window).width(),window.prevWidth>480&&currentWidth<=480||window.prevWidth<=480&&currentWidth>480?this.render():this.fitWindow(),window.prevWidth=currentWidth},fitWindow:function(){var t=this.$el.position().left;this.navView.resizeNavButtons();var n=this.$el.innerWidth();e(window).width()>480&&(n-=this.navView.$el.outerWidth(!0)+t),this.$el.find("#content-row").css("top",this.$el.find("#site-header").height()),this.$el.find("#content").width(n),this.$el.find("#content-aside").css("left",e("#content-main").width()+t+2)}});return l}),define("js/router",["jquery","underscore","backbone","js/views/siteview","js/models/structure"],function(e,t,n,r,i){var s=n.Router.extend({routes:{":nodeId":"openNode","*actions":"openDefault"},openDefault:function(){this.structure.setCurrentNodeById("about-me")},openNode:function(e){e?this.structure.setCurrentNodeById(e):openDefault()},trackPageView:function(){if(!this.firstRoute){var e=n.history.getFragment();return _gaq.push(["_trackPageview","/"+e])}this.firstRoute=!1},initialize:function(){this.firstRoute=!0,this.structure=new i,this.on("route",this.trackPageView,this);var e=this;this.structure.fetch({error:function(e){alert(e)}}).done(function(){e.siteView=new r({model:e.structure})})}}),o=function(){var e=new s;n.history.start()};return{initialize:o}}),define("js/app",["jquery","underscore","backbone","js/router"],function(e,t,n,r){var i=function(){r.initialize()};return{initialize:i}}),require.config({baseUrl:"",paths:{jquery:"http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",underscore:"http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",backbone:"http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min",handlebars:"http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.2/handlebars.min",showdown:"http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min","jquery.color":"lib/jquery.color-2.1.1","jquery.tinyscrollbar":"lib/jquery.tinyscrollbar",text:"text"},shim:{jquery:{exports:"$"},"jquery.color":["jquery"],"jquery.tinyscrollbar":["jquery"],underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},handlebars:{exports:"Handlebars"}}}),require(["js/app"],function(e){e.initialize()}),define("js/main",function(){});