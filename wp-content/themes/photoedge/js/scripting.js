'use strict';
// Get all localized variables

var main_color = Photoedge.main_color;
var images_loaded_active = Photoedge.ts_enable_imagesloaded;
var ts_logo_content = Photoedge.ts_logo_content;
var ts_onepage_layout = Photoedge.ts_onepage_layout;
var fbAppId = Photoedge.fbAppId;
var commentSystem = Photoedge.commentSystem;
var fbLikeBox = Photoedge.fbLikeBox;
var tszScripts = tsz_loadedscripts;
var isFancyBoxActive = false;

if (typeof ts_logo_content !== 'undefined') {
	addLogoToMenu(ts_logo_content);
}

jQuery(document).on('click', '.ts-get-calendar', function(){
	var tsYear  = jQuery(this).attr('data-year');
	var tsMonth = jQuery(this).attr('data-month');
	var classSize = 'ts-big-calendar';

	if(jQuery(this).parent().find('.ts-events-calendar').hasClass('ts-small-calendar')){
		classSize = 'ts-small-calendar';
	}

	var tsCalendar = jQuery(this).parent();
	var data = {};

	data = {
		action  : 'ts_draw_calendar',
		nonce   : Photoedge.ts_security,
		tsYear  : tsYear,
		tsMonth : tsMonth,
		size    : classSize
	};

	jQuery.post(Photoedge.ajaxurl, data, function(response) {

		if( response ) {
			jQuery(tsCalendar).html(response);
		}
	});
	return false;
});

function tsz_set_like(){
	jQuery('.touchsize-likes').off().click(function(e) {
		var link, id, postfix;
		link = jQuery(this);
		if(link.hasClass('active')) return false;

		id = jQuery(this).attr('data-id'),
		postfix = link.find('.touchsize-likes-postfix').text();

		jQuery.post(Photoedge.ajaxurl, { action:'touchsize-likes', likes_id:id, postfix:postfix }, function(data){
			link.addClass('active');
			link.html(data).attr('title','You already like this');
		});

		return false;
	});
}

if( typeof commentSystem !== 'undefined' && commentSystem == 'facebook'){
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId="+fbAppId;
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}

if( typeof fbLikeBox !== 'undefined' && fbLikeBox == 'Y'){
	(function(d, s, id) {
	  	var js, fjs = d.getElementsByTagName(s)[0];
	  	if (d.getElementById(id)) return;
	  	js = d.createElement(s); js.id = id;
	  	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
	  	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}

function setScrollContainerWidth(){

	if( jQuery(window).width() <= 992 ) {
		return false;
	}

	if( jQuery('.scroll-container').length > 0 ){
		jQuery('.scroll-container').each(function(){
			// Set this element
			var element = jQuery(this);

			// Check if grid or thumb view
			if ( element.closest('.ts-grid-view').length > 0 && jQuery(window).width() > 1024 || element.closest('.ts-thumbnail-view').length > 0 && jQuery(window).width() > 1024 ) {
				var elementParent;

				if( element.closest('.ts-grid-view').length > 0 )  {
					elementParent = element.closest('.ts-grid-view');
				} else if( element.closest('.ts-thumbnail-view').length > 0 ){
					elementParent = element.closest('.ts-thumbnail-view');
				}

				var parentWidth = jQuery(elementParent).width();

				// Set the width of the scroller.
				if ( jQuery(elementParent).hasClass('no-gutter') ) {
					jQuery(element).css('width', parentWidth);
				} else{
					jQuery(element).css('width', parentWidth + 39);
				}
			} else {
				jQuery(element).css('width', 1200);
			}
			// Check if mosaic view
			if ( jQuery(elementParent).find('.mosaic-view').length > 0 && jQuery(window).width() < 1024 ) {
				jQuery(element).css('width', 800);
			}
		});
	}else{
		return;
	}
}

function tsz_filters(){
	if( jQuery('.ts-filters-container').length > 0 ){
		// cache container
		var $container = jQuery('.ts-filters-container');
		lazyloadPlaceholder();

		// initialize isotope

		$container.isotope({
			itemSelector : '.item'
		});

		jQuery(window).on('resize', function(){
			setTimeout(function(){
				$container.isotope('layout');
			}, 400);
		});

		jQuery(".ts-filters a").click(function(){
			var selector = jQuery(this).attr("data-filter");
			$container.isotope({ filter: selector });
			return false;
		});
	}else{
		return;
	}
}

/* Article carousel */

function initCarousel() {
	jQuery('.carousel-wrapper').each(function () {
		var thisElem = jQuery(this);
		var numberOfElems = parseInt(jQuery('.carousel-container', thisElem).children().length, 10);
		var oneElemWidth;
		var numberOfColumns = [
			['col-lg-2', 6],
			['col-lg-3', 4],
			['col-lg-4', 3],
			['col-lg-6', 2],
			['col-lg-12', 1]
		];
		var curentNumberOfColumns;
		var moveMargin;
		var leftHiddenElems = 0;
		var rightHiddenElems;
		var curentMargin = 0;
		var numberOfElemsDisplayed;
		var index = 0;
		var carouselContainerWidth;
		var carouselContainerWidthPercentage;
		var elemWidth;
		var elemWidthPercentage;

		while (index < numberOfColumns.length) {
			if (jQuery('.carousel-container>div', thisElem).hasClass(numberOfColumns[index][0])) {
				curentNumberOfColumns = numberOfColumns[index][1];
				break;
			}
			index++;
		}

		elemWidth = 100 / numberOfElems;
		elemWidth = elemWidth.toFixed(4);
		elemWidthPercentage = elemWidth + '%';

		function showHideArrows(){
			if(curentNumberOfColumns >= numberOfElems){

				jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','0.4');
				jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','0.4');

			} else if(leftHiddenElems === 0){

				jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','0.4');
				jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','1');

			} else if (rightHiddenElems === 0 ){

				jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','1');
				jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','0.4');

			} else {
				jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','1');
				jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','1');
			}

			lazyloadPlaceholder();
		}

		function reinitCarousel() {

			showHideArrows();
			jQuery('.carousel-container', thisElem).css('margin-left', 0);
			leftHiddenElems = 0;
			jQuery('ul.carousel-nav > li', thisElem).unbind('click');

			if (jQuery(window).width() <= 973) {

				carouselContainerWidth = 100 * numberOfElems;
				carouselContainerWidthPercentage = carouselContainerWidth + '%';
				rightHiddenElems = numberOfElems - 1;
				moveMargin = 100;
				curentMargin = 0;

				jQuery('ul.carousel-nav > li', thisElem).unbind('click');

				jQuery('ul.carousel-nav > li', thisElem).click(function () {
					if (jQuery(this).hasClass('carousel-nav-left')) {
						if (leftHiddenElems > 0) {
							curentMargin = curentMargin + moveMargin;
							jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
							rightHiddenElems++;
							leftHiddenElems--;
						}
					} else {
						if (rightHiddenElems > 0) {
							curentMargin = curentMargin - moveMargin;
							jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
							rightHiddenElems--;
							leftHiddenElems++;
						}
					}

					// Trigger arrows color change
					showHideArrows();

					echo.render();
				});

			} else {

				while (index < numberOfColumns.length) {
					if (jQuery('.carousel-container>div', thisElem).hasClass(numberOfColumns[index][0])) {
						numberOfElemsDisplayed = numberOfColumns[index][1];
						moveMargin = 100 / numberOfElemsDisplayed;
						rightHiddenElems = numberOfElems - numberOfElemsDisplayed;
						oneElemWidth = 100 / numberOfColumns[index][1];
						break;
					}
					index++;
				}

				carouselContainerWidth = oneElemWidth * numberOfElems;
				carouselContainerWidthPercentage = carouselContainerWidth + '%';

				curentMargin = 0;

				jQuery('ul.carousel-nav > li', thisElem).click(function () {

					if (jQuery(this).hasClass('carousel-nav-left')) {
						if (leftHiddenElems > 0) {
							curentMargin = curentMargin + moveMargin + 0.00001;
							jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
							rightHiddenElems++;
							leftHiddenElems--;
						}
					} else {
						if (rightHiddenElems > 0) {
							curentMargin = curentMargin - moveMargin;
							jQuery('.carousel-container', thisElem).css('margin-left', curentMargin + '%');
							rightHiddenElems--;
							leftHiddenElems++;
						}
					}
					// Trigger arrows color change
					showHideArrows();
				});
			}

			//Set the container total width
			jQuery('.carousel-container', thisElem).width(carouselContainerWidthPercentage).css({
				'max-height': '9999px',
				'opacity': '1'
			});

			//Set width for each element
			jQuery('.carousel-container>div', thisElem).each(function () {
				jQuery(this).attr('style', 'width: ' + elemWidthPercentage + ' !important; float:left;');
			});
		}		

		reinitCarousel();

		jQuery(window).resize(function () {
			reinitCarousel();
		});
	});
}

function carouselArrowsStyles(){
	var carousel = jQuery('.carousel-wrapper');		
	var largeContainers = ['.col-lg-12', '.col-lg-11'];

	carousel.each(function(){
		var $this = jQuery(this),
			arrows = $this.find('.carousel-nav li');

		jQuery.each(largeContainers, function(k, v){

			if( jQuery(window).width() < 1300 ) {
				// If window is smaller than 1300, move arrows inside, make them bigger, abort calculations
				arrows.addClass('inner-arrows large-arrows');
				return;
			}

			if( $this.closest(v).length > 0 && !$this.closest('.ts-expanded-row').length > 0  ) {
				// 12 columns, not in expanded row, move arrows outside
				arrows.addClass('outer-arrows');
				return;

			} else if( !$this.closest(v).length > 0 ){
				// Less than 12 columns, move arrows inside
				arrows.addClass('inner-arrows');
				return;
			} else if( $this.closest(v).length > 0 && $this.closest('.ts-expanded-row').length > 0 ) {
				// 12 columns, inside expanded row, move arrows inside, make them bigger
				arrows.addClass('inner-arrows large-arrows');
				return;
			}
		});
	});

}

jQuery(window).on('load resize orientationchange', function(){
	carouselArrowsStyles();
});

function visibleBeforeAnimation(){

	jQuery('.ts-grid-view.animated, .ts-thumbnail-view.animated, .ts-big-posts.animated, .ts-list-view.animated, .ts-super-posts.animated').each(function(){
		jQuery(this).find('article').each(function(index){
			var thisElem = jQuery(this);
			if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
				thisElem.addClass('shown');
				thisElem.stop().delay(100*index).animate({opacity: 1},1000);
			}
		});
	});

	jQuery('.content-block.animated, section.animated').each(function(index){
		var thisElem = jQuery(this);
		var pixelsFromTransform = 0;
		if( thisElem.hasClass('slideup') ){
			pixelsFromTransform = 250;
		}
		if( thisElem.isOnScreen() === true ){
			thisElem.addClass('shown');
			thisElem.animate({opacity: 1},800);
		}
	});

	jQuery('.ts-counters').each(function(index){
		var thisElem = jQuery(this);
		if ( thisElem.isOnScreen() ) {
			startCounters();
		};
	});

	jQuery('.ts-horizontal-skills > li').each(function(index){
		var thisElem = jQuery(this);
		if ( thisElem.isOnScreen() ) {
			jQuery('.ts-horizontal-skills').countTo();
		};
	});

	jQuery('.ts-vertical-skills > li').each(function(index){
		var thisElem = jQuery(this);
		if ( thisElem.isOnScreen() ) {
			jQuery('.ts-vertical-skills').countTo();
		};
	});

}

function animateArticlesOnLoad(){
	var thisElem;
	// If adds fade effect to articles in grid view
	jQuery('.ts-grid-view.animated, .ts-thumbnail-view.animated, .ts-big-posts.animated, .ts-list-view.animated, .ts-super-posts.animated').each(function(){
		jQuery(this).find('article').each(function(index){
			thisElem = jQuery(this);
			if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
				thisElem.addClass("shown");
				thisElem.stop().delay(100*index).animate({opacity: 1},1200);
			}
		});
	});
}

