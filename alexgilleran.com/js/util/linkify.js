define([], function() {
	var linkify = function(str) {
	    // order matters
	    var re = [
	        "\\b((?:https?|ftp)://[^\\s\"'<>]+)\\b",
	        "\\b(www\\.[^\\s\"'<>]+)\\b",
	        "\\b(\\w[\\w.+-]*@[\\w.-]+\\.[a-z]{2,6})\\b", 
	        "([#|@][a-z0-9]+)"];
	    re = new RegExp(re.join('|'), "gi");
	    
	    return str.replace(re, function(match, url, www, mail, twitter) {
	        if(url)
	            return "<a href=\"" + url + "\">" + url + "</a>";
	        if(www)
	            return "<a href=\"http://" + www + "\">" + www + "</a>";
	        if(mail)
	            return "<a href=\"mailto:" + mail + "\">" + mail + "</a>";
	        if(twitter)
	            return "<a href=\"http://twitter.com/" + twitter + "\">" + twitter + "</a>";
	        
	        // shouldnt get here, but just in case
	        return match;
	    });
	}
	
	return linkify;
});