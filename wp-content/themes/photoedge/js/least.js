/**
least.js Gallery
Original source: http://leastjs.com/

Launch as:

jQuery('.container').least({
	random: false,
	scrollToGallery: true,
	itemSelector: '.thumb',
	useControls: true,
});

@random 		 = Randomize thumbs
@scrollToGallery = Scroll to galery when image is open
@itemSelector 	 = Thumbs class
@useControls	 = Define if gallery will have controls or not 


Thumb must follow this structure:

<div class="thumb" data-large="http://localhost/testing/photoedge/wp-content/uploads/sites/8/2016/03/e76494ac-1236x610.jpg" data-title="e76494ac" data-index="8">
	<img src="http://localhost/testing/photoedge/wp-content/uploads/sites/8/2016/03/e76494ac-1236x610-240x150.jpg">
</div>

@data-large = Url to large image
@data-title = Title of the image
@data-index = Used to show Item Controls with same index
**/

(function($){ 
	$.fn.least = function(options) {
		var settings = $.extend({
			'random': true,
			'scrollToGallery': true,
			'HiDPI': false,
			'itemSelector': '.item',
			'useControls' : false,

		}, options);

		var Element;
		var controls;
		var index;

		return this.each(function() {

			Element = this;

			/* Open Images */
			function intipreview(object, path, caption) {
				/*var */
				var close = jQuery('<figure class="icon-close"></figure>'),
					img = jQuery('<img src="' + path + '"/>'),
					thumb = jQuery(settings.itemSelector);

				/* Load img */
				img.on('load',
					function() {
						if ( caption.length ) {
							object.html('<article>' + caption + '</article>');
						} else {
							object.html('');
						}

						object						
							.prepend(img)
							.append(close)
							.append(controls)
							.slideDown('slow');

							thumb.removeClass('load');
					}
				);
				
				/* Close Fullscreen */		
				close.on(
					'click',
					function() {
						jQuery('.least-preview').slideToggle('slow');
						thumb.removeClass('active');
					}
				);
			}

			/* Thumbnail */
			jQuery(this).find(settings.itemSelector).click(
				function(e) {
					/* var */
					var $$ = jQuery(this),
						path = $$.data('large') || $$.find('img').attr('src') ,
						/* If data-large is not defined for some reason, get thumb src and use it as path */
						preview = jQuery('.least-preview'),
						/* Gallery large image container  */
						previewImg = preview.children('img'),
						/* Preview image */

						caption = $$.attr('data-caption') || '';
						/*Preview caption*/

						if( settings.useControls ) {
							index = $$.attr('data-index') || '';

							controls = jQuery('.ts-control[data-index="' + index + '"]').clone();
						}
						/* Get controls for current item index from .ts-controls box */
						

					/* Same Image */
					if ( previewImg.length && path === previewImg.attr('src') ) {
						preview.slideToggle('slow');

						$$.toggleClass('active');
							
						return;
					}

					/* Other Image */
					if ( previewImg.length ) {

						$$.addClass('active');
						jQuery('.ts-gallery-least .thumb.active').removeClass('active');

						preview.slideUp(
							'slow',
							function() {
								intipreview(
									preview,
									path,
									caption
								);
							}
						);

					/* First Image */
					} else {
						intipreview(
							preview,
							path,
							caption
						);
					}

					/* Add Loading bar */
					$$.addClass('load active');
				}
			);
			
			/* Random Images - looked up from jquery forum */
			if(settings.random) {
				jQuery(Element).each(function(){
					var ul = jQuery(this),
						li = jQuery(settings.itemSelector);						
						li.sort(function() {
							var	temp = parseInt( Math.random()*8, null ),
								OddEven = temp%4,
								PosNeg = temp>2 ? 1 : -1;
								
								return ( OddEven*PosNeg );
						})
						.appendTo(ul);
				});
			}

			/* Scroll to Top */
			if(settings.scrollToGallery) {
				jQuery(this).find(settings.itemSelector).click(
					function(e) {
						e.preventDefault();
						jQuery('html, body').animate(
							{ 
								scrollTop: jQuery(Element).offset().top
							}, 500 
						);
					}
				);
			}

			/* Support Retina Image - Inspiration https://bensmann.no */
			if(settings.HiDPI) {
				if(window.devicePixelRatio > 1) {

					var image_thumb = thumb.find('img'),
						image_big = jQuery(thumb.data('large'));

					/* Replace images with @2x */
					for(var i = 0; i < image_thumb.length && image_big.length; i++) {
						var src = image_thumb[i].src,
							href = image_big[i].href,
							j = src.lastIndexOf('.'),
							k = href.lastIndexOf('.');

							src = src.substr(0,j) + '@2x' + src.substr(j);
							href = href.substr(0,k) + '@2x' + href.substr(k);

							image_thumb[i].src = src;
							image_big[i].href = href;
					}
				}
			}
		});
	};
})(jQuery);