jQuery.fn.isOnScreen = function(){

	var win = jQuery(window);

	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();

	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

function animateBlocksOnScroll(){
	var thisElem;
	jQuery(window).on('scroll',function(){
		jQuery('.content-block.animated, section.animated').each(function(index){
			var thisElem = jQuery(this);
			var pixelsFromTransform = 0;
			if( thisElem.hasClass('slideup') ){
				pixelsFromTransform = 150;
			}
			if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
				thisElem.addClass('shown');
				thisElem.stop().delay(100*index).animate({opacity: 1},1000);
			}
		});

		jQuery('.ts-counters').each(function(index){
			var thisElem = jQuery(this);
			if( !thisElem.hasClass('shown') && thisElem.isOnScreen() === true ){
				thisElem.addClass('shown');
				startCounters();
			}
		});

		jQuery('.ts-horizontal-skills > li').each(function(index){
			var thisElem = jQuery(this);
			if( !thisElem.hasClass('animated') && thisElem.isOnScreen() === true ){
				thisElem.addClass('shown');
				jQuery('.ts-horizontal-skills').countTo();
			}
		});

		jQuery('.ts-vertical-skills > li').each(function(index){
			var thisElem = jQuery(this);
			if( !thisElem.hasClass('animated') && thisElem.isOnScreen() === true ){
				thisElem.addClass('shown');
				jQuery('.ts-vertical-skills').countTo();
			}
		});

	});

}


function activateStickyMenu(){
    var menu = jQuery('#header .ts-header-menu').not('.ts-sidebar-menu').last(),
        // sticky_height = 0,
        offset = 0;

    // there are no menu on the page
    if ( menu.length < 1 ) {
        offset = 100;
        // sticky_height = 80;
        menu = jQuery('#header');
    }
    // else
    //     sticky_height = jQuery('.ts-sticky-menu ul').height();

    if( jQuery(window).scrollTop() > offset && !jQuery('.ts-sticky-menu').hasClass('active') ){
        // jQuery('.ts-sticky-menu').outerHeight(sticky_height);
        jQuery('.ts-sticky-menu').addClass('active');
    }

    jQuery(window).on('scroll',function(){

        // check if the offset of the menu has changed
        if(menu.length > 0 && offset !== menu.offset().top )
            offset = menu.offset().top;

        if( jQuery(window).scrollTop() > offset && !jQuery('.ts-sticky-menu').hasClass('active') ){
            // jQuery('.ts-sticky-menu').outerHeight(sticky_height);
            jQuery('.ts-sticky-menu').addClass('active');
        }

        if( jQuery(window).scrollTop() <= offset && jQuery('.ts-sticky-menu').hasClass('active') ) {
            jQuery('.ts-sticky-menu').removeClass('active');
            // jQuery('.ts-sticky-menu').outerHeight(0);
        }
    });
}

function startOnePageNav(){
	jQuery('.main-menu a[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  var target = jQuery(this.hash);
	  target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
	  if (target.length) {
	    jQuery('html, body').animate({
	      	scrollTop: target.offset().top
	    }, 1000);
	    return false;
	  }
	}
	});
}

// Count the share
jQuery('.share-options li').click(function(){
    var social = jQuery(this).attr('data-social');
    var postId = jQuery(this).attr('data-post-id');
    var elemClass = jQuery(this).children('a').attr('class');
    var socialCount = jQuery('.' + elemClass).find('.how-many');

    var data = {
            action      : 'ts_set_share',
            ts_security : Photoedge.ts_security,
            postId      : postId,
            social      : social
        };

    jQuery.post(Photoedge.ajaxurl, data, function(response){

        if( response && response !== '-1' ){
            jQuery(socialCount).text(response);
            jQuery('.counted').each(function(){
            	jQuery(this).text(parseInt(jQuery(this).text()) + 1);
            });
        }
    });
});

function filterButtonsRegister(){
	// Adds active class to "all" button
	jQuery('.ts-filters > li:first').addClass('active');

	// Code to change the .active class on click
	jQuery('.ts-filters > li a').click(function(e){
		e.preventDefault();

		var thisElem = jQuery(this);
		jQuery('.ts-filters > li.active').removeClass('active');
		thisElem.parent().addClass('active');
		return false;
	});
}

function resizeVideo(iframe_width, iframe_height){

	if(jQuery('.embedded_videos').length){
		jQuery('.embedded_videos iframe').each(function(){
			var iframe_width = jQuery(this).width();
			var iframe_height = jQuery(this).height();

			var iframe_proportion = iframe_width/iframe_height;

			if ( iframe_height > iframe_width){
				iframe_proportion = jQuery(this).attr('width')/jQuery(this).attr('height');
			}

			var iframe_parent_width = jQuery(this).parents('.embedded_videos').parent().width();
			jQuery(this).attr('width',iframe_parent_width);
			jQuery(this).attr('height',iframe_parent_width/iframe_proportion);
		});

		jQuery('.embedded_videos .wp-video').each(function(){
			var iframe = jQuery(this);
			var iframe_width = jQuery(this).width();
			var iframe_height = jQuery(this).height();
			var iframe_proportion = iframe_width/iframe_height;

			var iframe_parent_width = jQuery(this).parents('.embedded_videos').parent().width();

			jQuery(iframe).css('width',iframe_parent_width);
			jQuery(iframe).css('height',iframe_parent_width/iframe_proportion);
			jQuery(iframe).find('.wp-video-shortcode').css('width',iframe_parent_width);
			jQuery(iframe).find('.wp-video-shortcode').css('height',iframe_parent_width/iframe_proportion);

			setTimeout(function(){
				jQuery(window).trigger('resize');
			},400);

		});
	}
}

function twitterWidgetAnimated(){
	/*Tweets widget*/
	var delay = 4000; //millisecond delay between cycles

	function cycleThru(variable, j){
		var jmax = jQuery(variable + " li").length;
		jQuery(variable + " li:eq(" + j + ")")
			.css('display', 'block')
			.animate({opacity: 1}, 600)
			.animate({opacity: 1}, delay)
			.animate({opacity: 0}, 800, function(){
				if(j+1 === jmax){
					j=0;
				}else{
					j++;
				}
				jQuery(this).css('display', 'none').animate({opacity: 0}, 10);
				cycleThru(variable, j);
			});
	}

	jQuery('.tweets').each(function(index, val) {
		//iterate through array or object
		var parent_tweets = jQuery(val).attr('id');
		var actioner = '#' + parent_tweets + ' .ts-twitter-container.dynamic .slides_container .widget-items';
		cycleThru(actioner, 0);
	});
}

function activateFancyBox(){
	/* Fancybox must be enabled only once */
	if( isFancyBoxActive == true ) {
		return;
	}
	if( jQuery("a[rel^='fancybox']").length > 0 ){
		jQuery("a[rel^='fancybox']").fancybox({
			prevEffect  : 'none',
			nextEffect  : 'none',
			padding: 0,
			helpers : {
				title   : {
					type: 'outside'
				},
				thumbs  : {
					width   : 50,
					height  : 50
				}
			}
		});
		isFancyBoxActive = true;
	}
}

//Add logo to the center of all menu item list
function addLogoToMenu(logoContent){
	var menu_item_number = jQuery(".menu-with-logo > .main-menu > li").length;
	var middle = Math.round(menu_item_number / 2);
	jQuery(".menu-with-logo > .main-menu > li:nth-child(" + middle + ")").after(jQuery('<li class="menu-logo">'+logoContent+'</li>'));
	if (typeof logoContent !== 'undefined') {
		jQuery(".ts-sticky-menu .main-menu > li:nth-child(" + middle + ")").after(jQuery('<li class="menu-logo">'+logoContent+'</li>'));
	}
	if (jQuery("#nav").hasClass('menu-with-logo')){
		jQuery('#ts-mobile-menu').before('<div class="brand-logo">'+logoContent+'</div>');
	}
}

jQuery('#ts-mobile-menu .trigger').off().on('click touchstart', function(event){
	event.preventDefault();
	jQuery(this).parent().next().slideToggle();
	return false;	
});

jQuery(document).on('click', '#ts-mobile-menu .menu-item-has-children > a', function(event){
	event.preventDefault();
	if (jQuery(this).next().attr('class').split(' ')[0] === 'ts_is_mega_div') {
		jQuery(this).next().children().slideToggle();
	}else{
		jQuery(this).next().slideToggle();
	}
});

jQuery(document).on('click', '.ts-vertical-menu .menu-item-has-children > a', function(event){
	event.preventDefault();
	jQuery(this).parent().toggleClass('collapsed');
	jQuery(this).next().slideToggle();
});

function ExpireCookie(minutes, content) {
	var date = new Date();
	var m = minutes;
	date.setTime(date.getTime() + (m * 60 * 1000));
	jQuery.cookie(content, m, { expires: date, path:'/' });
}

/* Time calculating in seconds! [example: fb_like_modal(30)] P.S. After 30 seconds, the function will be run */
function fb_likeus_modal(ShowTime){
	if( jQuery('#fbpageModal').length > 0 ){
		var modalContainer = jQuery('#fbpageModal');
		var timeExe = ShowTime * 1000;
		var closeBtn = modalContainer.find('button[data-dismiss="modal"]');
		var cookie = jQuery.cookie('ts_fb_modal_cookie'),
			setTime = 360;

		if( cookie != setTime ){
			modalContainer.delay(timeExe).queue(function() {
				jQuery(this).hide();
				jQuery(this).modal('show'); //calling modal() function
				jQuery(this).dequeue();
			});
		}else{
			modalContainer.modal('hide');
		}
		//If you clicked on the close button, the function sends a cookie for 30 minutes which helps to not display modal at every recharge page
		closeBtn.on('click', function(){
			ExpireCookie(setTime, 'ts_fb_modal_cookie');
		});
	}else{
		return;
	}
}

/* This function aligns the vertical center elements */
function alignElementVerticalyCenter(){
	var container = jQuery('.site-section');

	jQuery(container).each(function(){
		if( jQuery(this).hasClass('ts-fullscreen-row') ){
            if ( jQuery(this).hasClass('ts-has-bg-slider') && jQuery(this).find('.flexslider .slides').length > 0 ) {
                var windowHeight = jQuery(this).find('.flexslider .slides li:first-child img').height();
                if ( windowHeight == 0 ) {
                    setTimeout(function(){
                        alignElementVerticalyCenter();
                    }, 400);
                }
            } else{
                var windowHeight = jQuery(window).height();
            }

			var containerHeight = windowHeight;
		}else{
			var windowHeight = '100%';
			var containerHeight = jQuery(this).outerHeight();
		}

		var bodyPadding = 0,
			offset = 0;
		if( jQuery('body').hasClass('border-body') ) {
			bodyPadding = jQuery('body').innerWidth() - jQuery('body').width();
			windowHeight = windowHeight - bodyPadding - offset;
		}	
		var innerContent = jQuery(this).find('.container').height();
		var insertPadding = Math.round( ( containerHeight - innerContent ) / 2 ) - bodyPadding;
		var Bottom = 0;
		if( jQuery(this).attr('data-alignment') == 'middle' && jQuery(this).hasClass('ts-fullscreen-row') ){

			jQuery(this).css({
				'padding-top':insertPadding,
				'padding-bottom':insertPadding,
				'min-height':windowHeight
			});

		}else if( jQuery(this).attr('data-alignment') == 'top' && jQuery(this).hasClass('ts-fullscreen-row') ){

			jQuery(this).css('min-height', windowHeight);

		}else if( jQuery(this).attr('data-alignment') == 'bottom' && jQuery(this).hasClass('ts-fullscreen-row') ){
			Bottom = jQuery(this).css('padding-bottom');

			jQuery(this).css({
				'width':'100%',
				'height':containerHeight,
				'position':'relative',
				'min-height':windowHeight
			});

			jQuery(this).find('.container').css({
				'width':'100%',
				'height':'100%'
			});

			jQuery(this).find('.row-align-bottom').css({
				'position':'absolute',
				'width':'100%',
				'bottom':Bottom
			});
		}
	});

	// align the elements vertically in the middle for banner box
	if( jQuery('.ts-banner-box').length > 0 ){
		jQuery('.ts-banner-box').each(function(){
			var containerHeight = jQuery(this).outerHeight();
			var innerContent = jQuery(this).find('.container').height();
			var insertPadding = Math.round((containerHeight-innerContent)/2);

			jQuery(this).css({'padding-top':insertPadding,'padding-bottom':insertPadding});
		});
	}

}

