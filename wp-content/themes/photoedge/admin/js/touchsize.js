jQuery(document).ready(function($){

	tsz_single_gallery_logics();

    jQuery("#ts-slider-source").change(function(){
        if( jQuery(this).val() == "custom-slides" ){
        	jQuery("#ts_slides").removeClass('hide-if-js');
            jQuery("#ts_slides").css("display", "");
            jQuery("#ts-slider-nr-of-posts").css("display", "none");
        }else{
        	jQuery("#ts_slides").removeClass('hide-if-js');
            jQuery("#ts_slides").css("display", "none");
            jQuery("#ts-slider-nr-of-posts").css("display", "");
        }
    });

    if( jQuery("#ts-slider-source").val() == "custom-slides" ){
    	jQuery("#ts_slides").removeClass('hide-if-js');
        jQuery("#ts_slides").css("display", "");
        jQuery("#ts-slider-nr-of-posts").css("display", "none");
    }else{
    	jQuery("#ts_slides").removeClass('hide-if-js');
        jQuery("#ts_slides").css("display", "none");
        jQuery("#ts-slider-nr-of-posts").css("display", "");
    }

	jQuery(document).on('click', '.ts-show-options', function(event){
		event.preventDefault();
		if( jQuery(this).next().hasClass('active') ){
			jQuery(this).parent().find('.ts-hide-options').css('display', 'none');
			jQuery(this).next().css('display', 'none').removeClass('active');
			jQuery(this).show();
		}else{
			jQuery(this).next().css('display', '').addClass('active');
			jQuery(this).parent().find('.ts-hide-options').css('display', '');
			jQuery(this).hide();
		}
	});

	jQuery(document).on('click', '.ts-hide-options', function(){
		jQuery(this).parent().find('.ts-show-options').trigger('click');
	});

	jQuery('.ts-type-font').change(function(){
	    var fontOption = jQuery(this).parent('div').find('.ts-font-options-parent').html();
	    if( jQuery(this).val() == 'google' ){
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', '');
	        jQuery(this).parent('div').find('.ts-google-fonts').find('.ts-font-options').remove();
	        jQuery(this).parent('div').find('.ts-google-fonts').find('.ts-font-name').after(fontOption);
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').find('.ts-font-options').remove();
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', 'none');
	    }else if( jQuery(this).val() == 'custom_font' ){
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').find('.ts-font-options').remove();
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', '').prepend(fontOption);
	        jQuery(this).parent('div').find('.ts-google-fonts').find('.ts-font-options').remove();
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', 'none');
	    }else if( jQuery(this).val() == 'image' ){
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', '');
	    }else{
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-font-options-parent').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', 'none');
	    }
	});
	jQuery('.ts-type-font').each(function(){
	    var fontOption = jQuery(this).parent('div').find('.ts-font-options-parent').html();
	    if( jQuery(this).val() == 'google' ){
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', '');
	        jQuery(this).parent('div').find('.ts-google-fonts').find('.ts-font-options').remove();
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-google-fonts').find('.ts-font-name').after(fontOption);
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', 'none');
	    }else if( jQuery(this).val() == 'custom_font' ){
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').find('.ts-font-options').remove();
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', '').prepend(fontOption);
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', 'none');
	    }else if( jQuery(this).val() == 'image' ){
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', '');
	    }else{
	        jQuery(this).parent('div').find('.ts-google-fonts').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-custom-font').css('display', 'none');
	        jQuery(this).parent('div').find('.ts-logo-image').css('display', 'none');
	    }
	});

	jQuery('#ts_submit_button').click(function(){
	    jQuery('.ts-font-options-parent').each(function(){
	        jQuery(this).remove();
	    });
	});

	if ($('#ts-theme-bg-picker').length) {
		$('#ts-theme-bg-picker').hide();
		$('#ts-theme-bg-picker').farbtastic("#theme-bg-color");

		$("#theme-bg-color").click(function(e){
			e.stopPropagation();
			$('#ts-theme-bg-picker').show();
		});

		$('body').click(function() {
			$('#ts-theme-bg-picker').hide();
		});
	}

	if ($('#ts-primary-picker').length) {
		$('#ts-primary-picker').hide();
		$('#ts-primary-picker').farbtastic("#ts-primary-color");

		$("#ts-primary-color").click(function(e){
			e.stopPropagation();
			$('#ts-primary-picker').show();
		});

		$('body').click(function() {
			$('#ts-primary-picker').hide();
		});
	}

	if ($('.colors-section-picker-div').length) {
		tsz_restart_color_picker();
	}

	if ($('#ts-secondary-picker').length) {
		$('#ts-secondary-picker').hide();
		$('#ts-secondary-picker').farbtastic("#ts-secondary-color");

		$("#ts-secondary-color").click(function(e){
			e.stopPropagation();
			$('#ts-secondary-picker').show();
		});

		$('body').click(function() {
			$('#ts-secondary-picker').hide();
		});
	}

	/************************************
	 * Theme options
	 ************************************/

	/**
	 * Theme background customization
	 */

	$('.ts-custom-bg').css({'display':'none'});
	var style = $('#custom-bg-options option:selected').val();

	// set defaul option for background customization
	background_options(style);

	function background_options(style) {

		if (style == 'pattern') {
			$('#ts-patterns-option').show();
		} else if (style == 'color') {
			$('#ts-bg-color').show();
		} else if (style == 'image') {
			$('#ts-bg-image').show();
		}
	}

	$('#custom-bg-options').change(function(event) {
		$('.ts-custom-bg').css({'display':'none'});
		var style = $(this).find("option:selected").val();
		background_options(style);
	});

	/**
	 * Overlay stripes/dotts effect for images
	 */

	var overlay_effect = $('#overlay-effect-for-images option:selected').val();

	if (overlay_effect == 'Y') {
		$('#overlay-effects').show();
	} else {
		$('#overlay-effects').css({'display':'none'});
	}

	$('#overlay-effect-for-images').change(function(event) {
		var overlay_effect = $(this).find('option:selected').val();
		if (overlay_effect == 'Y') {
			$('#overlay-effects').show();
		} else {
			$('#overlay-effects').css({'display':'none'});
		}
	});

	/**
	 * Theme logo
	 */
	var logo_style = $('.ts-logo-type option:selected').val();
	set_logo_style(logo_style);

	$('.ts-logo-type').change(function(event) {
		var selected_style = $(this).find('option:selected').val();
		set_logo_style(selected_style);
	});

	function set_logo_style (style) {
		if (style === 'image') {
			$('#ts-logo-fonts').css({'display':'none'});
			$('#ts-logo-image').show();
		} else {
			$('#ts-logo-fonts').show();
			$('#ts-logo-image').css({'display':'none'});
		}
	}

	/**
	 * Typography - Headings styles
	 */
	var headings_style = $('.ts-typo-headings option:selected').val();
	set_headings_style(headings_style);

	$('.ts-typo-headings').change(function(event) {
		var selected_style = $(this).find('option:selected').val();
		set_headings_style(selected_style);
	});

	function set_headings_style (style) {
		var tags = ['h1', 'h2', 'h3', 'h4', 'h5'];

		if (style === 'std') {

			$('#ts-typo-headings-gfonts').css({'display':'none'});

			$('#custom-font').css({'display':'none'});

			jQuery(tags).each(function(i, tag){
				jQuery('#ts-typo-headings-' + tag + '-gfonts').closest('tr').css({'display': 'none'});
			});

		}else if (style === 'custom_font') {
			$('#ts-typo-headings-gfonts').css({'display':'block'});
			$('#fontchanger-headings').css({'display':'none'});
			$('.headings-subset-types').css({'display':'none'});
			$('#custom-font').css({'display':''});
			$('#headings-demo').css({'display':'none'});
			$('#headings-preview').css({'display':'none'});
			$('.logo-text-preview').css({'display':'none'});

			jQuery(tags).each(function(i, tag){
				jQuery('#ts-typo-headings-' + tag + '-gfonts').closest('tr').css({'display': 'none'});
			});

		} else {
			$('#ts-typo-headings-gfonts').css({'display':'none'});
			$('#custom-font').css({'display':'none'});
			$('#fontchanger-headings').css({'display':'block'});
			$('.headings-subset-types').css({'display':'block'});
			$('#headings-demo').css({'display':'block'});
			$('#headings-preview').css({'display':'block'});
			$('.logo-text-preview').css({'display':'block'});

			jQuery(tags).each(function(i, tag){
				jQuery('#ts-typo-headings-' + tag + '-gfonts').closest('tr').css({'display': ''});
			});
		}
	}

	/**
	 * Typography - Primary text styles
	 */
	var primary_text_style = $('.ts-typo-primary_text option:selected').val();
	set_primary_text_style(primary_text_style);

	$('.ts-typo-primary_text').change(function(event) {
		var selected_style = $(this).find('option:selected').val();
		set_primary_text_style(selected_style);
	});

	function set_primary_text_style (style) {
		if (style === 'std') {
			$('#ts-typo-primary_text-gfonts').css({'display':'none'});
			$('#custom-primary-font').css({'display':'none'});

		} else if(style === 'custom_font') {
			$('#ts-typo-primary_text-gfonts').css({'display':'block'});
			$('#fontchanger-primary_text').css({'display':'none'});
			$('#custom-primary-font').css({'display':'block'});
			$('.primary_text-subset-types').css({'display':'none'});
			$('.primary-preview').css({'display':'none'});
			$('#primary_text-demo').css({'display':'none'});
			$('#primary_text-preview').css({'display':'none'});
		} else{
			$('#ts-typo-primary_text-gfonts').show();
			$('#fontchanger-primary_text').css({'display':'block'});
			$('.primary_text-subset-types').css({'display':'block'});
			$('#custom-primary-font').css({'display':'none'});
			$('.primary-preview').css({'display':'block'});
			$('#primary_text-demo').css({'display':'block'});
			$('#primary_text-preview').css({'display':'block'});
		}
	}

	/**
	 * Typography - Secondary text styles
	 */
	var secondary_text_style = $('.ts-typo-secondary_text option:selected').val();
	set_secondary_text_style(secondary_text_style);

	$('.ts-typo-secondary_text').change(function(event) {
		var selected_style = $(this).find('option:selected').val();
		set_secondary_text_style(selected_style);
	});

	function set_secondary_text_style (style) {
		if (style === 'std') {
			$('#ts-typo-secondary_text-gfonts').css({'display':'none'});
			$('#custom-secondary-font').css({'display':'none'});
		} else if(style === 'custom_font'){
			$('#ts-typo-secondary_text-gfonts').show();
			$('#custom-secondary-font').css({'display':'block'});
			$('#fontchanger-secondary_text').css({'display':'none'});
			$('.logo-secundary-preview').css({'display':'none'});
			$('#secondary_text-demo').css({'display':'none'});
		} else {
			$('#ts-typo-secondary_text-gfonts').show();
			$('#custom-secondary-font').css({'display':'none'});
			$('#fontchanger-secondary_text').css({'display':'block'});
			$('.logo-secundary-preview').css({'display':'block'});
			$('#secondary_text-demo').css({'display':'block'});
		}
	}

	/**
	 * Single post - Enable related posts
	 */
	var related_posts = $('.ts-related-posts option:selected').val();
	set_related_posts(related_posts);

	$('.ts-related-posts').change(function(event) {
		var related_posts = $(this).find('option:selected').val();
		set_related_posts(related_posts);
	});

	function set_related_posts (style) {
		if (style === 'N') {
			$('#ts-related-posts-options').css({'display':'none'});
		} else {
			$('#ts-related-posts-options').show();
		}
	}


	$('#enable_facebook_box').change(function(event) {
		if ( $(this).val() === 'Y' ) {
			$('#facebook_page').removeClass('hidden');
		} else {
			$('#facebook_page').addClass('hidden');
		}
	});

	/**
	 * Sticky menu
	 */
	$('#enable_sticky_menu').change(function(event) {
		if ( $(this).val() === 'Y' ) {
			$('#sticky_menu_options').removeClass('hidden');
		} else {
			$('#sticky_menu_options').addClass('hidden');
		}
	});

	if ($('#sticky_menu_bg_color_picker').length) {
		$('#sticky_menu_bg_color_picker').hide();
		$('#sticky_menu_bg_color_picker').farbtastic("#sticky_menu_bg_color");

		$("#sticky_menu_bg_color").click(function(e){
			e.stopPropagation();
			$('#sticky_menu_bg_color_picker').show();
		});

		$('body').click(function() {
			$('#sticky_menu_bg_color_picker').hide();
		});
	}

	if ($('#sticky_menu_text_color_picker').length) {
		$('#sticky_menu_text_color_picker').hide();
		$('#sticky_menu_text_color_picker').farbtastic("#sticky_menu_text_color");

		$("#sticky_menu_text_color").click(function(e){
			e.stopPropagation();
			$('#sticky_menu_text_color_picker').show();
		});

		$('body').click(function() {
			$('#sticky_menu_text_color_picker').hide();
		});
	}

	/**
	 * Create new sidebar
	 */
	$('#ts_add_sidebar').on('click', function(event) {
		event.preventDefault();
		var sidebar_name = $('#ts_sidebar_name').val();

		var data = {
			action: 'tsz_add_sidebar',
			ts_sidebar_name: sidebar_name
		};

		$.post(ajaxurl, data, function(data, textStatus, xhr) {
			if (data.success == 1) {
				var html = '<tr><td class="dynamic-sidebar">'+data.sidebar.name+'</td><td><a href="#" class="ts-remove-sidebar" id="'+data.sidebar.id+'">Delete</a></td></tr>';
				$('#ts_sidebar_name').val('');
				$('#ts-sidebars').append($(html));
			} else {
				alert(data.message);
			}
		}, 'json');
	});

	/**
	 * Removing sidebar
	 */
	$(document).on('click', '.ts-remove-sidebar', function(event) {
		event.preventDefault();
		var sidebar = $(this);
		var sidebar_id = sidebar.attr('id');

		var data = {
			action: 'tsz_remove_sidebar',
			ts_sidebar_id: sidebar_id
		};

		$.post(ajaxurl, data, function(data, textStatus, xhr) {
			if (data.result == 1){
				sidebar.parent().parent().remove();
			}
		}, 'json');
	});

	// Show/Hide options for sidebar

	jQuery('#page-sidebar-position').change(function(){
		var position_val = jQuery(this).val();
		if ( position_val != 'none' ) {
			jQuery('#ts_sidebar_size').show();
			jQuery('#ts_sidebar_sidebars').show();
		} else{
			jQuery('#ts_sidebar_size').hide();
			jQuery('#ts_sidebar_sidebars').hide();
		}
		//jQuery('#page-sidebar-position').trigger('change');
	});
	if ( jQuery('#page-sidebar-position').val() != 'none' ) {
		jQuery('#ts_sidebar_size').show();
		jQuery('#ts_sidebar_sidebars').show();
	} else{
		jQuery('#ts_sidebar_size').hide();
		jQuery('#ts_sidebar_sidebars').hide();
	}

    // Options > Layouts > Blog page
    var blogDisplayMode = $('.blog-last-posts-display-mode-options>div'),
    blogDisplayModeFirstElement = $(".blog-last-posts-display-mode").find('option:first').val(),

    // Options > Layouts > Category
    categoryDisplayMode = $('.category-last-posts-display-mode-options>div'),
    categoryDisplayModeFirstElement = $(".category-last-posts-display-mode").find('option:first').val(),

    // Options > Layouts > Author
    authorDisplayMode = $('.author-last-posts-display-mode-options>div'),
    authorDisplayModeFirstElement = $(".author-last-posts-display-mode").find('option:first').val(),

    // Options > Layouts > Search
    searchDisplayMode = $('.search-last-posts-display-mode-options>div'),
    searchDisplayModeFirstElement = $("#search-last-posts-display-mode").find('option:first').val(),

    // Options > Layouts > Archive
    archiveDisplayMode = $('.archive-last-posts-display-mode-options>div'),
    archiveDisplayModeFirstElement = $(".archive-last-posts-display-mode").find('option:first').val(),

    // Options > Layouts > Tags
    tagsDisplayMode = $('.tags-last-posts-display-mode-options>div'),
    tagsDisplayModeFirstElement = $(".tags-last-posts-display-mode").find('option:first').val();

	// Show selected element from builderElements and hide the rest
	function makeSelected (builderElements, selected) {
		$.each(builderElements, function(index, el) {
			var element = $(el);
			if (element.hasClass(selected)) {
				element.removeClass('hidden');
			} else {
				if( ! element.hasClass('hidden')) {
					element.addClass('hidden');
				}
			}
		});
	}

    $(document).on("change", ".blog-last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + $(this).val();
        makeSelected(blogDisplayMode, selected);
    });

    $(document).on("change", ".category-last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + $(this).val();
        makeSelected(categoryDisplayMode, selected);
    });

    $(document).on("change", ".author-last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + $(this).val();
        makeSelected(authorDisplayMode, selected);
    });

    $(document).on("change", ".search-last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + $(this).val();
        makeSelected(searchDisplayMode, selected);
    });

    $(document).on("change", ".archive-last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + $(this).val();
        makeSelected(archiveDisplayMode, selected);
    });

    $(document).on("change", ".tags-last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + $(this).val();
        makeSelected(tagsDisplayMode, selected);
    });

	jQuery('.display-layout-options').click(function(){
		jQuery(this).toggleClass('opened');
		jQuery(this).next().toggleClass('hidden');
	});

    var photoedge_custom_uploader = {};

        $(document).on("click", ".photoedge_select_image", function(e) {
            e.preventDefault();

            if (typeof wp.media.frames.file_frame == 'undefined') {
                wp.media.frames.file_frame = {};
            }

            var _this     = $(this),
                target_id = _this.attr('id'),
                media_id  = _this.closest('div').find('.image_media_id').val();

            //If the uploader object has already been created, reopen the dialog
            if (photoedge_custom_uploader[target_id]) {
                photoedge_custom_uploader[target_id].open();
                return;
            }

            //Extend the wp.media object
            photoedge_custom_uploader[target_id] = wp.media.frames.file_frame[target_id] = wp.media({
                title: 'Choose Image',
                button: {
                    text: 'Choose Image'
                },
                library: {
                    type: 'image'
                },
                multiple: false,
                selection: [media_id]
            });

            //When a file is selected, grab the URL and set it as the text field's value
            photoedge_custom_uploader[target_id].on('select', function() {

                var attachment = photoedge_custom_uploader[target_id].state().get('selection').first().toJSON();
                var options = _this.closest('div');

                options.find('.image_url').val(attachment.url);
                options.find('.image_media_id').val(attachment.id);


    			var logo_url = $("#atachment-logo").val();
    			var newImg = new Image();
    			newImg.src = logo_url;

    			$(newImg).on('load', function(){
    				$('#photoedge_logo_retina_width').val(newImg.width);
    			});

                return;
            });

            //Open the uploader dialog
            photoedge_custom_uploader[target_id].open();
        });


	$(document).on('click', '.ts-remove-alert', function(event) {
		event.preventDefault();

		var alert = $(this).closest('.updated'),
			token = $(this).attr('data-token'),
			alertID = $(this).attr('data-alets-id'),
			data = {};

		data['action'] = 'photoedge_hide_touchsize_alert';
		data['token'] = token;
		data['alertID'] = alertID;

		alert.fadeOut('slow');

		$.post( ajaxurl, data, function(data, textStatus, xhr) {
			if (data.status === 'ok') {
				alert.remove();
			}
		});
	});
	$(document).on('click', '.uploader-meta-field', function(event) {
        event.preventDefault();
        var this_element_ID = '#' + jQuery(this).attr('data-element-id');
        if (typeof wp.media.frames.file_frame == 'undefined') {
            wp.media.frames.file_frame = {};
        }

        var _this     = $(this),
            target_id = _this.attr('id'),
            media_id  = _this.closest('div').find(this_element_ID + '-media-id').val();

        //If the uploader object has already been created, reopen the dialog
        if (photoedge_custom_uploader[target_id]) {
            photoedge_custom_uploader[target_id].open();
            return;
        }

        //Extend the wp.media object
        photoedge_custom_uploader[target_id] = wp.media.frames.file_frame[target_id] = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Choose Image'
            },
            library: {
                type: 'image'
            },
            multiple: false,
            selection: [media_id]
        });

        //When a file is selected, grab the URL and set it as the text field's value
        photoedge_custom_uploader[target_id].on('select', function() {

            var attachment = photoedge_custom_uploader[target_id].state().get('selection').first().toJSON();
            var options = _this.closest('div');

            options.find(this_element_ID + '-input-field').val(attachment.url);
            options.find(this_element_ID + '-media-id').val(attachment.id);

            return;
        });

        //Open the uploader dialog
        photoedge_custom_uploader[target_id].open();
	});

	jQuery('.image-radio-input').click(function(){
		jQuery(this).parent().parent().find('.selected').removeClass('selected');
		jQuery(this).addClass('selected');
		jQuery(this).parent().parent().find('input[checked="checked"]').removeAttr('checked');
		jQuery(this).parent().parent().find('input[data-value="'+jQuery(this).attr('data-value')+'"]').attr('checked','checked');
	});

    setTimeout(function(){
        custom_selectors_run();
    },200);

    var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

    //Function to convert rgb format to hex color
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

	var targetselect = jQuery("#page-sidebar-position");
    jQuery("#page-sidebar-position-selector li img").click(function(){
        custom_selectors(jQuery(this), targetselect);
        jQuery('#page-sidebar-position').trigger('change');
    });

    jQuery(document).on('click','.builder-element-icon-trigger-btn', function(event){
    	event.preventDefault();
        jQuery(this).parent().next().slideToggle();
    });

    jQuery(document).on('click','.builder-icon-list li i', function(event){
    	event.preventDefault();
        jQuery(this).closest('.ts-icons-container').parent().find('.builder-element-icon-trigger-btn').find('i').remove();
        jQuery(this).closest('.ts-icons-container').parent().find('.builder-element-icon-trigger-btn').append("<i class='" + jQuery(this).attr('data-option') + "'></i>");
        jQuery(this).closest('.ts-icons-container').slideToggle();
    });

	jQuery(document).on('click', '.sortable-meta-element', function(event) {
	    event.preventDefault();
	    var arrow = jQuery(this).find('.tab-arrow');
	    if (arrow.hasClass('icon-down')) {
	        arrow.removeClass('icon-down').addClass('icon-up');
	    } else if (arrow.hasClass('icon-up')) {
	        arrow.removeClass('icon-up').addClass('icon-down');
	    }
	    jQuery(this).next().slideToggle();

	    if( jQuery(this).next().hasClass('hidden') ){
	    	jQuery(this).next().removeClass('hidden').addClass('active');
	    }else{
	    	jQuery(this).next().removeClass('active').addClass('hidden');
	    }

		var thisElem = jQuery(this).parent().attr('id');
		var thisContainer = jQuery(this).parent().parent().attr('id');

		jQuery('#'+thisContainer+' > li').not('#'+thisElem).each(function(){
			var allItems = jQuery(this).children('div:not(.sortable-meta-element)');
			jQuery(allItems).slideUp();
		});
	});

	// Remove item
	jQuery(document).on('click', '.remove-item', function(event) {
	    event.preventDefault();
	    jQuery(this).closest('li').remove();
	});

	// Duplicate item
	jQuery(document).on('click', '.ts-multiple-item-duplicate', function(event){
        event.preventDefault();
        var parentContainer = jQuery(this).parent().parent();
        var target_item = jQuery(this).attr('data-item');
        var incerement_item = jQuery(this).attr('data-increment');
        var element_name = jQuery(this).attr('data-element-name');
        incerement_item++;

        dublicate_item_id = jQuery(this).prev().prev().val();
        var new_element_id =  new Date().getTime();
        element_id = new RegExp(dublicate_item_id, 'g');

        if( target_item === 'listed-features-item' ){
        	tsz_listed_features_style_color();
        }

        if ( jQuery(parentContainer).find('.colors-section-picker').length > 0 ){
        	jQuery(parentContainer).find('.colors-section-picker').each(function(){
	            jQuery(this).attr('value',rgb2hex(jQuery(this).css('background-color')));
	        });
        }
        if ( jQuery(parentContainer).find('textarea[data-builder-name="text"]').length > 0 ){
	        jQuery(parentContainer).find('textarea[data-builder-name="text"]').each(function(){
	            jQuery(this).text(jQuery(this).val());
	        });
	    }
	    if ( jQuery(parentContainer).find('input[data-builder-name="title"]').length > 0 ){
	        jQuery(parentContainer).find('input[data-builder-name="title"]').each(function(){
	            jQuery(this).attr('value',jQuery(this).val());
	        });
	    }
	    if ( jQuery(parentContainer).find('input[data-role="media-url"]').length > 0 ){
			jQuery(parentContainer).find('input[data-role="media-url"]').each(function(){
			   jQuery(this).attr('value',jQuery(this).val());
			});
		}
		if ( jQuery(parentContainer).find('input[data-builder-name="name"]').length > 0 ){
			jQuery(parentContainer).find('input[data-builder-name="name"]').each(function(){
			   jQuery(this).attr('value',jQuery(this).val());
			});
		}
		if ( jQuery(parentContainer).find('input[data-builder-name="company"]').length > 0 ){
			jQuery(parentContainer).find('input[data-builder-name="company"]').each(function(){
			   jQuery(this).attr('value',jQuery(this).val());
			});
		}
		if ( jQuery(parentContainer).find('input[data-builder-name="url"]').length > 0 ){
			jQuery(parentContainer).find('input[data-builder-name="url"]').each(function(){
			   jQuery(this).attr('value',jQuery(this).val());
			});
		}
		if ( jQuery(parentContainer).find('input[data-builder-name="embed"]').length > 0 ){
			jQuery(parentContainer).find('input[data-builder-name="embed"]').each(function(){
			   jQuery(this).attr('value',jQuery(this).val());
			});
		}

        var element_content = jQuery(parentContainer).html();
        var list_id = Math.round(new Date().getTime() + (Math.random() * 100));

        element_content = element_content.replace(element_id,new_element_id);
        jQuery(parentContainer).parent().append('<li id="list-item-id-'+list_id+'" class="'+target_item+' ts-multiple-add-list-element">' + element_content + '</li>');

        tsz_slider_pips(0, 100, 1, 0, 'skills-' + new_element_id + '-percentage-slider', 'skills-' + new_element_id + '-percentage');

        tsz_upload_files('#uploader_' + new_element_id, '#slide_media_id-' + new_element_id, '#' + element_name + '-' + new_element_id + '-image', 'Insert image', '#image-preview-' + new_element_id, 'image');

        tsz_restart_color_picker();

        jQuery('div.builder-element .builder-icon-list').each(function(){
	        jQuery('div.builder-element .builder-icon-list li i').click(function(){
	            targetselect = jQuery(this).parent().parent().attr('data-selector');
	            custom_selectors(jQuery(this), targetselect);
	        });
	    });

	    tsz_screen_animation_delay();
    });

	jQuery('#generate-likes, #ts-reset-likes').click(function(){

		jQuery('.ts-wait').css('display', '');
		jQuery('.ts-succes-like').css('display', 'none');

		var count = 0;

		var dots = setInterval(function(){

		  count++;

		  jQuery('.ts-wait-dots').text(new Array(count % 10).join('.'));

		}, 500);

		var todo = jQuery(this).attr('id') == 'ts-reset-likes' ? 'reset' : 'generate';

		jQuery.post(ajaxurl, "action=ts_generate_like&nonce=" + PhotoedgeAdmin.LikeGenerate + '&todo=' + todo, function(response){

			window.clearInterval(dots);

			jQuery('.ts-wait').css('display', 'none');

			if ( response === '1' ) {

				jQuery('.ts-succes-like').css('display', '');

			} else {

				jQuery('.ts-error-like').css('display', '');

			}
		});
	});

});

