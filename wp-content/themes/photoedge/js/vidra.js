 (function($) {
	'use strict';

	$.fn.ts_lazy_gallery = function(op) {
		var options = $.extend({
			auto: true, // boolean: animate automatically
			interval: 4000,
			transition: 400, // integer: time between slides transiton
			previewTransition: 500 // integer: time for animating the preview content transition
		}, op);

		var context = $(this),
			slidesContainer = context.find('.ts-slides'),
			slides = slidesContainer.find('.ts-slide'),

			thumbnailContainer = context.find('.ts-thumbnails'),
			thumbnail = thumbnailContainer.find('.ts-thumbnail'),
			scrollThumb = context.find('.ts-scrollbar .ts-thumb');


		var active = 0, // current active slide
			previousActive = 0, // previous active slide
			sliderHeight = 0,
			previewHeight = 0,
			previewVisible = 0,
			position = 0,
			transitionComplete = true,
			distBetweenPoints = 0,
			timer = null;

		// read/set the slider properties
		configure(context);

		// start change the slides automatically
		if (options.auto) {
			active++;
			timer = setTimeout(changeSlide, options.interval);
			//changeSlide();
		}

		// slide change on preview click
		thumbnail.on('click', function() {
			clearInterval(timer);
			// save the index of clicked slide
			active = $(this).index();

			// don't move the thumb if the current item is not
			// bigger then 0 otherwise move the thumb to the next point

			changeSlide();
		});

		function scrollBarThumb(position) {
			scrollThumb.animate({
				"top": position
			}, options.transition);
		}

		function changeSlide() {

			// add "active" class to current element
			thumbnail.eq(active).addClass('active').siblings().removeClass('active');

			// load the next image
			lazyLoadImage(thumbnail.eq(active + previewVisible - 2));
			lazyLoadImage(slides.eq(active + previewVisible - 2));

			// move the thumb for the first and last point on scrollbar
			if (active === thumbnail.size() - 1)
				scrollBarThumb(sliderHeight - scrollThumb.height());
			else
				scrollBarThumb((sliderHeight / thumbnail.size()) * active);

			scrollThumb.find('.ts-current').html(active + 1);

			thumbnailContainer.promise().done(function(el){

				var top = parseFloat(thumbnailContainer.css('top')),
					last = thumbnail.eq(thumbnail.length - 1).offset().top;

					// scroll down
					if( active > previousActive && active > 2 && (context.offset().top + context.height() <= last)  ) {
						position = top - previewHeight;
						// console.log( 'a' );
					}
					// scroll up
					else if( active < previousActive && active < thumbnail.length - 2 && top <= -(previewHeight / 2) ) {
						position = (active === 0) ? 0 : top + previewHeight;
						// console.log( 'az' );
					}

					thumbnailContainer.animate({
						'top': position
					}, {
						queue: true,
						duration: options.transitionDuration,
					}
				);
			});

			// animate slide change
			slidesContainer.animate({
				'margin-top': (active * sliderHeight) * -1 + 'px'
			}, options.transition);

			previousActive = active;

			if(options.auto) {
				active = ( active === slides.length - 1 ) ? 0 : active += 1;
				timer = setTimeout(changeSlide, options.interval);
			}
		}

		function configure(slider) {

			// read slider data attributes
			var height = slider.data('height'),
				previewWidth = slider.data('preview-width');

			// how many preview slides to show at a time
			previewVisible = slider.data('preview-visible');

			// set slider height
			slider.height(height);

			// set slides height the same as the slider height
			slides.height(height);

			// save the height of the slider for latter usage
			sliderHeight = height;

			// calculate the preview slides height based
			// on previewVisible and slider height
			previewHeight = sliderHeight / previewVisible;
			thumbnail.height(previewHeight);

			// set the preview container width
			thumbnail.width(previewWidth);

			// set active class for starting slide
			thumbnail.eq(active).addClass('active');

			// determine how many poinst the scrollbar should have
			// to be able to scroll all the content
			distBetweenPoints = sliderHeight / (thumbnail.size() - (previewVisible - 1));

			// load the slides that are visible and the next one
			for (var i = 0; i < previewVisible + 1; i++) {
				lazyLoadImage(thumbnail.eq(i));
				lazyLoadImage(slides.eq(i));
				thumbnail.eq(i).addClass('isLoaded');
			}
		}

		function lazyLoadImage(element) {

			if (element.hasClass('isLoaded') || typeof element === 'undefined') return true;

			var theImage = element.data('image-source');

			element.css({
				'background-image': 'url(' + theImage + ')',
				'background-size': 'cover'
			});

			element.addClass('isLoaded');
		}
	};
 }(jQuery));

jQuery(document).ready(function(){
	if( jQuery('.ts-lazy-gallery').length > 0 ){
		jQuery('.ts-lazy-gallery').ts_lazy_gallery();
	}
});