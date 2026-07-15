jQuery(document).ready(function($) {
	$.getJSON( "https://touchsize.com/red-area/lastnews.php", function( data ) {
		var items = [];
		data['action'] = 'photoedge_save_touchsize_news';
		data['token'] = RedArea.token;
		$.post( ajaxurl, data, function(data, textStatus, xhr) {});
	});
});