// Mega menu scripts
(function($)
{
	var ts_is_mega_menu = {
		recalcTimeout: false,
		// bind the click event to all elements with the class ts_uploader
		bind_click: function()
		{
			var megmenuActivator = '.menu-item-ts-megamenu,#menu-to-edit';

				$(document).on('click', megmenuActivator, function()
				{
					var checkbox = $(this),
						container = checkbox.parents('.menu-item:eq(0)');

					if(checkbox.is(':checked'))
					{
						container.addClass('ts_is_mega_active');
					}
					else
					{
						container.removeClass('ts_is_mega_active');
					}

					//check if anything in the dom needs to be changed to reflect the (de)activation of the mega menu
					ts_is_mega_menu.recalc();

				});
		},
		recalcInit: function()
		{
            $(document).on('mouseup', '.menu-item-bar', function(event, ui)
			{
				if(!$(event.target).is('a'))
				{
					clearTimeout(ts_is_mega_menu.recalcTimeout);
					ts_is_mega_menu.recalcTimeout = setTimeout(ts_is_mega_menu.recalc, 500);
				}
			});
		},
		recalc : function()
		{
			var menuItems = $('.menu-item','#menu-to-edit');

			menuItems.each(function(i)
			{
				var item = $(this),
					megaMenuCheckbox = $('.menu-item-ts-megamenu', this);

				if(!item.is('.menu-item-depth-0'))
				{
					var checkItem = menuItems.filter(':eq('+(i-1)+')');
					if(checkItem.is('.ts_is_mega_active'))
					{
						item.addClass('ts_is_mega_active');
						megaMenuCheckbox.attr('checked','checked');
					}
					else
					{
						item.removeClass('ts_is_mega_active');
						megaMenuCheckbox.attr('checked','');
					}
				}
			});
		},

		// Clone the menu-item for creating our megamenu
		addItemToMenu : function(menuItem, processMethod, callback) {
			var menu = $('#menu').val(),
				nonce = $('#menu-settings-column-nonce').val();

			processMethod = processMethod || function(){};
			callback = callback || function(){};

			params = {
				'action': 'tsz_ajax_switch_menu_walker',
				'menu': menu,
				'menu-settings-column-nonce': nonce,
				'menu-item': menuItem
			};

			$.post( ajaxurl, params, function(menuMarkup) {
				var ins = $('#menu-instructions');
				processMethod(menuMarkup, params);
				if( ! ins.hasClass('menu-instructions-inactive') && ins.siblings().length )
					ins.addClass('menu-instructions-inactive');
				callback();
			});
		}

};

	$(function()
	{
		ts_is_mega_menu.bind_click();
		ts_is_mega_menu.recalcInit();
		ts_is_mega_menu.recalc();
		if(typeof wpNavMenu != 'undefined'){ wpNavMenu.addItemToMenu = ts_is_mega_menu.addItemToMenu; }
 	});

})(jQuery);