/* Keep while developing */

// function alignMegaMenu2(){
// 	setTimeout(function(){
// 		if ( jQuery('.main-menu').length > 0 ) {
// 			jQuery('.main-menu').each(function(){
// 				if( !jQuery(this).parent().hasClass('mobile_menu') ){
// 					var thisElem = jQuery(this).find('.is_mega .ts_is_mega_div');
// 					if ( jQuery(thisElem).length > 0 ) {
// 						var windowWidth = jQuery(window).width();
// 						var thisElemWidth = jQuery(thisElem).outerWidth();
// 						jQuery(thisElem).removeAttr('style');
// 						var menuOffset = jQuery(thisElem).offset().left;
// 						var result = Math.round((windowWidth-thisElemWidth)/2);

// 						var result2 = result - menuOffset;
// 						jQuery(thisElem).css('left',result2);
// 					};
// 				}
// 			});
// 		};
// 	},100);
// }

function alignMegaMenu(){
	setTimeout(function(){
		if ( jQuery('.main-menu li.is_mega').length > 0 && jQuery(window).width() > 768 ) {

			/* Create virtual container to align megamenu relatively to it. */
			var $container = jQuery('<div class="container" id="mega-menu-alignment-helper"></div>').appendTo(jQuery('body'));

			jQuery('.main-menu li.is_mega').each(function(){
				if( !jQuery(this).parent().hasClass('mobile_menu') ){

					var $this = jQuery(this),
						menu = $this.closest('.main-menu'),
						mega = $this.find('.ts_is_mega_div'),
						elemWidth = $this.outerWidth(),
						offsetGutter = 40,
						elemOffset  = $this.offset().left + offsetGutter,
						windowWidth = jQuery(window).width();					
									
					var containerOffsetLeft = Math.round( ( windowWidth - $container.outerWidth() ) / 2 ),
						containerOffsetRight = $container.outerWidth() + containerOffsetLeft;


					/* Get container left and right offset */
					if( elemOffset < containerOffsetLeft || elemOffset > containerOffsetRight  ) {
						/* Detect elements that are outside container */
						$this.css("position", "relative");
						
						if( elemOffset < containerOffsetLeft ) {
							/* if element is positioned to the left of $container */
							/* it's child mega menu should be positioned from the left  */							
							mega.css({
								'left' : '0',
								'right' : 'auto',
							});
						} else if( elemOffset > containerOffsetRight  ) {
							/* if element is positioned to the right of $container */
							/* element's child mega menu should be positioned from the right  */
							mega.css({
								'right' : '0',
								'left' : 'auto',
							});

						}
					} else {
						/* if element is positioned as 'inside' of container  */
						/* element's child mega menu should be positioned in center  */
						var result = Math.round( ( windowWidth - mega.width() ) / 2 ) - menu.offset().left;
						mega.css( 'left', result );

					}
			
				}
			});

			$container.remove();
			/* Remove virtual container after all .is_mega_div elements are aligned */
			
		};
	},200);
}

function startCounters(){

	jQuery('.ts-counters').each(function(){

		var current = jQuery(this);
		var $chart = current.find('.chart');
		var $cnvSize = (jQuery(this).data('counter-type') == 'with-track-bar') ? 160 : 'auto';
		var bar_color = current.attr('data-bar-color');
		var track_color = '#fff';

		if( bar_color == 'transparent' ) track_color = false;

		$chart.easyPieChart({
			animate: 2000,
			scaleColor: false,
			barColor: bar_color,
			trackColor: track_color,
			size: $cnvSize,
			lineWidth: 2,
			lineCap: 'square',
			onStep: function(from, to, percent) {
				jQuery(this.el).find('.percent').text(Math.round(percent)).css({
					"line-height": $cnvSize+'px',
					width: $cnvSize
				})
			}
		});

	});

}

function mosaicViewScroller(){

	//Check if mosaic view have scroll
	if( jQuery('.mosaic-view').length > 0 ){
		jQuery('.mosaic-view').each(function(){
			if(jQuery(this).attr('data-scroll') === 'true' && jQuery(window).width() > 992 ){
				jQuery(this).mCustomScrollbar({
					horizontalScroll: true,
					theme: "dark",
					scrollInertia: 75,
					advanced:{
						autoExpandHorizontalScroll:true
					},
					callbacks:{
						onScroll: function(){
							showMosaic();
						}
					}

				});
			}
		});
	}else{
		return;
	}
}

function showMosaic(){
	if( jQuery('.mosaic-view').length > 0 ){
		jQuery('.mosaic-view').each(function(){
			if(jQuery(this).hasClass('fade-effect')){
				jQuery(this).find('.scroll-container > div').each(function(index){
					var thisElem = jQuery(this);
					var parentOffset = thisElem.parent().parent().parent().parent().offset().left;
					var parentWidth = thisElem.parent().parent().parent().parent().outerWidth();

					if( !thisElem.hasClass('shown') && thisElem.offset().left < parentOffset+parentWidth ){
						thisElem.delay(index*2).animate({opacity:1},1000).addClass('shown');
					}
				});
			}
		});
	}else{
		return;
	}
}

function getFrameSize(content){

	var frame = jQuery(content),
		new_iframe_url = frame.attr('src').split('?feature=oembed'),
		videoLink = new_iframe_url[0],
		videoWidth = frame.width(),
		videoHeight = frame.height(),
		container = jQuery(".video-container").width(),
		calc = parseFloat(parseFloat(videoWidth/videoHeight).toPrecision(1)),
		frameHeight = parseInt(container/calc)

	var frameOptions = {
		iframe:frame,
		videourl:videoLink,
		iwidth:container,
		iheight:frameHeight
	}
	return frameOptions
}
function autoPlayVideo(){
	var content = jQuery('#post-video').find('iframe');
	if(content.length != 0 && content.length > 0){
		var option = getFrameSize(content);
	}

	if ( option.videourl.indexOf('youtube') >= 0 ){
		var videoid = option.videourl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)\/embed\/([^\s&]+)/);
	if(videoid == null) {
	   alert('Video [id] not available!');
	}
	}else if( option.videourl.indexOf('vimeo') >= 0 ){
		var videoid = option.videourl.match(/(?:https?:\/{2})?(?:w{3}\.)?player\.vimeo\.com\/video\/([0-9]*)/);
	if(videoid == null) {
	   alert('Video [id] not available!');
	}
	}else{
		alert('No valid video url!');
	};

	jQuery('.overimg').css("display","none");
	option.iframe.css('display','block').attr("src",option.videourl+'?autoplay=1');
}

function singleVideoResize(){
	jQuery('.video-single-resize').click(function(){
		var container = jQuery('.featured-image.video-featured-image > .container');
		var iframe = jQuery(container).find('iframe');
		var is_iframe = true;

		if( jQuery(iframe).length <= 0 ){
			iframe = jQuery(container).find('.wp-video');
			is_iframe = false;
			jQuery(iframe).animate({opacity: 0},300);
		}
		var element = jQuery(this);

		var iframe_width = jQuery(iframe).width();
		var iframe_height = jQuery(iframe).height();
		var iframe_proportion = iframe_width/iframe_height;

		setTimeout(function(){
			// If make smaller
			if ( !jQuery(container).hasClass('is-smaller') ) {
				jQuery(container).addClass('is-smaller');
				jQuery(element).removeClass('in').addClass('out');
				jQuery(element).find('i:last-child').removeClass('icon-left').addClass('icon-right');
				jQuery(element).find('i:first-child').removeClass('icon-right').addClass('icon-left');
			}
			else if( jQuery(container).hasClass('is-smaller') ){
				jQuery(container).removeClass('is-smaller');
				jQuery(element).removeClass('out').addClass('in');
				jQuery(element).find('i:first-child').removeClass('icon-left').addClass('icon-right');
				jQuery(element).find('i:last-child').removeClass('icon-right').addClass('icon-left');
			}

			var iframe_parent_width = jQuery(iframe).parents('.embedded_videos').parent().width();
			jQuery(iframe).css('width',iframe_parent_width);
			jQuery(iframe).css('height',iframe_parent_width/iframe_proportion);
			jQuery(iframe).find('.wp-video-shortcode, .mejs-layer').css('width',iframe_parent_width);
			jQuery(iframe).find('.wp-video-shortcode, .mejs-layer').css('height',iframe_parent_width/iframe_proportion);
			jQuery(iframe).find('.mejs-time-rail').css('width',iframe_parent_width);
		},400);

		setTimeout(function(){
			jQuery(window).trigger('resize');
			jQuery(iframe).animate({opacity: 1},150);
		},700);

		return false;
	});
}


function tsz_video_view(){
	jQuery("li.has-submenu[role='item']").on("click", function (e){
		e.preventDefault();
		jQuery(this).toggleClass('openned');
	});

	if( jQuery(".scroll-view").length > 0 ){
	    jQuery(".scroll-view").mCustomScrollbar({
	        horizontalScroll:true,
	        theme:"dark",
	        scrollInertia:75,
	        advanced:{
	            autoExpandHorizontalScroll:true
	        }, 
	        callbacks:{
	        	onScroll: function(){
	        		lazyloadPlaceholder();
	        	}
	        }
	    });
	}

	//Check if mosaic view have scroll
	if( jQuery('.mosaic-view').length > 0 ){
		jQuery('.mosaic-view').each(function(){
			if(jQuery(this).attr('data-scroll') === 'true' && jQuery(window).width() > 992 ){
				jQuery(this).mCustomScrollbar({
					horizontalScroll:true,
					theme:"dark",
					scrollInertia:75,
					advanced:{
						autoExpandHorizontalScroll:true
					},
					callbacks:{
						onScroll: function(){
							showMosaic();
						}
					}

				});
			}
		});
	}
}

/* ***
* Count down element
*/
function tsz_count_down_element() {
	// find all the countdown on the page

	var countdowns = jQuery('.ts-countdown');

	countdowns.each(function(index) {
		// save contect
		var ctx = jQuery(this);

		// get date and time
		var countdown_data = ctx.find('.time-remaining'),
			date = countdown_data.data('date'),
			time = countdown_data.data('time');

		// get dom elements of the countdown
		var $days = ctx.find('.ts-days'),
			$hours = ctx.find('.ts-hours'),
			$minutes = ctx.find('.ts-minutes'),
			$seconds = ctx.find('.ts-seconds');

		// start the countdown
		var days, hours, minutes, seconds, sec_remaining, date_diff;

		start_countdown();

		function start_countdown(){
			var curr_date = new Date(),
				event_date = new Date(date + ' ' + time);

			if ( curr_date > event_date ) {
				ctx.remove();
				return;
			}

			date_diff =  Math.abs(Math.floor( (event_date - curr_date) / 1000));

			days = Math.floor( date_diff / (24*60*60) );
			sec_remaining = date_diff - days * 24*60*60;

			hours = Math.floor( sec_remaining / (60*60) );
			sec_remaining = sec_remaining - hours * 60*60;

			minutes = Math.floor( sec_remaining / (60) );
			sec_remaining = sec_remaining - minutes * 60;

			$days.text( days );
			$hours.text( hours );
			$minutes.text( minutes );
			$seconds.text( sec_remaining );

			setTimeout(start_countdown, 1000);
		}
	});
}

