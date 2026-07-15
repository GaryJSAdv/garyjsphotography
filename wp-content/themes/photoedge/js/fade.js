/*  
	Fade slideshow
	Works with slick.js

	Params:

	@pauseOnHover = Pause slideshow on hover
	@random = Start slideshow from random index
	@minSpeed = Minimal speed to be used in fading & autoplay
	@maxSpeed = Max speed to be used in fading & autoplay
	@itemSelector = Define the lowest items node to be used in slideshow *** REQUIRED

	Init as:

	jQuery('container').fadeSlider({
		itemSelector: '.item';
	});
*/

(function($){
	$.fn.fadeSlider = function(options){

		var settings = $.extend({
			'pauseOnHover': false,
			'random': true,
			'minSpeed': 500,
			'maxSpeed': 4500,
			'itemSelector': '.item',

		}, options);

		var Element,
			_element,
			parent,
			fadeContainer;

		return this.each(function(){
			Element = jQuery(this),
			_element = this,
			parent  = Element.parent(),

			fadeContainer  = parent.find('.fade-container');

			fadeContainer.each(function(i){

				var _this = this;

				_this.theSpeed = getAutoplaySpeed();
				
				/*
					Init slick
				*/
				jQuery(_this).slick({						
					slidesToShow: 1,
					autoplay: true,
					arrows: false,
					dots:false,
					fade: true,
					autoplaySpeed: _this.theSpeed,
					speed: _this.theSpeed,
					infinite: true,
					initialSlide: randomize(),
					pauseOnHover: settings.pauseOnHover
				});

				jQuery(_this).on('afterChange', function(){
					/* Recalc autoplay speed for random fade-in-ou effect */
					_this.theSpeed = getAutoplaySpeed();							
				});
				
			});


		});
				
		function randomize(){
			if(settings.random == true) {
				var max = jQuery(Element).find(settings.itemSelector).length / fadeContainer.length;
				/*
					Count of unique items = count of all items divided by number of columns
				*/

			    return Math.floor(Math.random() * max);

			    /* 
			    	Return a random number in  ( 0  -> items ) count range
			    */
			} else {
				return 0;
			}
		}

		function getAutoplaySpeed(){
			return Math.floor(Math.random() * settings.maxSpeed) + settings.minSpeed ;
		}


	}

})(jQuery);