function tsz_select_all_general(id_select){

    jQuery(id_select).on('click',function(){

        if(jQuery(id_select).val() == 0){

            jQuery(id_select + ' > option[value="0"]').remove();
            jQuery(id_select + " > option").attr("selected","selected");
            jQuery(id_select).trigger("change");
            jQuery(id_select).append('<option value="0">All</option>');

        }else if(jQuery(id_select).val()){

            if(jQuery(id_select).val().indexOf('0') >= 0){
                jQuery(id_select + ' > option[value="0"]').remove();
                jQuery(id_select + " > option").attr("selected","selected");
                jQuery(id_select).trigger("change");
                jQuery(id_select).append('<option value="0">All</option>');
            }
        }
    });
}

//show/hide the inputs "Border color" and "background color" in element listed features depending of option "style"
function tsz_listed_features_style_color(){

    jQuery('#listed-features-color-style').change(function(){

        if( jQuery(this).val() === 'background' ){
            jQuery('.ts-border-color').css({'display':'none'});
            jQuery('.ts-background-color').css({'display':''});
        }else if( jQuery(this).val() === 'border' ){
            jQuery('.ts-border-color').css({'display':''});
            jQuery('.ts-background-color').css({'display':'none'});
        }else{
            jQuery('.ts-border-color').css({'display':'none'});
            jQuery('.ts-background-color').css({'display':'none'});
        }
    });

    if( jQuery('#listed-features-color-style').val() == 'background' ){
        jQuery('.ts-border-color').css({'display':'none'});
        jQuery('.ts-background-color').css({'display':''});
     }else if( jQuery('#listed-features-color-style').val() == 'border' ){
        jQuery('.ts-border-color').css({'display':''});
        jQuery('.ts-background-color').css({'display':'none'});
    }else{
        jQuery('.ts-border-color').css({'display':'none'});
        jQuery('.ts-background-color').css({'display':'none'});
    }
}