function tsz_fullscreen_scroll_btn(){
	var container = jQuery('.site-section'),
		scroll = jQuery('.site-section').attr('data-scroll-btn');

	if ( scroll === 'yes' ) {
		container.find('.ts-scroll-down-btn > a').on('click', function(e){
			e.preventDefault();

			jQuery('html, body').animate({

				scrollTop: jQuery(this).parents('.site-section').outerHeight()

			}, 1000)
		})
	};
}


/* ******************************* */
/*          Video Carousel         */
/* ******************************* */

(function($) {
	$.fn.ts_video_carousel = function(options) {
		var ts_slider_options = $.extend({
			transition: 700
		}, options);

		var $context = $(this),
			$slides = $(this).find('.slides'),
			$slide = $slides.children('li'),
			$nav_arrows = null;

		var viewport = $(window).width(),
			slide_width = $slide.eq(0).outerWidth(true),
			current = 0,
			ts_delay = null;

		// get the height of the slide thumb ( afte the iframe has been resized )
		$(window).on('load', function(){
			if ( $nav_arrows !== null){
				$nav_arrows.css({ 'height': $slide.find('.thumb').height() });
			}
		});

		$(window).resize(function(){
			// delay the calculation of the viewport on resize
			if ( ts_delay !== null ){
				clearTimeout(ts_delay);
			}

			ts_delay = setTimeout(function(){
				viewport = $(window).width();
				if ( $nav_arrows !== null){
					$nav_arrows.css({ 'height': $slide.find('.thumb').height() });
				}
				tsz_setWidths();
			}, 400);
		});

		// create navigations
		(function tsz_createElements(){
			var navigations =  '<div class="nav-arrow prev"><span class="nav-icon icon-left-arrow"></span></div>\
								<div class="nav-arrow next"><span class="nav-icon icon-right-arrow"></span></div>';
			$slides.after(navigations);
		})();

		// set initial states for slider elements
		(function tsz_video_slider_init(){
			$slides.width( slide_width * $slide.size() );
			$slide.eq(0).addClass('current-active');
			$nav_arrows = $context.find('.nav-arrow');
			$nav_arrows.eq(0).addClass('fade-me');
			tsz_setWidths();
		})();

		function tsz_setWidths(){
			if ( viewport < slide_width ) {
				$slide.width( viewport );
				slide_width = viewport;

				$slide.css( {
					'left': slide_width * current * -1
				});
			} else {
				$slide.removeAttr('style');
				slide_width = $slide.width();

				$slide.css( {
					'left': slide_width * current * -1
				});
			}

			if ( viewport < $context.parent('.ts-video-slider-wrap').width() ) {
				$context.parent('.ts-video-slider-wrap').width(viewport);
			} else {
				$context.parent('.ts-video-slider-wrap').removeAttr('style');
			}
		};

		$slide.on( 'click', function(){
			if ( $(this).index() < current ){
				$slide.eq(current).removeClass('current-active');
				current--;

			} else if( $(this).index() > current) {
				$slide.eq(current).removeClass('current-active');
				current++;
			}
			tsz_changeSlide()
		});

		$nav_arrows.on('click', function(){
			if ( $(this).hasClass('next') ) {
				if ( current !== $slide.size() - 1) {
					$slide.eq(current).removeClass('current-active');
					current++;
					$nav_arrows.eq(0).removeClass('fade-me');
					tsz_changeSlide();
				}
				if ( $nav_arrows.eq(0).hasClass('fade-me') ){
					$nav_arrows.eq(0).removeClass('fade-me');
				}
			}
			else if( $(this).hasClass('prev') ){
				if ( parseFloat($slide.eq(0).css('left').replace( 'px', '')) < 0 && current > 0 ) {
					$slide.eq(current).removeClass('current-active');
					current--;
					tsz_changeSlide();
				}

				if ( $nav_arrows.eq(1).hasClass('fade-me') ){
					$nav_arrows.eq(1).removeClass('fade-me');
				}
			}
		});

		function tsz_changeSlide(){
			$slide.animate({
				'left': ( slide_width ) * current * -1
			}, {
				duration: ts_slider_options.transition,
				complete: function() {
					$slide.eq(current).addClass('current-active');
				}
			});

			if ( current === 0){
				$nav_arrows.eq(0).addClass('fade-me');
			}
			else if( current === $slide.size() - 1){
				$nav_arrows.eq(1).addClass('fade-me');
			}
		}
	}
})(jQuery);

function tsz_scroll_top(){
	var scrollBottom = 30;
	if ( jQuery('body').hasClass('border-body') ) {
		scrollBottom = 65;
	}
	jQuery(window).scroll(function() {
		if(jQuery(this).scrollTop() > 200){
			jQuery('#ts-back-to-top').stop().animate({
				bottom: scrollBottom
			}, 500);
		}else{
			jQuery('#ts-back-to-top').stop().animate({
			   bottom: '-100px'
			}, 500);
		}
	});
	jQuery('#ts-back-to-top').on('click',function() {
		jQuery('html, body').stop().animate({
		   scrollTop: 0
		}, 500, function() {
			jQuery('#ts-back-to-top').stop().animate({
				bottom: '-100px'
			}, 500);
		});
	});
}

// Detect device
function isMobile() {
	try{ document.createEvent("TouchEvent"); return true; }
	catch(e){ return false; }
}

