define([
	
], function() {
	function prettyDate(date) {
		var diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400),
			week_diff = Math.ceil( day_diff / 7 );
				
		if ( isNaN(day_diff) || day_diff < 0 || week_diff >= 52 )
			return;
				
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			week_diff == 1 && week_diff + " week ago" ||
			week_diff < 52 && week_diff + " weeks ago";
	}
	
	return prettyDate;
});