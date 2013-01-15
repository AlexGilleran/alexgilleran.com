$(document).ready(resizeScreen);
$(window).resize(resizeScreen);

function resizeScreen() {
	var mainNav = $('#left-column');
	var navHeight = mainNav.height() - 20;
	var linkSideLength = navHeight / 4 - 20;
	var mainNavWidth = linkSideLength + 40
	
	$('.link').height(linkSideLength).width(linkSideLength);
	
	
	mainNav.width(mainNavWidth);
	$('#right-column').width($('#wrapper').width() - mainNavWidth); 
}