jQuery(document).ready(function($){

/* document ready events */	
	tsz_views_sharing();	
	// tsz_gallery();
	jQuery(document).on('click', '.ts-item-tab', function (e) {
	    e.preventDefault();

	    var id = jQuery(this).find('a').attr('href'),
	        parent = jQuery(this).closest('.ts-tab-container');

	    parent.find('.active').removeClass('active');

	    jQuery(this).addClass('active');

	    jQuery(id).addClass('active');

	});

   if( jQuery('.ts-post-sharing').closest('.ts-article-view ').length == 0 ) { 
   		jQuery('.ts-post-sharing li').removeClass('ts-collapsed');
   }

   jQuery('.ts_instagram_widget [data-url]').click(function(){
   		var embed_url = jQuery(this).data('url');

   		var data = {
   			action: 'photoedge-instagram-embed',
   			the_url: embed_url,
   		}

   		jQuery.ajax({
   			type: 'POST',
   			cache: false,
   			data: data,
   			url: Photoedge.ajaxurl,
   			success: function(data){
   				jQuery.fancybox(data, {
   					padding: 0,
   				});
   			}
   		});
   });

	if ( jQuery('.ts-instance-container').length > 0 ){
		resizeInstance();
	}
	if ( jQuery('.ts-post-boca').length > 0 ) {
		jQuery('.ts-post-boca').each(function(){
			var $slider = jQuery(this).find('.boca-slides');

			$slider.slick({
				arrows: true,
		        infinite: false,
		        draggable:false,
				prevArrow: $slider.find('.customNavigation .ar-left'),
				nextArrow: $slider.find('.customNavigation .ar-right'),
				responsive: [
				 		{
				 			breakpoint: 992,
				 			settings: {
				 			draggable: true }
				 		},
				 		{
				 			breakpoint: 768,
				 			settings: {
							draggable: true }
				 		},
				 		{
				 			breakpoint:480,
				 			settings: {
				 			draggable: true }
				 		}
				 	]
			});

		});
	}


    /* Grease slider */
	if( jQuery('.ts-grease-slider').length > 0 ) {

		var arrows = '<ul class="grease-arrows"><li class="left"><span class="icon-left-arrow"></span></li><li class="right"><span class="icon-right-arrow"></span></li></ul>';
		jQuery('.ts-grease-slider').append(arrows);

		jQuery('.ts-grease-slider .grease-items').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			focusOnSelect: true,
			infinite: false,
			arrows: true,
			dots: false,
			draggable : true,
			responsive: [
				{
					breakpoint: 770,
					settings: {
						slidesToShow: 1,
						draggable: true,
					}
				},
			],
			nextArrow: jQuery('.ts-grease-slider .grease-arrows .right'),
			prevArrow: jQuery('.ts-grease-slider .grease-arrows .left'),
		});

	}

	/* Elastic slider */

	if( jQuery('.ts-elastic-slider').length > 0 ) {
		jQuery('.ts-elastic-slider .elastic-items').each(function(){
			var elasticSlider = new ElasticSlideshow(this, {
				itemSelector: '.slide',
			});

		});
	}


	if ( jQuery('.ts-post-nona').length > 0 ) {

		jQuery('.ts-post-nona').each(function(){
			var $this = jQuery(this),
				slider = $this.find('.ts-nona-slides'),
				slideNav = $this.find('.ts-slide-nav');

		     slider.slick({
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        arrows: false,
		        speed: 500,
		        fade: true,
		        cssEase: 'linear',
		        draggable:false,
		        adaptiveHeight:true,
		    });

		    slideNav.slick({
		        slidesToShow: 4,
		        slidesToScroll: 1,
		        dots: false,
		        infinite:false,
		        centerMode: false,
		        lazyLoad: 'ondemand',
		        arrows:false,
		        responsive: [
		             {
		                 breakpoint: 1200,
		                 settings: {
		                 arrows: false,
		                 slidesToShow: 3 }
		             },
		             {
		                 breakpoint: 992,
		                 settings: {
		                 arrows: false,
		                 slidesToShow: 2 }
		             },
		             {
		                 breakpoint: 768,
		                 settings: {
		                 arrows: false,
		                 slidesToShow: 2 }
		             },
		             {
		                 breakpoint:480,
		                 settings: {
		                 arrows: false,
		                 slidesToShow: 2 }
		             }
		         ]
		    });	


	    slideNav.find('.nona-nav').on('click', function () {
	        var index = jQuery(this).data('slick-index');
	           jQuery(this).parents('.ts-slide-nav').prev().slick('slickGoTo', index);
	    });
	    slideNav.find('.nona-nav').click(function(){
			var _this = jQuery(this),
				index = _this.index();

			slideNav.find('.ts-nav-active').removeClass('ts-nav-active');
			slideNav.find('.nona-nav').eq(index).addClass('ts-nav-active');
		});		    	     

		});
	}

	if( Photoedge.animsitionIn !== 'none' || Photoedge.animsitionOut !== 'none' ){
		jQuery(".animsition").animsition({
			inClass     :   Photoedge.animsitionIn,
			outClass    :   Photoedge.animsitionOut,
			linkElement :   '.main-menu a, .ts-user-profile-dw a, .ts-big-posts a, .ts-grid-view a, .ts-list-view a, .ts-thumbnail-view a, .ts-big-posts a, .ts-super-posts a, .ts-timeline-view a, .mosaic-view a, .ts-small-news:not(.ts-featured-area-small) a, .ts-image-element a, .ts-icon-box a, .ts-listed-features a, .featured-area-tabs .entry-content a, .ts-banner-box a, .testimonials a, .ts-ribbon-banner a, .ts-video-carousel a, .ts-powerlink a, .ts-article-accordion .inner-content a, .ts-list-users a, .ts-animsition a, .ts-pricing-view a, .teams a, .block-title a, .featured-area-content a, .ts-breadcrumbs a, .ts-featured-article a, .logo, .video-single-section a, .post-video-content a'
		});
	}

	if( jQuery(".ts-map-create").length > 0 ){
		google.maps.event.addDomListener(window, "load", initialize);
	}

	if( Photoedge.rightClick == 'y' ){
		jQuery(document).on('contextmenu', function(e){
			return false;
		});
	}

	tsz_scroll_top();
	//Count To
	$.fn.countTo = function() {

		var element = this;

		function execute() {

			element.each(function(){

				var item = $(this).find('.countTo-item');

				item.each(function(){

					var current = $(this),
						percent = current.find('.skill-level').attr('data-percent');

					if ( !current.hasClass('animated') ) {
						current.find('.skill-title').css({'color' : 'inherit'});
						if( element.hasClass('ts-horizontal-skills') ){
							current.find('.skill-level').animate({'width' : percent+'%'}, 800);
						} else {
							current.find('.skill-level').animate({'height' : percent+'%'}, 800);
						}
						current.addClass('animated');
					}

					if ( current.hasClass('animated') && element.attr('data-percentage') == 'true' && current.find('.percent').length < 1 ) {
						current.append('<span class="percent">'+percent+'%'+'</span>');
						current.find('.percent').css({'left' : percent+'%'}).delay(1600).fadeIn();
					};

					if ( percent == 100 ) {
						item.addClass('full');
					};

				})

			})

		}

		execute();

		return this;
	};

	jQuery('.toggle_title').click(function () {
		jQuery(this).next().slideToggle('fast');
		jQuery(this).find('.toggler').toggleClass('toggled');
	});


	if(jQuery('#post-video').find('iframe').length > 0){
		var option = getFrameSize('#post-video iframe');
	}

	jQuery("body").keydown(function (e) {

		if(e.which == 27){
			jQuery("#searchbox .search-close").parent().removeClass('active');
		}
	})

	jQuery('.single .post-rating .rating-items > li').each(function(){
		var bar_width = jQuery(this).find('.bar-progress').data('bar-size');

		jQuery(this).find('.bar-progress').css({width: bar_width+'%'});
	})

	// Gallery overlay sharing
	jQuery('.overlay-effect .entry-controls .share-box .share-link').on('click', function(e){
		e.preventDefault();
		jQuery(this).toggleClass('shown');
	})

	$('.ts-vertical-menu').find('.menu-item-has-children').each(function(){
		var url_link = $(this).children('a').attr('href');
		$(this).children('a').attr('href','#');
		$(this).append('<span class="menu-item-url-link"><a href="'+url_link+'" title="View page"><i class="icon-link"></i></a></span>')
	});

	$('.menu-item-type-taxonomy').each(function(){
		if($(this).find('.ts_is_mega_div').length !== 0){
			$(this).addClass('menu-item-has-children is_mega');
		}
	})

	function tsz_ajax_load_more(){

		$('.ts-pagination-more').click(function(){
			var loop            = parseInt( $(this).attr('data-loop') );
			var args            = $(this).attr('data-args');
			var paginationNonce = $(this).find('input[type="hidden"]').val();
			var loadmoreButton  = $(this);
			var $container      = $(this).prev();

			// Show preloader
			if( jQuery('.ts-infinite-scroll').length > 0 ){
				jQuery('#ts-loading-preload').addClass('shown');
			}

			jQuery('#ts-loading-preload').loadmoreButton({
				prepend: true,
			});

			loadmoreButton.attr('data-loop', loop + 1);

			jQuery.post(Photoedge.ajaxurl, {
					action         : 'ts_pagination',
					args           : args,
					paginationNonce: paginationNonce,
					loop           : loop
				},  function(data){
						if( data !== '0' ){
							if( $container.hasClass('ts-filters-container') ){;

								var data_content = $(data).hide().appendTo($container).fadeIn(500);
								lazyloadPlaceholder();
								$container.isotope('appended', $(data_content));
								setTimeout(function(){
									lazyloadPlaceholder();
									$container.isotope('layout');
								},1200);
							}else{
								$(data).hide().appendTo($container).fadeIn(500);
							}

							loadmoreButton.data('loadmoreButton').removeLoader();

							/* Functions that need reloading after loading new posts */

							lazyloadPlaceholder();

							tsz_views_sharing();

							tsz_set_like();

							tsz_open_side_content();

						}else{
							loadmoreButton.remove();
						}
						// Hide the preloader
						setTimeout(function(){
							$('#ts-loading-preload').removeClass('shown');
						},800);
					}
			);
			
			jQuery(this).loadmoreButton();

		});
	}
	tsz_ajax_load_more();

	function tsz_send_date_ajax(id){

		$(document).on('click', '.contact-form-submit', function(event) {
			event.preventDefault();
			jQuery(this).attr('disabled','disabled');
			var form         = $(this).closest('form'),
				name         = form.find('.contact-form-name'),
				email        = form.find('.contact-form-email'),
				subject      = form.find('.contact-form-subject'),
				message      = form.find('.contact-form-text'),
				emailRegEx   = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				errors       = 0,
				custom_field = form.find('.ts_contact_custom_field'),
				data         = {},
				this_element = jQuery(this);

			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g,"");
			};

			if ( emailRegEx.test(email.val()) ) {
				email.removeClass('invalid');
			} else {
				email.addClass('invalid');
				errors = errors + 1;
			}

			jQuery(custom_field).each(function(i,val){
				if(jQuery(this).hasClass('contact-form-require')){
					if (jQuery(this).val().trim() !== '') {
						jQuery(this).removeClass('invalid');
					} else {
						jQuery(this).addClass('invalid');
						errors = errors + 1;
					}
				}
			});

			if (name.val().trim() !== '') {
				name.removeClass('invalid');
			} else {
				name.addClass('invalid');
				errors = errors + 1;
			}


			if ( subject.length !== 0 ) {
				if (subject.val().trim() !== '') {
					subject.removeClass('invalid');
				} else {
					subject.addClass('invalid');
					errors = errors + 1;
				}
			}

			if (message.val().trim() !== '') {
				message.removeClass('invalid');
			} else {
				message.addClass('invalid');
				errors = errors + 1;
			}

			if ( errors === 0 ) {

				data['action']  = 'photoedge_contact_me';
				data['token']   = Photoedge.contact_form_token;
				data['name']    = name.val().trim();
				data['from']    = email.val().trim();
				data['subject'] = (subject.length) ? subject.val().trim() : '';
				data['message'] = message.val().trim();
				data['custom_field'] = new Array();

				jQuery(custom_field).each(function(i,val){
					var title = jQuery(this).next().val();
					var value = jQuery(this).val();
					var require = jQuery(this).next().next().val();
					var new_item = {value : value, title: title, require: require};
					data['custom_field'].push(new_item);
				});

				$.post(Photoedge.ajaxurl, data, function(data, textStatus, xhr) {
					form.find('.contact-form-messages').html('');
					if ( data !== '-1' ) {
						if ( data.status === 'ok' ) {
							form.find('.contact-form-messages').removeClass("hidden").html(Photoedge.contact_form_success).addClass('success');
							jQuery(this_element).attr('disabled', 'disabled');
							form.find("input, textarea").not(".contact-form-submit").val('');
						} else {
							form.find('.contact-form-messages').removeClass("hidden").html('<div class="invalid">' + data.message + '</div>');
							$(clickElement).removeAttr('disabled');
						}

						if ( typeof data.token !== "undefined" ) {
							Photoedge.contact_form_error = data.token;
						}

					} else {
						form.addClass('hidden');
						form.find('.contact-form-messages').html(Photoedge.contact_form_error);
						$(clickElement).removeAttr('disabled');
					}
				});
			}
		});
	}
	tsz_send_date_ajax();


	jQuery('.ts-select-by-category li').click(function(){

		var idCategory = jQuery(this).attr('data-category-li');

		lazyloadPlaceholder();

		jQuery('.ts-select-by-category li').each(function(){
			if( jQuery(this).hasClass('active') ){
				jQuery(this).removeClass('active');
			}
		})

		jQuery(this).addClass('active');

		jQuery(this).closest('section').find('.ts-tabbed-category').each(function(){
			jQuery(this).css('display', 'none').removeClass('shown');
		});

		jQuery(this).closest('section').find('.ts-tabbed-category').each(function(){
			var categories = jQuery(this).attr('data-category').split('\\');
			for(var category in categories){
				if( idCategory == categories[category] ){
					var thisHtml = jQuery(this).css('display', '').get(0).outerHTML;
					jQuery('[data-category-div="' + idCategory + '"]').find('.ts-cat-row').append(thisHtml);
					jQuery(this).remove();
				}
			}
		});
	});

	if( jQuery('.ts-video-fancybox').length > 0 ){
		jQuery('.ts-video-fancybox').fancybox({
			maxWidth    : 800,
			maxHeight   : 600,
			fitToView   : false,
			width       : '70%',
			height      : '70%',
			autoSize    : false,
			closeClick  : false,
			openEffect  : 'none',
			closeEffect : 'none'
		});
	}

	

	if( jQuery('img.lazy').length > 0 ){
		lazyloadPlaceholder();
	}
/***************************
	end document ready events
***************************/
});

var map, mapAddress, latlng, mapLat, mapLng, mapType, mapStyle, mapZoom,
	mapTypeCtrl, mapZoomCtrl, mapScaleCtrl, mapScroll, mapDraggable, mapMarker;
var style = '';

	var infinite_loading = false;
	jQuery(window).on('scroll',function() {
		jQuery(".ts-infinite-scroll").each(function(){
			var thisElem = jQuery(this);
			if( thisElem.prev().offset().top + thisElem.parent().height() - 120 < jQuery(window).scrollTop() + jQuery(window).height() && infinite_loading == false ){

				infinite_loading = true;
				jQuery(thisElem).trigger("click");
				setTimeout(function(){
					infinite_loading = false;
				}, 1000)
			}
		});
	});

function tsz_views_sharing(){
   jQuery('.ts-article-view .ts-sharing .toggle-sharing').off().click(function() {
    	var lis = jQuery(this).closest('.ts-article-view').find('.ts-post-sharing li');
    	jQuery(lis).each(function(i){
		    var t = jQuery(this);
		    t.toggleClass('ts-collapsed');
		});
   });	
}

function tsz_select_post_by_category(){
	jQuery('.ts-select-by-category li:first-child').each(function(){
		jQuery(this).trigger('click');
		lazyloadPlaceholder();
	});
}

function initialize(){
	jQuery('.ts-map-create').each(function(){
		var element = jQuery(this);
		mapAddress = jQuery(element).attr('data-address');
		mapLat = jQuery(element).attr('data-lat');
		mapLng = jQuery(element).attr('data-lng');
		mapStyle = jQuery(element).attr('data-style');
		mapZoom = jQuery(element).attr('data-zoom');
		mapTypeCtrl = (jQuery(element).attr('data-type-ctrl') === 'true') ? true : false;
		mapZoomCtrl = (jQuery(element).attr('data-zoom-ctrl') === 'true') ? true : false;
		mapScaleCtrl = (jQuery(element).attr('data-scale-ctrl') === 'true') ? true : false;
		mapScroll = (jQuery(element).attr('data-scroll') === 'true') ? true : false;
		mapDraggable = (jQuery(element).attr('data-draggable') === 'true') ? true : false;
		mapMarker = jQuery(element).attr('data-marker');

		if( jQuery(element).attr('data-type') === 'ROADMAP' )
			mapType = google.maps.MapTypeId.ROADMAP
		else if( jQuery(element).attr('data-type') === 'HYBRID' )
			mapType = google.maps.MapTypeId.HYBRID
		else if( jQuery(element).attr('data-type') === 'SATELLITE' )
			mapType = google.maps.MapTypeId.SATELLITE
		else if( jQuery(element).attr('data-type') === 'TERRAIN' )
			mapType = google.maps.MapTypeId.TERRAIN
		else
			mapType = google.maps.MapTypeId.ROADMAP

		// How you would like to style the map.
		// This is where you would paste any style found on Snazzy Maps.
		if ( mapStyle === 'map-style-essence' ){
			style = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}]

		} else if( mapStyle === 'map-style-subtle-grayscale' ){
			style = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]

		} else if( mapStyle === 'map-style-shades-of-grey' ){
			style = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}]

		} else if( mapStyle === 'map-style-purple' ){
			style = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#bc00ff"},{"saturation":"0"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e8b8f9"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#3e114e"},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#a02aca"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#2e093b"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"color":"#9e1010"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#58176e"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#d180ee"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#a02aca"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#cc81e7"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"},{"hue":"#bc00ff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#6d2388"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#c46ce3"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b7918f"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#280b33"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]}];

		} else if( mapStyle === 'map-style-best-ski-pros' ){
			style = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2c3645"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#dcdcdc"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#476653"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#93d09e"}]},{"featureType":"landscape.natural.terrain","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#0d6f32"}]},{"featureType":"landscape.natural.terrain","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#62bf85"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#95c4a7"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#334767"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#334767"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b7b7b7"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"on"},{"color":"#364a6a"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#535353"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#3fc672"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#4d6489"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}]

		} else {
			style = '';
		}

		latlng = new google.maps.LatLng(mapLat, mapLng);

		var mapOptions = {
			zoom: parseInt(mapZoom),
			center: latlng,
			styles: style,
			zoomControl: mapZoomCtrl,
			scaleControl: mapScaleCtrl,
			mapTypeControl: mapTypeCtrl,
			scrollwheel: mapScroll,
			draggable: mapDraggable,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			},
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			mapTypeId: mapType
		}
		var idElement = jQuery(element).attr('id');

		map = new google.maps.Map(document.getElementById(idElement), mapOptions);

		var marker = new google.maps.Marker({
			map: map,
			icon: mapMarker,
			position: latlng,
			title: mapAddress
		});
	});
}