jQuery(document).ready( function() {

	//save the configoration in page posts
	jQuery(".featured").click(function() {

		var nonce_featured = PhotoedgeAdmin.Nonce;
		var value_checkbox = jQuery(this).val();
		var this_feature = jQuery(this);

		if(jQuery(this).is(":checked")){
			var checked = "yes";
		}else{
			var checked = "no";
		}
		jQuery.ajax({
            url: ajaxurl,
            type : "POST",
            data : "action=pte_updateFeatures&value_checkbox=" + value_checkbox + "&checked=" + checked + '&nonce_featured=' + nonce_featured,
            beforeSend:function(xhr){
            			jQuery('.saved_ajax').remove();
						this_feature.after('<p class="save_ajax">Save...</p>');
			},
			success:function(results){
				jQuery('.save_ajax').remove();
				this_feature.after('<p class="saved_ajax">Saved !</p>');
				object = {
				   func: function() {
				   		jQuery('.saved_ajax').hide(1000);
				   }
				}
				setTimeout( function() { object.func() } , 2000);

			}
		});
	});
});

function tsz_upload_image_social(){
	var custom_uploader = {};
    if (typeof wp.media != 'undefined' && typeof wp.media.frames != 'undefined' && typeof wp.media.frames.file_frame == 'undefined') {
        wp.media.frames.file_frame = {};
    }

    jQuery('.ts-upload-social-image').click(function(e) {
        e.preventDefault();
        var _this     = jQuery(this),
        target_id = _this.attr('id'),
        media_id  = _this.parent().find('[data-role="media-id"]').val();

        if (custom_uploader[target_id]) {
            custom_uploader[target_id].open();
            return;
        }

        custom_uploader[target_id] = wp.media.frames.file_frame[target_id] = wp.media({
            title: 'Choose Image',
            button: {
              text: 'Choose Image'
            },
            library: {
              type: 'image'
            },
            multiple: false,
            selection: [media_id]
        });

        custom_uploader[target_id].on('select', function() {
            var attachment = custom_uploader[target_id].state().get('selection').first().toJSON();
            var slide = _this.parent().parent();
            slide.find('[data-role="media-url"]').val(attachment.url);
            slide.find('[data-role="media-id"]').val(attachment.id);
            return;
        });

        custom_uploader[target_id].open();
    });
}
tsz_upload_image_social();

    // upload files
    function tsz_upload_files(id_button, id_input_hidden, input_value_attachment, text_button, id_div_preview, library){

    	var photoedge_custom_uploader = {};

        jQuery(id_button).click(function(e) {
            e.preventDefault();

            if (typeof wp.media.frames.file_frame == 'undefined') {
                wp.media.frames.file_frame = {};
            }

            var _this     = jQuery(this),
                target_id = _this.attr('id'),
                media_id  = _this.closest('td').find(id_input_hidden).val();

            if (photoedge_custom_uploader[target_id]) {
                photoedge_custom_uploader[target_id].open();
                return;
            }

            photoedge_custom_uploader[target_id] = wp.media.frames.file_frame[target_id] = wp.media({
                title: text_button,
                button: {
                    text: text_button
                },
                library: {
                    type: library
                },
                multiple: false,
                selection: [media_id]
            });

            photoedge_custom_uploader[target_id].on('select', function() {

                var attachment = photoedge_custom_uploader[target_id].state().get('selection').first().toJSON();
                var options = _this.closest('table');

                options.find(input_value_attachment).val(attachment.url);
                options.find(id_input_hidden).val(attachment.id);

                if ( typeof(id_div_preview) !== 'undefined' ) {

	                if( typeof(jQuery(id_div_preview)) !== 'undefined' ){
						var img = jQuery("<img>").attr('src', attachment.url).attr('style', 'max-width:400px');
                        jQuery(id_div_preview).html(img);

					}
				}

                return;
            });

            photoedge_custom_uploader[target_id].open();

        });
	}

	//headings upload font
	tsz_upload_files('#upload_svg','#file_svg','#atachment-svg','Choose font','image');
	tsz_upload_files('#upload_eot','#file_eot','#atachment-eot','Choose font','image');
	tsz_upload_files('#upload_woff','#file_woff','#atachment-woff','Choose font','image');
	tsz_upload_files('#upload_ttf','#file_ttf','#atachment-ttf','Choose font','image');

	//primary upload font
	tsz_upload_files('#upload_primary_svg','#file_primary_svg','#atachment-primary-svg','Choose font','image');
	tsz_upload_files('#upload_primary_eot','#file_primary_eot','#atachment-primary-eot','Choose font','image');
	tsz_upload_files('#upload_primary_woff','#file_primary_woff','#atachment-primary-woff','Choose font','image');
	tsz_upload_files('#upload_primary_ttf','#file_primary_ttf','#atachment-primary-ttf','Choose font','image');

	//primary upload font
	tsz_upload_files('#upload_secondary_svg','#file_secondary_svg','#atachment-secondary-svg','Choose font','image');
	tsz_upload_files('#upload_secondary_eot','#file_secondary_eot','#atachment-secondary-eot','Choose font','image');
	tsz_upload_files('#upload_secondary_woff','#file_secondary_woff','#atachment-secondary-woff','Choose font','image');
	tsz_upload_files('#upload_secondary_ttf','#file_secondary_ttf','#atachment-secondary-ttf','Choose font','image');

	tsz_upload_files('#select-custom-type-video','#select-custom_media_id','#custom-type-upload-videos','Upload video','image');


