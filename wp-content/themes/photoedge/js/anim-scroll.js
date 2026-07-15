
/*
	MINIFY IN RELEASE

*/

/*anim-scroll.js*/
;( function( window ) {
	
	'use strict';
	
	var docElem = window.document.documentElement;
	var self;
	var scrollContainer;

	function getViewportH() {
		var client = docElem['clientHeight'],
			inner = window['innerHeight'];
		
		if( client < inner )
			return inner;
		else
			return client;
	}

	function scrollY() {
		// var _scroll = window.pageYOffset || docElem.scrollTop;
		var _scroll;

		if( jQuery.isWindow(scrollContainer) ) {
			_scroll = scrollContainer.pageYOffset;
		} else {
			_scroll = scrollContainer.scrollTop;	
		}
			
		return _scroll;

	}

	// http://stackoverflow.com/a/5598797/989439
	function getOffset( el ) {
		var offsetTop = 0, offsetLeft = 0;
		do {
			if ( !isNaN( el.offsetTop ) ) {
				offsetTop += el.offsetTop;
			}
			if ( !isNaN( el.offsetLeft ) ) {
				offsetLeft += el.offsetLeft;
			}
		} while( el = el.offsetParent )

		return {
			top : offsetTop,
			left : offsetLeft
		}
	}

	function inViewport( el, h ) {
		var elH = el.offsetHeight,
			scrolled = scrollY(),
			viewed = scrolled + getViewportH(),
			elTop = getOffset(el).top,
			elBottom = elTop + elH,
			// if 0, the element is considered in the viewport as soon as it enters.
			// if 1, the element is considered in the viewport only when it's fully inside
			// value in percentage (1 >= h >= 0)
			h = h || 0;

		return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
	}

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function AnimOnScroll( el, options ) {	
		this.el = el;
		this.options = extend( this.defaults, options );
		this._init();
	}

	AnimOnScroll.prototype = {
		defaults : {
			// Minimum and a maximum duration of the animation (random value is chosen)
			minDuration : 0,
			maxDuration : 0,
			// The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
			// if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
			// If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
			viewportFactor : 0,
			items : jQuery('.ts-gallery-animate').find('.item'),
			container: jQuery(window),
		},
		_init : function() {
			
			this.items =  this.options.items;
			this.itemsCount = this.items.length;
			this.itemsRenderedCount = 0;
			this.didScroll = false,
			this.showTimeout = 0;			
			self = this;
		
			// the items already shown...
			setTimeout(function(){
				Array.prototype.forEach.call(self.items, function( el, i ) {
					if( inViewport( el ) ) {					
						self._checkTotalRendered();
						classie.add( el, 'shown' );
					}		
				} );
			}, self.showTimeout * 2);
			/* Add 'shown' class to visible images only after images are loaded */
			// animate on scroll the items inside the viewport

			Array.prototype.forEach.call(this.options.container, function(el, i){

				scrollContainer = el; 

				el.addEventListener( 'scroll', function() {
					self._onScrollFn();
				}, false );
				el.addEventListener( 'resize', function() {
					self._resizeHandler();
				}, false );
			});


		},
		_onScrollFn : function() {
			var self = this;
			if( !this.didScroll ) {
				this.didScroll = true;
				setTimeout( function() { self._scrollPage(); }, 60 );
			}
		},
		_scrollPage : function() {
			var self = this;
			Array.prototype.forEach.call(this.items, function( el, i )
			 {
				if( !classie.has( el, 'shown' ) && !classie.has( el, 'animate' )  && inViewport( el, self.options.viewportFactor ) ) {
					setTimeout( function() {
						var perspY = scrollY() + getViewportH() / 2;

						
						self.el = jQuery(self.el);
						try{
							self.el.css({
								'-webkit-perspective-origin' :'50% ' + perspY + 'px',
								   '-moz-perspective-origin' :'50% ' + perspY + 'px',
								        'perspective-origin' :'50% ' + perspY + 'px',

							});
						} catch(e) {
							console.log(e);
						}
									
						self._checkTotalRendered();

						if( self.options.minDuration && self.options.maxDuration ) {
							var randDuration = ( Math.random() * ( self.options.maxDuration - self.options.minDuration ) + self.options.minDuration ) + 's';
							el.style.WebkitAnimationDuration = randDuration;
							   el.style.MozAnimationDuration = randDuration;
							      el.style.animationDuration = randDuration;
						}
						
						// classie.add( el, 'animate' );					
					}, 25 );		


					if( jQuery('.masonry').length ) {
						/* Repos masonry right after animation ended*/
						// jQuery('.masonry').isotope('layout');
					}
				}
			});
			this.didScroll = false;
		},
		_resizeHandler : function() {
			var self = this;
			function delayed() {
				self._scrollPage();
				self.resizeTimeout = null;
			}
			if ( this.resizeTimeout ) {
				clearTimeout( this.resizeTimeout );
			}
			this.resizeTimeout = setTimeout( delayed, 1000 );
		},
		_checkTotalRendered : function() {
			this.itemsRenderedCount++;		
			if( this.itemsRenderedCount === this.itemsCount ) {
				window.removeEventListener( 'scroll', this._onScrollFn );
			}
		}
	}
	// add to global namespace
	window.AnimOnScroll = AnimOnScroll;

} )( window );