jQuery(window).on('resize orientationchange', function(){
	mosaicViewScroller();
});

 //Running functions on page load
jQuery(window).on('load resize orientationchange', function(){
	alignMegaMenu();
	setScrollContainerWidth();
});


jQuery(window).on('load', function(){
// window load events	
	/* Init masonry for product view*/
	if( jQuery('img.ts-lazy').length ) {
		jQuery('img.ts-lazy').lazyload({
			effect: 'fadeIn',
			effectSpeed: 600,
			skip_invisible: false,
			failure_limit: Math.max(jQuery('img.ts-lazy').length -1, 0),
			load: function(){
				var $this = jQuery(this);
				$this.parent().addClass('was-loaded');
				$this.removeClass('ts-lazy').addClass('ts-lazyloaded');
				$this.closest('figure').css({"min-height": jQuery(this).height()});
				$this.closest('.masonry').isotope({
					itemSelector: '.item',
				});
				// $this.closest('.masonry').isotope('reloadItems');			
				// $this.closest('.masonry').isotope('layout');			
			}
		});
	}

	tsz_fullscreenMenu();

	// Featured area
	if( jQuery('.ts-featured-area').length > 0 ) {
		
		jQuery('.ts-featured-area').each(function(){
			var $this = jQuery(this),
				thumbsContainer = $this.find('.ts-featured-thumbs .row');

			$this.find('.featured-thumb').appendTo(thumbsContainer);
		});
	}

    /* Grid galelry masonry */
    if( jQuery('.ts-gallery-grid').length > 0 ){ 
    	jQuery('.ts-gallery-grid .inner-gallery-container.masonry').each(function(){
    		var $this = jQuery(this);
    		setTimeout(function(){
				$this.isotope({
					itemSelector: '.item',
				});	    			
    		}, 0);
		
    	});    	
    }

	if ( jQuery('.woocommerce .ts-filters-container').length > 0 ) {
		jQuery('.woocommerce .ts-filters-container').isotope({
			itemSelector: '.masonry-element',
		})			
	}

	tsz_appendElementToNavbar();

	// Open cart element on click
	jQuery('.gbtr_dynamic_shopping_bag .overview').each(function(){
		jQuery(this).click(function(){
		    jQuery(this).closest('.gbtr_dynamic_shopping_bag').find('.gbtr_minicart_wrapper').toggleClass('visible');
		});
	});
	jQuery('.gbtr_dynamic_shopping_bag .ts-cart-close').each(function(){
		jQuery(this).click(function(){
		    if(jQuery(this).closest('.gbtr_dynamic_shopping_bag').find('.gbtr_minicart_wrapper').hasClass('visible')){
		        jQuery(this).closest('.gbtr_dynamic_shopping_bag').find('.gbtr_minicart_wrapper').removeClass('visible');
		    }
		});
	})

	jQuery('#searchbox .search-trigger').each(function(){
		jQuery(this).on('click', function(e){
			e.preventDefault();
			jQuery(this).next().addClass('active');

			if( jQuery(this).parents('.ts-fullscreen-menu').length ) {
				jQuery(this).parents('.ts-fullscreen-menu').find('> .trigger-menu.fs-menu').hide();
			}
		});
	});

	jQuery('#searchbox .search-close').on('click', function(e){
		e.preventDefault();
		jQuery(this).parent().removeClass('active');
		if( jQuery(this).parents('.ts-fullscreen-menu').length ) {
			jQuery(this).parents('.ts-fullscreen-menu').find('> .trigger-menu.fs-menu').show();
		}		
	});

	if( jQuery('.single-product #product-slider').length > 0 ) {
		setTimeout(function(){
			var thumbs = jQuery('.single-product .flex-control-thumbs');
			var thumbsHeight = thumbs.innerHeight();
			var topArrow = jQuery('.single-product .flex-direction-nav .flex-prev');
			var _offset = 15;
			var topArrowPos = thumbs.position().top - (topArrow.height() / 2) - _offset;
			var bottomArrow = jQuery('.single-product .flex-direction-nav .flex-next');
			var bottomArrowPos = thumbs.position().top + thumbsHeight + bottomArrow.height() - _offset;
			var _thumbsCount = thumbs.find('li').length;
			if( _thumbsCount < 4 ){
				var _bottomstyle = thumbs.position().top +  (thumbs.find('li').height() * _thumbsCount + bottomArrow.height());
				console.log(_bottomstyle);
				topArrow.css({top: topArrowPos + _offset});
				bottomArrow.css({'top': _bottomstyle});
			} else {
				topArrow.css({top: topArrowPos});
				bottomArrow.css({top: bottomArrowPos});
			}
		}, 1000);
	}

    if ( jQuery('.ts-vertical-gallery').length > 0 ) {
        jQuery('.ts-vertical-gallery').find('.item-gallery').each(function(){
        	var timeout = 0;
        	if( jQuery(this).find('img.lazy').length ) {
        		timeout = 600;
        	}
        	setTimeout(function(){
	            var thisElem = jQuery(this),
	                galleryContainer = thisElem.closest('.inner-gallery-container'),
	                galleryPager = galleryContainer.find('.ts-gallery-pager'),
	                thisHeight = thisElem.height();

	            thisElem.parent().height(thisHeight);

	            galleryContainer.height(thisHeight);

	            galleryPager.height(thisHeight);
        	}, timeout)


        });
    };

	jQuery('.joyslider .slides-container > li').css('display','inline-block');

	tsz_filters();
	tsz_set_like();
	fb_likeus_modal(5);
	initCarousel();
	animateArticlesOnLoad();
	animateBlocksOnScroll();
	visibleBeforeAnimation();
	activateStickyMenu();
	filterButtonsRegister();
	twitterWidgetAnimated();
	activateFancyBox();
	alignElementVerticalyCenter();
	showMosaic();
	mosaicViewScroller();
	tsz_video_view();
	alignMegaMenu();
	resizeVideo();
	singleVideoResize();
	setScrollContainerWidth();
	tsz_count_down_element();
	tsz_fullscreen_scroll_btn();
	tsz_select_post_by_category();

	jQuery('.joyslider').addClass('active');
	jQuery('.corena-slider').addClass('active');

	// Hide preloader
	if ( jQuery('.ts-page-loading').length ) {
		setTimeout(function() {
			jQuery('.ts-page-loading').addClass('shown');
		}, 900);
		setTimeout(function(){
			jQuery('.ts-page-loading').fadeOut(500);
		},1100);
	}

	// If onepage layout - run the onepage menu
	if ( ts_onepage_layout == 'yes' ) {
		startOnePageNav();
	}

	if( jQuery('.flexslider').length > 0 ){
		jQuery('.flexslider').each(function(){
			var nav_control;
			if( jQuery(this).hasClass('with-thumbs') ){
				nav_control = 'thumbnails';
			} else{
				nav_control = 'none';
			}
			var nav_animation = jQuery(this).attr('data-animation');
			jQuery(this).flexslider({
				animation: nav_animation,
				controlNav: nav_control,
				prevText: "",
				nextText: "",
				smoothHeight: true,
			});
		});
	}

	if( jQuery('.ts-bxslider').length > 0 ){
		jQuery('.ts-bxslider').each(function(){
			var current = '#'+jQuery(this).find(".bxslider").attr('id');
			var caption = jQuery(current).find('.slider-caption');

			jQuery(current).bxSlider({
				auto: true,
				autoHover: true,
				mode: 'fade',
				pause: 5000,
				nextSelector: '#slider-next',
				prevSelector: '#slider-prev',
				nextText: '<i class="icon-right"></i>',
				prevText: '<i class="icon-left"></i>',
				speed: 1000,
				onSliderLoad: function(){
					jQuery(current).children('li').eq(0).addClass('active-slide');
					caption.find('.title').addClass('animated');
					caption.find('.sub').addClass('animated');
				},
				onSlideBefore: function(){
					caption.find('.title').removeClass('animated');
					caption.find('.sub').removeClass('animated');
				},
				onSlideAfter: function(currentSlide, totalSlides, currentSlideHtmlObject){
					jQuery('.active-slide').removeClass('active-slide');
					jQuery(current).children('li').eq(currentSlideHtmlObject).addClass('active-slide');
					caption.find('.title').addClass('animated');
					caption.find('.sub').addClass('animated');
				}
			});
		});
	}

	jQuery('.panel-heading a[data-toggle="collapse"]').on('click', function(){

		var panelCollapse = jQuery(this).parent().next();
		if ( panelCollapse.hasClass('in')) {
			jQuery(this).find('i').css({
				'-webkit-transform': 'rotate(90deg)',
				'-o-transform': 'rotate(90deg)',
				'-mz-transform': 'rotate(90deg)',
				'transform': 'rotate(90deg)'
			})
		} else {
			jQuery(this).find('i').css({
				'-webkit-transform': 'rotate(270deg)',
				'-o-transform': 'rotate(270deg)',
				'-mz-transform': 'rotate(270deg)',
				'transform': 'rotate(270deg)'
			})
		}
	});

	jQuery('.megaWrapper').each(function(){
		var _this = jQuery(this);
		if( _this.hasClass('ts-behold-menu') ){
			jQuery(this).removeClass('ts-behold-menu').addClass('ts-mega-menu');
		}
		if( !_this.hasClass('ts-sidebar-menu') ){
			_this.find('.ts_is_mega_div .sub-menu').addClass('ts_is_mega');
			_this.find('.ts_is_mega_div').parent().addClass('is_mega');
		} else {
			_this.removeClass('ts-mega-menu');
		}
	})

	var all_anchor = jQuery('.ts-article-accordion > .panel-group').find('.panel-heading');

	all_anchor.on('click', function(){
		all_anchor.not(this).removeClass('hidden');
		jQuery(this).addClass('hidden');
	});

	if ( isMobile() == false ) {
		jQuery('body').addClass('desktop-version');
	};

tsz_open_side_content();
tsz_gallery();
}); //end load function

/*** MENU TYPE SIDEBAR ***/

var bodyElement = jQuery('body'),
	menu = jQuery('.menu');

jQuery('.ts-sidebar-menu .main-menu > .page_item_has_children > a,.ts-sidebar-menu .main-menu .menu-item-has-children > a').after('<i class="icon-right-arrow-thin"></i>');
jQuery('#nav.ts-sidebar-menu').append('<i class="trigger-menu sb-menu close-menu icon-close"></i>');

jQuery('.trigger-menu.sb-menu').click(function(e){

	e.preventDefault();

	var that = jQuery(this),
		subMenu = jQuery('#nav.ts-sidebar-menu .page_item_has_children, #nav.ts-sidebar-menu .menu-item-has-children'),
		wrap = that.parents('#wrapper');

	jQuery('.trigger-menu.sb-menu').toggleClass('open');

	menu.find('.sub-menu').removeClass('open');
	if (!that.hasClass('hide-menu') && !that.hasClass('close-menu') && !that.hasClass('hide-menu')) {
		menu.addClass('open');
		bodyElement.addClass('menu-open');
		bodyElement.removeClass('menu-closed');
		jQuery('.trigger-menu.sb-menu').addClass('hide-menu');
	} else if (that.hasClass('close-menu') || that.hasClass('hide-menu')) {
		menu.removeClass('open');
		bodyElement.removeClass('menu-open');
		bodyElement.addClass('menu-closed');	
		subMenu.find('.ts-open, .ts-sub-level-open').removeClass('ts-open ts-sub-level-open');
		jQuery('.trigger-menu.sb-menu').removeClass('hide-menu');

	} 	
	return false;
});