// Add new items in builder-element
jQuery(document).on('click', '.ts-multiple-add-button', function(event) {
    event.preventDefault();
    var element_name = jQuery(this).attr('data-element-name');
    name_block_items++;
    var sufix = new Date().getTime();
    window.tab_sufix = sufix;
    var item_id = new RegExp('{{item-id}}', 'g');
    var item_number = new RegExp('{{slide-number}}', 'g');

    var items = jQuery('#' + element_name + '_items');
    var name_block_items = jQuery('#' + element_name + '_items > li').length + 1;
    var name_blocks_template = '';
    name_blocks_template = jQuery('#' + element_name + '_items_template').html();

    var template = name_blocks_template.replace(item_id, sufix).replace(item_number, name_block_items);
    items.append(template);

    tsz_slider_pips(0, 100, 1, 0, 'skills-' + sufix + '-percentage-slider', 'skills-' + sufix + '-percentage');

    tsz_upload_files('#uploader_' + sufix, '#slide_media_id-' + sufix, '#' + element_name + '-' + sufix + '-image', 'Insert image', '#image-preview-' + sufix, 'image');

    jQuery('div.' + element_name + '.builder-element .builder-icon-list').each(function(){
        this_id = '#' + jQuery(this).attr('id') + ' li i';
        jQuery('div.' + element_name + '.builder-element .builder-icon-list li i').click(function(){
            targetselect = jQuery(this).parent().parent().attr('data-selector');
            custom_selectors(jQuery(this), targetselect);
        });
    });

    if(element_name == 'listed-features'){
        tsz_listed_features_style_color();
    }

   	tsz_restart_color_picker();

    jQuery(this).parent().find('.ui-sortable > li:last div.hidden').removeClass('hidden');

    tsz_screen_animation_delay();

});


