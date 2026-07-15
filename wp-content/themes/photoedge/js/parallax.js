'use strict';
function tsz_scrollfade_slider(){

	var ts_sf_sliders = jQuery('.ts-sf-slider');

	ts_sf_sliders.each(function(idx){
		var ctx 	 	= jQuery(this),
			slides 		= ctx.find('.sf-slides > li'),
			sf_controls = ctx.find('.sf-controls > li'),
			slider_cap	= ctx.find('.slider-caption');

		var active = 0,				// current active slide
			interval = 7000,		// the interval until next slide
			speed = 1000,			// the speed of transitions between slides
			prev_slide = 0,			// previous active slide
			img_total_scroll = 0,	// the total space avaible for scroll [top + bottom]
			img_to_scroll = 0,		// the space on one side [total space / 2]
			lastScroll = 0,			// current top offset of the document
			sliderOffset = 0,		// slider offset including it's height
			slider_height = 0;		// slider height

		var move = 5,
			timer = null,
			isControlClicked = false;

		jQuery(window).scroll(function(){

			// the slider is visible
			if( isElementInViewport(ctx) ) {

				// get the current active slide image
				// and current window offset
				var theImage = slides.eq(active).find('img').eq(0),
					currScroll = jQuery(window).scrollTop();

				var theImageOffset = theImage.offset().top + theImage.height();

				// the scroll is down translate image up
				if ( lastScroll < currScroll && theImageOffset > sliderOffset + move){
					img_to_scroll -= move;
				}

				// the scroll is up translate image down
				else if ( lastScroll > currScroll && img_to_scroll < (move * -1)) {
					img_to_scroll += move;
				}

				// translate the image
				theImage.css({
					'-webkit-transform': 'translateY(' + img_to_scroll + 'px)',
		            '-ms-transform': 'translateY(' + img_to_scroll + 'px)',
		            'transform': 'translateY(' + img_to_scroll + 'px)'
				});

				// change opacity of slider caption on scroll
				var targetCaption 	= slider_cap.outerHeight();
				var opacity 	= (targetCaption - window.scrollY) / targetCaption;

				if(opacity >= 0){
					slider_cap.css('opacity', opacity);
				}

				// save the current document scroll offset
				lastScroll = currScroll;
			}
		});

		jQuery(window).resize(function() {
			reloadSlide();
		});

		sf_controls.on('click', function(event) {
			event.preventDefault();
			clearInterval(timer);

			if( jQuery(this).hasClass('next') ) {
				if ( active === slides.size() - 1 )
					active = 0;
				else
					active++;
			}

			else if ( jQuery(this).hasClass('previous') ) {
				if( active === 0 )
					active = slides.size() - 1;
				else
					active--;
			}
			isControlClicked = true;
			changeSlide();
		});

		(function start(){
			slides.eq(0).addClass('active').css({'opacity': 1});
			slides.eq(0).find('.title,.sub').addClass('animated');
			reloadSlide();

			// ctx.on('mouseenter', function(){ clearInterval(timer); });
			// ctx.on('mouseleave', function(){ timer = setInterval(changeSlide, interval); });
		})();

		function reloadSlide(){
			// clear any previous timers
			clearInterval(timer);

			setHeight();

			// center verticaly the controls inside the slider
			// sf_controls.css({'top': (slider_height / 2) - 17 + 'px'});

			// center verticaly the slider caption
			slides.find('.slider-caption').css({'top': (slider_height / 2) - 100 + 'px'});

			// revert the image scroll back to default
			img_to_scroll = img_total_scroll;

			slides.eq(active).children('img').eq(0).css({
				'-webkit-transform': 'translateY(' + img_to_scroll + 'px)',
	            '-ms-transform': 'translateY(' + img_to_scroll + 'px)',
	            'transform': 'translateY(' + img_to_scroll + 'px)'
			});

			sliderOffset = ctx.offset().top + ctx.height();

			// create a new timer
			timer = setInterval( changeSlide, interval);
		}

		function changeSlide(){

			// change slide if the function was called from outside controls
			if ( !isControlClicked ) {
				// get the next slide, if it's the last one go to first
				active++;
				active %= slides.size();
			} else {
				isControlClicked = false;
				timer = setInterval(changeSlide, interval);
			}

			// revert previous slide to it's default state
			// fade out
			slides.eq(prev_slide).animate({'opacity': '0'}, speed).removeClass('active');

			// translate back the image to default state
			slides.eq(prev_slide).children('img').eq(0).css({
				'-webkit-transform': 'translateY(' + img_total_scroll + 'px)',
				'-ms-transform': 'translateY(' + img_total_scroll + 'px)',
				'transform': 'translateY(' + img_total_scroll + 'px)'
			});

			// fade in the new slide
			slides.eq(active).addClass('active').animate( {'opacity': '1'}, speed );
			slides.eq(active).find('.title,.sub').addClass('animated');


			// set previous slide to the current slide for positioning the slides z-index
			prev_slide = active;

			// revert back the avaible space for scroll on one side
			img_to_scroll = img_total_scroll;
		}

		function setHeight(){

			var _h = slides.eq(0).children('img').eq(0).height();

			img_total_scroll = ( _h / 5 ) * -1;

			slider_height = _h - Math.abs( img_total_scroll );

			ctx.height( slider_height );

			img_total_scroll /= 2;

		}

		function isElementInViewport (el) {
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();

			return ( rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) );
		}
	});
}

tsz_scrollfade_slider();
