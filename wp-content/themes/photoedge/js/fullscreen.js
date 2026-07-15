/*Fullscreen JS*/

(function($){

	$.fn.fullscreenGallery = function(options){
		var settings = $.extend({
			'autoplayDuration': 2000,
			'itemSelector': '.item',
			'navigateKeys': true,
			'showThumbs' :true
		}, options);

		return this.each(function(){
			var Element = this,
				items = jQuery(Element).find(settings.itemSelector),
				itemsContainer = items.parent(),
				width = jQuery(window).width(),
				height = jQuery(window).height();

			itemsContainer.each(function(){
				var _this = this;
	    		jQuery(_this).slick({
	    			slidesToShow: 1,
	    			slidesToScroll: 1,
	    			arrows: false,
	    			dots: true,
	    			autoplay: true,
	    			autoplaySpeed: settings.autoplaySpeed,
	    			fade: true,
	    			pauseOnHover: settings.autoplaySpeed,
	    			speed: 1600,
	    			accessibility: settings.navigateKeys,
	    			customPaging: function(){
	    				return '<span class="the-dot"></span>'
	    			}
	    		});	

	    		scrollToGallery();

				jQuery(this).css({
					'width': width,
					'height': height,
				});	

			});	

			function scrollToGallery(){
				jQuery('html, body').animate(
					{ 
						scrollTop: jQuery(Element).offset().top
					}, 500 
				);
			}		
		});
	}	

})(jQuery);