//show/hide the button 'Generate likes' in 'GENERAL OPTIONS' depending of option 'Enable likes'
function tsz_general_options_button_likes(){
    var option_display_mode = jQuery('.enable-likes');
    jQuery(option_display_mode).change(function(){
        if( jQuery(this).val() === 'n' ){
            jQuery(this).parent().parent().parent().find('.icons-likes').closest('tr').css('display', 'none');
            jQuery(this).parent().parent().parent().find('.generate-likes').closest('tr').css('display', 'none');
        }else{
        	jQuery(this).parent().parent().parent().find('.icons-likes').closest('tr').css('display', '');
            jQuery(this).parent().parent().parent().find('.generate-likes').closest('tr').css('display', '');
        }
    });

    if( jQuery(option_display_mode).val() === 'n' ){
        jQuery(option_display_mode).parent().parent().parent().find('.icons-likes').closest('tr').css('display', 'none');
        jQuery(option_display_mode).parent().parent().parent().find('.generate-likes').closest('tr').css('display', 'none');
    }else{
        jQuery(option_display_mode).parent().parent().parent().find('.icons-likes').closest('tr').css('display', '');
        jQuery(option_display_mode).parent().parent().parent().find('.generate-likes').closest('tr').css('display', '');
    }
}
tsz_general_options_button_likes();

function tsz_megamenu_category_enable(){

	jQuery('.ts-menu-category-posts').change(function(){

		if( jQuery(this).val() === 'y' ){
			jQuery(this).parent().next().next('.ts_is_mega_menu_options').css('display', 'none');
			jQuery(this).parent().next().next('.ts_is_mega_menu_options').find('.ts-megamenu-category-posts').removeAttr('checked');
			jQuery(this).parent().next('.field-nr-of-columns').css('display', '');
		}else{
			jQuery(this).parent().next().next('.ts_is_mega_menu_options').css('display', '');
			jQuery(this).parent().next('.field-nr-of-columns').css('display', 'none');
		}
	});

	jQuery('.ts-menu-category-posts').each(function(){
		if( jQuery(this).val() === 'y' ){
			jQuery(this).parent().next().next('.ts_is_mega_menu_options').css('display', 'none');
			jQuery(this).parent().next().next('.ts_is_mega_menu_options').find('.ts-megamenu-category-posts').removeAttr('checked');
			jQuery(this).parent().next('.field-nr-of-columns').css('display', '');

		}else{
			jQuery(this).parent().next().next('.ts_is_mega_menu_options').css('display', '');
			jQuery(this).parent().next('.field-nr-of-columns').hide();
		}
	});
}