var sub_parent = jQuery(".ts-sidebar-menu .main-menu > .page_item_has_children, .ts-sidebar-menu .main-menu > .menu-item-has-children"),
	sub_menu = jQuery('.ts-sidebar-menu .sub-menu'),
	subMenu = jQuery('#nav.ts-sidebar-menu .page_item_has_children .children, #nav.ts-sidebar-menu .menu-item-has-children .sub-menu'),
	isMegaMenuColumn = subMenu.find('[class*="ts_is_mega_menu_columns_"] > ul');

subMenu.each(function() {
	var _this = jQuery(this);
	if ( _this.closest('div').hasClass( "ts_is_mega_div" ) ) {
		_this.unwrap();
	}
});

isMegaMenuColumn.each(function() {
	isMegaMenuColumn.removeClass('sub-menu');
});

jQuery('#nav.ts-sidebar-menu .children, #nav.ts-sidebar-menu .menu-item-has-children > .sub-menu').prepend('<div class="sub-menu--back"><i class="icon-left-arrow-thin"></i><span>BACK</span></div>');

jQuery('#nav.ts-sidebar-menu .page_item_has_children, #nav.ts-sidebar-menu .menu-item-has-children').on('click', 'i', function() {
	var that = jQuery(this); //cache when you can
	var parent_menu = that.next('.sub-menu');
	var menu_index = parent_menu.index();
	parent_menu.addClass('ts-sub-level-open ts-open');
	parent_menu.removeClass('ts-close');
	/*if (that.closest('.ts-open').length) {
		that.closest('.ts-open').removeClass('ts-open');
	}*/
});

var sub_back = jQuery('.sub-menu--back');

sub_back.click(function(){
	var that = jQuery(this),
		currentItem = that.parent('.children, .sub-menu'),
		prevParent = that.closest('.sub-menu').parent().closest('.sub-menu'),
		parent_menu = that.parents('.menu');

	currentItem.removeClass('ts-open');
	currentItem.addClass('ts-close');
	currentItem.removeClass('ts-sub-level-open');
	prevParent.addClass('ts-open');
});


jQuery(document).on('keydown', function(e) {
	var subMenuO = jQuery(' #nav.ts-sidebar-menu .sub-menu.open '),
		subMenuChild = subMenuO.find( '.sub-menu.open' ),
		subMenu = jQuery('#nav.ts-sidebar-menu .page_item_has_children, #nav.ts-sidebar-menu .menu-item-has-children'),
		tsOpen = jQuery('.ts-open');
	var bodyElement = jQuery('body'),
		menu = jQuery('.menu');		
	if (e.which == 27) {		
		if (( jQuery('.sub-menu.ts-open').length == 0 ) && ( jQuery('.menu-open').length > 0 )) {
			jQuery('.trigger-menu.sb-menu').toggleClass('open');

			menu.find('.sub-menu').removeClass('open');			
			menu.removeClass('open');
			bodyElement.removeClass('menu-open');
			bodyElement.addClass('menu-closed');	
			subMenu.find('.ts-open, .ts-sub-level-open').removeClass('ts-open ts-sub-level-open');
			jQuery('.trigger-menu.sb-menu').removeClass('hide-menu');			
		} else{
			jQuery('.sub-menu.ts-open > .sub-menu--back').trigger('click');
		}
	}
});

/*** END MENU TYPE SIDEBAR ***/

/*** Most popular tabs ***/

var targetContainer= jQuery('.widget.widget_popular .tab-content,  .widget_tabber .tab-content, .ts-tab-container'),
	tabClick = jQuery('.widget.ts_widget.widget_popular .nav-tabs li a, .widget.ts_widget.widget_tabber .nav-tabs li a, ul.nav-tabs li a');

tabClick.click(function(event) {
	event.preventDefault();

	var _this = jQuery(this),
		target =  _this.parent().index()+1;

		_this.closest('.ts-tab-container').find('li').removeClass('active');
		_this.closest('.ts-tab-container').find('.tab-content .tab-pane').removeClass('active');
		_this.parent('li').addClass('active');
		_this.parent().parent().next().find('div.tab-pane:nth-child('+target+')').addClass('active');

});

/*** End most popular tabs ***/

/*Facebook page plugin*/
if (jQuery(".facebook-page-plugin").length) {
	var facebookPagePlugin =jQuery(".facebook-page-plugin"),
		facebookPagePluginWidth = facebookPagePlugin.parent().width();
		facebookPagePlugin.css('width', facebookPagePluginWidth + 'px');
}


;(function($, window) {

    var $win = $(window);
    var defaults = {
        gap: 0,
        horizontal: false,
        isFixed: $.noop
    };

    var supportSticky = function(elem) {
        var prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'], prefix;
        return false;
    };

    $.fn.fixer = function(options) {
        options = $.extend({}, defaults, options);
        var hori = options.horizontal,
            cssPos = hori ? 'left' : 'top',
            myGutter = 60;

        return this.each(function() {
            var style = this.style,
                $this = $(this),
                $parent = $this.parent().parent();
                if ( jQuery(this).hasClass('ts-sidebar-element') ) {
                	$parent = jQuery(this).parents('.container').find('>.row');
                };
                if ( jQuery(this).hasClass('ts-div-style') ) {
                	myGutter = 140;
                }

            if (supportSticky(this)) {
                style[cssPos] = options.gap + 'px';
                return;
            }

            $win.on('scroll', function() {
                var scrollPos = $win[hori ? 'scrollLeft' : 'scrollTop'](),
                    elemSize = $this[hori ? 'outerWidth' : 'outerHeight'](),
                    parentPos = $parent.offset()[cssPos],
                    parentSize = $parent[hori ? 'outerWidth' : 'outerHeight']();

                if (scrollPos >= parentPos - 1 && (parentSize + parentPos - myGutter) >= (scrollPos + elemSize)) {
                    style.position = 'relative';
                    style[cssPos] = (scrollPos - parentPos) + options.gap + 'px';
                    options.isFixed();
                } else if (scrollPos < parentPos) {
                    style.position = 'relative';
                    style[cssPos] = 0;
                } else {
                    style.position = 'relative';
                    style[cssPos] = parentSize - elemSize - myGutter + 'px';
                }
            }).resize();
        });
    };
}(jQuery, this));

jQuery(window).on('load',  function(){
	if ( jQuery(window).width() > 768 ) {
		jQuery('#main.sticky-sidebars-enabled #secondary').fixer();
		jQuery('.ts-sidebar-element.sidebar-is-sticky').fixer();
	}
});

(function ($) {
    $.fn.TsProgressScroll = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            backgroundColor: "#000",
            height: '10px',
            position: 'fixed'
        }, options);
        var mySelector = this.selector;
        this.each(function () {
            $(window).scroll(function () {
                var offsettop = parseInt($(this).scrollTop());
                var parentHeight = parseInt($('.ts-single-post').height() - $(window).height());
                var vscrollwidth = offsettop / parentHeight * 100;
                $(mySelector).css({width: vscrollwidth + '%'});
            });
            $(mySelector).css({
                backgroundColor: settings.backgroundColor,
                height: settings.height,
                position: settings.position
            });
        });
        return this;
    };
}(jQuery));

jQuery("#main.article-progress-enabled #article-progress-bar").TsProgressScroll({backgroundColor: main_color, height: '3px', position: 'fixed'});

function lazyloadPlaceholder(callback){
	if( jQuery('img.lazy').length > 0 ){

		var threshold = 200,
			hasMasonry =  ( jQuery('img.lazy').closest('.masonry').length > 0 || jQuery('img.lazy').closest('.ts-filters-container').length > 0 ) ? true : false,
			failureLimit = 1;

		if( hasMasonry ) {
			threshold = 300;
			failureLimit  = 1;
		}

		jQuery('img.lazy').lazyload({			
			effect : "fadeIn",
			threshold: threshold,
			failure_limit: failureLimit,
			skip_invisible: false,
			effectspeed: 300,
			// container: window,
			load : function(){
				jQuery(this).parent().addClass('was-loaded');
				jQuery(this).removeClass('lazy').addClass('ts-lazyloaded');

				if ( jQuery(this).parents('.gallery-cell').parent().hasClass('ts-gallery-animate') ) {
					var elementToAnimate = jQuery(this).parents('.gallery-cell');
					elementToAnimate.imagesLoaded()
					.always( function( instance ) {
					    elementToAnimate.addClass('animate');
					});
				}

				if( hasMasonry ){
					setTimeout(function(){
						jQuery('.ts-filters-container').isotope('layout');
						jQuery('.masonry').isotope('layout');
					}, 1000);

				}
			}
		});
	}	

	if (callback && typeof(callback) === "function") {

	  callback();
	}	

}
function resizeInstance(){
	jQuery('.ts-instance-container').each(function(){
		var tsInstanceImgHeight	  = jQuery(this).find('header img').height();
		if( jQuery(this).height() <= tsInstanceImgHeight ) {
			jQuery(this).height(tsInstanceImgHeight);
			jQuery(this).find('section').height(tsInstanceImgHeight);
		}
	});
}
jQuery(window).resize(function(){
	if ( jQuery('.ts-instance-container').length > 0 ){
		resizeInstance();
	}
});

function tsz_appendElementToNavbar(){
	var elementsPair = {
		'.ts-append-search' : ['.ts-navbar-search', ],
		'.ts-append-cart' : ['.ts-navbar-cart', ],
		'.ts-append-social' : ['.ts-navbar-social',],
		'.ts-append-logo' : ['.ts-navbar-logo',],
		/* if menu has class on the left, append elements with class on the right */
	},
	appendMode = 'appendTo';

	jQuery.each(elementsPair, function(navbarClass, element){
		var $menu = jQuery(navbarClass);
		if ( $menu.length > 0 ) {
			jQuery.each(element, function(i, elem){
				var $elem = jQuery(elem);

				if( element == '.ts-navbar-logo' ) {
					appendMode = 'prependTo';
				}

				try{ 
					$elem.hide().clone()[appendMode]($menu.find('.main-menu')).show().wrap('<li class="menu-item" />');				
				} catch(e){
					console.log(e);
				}

				appendMode = 'appendTo';
			});
		};
	});
}

