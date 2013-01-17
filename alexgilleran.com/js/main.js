$(document).ready(resizeScreen);
$(window).resize(resizeScreen);

function resizeScreen() {
	var mainNav = $('#main-nav');
	var navHeight = mainNav.height() - 40;
	var linkSideLength = navHeight / 8 - 20;
	var mainNavWidth = linkSideLength + 40
	
	$('.link').height(linkSideLength).width(linkSideLength);
	
	mainNav.width(mainNavWidth);
	
	$('#content').height($('body').height() - 40);
}