jQuery(document).ready(function($){
	tsz_megamenu_category_enable();
});

jQuery('#save-header-footer').on('click', function() {
    window.builderDataChanged = false;
});

var geocoder;
var map, mapLat, mapLng, latlng;

function initialize() {
	if( !jQuery('#builder-elements').hasClass('hidden') ){
		geocoder = new google.maps.Geocoder();
		mapLat = jQuery('#builder-elements > .map').find('#map-latitude').val();
		mapLng = jQuery('#builder-elements > .map').find('#map-longitude').val();

		if( typeof(mapLat) !== 'undefined' && typeof(mapLng) !== 'undefined' && mapLat.length > 0 && mapLng.length > 0 ){
			latlng = new google.maps.LatLng(mapLat, mapLng);
		} else {
			latlng = new google.maps.LatLng(-34.397, 150.644);
		}

		var mapOptions = {
	    	zoom: 13,
	    	center: latlng
	    }
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var marker = new google.maps.Marker({
			map: map,
			position: latlng
		});
	}
}

function codeAddress() {
	var address = document.getElementById('map-address').value;

	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		    setTimeout(function(){
				jQuery('#map-latitude').val(map.getCenter().lat());
				jQuery('#map-longitude').val(map.getCenter().lng());
		    },200);
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
  });
}

function tsz_slider_pips(min, max, step, value, idSlider, idInput){
    jQuery(function() {
        jQuery('#' + idSlider).slider({
            range: "min",
            min: min,
            max: max,
            value: value,
            step: step,
              slide: function(event, ui) {
                jQuery('#' + idInput).val(ui.value);
              }
        });
        jQuery('#' + idInput).val(jQuery('#' + idSlider).slider( "value" ));
    });
}

function tsz_restart_color_picker(){

    jQuery('.colors-section-picker-div').each(function(){
    	jQuery(this).farbtastic(jQuery(this).prev());
    });

    jQuery('.colors-section-picker-div').hide();

    jQuery(".colors-section-picker").click(function(e){
        e.stopPropagation();
        jQuery(jQuery(this).next()).show();
    });

    jQuery('body').click(function() {
        jQuery('.colors-section-picker-div').hide();
    });
}

