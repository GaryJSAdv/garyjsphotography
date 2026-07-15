jQuery(document).ready(function(jQuery) {

    var elementOptions       = jQuery("#builder-elements>div.builder-element"),
    elementType               = jQuery("#ts-element-type");

    // Elements Editor -> Change Element Type
    jQuery(document).on("change", "#ts-element-type", function(event) {
        var selected = jQuery(this).val();
        makeSelected(elementOptions, selected);
    });

    // Lists Portfolios -> How to display
    jQuery(document).on("change", "#list-portfolios-display-mode", function(event) {
        var selected = 'list-portfolios-' + jQuery(this).val();
        makeSelected(jQuery('#list-portfolios-display-mode-options>div'), selected);
    });

    // Lists Posts -> How to display
    jQuery(document).on("change", "#last-posts-display-mode", function(event) {
        var selected = 'last-posts-' + jQuery(this).val();
        makeSelected(jQuery('#last-posts-display-mode-options>div'), selected);
    });

    jQuery(document).on("change", "#list-galleries-display-mode", function(event) {
        var selected = 'list-galleries-' + jQuery(this).val();
        makeSelected(jQuery('#list-galleries-display-mode-options>div'), selected);
    });

    jQuery(document).on("change", "#latest-custom-posts-display-mode", function(event) {
        var selected = 'latest-custom-posts-' + jQuery(this).val();
        makeSelected(jQuery('#latest-custom-posts-display-mode-options>div'), selected);
    });

    // List Videos -> How to display
    jQuery(document).on("change", "#list-videos-display-mode", function(event) {
        var selected = 'list-videos-' + jQuery(this).val();
        makeSelected(jQuery('#list-videos-display-mode-options>div'), selected);
    });

    /**
     * Retrive data from builder element
     */

    jQuery(document).on('click', 'input#builder-save, .ts-save-editor', function(event) {
        event.preventDefault();

        setTimeout(function(){
            jQuery('#ts-builder-elements-modal').css('opacity',1);
        }, 500);

        var elementType, elements, dataAttr, gridMode, listMode, thumbnailsMode, galleryMode, superPostMode, timelineMode;

        elementType = jQuery('#builder-elements').attr('data-element-type');
        elementName = jQuery('#builder-elements .element-title').text();

        if (elementType === 'logo') {

            dataAttr = {};
            dataAttr['element-type'] = 'logo';
            elements = jQuery("#builder-elements> .logo");
            dataAttr['logo-align'] = elements.find("#logo-align").val();
            dataAttr['logo-effect'] = elements.find("#logo-effect").val();
            dataAttr['logo-effect-delay'] = elements.find("#logo-effect-delay").val();

        } else if (elementType === 'instance') {

            elements = jQuery("#builder-elements>.instance");

            dataAttr = {};
            dataAttr['element-type'] = 'instance';
            dataAttr['admin-label'] = elements.find("#instance-admin-label").val();
            dataAttr['title'] = elements.find('#instance-title').val();
            dataAttr['image'] = elements.find('#instance-image-url').val();
            dataAttr['align'] = elements.find("#instance-align").val();
            dataAttr['button-url'] = elements.find('#instance-button-url').val();
            dataAttr['button-target'] = elements.find('#instance-button-target').val();
            dataAttr['button-text'] = elements.find('#instance-button-text').val();
            dataAttr['content'] = elements.find("#instance-content").val();

            if( elements.find('#instance-admin-label').val().length > 0 ){
                elementName = elements.find('#instance-admin-label').val();
            }

        } else if (elementType === 'featured-article') {

            dataAttr = {};
            elements = jQuery("#builder-elements>.featured-article");
            dataAttr['element-type'] = 'featured-article';
            dataAttr['post-id'] = elements.find('input[name=postID]:checked').val();
            dataAttr['post-title'] = elements.find('label[for="' + elements.find('input[name=postID]:checked').attr('id') + '"]').text();
            dataAttr['showImage'] = elements.find('#featured-article-showImage').val();
            dataAttr['showMeta'] = elements.find('#featured-article-showMeta').val();

        }   else if (elementType === 'cart') {

            dataAttr = {};
            dataAttr['element-type'] = 'cart';
            elements = jQuery("#builder-elements>.cart");
            dataAttr['cart-align'] = elements.find("#cart-align").val();


        } else if (elementType === 'breadcrumbs') {

            dataAttr = {};
            dataAttr['element-type'] = 'breadcrumbs';
            elements = jQuery("#builder-elements>.breadcrumbs");

        } else if (elementType === 'social-buttons') {

            dataAttr = {};
            dataAttr['element-type'] = 'social-buttons';
            elements = jQuery("#builder-elements>.social-buttons");

            dataAttr['admin-label'] = elements.find('#social-buttons-admin-label').val();
            dataAttr['social-align'] = elements.find('#social-align').val();
            dataAttr['labels'] = elements.find('#social-labels').val();

            if( elements.find('#social-buttons-admin-label').val().length > 0 ){
               elementName = elements.find('#social-buttons-admin-label').val();
            }

        } else if (elementType === 'searchbox') {

            elements = jQuery("#builder-elements>.searchbox");
            dataAttr = {};
            dataAttr['element-type'] = 'searchbox';
            dataAttr['align'] = elements.find("#searchbox-align").val();
            dataAttr['show-mobile'] = elements.find("#searchbox-show-mobile").val();

        } else if (elementType === 'menu') {

            elements = jQuery("#builder-elements>.menu");
            dataAttr = {};
            dataAttr['element-type'] = 'menu';
            dataAttr['element-style'] = elements.find("#menu-styles option:selected").val();
            dataAttr['sidebar-menu-style'] = elements.find('#sidebar-menu-style option:selected').val();
            dataAttr['menu-custom'] = elements.find("#menu-custom").val();
            dataAttr['menu-bg-color'] = elements.find("#menu-element-bg-color").val();
            dataAttr['menu-text-color'] = elements.find("#menu-element-text-color").val();
            dataAttr['menu-bg-color-hover'] = elements.find("#menu-element-bg-color-hover").val();
            dataAttr['menu-text-color-hover'] = elements.find("#menu-element-text-color-hover").val();
            dataAttr['submenu-bg-color'] = elements.find("#menu-element-submenu-bg-color").val();
            dataAttr['submenu-text-color'] = elements.find("#menu-element-submenu-text-color").val();
            dataAttr['submenu-bg-color-hover'] = elements.find("#menu-element-submenu-bg-color-hover").val();
            dataAttr['submenu-text-color-hover'] = elements.find("#menu-element-submenu-text-color-hover").val();
            dataAttr['menu-text-align'] = elements.find("#menu-text-align").val();
            dataAttr['admin-label'] = elements.find("#menu-admin-label").val();
            dataAttr['uppercase'] = elements.find("#menu-uppercase").val();
            dataAttr['name'] = elements.find("#menu-name").val();
            dataAttr['icons'] = elements.find("#menu-icons").val();
            dataAttr['description'] = elements.find("#menu-description").val();
            dataAttr['search-icon'] = elements.find("#menu-search-icon").val();
            dataAttr['cart-element'] = elements.find("#menu-cart-element").val();
            dataAttr['social-icons'] = elements.find("#menu-social-icons").val();
            dataAttr['hide-decoration'] = elements.find("#hide-decoration").val();
            dataAttr['font-type'] = elements.find("#menu-font-type").val();
            dataAttr['font-name'] = elements.find("#fontchanger-menu").val();
            dataAttr['font-weight'] = elements.find("#ts-menu-font-weight").val();
            dataAttr['font-style'] = elements.find("#ts-menu-font-style").val();
            dataAttr['font-size'] = elements.find("#ts-menu-font-size").val();
            dataAttr['font-demo'] = elements.find("#menu-demo").val();
            dataAttr['show-mobile'] = elements.find("#menu-show-mobile").val();

            if( dataAttr['font-type'] == 'google' ){
                var subsets = '',
                    inputs = jQuery('.menu-font-subsets').find('input:checked').length - 1;

                jQuery('.menu-font-subsets').find('input:checked').each(function(i, v){
                    if( i == inputs ){
                        subsets += jQuery(this).val();
                    }else{
                        subsets += jQuery(this).val() + ',';
                    }
                });
                dataAttr['font-subsets'] = subsets;
            }

            if( elements.find('#menu-admin-label').val().length > 0 ){
               elementName = elements.find('#menu-admin-label').val();
            }

        } else if (elementType === 'skills') {

            elements = jQuery("#builder-elements>.skills");

            items_array = '[';
            jQuery('#skills_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#skills_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_percentage = jQuery(this).find('[data-builder-name="percentage"]').val();
                item_color = jQuery(this).find('[data-builder-name="color"]').val();

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"title":' + '"' + item_title + '"' + ',"percentage":' + '"' + item_percentage + '"' + ',"color":' + '"' + item_color + '"' + '}' + comma;

            });

            items_array = items_array + ']';
            jQuery('#skills_content').val(items_array);

            dataAttr = {};
            dataAttr['element-type'] = 'skills';
            dataAttr['admin-label'] = elements.find("#skills-admin-label").val();
            dataAttr['display-mode'] = elements.find("#skills-display-mode").val();
            dataAttr['skills'] = elements.find('#skills_content').val();

            if( elements.find('#skills-admin-label').val().length > 0 ){
                elementName = elements.find('#skills-admin-label').val();
            }

        } else if (elementType === 'image-carousel') {

            elements = jQuery("#builder-elements>.image-carousel");
            dataAttr = {};
            dataAttr['element-type'] = 'image-carousel';
            dataAttr['carousel-height'] = elements.find("#carousel_height").val();
            dataAttr['images'] = elements.find("#carousel_image_gallery").val();
            dataAttr['admin-label'] = elements.find("#image-carousel-admin-label").val();

        } else if (elementType === 'boca' || elementType === 'nona') {

            elements = jQuery("#builder-elements>." + elementType);
            postType = elements.find("#" + elementType + "-custom-post").val();
            dataAttr = {};

            dataAttr['element-type'] = elementType;
            dataAttr['admin-label'] = elements.find("#" + elementType + "-admin-label").val();
            dataAttr['custom-post'] = postType;
            dataAttr['category'] = elements.find("#" + elementType + "-categories-" + postType).val();
            dataAttr['orderby'] = elements.find("#" + elementType + "-orderby").val();
            dataAttr['order'] = elements.find("#" + elementType + "-order").val();
            dataAttr['featured'] = elements.find("#" + elementType + "-featured").val();
            dataAttr['posts_per_page'] = elements.find("#" + elementType + "-posts_per_page").val();

            if( elements.find('#'+ elementType +'-admin-label').val().length > 0 ){
               elementName = elements.find('#'+ elementType +'-admin-label').val();
            }

        } else if (elementType === 'sidebar') {

            elements = jQuery("#builder-elements>.sidebar");
            dataAttr = {};
            dataAttr['element-type'] = 'sidebar';
            dataAttr['sidebar-id'] = elements.find("#ts_sidebar_sidebars option:selected").val();
            dataAttr['sidebar-sticky'] = elements.find("#sidebar-sticky option:selected").val();
            dataAttr['admin-label'] = elements.find("#sidebar-admin-label").val();

            if( elements.find('#sidebar-admin-label').val().length > 0 ){
               elementName = elements.find('#sidebar-admin-label').val();
            }

        } else if (elementType === 'slider') {

            elements = jQuery("#builder-elements>.slider");
            dataAttr = {};

            dataAttr['element-type'] = 'slider';
            dataAttr['slider-id'] = elements.find("#slider-name option:selected").val();
            dataAttr['admin-label'] = elements.find("#slider-admin-label").val();

            if( elements.find('#slider-admin-label').val().length > 0 ){
               elementName = elements.find('#slider-admin-label').val();
            }


        } else if (elementType === 'list-portfolios') {

            elements = jQuery("#builder-elements>.list-portfolios");
            dataAttr = {};

            dataAttr['element-type'] = 'list-portfolios';
            dataAttr['category'] = elements.find('select#list-portfolios-category').val();
            dataAttr['display-mode'] = elements.find('select#list-portfolios-display-mode').val();
            dataAttr['admin-label'] = elements.find("#list-portfolios-admin-label").val();

            if( elements.find('#list-portfolios-admin-label').val().length > 0 ){
               elementName = elements.find('#list-portfolios-admin-label').val();
            }

            if (dataAttr['display-mode'] === 'grid') {

                gridMode = elements.find("#list-portfolios-display-mode-options>.list-portfolios-grid");
                dataAttr['behavior'] = gridMode.find('#list-portfolios-grid-behavior').val();
                dataAttr['display-title'] = gridMode.find('#list-portfolios-grid-title').val();
                dataAttr['show-meta'] = gridMode.find('#list-portfolios-grid-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['elements-per-row'] = gridMode.find('#list-portfolios-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#list-portfolios-grid-el-per-row').val();
                dataAttr['elements-per-row'] = gridMode.find('#list-portfolios-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#list-portfolios-grid-nr-of-posts').val();
                dataAttr['order-by'] = gridMode.find('#list-portfolios-grid-order-by').val();
                dataAttr['order-direction'] = gridMode.find('#list-portfolios-grid-order-direction').val();
                dataAttr['special-effects'] = gridMode.find('#list-portfolios-grid-special-effects').val();

            } else if (dataAttr['display-mode'] === 'list') {

                listMode = elements.find("#list-portfolios-display-mode-options>.list-portfolios-list");
                dataAttr['display-title'] = listMode.find('#list-portfolios-list-title').val();
                dataAttr['show-meta'] = listMode.find('#list-portfolios-list-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = listMode.find('#list-portfolios-list-nr-of-posts').val();
                dataAttr['order-by'] = listMode.find('#list-portfolios-list-order-by').val();
                dataAttr['order-direction'] = listMode.find('#list-portfolios-list-order-direction').val();
                dataAttr['related-posts'] = listMode.find('#list-portfolios-list-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = listMode.find('#list-portfolios-list-special-effects').val();

            } else if (dataAttr['display-mode'] === 'thumbnails') {

                thumbnailsMode = elements.find("#list-portfolios-display-mode-options>.list-portfolios-thumbnails");
                dataAttr['display-title'] = thumbnailsMode.find('#list-portfolios-thumbnail-title').val();
                dataAttr['behavior'] = thumbnailsMode.find('#list-portfolios-thumbnail-behavior').val();
                dataAttr['elements-per-row'] = thumbnailsMode.find("#list-portfolios-thumbnail-posts-per-row").val();
                dataAttr['posts-limit'] = thumbnailsMode.find("#list-portfolios-thumbnail-limit").val();
                dataAttr['order-by'] = thumbnailsMode.find('#list-portfolios-thumbnail-order-by').val();
                dataAttr['order-direction'] = thumbnailsMode.find('#list-portfolios-thumbnail-order-direction').val();
                dataAttr['special-effects'] = thumbnailsMode.find('#list-portfolios-thumbnail-special-effects').val();
                dataAttr['gutter'] = thumbnailsMode.find('#list-portfolios-thumbnail-gutter').val();

            } else if (dataAttr['display-mode'] === 'big-post') {

                bigPostMode = elements.find("#list-portfolios-display-mode-options>.list-portfolios-big-post");
                dataAttr['show-meta'] = bigPostMode.find('#list-portfolios-big-post-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = bigPostMode.find('#list-portfolios-big-post-nr-of-posts').val();
                dataAttr['image-split'] = bigPostMode.find('#list-portfolios-big-post-image-split').val();
                dataAttr['order-by'] = bigPostMode.find('#list-portfolios-big-post-order-by').val();
                dataAttr['order-direction'] = bigPostMode.find('#list-portfolios-big-post-order-direction').val();
                dataAttr['related-posts'] = bigPostMode.find('#list-portfolios-big-post-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = bigPostMode.find('#list-portfolios-big-post-special-effects').val();

            } else if (dataAttr['display-mode'] === 'super-post') {

                superPostMode = elements.find("#list-portfolios-display-mode-options>.list-portfolios-super-post");
                dataAttr['elements-per-row'] = superPostMode.find("#list-portfolios-super-post-posts-per-row").val();
                dataAttr['posts-limit'] = superPostMode.find('#list-portfolios-super-post-limit').val();
                dataAttr['order-by'] = superPostMode.find('#list-portfolios-super-post-order-by').val();
                dataAttr['order-direction'] = superPostMode.find('#list-portfolios-super-post-order-direction').val();
                dataAttr['related-posts'] = superPostMode.find('#list-portfolios-super-post-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = superPostMode.find('#list-portfolios-super-post-special-effects').val();

            } else if (dataAttr['display-mode'] === 'mosaic') {

                mosaicMode = elements.find("#list-portfolios-display-mode-options>.list-portfolios-mosaic");
                dataAttr['order-by'] = mosaicMode.find('#list-portfolios-mosaic-order-by').val();
                dataAttr['order-direction'] = mosaicMode.find('#list-portfolios-mosaic-order-direction').val();
                dataAttr['effects-scroll'] = mosaicMode.find('#list-portfolios-mosaic-effects').val();
                dataAttr['gutter'] = mosaicMode.find('#list-portfolios-mosaic-gutter').val();
                dataAttr['layout'] = mosaicMode.find('#list-portfolios-mosaic-layout').val();
                dataAttr['rows'] = mosaicMode.find('#list-portfolios-mosaic-rows').val();
                dataAttr['scroll'] = mosaicMode.find('#list-portfolios-mosaic-scroll').val();
                dataAttr['pagination'] = mosaicMode.find('#list-portfolios-mosaic-pagination').val();

                if( dataAttr['layout'] == 'rectangles' ){
                    dataAttr['posts-limit'] = mosaicMode.find("#list-portfolios-mosaic-post-limit-rows-" + dataAttr['rows'] + "").val();
                }else{
                    dataAttr['posts-limit'] = mosaicMode.find("#list-portfolios-mosaic-post-limit-rows-squares").val();
                }

            }

        } else if (elementType === 'testimonials') {

            elements = jQuery("#builder-elements>.testimonials");

            items_array = '[';
            jQuery('#testimonials_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#testimonials_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_image = jQuery(this).find('[data-role="media-url"]').val().replace(/"/g, '--quote--');
                item_text = jQuery(this).find('[data-builder-name="text"]').val().replace(/"/g, '--quote--').replace(/\r?\n/g, '<br />');
                item_name = jQuery(this).find('[data-builder-name="name"]').val().replace(/"/g, '--quote--');
                item_company = jQuery(this).find('[data-builder-name="company"]').val().replace(/"/g, '--quote--');
                item_url = jQuery(this).find('[data-builder-name="url"]').val().replace(/"/g, '--quote--');

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"image":' + '"' + item_image + '"' + ',"text":' + '"' + item_text + '"' + ',"name":' + '"' + item_name + '"' + ',"company":' + '"' + item_company + '"' + ',"url":' + '"' + item_url + '"' + '}' + comma;

            });

            items_array = items_array + ']';
            jQuery('#testimonials_content').val(items_array);
            dataAttr = {};

            dataAttr['elements-per-row'] = isNaN(parseInt(elements.find('#testimonials-row').val(), 10)) ? 3 : parseInt(elements.find('#testimonials-row').val(), 10);
            dataAttr['enable-carousel'] = elements.find('#testimonials-enable-carousel').val();
            dataAttr['element-type'] = 'testimonials';
            dataAttr['testimonials'] = elements.find('#testimonials_content').val();
            dataAttr['admin-label'] = elements.find("#testimonials-admin-label").val();

            if( elements.find('#testimonials-admin-label').val().length > 0 ){
                elementName = elements.find('#testimonials-admin-label').val();
            }

        } else if (elementType === 'tab') {

            elements = jQuery("#builder-elements>.tab");

            items_array = '[';
            jQuery('#tab_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#tab_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_text = jQuery(this).find('[data-builder-name="text"]').val().replace(/"/g, '--quote--').replace(/\r?\n/g, '<br />');

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"title":' + '"' + item_title + '"' + ',"text":' + '"' + item_text + '"' + '}' + comma;

            });

            items_array = items_array + ']';
            jQuery('#tab_content').val(items_array);
            dataAttr = {};

            dataAttr['element-type'] = 'tab';
            dataAttr['tab'] = elements.find('#tab_content').val();
            dataAttr['admin-label'] = elements.find("#tab-admin-label").val();
            dataAttr['mode'] = elements.find("#tab-mode").val();

            if( elements.find('#tab-admin-label').val().length > 0 ){
                elementName = elements.find('#tab-admin-label').val();
            }

        } else if (elementType === 'video-carousel') {

            elements = jQuery("#builder-elements>.video-carousel");

            items_array = '[';
            jQuery('#video-carousel_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#video-carousel_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_url = jQuery(this).find('[data-builder-name="url"]').val().replace(/"/g, '--quote--');
                item_embed = jQuery(this).find('[data-builder-name="embed"]').val().replace(/"/g, '--quote--');
                item_text = jQuery(this).find('[data-builder-name="text"]').val().replace(/"/g, '--quote--').replace(/\r?\n/g, '<br />');

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"title":' + '"' + item_title + '"' + ',"text":' + '"' + item_text + '"' + ',"url":' + '"' + item_url + '"' + ',"embed":' + '"' + item_embed + '"' + '}' + comma;

            });

            items_array = items_array + ']';
            jQuery('#video-carousel_content').val(items_array);
            dataAttr = {};

            dataAttr['element-type'] = 'video-carousel';
            dataAttr['video-carousel'] = elements.find('#video-carousel_content').val();
            dataAttr['admin-label'] = elements.find("#video-carousel-admin-label").val();
            dataAttr['source'] = elements.find("#video-carousel-source").val();

            if( elements.find('#video-carousel-admin-label').val().length > 0 ){
                elementName = elements.find('#video-carousel-admin-label').val();
            }

        } else if (elementType === 'grease-slider') {

            elements = jQuery("#builder-elements>.grease-slider");
            dataAttr = {};
            dataAttr['element-type'] = 'grease-slider';
            dataAttr['grease-slider'] = elements.find('#grease-slider').val();
            dataAttr['admin-label'] = elements.find("#grease-slider-admin-label").val();
            dataAttr['source'] = elements.find("#grease-slider-source").val();
            dataAttr['source'] = elements.find("#grease-slider-source").val();

            if( elements.find('#grease-slider-admin-label').val().length > 0 ){
                elementName = elements.find('#grease-slider-admin-label').val();
            }

        } else if (elementType === 'elastic-slider') {

            elements = jQuery("#builder-elements>.elastic-slider");
            dataAttr = {};
            dataAttr['element-type'] = 'elastic-slider';
            dataAttr['elastic-slider'] = elements.find('#elastic-slider').val();
            dataAttr['admin-label'] = elements.find("#elastic-slider-admin-label").val();
            dataAttr['source'] = elements.find("#elastic-slider-source").val();
            dataAttr['source'] = elements.find("#elastic-slider-source").val();

            if( elements.find('#elastic-slider-admin-label').val().length > 0 ){
                elementName = elements.find('#elastic-slider-admin-label').val();
            }

        } else if (elementType === 'count-down') {

            elements = jQuery("#builder-elements>.count-down");
            dataAttr = {};

            dataAttr['element-type'] = 'count-down';
            dataAttr['admin-label'] = elements.find("#count-down-admin-label").val();
            dataAttr['title'] = elements.find("#count-down-title").val();
            dataAttr['date'] = elements.find("#count-down-date").val();
            dataAttr['hours'] = elements.find("#count-down-hours").val();
            dataAttr['style'] = elements.find("#count-down-style").val();

            if( elements.find('#count-down-admin-label').val().length > 0 ){
                elementName = elements.find('#count-down-admin-label').val();
            }

        } else if (elementType === 'list-products') {

            elements = jQuery("#builder-elements>.list-products");
            dataAttr = {};

            dataAttr['element-type'] = 'list-products';
            dataAttr['category'] = elements.find('select#list-products-category').val();
            dataAttr['admin-label'] = elements.find("#list-products-admin-label").val();

            if( elements.find('#list-products-admin-label').val().length > 0 ){
                elementName = elements.find('#list-products-admin-label').val();
            }

            gridMode = elements.find("#list-products-options>.list-products");
            dataAttr['behavior'] = gridMode.find('#list-products-behavior').val();
            dataAttr['elements-per-row'] = gridMode.find('#list-products-el-per-row').val();
            dataAttr['posts-limit'] = gridMode.find('#list-products-el-per-row').val();
            dataAttr['elements-per-row'] = gridMode.find('#list-products-el-per-row').val();
            dataAttr['posts-limit'] = gridMode.find('#list-products-nr-of-posts').val();
            dataAttr['order-by'] = gridMode.find('#list-products-order-by').val();
            dataAttr['order-direction'] = gridMode.find('#list-products-order-direction').val();
            dataAttr['special-effects'] = gridMode.find('#list-products-special-effects').val();

        } else if (elementType === 'last-posts') {

            elements = jQuery("#builder-elements>.last-posts");
            dataAttr = {};

            dataAttr['element-type'] = 'last-posts';
            dataAttr['category'] = elements.find('select#last-posts-category').val();
            dataAttr['display-mode'] = elements.find('select#last-posts-display-mode').val();
            dataAttr['id-exclude'] = elements.find('#last-posts-exclude').val();
            dataAttr['exclude-first'] = elements.find('#last-posts-exclude-first').val();
            dataAttr['admin-label'] = elements.find("#last-posts-admin-label").val();
            dataAttr['featured'] = elements.find("#last-posts-featured").val();
            dataAttr['side-content'] = elements.find("#last-posts-side-content").val();

            if( elements.find('#last-posts-admin-label').val().length > 0 ){
                elementName = elements.find('#last-posts-admin-label').val();
            }

            if (dataAttr['display-mode'] === 'grid') {

                gridMode = elements.find("#last-posts-display-mode-options>.last-posts-grid");
                dataAttr['behavior'] = gridMode.find('#last-posts-grid-behavior').val();
                dataAttr['display-title'] = gridMode.find('#last-posts-grid-title').val();
                dataAttr['show-meta'] = gridMode.find('#last-posts-grid-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['elements-per-row'] = gridMode.find('#last-posts-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#last-posts-grid-nr-of-posts').val();
                dataAttr['order-by'] = gridMode.find('#last-posts-grid-order-by').val();
                dataAttr['order-direction'] = gridMode.find('#last-posts-grid-order-direction').val();
                dataAttr['special-effects'] = gridMode.find('#last-posts-grid-special-effects').val();
                dataAttr['pagination'] = gridMode.find('#last-posts-grid-pagination').val();
                dataAttr['related-posts'] = gridMode.find('#last-posts-grid-related').val();
                dataAttr['show-image'] = gridMode.find('#last-posts-grid-image').val();

            } else if (dataAttr['display-mode'] === 'list') {

                listMode = elements.find("#last-posts-display-mode-options>.last-posts-list");
                dataAttr['display-title'] = listMode.find('#last-posts-list-title').val();
                dataAttr['show-meta'] = listMode.find('#last-posts-list-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = listMode.find('#last-posts-list-nr-of-posts').val();
                dataAttr['order-by'] = listMode.find('#last-posts-list-order-by').val();
                dataAttr['order-direction'] = listMode.find('#last-posts-list-order-direction').val();
                dataAttr['related-posts'] = listMode.find('#last-posts-list-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = listMode.find('#last-posts-list-special-effects').val();
                dataAttr['pagination'] = listMode.find('#last-posts-list-pagination').val();
                dataAttr['show-image'] = listMode.find('#last-posts-list-image').val();

            } else if (dataAttr['display-mode'] === 'thumbnails') {

                thumbnailsMode = elements.find("#last-posts-display-mode-options>.last-posts-thumbnails");
                dataAttr['display-title'] = thumbnailsMode.find('#last-posts-thumbnail-title').val();
                dataAttr['behavior'] = thumbnailsMode.find('#last-posts-thumbnails-behavior').val();
                dataAttr['elements-per-row'] = thumbnailsMode.find("#last-posts-thumbnail-posts-per-row").val();
                dataAttr['posts-limit'] = thumbnailsMode.find("#last-posts-thumbnail-limit").val();
                dataAttr['order-by'] = thumbnailsMode.find('#last-posts-thumbnail-order-by').val();
                dataAttr['order-direction'] = thumbnailsMode.find('#last-posts-thumbnails-order-direction').val();
                dataAttr['special-effects'] = thumbnailsMode.find('#last-posts-thumbnail-special-effects').val();
                dataAttr['gutter'] = thumbnailsMode.find('#last-posts-thumbnail-gutter').val();
                dataAttr['meta-thumbnail'] = thumbnailsMode.find('#last-posts-thumbnail-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['pagination'] = thumbnailsMode.find('#last-posts-thumbnails-pagination').val();

            } else if (dataAttr['display-mode'] === 'big-post') {

                bigPostMode = elements.find("#last-posts-display-mode-options>.last-posts-big-post");
                dataAttr['show-meta'] = bigPostMode.find('#last-posts-big-post-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = bigPostMode.find('#last-posts-big-post-nr-of-posts').val();
                dataAttr['image-split'] = bigPostMode.find('#last-posts-big-post-image-split').val();
                dataAttr['order-by'] = bigPostMode.find('#last-posts-big-post-order-by').val();
                dataAttr['order-direction'] = bigPostMode.find('#last-posts-big-post-order-direction').val();
                dataAttr['related-posts'] = bigPostMode.find('#last-posts-big-post-related').val();
                dataAttr['special-effects'] = bigPostMode.find('#last-posts-big-post-special-effects').val();
                dataAttr['pagination'] = bigPostMode.find('#last-posts-big-post-pagination').val();
                dataAttr['image-position'] = bigPostMode.find('#last-posts-big-post-image-position').val();
                dataAttr['excerpt'] = bigPostMode.find('#last-posts-big-post-excerpt').val();
                dataAttr['carousel'] = bigPostMode.find('#last-posts-big-post-carousel').val();
                dataAttr['show-image'] = bigPostMode.find('#last-posts-big-post-image').val();

            } else if (dataAttr['display-mode'] === 'timeline') {

                timelineMode = elements.find("#last-posts-display-mode-options>.last-posts-timeline");
                dataAttr['display-title'] = timelineMode.find('#last-posts-timeline-title').val();
                dataAttr['show-meta'] = timelineMode.find('#last-posts-timeline-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = timelineMode.find('#last-posts-timeline-post-limit').val();
                dataAttr['image'] = timelineMode.find('#last-posts-timeline-image').val();
                dataAttr['order-by'] = timelineMode.find('#last-posts-timeline-order-by').val();
                dataAttr['order-direction'] = timelineMode.find('#last-posts-timeline-order-direction').val();
                dataAttr['pagination'] = timelineMode.find('#last-posts-timeline-pagination').val();

            } else if (dataAttr['display-mode'] === 'mosaic') {

                mosaicMode = elements.find("#last-posts-display-mode-options>.last-posts-mosaic");
                dataAttr['order-by'] = mosaicMode.find('#last-posts-mosaic-order-by').val();
                dataAttr['order-direction'] = mosaicMode.find('#last-posts-mosaic-order-direction').val();
                dataAttr['effects-scroll'] = mosaicMode.find('#last-posts-mosaic-effects').val();
                dataAttr['gutter'] = mosaicMode.find('#last-posts-mosaic-gutter').val();
                dataAttr['layout'] = mosaicMode.find('#last-posts-mosaic-layout').val();
                dataAttr['rows'] = mosaicMode.find('#last-posts-mosaic-rows').val();
                dataAttr['scroll'] = mosaicMode.find('#last-posts-mosaic-scroll').val();
                dataAttr['pagination'] = mosaicMode.find('#last-posts-mosaic-pagination').val();

                if( dataAttr['layout'] == 'rectangles' ){
                    dataAttr['posts-limit'] = mosaicMode.find("#last-posts-mosaic-post-limit-rows-" + dataAttr['rows'] + "").val();
                }else{
                    dataAttr['posts-limit'] = mosaicMode.find("#last-posts-mosaic-post-limit-rows-squares").val();
                }

            } else if (dataAttr['display-mode'] === 'super-post') {

                superPostMode = elements.find("#last-posts-display-mode-options>.last-posts-super-post");
                dataAttr['elements-per-row'] = superPostMode.find("#last-posts-super-post-posts-per-row").val();
                dataAttr['posts-limit'] = superPostMode.find('#last-posts-super-post-limit').val();
                dataAttr['order-by'] = superPostMode.find('#last-posts-super-post-order-by').val();
                dataAttr['order-direction'] = superPostMode.find('#last-posts-super-post-order-direction').val();
                dataAttr['related-posts'] = superPostMode.find('#last-posts-super-post-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = superPostMode.find('#last-posts-super-post-special-effects').val();
                dataAttr['pagination'] = superPostMode.find('#last-posts-super-post-pagination').val();
            }

        } else if (elementType === 'list-galleries') {

            elements = jQuery("#builder-elements>.list-galleries");
            dataAttr = {};

            dataAttr['element-type'] = 'list-galleries';
            dataAttr['category'] = elements.find('select#list-galleries-category').val();
            dataAttr['display-mode'] = elements.find('select#list-galleries-display-mode').val();
            dataAttr['id-exclude'] = elements.find('#list-galleries-exclude').val();
            dataAttr['exclude-first'] = elements.find('#list-galleries-exclude-first').val();
            dataAttr['admin-label'] = elements.find("#list-galleries-admin-label").val();
            dataAttr['featured'] = elements.find("#list-galleries-featured").val();
            dataAttr['side-content'] = elements.find("#list-galleries-side-content").val();

            if( elements.find('#list-galleries-admin-label').val().length > 0 ){
                elementName = elements.find('#list-galleries-admin-label').val();
            }

            if (dataAttr['display-mode'] === 'grid') {

                gridMode = elements.find("#list-galleries-display-mode-options>.list-galleries-grid");
                dataAttr['behavior'] = gridMode.find('#list-galleries-grid-behavior').val();
                dataAttr['display-title'] = gridMode.find('#list-galleries-grid-title').val();
                dataAttr['show-meta'] = gridMode.find('#list-galleries-grid-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['elements-per-row'] = gridMode.find('#list-galleries-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#list-galleries-grid-el-per-row').val();
                dataAttr['elements-per-row'] = gridMode.find('#list-galleries-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#list-galleries-grid-nr-of-posts').val();
                dataAttr['order-by'] = gridMode.find('#list-galleries-grid-order-by').val();
                dataAttr['order-direction'] = gridMode.find('#list-galleries-grid-order-direction').val();
                dataAttr['special-effects'] = gridMode.find('#list-galleries-grid-special-effects').val();
                dataAttr['pagination'] = gridMode.find('#list-galleries-grid-pagination').val();
                dataAttr['related-posts'] = gridMode.find('#list-galleries-grid-related').val();
                dataAttr['show-image'] = gridMode.find('#list-galleries-grid-image').val();

            } else if (dataAttr['display-mode'] === 'list') {

                listMode = elements.find("#list-galleries-display-mode-options>.list-galleries-list");
                dataAttr['display-title'] = listMode.find('#list-galleries-list-title').val();
                dataAttr['show-meta'] = listMode.find('#list-galleries-list-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = listMode.find('#list-galleries-list-nr-of-posts').val();
                dataAttr['order-by'] = listMode.find('#list-galleries-list-order-by').val();
                dataAttr['order-direction'] = listMode.find('#list-galleries-list-order-direction').val();
                dataAttr['related-posts'] = listMode.find('#list-galleries-list-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = listMode.find('#list-galleries-list-special-effects').val();
                dataAttr['pagination'] = listMode.find('#list-galleries-list-pagination').val();
                dataAttr['show-image'] = listMode.find('#list-galleries-list-image').val();

            } else if (dataAttr['display-mode'] === 'post-scroll') {

                scrollMode = elements.find("#list-galleries-display-mode-options>.list-galleries-post-scroll");
                dataAttr['display-title'] = scrollMode.find('#list-galleries-post-scroll-title').val();
                dataAttr['posts-limit'] = scrollMode.find('#list-galleries-post-scroll-nr-of-posts').val();
                dataAttr['image-split'] = scrollMode.find('#list-galleries-post-scroll-image-split').val();
                dataAttr['order-by'] = scrollMode.find('#list-galleries-post-scroll-order-by').val();
                dataAttr['order-direction'] = scrollMode.find('#list-galleries-post-scroll-order-direction').val();
                dataAttr['related-posts'] = scrollMode.find('#list-galleries-post-scroll-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = scrollMode.find('#list-galleries-post-scroll-special-effects').val();
                dataAttr['show-image'] = scrollMode.find('#list-galleries-post-scroll-image').val();

            } else if (dataAttr['display-mode'] === 'thumbnails') {

                thumbnailsMode = elements.find("#list-galleries-display-mode-options>.list-galleries-thumbnails");
                dataAttr['display-title'] = thumbnailsMode.find('#list-galleries-thumbnail-title').val();
                dataAttr['behavior'] = thumbnailsMode.find('#list-galleries-thumbnails-behavior').val();
                dataAttr['elements-per-row'] = thumbnailsMode.find("#list-galleries-thumbnail-posts-per-row").val();
                dataAttr['posts-limit'] = thumbnailsMode.find("#list-galleries-thumbnail-limit").val();
                dataAttr['order-by'] = thumbnailsMode.find('#list-galleries-thumbnail-order-by').val();
                dataAttr['order-direction'] = thumbnailsMode.find('#list-galleries-thumbnails-order-direction').val();
                dataAttr['special-effects'] = thumbnailsMode.find('#list-galleries-thumbnail-special-effects').val();
                dataAttr['gutter'] = thumbnailsMode.find('#list-galleries-thumbnail-gutter').val();
                dataAttr['meta-thumbnail'] = thumbnailsMode.find('#list-galleries-thumbnail-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['pagination'] = thumbnailsMode.find('#list-galleries-thumbnails-pagination').val();

            } else if (dataAttr['display-mode'] === 'big-post') {

                bigPostMode = elements.find("#list-galleries-display-mode-options>.list-galleries-big-post");
                dataAttr['show-meta'] = bigPostMode.find('#list-galleries-big-post-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = bigPostMode.find('#list-galleries-big-post-nr-of-posts').val();
                dataAttr['image-split'] = bigPostMode.find('#list-galleries-big-post-image-split').val();
                dataAttr['order-by'] = bigPostMode.find('#list-galleries-big-post-order-by').val();
                dataAttr['order-direction'] = bigPostMode.find('#list-galleries-big-post-order-direction').val();
                dataAttr['related-posts'] = bigPostMode.find('#list-galleries-big-post-related').val();
                dataAttr['special-effects'] = bigPostMode.find('#list-galleries-big-post-special-effects').val();
                dataAttr['pagination'] = bigPostMode.find('#list-galleries-big-post-pagination').val();
                dataAttr['image-position'] = bigPostMode.find('#list-galleries-big-post-image-position').val();
                dataAttr['excerpt'] = bigPostMode.find('#list-galleries-big-post-excerpt').val();
                dataAttr['carousel'] = bigPostMode.find('#list-galleries-big-post-carousel').val();
                dataAttr['show-image'] = bigPostMode.find('#list-galleries-big-post-image').val();

            } else if (dataAttr['display-mode'] === 'timeline') {

                timelineMode = elements.find("#list-galleries-display-mode-options>.list-galleries-timeline");
                dataAttr['display-title'] = timelineMode.find('#list-galleries-timeline-title').val();
                dataAttr['show-meta'] = timelineMode.find('#list-galleries-timeline-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = timelineMode.find('#list-galleries-timeline-post-limit').val();
                dataAttr['image'] = timelineMode.find('#list-galleries-timeline-image').val();
                dataAttr['order-by'] = timelineMode.find('#list-galleries-timeline-order-by').val();
                dataAttr['order-direction'] = timelineMode.find('#list-galleries-timeline-order-direction').val();
                dataAttr['pagination'] = timelineMode.find('#list-galleries-timeline-pagination').val();

            } else if (dataAttr['display-mode'] === 'mosaic') {

                mosaicMode = elements.find("#list-galleries-display-mode-options>.list-galleries-mosaic");
                dataAttr['posts-limit'] = mosaicMode.find("#list-galleries-mosaic-post-limit").val();
                dataAttr['order-by'] = mosaicMode.find('#list-galleries-mosaic-order-by').val();
                dataAttr['order-direction'] = mosaicMode.find('#list-galleries-mosaic-order-direction').val();
                dataAttr['effects-scroll'] = mosaicMode.find('#list-galleries-mosaic-effects').val();
                dataAttr['gutter'] = mosaicMode.find('#list-galleries-mosaic-gutter').val();
                dataAttr['layout'] = mosaicMode.find('#list-galleries-mosaic-layout').val();
                dataAttr['rows'] = mosaicMode.find('#list-galleries-mosaic-rows').val();
                dataAttr['scroll'] = mosaicMode.find('#list-galleries-mosaic-scroll').val();
                dataAttr['pagination'] = mosaicMode.find('#list-galleries-mosaic-pagination').val();

                if( dataAttr['layout'] == 'rectangles' ){
                    dataAttr['posts-limit'] = mosaicMode.find("#list-galleries-mosaic-post-limit-rows-" + dataAttr['rows'] + "").val();
                }else{
                    dataAttr['posts-limit'] = mosaicMode.find("#list-galleries-mosaic-post-limit-rows-squares").val();
                }

            } else if (dataAttr['display-mode'] === 'super-post') {

                superPostMode = elements.find("#list-galleries-display-mode-options>.list-galleries-super-post");
                dataAttr['elements-per-row'] = superPostMode.find("#list-galleries-super-post-posts-per-row").val();
                dataAttr['posts-limit'] = superPostMode.find('#list-galleries-super-post-limit').val();
                dataAttr['order-by'] = superPostMode.find('#list-galleries-super-post-order-by').val();
                dataAttr['order-direction'] = superPostMode.find('#list-galleries-super-post-order-direction').val();
                dataAttr['related-posts'] = superPostMode.find('#list-galleries-super-post-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = superPostMode.find('#list-galleries-super-post-special-effects').val();
                dataAttr['pagination'] = superPostMode.find('#list-galleries-super-post-pagination').val();
            }

        } else if (elementType === 'accordion') {

            elements = jQuery("#builder-elements>.accordion");
            dataAttr = {};

            dataAttr['element-type'] = 'accordion';
            dataAttr['admin-label'] = elements.find("#accordion-admin-label").val();
            dataAttr['posts-type'] = elements.find('#accordion-posts-type').val();
            dataAttr['featured'] = elements.find('#accordion-featured').val();
            dataAttr['nr-of-posts'] = elements.find("#accordion-nr-of-posts").val();
            dataAttr['order-by'] = elements.find("#accordion-order-by").val();
            dataAttr['order-direction'] = elements.find("#accordion-order-direction").val();
            dataAttr['category'] = '';

            var arrayCategories = elements.find('#accordion-' + dataAttr['posts-type'] + '-category').val();
            if( typeof(arrayCategories) !== 'undefined' ){
               for(index in arrayCategories){
                   dataAttr['category'] =  dataAttr['category'] + arrayCategories[index] + ',';
               }
            }

            if( elements.find('#accordion-admin-label').val().length > 0 ){
                elementName = elements.find('#accordion-admin-label').val();
            }

        }else if (elementType === 'latest-custom-posts') {

            elements = jQuery("#builder-elements>.latest-custom-posts");
            dataAttr = {};

            dataAttr['element-type'] = 'latest-custom-posts';
            dataAttr['post-type'] = elements.find('select#latest-custom-posts-type').val();
            dataAttr['display-mode'] = elements.find('select#latest-custom-posts-display-mode').val();
            dataAttr['id-exclude'] = elements.find('#latest-custom-posts-exclude').val();
            dataAttr['exclude-first'] = elements.find('#latest-custom-posts-exclude-first').val();
            dataAttr['admin-label'] = elements.find("#latest-custom-posts-admin-label").val();
            dataAttr['featured'] = elements.find("#latest-custom-posts-featured").val();
            dataAttr['category'] = '';

            for(key in dataAttr['post-type']){
                var arrayCategories = elements.find('#latest-custom-posts-category-' + dataAttr['post-type'][key]).val();
                if( typeof(arrayCategories) !== 'undefined' ){
                   for(index in arrayCategories){
                       dataAttr['category'] =  dataAttr['category'] + arrayCategories[index] + ',';
                   }
                }
            }

            if( elements.find('#latest-custom-posts-admin-label').val().length > 0 ){
                elementName = elements.find('#latest-custom-posts-admin-label').val();
            }

            if (dataAttr['display-mode'] === 'grid') {

                gridMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-grid");
                dataAttr['behavior'] = gridMode.find('#latest-custom-posts-grid-behavior').val();
                dataAttr['display-title'] = gridMode.find('#latest-custom-posts-grid-title').val();
                dataAttr['show-meta'] = gridMode.find('#latest-custom-posts-grid-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['elements-per-row'] = gridMode.find('#latest-custom-posts-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#latest-custom-posts-grid-el-per-row').val();
                dataAttr['elements-per-row'] = gridMode.find('#latest-custom-posts-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#latest-custom-posts-grid-nr-of-posts').val();
                dataAttr['order-by'] = gridMode.find('#latest-custom-posts-grid-order-by').val();
                dataAttr['order-direction'] = gridMode.find('#latest-custom-posts-grid-order-direction').val();
                dataAttr['special-effects'] = gridMode.find('#latest-custom-posts-grid-special-effects').val();
                dataAttr['pagination'] = gridMode.find('#latest-custom-posts-grid-pagination').val();
                dataAttr['related-posts'] = gridMode.find('#latest-custom-posts-grid-related').val();
                dataAttr['show-image'] = gridMode.find('#latest-custom-posts-grid-image').val();

            } else if (dataAttr['display-mode'] === 'list') {

                listMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-list");
                dataAttr['display-title'] = listMode.find('#latest-custom-posts-list-title').val();
                dataAttr['show-meta'] = listMode.find('#latest-custom-posts-list-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = listMode.find('#latest-custom-posts-list-nr-of-posts').val();
                dataAttr['order-by'] = listMode.find('#latest-custom-posts-list-order-by').val();
                dataAttr['order-direction'] = listMode.find('#latest-custom-posts-list-order-direction').val();
                dataAttr['related-posts'] = listMode.find('#latest-custom-posts-list-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = listMode.find('#latest-custom-posts-list-special-effects').val();
                dataAttr['pagination'] = listMode.find('#latest-custom-posts-list-pagination').val();
                dataAttr['show-image'] = listMode.find('#latest-custom-posts-list-image').val();

            } else if (dataAttr['display-mode'] === 'thumbnails') {

                thumbnailsMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-thumbnails");
                dataAttr['display-title'] = thumbnailsMode.find('#latest-custom-posts-thumbnail-title').val();
                dataAttr['behavior'] = thumbnailsMode.find('#latest-custom-posts-thumbnails-behavior').val();
                dataAttr['elements-per-row'] = thumbnailsMode.find("#latest-custom-posts-thumbnail-posts-per-row").val();
                dataAttr['posts-limit'] = thumbnailsMode.find("#latest-custom-posts-thumbnail-limit").val();
                dataAttr['order-by'] = thumbnailsMode.find('#latest-custom-posts-thumbnail-order-by').val();
                dataAttr['order-direction'] = thumbnailsMode.find('#latest-custom-posts-thumbnails-order-direction').val();
                dataAttr['special-effects'] = thumbnailsMode.find('#latest-custom-posts-thumbnail-special-effects').val();
                dataAttr['gutter'] = thumbnailsMode.find('#latest-custom-posts-thumbnail-gutter').val();
                dataAttr['meta-thumbnail'] = thumbnailsMode.find('#latest-custom-posts-thumbnail-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['pagination'] = thumbnailsMode.find('#latest-custom-posts-thumbnails-pagination').val();

            } else if (dataAttr['display-mode'] === 'big-post') {

                bigPostMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-big-post");
                dataAttr['show-meta'] = bigPostMode.find('#latest-custom-posts-big-post-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = bigPostMode.find('#latest-custom-posts-big-post-nr-of-posts').val();
                dataAttr['image-split'] = bigPostMode.find('#latest-custom-posts-big-post-image-split').val();
                dataAttr['order-by'] = bigPostMode.find('#latest-custom-posts-big-post-order-by').val();
                dataAttr['order-direction'] = bigPostMode.find('#latest-custom-posts-big-post-order-direction').val();
                dataAttr['related-posts'] = bigPostMode.find('#latest-custom-posts-big-post-related').val();
                dataAttr['special-effects'] = bigPostMode.find('#latest-custom-posts-big-post-special-effects').val();
                dataAttr['pagination'] = bigPostMode.find('#latest-custom-posts-big-post-pagination').val();
                dataAttr['image-position'] = bigPostMode.find('#latest-custom-posts-big-post-image-position').val();
                dataAttr['excerpt'] = bigPostMode.find('#latest-custom-posts-big-post-excerpt').val();
                dataAttr['carousel'] = bigPostMode.find('#latest-custom-posts-big-post-carousel').val();
                dataAttr['show-image'] = bigPostMode.find('#latest-custom-posts-big-post-image').val();

            } else if (dataAttr['display-mode'] === 'timeline') {

                timelineMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-timeline");
                dataAttr['display-title'] = timelineMode.find('#latest-custom-posts-timeline-title').val();
                dataAttr['show-meta'] = timelineMode.find('#latest-custom-posts-timeline-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = timelineMode.find('#latest-custom-posts-timeline-post-limit').val();
                dataAttr['image'] = timelineMode.find('#latest-custom-posts-timeline-image').val();
                dataAttr['order-by'] = timelineMode.find('#latest-custom-posts-timeline-order-by').val();
                dataAttr['order-direction'] = timelineMode.find('#latest-custom-posts-timeline-order-direction').val();
                dataAttr['pagination'] = timelineMode.find('#latest-custom-posts-timeline-pagination').val();

            } else if (dataAttr['display-mode'] === 'mosaic') {

                mosaicMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-mosaic");
                dataAttr['order-by'] = mosaicMode.find('#latest-custom-posts-mosaic-order-by').val();
                dataAttr['order-direction'] = mosaicMode.find('#latest-custom-posts-mosaic-order-direction').val();
                dataAttr['effects-scroll'] = mosaicMode.find('#latest-custom-posts-mosaic-effects').val();
                dataAttr['gutter'] = mosaicMode.find('#latest-custom-posts-mosaic-gutter').val();
                dataAttr['layout'] = mosaicMode.find('#latest-custom-posts-mosaic-layout').val();
                dataAttr['rows'] = mosaicMode.find('#latest-custom-posts-mosaic-rows').val();
                dataAttr['scroll'] = mosaicMode.find('#latest-custom-posts-mosaic-scroll').val();
                dataAttr['pagination'] = mosaicMode.find('#latest-custom-posts-mosaic-pagination').val();

                if( dataAttr['layout'] == 'rectangles' ){
                    dataAttr['posts-limit'] = mosaicMode.find("#latest-custom-posts-mosaic-post-limit-rows-" + dataAttr['rows'] + "").val();
                }else{
                    dataAttr['posts-limit'] = mosaicMode.find("#latest-custom-posts-mosaic-post-limit-rows-squares").val();
                }

            } else if (dataAttr['display-mode'] === 'super-post') {

                superPostMode = elements.find("#latest-custom-posts-display-mode-options>.latest-custom-posts-super-post");
                dataAttr['elements-per-row'] = superPostMode.find("#latest-custom-posts-super-post-posts-per-row").val();
                dataAttr['posts-limit'] = superPostMode.find('#latest-custom-posts-super-post-limit').val();
                dataAttr['order-by'] = superPostMode.find('#latest-custom-posts-super-post-order-by').val();
                dataAttr['order-direction'] = superPostMode.find('#latest-custom-posts-super-post-order-direction').val();
                dataAttr['related-posts'] = superPostMode.find('#latest-custom-posts-super-post-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = superPostMode.find('#latest-custom-posts-super-post-special-effects').val();
                dataAttr['pagination'] = superPostMode.find('#latest-custom-posts-super-post-pagination').val();
            }

        } else if (elementType === 'callaction') {

            elements = jQuery("#builder-elements>.callaction");
            dataAttr = {};

            dataAttr['element-type'] = 'callaction';
            dataAttr['callaction-text'] = elements.find('#callaction-text').val();
            dataAttr['callaction-link'] = elements.find('#callaction-link').val();
            dataAttr['callaction-button-text'] = elements.find('#callaction-button-text').val();
            dataAttr['admin-label'] = elements.find("#callaction-admin-label").val();

            if( elements.find('#callaction-admin-label').val().length > 0 ){
                elementName = elements.find('#callaction-admin-label').val();
            }


        } else if (elementType === 'teams') {

            elements = jQuery("#builder-elements>.teams");
            dataAttr = {};

            dataAttr['element-type'] = 'teams';
            dataAttr['elements-per-row'] = isNaN(parseInt(elements.find('#teams-elements-per-row').val(), 10)) ? 3 : parseInt(elements.find('#teams-elements-per-row').val(), 10);
            dataAttr['remove-gutter'] = elements.find('#teams-remove-gutter').val();
            dataAttr['enable-carousel'] = elements.find('#teams-enable-carousel').val();

            dataAttr['posts-limit'] = isNaN(parseInt(elements.find('#teams-post-limit').val(), 10)) ? 3 : parseInt(elements.find('#teams-post-limit').val(), 10);

            dataAttr['category'] = elements.find('#teams-category').val();
            dataAttr['admin-label'] = elements.find("#teams-admin-label").val();
            dataAttr['effect'] = elements.find("#teams-effect").val();
            dataAttr['delay'] = elements.find("#teams-delay").val();

            if( elements.find('#teams-admin-label').val().length > 0 ){
                elementName = elements.find('#teams-admin-label').val();
            }

        } else if (elementType === 'pricing-tables') {

            elements = jQuery("#builder-elements>.pricing-tables");
            dataAttr = {};

            dataAttr['element-type'] = 'pricing-tables';
            dataAttr['elements-per-row'] = isNaN(parseInt(elements.find('#pricing-tables-elements-per-row').val(), 10)) ? 3 : parseInt(elements.find('#pricing-tables-elements-per-row').val(), 10);
            dataAttr['remove-gutter'] = elements.find('#pricing-tables-remove-gutter').val();
            dataAttr['equal-height'] = elements.find('#pricing-tables-equal-height').val();

            dataAttr['posts-limit'] = isNaN(parseInt(elements.find('#pricing-tables-post-limit').val(), 10)) ? 3 : parseInt(elements.find('#pricing-tables-post-limit').val(), 10);

            dataAttr['category'] = elements.find('#pricing-tables-category').val();
            dataAttr['admin-label'] = elements.find("#pricing-tables-admin-label").val();
            dataAttr['effect'] = elements.find("#pricing-tables-effect").val();
            dataAttr['delay'] = elements.find("#pricing-tables-delay").val();

            if( elements.find('#pricing-tables-admin-label').val().length > 0 ){
                elementName = elements.find('#pricing-tables-admin-label').val();
            }

        } else if (elementType === 'advertising') {

            elements = jQuery("#builder-elements>.advertising");
            dataAttr = {};

            dataAttr['element-type'] = 'advertising';
            dataAttr['advertising'] = elements.find('#advertising').val();
            dataAttr['admin-label'] = elements.find("#advertising-admin-label").val();

            if( elements.find('#advertising-admin-label').val().length > 0 ){
                elementName = elements.find('#advertising-admin-label').val();
            }

        } else if (elementType === 'empty') {

            dataAttr = {};
            dataAttr['element-type'] = 'empty';

        } else if (elementType === 'delimiter') {

            elements = jQuery("#builder-elements>.delimiter");

            dataAttr = {};
            dataAttr['element-type'] = 'delimiter';
            dataAttr['delimiter-type'] = elements.find('#delimiter-type').val();
            dataAttr['delimiter-color'] = elements.find('#delimiter-color').val();
            dataAttr['admin-label'] = elements.find("#delimiter-admin-label").val();

            if( elements.find('#delimiter-admin-label').val().length > 0 ){
                elementName = elements.find('#delimiter-admin-label').val();
            }

        } else if (elementType === 'title') {

            elements = jQuery("#builder-elements>.title");

            dataAttr = {};
            dataAttr['element-type'] = 'title';
            dataAttr['title'] = elements.find('#title-title').val();
            dataAttr['title-color'] = elements.find('#builder-element-title-color').val();
            dataAttr['title-icon'] = elements.find('#builder-element-title-icon').val();
            dataAttr['subtitle'] = elements.find('#title-subtitle').val();
            dataAttr['subtitle-color'] = elements.find('#builder-element-title-subtitle-color').val();
            dataAttr['style'] = elements.find('#title-style').val();
            dataAttr['size'] = elements.find('#title-size').val();
            dataAttr['admin-label'] = elements.find("#title-admin-label").val();
            dataAttr['link'] = elements.find("#title-link").val();
            dataAttr['target'] = elements.find("#title-target").val();
            dataAttr['effect'] = elements.find("#title-effect").val();
            dataAttr['delay'] = elements.find("#title-delay").val();
            dataAttr['letter-spacer'] = elements.find("#title-letter-spacing").val();

            if( elements.find('#title-admin-label').val().length > 0 ){
                elementName = elements.find('#title-admin-label').val();
            }

        } else if (elementType === 'video') {

            elements = jQuery("#builder-elements>.video");

            dataAttr = {};
            dataAttr['element-type'] = 'video';
            dataAttr['embed'] = elements.find('#video-embed').val();
            dataAttr['admin-label'] = elements.find("#video-admin-label").val();
            dataAttr['lightbox'] = elements.find("#video-lightbox").val();
            dataAttr['title'] = elements.find("#video-title").val();

            if( elements.find('#video-admin-label').val().length > 0 ){
                elementName = elements.find('#video-admin-label').val();
            }

        } else if (elementType === 'facebook-block') {

            elements = jQuery("#builder-elements>.facebook-block");

            dataAttr = {};
            dataAttr['element-type'] = 'facebook-block';
            dataAttr['facebook-url'] = elements.find('#facebook-url').val();
            dataAttr['cover'] = elements.find('#facebook-cover').val();

        } else if (elementType === 'image') {

            elements = jQuery("#builder-elements>.image");

            dataAttr = {};
            dataAttr['element-type'] = 'image';
            dataAttr['image-url'] = elements.find('#image_url').val();
            dataAttr['forward-url'] = elements.find('#forward-image-url').val();
            dataAttr['image-target'] = elements.find('#image-target').val();
            dataAttr['admin-label'] = elements.find("#image-admin-label").val();
            dataAttr['retina'] = elements.find("#image-retina").val();
            dataAttr['align'] = elements.find("#image-align").val();
            dataAttr['effect'] = elements.find("#image-effect").val();
            dataAttr['delay'] = elements.find("#image-delay").val();

            if( elements.find('#image-admin-label').val().length > 0 ){
                elementName = elements.find('#image-admin-label').val();
            }

        }else if (elementType === 'powerlink') {

            elements = jQuery("#builder-elements>.powerlink");

            dataAttr = {};
            dataAttr['element-type'] = 'powerlink';
            dataAttr['admin-label'] = elements.find("#powerlink-admin-label").val();
            dataAttr['title'] = elements.find("#powerlink-title").val();
            dataAttr['image'] = elements.find('#image-powerlink-url').val();
            dataAttr['button-url'] = elements.find('#powerlink-button-url').val();
            dataAttr['button-text'] = elements.find('#powerlink-button-text').val();

            if( elements.find('#powerlink-admin-label').val().length > 0 ){
                elementName = elements.find('#powerlink-admin-label').val();
            }

        } else if (elementType === 'filters') {

            elements = jQuery("#builder-elements>.filters");

            dataAttr = {};
            dataAttr['element-type'] = 'filters';
            dataAttr['post-type'] = elements.find('#filters-post-type').val();
            if( jQuery('#filters-' + dataAttr['post-type'] + '-category').val() !== null && jQuery('#filters-' + dataAttr['post-type'] + '-category').val() !== 'undefined' ){
                dataAttr['categories'] = jQuery('#filters-' + dataAttr['post-type'] + '-category').val().join();
            }else{
                dataAttr['categories'] = '';
            }
            dataAttr['posts-limit'] = elements.find('#filters-posts-limit').val();
            dataAttr['elements-per-row'] = elements.find('#filters-elements-per-row').val();
            dataAttr['order-by'] = elements.find('#filters-order-by').val();
            dataAttr['direction'] = elements.find('#filters-order-direction').val();
            dataAttr['special-effects'] = elements.find('#filters-special-effects').val();
            dataAttr['gutter'] = elements.find('#filters-gutter').val();
            dataAttr['admin-label'] = elements.find("#filters-admin-label").val();
            dataAttr['meta-thumbnail'] = elements.find("#filters-meta").val();

            if( elements.find('#filters-admin-label').val().length > 0 ){
                elementName = elements.find('#filters-admin-label').val();
            }

        } else if (elementType === 'toggle') {

            elements = jQuery("#builder-elements>.toggle");

            dataAttr = {};
            dataAttr['element-type'] = 'toggle';
            dataAttr['toggle-title'] = elements.find('#toggle-title').val();
            dataAttr['toggle-description'] = elements.find('#toggle-description').val();
            dataAttr['toggle-state'] = elements.find('#toggle-state').val();
            dataAttr['admin-label'] = elements.find("#toggle-admin-label").val();

            if( elements.find('#toggle-admin-label').val().length > 0 ){
                elementName = elements.find('#toggle-admin-label').val();
            }


        } else if (elementType === 'timeline') {

            elements = jQuery("#builder-elements>.timeline");

            items_array = '[';
            jQuery('#timeline_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#timeline_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_image = jQuery(this).find('[data-role="media-url"]').val().replace(/"/g, '--quote--');
                item_text = jQuery(this).find('[data-builder-name="text"]').val().replace(/"/g, '--quote--').replace(/\r?\n/g, '<br />');
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_align = jQuery(this).find('[data-builder-name="align"]').val();
                item_effect = jQuery(this).find('[data-builder-name="effect"]').val();
                item_delay = jQuery(this).find('[data-builder-name="delay"]').val();

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"image":' + '"' + item_image + '"' + ',"text":' + '"' + item_text + '"' + ',"title":' + '"' + item_title + '"' + ',"align":' + '"' + item_align + '"' + ',"effect":' + '"' + item_effect + '"' + ',"delay":' + '"' + item_delay + '"' + '}' + comma;

            });
            items_array = items_array + ']';
            jQuery('#timeline_content').val(items_array);
            dataAttr = {};
            dataAttr['timeline'] = elements.find('#timeline_content').val();

            dataAttr['element-type'] = 'timeline';
            dataAttr['admin-label'] = elements.find("#timeline-admin-label").val();

            if( elements.find('#timeline-admin-label').val().length > 0 ){
                elementName = elements.find('#timeline-admin-label').val();
            }


        } else if (elementType === 'banner') {

            elements = jQuery("#builder-elements>.banner");

            dataAttr = {};
            dataAttr['element-type'] = 'banner';
            dataAttr['banner-image'] = elements.find('#image-banner-url').val();
            dataAttr['banner-title'] = elements.find('#banner-title').val();
            dataAttr['banner-subtitle'] = elements.find('#banner-subtitle').val();
            dataAttr['banner-button-title'] = elements.find('#banner-button-title').val();
            dataAttr['banner-button-url'] = elements.find('#banner-button-url').val();
            dataAttr['banner-button-background'] = elements.find('#banner-button-background').val();
            dataAttr['banner-font-color'] = elements.find('#banner-font-color').val();
            dataAttr['banner-text-align'] = elements.find('#banner-text-align').val();
            dataAttr['banner-height'] = elements.find('#banner-height').val();
            dataAttr['admin-label'] = elements.find("#banner-admin-label").val();
            dataAttr['button-text-color'] = elements.find("#banner-button-text-color").val();

            if( elements.find('#banner-admin-label').val().length > 0 ){
                elementName = elements.find('#banner-admin-label').val();
            }

        } else if (elementType === 'map') {

            elements = jQuery("#builder-elements>.map");

            dataAttr = {};
            dataAttr['element-type'] = 'map';
            dataAttr['admin-label'] = elements.find("#map-admin-label").val();
            dataAttr['map-address'] = elements.find('#map-address').val();
            dataAttr['map-width'] = elements.find('#map-width').val();
            dataAttr['map-height'] = elements.find('#map-height').val();
            dataAttr['map-latitude'] = elements.find('#map-latitude').val();
            dataAttr['map-longitude'] = elements.find('#map-longitude').val();
            dataAttr['map-type'] = elements.find('#map-type').val();
            dataAttr['map-style'] = elements.find('#map-style').val();
            dataAttr['map-zoom'] = elements.find('#map-zoom').val();
            dataAttr['map-type-control'] = elements.find('#map-type-control').val();
            dataAttr['map-zoom-control'] = elements.find('#map-zoom-control').val();
            dataAttr['map-scale-control'] = elements.find('#map-scale-control').val();
            dataAttr['map-scroll-wheel'] = elements.find('#map-scroll-wheel').val();
            dataAttr['map-draggable-direction'] = elements.find('#map-draggable-direction').val();
            dataAttr['map-marker-icon'] = elements.find('#map-marker-icon').val();
            dataAttr['map-marker-img'] = elements.find('#map-marker-attachment').val();

            if( elements.find('#map-admin-label').val().length > 0 ){
                elementName = elements.find('#map-admin-label').val();
            }

            setTimeout(function(){
                initialize();
            },100)

        } else if (elementType === 'counters') {

            elements = jQuery("#builder-elements>.counters");

            dataAttr = {};
            dataAttr['element-type'] = 'counters';
            dataAttr['counters-text'] = elements.find('#counters-text').val();
            if( !isNaN(elements.find('#counters-precents').val()) ) {
                dataAttr['counters-precents'] = elements.find('#counters-precents').val();
            }
            dataAttr['admin-label'] = elements.find("#counters-admin-label").val();
            dataAttr['counters-text-color'] = elements.find('#counters-text-color').val();
            dataAttr['track-bar'] = elements.find('#counters-track-bar').val();
            dataAttr['track-bar-color'] = elements.find('#counters-track-bar-color').val();
            dataAttr['track-bar-icon'] = elements.find('#counters-icon').val();
            dataAttr['effect'] = elements.find('#counters-special-effect').val();
            dataAttr['delay'] = elements.find('#counters-delay').val();

            if( elements.find('#counters-admin-label').val().length > 0 ){
                elementName = elements.find('#counters-admin-label').val();
            }

        } else if (elementType === 'alert') {

            elements = jQuery("#builder-elements>.alert");

            dataAttr = {};
            dataAttr['element-type'] = 'alert';
            dataAttr['admin-label'] = elements.find("#alert-admin-label").val();
            dataAttr['icon'] = elements.find('#alert-icon').val();
            dataAttr['title'] = elements.find('#alert-title').val();
            dataAttr['text'] = elements.find('#alert-text').val().replace(/\r?\n/g, '<br />');
            dataAttr['background-color'] = elements.find('#alert-background-color').val();
            dataAttr['text-color'] = elements.find('#alert-text-color').val();

            if( elements.find('#alert-admin-label').val().length > 0 ){
                elementName = elements.find('#alert-admin-label').val();
            }

        } else if (elementType === 'spacer') {

            elements = jQuery("#builder-elements>.spacer");

            dataAttr = {};
            dataAttr['element-type'] = 'spacer';
            dataAttr['height'] = elements.find('#spacer-height').val();
            dataAttr['show-mobile'] = elements.find('#spacer-show-mobile').val();
            dataAttr['admin-label'] = elements.find("#spacer-admin-label").val();

            if( elements.find('#spacer-admin-label').val().length > 0 ){
                elementName = elements.find('#spacer-admin-label').val();
            }

        } else if (elementType === 'icon') {

            elements = jQuery("#builder-elements>.icon");

            dataAttr = {};
            dataAttr['element-type'] = 'icon';
            dataAttr['icon'] = elements.find('#builder-element-icon').val();
            dataAttr['icon-align'] = elements.find('#builder-element-icon-align').val();
            dataAttr['icon-color'] = elements.find('#builder-element-icon-color').val();
            dataAttr['icon-size'] = elements.find('#builder-element-icon-size').val();
            dataAttr['admin-label'] = elements.find("#icon-admin-label").val();

            if( elements.find('#icon-admin-label').val().length > 0 ){
                elementName = elements.find('#icon-admin-label').val();
            }

        } else if (elementType === 'clients') {

            elements = jQuery("#builder-elements>.clients");

            items_array = '[';

            jQuery('#clients_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#clients_items > li').length ) { var comma = ','}else{var comma = ''};
                item_image = jQuery(this).find('[data-role="media-url"]').val().replace(/"/g, '--quote--');
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_url = jQuery(this).find('[data-builder-name="url"]').val().replace(/"/g, '--quote--');
                items_array = items_array + '{"id":' + '"' +  item_id + '"' + ',"image":' + '"' + item_image + '"' + ',"title":' + '"' + item_title + '"' + ',"url":' + '"' + item_url + '"' + '}' + comma;

            });
            items_array = items_array + ']';
            jQuery('#clients_content').val(items_array);

            dataAttr = {};
            dataAttr['element-type'] = 'clients';
            dataAttr['enable-carousel'] = elements.find('#clients-enable-carousel-y').attr('checked') ? 'y' : 'n';
            dataAttr['elements-per-row'] = isNaN(parseInt(elements.find('#clients-row').val(), 10)) ? 3 : parseInt(elements.find('#clients-row').val(), 10);

            dataAttr['clients'] = elements.find('#clients_content').val();
            dataAttr['admin-label'] = elements.find("#clients-admin-label").val();

            if( elements.find('#clients-admin-label').val().length > 0 ){
                elementName = elements.find('#clients-admin-label').val();
            }

        } else if (elementType === 'features-block') {

            elements = jQuery("#builder-elements>.features-block");

            items_array = '[';
            jQuery('#features-block_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#features-block_items > li').length ) { var comma = ','}else{var comma = ''};
                item_icon = jQuery(this).find('[data-builder-name="icon"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_text = jQuery(this).find('[data-builder-name="text"]').val().replace(/"/g, '--quote--').replace(/\r?\n/g, '<br />');
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_url = jQuery(this).find('[data-builder-name="url"]').val().replace(/"/g, '--quote--');
                item_background = jQuery(this).find('[data-builder-name="background"]').val().replace(/"/g, '--quote--');
                item_font = jQuery(this).find('[data-builder-name="font"]').val().replace(/"/g, '--quote--');
                item_effect = jQuery(this).find('[data-builder-name="effect"]').val();
                item_delay = jQuery(this).find('[data-builder-name="delay"]').val();

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"icon":' + '"' + item_icon + '"' + ',"title":' + '"' + item_title + '"' + ',"text":' + '"' + item_text + '"' + ',"url":' + '"' + item_url + '"' + ',"background":' + '"' + item_background + '"' + ',"font":' + '"' + item_font + '"' + ',"effect":' + '"' + item_effect + '"' + ',"delay":' + '"' + item_delay + '"' + '}' + comma;

            });
            items_array = items_array + ']';
            jQuery('#features-block_content').val(items_array);

            dataAttr = {};
            dataAttr['style'] = elements.find('#features-block-style').val();
            dataAttr['elements-per-row'] = isNaN(parseInt(elements.find('#features-block-row').val(), 10)) ? 3 : parseInt(elements.find('#features-block-row').val(), 10);
            dataAttr['element-type'] = 'features-block';
            dataAttr['features-block'] = elements.find('#features-block_content').val();
            dataAttr['admin-label'] = elements.find("#features-block-admin-label").val();
            dataAttr['gutter'] = elements.find("#features-block-gutter").val();

            if( elements.find('#features-block-admin-label').val().length > 0 ){
                elementName = elements.find('#features-block-admin-label').val();
            }

        } else if (elementType === 'listed-features') {

            elements = jQuery("#builder-elements>.listed-features");
            items_array = '[';
            jQuery('#listed-features_items > li').each(function(){
                if ( jQuery(this).index() + 1 < jQuery('#listed-features_items > li').length ) { var comma = ','}else{var comma = ''};
                item_icon = jQuery(this).find('[data-builder-name="icon"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_text = jQuery(this).find('[data-builder-name="text"]').val().replace(/"/g, '--quote--').replace(/\r?\n/g, '<br />');
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val().replace(/"/g, '--quote--');
                item_icon_color = jQuery(this).find('[data-builder-name="iconcolor"]').val().replace(/"/g, '--quote--');
                item_border_color = jQuery(this).find('[data-builder-name="bordercolor"]').val().replace(/"/g, '--quote--');
                item_background_color = jQuery(this).find('[data-builder-name="backgroundcolor"]').val().replace(/"/g, '--quote--');
                item_url = jQuery(this).find('[data-builder-name="url"]').val().replace(/"/g, '--quote--');
                items_array = items_array + '{"id":' + '"' + item_id + '"'+',"icon":' + '"' + item_icon + '"' + ',"title":' + '"' + item_title + '"' + ', "text":' + '"' + item_text + '"' + ',"iconcolor":' + '"' + item_icon_color + '"' + ',"bordercolor":' + '"' + item_border_color + '"' + ',"backgroundcolor":' + '"' + item_background_color + '"' + ',"url":' + '"' + item_url + '"' + '}' + comma;
            });
            items_array = items_array + ']';
            jQuery('#listed-features_content').val(items_array);
            dataAttr = {};
            dataAttr['element-type'] = 'listed-features';
            dataAttr['features'] = elements.find('#listed-features_content').val();
            dataAttr['features-align'] = elements.find('#listed-features-align').val();
            dataAttr['color-style'] = elements.find('#listed-features-color-style').val();
            dataAttr['admin-label'] = elements.find("#listed-features-admin-label").val();

            if( elements.find('#listed-features-admin-label').val().length > 0 ){
                elementName = elements.find('#listed-features-admin-label').val();
            }

        } else if (elementType === 'page') {

            elements = jQuery("#builder-elements>.page");

            dataAttr = {};
            dataAttr['element-type'] = 'page';
            dataAttr['post-id'] = elements.find('input[name=pageID]:checked').val();
            dataAttr['search'] = elements.find('#search-page').val();
            dataAttr['criteria'] = elements.find('#search-page-criteria').val();
            dataAttr['order-by'] = elements.find('#search-page-order-by').val();
            dataAttr['direction'] = elements.find('#search-page-direction').val();

        } else if (elementType === 'post') {

            elements = jQuery("#builder-elements>.post");

            dataAttr = {};
            dataAttr['element-type'] = 'post';
            dataAttr['post-id'] = elements.find('input[name=postID]:checked').val();
            dataAttr['search'] = elements.find('#search-post').val();
            dataAttr['criteria'] = elements.find('#search-post-criteria').val();
            dataAttr['order-by'] = elements.find('#search-post-order-by').val();
            dataAttr['direction'] = elements.find('#search-post-direction').val();

        } else if (elementType === 'buttons') {

            var buttons = jQuery("#builder-elements>.buttons");

            dataAttr = {};
            dataAttr['element-type'] = 'buttons';
            dataAttr['button-icon'] = buttons.find('#builder-element-button-icon').val();

            dataAttr['text'] = buttons.find('#button-text').val();
            dataAttr['icon-align'] = buttons.find('#button-icon-align').val();
            dataAttr['size'] = buttons.find('#button-size').val();
            dataAttr['target'] = buttons.find('#button-target').val();
            dataAttr['text-color'] = buttons.find('#button-text-color').val();
            dataAttr['bg-color'] = buttons.find('#button-background-color').val();
            dataAttr['url'] = buttons.find('#button-url').val();
            dataAttr['button-align'] = buttons.find('#button-align').val();
            dataAttr['admin-label'] = buttons.find("#buttons-admin-label").val();
            dataAttr['mode-display'] = buttons.find("#button-mode-display").val();
            dataAttr['border-color'] = buttons.find('#button-border-color').val();
            dataAttr['effect'] = buttons.find('#button-effect').val();
            dataAttr['delay'] = buttons.find('#button-delay').val();
            dataAttr['text-hover-color'] = buttons.find('#button-text-hover-color').val();
            dataAttr['border-hover-color'] = buttons.find('#button-border-hover-color').val();
            dataAttr['bg-hover-color'] = buttons.find('#button-background-hover-color').val();

            if( buttons.find('#buttons-admin-label').val().length > 0 ){
                elementName = buttons.find('#buttons-admin-label').val();
            }

        } else if (elementType === 'ribbon') {

            var ribbon = jQuery("#builder-elements>.ribbon");

            dataAttr = {};
            dataAttr['element-type'] = 'ribbon';
            dataAttr['admin-label'] = ribbon.find("#ribbon-admin-label").val();
            dataAttr['title'] = ribbon.find("#ribbon-title").val();
            dataAttr['text'] = ribbon.find("#ribbon-text").val();
            dataAttr['text-color'] = ribbon.find('#ribbon-text-color').val();
            dataAttr['background'] = ribbon.find('#ribbon-background-color').val();
            dataAttr['align'] = ribbon.find('#ribbon-align').val();
            dataAttr['image'] = ribbon.find('#ribbon-attachment').val();
            dataAttr['button-icon'] = ribbon.find('#builder-element-ribbon-icon').val();
            dataAttr['button-text'] = ribbon.find('#ribbon-button-text').val();
            dataAttr['button-size'] = ribbon.find('#ribbon-button-size').val();
            dataAttr['button-target'] = ribbon.find('#ribbon-button-target').val();
            dataAttr['button-background-color'] = ribbon.find('#ribbon-button-background-color').val();
            dataAttr['button-url'] = ribbon.find('#ribbon-button-url').val();
            dataAttr['button-align'] = ribbon.find('#ribbon-button-align').val();
            dataAttr['button-mode-display'] = ribbon.find("#ribbon-button-mode-display").val();
            dataAttr['button-border-color'] = ribbon.find('#ribbon-button-border-color').val();
            dataAttr['button-text-color'] = ribbon.find('#ribbon-button-text-color').val();

            if( ribbon.find('#ribbon-admin-label').val().length > 0 ){
                elementName = ribbon.find('#ribbon-admin-label').val();
            }

        } else if (elementType === 'contact-form') {

            var form = jQuery("#builder-elements>.contact-form");

            dataAttr = {};
            dataAttr['element-type'] = 'contact-form';
            dataAttr['hide-icon'] = form.find('#contact-form-hide-icon').attr('checked') ? '1' : '0';
            dataAttr['hide-subject'] = form.find('#contact-form-hide-subject').attr('checked') ? '1' : '0';
            dataAttr['admin-label'] = form.find("#contact-form-admin-label").val();

            items_array = '[';
            jQuery('#contact-form_items > li').each(function(){
            	if ( jQuery(this).index() + 1 < jQuery('#contact-form_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-builder-name="item_id"]').val();
                item_title = jQuery(this).find('[data-builder-name="title"]').val().replace(/"/g, '--quote--');
                item_type = jQuery(this).find('[data-builder-name="type"]').val().replace(/"/g, '--quote--');
                item_require = jQuery(this).find('[data-builder-name="require"]').val().replace(/"/g, '--quote--');
                item_options = jQuery(this).find('[data-builder-name="options"]').val().replace(/"/g, '--quote--');

                items_array = items_array +  '{"id":' + '"' + item_id + '"' + ',"title":' + '"' + item_title + '"' + ',"type":' + '"' + item_type + '"' + ',"require":' + '"' + item_require + '"' + ',"options":' + '"' + item_options + '"' + '}' + comma;

            });

            items_array = items_array + ']';
            jQuery('#contact-form_content').val(items_array);

            dataAttr['contact-form'] = form.find('#contact-form_content').val();
            if( form.find('#contact-form-admin-label').val().length > 0 ){
                elementName = form.find('#contact-form-admin-label').val();
            }

        } else if (elementType === 'featured-area') {

            var featuredArea = jQuery("#builder-elements>.featured-area");

            dataAttr = {};
            dataAttr['element-type'] = 'featured-area';

            postType = featuredArea.find("#featured-area-custom-post").val();
            dataAttr['selected-categories'] = featuredArea.find("#featured-area-categories-" + postType).val();

            dataAttr['admin-label'] = featuredArea.find("#featured-area-admin-label").val();
            dataAttr['custom-post'] = featuredArea.find("#featured-area-custom-post").val();
            dataAttr['exclude-first'] = featuredArea.find("#featured-area-exclude-first").val();
            dataAttr['order-by'] = featuredArea.find("#featured-area-order-by").val();
            dataAttr['order-direction'] = featuredArea.find("#featured-area-order-direction").val();

            if( featuredArea.find('#featured-area-admin-label').val().length > 0 ){
                elementName = featuredArea.find('#featured-area-admin-label').val();
            }

        } else if (elementType === 'shortcodes') {

            var shortcodes = jQuery("#builder-elements>.shortcodes");

            dataAttr = {};
            dataAttr['element-type'] = 'shortcodes';
            dataAttr['shortcodes'] = shortcodes.find('#ts-shortcodes').val();
            dataAttr['admin-label'] = shortcodes.find("#shortcodes-admin-label").val();
            dataAttr['paddings'] = shortcodes.find("#shortcodes-paddings").val();

            if( shortcodes.find('#shortcodes-admin-label').val().length > 0 ){
                elementName = shortcodes.find('#shortcodes-admin-label').val();
            }

        } else if (elementType === 'text') {

            var text = jQuery( ".tsz-text-editor-modal" );

            dataAttr = {};
            dataAttr['element-type'] = 'text';
            dataAttr['admin-label'] = text.find("#text-admin-label").val();
            dataAttr['effect'] = text.find("#text-effect").val();
            dataAttr['delay'] = text.find("#text-delay").val();

            if( text.find('#text-admin-label').val().length > 0 ){
                elementName = text.find('#text-admin-label').val();
            }

            jQuery('#wp-ts_editor_id-wrap').find('#ts_editor_id-tmce').trigger('click');
            dataAttr['text'] = tinymce.get('ts_editor_id').getContent().replace(/"/g, '--quote--');

            tinymce.get( 'ts_editor_id' ).setContent( '' );

        } else if (elementType === 'list-videos') {

            elements = jQuery("#builder-elements>.list-videos");
            dataAttr = {};

            dataAttr['element-type'] = 'list-videos';
            dataAttr['category'] = elements.find('select#list-videos-category').val();
            dataAttr['display-mode'] = elements.find('select#list-videos-display-mode').val();
            dataAttr['id-exclude'] = elements.find('#list-videos-exclude').val();
            dataAttr['exclude-first'] = elements.find('#list-videos-exclude-first').val();
            dataAttr['admin-label'] = elements.find("#list-videos-admin-label").val();
            dataAttr['featured'] = elements.find("#list-videos-featured").val();

            if( elements.find('#list-videos-admin-label').val().length > 0 ){
                elementName = elements.find('#list-videos-admin-label').val();
            }

            if (dataAttr['display-mode'] === 'grid') {

                gridMode = elements.find("#list-videos-display-mode-options>.list-videos-grid");
                dataAttr['behavior'] = gridMode.find('#list-videos-grid-behavior').val();
                dataAttr['display-title'] = gridMode.find('#list-videos-grid-title').val();
                dataAttr['show-meta'] = gridMode.find('#list-videos-grid-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['elements-per-row'] = gridMode.find('#list-videos-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#list-videos-grid-el-per-row').val();
                dataAttr['elements-per-row'] = gridMode.find('#list-videos-grid-el-per-row').val();
                dataAttr['posts-limit'] = gridMode.find('#list-videos-grid-nr-of-posts').val();
                dataAttr['order-by'] = gridMode.find('#list-videos-grid-order-by').val();
                dataAttr['order-direction'] = gridMode.find('#list-videos-grid-order-direction').val();
                dataAttr['special-effects'] = gridMode.find('#list-videos-grid-special-effects').val();
                dataAttr['pagination'] = gridMode.find('#list-videos-grid-pagination').val();
                dataAttr['related-posts'] = gridMode.find('#list-videos-grid-related').val();
                dataAttr['show-image'] = gridMode.find('#list-videos-grid-image').val();

            } else if (dataAttr['display-mode'] === 'list') {

                listMode = elements.find("#list-videos-display-mode-options>.list-videos-list");
                dataAttr['display-title'] = listMode.find('#list-videos-list-title').val();
                dataAttr['show-meta'] = listMode.find('#list-videos-list-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = listMode.find('#list-videos-list-nr-of-posts').val();
                dataAttr['order-by'] = listMode.find('#list-videos-list-order-by').val();
                dataAttr['order-direction'] = listMode.find('#list-videos-list-order-direction').val();
                dataAttr['related-posts'] = listMode.find('#list-videos-list-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = listMode.find('#list-videos-list-special-effects').val();
                dataAttr['pagination'] = listMode.find('#list-videos-list-pagination').val();
                dataAttr['show-image'] = listMode.find('#list-videos-list-image').val();

           } else if (dataAttr['display-mode'] === 'thumbnails') {

                thumbnailsMode = elements.find("#list-videos-display-mode-options>.list-videos-thumbnails");
                dataAttr['display-title'] = thumbnailsMode.find('#list-videos-thumbnails-title').val();
                dataAttr['behavior'] = thumbnailsMode.find('#list-videos-thumbnails-behavior').val();
                dataAttr['elements-per-row'] = thumbnailsMode.find("#list-videos-thumbnail-posts-per-row").val();
                dataAttr['posts-limit'] = thumbnailsMode.find("#list-videos-thumbnail-limit").val();
                dataAttr['order-by'] = thumbnailsMode.find('#list-videos-thumbnail-order-by').val();
                dataAttr['order-direction'] = thumbnailsMode.find('#list-videos-thumbnails-order-direction').val();
                dataAttr['special-effects'] = thumbnailsMode.find('#list-videos-thumbnail-special-effects').val();
                dataAttr['gutter'] = thumbnailsMode.find('#list-videos-thumbnail-gutter').val();
                dataAttr['meta-thumbnail'] = thumbnailsMode.find('#list-videos-thumbnail-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['pagination'] = thumbnailsMode.find('#list-videos-thumbnails-pagination').val();

           } else if (dataAttr['display-mode'] === 'big-post') {

                bigPostMode = elements.find("#list-videos-display-mode-options>.list-videos-big-post");
                dataAttr['show-meta'] = bigPostMode.find('#list-videos-big-post-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = bigPostMode.find('#list-videos-big-post-nr-of-posts').val();
                dataAttr['image-split'] = bigPostMode.find('#list-videos-big-post-image-split').val();
                dataAttr['order-by'] = bigPostMode.find('#list-videos-big-post-order-by').val();
                dataAttr['order-direction'] = bigPostMode.find('#list-videos-big-post-order-direction').val();
                dataAttr['related-posts'] = bigPostMode.find('#list-videos-big-post-related').val();
                dataAttr['special-effects'] = bigPostMode.find('#list-videos-big-post-special-effects').val();
                dataAttr['pagination'] = bigPostMode.find('#list-videos-big-post-pagination').val();
                dataAttr['image-position'] = bigPostMode.find('#list-videos-big-post-image-position').val();
                dataAttr['excerpt'] = bigPostMode.find('#list-videos-big-post-excerpt').val();
                dataAttr['carousel'] = bigPostMode.find('#list-videos-big-post-carousel').val();
                dataAttr['show-image'] = bigPostMode.find('#list-videos-big-post-image').val();

           } else if (dataAttr['display-mode'] === 'timeline') {

                timelineMode = elements.find("#list-videos-display-mode-options>.list-videos-timeline");
                dataAttr['display-title'] = timelineMode.find('#list-videos-timeline-title').val();
                dataAttr['show-meta'] = timelineMode.find('#list-videos-timeline-show-meta-y').attr('checked') ? 'y' : 'n';
                dataAttr['posts-limit'] = timelineMode.find('#list-videos-timeline-post-limit').val();
                dataAttr['image'] = timelineMode.find('#list-videos-timeline-image').val();
                dataAttr['order-by'] = timelineMode.find('#list-videos-timeline-order-by').val();
                dataAttr['order-direction'] = timelineMode.find('#list-videos-timeline-order-direction').val();
                dataAttr['pagination'] = timelineMode.find('#list-videos-timeline-pagination').val();

           } else if (dataAttr['display-mode'] === 'mosaic') {

                mosaicMode = elements.find("#list-videos-display-mode-options>.list-videos-mosaic");
                dataAttr['order-by'] = mosaicMode.find('#list-videos-mosaic-order-by').val();
                dataAttr['order-direction'] = mosaicMode.find('#list-videos-mosaic-order-direction').val();
                dataAttr['effects-scroll'] = mosaicMode.find('#list-videos-mosaic-effects').val();
                dataAttr['gutter'] = mosaicMode.find('#list-videos-mosaic-gutter').val();
                dataAttr['layout'] = mosaicMode.find('#list-videos-mosaic-layout').val();
                dataAttr['rows'] = mosaicMode.find('#list-videos-mosaic-rows').val();
                dataAttr['scroll'] = mosaicMode.find('#list-videos-mosaic-scroll').val();
                dataAttr['pagination'] = mosaicMode.find('#list-videos-mosaic-pagination').val();

                if( dataAttr['layout'] == 'rectangles' ){
                    dataAttr['posts-limit'] = mosaicMode.find("#list-videos-mosaic-post-limit-rows-" + dataAttr['rows'] + "").val();
                }else{
                    dataAttr['posts-limit'] = mosaicMode.find("#list-videos-mosaic-post-limit-rows-squares").val();
                }


           } else if (dataAttr['display-mode'] === 'super-post') {

                superPostMode = elements.find("#list-videos-display-mode-options>.list-videos-super-post");
                dataAttr['elements-per-row'] = superPostMode.find("#list-videos-super-post-posts-per-row").val();
                dataAttr['posts-limit'] = superPostMode.find('#list-videos-super-post-limit').val();
                dataAttr['order-by'] = superPostMode.find('#list-videos-super-post-order-by').val();
                dataAttr['order-direction'] = superPostMode.find('#list-videos-super-post-order-direction').val();
                dataAttr['related-posts'] = superPostMode.find('#list-videos-super-post-show-related-y').attr('checked') ? 'y' : 'n';
                dataAttr['special-effects'] = superPostMode.find('#list-videos-super-post-special-effects').val();
                dataAttr['pagination'] = superPostMode.find('#list-videos-super-post-pagination').val();
           }

       } else if (elementType === 'events') {

            elements = jQuery("#builder-elements>.events");
            dataAttr = {};

            dataAttr['element-type'] = 'events';
            dataAttr['admin-label'] = elements.find("#events-admin-label").val();
            dataAttr['category'] = elements.find('select#events-category').val();
            dataAttr['id-exclude'] = elements.find('#events-exclude').val();
            dataAttr['exclude-first'] = elements.find('#events-exclude-first').val();
            dataAttr['posts-limit'] = elements.find('#events-nr-of-posts').val();
            dataAttr['order-by'] = elements.find('#events-order-by').val();
            dataAttr['order-direction'] = elements.find('#events-order-direction').val();
            dataAttr['special-effects'] = elements.find('#events-special-effects').val();
            dataAttr['pagination'] = elements.find('#events-pagination').val();

            if( elements.find('#events-admin-label').val().length > 0 ){
                elementName = elements.find('#events-admin-label').val();
            }

       } else if (elementType === 'calendar') {

            elements = jQuery("#builder-elements>.calendar");

            dataAttr = {};
            dataAttr['element-type'] = 'calendar';
            dataAttr['admin-label'] = elements.find("#calendar-admin-label").val();
            dataAttr['size'] = elements.find("#calendar-size").val();

            if( elements.find('#calendar-admin-label').val().length > 0 ){
                elementName = elements.find('#calendar-admin-label').val();
            }

        } else if (elementType === 'gallery') {

            elements = jQuery("#builder-elements>.gallery");

            dataAttr = {};
            dataAttr['element-type'] = 'gallery';
            dataAttr['admin-label'] = elements.find("#gallery-admin-label").val();
            dataAttr['images'] = elements.find("#gallery_image_gallery").val();
            dataAttr['layout'] = elements.find("#gallery_layout").val();
            dataAttr['scroll-effect'] = elements.find("#gallery_scroll_effect").val();
            dataAttr['items-per-row'] = elements.find("#gallery_items_per_row").val();
            dataAttr['grid-gallery-behavior'] = elements.find("#grid_gallery_behavior").val();
            dataAttr['image-size-height'] = elements.find("#gallery_custom_height").val();
            dataAttr['image-size-width'] = elements.find("#gallery_custom_width").val();

            if( elements.find('#gallery-admin-label').val().length > 0 ){
                elementName = elements.find('#gallery-admin-label').val();
            }

        } else if (elementType === 'chart') {

            dataAttr = {};
            dataAttr['element-type'] = 'chart';
            elements = jQuery("#builder-elements>.chart");
            items_array = '[';

            jQuery('#chart_line_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#chart_line_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-option-name="item_id"]').val();
                item_title = jQuery(this).find('[data-option-name="title"]').val().replace(/"/g, '--quote--');
                item_fillColor = jQuery(this).find('[data-option-name="fillColor"]').val().replace(/"/g, '--quote--');
                item_strokeColor = jQuery(this).find('[data-option-name="strokeColor"]').val().replace(/"/g, '--quote--');
                item_pointColor = jQuery(this).find('[data-option-name="pointColor"]').val().replace(/"/g, '--quote--');
                item_pointStrokeColor = jQuery(this).find('[data-option-name="pointStrokeColor"]').val().replace(/"/g, '--quote--');
                item_pointHighlightFill = jQuery(this).find('[data-option-name="pointHighlightFill"]').val().replace(/"/g, '--quote--');
                item_pointHighlightStroke = jQuery(this).find('[data-option-name="pointHighlightStroke"]').val().replace(/"/g, '--quote--');
                item_data = jQuery(this).find('[data-option-name="data"]').val().replace(/"/g, '--quote--');

                items_array = items_array + '{"id":' + '"' +  item_id + '"' + ',"title":' + '"' + item_title + '"' + ',"fillColor":' + '"' + item_fillColor + '"' + ',"strokeColor":' + '"' + item_strokeColor + '"' + ',"pointColor":' + '"' + item_pointColor + '"' + ',"pointStrokeColor":' + '"' + item_pointStrokeColor + '"' + ',"pointHighlightFill":' + '"' + item_pointHighlightFill + '"' + ',"pointHighlightStroke":' + '"' + item_pointHighlightStroke + '"' + ',"data":' + '"' + item_data + '"' + '}' + comma;

            });
            items_array = items_array + ']';
            jQuery('#chart_line_content').val(items_array);
            dataAttr['chart_line'] = elements.find('#chart_line_content').val();

            items_array = '[';

            jQuery('#chart_pie_items > li').each(function(){

                if ( jQuery(this).index() + 1 < jQuery('#chart_pie_items > li').length ) { var comma = ','}else{var comma = ''};
                item_id = jQuery(this).find('[data-option-name="item_id"]').val();
                item_title = jQuery(this).find('[data-option-name="title"]').val().replace(/"/g, '--quote--');
                item_value = jQuery(this).find('[data-option-name="value"]').val().replace(/"/g, '--quote--');
                item_color = jQuery(this).find('[data-option-name="color"]').val().replace(/"/g, '--quote--');
                item_highlight = jQuery(this).find('[data-option-name="highlight"]').val().replace(/"/g, '--quote--');

                items_array = items_array + '{"id":' + '"' +  item_id + '"' + ',"title":' + '"' + item_title + '"' + ',"value":' + '"' + item_value + '"' + ',"color":' + '"' + item_color + '"' + ',"highlight":' + '"' + item_highlight + '"' + '}' + comma;

            });
            items_array = items_array + ']';
            jQuery('#chart_pie_content').val(items_array);
            dataAttr['chart_pie'] = elements.find('#chart_pie_content').val();

            dataAttr['admin-label'] = elements.find('#chart-admin-label').val();
            dataAttr['mode'] = elements.find('#chart-mode').val();
            dataAttr['title'] = elements.find('#chart-title').val();
            dataAttr['label'] = elements.find('#chart-label').val();
            dataAttr['scaleShowGridLines'] = elements.find('#chart-scaleShowGridLines').val();
            dataAttr['scaleGridLineColor'] = elements.find('#chart-scaleGridLineColor').val();
            dataAttr['scaleGridLineWidth'] = elements.find('#chart-scaleGridLineWidth').val();
            dataAttr['scaleShowHorizontalLines'] = elements.find('#chart-scaleShowHorizontalLines').val();
            dataAttr['scaleShowVerticalLines'] = elements.find('#chart-scaleShowVerticalLines').val();
            dataAttr['bezierCurve'] = elements.find('#chart-bezierCurve').val();
            dataAttr['bezierCurveTension'] = elements.find('#chart-bezierCurveTension').val();
            dataAttr['pointDot'] = elements.find('#chart-pointDot').val();
            dataAttr['pointDotRadius'] = elements.find('#chart-pointDotRadius').val();
            dataAttr['pointDotStrokeWidth'] = elements.find('#chart-pointDotStrokeWidth').val();
            dataAttr['pointHitDetectionRadius'] = elements.find('#chart-pointHitDetectionRadius').val();
            dataAttr['datasetStroke'] = elements.find('#chart-datasetStroke').val();
            dataAttr['datasetStrokeWidth'] = elements.find('#chart-datasetStrokeWidth').val();
            dataAttr['datasetFill'] = elements.find('#chart-datasetFill').val();
            dataAttr['scaleShowLabelBackdrop'] = elements.find('#chart-scaleShowLabelBackdrop').val();
            dataAttr['segmentShowStroke'] = elements.find('#chart-segmentShowStroke').val();
            dataAttr['segmentStrokeColor'] = elements.find('#chart-segmentStrokeColor').val();
            dataAttr['segmentStrokeWidth'] = elements.find('#chart-segmentStrokeWidth').val();
            dataAttr['percentageInnerCutout'] = elements.find('#chart-percentageInnerCutout').val();
            dataAttr['animationSteps'] = elements.find('#chart-animationSteps').val();
            dataAttr['animateRotate'] = elements.find('#chart-animateRotate').val();
            dataAttr['animateScale'] = elements.find('#chart-animateScale').val();

            if( elements.find('#chart-admin-label').val().length > 0 ){
               elementName = elements.find('#chart-admin-label').val();
            }

        } else {
            dataAttr = {};
        }

        removePreviousOptions(currentEditedElement);

        jQuery.each(dataAttr, function(attr, value) {
            currentEditedElement.attr('data-' + attr, value);
        });

        currentEditedElement.find(".element-name").text(elementName);
        currentEditedElement.find('.element-icon').attr('class', 'element-icon ' + element_icon(dataAttr['element-type']));

    });

    jQuery(document).on('click', 'input#builder-save', function(event){

        elementType = jQuery('#builder-elements').attr('data-element-type');

        if( elementType == 'list-portfolios' ||
            elementType == 'last-posts' ||
            elementType == 'pricing-tables' ||
            elementType == 'list-videos' ||
            elementType == 'latest-custom-posts' ||
            elementType == 'events' ||
            elementType == 'accordion' ||
            elementType == 'list-galleries' ||
            elementType == 'list-products' ||
            elementType == 'filters' ){

            var selectedValue = false;

            jQuery('.' + elementType).find('select.ts-custom-select-input').each(function(){
                var inputId = jQuery(this).attr('id');

                if( inputId !== 'latest-custom-posts-type' && jQuery.isArray(jQuery(this).val()) ){
                    selectedValue = true;
                }
            });

            if( selectedValue == false ){
                noty({
                        layout: 'bottomCenter',
                        type: 'error',
                        timeout: 4000,
                        text: 'No category has been selected !'
                    });

            }else{
                jQuery('#ts-builder-elements-modal button.close').trigger('click');
            }
        }else{
            jQuery('#ts-builder-elements-modal button.close').trigger('click');
        }
    });

    function removePreviousOptions (element) {

        var elementType = element.attr('data-element-type'),
            attributes;

        if (elementType === 'logo') {

            attributes = ['element-type', 'logo-align', 'logo-effect', 'logo-effect-delay'];

        } else if (elementType === 'featured-article') {

            attributes = ['element-type', 'featured-article', 'title'];

        } else if (elementType === 'social-buttons') {

            attributes = ['element-type', 'social-align', 'admin-label', 'labels'];

        } else if (elementType === 'cart') {

            attributes = ['element-type', 'cart-align'];

        } else if (elementType === 'breadcrumbs') {

            attributes = ['element-type'];

        } else if (elementType === 'searchbox') {

            attributes = ['element-type', 'align', 'show-mobile'];

        } else if (elementType === 'menu') {

            attributes = ['element-type', 'element-style', 'sidebar-menu-style', 'name', 'menu-custom', 'menu-bg-color', 'menu-bg-color-hover', 'menu-text-color', 'menu-text-color-hover', 'submenu-bg-color', 'submenu-text-color-hover', 'submenu-bg-color-hover', 'submenu-text-color', 'menu-text-align', 'admin-label', 'uppercase', 'icons', 'description', 'search-icon', 'cart-element', 'social-icons', 'font-type', 'font-name', 'font-subsets', 'font-weight', 'font-style', 'font-size', 'font-demo', 'show-mobile', 'hide-decoration'];

        } else if (elementType === 'sidebar') {

            attributes = ['element-type', 'sidebar-id', 'sidebar-sticky'];

        } else if (elementType === 'slider') {

            attributes = ['element-type', 'slider-id'];

        } else if (elementType === 'list-portfolios') {

            attributes = ['element-type', 'category', 'display-mode', 'enable-carousel', 'display-title', 'show-meta', 'elements-per-row', 'posts-limit', 'order-by', 'order-direction', 'image-split', 'content-split', 'related-posts', 'show-label', 'special-effects', 'gutter', 'admin-label', 'admin-label', 'effects-scroll', 'layout', 'rows', 'scroll', 'pagination'];

        } else if (elementType === 'list-products') {

            attributes = ['element-type', 'category', 'behavior', 'elements-per-row', 'posts-limit', 'order-by', 'order-direction', 'special-effects', 'gutter', 'admin-label'];

        } else if (elementType === 'last-posts') {

            attributes = ['element-type', 'category', 'display-mode', 'behavior', 'display-title', 'show-meta', 'elements-per-row', 'posts-limit', 'order-by', 'order-direction', 'image-split', 'content-split', 'related-posts', 'show-label', 'special-effects', 'gutter', 'id-exclude', 'exclude-first', 'meta-thumbnail', 'pagination', 'admin-label', 'image', 'scroll', 'rows', 'effects-scroll', 'layout', 'featured', 'side-content', 'image-position', 'excerpt', 'carousel', 'show-image'];

        } else if (elementType === 'list-galleries') {

            attributes = ['element-type', 'category', 'display-mode', 'behavior', 'display-title', 'show-meta', 'elements-per-row', 'posts-limit', 'order-by', 'order-direction', 'image-split', 'content-split', 'related-posts', 'show-label', 'special-effects', 'gutter', 'id-exclude', 'exclude-first', 'meta-thumbnail', 'pagination', 'admin-label', 'image', 'scroll', 'rows', 'effects-scroll', 'layout', 'featured', 'side-content', 'image-position', 'excerpt', 'carousel', 'show-image'];

        } else if (elementType === 'latest-custom-posts') {

            attributes = ['element-type', 'post-type', 'category', 'display-mode', 'behavior', 'display-title', 'show-meta', 'elements-per-row', 'posts-limit', 'order-by', 'order-direction', 'image-split', 'content-split', 'related-posts', 'show-label', 'special-effects', 'gutter', 'id-exclude', 'exclude-first', 'meta-thumbnail', 'pagination', 'admin-label', 'image', 'scroll', 'rows', 'effects-scroll', 'layout', 'featured', 'excerpt', 'carousel', 'show-image'];

        } else if (elementType === 'callaction') {

            attributes = ['element-type', 'callaction-text', 'callaction-link', 'callaction-button-text', 'admin-label'];

        } else if (elementType === 'instance') {

            attributes = ['element-type', 'image', 'button-target', 'button-url', 'button-text', 'admin-label', 'content', 'align', 'title'];

        } else if (elementType === 'accordion') {

            attributes = ['element-type', 'admin-label', 'category', 'featured', 'order-by', 'order-direction', 'nr-of-posts', 'posts-type'];

        } else if (elementType === 'image-carousel') {

            attributes = ['element-type', 'images', 'carousel-height', 'admin-label'];

        } else if (elementType === 'boca' || elementType === 'nona') {

            attributes = ['element-type', 'custom-post', 'category', 'orderby', 'admin-label', 'order', 'featured', 'posts_per_page'];

        } else if (elementType === 'teams') {

            attributes = ['element-type', 'elements-per-row', 'posts-limit', 'remove-gutter', 'enable-carousel', 'admin-label', 'effect', 'delay'];

        } else if (elementType === 'pricing-tables') {

            attributes = ['element-type', 'elements-per-row', 'posts-limit', 'remove-gutter', 'equal-height', 'admin-label', 'effect', 'delay'];

        } else if (elementType === 'advertising') {

            attributes = ['element-type', 'advertising', 'admin-label'];

        } else if (elementType === 'empty') {

            attributes = ['element-type'];

        } else if (elementType === 'delimiter') {

            attributes = ['element-type', 'delimiter-type', 'delimiter-color', 'admin-label'];

        } else if (elementType === 'title') {

            attributes = ['title-icon', 'element-type', 'title', 'subtitle', 'style', 'size', 'admin-label', 'target', 'link', 'effect', 'delay', 'letter-spacer'];

        } else if (elementType === 'video') {

            attributes = ['element-type',  'embed', 'admin-label', 'lightbox', 'title'];

        } else if (elementType === 'icon') {

            attributes = ['element-type',  'icon', 'icon-size', 'icon-color', 'icon-align', 'admin-label'];

        } else if (elementType === 'clients') {

            attributes = ['element-type',  'clients', 'enable-carousel', 'elements-per-row', 'admin-label'];

        } else if (elementType === 'features-block') {

            attributes = ['element-type',  'features-block', 'elements-per-row', 'style', 'admin-label' ,'gutter'];

        } else if (elementType === 'listed-features') {

            attributes = ['element-type',  'features', 'features-align', 'color-style', 'admin-label'];

        } else if (elementType === 'facebook-block') {

            attributes = ['element-type', 'facebook-url', 'cover'];

        } else if (elementType === 'image') {

            attributes = ['element-type', 'image-url', 'image-target', 'forward-url', 'admin-label', 'retina', 'align', 'effect', 'delay'];

        } else if (elementType === 'powerlink') {

            attributes = ['element-type', 'image', 'button-text', 'button-title', 'admin-label', 'title'];

        } else if (elementType === 'filters') {

            attributes = ['element-type', 'categories', 'posts-limit', 'elements-per-row', 'order-by', 'direction', 'admin-label', 'meta-thumbnail'];

        } else if (elementType === 'spacer') {

            attributes = ['element-type', 'height', 'show-mobile', 'admin-label'];

        } else if (elementType === 'counters') {

            attributes = ['element-type', 'counters-text', 'counters-precents', 'counters-text-color', 'admin-label', 'track-bar-color', 'track-bar', 'track-bar-icon', 'effect', 'delay'];

        } else if (elementType === 'alert') {

            attributes = ['element-type', 'admin-label', 'icon', 'title', 'text', 'background-color', 'text-color'];

        } else if (elementType === 'page') {

            attributes = ['element-type', 'post-id', 'search', 'criteria', 'order-by', 'direction'];

        } else if (elementType === 'post') {

            attributes = ['element-type', 'post-id', 'search', 'criteria', 'order-by', 'direction'];

        } else if (elementType === 'timeline') {

            attributes = ['element-type', 'admin-label', 'timeline'];

        }  else if (elementType === 'toggle') {

            attributes = ['element-type', 'admin-label', 'toggle-title', 'toggle-description', 'toggle-state', 'align-image'];

        } else if (elementType === 'buttons') {

            attributes = ['element-type', 'button-icon', 'text', 'icon-align', 'size', 'target', 'text-color', 'bg-color', 'url', 'button-align', 'admin-label', 'mode-display', 'border-color', 'effect', 'delay', 'text-hover-color', 'border-hover-color', 'bg-hover-color'];

        } else if (elementType === 'ribbon') {

            attributes = ['element-type', 'text', 'title', 'background', 'align', 'button-icon', 'button-text', 'button-size', 'button-target', 'text-color', 'button-background-color', 'button-url', 'button-button-align', 'admin-label', 'button-mode-display', 'button-border-color', 'image', 'button-text-color'];

        } else if (elementType === 'contact-form') {

            attributes = ['element-type', 'hide-icon', 'hide-subject', 'admin-label', 'contact-form'];

        } else if (elementType === 'featured-area') {

            attributes = ['element-type', 'selected-categories', 'exclude-first', 'admin-label', 'custom-post', 'order-by', 'order-direction'];

        } else if (elementType === 'shortcodes') {

            attributes = ['element-type', 'shortcodes', 'admin-label', 'paddings'];

        } else if (elementType === 'tab') {

            attributes = ['element-type', 'admin-label', 'tab', 'mode'];

        } else if (elementType === 'video-carousel') {

            attributes = ['element-type', 'admin-label', 'video-carousel', 'source'];

        } else if (elementType === 'grease-slider') {

            attributes = ['element-type', 'admin-label', 'grease-slider', 'source'];

        } else if (elementType === 'elastic-slider') {

            attributes = ['element-type', 'admin-label', 'elastic-slider', 'source'];

        } else if (elementType === 'count-down') {

            attributes = ['element-type', 'admin-label', 'title', 'date', 'hours', 'style'];

        } else if (elementType === 'testimonials') {

            attributes = ['element-type', 'testimonials', 'elements-per-row', 'enable-carousel', 'admin-label'];

        } else if (elementType === 'map') {

            attributes = ['element-type', 'map-address', 'map-width', 'map-height', 'map-longitude', 'map-latitude', 'map-type', 'map-style',
                            'map-zoom', 'map-type-control', 'map-zoom-control', 'map-scale-control', 'map-scroll-wheel',
                            'map-draggable-direction', 'map-marker-icon', 'map-marker-img', 'admin-label'];

        } else if (elementType === 'banner') {

            attributes = ['element-type', 'banner-image', 'banner-title', 'banner-subtitle', 'banner-button-title', 'banner-button-url', 'banner-button-background', 'banner-font-color', 'banner-text-align', 'banner-height', 'admin-label', 'button-text-color'];

        } else if (elementType === 'text') {

            attributes = ['element-type', 'text', 'admin-label', 'effect'];

        } else if (elementType === 'list-videos') {

            attributes = ['element-type', 'category', 'display-mode', 'behavior', 'display-title', 'show-meta', 'elements-per-row', 'posts-limit', 'order-by', 'order-direction', 'image-split', 'content-split', 'related-posts', 'show-label', 'special-effects', 'gutter', 'id-exclude', 'exclude-first', 'meta-thumbnail', 'pagination', 'admin-label', 'image', 'scroll', 'rows', 'effects-scroll', 'layout', 'excerpt', 'carousel', 'show-image'];

        } else if (elementType === 'events') {

            attributes = ['element-type', 'category', 'posts-limit', 'order-by', 'order-direction', 'special-effects', 'id-exclude', 'exclude-first', 'pagination', 'admin-label'];

        } else if (elementType === 'calendar') {

            attributes = ['element-type', 'admin-label', 'size'];

        } else if (elementType === 'gallery') {

            attributes = ['element-type', 'admin-label', 'images', 'layout', 'scroll-effect', 'items-per-row', 'grid-gallery-behavior', 'image-size-height', 'image-size-width'];

        } else if (elementType === 'skills') {

            attributes = ['element-type', 'admin-label', 'display-mode', 'skills'];

        } else if (elementType === 'chart') {

            attributes = ['element-type', 'admin-label', 'mode', 'label', 'title', 'scaleShowGridLines', 'scaleGridLineColor', 'scaleGridLineWidth', 'scaleShowHorizontalLines', 'scaleShowVerticalLines', 'bezierCurve', 'bezierCurveTension', 'pointDot', 'pointDotRadius', 'pointDotStrokeWidth', 'pointHitDetectionRadius', 'datasetStroke', 'datasetStrokeWidth', 'datasetFill', 'chart_line', 'segmentShowStroke', 'segmentStrokeColor', 'segmentStrokeWidth', 'percentageInnerCutout', 'animationSteps', 'animateRotate', 'animateScale', 'chart_pie'];

        } else {
            attributes = [];
        }

        if( !jQuery.isEmptyObject(attributes) ) {
            jQuery.each(attributes, function(index, attribute) {
                element.removeAttr('data-' + attribute);
            });
        }
    }

    jQuery(document).on('click', '#last-posts-display-mode-selector li img', function(e){
        var mode_display = jQuery(this).attr('data-option');
        tsz_show_post_exclude_first('last-posts', mode_display);
        jQuery('#last-posts-' + mode_display + '-order-direction option[value=desc]').attr({'selected':'selected'});
    });

    jQuery(document).on('click', '#list-galleries-display-mode-selector li img', function(e){
        var mode_display = jQuery(this).attr('data-option');
        tsz_show_post_exclude_first('list-galleries', mode_display);
        jQuery('#list-galleries-' + mode_display + '-order-direction option[value=desc]').attr({'selected':'selected'});
    });

    jQuery(document).on('click', '#latest-custom-posts-display-mode-selector li img', function(e){
        var mode_display = jQuery(this).attr('data-option');
        tsz_show_post_exclude_first('latest-custom-posts', mode_display);
        jQuery('#latest-custom-posts-' + mode_display + '-order-direction option[value=desc]').attr({'selected':'selected'});
    });

    jQuery(document).on('click', '[data-value="list-videos"]', function(e){
        display_mode = jQuery('#list-videos-display-mode-selector').find('li.selected img').attr('data-option');
        tsz_show_post_exclude_first('list-videos', display_mode);
    });

    jQuery(document).on('click', '[data-value="last-posts"]', function(e){
        display_mode = jQuery('#last-posts-display-mode-selector').find('li.selected img').attr('data-option');
        tsz_show_post_exclude_first('last-posts', display_mode);
    });

    jQuery(document).on('click', '[data-value="list-galleries"]', function(e){
        display_mode = jQuery('#list-galleries-display-mode-selector').find('li.selected img').attr('data-option');
        tsz_show_post_exclude_first('list-galleries', display_mode);
    });

    jQuery(document).on('click', '[data-value="latest-custom-posts"]', function(e){
        display_mode = jQuery('#latest-custom-posts-display-mode-selector').find('li.selected img').attr('data-option');
        tsz_show_post_exclude_first('latest-custom-posts', display_mode);
    });

    jQuery(document).on('click', '#list-videos-display-mode-selector li img', function(e){
        var mode_display = jQuery(this).attr('data-option');
        tsz_show_post_exclude_first('list-videos', mode_display);
        jQuery('#list-videos-' + mode_display + '-order-direction option[value=desc]').attr({'selected':'selected'});
    });

});

jQuery(document).on('change', '.ts-mosaic-layout', function(e){
    if( jQuery(this).val() == 'rectangles' ){

        jQuery(this).closest('table').find('.ts-mosaic-post-limit-squares').css('display', 'none');
        jQuery(this).closest('table').find('.ts-mosaic-rows').closest('tr').css('display', '');

        if( jQuery(this).closest('table').find('.ts-mosaic-rows').val() == '2' ){
            jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-2').css('display', '');
            jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-3').css('display', 'none');
        }else{
            jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-3').css('display', '');
            jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-2').css('display', 'none');
        }
    }else{
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-squares').css('display', '');
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-3').css('display', 'none');
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-2').css('display', 'none');
        jQuery(this).closest('table').find('.ts-mosaic-rows').closest('tr').css('display', 'none');
    }
});

jQuery(document).on('change', '.ts-mosaic-rows', function(e){

    jQuery(this).closest('table').find('.ts-mosaic-post-limit-squares').css('display', 'none');

    if( jQuery(this).val() == '2' ){
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-2').css('display', '');
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-3').css('display', 'none');
    }else{
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-3').css('display', '');
        jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-2').css('display', 'none');
    }
});

jQuery(document).on('change', '#filters-post-type', function(e){
    var customPost = jQuery(this).val();
    jQuery(this).find('option').each(function(){
        jQuery('#' + jQuery(this).val() + '-categories').addClass('hidden');
        jQuery('#' + jQuery(this).val() + '-categories').find('li.select2-search-choice').remove();
        jQuery('#' + jQuery(this).val() + '-categories').find('option').removeAttr('selected');
    });
    jQuery('#' + customPost + '-categories').removeClass('hidden');
});

jQuery(document).on('change', '#accordion-posts-type', function(e){

    jQuery('.ts-accordion-category').each(function(){
        jQuery(this).addClass('hidden');
    });

    jQuery('.ts-accordion-category option').removeAttr('selected');
    jQuery('.ts-custom-select-input li.select2-search-choice').remove();
    jQuery('.ts-accordion-category-' + jQuery(this).val()).removeClass('hidden');
});

jQuery(document).on('change', '.ts-select-animation select', function(){
    if( jQuery(this).val() !== 'none' ){
        jQuery(this).closest('table').find('.ts-select-delay').css('display', '');
    }else{
        jQuery(this).closest('table').find('.ts-select-delay').css('display', 'none');
    }
});

jQuery(document).on('change', '#video-lightbox', function(){
    if( jQuery(this).val() == 'n' ){
        jQuery('.ts-video-title').css('display', 'none');
    }else{
        jQuery('.ts-video-title').css('display', '');
    }
});

jQuery(document).on('change', '.contact-form-type', function(){
    if( jQuery(this).val() == 'select' ){
        jQuery(this).parent().parent().parent().find('.contact-form-options').css('display','');
    }else{
        jQuery(this).parent().parent().parent().find('.contact-form-options').css('display','none');
    }
});

function tsToggleOptionsCustomPost(elem) {
    jQuery(document).on('change', '#'+ elem +'-custom-post', function(){

        if( jQuery(this).val() == 'video' ){
            jQuery('.select2-choices li:not(.select2-search-field)').remove();
            jQuery('.'+ elem +'-ts-gallery').css('display','none').find('option').removeAttr('selected');
            jQuery('.'+ elem +'-post').css('display','none').find('option').removeAttr('selected');
            jQuery('.'+ elem +'-video').css('display','');
        }else if( jQuery(this).val() == 'ts-gallery' ){
            jQuery('.select2-choices li:not(.select2-search-field)').remove();
            jQuery('.'+ elem +'-post').css('display','none').find('option').removeAttr('selected');
            jQuery('.'+ elem +'-video').css('display','none').find('option').removeAttr('selected');
            jQuery('.'+ elem +'-ts-gallery').css('display','');
        }else if( jQuery(this).val() == 'post' ){
            jQuery('.select2-choices li:not(.select2-search-field)').remove();
            jQuery('.'+ elem +'-post').css('display','');
            jQuery('.'+ elem +'-video').css('display','none').find('option').removeAttr('selected');
            jQuery('.'+ elem +'-ts-gallery').css('display','none').find('option').removeAttr('selected');
        }
    });
}

tsToggleOptionsCustomPost('featured-area');
tsToggleOptionsCustomPost('boca');
tsToggleOptionsCustomPost('nona');

jQuery(document).on('change', '#counters-track-bar', function(){
    if( jQuery(this).val() == 'with-track-bar' ){
        jQuery('.ts-counters-track-bar-color').css('display', '');
        jQuery('.ts-counters-icons').css('display', 'none');
    }else{
        jQuery('.ts-counters-track-bar-color').css('display', 'none');
        jQuery('.ts-counters-icons').css('display', '');
    }
});

jQuery(document).on('change', '#video-carousel-source', function(){
    if( jQuery(this).val() == "custom-slides" ){
        jQuery(".ts-video-carousel-custom").css("display", "");
    }else{
        jQuery(".ts-video-carousel-custom").css("display", "none");
    }
});
jQuery(document).on('change', '#grease-slider-source', function(){
    if( jQuery(this).val() == "custom-slides" ){
        jQuery(".ts-grease-slider-custom").css("display", "");
    }else{
        jQuery(".ts-grease-slider-custom").css("display", "none");
    }
});

jQuery(document).on('change', '#elastic-slider-source', function(){
    if( jQuery(this).val() == "custom-slides" ){
        jQuery(".ts-elastic-slider-custom").css("display", "");
    }else{
        jQuery(".ts-elastic-slider-custom").css("display", "none");
    }
});

jQuery(document).on('change', '#chart-mode', function(){
    if( jQuery(this).val() == 'pie' ){
        jQuery('.chart-line-options').css('display', 'none');
        jQuery('.chart-pie-options').css('display', '');
    }else{
        jQuery('.chart-line-options').css('display', '');
        jQuery('.chart-pie-options').css('display', 'none');
    }
});

// search post and pages
jQuery(document).on('click', '.search-posts-buttons', function(event) {
    event.preventDefault();

    var search,
        serverResponse = '';

    search = jQuery('#featured-article-search-post').val();

    jQuery.post(ajaxurl + '?action=photoedge_search_content', {
        search: search

    }).done(function(data) {
        if (data.length) {

            var checked = '';

            jQuery.each(data, function(index, post) {

                checked = (window.rtSelectPostInSearchResults == post.id ) ? 'checked="checked"' : '';

                serverResponse += '<tr><td><input id="postID-' + post.id + '" type="radio" name="postID" value="' + post.id + '" ' + checked + '/></td><td><label for="postID-' + post.id + '">' + post.title + '</label></td></tr>';
            });

        } else {
            serverResponse = 'No posts found.';
        }

    }).fail(function(){
        serverResponse = 'Error. Please try again!';

    }).always(function(){
        jQuery('#search-text-results').css('display', '');
        jQuery('#search-posts-results').html(serverResponse);
    });
});

jQuery( document ).on( 'click', '.tsz-editor-modal-close, .ts-save-editor', function( e ) {
    e.preventDefault();

    jQuery( '.tsz-text-editor-modal' ).css( 'display', 'none' );

    jQuery( '.mce-inline-toolbar-grp' ).hide();

    jQuery( 'body' ).removeClass( 'tsz-modal-editor-open' );

    if ( jQuery( this ).hasClass( 'tsz-editor-modal-close' ) ) {

        tinymce.get( 'ts_editor_id' ).setContent( '' );
    }
});

jQuery( document ).on( 'click', 'li#icon-text', function( event ) {
    event.preventDefault();

    jQuery( '#ts-builder-elements-modal .close' ).trigger( 'click' );

    jQuery( '.tsz-text-editor-modal' ).css( 'display', 'block' );

    jQuery( 'body' ).addClass( 'tsz-modal-editor-open' );
});
jQuery( '.tsz-text-editor-modal' ).find( '#ts-toggle-layout-builder' ).remove();