function tsz_gallery(options){
   /*
     *
     *  Single gallery type
     *
    */
    // Gallery horizontal    
    if (jQuery('#ts-main-gallery').length ) {
        var $gallery = jQuery('#ts-main-gallery .inner-gallery-container');
        var flkty = $gallery.data('flickity');

        $gallery.flickity({
            wrapAround: false,
            freeScroll: true,
            contain: true
        });

        $gallery.flickity().on( 'cellSelect settle', function() {
            if( jQuery("img.lazy").length > 0 ){
                jQuery("img.lazy").lazyload({
                    effect : "fadeIn",
                    skip_invisible : false,
                    load : function(){
                        jQuery(this).removeClass('lazy');
                        jQuery(this).addClass('ts-lazyloaded');
                    }
                });
            }
        });

        // scrollbar
        jQuery('.single-ts-gallery .single_gallery1 .post-header-title .entry-excerpt').mCustomScrollbar({
            axis : 'y',
            theme : "dark",
            scrollInertia: 75,
        });
    };
    // Gallery justified
    if (jQuery('.ts-justified-gallery').length) {
        var options = {
                minMargin: 5,
                maxMargin: 5,
                itemSelector: ".item",
                firstItemClass: "first-item"
            };

        jQuery(".ts-justified-gallery .inner-gallery-container").rowGrid(options);

        // endless scrolling
        jQuery(window).scroll(function() {
            if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
                jQuery(".ts-justified-gallery .inner-gallery-container").rowGrid("appended");
            }
        });

        // Lazyload
        if( jQuery("img.lazy").length > 0 ){
            jQuery("img.lazy").lazyload({
                effect : "fadeIn",
                load : function(){
                    jQuery(this).removeClass('lazy').addClass('ts-lazyloaded');
                }
            });
        }
    };
    // Vertical slider
    if ( jQuery('.ts-gallery-vertical').length > 0 ) {
        jQuery('.ts-gallery-vertical, .ts-vertical-gallery .vertical-layout').bxSlider({
            mode: 'vertical',
            slideMargin: 5,
            pagerCustom: '.ts-gallery-pager',
			onSlideBefore: function(){
				lazyloadPlaceholder();
			},            
        });


        // scrollbar
        jQuery('.ts-gallery-vertical .ts-gallery-pager').mCustomScrollbar({
            axis : 'y',
            theme : "dark",
            scrollInertia: 75,
        });
        lazyloadPlaceholder();
    };

	/*Carousel gallery*/
    if (jQuery('.ts-gallery-carousel').length >0 ) {
        var $gallery = jQuery('.ts-gallery-carousel');
        var flkty = $gallery.data('flickity');

        $gallery.flickity({
            wrapAround: false,
            freeScroll: true,
            contain: true,
            cellSelector: '.gallery-cell',
        });

        $gallery.flickity().on( 'cellSelect settle select', function() {
            if( jQuery("img.lazy").length > 0 ){
                jQuery("img.lazy").lazyload({
                    effect : "fadeIn",
                    skip_invisible : false,
                    threshold: 300,
                    load : function(){
                        jQuery(this).removeClass('lazy');
                        jQuery(this).addClass('ts-lazyloaded');
                    }
                });
            }
        });	        
    }

    // Masonry gallery
    if (jQuery('.gallery-type').hasClass('single_gallery5') || jQuery('.ts-gallery-element').hasClass('ts-masonry-gallery')) {
        var container = jQuery('.single_gallery5 .inner-gallery-container, .ts-masonry-gallery .inner-gallery-container');
        container.isotope({
            itemSelector : '.item'
        });
        if( jQuery("img.lazy").length > 0 ){
            jQuery("img.lazy").lazyload({
                effect : "fadeIn",
                load : function(){
                    jQuery(this).parent().addClass('was-loaded');
                    jQuery(this).removeClass('lazy').addClass('ts-lazyloaded');
                    setTimeout(function(){
                        container.isotope('layout');
                    },500);
                }
            });
        }
    };
    // Gallery horizontal scroll
    if (jQuery('.ts-horizontal-scroll-gallery').length > 0 ) {
        // scrollbar
        jQuery('.ts-horizontal-scroll-gallery .inner-gallery-container').mCustomScrollbar({
            horizontalScroll: true,
            axis: 'x',
            theme: "dark",
            scrollInertia: 75,
            advanced:{
                autoExpandHorizontalScroll:true
            },
            callbacks:{
                whileScrolling: function(){
                    // Lazyload
                    if(this.mcs.direction == 'x'){
                    	lazyloadPlaceholder();
                    }
                }
            }        		       
        });

        // excerpt scroll
        jQuery('.single-ts-gallery .single_gallery6 .post-header-title .entry-excerpt').mCustomScrollbar({
            axis : 'y',
            theme : "dark",
            scrollInertia: 75,
        });
    };
    // Trigger caption at galleries
    jQuery('.trigger-caption .button-trigger-cap').on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().find('.overlay-effect').toggleClass('shown');
    })

    /*fullscreen gallery*/

    if( jQuery('.ts-fullscreen-gallery').length > 0 ){
    	jQuery('.ts-fullscreen-gallery').each(function(){
    		var _this = jQuery(this);

    		_this.fullscreenGallery({
    			autoplayDuration: 2000,
    			itemSelector: '.item',
    			navigateKeys: true,
    		});

    	});
    }

    /* Flow gallery*/

    if( jQuery('.ts-flow-gallery').length > 0 ){
    	jQuery('.ts-flow-gallery .inner-gallery-container').each(function(){
    		var _this = this,
    			timeout = 0,
    			$gallery, 
    			flowGallery;

    		if( jQuery(_this).find('.lazy') ){
    			timeout = 600;
    		}
    		setTimeout(function(){
	    		$gallery = jQuery(_this).flowgallery({
	    			duration: 500,
	    			forwardOnActiveClick: false,
	    			thumbHeight: 250,
	    		});
	    		if( jQuery(window).width() <= 768  ) {
	    			flowGallery = $gallery.data('flowgallery');    			
					jQuery('.ts-flow-gallery').find('.flow-arrows .prev').click(function() {
					  	flowGallery.prev();
					});

					jQuery('.ts-flow-gallery').find('.flow-arrows .next').click(function() {
					  	flowGallery.next();
					});    			
	    		}	    		
    		}, timeout);
    	});
    }

    /* Kenburns gallery */
    if( jQuery('.ts-kenburns-gallery').length > 0 ){
    	jQuery('.ts-kenburns-gallery .inner-gallery-container').each(function(){
    		var $this = jQuery(this);
    		$this.slick({
    			slidesToShow: 1,
    			autoplay: true,
    			dots: false,
    			arrows: false,
    			speed: 3000,
    			autoplaySpeed: 2000,
    			fade: true,
    			pauseOnHover: false,
    			lazyLoad: 'progressive',
    			waitForAnimate: false,
    		});    	

    		$this.on( 'afterChange', function(event, slick, currentSlide, nextSlide){
    			// Load next lazy image
    			if ( typeof lazyload === 'function' ) {
    				var $next = jQuery(nextSlide).find('[data-slick-index="'+ nextSlide +'"]');
    				$next.find('img.lazy').lazyload({
    					effect: "fadeIn",
    				});
    			}
    			
    		});
    	});
    }

    /*Zoomwall gallery*/
    if( jQuery('.ts-zoomwall-gallery').length > 0 ){ 
    	jQuery('.ts-zoomwall-gallery .inner-gallery-container').each(function(){
    		var _this = this;
			zoomwall.create(_this);
    	});    	
    }	
	
	/* Lazyload galleries fix */
	if(jQuery('.single-ts-gallery').length ){
		lazyloadPlaceholder();
	}

	// Trigger caption at galleries
	jQuery('.single-ts-gallery .trigger-caption .button-trigger-cap, .ts-gallery-element .trigger-caption .button-trigger-cap').on('click', function(e){
		e.preventDefault();
		jQuery(this).closest('.trigger-caption').prev().toggleClass('shown');
	});

	/* Scroll animation gallery */
	if( jQuery('.ts-gallery-animate').length ){
		var container =  jQuery(window); 
		// Should pass an array
		if( options != undefined && options.GridContainer != undefined  ) {
			container = options.GridContainer;
		}
		var anim = new AnimOnScroll( jQuery( '.ts-gallery-animate' ), {
			minDuration : 0.4,
			maxDuration : 0.7,
			viewportFactor : 0.2,
			items: jQuery('.ts-gallery-animate').find('.item'),
			container: container,
		} );
	}	
	/* Least gallery */
	if( jQuery('.ts-gallery-least').length > 0 ) {
		jQuery('.ts-gallery-least').each(function(){
			var _this = this;
			jQuery(_this).find('.inner-gallery-container').least({
				random: true,
				scrollToGallery: true,
				itemSelector: '.thumb',
				useControls: true,
			});
		});
	}
	/* Fade flip slider*/

	if( jQuery('.ts-fade-flip-gallery').length ){
		jQuery('.ts-fade-flip-gallery .inner-gallery-container').each(function(){
			jQuery(this).fadeSlider({
				minSpeed: 1000,
				maxSpeed: 3500,
				random: true,
				pauseOnHover: true,
				itemSelector: '.gallery-cell',
			});
		});
	}    
}

function tsz_open_side_content(){
	if( jQuery(window).width() <= 768 ) return false;
	// On Small screens go to single post
	jQuery('[data-ajax-post-id]').bind('click touchstart', function(event){
		event.preventDefault();
		var $this = jQuery(this),
			post_id = $this.attr('data-ajax-post-id'),
			tsScript = tsz_loadedscripts,
			bodyEl = jQuery('body').addClass('noscroll'),
			$container = jQuery('.ts-ajax-preview'),
			$content = $container.find('.preview-content'),
			$loader = $container.find('.loader').fadeIn(300);

			if( bodyEl.find('.preview-backdrop').length == 0 ) {
				bodyEl.append('<div class="preview-backdrop"></div>').fadeIn(200);
			}

			$container.addClass('shown');

		var options = {
			GridContainer : $container,
		}

		jQuery.post(Photoedge.ajaxurl, {
			action: 'tsz_side_content',
			args: {
				post_id : post_id,
				ts_scripts : tsScript,
			},
		}, function(data){

			$loader.fadeOut(200);
			$content.html(data).fadeIn(300);
			tsz_gallery(options);
			activateFancyBox();
			$container.addClass('loaded').append('<span class="close-preview icon-close"></span>');

		});

		// If border body, do some adjustments
		$container.on('close', function(){

			$container.removeClass('shown loaded');
			$container.find('.close-preview').remove();
			bodyEl.removeClass('noscroll');
			bodyEl.find('.preview-backdrop').fadeOut(250).remove();
			$content.fadeOut(250).html('');

			bodyEl.find('#fancybox-thumbs').remove();
			/* Remove thumbs bug */

		})

		jQuery(document).on('keyup',function(evt) {

		    if (evt.keyCode == 27) {
		       $container.trigger('close');
		    }
		    /* Close preview on ESC keypress */
		});

		$container.on('click', '.close-preview', function(){
			$container.trigger('close');
		})

		bodyEl.on('click touchstart', '.preview-backdrop', function(event) {
			event.preventDefault();
			$container.trigger('close');
		});

		return false;

	});
}
function tsz_fullscreenMenu(){
	var wrapper = jQuery('.ts-fullscreen-menu');

	wrapper.each(function(){
		var menuToggle = jQuery(this).parent().find('.trigger-menu.fs-menu'),
			menu = jQuery(this).parent().find('.main-menu');

			wrapper.addClass('closed');
			menu.addClass('closed');
			menu.find('.sub-menu').addClass('closed');

		var back = wrapper.parent().find('.menu-back');
		var close = menuToggle.clone().addClass('menu-close open');

		wrapper.append(close);

		//  Add BACK button to each submenu.
		menu.find('.menu-item-has-children').each(function(){
			var cloned = back.clone();
			jQuery(this).append(cloned);
		});
		// Show menu after toggle Click
		menuToggle.click(function(evt){
			evt.stopPropagation();
			evt.preventDefault();

			var $this = jQuery(this);
			wrapper.toggleClass('closed open');	

			jQuery('body').addClass('fs-menu-open');

			return false;			
		});

		// Display submenus
		menu.find('.menu-item-has-children').click(function(evt){
			evt.preventDefault();
			evt.stopPropagation();

			var $self = jQuery(this),
				$self_menu = $self.find('> .sub-menu');

			$self_menu.addClass('open').removeClass('closed');	

			jQuery('.menu-back').hide();

			$self.find('> .menu-back').show();
		});
		// GoBack
		jQuery('.menu-back').on('click', function(evt){
			evt.stopPropagation();
			evt.preventDefault();

			var $self = jQuery(this).parent();

			$self.find('> .sub-menu').removeClass('open').addClass('closed');

			jQuery(this).hide();

			$self.parent().parent().find('> .menu-back').show();
		});

		close.click(function(){
			wrapper.trigger('closeWrapper');
		});

		jQuery(document).keyup(function(evt) {
			evt.preventDefault();

			switch( evt.keyCode ) {
				case 27: wrapper.trigger('closeWrapper'); break;
			}
		});
		// Close whole menu
		wrapper.on('closeWrapper', function(){
			wrapper.removeClass('open').addClass('closed');
			jQuery('body').removeClass('fs-menu-open');
			wrapper.find('.sub-menu').addClass('closed').removeClass('open');
		});
	});
}
// 3000