var delay = (function(){
    var timer = 0;
     return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

jQuery(document).on('keyup', '[type="search"]', function(){

    var _this = jQuery(this);

    delay(function(){
        var filterDivs = jQuery(_this).closest('.ts-icons-container').find('.filter-li');

        if (_this.val() == '') {
            filterDivs.slideDown(500);
        } else {
            var regxp = new RegExp(_this.val()),
                show = filterDivs.filter(function () {
                    return (jQuery(this).attr('data-filter').search(regxp) > -1);
                });
            filterDivs.not(show).slideUp(500);
            show.slideDown(500);
        }
    }, 500);
});

jQuery('.ts-upload').click(function(event){
	var uploader = null,
		_this = jQuery(this);

	if (typeof wp.media.frames.file_frame == 'undefined') {
		wp.media.frames.file_frame = {};
	}

	if(uploader){
		uploader.open();
		return;
	}

	uploader = wp.media({
		title: 'Select the custom icon file (Allowed: eot, svg, ttf, woff, css)',
		button: {
			text: 'Use this file'
		},
		multiple: false
	});

	uploader.on('select', function(){
		var attachment = uploader.state().get('selection').first().toJSON();
		_this.parent().find('[type="hidden"]').val(attachment.id);
		_this.parent().find('[type="text"]').val(attachment.url);
	});

	uploader.open();
});



jQuery('.ts-delete-icon').click(function(){

	var data = {},
		removeIcon = jQuery(this).parent().find('li.selected');

	data['action'] = 'photoedge_delete_custom_icon';
	data['nonce']  = PhotoedgeAdmin.Nonce;
	data['icon']   = removeIcon.attr('data-icon');

	jQuery.post(ajaxurl, data, function(response){
		if( response == 'ok' ){
			if( removeIcon.closest('.builder-icon-list').find('li').length == 1 ){
				removeIcon.closest('.ts-icon-custom').remove();
			}else{
				removeIcon.removeClass('selected').next().addClass('selected');
				removeIcon.remove();
			}
		}
	});
});

jQuery('.ts-delete-icons').click(function(){

	var data = {},
		_this = jQuery(this);

	data['action'] = 'photoedge_delete_custom_icon';
	data['nonce']  = PhotoedgeAdmin.Nonce;
	data['key']   = jQuery(this).attr('data-key');

	jQuery.post(ajaxurl, data, function(response){
		if( response == 'ok' ){
			_this.parent().remove();
		}
	});
});

jQuery('.ts-show-icon').click(function(){
	jQuery(this).parent().find('.ts-icon-container').toggle();
	jQuery(this).parent().find('.ts-delete-icon').toggle();
	jQuery(this).parent().find('.ts-delete-icons').toggle();
});

jQuery('.ts-icon-container, .ts-delete-icon, .ts-delete-icons').hide();

if( jQuery('.publish-changes').length > 0 ){
	jQuery(window).bind('keydown', function(event){
	    if( event.ctrlKey || event.metaKey ){
	        if( String.fromCharCode(event.which).toLowerCase() == 's'){
	        	event.preventDefault();
	        	jQuery('.publish-changes').click();
	        }
	    }
	});
}

jQuery( '.builder-element-icon-toggle' ).each( function() {

    var selectedOptionVal = jQuery( this ).parent().find( 'option:selected' ).attr( 'value' );

    if ( '' != selectedOptionVal && 'undefined' != typeof( selectedOptionVal ) ) {

    	if ( jQuery( this ).find( 'i.' + selectedOptionVal ).length == 0 ) {

    	    jQuery( this ).prepend( "<i class='" + selectedOptionVal + "'></i>" ); //add to button the selected icon
    	}
    }
});

tsz_upload_files('#select_image', '#image_media_id', '#image_url', 'Insert image', '#image_preview', 'image');

jQuery(document).on('click', '.clickable-element', function(){

   	var idSelect       = jQuery(this).closest('ul').attr('data-selector'),
   		newValueSelect = jQuery(this).attr('data-option');

   	jQuery(this).closest('ul').find('.selected').removeClass('selected');
   	jQuery(this).closest('li').addClass('selected');
   	jQuery(idSelect).find('option[selected="selected"]').removeAttr('selected');
   	jQuery(idSelect).find('option[value="' + newValueSelect + '"]').attr('selected','selected');
   	jQuery(idSelect).trigger('change');

});

// Custom selectors

function custom_selectors(selector, targetselect){
    selector_option = jQuery(selector).attr('data-option');
    jQuery(selector).closest('ul.ts-custom-selector').find('.selected').removeClass('selected');
    jQuery(targetselect).find('option[selected="selected"]').removeAttr('selected');
    jQuery(targetselect).find('option[value="' + selector_option + '"]').attr('selected','selected');
    jQuery(selector).closest('li').addClass('selected');
}

function custom_selectors_run(){
    jQuery('.ts-custom-selector').each(function(){
        idSelect = jQuery(this).attr('data-selector');
        value 	 = jQuery(idSelect).val();

        jQuery(this).find('[data-option="' + value + '"]').closest('li').addClass('selected');
        jQuery(idSelect).trigger('change');

        if( jQuery(this).hasClass('builder-icon-list') ){
        	jQuery(this).closest('table').find('.builder-element-icon-toggle a i').remove();
        	jQuery(this).closest('table').find('.builder-element-icon-toggle a').append('<i class="' + value + '"></i>');
        }

    });
}

// Show selected element from elementOptions and hide the rest
function makeSelected (elementOptions, selected) {
    jQuery.each(elementOptions, function(index, el) {
        var element = jQuery(el);
        if (element.hasClass(selected)) {
            element.removeClass('hidden');
        } else {
            if(!element.hasClass('hidden')) {
                element.addClass('hidden');
            }
        }
    });
}

jQuery(document).on('change', '.ts-widget-custom-post', function(){

	jQuery(this).closest('.ts-content-taxonomy').find('.ts-taxonomy').html('');
	jQuery(this).closest('.ts-content-taxonomy').find('.ts-taxonomies').html('');

	if( jQuery(this).val() !== ''){

		var data     = {},
			_this    = jQuery(this),
			name     = _this.closest('.ts-content-taxonomy').find('.ts-taxonomy').attr('data-taxonomy'),
			postType = _this.val();

		data = {
			action   : 'ts_get_taxonomy',
			name     : name,
			postType : postType,
			nonce    : PhotoedgeAdmin.Nonce
		};

		jQuery.post(ajaxurl, data, function(data) {
			_this.closest('.ts-content-taxonomy').find('.ts-taxonomy').html(data);
		});

	}

});

jQuery(document).on('change', '.ts-select-taxonomy', function(){

	jQuery(this).closest('.ts-content-taxonomy').find('.ts-taxonomies').html('');

	if( jQuery(this).val() !== ''){
		var data     = {},
			_this    = jQuery(this),
			name     = _this.closest('.ts-content-taxonomy').find('.ts-taxonomies').attr('data-taxonomies'),
			taxonomy = _this.val();

		data = {
			action   : 'photoedge_get_terms',
			name     : name,
			taxonomy : taxonomy,
			nonce    : PhotoedgeAdmin.Nonce
		};

		jQuery.post(ajaxurl, data, function(data) {
			_this.closest('.ts-content-taxonomy').find('.ts-taxonomies').html(data);
		});

	}
});

function tsz_single_gallery_logics(){
	/* func location: layout-builder.js */
	tsz_logic_exclude({
		mode: 'display_if',
		element: '.meta_title_single_layout input:checked',
		allowed_values: ['gallery-grid', 'gallery-fade-flip'],
		target: '.meta_title_items-per-row',
		trigger: 'change',
	});

	tsz_logic_exclude({
		mode: 'display_if',
		element: '.meta_title_single_layout input:checked',
		allowed_values: ['gallery-grid'],
		target: '.meta_title_grid-gallery-behavior',
		trigger: 'change',
	});

	tsz_logic_exclude({
		mode: 'display_if',
		element: '.meta_title_single_layout input:checked',
		allowed_values: ['gallery-grid', 'gallery-list'],
		target: '.meta_title_effect_scroll',
		trigger: 'change',
	});
};

jQuery('.meta_title_single_layout li').click(function(){
	tsz_single_gallery_logics();
});

function tsz_logic_exclude(logic){
    if( logic.mode == 'display_if' ) {
        var $target = jQuery(logic.target);

        $target.hide();

        jQuery(logic.element).on(logic.trigger, function(){
            var $element = jQuery(this);
            if( jQuery.inArray($element.val(), logic.allowed_values) != -1 ) {
                $target.show();
            } else {
                $target.hide();
            }

            if( typeof logic.callback === "function" ) {
                logic.callback();
            }
        })
    } else if( mode == 'hide_if' ) {
        /* perform logic for hide mode */
    }

    jQuery(document).ready(function(){
        jQuery(logic.element).trigger(logic.trigger);
    });
}


/**	 WordPress 5.0+ Fixes **/
jQuery(window).on('load', function(){

	if ( jQuery('body').hasClass('wp5') ) {
		var builderToggleButton = jQuery('.airkit_builder_btn'),
			builderState = builderToggleButton.attr('data-state');

		jQuery('div.edit-post-header-toolbar').append(builderToggleButton.fadeIn(800));

		// Check if we should hide default editor or show
		if ( builderState == 'enabled' ) {
			airkit_editor_toggler('disabled', false );
		} else {
			airkit_editor_toggler('enabled', false );
		}

		// Do the switch
		jQuery(document).on('click', '.airkit_builder_btn', function(){
			airkit_editor_toggler( jQuery(this).attr('data-state'), true );
		});


		// Function for switching between builder states
		function airkit_editor_toggler(state, doAjax = true) {

			console.log(state);

			// Do the stuff for enabling the builder
			if ( state == 'disabled' ) {

				// Hide Gutenberg Elements part
				jQuery('.editor-block-list__layout').hide();

				// Show Touch Builder Part instead of Gutenberg
				jQuery('#ts_layout_id').addClass('touch-builder-active');

				// Set use template to the right option
				jQuery('#postcustom').find('input[value="ts_use_template"]').closest('td').siblings('td').find('textarea').val(1);

				if ( doAjax == true ) {
					var data = {
							action : 'photoedge_toggle_layout_builder',
							post_id : jQuery('.airkit_builder_btn').attr('data-post-id'),
							state: 'enable',
							nonce  : PhotoedgeAdmin.Nonce
						};

					jQuery.post(ajaxurl, data, function(data) {
						console.log('Touch Builder was Enabled');
					});

					// Set the enabled status in the button
					jQuery('.airkit_builder_btn').attr('data-state', 'enabled');

					jQuery('.airkit_builder_btn').html('Disable Layout Builder');
				}

				// Show the Custom Layout Meta Box
				jQuery('#ts_layout_id').show();
				jQuery('#ts_page_options').hide();
				jQuery('#ts-import-export').show();
                jQuery('#ts_sidebar').hide();

			} else {
				// Do the stuff for disabling the editor

				// Hide Gutenberg Elements part
				jQuery('.editor-block-list__layout').show();

				// Show Touch Builder Part instead of Gutenberg
				jQuery('#ts_layout_id').removeClass('touch-builder-active');

				jQuery('#postcustom').find('input[value="ts_use_template"]').closest('td').siblings('td').find('textarea').val(0);

				if ( doAjax == true ) {
					var data = {
							action : 'photoedge_toggle_layout_builder',
							post_id : jQuery('.airkit_builder_btn').attr('data-post-id'),
							state: 'disable',
							nonce  : PhotoedgeAdmin.Nonce
						};

					jQuery.post(ajaxurl, data, function(data) {
						console.log('Touch Builder was Disabled');
					});

					// Set the disabled status in the button
					jQuery('.airkit_builder_btn').attr('data-state', 'disabled');

					jQuery('.airkit_builder_btn').html('Activate Layout Builder');
				}

				jQuery('#ts_layout_id').hide();
				jQuery('#ts_page_options').show();
				jQuery('#ts-import-export').hide();
                jQuery('#ts_sidebar').show();

			}

		}
	}

});
