window.currentEditedElement = undefined;
window.currentEditedRow = undefined;
window.custom_uploader = {};
window.rtSelectPostInSearchResults = undefined;
window.rtSelectPageInSearchResults = undefined;

jQuery(document).ready(function($) {

    var rowOptions = {
        connectWith :'.layout_builder_row',
        placeholder : 'ui-state-highlight',
        items : '>li:not(.empty-row,.row-editor,.edit-row-settings)',
        cancel: 'span.add-element, .edit, .delete'
    };

    var layout = {

        init: function() {
            $('.layout_builder').sortable({
                cancel: 'li a.row-editor, li a.add-column, li a.remove-row, li a.edit-row, .edit, .delete, span.add-element, span.delete-column',
                stop: function( event, ui ) {
                    window.builderDataChanged = true;
                }
            });
            $('.layout_builder_row').sortable(rowOptions);

            $('.elements').sortable({
                items : 'li',
                connectWith :'.elements',
                cancel: '.edit, .delete',
                stop: function( event, ui ) {
                    window.builderDataChanged = true;
                }
            });
        },

        validateAction : function() {
            if (confirm('Are you sure?') === false) {
                return false;
            } else {
                return true;
            }
        },

        columnSize : function (element) {
            var size = $(element).attr('data-columns');
            if ( size < 2  || size > 12 ) {
                return 2;
            } else {
                return size;
            }
        },

        columnSizeInfo : function (size) {

            switch(size) {
                case 2:
                    size = '1/6';
                    break;
                case 3:
                    size = '1/4';
                    break;
                case 4:
                    size = '1/3';
                    break;
                case 5:
                    size = '5/12';
                    break;
                case 6:
                    size = '1/2';
                    break;
                case 7:
                    size = '7/12';
                    break;
                case 8:
                    size = '2/3';
                    break;
                case 9:
                    size = '3/4';
                    break;
                case 10:
                    size = '5/6';
                    break;
                case 11:
                    size = '11/12';
                    break;
                case 12:
                    size = '12/12';
                    break;
                default:
                    size = '';
            }

            return size;
        },

        validateReceived : function (row, ui) {
            if (layout.rowSize(row) == 1) {
                var empty = $('.layout_builder_row li.empty-row');
                if (empty.length) {
                    empty.remove();
                }
            }

            if (layout.rowSize(row) > 12) {
                $(ui.sender).sortable('cancel');
                var n = noty({
                    layout: 'bottomCenter',
                    type: 'error',
                    timeout: 4000,
                    text: 'Decrease the size of this column or one from the row'
                });
            }
        },

        // calculate the size of columns in a specific row
        rowSize : function(row) {
            var sum = 0;

            row.find('>li:not(.empty-row, .row-editor, .edit-row-settings)').each(function(index, element) {
                sum += parseInt($(this).attr("data-columns"), 10);
            });

            return sum;
        },

        // return the row of
        getElementRow : function(ui) {
            return $(ui.item).parent();
        },

        insertRow : function(container, position) {
            var containter = $(containter);

            if (position == 'top') {
                containter.prepend('row');
            } else {
                containter.append('row');
            }

            containter.sortable('refresh');
        },

        insertColumn: function(row, size) {
            if (layout.getRowSize(row) + size > 12) {

            } else {
                $(row).append('row design');
            }
        },

        getColumnSettings: function (column) {
            var settings = {};

            column = $(column);

            settings.columnName = column.attr("data-name-id") ? column.attr("data-name-id") : '';
            settings.bgColor = column.attr("data-bg-color") ? column.attr("data-bg-color") : '';
            settings.textColor = column.attr("data-text-color") ? column.attr("data-text-color") : '';
            settings.columnMaskColor = column.attr("data-mask-color") ? column.attr("data-mask-color") : '';
            settings.columnOpacity = column.attr("data-opacity") ? column.attr("data-opacity") : '';
            settings.bgImage = column.attr("data-bg-image") ? column.attr("data-bg-image") : '';
            settings.bgVideoMp = column.attr("data-bg-video-mp") ? column.attr("data-bg-video-mp") : '';
            settings.bgVideoWebm = column.attr("data-bg-video-webm") ? column.attr("data-bg-video-webm") : '';
            settings.bgPosition = column.attr("data-bg-position") ? column.attr("data-bg-position") : '';
            settings.bgAttachement = column.attr("data-bg-attachment") ? column.attr("data-bg-attachment") : '';
            settings.bgRepeat = column.attr("data-bg-repeat") ? column.attr("data-bg-repeat") : '';
            settings.bgSize = column.attr("data-bg-size") ? column.attr("data-bg-size") : '';
            settings.columnPaddingTop = column.attr("data-padding-top") ? column.attr("data-padding-top") : '';
            settings.columnPaddingBottom = column.attr("data-padding-bottom") ? column.attr("data-padding-bottom") : '';
            settings.columnPaddingLeft = column.attr("data-padding-left") ? column.attr("data-padding-left") : '';
            settings.columnPaddingRight = column.attr("data-padding-right") ? column.attr("data-padding-right") : '';
            settings.columnTextAlign = column.attr("data-text-align") ? column.attr("data-text-align") : '';
            settings.columnMask = column.attr("data-mask") ? column.attr("data-mask") : '';
            settings.gutterLeft = column.attr("data-gutter-left") ? column.attr("data-gutter-left") : '20';
            settings.gutterRight = column.attr("data-gutter-right") ? column.attr("data-gutter-right") : '20';
            settings.gradientMaskMode = column.attr("data-mask-gradient-mode") ? column.attr("data-mask-gradient-mode") : 'radial';
            settings.maskGradient = column.attr("data-mask-gradient") ? column.attr("data-mask-gradient") : '#fff';
            settings.transparent = column.attr("data-transparent") ? column.attr("data-transparent") : 'y';

            return settings;
        },

        getRowSettings: function (row) {
            var settings = {};

            row = $(row);

            settings.rowName = row.attr("data-name-id") ? row.attr("data-name-id") : '';
            settings.bgColor = row.attr("data-bg-color") ? row.attr("data-bg-color") : '';
            settings.textColor = row.attr("data-text-color") ? row.attr("data-text-color") : '';
            settings.rowMaskColor = row.attr("data-mask-color") ? row.attr("data-mask-color") : '';
            settings.rowOpacity = row.attr("data-opacity") ? row.attr("data-opacity") : '';
            settings.bgImage = row.attr("data-bg-image") ? row.attr("data-bg-image") : '';
            settings.bgVideoMp = row.attr("data-bg-video-mp") ? row.attr("data-bg-video-mp") : '';
            settings.bgVideoWebm = row.attr("data-bg-video-webm") ? row.attr("data-bg-video-webm") : '';
            settings.bgPositionX = row.attr("data-bg-position-x") ? row.attr("data-bg-position-x") : '';
            settings.bgPositionY = row.attr("data-bg-position-y") ? row.attr("data-bg-position-y") : '';
            settings.bgAttachement = row.attr("data-bg-attachment") ? row.attr("data-bg-attachment") : '';
            settings.bgRepeat = row.attr("data-bg-repeat") ? row.attr("data-bg-repeat") : '';
            settings.bgSize = row.attr("data-bg-size") ? row.attr("data-bg-size") : '';

            settings.rowMarginTop = row.attr("data-margin-top") ? row.attr("data-margin-top") : '';
            settings.rowMarginBottom = row.attr("data-margin-bottom") ? row.attr("data-margin-bottom") : '';
            settings.rowPaddingTop = row.attr("data-padding-top") ? row.attr("data-padding-top") : '';
            settings.rowPaddingBottom = row.attr("data-padding-bottom") ? row.attr("data-padding-bottom") : '';
            settings.expandRow = row.attr("data-expand-row") ? row.attr("data-expand-row") : '';
            settings.specialEffects = row.attr("data-special-effects") ? row.attr("data-special-effects") : '';
            settings.rowTextAlign = row.attr("data-text-align") ? row.attr("data-text-align") : '';
            settings.fullscreenRow = row.attr("data-fullscreen-row") ? row.attr("data-fullscreen-row") : '';
            settings.rowMask = row.attr("data-mask") ? row.attr("data-mask") : '';
            settings.rowShadow = row.attr("data-shadow") ? row.attr("data-shadow") : '';
            settings.rowVerticalAlign = row.attr("data-vertical-align") ? row.attr("data-vertical-align") : '';
            settings.scrollDownButton = row.attr("data-scroll-down-button") ? row.attr("data-scroll-down-button") : '';
            settings.rowParallax = row.attr("data-parallax") ? row.attr("data-parallax") : 'no';
            settings.customCss = row.attr("data-custom-css") ? row.attr("data-custom-css") : '';
            settings.borderTop = row.attr("data-border-top") ? row.attr("data-border-top") : 'n';
            settings.borderBottom = row.attr("data-border-bottom") ? row.attr("data-border-bottom") : 'n';
            settings.borderTopColor = row.attr("data-border-top-color") ? row.attr("data-border-top-color") : '#fff';
            settings.borderBottomColor = row.attr("data-border-bottom-color") ? row.attr("data-border-bottom-color") : '#fff';
            settings.borderTopWidth = row.attr("data-border-top-width") ? row.attr("data-border-top-width") : '3';
            settings.borderBottomWidth = row.attr("data-border-bottom-width") ? row.attr("data-border-bottom-width") : '3';
            settings.rowCarousel = row.attr("data-carousel") ? row.attr("data-carousel") : '3';
            settings.sliderBackground = row.attr("data-slider-background") ? row.attr("data-slider-background") : 'no';
            settings.gradientMaskMode = row.attr("data-mask-gradient-mode") ? row.attr("data-mask-gradient-mode") : 'radial';
            settings.rowMaskGradient = row.attr("data-mask-gradient") ? row.attr("data-mask-gradient") : '#fff';
            settings.transparent = row.attr("data-transparent") ? row.attr("data-transparent") : 'y';

            return settings;
        },

        getElementData : function (element) {
            var e = $(element),
                elementType = e.attr('data-element-type'),
                elementData = {};

            if (elementType === 'empty') {
                elementData.type = 'empty';

            } else if (elementType === 'logo') {
                elementData.type = 'logo';
                elementData['logo-align'] = e.attr('data-logo-align');
                elementData['logo-effect'] = e.attr('data-logo-effect');
                elementData['logo-effect-delay'] = e.attr('data-logo-effect-delay');

            } else if (elementType === 'cart') {
                elementData.type = 'cart';
                elementData['cart-align'] = e.attr('data-cart-align');

            } else if (elementType === 'breadcrumbs') {

                elementData.type = 'breadcrumbs';

            } else if (elementType === 'instance') {

                elementData.type = 'instance';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['title'] = e.attr('data-title');
                elementData['image'] = e.attr('data-image');
                elementData['align'] = e.attr('data-align');
                elementData['button-url'] = e.attr('data-button-url');
                elementData['button-target'] = e.attr('data-button-target');
                elementData['button-text'] = e.attr('data-button-text');
                elementData['content'] = e.attr('data-content');

            } else if (elementType === 'featured-article') {

                elementData.type = 'featured-article';
                elementData['post-id'] = e.attr('data-post-id');
                elementData['post-title'] = e.attr('data-post-title');
                elementData['showImage'] = e.attr('data-showImage');
                elementData['showMeta'] = e.attr('data-showMeta');

            } else if (elementType === 'social-buttons') {

                elementData.type = 'social-buttons';
                elementData['social-align'] = e.attr('data-social-align');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['labels'] = e.attr('data-labels');

            } else if (elementType === 'searchbox') {

                elementData.type = 'searchbox';
                elementData['align'] = e.attr('data-align');
                elementData['show-mobile'] = e.attr('data-show-mobile');

            } else if (elementType === 'menu') {

                elementData.type = 'menu';
                elementData['element-style'] = e.attr('data-element-style');
                elementData['sidebar-menu-style'] = e.attr('data-sidebar-menu-style');
                elementData['menu-custom'] = e.attr('data-menu-custom');
                elementData['menu-bg-color'] = e.attr('data-menu-bg-color');
                elementData['menu-text-color'] = e.attr('data-menu-text-color');
                elementData['menu-bg-color-hover'] = e.attr('data-menu-bg-color-hover');
                elementData['menu-text-color-hover'] = e.attr('data-menu-text-color-hover');
                elementData['submenu-bg-color'] = e.attr('data-submenu-bg-color');
                elementData['submenu-text-color'] = e.attr('data-submenu-text-color');
                elementData['submenu-bg-color-hover'] = e.attr('data-submenu-bg-color-hover');
                elementData['submenu-text-color-hover'] = e.attr('data-submenu-text-color-hover');
                elementData['menu-text-align'] = e.attr('data-menu-text-align');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['uppercase'] = e.attr('data-uppercase');
                elementData['name'] = e.attr('data-name');
                elementData['icons'] = e.attr('data-icons');
                elementData['description'] = e.attr('data-description');
                elementData['search-icon'] = e.attr('data-search-icon');
                elementData['cart-element'] = e.attr('data-cart-element');
                elementData['social-icons'] = e.attr('data-social-icons');
                elementData['font-type'] = e.attr('data-font-type');
                elementData['font-name'] = e.attr('data-font-name');
                elementData['font-subsets'] = e.attr('data-font-subsets');
                elementData['font-weight'] = e.attr('data-font-weight');
                elementData['font-style'] = e.attr('data-font-style');
                elementData['font-size'] = e.attr('data-font-size');
                elementData['font-demo'] = e.attr('data-font-demo');
                elementData['show-mobile'] = e.attr('data-show-mobile');
                elementData['hide-decoration'] = e.attr('data-hide-decoration');

            } else if (elementType === 'sidebar') {

                elementData.type = 'sidebar';
                elementData['sidebar-id'] = e.attr('data-sidebar-id');
                elementData['sidebar-sticky'] = e.attr('data-sidebar-sticky');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'slider') {

                elementData.type = 'slider';
                elementData['slider-id'] = e.attr('data-slider-id');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'list-portfolios') {

                elementData.type = 'list-portfolios';
                elementData.category = e.attr('data-category');
                elementData['display-mode'] = e.attr('data-display-mode');
                elementData['admin-label'] = e.attr('data-admin-label');

                if (elementData['display-mode'] == 'grid') {

                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');

                } else if (elementData['display-mode'] == 'list') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');

                } else if (elementData['display-mode'] == 'thumbnails') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['show-label'] = e.attr('data-show-label');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['gutter'] = e.attr('data-gutter');

                } else if (elementData['display-mode'] == 'big-post') {

                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image-split'] = e.attr('data-image-split');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');

                } else if (elementData['display-mode'] == 'super-post') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');

                } else if (elementData['display-mode'] == 'mosaic') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['effects-scroll'] = e.attr('data-effects-scroll');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['layout'] = e.attr('data-layout');
                    elementData['rows'] = e.attr('data-rows');
                    elementData['scroll'] = e.attr('data-scroll');
                    elementData['pagination'] = e.attr('data-pagination');

                }

            } else if (elementType === 'testimonials') {

                elementData.type = 'testimonials';
                elementData['testimonials'] = e.attr('data-testimonials');
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['enable-carousel'] = e.attr('data-enable-carousel');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'tab') {

                elementData.type = 'tab';
                elementData['tab'] = e.attr('data-tab');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['mode'] = e.attr('data-mode');

            } else if (elementType === 'video-carousel') {

                elementData.type = 'video-carousel';
                elementData['video-carousel'] = e.attr('data-video-carousel');
                elementData['source'] = e.attr('data-source');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'grease-slider') {

                elementData.type = 'grease-slider';
                elementData['grease-slider'] = e.attr('data-grease-slider');
                elementData['source'] = e.attr('data-source');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'elastic-slider') {

                elementData.type = 'elastic-slider';
                elementData['elastic-slider'] = e.attr('data-elastic-slider');
                elementData['source'] = e.attr('data-source');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'count-down') {

                elementData.type = 'count-down';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['title'] = e.attr('data-title');
                elementData['date'] = e.attr('data-date');
                elementData['hours'] = e.attr('data-hours');
                elementData['style'] = e.attr('data-style');

            } else if (elementType === 'list-products') {

                elementData.type = 'list-products';
                elementData.category = e.attr('data-category');
                elementData['behavior'] = e.attr('data-behavior');
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['posts-limit'] = e.attr('data-posts-limit');
                elementData['order-by'] = e.attr('data-order-by');
                elementData['order-direction'] = e.attr('data-order-direction');
                elementData['special-effects'] = e.attr('data-special-effects');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'boca' || elementType === 'nona') {

                elementData.type = elementType;
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['custom-post'] = e.attr('data-custom-post');
                elementData['category'] = e.attr('data-category');
                elementData['posts_per_page'] = e.attr('data-posts_per_page');
                elementData['orderby'] = e.attr('data-orderby');
                elementData['order'] = e.attr('data-order');
                elementData['featured'] = e.attr('data-featured');

            } else if (elementType === 'last-posts') {

                elementData.type = 'last-posts';
                elementData.category = e.attr('data-category');
                elementData['display-mode'] = e.attr('data-display-mode');
                elementData['id-exclude'] = e.attr('data-id-exclude');
                elementData['exclude-first'] = e.attr('data-exclude-first');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['featured'] = e.attr('data-featured');
                elementData['side-content'] = e.attr('data-side-content');

                if (elementData['display-mode'] == 'grid') {

                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'list') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'thumbnails') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['show-label'] = e.attr('data-show-label');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['meta-thumbnail'] = e.attr('data-meta-thumbnail');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'big-post') {

                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image-split'] = e.attr('data-image-split');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['image-position'] = e.attr('data-image-position');
                    elementData['excerpt'] = e.attr('data-excerpt');
                    elementData['carousel'] = e.attr('data-carousel');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'timeline') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image'] = e.attr('data-image');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'mosaic') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['effects-scroll'] = e.attr('data-effects-scroll');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['layout'] = e.attr('data-layout');
                    elementData['rows'] = e.attr('data-rows');
                    elementData['scroll'] = e.attr('data-scroll');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'super-post') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                }

            } else if (elementType === 'list-galleries') {

                elementData.type = 'list-galleries';
                elementData.category = e.attr('data-category');
                elementData['display-mode'] = e.attr('data-display-mode');
                elementData['id-exclude'] = e.attr('data-id-exclude');
                elementData['exclude-first'] = e.attr('data-exclude-first');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['featured'] = e.attr('data-featured');
                elementData['side-content'] = e.attr('data-side-content');

                if (elementData['display-mode'] == 'grid') {

                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'list') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'post-scroll') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'thumbnails') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['show-label'] = e.attr('data-show-label');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['meta-thumbnail'] = e.attr('data-meta-thumbnail');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'big-post') {

                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image-split'] = e.attr('data-image-split');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['image-position'] = e.attr('data-image-position');
                    elementData['excerpt'] = e.attr('data-excerpt');
                    elementData['carousel'] = e.attr('data-carousel');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'timeline') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image'] = e.attr('data-image');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'mosaic') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['effects-scroll'] = e.attr('data-effects-scroll');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['layout'] = e.attr('data-layout');
                    elementData['rows'] = e.attr('data-rows');
                    elementData['scroll'] = e.attr('data-scroll');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'super-post') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                }

            } else if (elementType === 'latest-custom-posts') {

                elementData.type = 'latest-custom-posts';
                elementData['post-type'] = e.attr('data-post-type');
                elementData['category'] = e.attr('data-category');
                elementData['display-mode'] = e.attr('data-display-mode');
                elementData['id-exclude'] = e.attr('data-id-exclude');
                elementData['exclude-first'] = e.attr('data-exclude-first');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['featured'] = e.attr('data-featured');

                if (elementData['display-mode'] == 'grid') {

                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'list') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'thumbnails') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['show-label'] = e.attr('data-show-label');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['meta-thumbnail'] = e.attr('data-meta-thumbnail');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'big-post') {

                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image-split'] = e.attr('data-image-split');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['image-position'] = e.attr('data-image-position');
                    elementData['excerpt'] = e.attr('data-excerpt');
                    elementData['carousel'] = e.attr('data-carousel');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'timeline') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image'] = e.attr('data-image');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'mosaic') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['effects-scroll'] = e.attr('data-effects-scroll');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['layout'] = e.attr('data-layout');
                    elementData['rows'] = e.attr('data-rows');
                    elementData['scroll'] = e.attr('data-scroll');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'super-post') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                }

            } else if (elementType === 'callaction') {

                elementData.type = 'callaction';
                elementData['callaction-text'] = e.attr('data-callaction-text');
                elementData['callaction-link'] = e.attr('data-callaction-link');
                elementData['callaction-button-text'] = e.attr('data-callaction-button-text');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'teams') {

                elementData.type = 'teams';
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['posts-limit'] = e.attr('data-posts-limit');
                elementData['category'] = e.attr('data-category');
                elementData['remove-gutter'] = e.attr('data-remove-gutter');
                elementData['enable-carousel'] = e.attr('data-enable-carousel');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');

            } else if (elementType === 'accordion') {

                elementData.type = 'accordion';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['posts-type'] = e.attr('data-posts-type');
                elementData['category'] = e.attr('data-category');
                elementData['featured'] = e.attr('data-featured');
                elementData['nr-of-posts'] = e.attr('data-nr-of-posts');
                elementData['order-direction'] = e.attr('data-order-direction');
                elementData['order-by'] = e.attr('data-order-by');

            } else if (elementType === 'advertising') {

                elementData.type = 'advertising';
                elementData['advertising'] = e.attr('data-advertising');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'empty') {

                elementData.type = 'empty';

            } else if (elementType === 'delimiter') {

                elementData.type = 'delimiter';
                elementData['delimiter-type'] = e.attr('data-delimiter-type');
                elementData['delimiter-color'] = e.attr('data-delimiter-color');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'title') {

                elementData.type = 'title';
                elementData['title-icon'] = e.attr('data-title-icon');
                elementData['title'] = e.attr('data-title');
                elementData['title-color'] = e.attr('data-title-color');
                elementData['subtitle'] = e.attr('data-subtitle');
                elementData['subtitle-color'] = e.attr('data-subtitle-color');
                elementData['style'] = e.attr('data-style');
                elementData['size'] = e.attr('data-size');
                elementData['target'] = e.attr('data-target');
                elementData['link'] = e.attr('data-link');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');
                elementData['letter-spacer'] = e.attr('data-letter-spacer');

            } else if (elementType === 'facebook-block') {

                elementData.type = 'facebook-block';
                elementData['facebook-url'] = e.attr('data-facebook-url');
                elementData['cover'] = e.attr('data-cover');

            } else if (elementType === 'image') {

                elementData.type = 'image';
                elementData['image-url'] = e.attr('data-image-url');
                elementData['forward-url'] = e.attr('data-forward-url');
                elementData['image-target'] = e.attr('data-image-target');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['retina'] = e.attr('data-retina');
                elementData['align'] = e.attr('data-align');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');

            }else if (elementType === 'powerlink') {

                elementData.type = 'powerlink';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['title'] = e.attr('data-title');
                elementData['image'] = e.attr('data-image');
                elementData['button-url'] = e.attr('data-button-url');
                elementData['button-text'] = e.attr('data-button-text');

            } else if (elementType === 'video') {

                elementData.type = 'video';
                elementData['embed'] = e.attr('data-embed');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['lightbox'] = e.attr('data-lightbox');
                elementData['title'] = e.attr('data-title');

            } else if (elementType === 'filters') {

                elementData.type = 'filters';
                elementData['post-type'] = e.attr('data-post-type');
                elementData['categories'] = e.attr('data-categories');
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['posts-limit'] = e.attr('data-posts-limit');
                elementData['order-by'] = e.attr('data-order-by');
                elementData['direction'] = e.attr('data-direction');
                elementData['special-effects'] = e.attr('data-special-effects');
                elementData['gutter'] = e.attr('data-gutter');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['meta-thumbnail'] = e.attr('data-meta-thumbnail');

            } else if (elementType === 'toggle') {

                elementData.type = 'toggle';
                elementData['banner-image'] = e.attr('data-banner-image');
                elementData['toggle-title'] = e.attr('data-toggle-title');
                elementData['toggle-description'] = e.attr('data-toggle-description');
                elementData['toggle-state'] = e.attr('data-toggle-state');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'timeline') {

                elementData.type = 'timeline';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['timeline'] = e.attr('data-timeline');

            } else if (elementType === 'banner') {

                elementData.type = 'banner';
                elementData['banner-image'] = e.attr('data-banner-image');
                elementData['banner-title'] = e.attr('data-banner-title');
                elementData['banner-subtitle'] = e.attr('data-banner-subtitle');
                elementData['banner-button-title'] = e.attr('data-banner-button-title');
                elementData['banner-button-url'] = e.attr('data-banner-button-url');
                elementData['banner-button-background'] = e.attr('data-banner-button-background');
                elementData['banner-font-color'] = e.attr('data-banner-font-color');
                elementData['banner-text-align'] = e.attr('data-banner-text-align');
                elementData['banner-height'] = e.attr('data-banner-height');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['button-text-color'] = e.attr('data-button-text-color');

            } else if (elementType === 'map') {

                elementData.type = 'map';

                elementData['map-address'] = e.attr('data-map-address');
                elementData['map-width'] = e.attr('data-map-width');
                elementData['map-height'] = e.attr('data-map-height');
                elementData['map-latitude'] = e.attr('data-map-latitude');
                elementData['map-longitude'] = e.attr('data-map-longitude');
                elementData['map-type'] = e.attr('data-map-type');
                elementData['map-style'] = e.attr('data-map-style');
                elementData['map-zoom'] = e.attr('data-map-zoom');
                elementData['map-type-control'] = e.attr('data-map-type-control');
                elementData['map-zoom-control'] = e.attr('data-map-zoom-control');
                elementData['map-scale-control'] = e.attr('data-map-scale-control');
                elementData['map-scroll-wheel'] = e.attr('data-map-scroll-wheel');
                elementData['map-draggable-direction'] = e.attr('data-map-draggable-direction');
                elementData['map-marker-icon'] = e.attr('data-map-marker-icon');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['map-marker-img'] = e.attr('data-map-marker-img');

            } else if (elementType === 'counters') {

                elementData.type = 'counters';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['counters-text'] = e.attr('data-counters-text');
                elementData['counters-precents'] = e.attr('data-counters-precents');
                elementData['counters-text-color'] = e.attr('data-counters-text-color');
                elementData['track-bar'] = e.attr('data-track-bar');
                elementData['track-bar-color'] = e.attr('data-track-bar-color');
                elementData['track-bar-icon'] = e.attr('data-track-bar-icon');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');

            } else if (elementType === 'alert') {

                elementData.type = 'alert';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['icon'] = e.attr('data-icon');
                elementData['title'] = e.attr('data-title');
                elementData['text'] = e.attr('data-text');
                elementData['background-color'] = e.attr('data-background-color');
                elementData['text-color'] = e.attr('data-text-color');

            } else if (elementType === 'spacer') {

                elementData.type = 'spacer';
                elementData['height'] = e.attr('data-height');
                elementData['show-mobile'] = e.attr('data-show-mobile');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'icon') {

                elementData.type = 'icon';
                elementData['icon'] = e.attr('data-icon');
                elementData['icon-size'] = e.attr('data-icon-size');
                elementData['icon-color'] = e.attr('data-icon-color');
                elementData['icon-align'] = e.attr('data-icon-align');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'clients') {

                elementData.type = 'clients';
                elementData['clients'] = e.attr('data-clients');
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['enable-carousel'] = e.attr('data-enable-carousel');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'skills') {

                elementData.type = 'skills';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['display-mode'] = e.attr('data-display-mode');
                elementData['skills'] = e.attr('data-skills');

            } else if (elementType === 'features-block') {

                elementData.type = 'features-block';
                elementData['features-block'] = e.attr('data-features-block');
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['style'] = e.attr('data-style');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['gutter'] = e.attr('data-gutter');

            } else if (elementType === 'listed-features') {

                elementData.type = 'listed-features';
                elementData['features'] = e.attr('data-features');
                elementData['features-align'] = e.attr('data-features-align');
                elementData['color-style'] = e.attr('data-color-style');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'pricing-tables') {

                elementData.type = 'pricing-tables';
                elementData['category'] = e.attr('data-category');
                elementData['elements-per-row'] = e.attr('data-elements-per-row');
                elementData['posts-limit'] = e.attr('data-posts-limit');
                elementData['remove-gutter'] = e.attr('data-remove-gutter');
                elementData['equal-height'] = e.attr('data-equal-height');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');

            } else if (elementType === 'page') {

                elementData.type = 'page';
                elementData['post-id'] = e.attr('data-post-id');
                elementData['search'] = e.attr('data-search');
                elementData['criteria'] = e.attr('data-criteria');
                elementData['order-by'] = e.attr('data-order-by');
                elementData['direction'] = e.attr('data-direction');

            } else if (elementType === 'post') {

                elementData.type = 'post';
                elementData['post-id'] = e.attr('data-post-id');
                elementData['search'] = e.attr('data-search');
                elementData['criteria'] = e.attr('data-criteria');
                elementData['order-by'] = e.attr('data-order-by');
                elementData['direction'] = e.attr('data-direction');

            } else if (elementType === 'buttons') {

                elementData.type = 'buttons';

                elementData['button-icon'] = e.attr('data-button-icon');

                elementData['text'] = e.attr('data-text');
                elementData['icon-align'] = e.attr('data-icon-align');
                elementData['size'] = e.attr('data-size');
                elementData['target'] = e.attr('data-target');
                elementData['text-color'] = e.attr('data-text-color');
                elementData['bg-color'] = e.attr('data-bg-color');
                elementData['url'] = e.attr('data-url');
                elementData['button-align'] = e.attr('data-button-align');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['mode-display'] = e.attr('data-mode-display');
                elementData['border-color'] = e.attr('data-border-color');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');
                elementData['text-hover-color'] = e.attr('data-text-hover-color');
                elementData['border-hover-color'] = e.attr('data-border-hover-color');
                elementData['bg-hover-color'] = e.attr('data-bg-hover-color');

            } else if (elementType === 'ribbon') {

                elementData.type = 'ribbon';

                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['title'] = e.attr('data-title');
                elementData['text'] = e.attr('data-text');
                elementData['text-color'] = e.attr('data-text-color');
                elementData['background'] = e.attr('data-background');
                elementData['align'] = e.attr('data-align');
                elementData['button-icon'] = e.attr('data-button-icon');
                elementData['button-text'] = e.attr('data-button-text');
                elementData['button-size'] = e.attr('data-button-size');
                elementData['button-target'] = e.attr('data-button-target');
                elementData['button-url'] = e.attr('data-button-url');
                elementData['button-align'] = e.attr('data-button-align');
                elementData['button-mode-display'] = e.attr('data-button-mode-display');
                elementData['button-background-color'] = e.attr('data-button-background-color');
                elementData['button-border-color'] = e.attr('data-button-border-color');
                elementData['image'] = e.attr('data-image');
                elementData['button-text-color'] = e.attr('data-button-text-color');

            } else if (elementType === 'contact-form') {

                elementData.type = 'contact-form';
                elementData['hide-icon'] = e.attr('data-hide-icon');
                elementData['contact-form'] = e.attr('data-contact-form');
                elementData['hide-subject'] = e.attr('data-hide-subject');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'featured-area') {

                elementData.type = 'featured-area';
                elementData['selected-categories'] = e.attr('data-selected-categories');
                elementData['custom-post'] = e.attr('data-custom-post');
                elementData['exclude-first'] = e.attr('data-exclude-first');
                elementData['order-by'] = e.attr('data-order-by');
                elementData['order-direction'] = e.attr('data-order-direction');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'shortcodes') {

                elementData.type = 'shortcodes';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['paddings'] = e.attr('data-paddings');
                elementData['shortcodes'] = e.attr('data-shortcodes');

            } else if (elementType === 'text') {

                elementData.type = 'text';
                elementData['text'] = e.attr('data-text');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['effect'] = e.attr('data-effect');
                elementData['delay'] = e.attr('data-delay');

            } else if (elementType === 'image-carousel') {

                elementData.type = 'image-carousel';
                elementData['carousel-height'] = e.attr('data-carousel-height');
                elementData['images'] = e.attr('data-images');
                elementData['admin-label'] = e.attr('data-admin-label');

            } else if (elementType === 'list-videos') {

                elementData.type = 'list-videos';
                elementData.category = e.attr('data-category');
                elementData['display-mode'] = e.attr('data-display-mode');
                elementData['id-exclude'] = e.attr('data-id-exclude');
                elementData['exclude-first'] = e.attr('data-exclude-first');
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['featured'] = e.attr('data-featured');

                if (elementData['display-mode'] == 'grid') {

                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'list') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'thumbnails') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['behavior'] = e.attr('data-behavior');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['show-label'] = e.attr('data-show-label');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['meta-thumbnail'] = e.attr('data-meta-thumbnail');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'big-post') {

                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image-split'] = e.attr('data-image-split');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['related-posts'] = e.attr('data-related-posts');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                    elementData['image-position'] = e.attr('data-image-position');
                    elementData['excerpt'] = e.attr('data-excerpt');
                    elementData['carousel'] = e.attr('data-carousel');
                    elementData['show-image'] = e.attr('data-show-image');

                } else if (elementData['display-mode'] == 'timeline') {

                    elementData['display-title'] = e.attr('data-display-title');
                    elementData['show-meta'] = e.attr('data-show-meta');
                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['image'] = e.attr('data-image');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'mosaic') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['effects-scroll'] = e.attr('data-effects-scroll');
                    elementData['gutter'] = e.attr('data-gutter');
                    elementData['layout'] = e.attr('data-layout');
                    elementData['rows'] = e.attr('data-rows');
                    elementData['scroll'] = e.attr('data-scroll');
                    elementData['pagination'] = e.attr('data-pagination');

                } else if (elementData['display-mode'] == 'super-post') {

                    elementData['posts-limit'] = e.attr('data-posts-limit');
                    elementData['elements-per-row'] = e.attr('data-elements-per-row');
                    elementData['order-by'] = e.attr('data-order-by');
                    elementData['order-direction'] = e.attr('data-order-direction');
                    elementData['special-effects'] = e.attr('data-special-effects');
                    elementData['pagination'] = e.attr('data-pagination');
                }

            } else if (elementType === 'events') {

                elementData.type = 'events';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData.category = e.attr('data-category');
                elementData['id-exclude'] = e.attr('data-id-exclude');
                elementData['exclude-first'] = e.attr('data-exclude-first');
                elementData['posts-limit'] = e.attr('data-posts-limit');
                elementData['order-by'] = e.attr('data-order-by');
                elementData['order-direction'] = e.attr('data-order-direction');
                elementData['special-effects'] = e.attr('data-special-effects');
                elementData['pagination'] = e.attr('data-pagination');

            } else if (elementType === 'calendar') {

                elementData.type = 'calendar';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['size'] = e.attr('data-size');

            } else if (elementType === 'chart') {

                elementData.type = 'chart';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['mode'] = e.attr('data-mode');
                elementData['label'] = e.attr('data-label');
                elementData['title'] = e.attr('data-title');
                elementData['scaleShowGridLines'] = e.attr('data-scaleShowGridLines');
                elementData['scaleGridLineColor'] = e.attr('data-scaleGridLineColor');
                elementData['scaleGridLineWidth'] = e.attr('data-scaleGridLineWidth');
                elementData['scaleShowHorizontalLines'] = e.attr('data-scaleShowHorizontalLines');
                elementData['scaleShowVerticalLines'] = e.attr('data-scaleShowVerticalLines');
                elementData['bezierCurve'] = e.attr('data-bezierCurve');
                elementData['bezierCurveTension'] = e.attr('data-bezierCurveTension');
                elementData['pointDot'] = e.attr('data-pointDot');
                elementData['pointDotRadius'] = e.attr('data-pointDotRadius');
                elementData['pointDotStrokeWidth'] = e.attr('data-pointDotStrokeWidth');
                elementData['pointHitDetectionRadius'] = e.attr('data-pointHitDetectionRadius');
                elementData['datasetStroke'] = e.attr('data-datasetStroke');
                elementData['datasetStrokeWidth'] = e.attr('data-datasetStrokeWidth');
                elementData['datasetFill'] = e.attr('data-datasetFill');
                elementData['chart_line'] = e.attr('data-chart_line');
                elementData['segmentShowStroke'] = e.attr('data-segmentShowStroke');
                elementData['segmentStrokeColor'] = e.attr('data-segmentStrokeColor');
                elementData['segmentStrokeWidth'] = e.attr('data-segmentStrokeWidth');
                elementData['percentageInnerCutout'] = e.attr('data-percentageInnerCutout');
                elementData['animationSteps'] = e.attr('data-animationSteps');
                elementData['animateRotate'] = e.attr('data-animateRotate');
                elementData['animateScale'] = e.attr('data-animateScale');
                elementData['chart_pie'] = e.attr('data-chart_pie');

            } else if (elementType === 'gallery') {

                elementData.type = 'gallery';
                elementData['admin-label'] = e.attr('data-admin-label');
                elementData['images'] = e.attr('data-images');
                elementData['layout'] = e.attr('data-layout');
                elementData['scroll-effect'] = e.attr('data-scroll-effect');
                elementData['items-per-row'] = e.attr('data-items-per-row');
                elementData['grid-gallery-behavior'] = e.attr('data-grid-gallery-behavior');
                elementData['image-size-height'] = e.attr('data-image-size-height');
                elementData['image-size-width'] = e.attr('data-image-size-width');

            }

            return elementData;
        },

        save: function (location) {

            var content = $('#section-content>ul'),
                templateData = {},
                template_id,
                template_name;

            if ( location === 'page' ) {

                template_id = $('#ts_layout_id').find('#ts-template-id').val();
                template_name = $('#ts_layout_id').find('#ts-template-name').text();

                templateData = {
                    'post_id': $('#post_ID').val(),
                    'content': [],
                    'template_id': template_id,
                    'template_name': template_name
                };

            } else {

                template_id = $('#ts-template-id').val();
                template_name = $('#ts-template-name').text();

                if (location === 'header') {

                    templateData = {
                        'photoedge_header': 1,
                        'content': [],
                        'template_id': template_id,
                        'template_name': template_name
                    };

                } else if (location === 'footer') {

                    templateData = {
                        'photoedge_footer': 1,
                        'content': [],
                        'template_id': template_id,
                        'template_name': template_name
                    };
                }
            }

            // iterate over the content rows
            $.each(content, function(index, row) {
                var parsedRow = {};

                parsedRow.settings = layout.getRowSettings(row);
                parsedRow.columns = [];

                // select columns
                columns = $(row).find('>li:not(.row-editor, .edit-row-settings)');

                // iterate over the columns
                $.each(columns, function(index, column) {

                    var c = {};

                    c.size = layout.columnSize(column);
                    c.elements = [];
                    c.settingsColumn = layout.getColumnSettings(column);

                    elements = $(column).find('.elements>li');

                    // iterate over the column elements
                    $.each(elements, function(index, element) {
                        c.elements.push(layout.getElementData(element));
                    });

                    parsedRow.columns.push(c);

                });

                // add row to the header
                templateData.content.push(parsedRow);
            });

            return templateData;
        }
    };

    layout.init();

    $("#builder-save-layout").click(function(event) {

        jQuery("#ajax-loading").show();

        var success = false,
            content,
            d = {};

        content = layout.save('page');
        d.mode = 'update';
        d['location'] = 'page';
        d['data'] = JSON.stringify(content);

        jQuery.ajax({
            data: d,
            url: ajaxurl + '?action=photoedge_save_layout',
            async: false,
            type: "POST"
        }).done(function(data) {

            if ( data.status === 'ok' ) {
                success = true;
            } else {
                success = false;
                alert(data.message);
            }
        }).fail(function(data) {
            success = false;
        });

        if (!success) {
            jQuery("#ajax-loading").hide();
            jQuery("#publish").removeClass("button-primary-disabled");
            var n = noty({
                layout: 'bottomCenter',
                type: 'error',
                timeout: 4000,
                text: 'Layout cannot be saved.'
            });

            return false;
        } else {
            var n = noty({
                layout: 'bottomCenter',
                type: 'success',
                timeout: 4000,
                text: 'Layout saved!'
            });
            window.builderDataChanged = false;

            return true;
        }
    });

    // Increase column size
    $(document).on('click', '.layout_builder_row span.plus', function(event) {
        event.preventDefault();

        var element = $(this).parent().parent(),
            row = element.parent(),
            current_size = parseInt(element.attr("data-columns"), 10);

        current_size++;
        window.builderDataChanged = true;
        if (current_size <= 12 ) {
            element.find('.column-size').html(layout.columnSizeInfo(current_size));
            element.attr('class', 'columns' + current_size);
            element.attr("data-columns", current_size);
        } else {
            var n = noty({
                layout: 'bottomCenter',
                type: 'error',
                timeout: 4000,
                text: 'The the maximum value of column is 12'
            });
        }
    });

    // Decrease column size
    $(document).on('click', '.layout_builder_row span.minus', function(event) {
        event.preventDefault();

        var element = $(this).parent().parent(),
            current_size = parseInt(element.attr("data-columns"), 10);

        window.builderDataChanged = true;
        current_size--;

        if ( current_size >= 2 ) {
            element.find('.column-size').html(layout.columnSizeInfo(current_size));
            element.attr('class', 'columns' + current_size);
            element.attr("data-columns", current_size);
        } else {
            var n = noty({
                layout: 'bottomCenter',
                type: 'error',
                timeout: 4000,
                text: 'The minimum value of column is 2'
            });
        }
    });

    // Clone element
    $(document).on('click', '.layout_builder_row span.clone', function(event) {
        event.preventDefault();
        if( jQuery(this).hasClass('ts-clone-column') ){
            jQuery(this).closest('ul.layout_builder_row').append(jQuery(this).closest('li[data-type="column"]').clone());
        }else{
            var element = jQuery(this).parent();
            var element_html = jQuery(this).parent().clone();
            jQuery(element).parent().append(element_html);
        }

        window.builderDataChanged = true;

    });

    // Add element
    $(document).on('click', '.layout_builder_row span.add-element', function(event) {
        event.preventDefault();

        var column   = $(this).parent(),
            element  = $('#dragable-element-tpl').html(),
            elements = column.find('.elements');

        elements.append(element);
        elements.sortable({items : 'li', connectWith :'.elements'});
        window.currentEditedElement = jQuery(this).prev('ul.elements').find('li:last-child');

        jQuery('.ts-all-elements').removeClass('ts-is-hidden');
        jQuery('.ts-tab-elements li').first().trigger('click');
        jQuery('body').addClass('ts-elements-modal-open');

        window.builderDataChanged = true;
    });

    jQuery('#ts-builder-elements-modal').on('hidden.bs.modal', function () {
        if( typeof(currentEditedElement) == 'undefined' ) return;
        if( currentEditedElement.attr('data-element-type') == 'empty' ){
            currentEditedElement.remove();
        }
    });

    // ------ Rows section -------------------------------------------------------------

    // Inserting a row to the top
    $('.add-top-row').on('click', function(event) {
        event.preventDefault();
        var location    = "#section-" + $(this).attr('data-location'),
            rowSource   = $("#dragable-row-tpl").html(),
            template    = Handlebars.compile(rowSource),
            context     = {},
            rowTemplate = $(template(context));

        builderDataChanged = true;
        $(location).prepend(rowTemplate).sortable("refresh");
        $('.layout_builder_row').sortable(rowOptions);
    });

    // Inserting a row to the bottom
    $('.add-bottom-row').on('click', function(event) {
        event.preventDefault();
        var location    = "#section-" + $(this).attr('data-location'),
            rowSource   = $("#dragable-row-tpl").html(),
            template    = Handlebars.compile(rowSource),
            context     = {},
            rowTemplate = $(template(context));

        builderDataChanged = true;
        $(location).append(rowTemplate).sortable("refresh");
        $('.layout_builder_row').sortable(rowOptions);
    });

    // Publish th changes
    $('#builder-save-layout').on('click', function(event) {

       if( jQuery('#publish').length > 0 ) {
           // jQuery('#publish').trigger('click');
       } else {
           jQuery('.editor-post-publish-button').trigger('click');
           
       }

    });

    // Remove row
    $(document).on('click', '.remove-row', function(event) {
        event.preventDefault();
        if( ! layout.validateAction()) return;
        $(this).closest('ul.layout_builder_row').remove();
        builderDataChanged = true;
    });

    // ------ Columns section ----------------------------------------------------------

    // Show predefined column layouts
    $(document).on('click', '.predefined-columns', function(event) {
        event.preventDefault();
        $(this).next().toggle();
    });
    // Predefined column options
    $(document).on('click', '.add-column-settings li a', function(event) {
        event.preventDefault();

        builderDataChanged = true;
        var $this = $(this),
            row = $this.closest('ul.layout_builder_row'),
            column_layout = $this.attr('data-add-columns');
            column = $(column_layout).html();
            row.append(column);
            $('.elements').sortable({items : 'li', connectWith :'.elements', cancel: '.edit, .delete'});
            $('.add-column-settings').hide();
    });

    // Add column to the row
    $(document).on('click', '.add-column', function(event) {
        event.preventDefault();

        var $this = $(this),
            row = $this.closest('ul.layout_builder_row'),
            column = $('#dragable-column-tpl').html();
            row.append(column);
            $('.elements').sortable({items : 'li', connectWith :'.elements', cancel: '.edit, .delete'});
    });

    // Remove column
    $(document).on('click', '.layout_builder_row span.delete-column', function(event) {
        event.preventDefault();
        if( ! layout.validateAction()) return;
        $(this).closest('li[data-type="column"]').remove();
    });

    // Edit column
    jQuery(document).on('click', 'li span.edit, .builder-element-array li', function(event) {
        event.preventDefault();

        jQuery('#ts-builder-elements-modal-preloader').show();

        var elementType = '',
            editMode    = 1;

        if( jQuery(this).closest('.builder-element-array').length > 0 ){

            jQuery('.builder-element-array ul').find('.selected').removeClass('selected');
            jQuery(this).addClass('selected');
            elementType = jQuery(this).attr('data-value');
            jQuery('.ts-all-elements').addClass('ts-is-hidden');
            jQuery('body').removeClass('ts-elements-modal-open');
            editMode = 0;

        }else{
            window.currentEditedElement = jQuery(this).closest('li');
            elementType = jQuery(window.currentEditedElement).attr('data-element-type');
        }

        jQuery.get(ajaxurl + '?action=photoedge_edit_template_element&height=800&width=835&modal=true&elementType=' + elementType,
                function(result){
                    jQuery('#ts-builder-elements-modal .modal-body').html(result);
                    if( editMode == 1 ){
                        readElementProperties(window.currentEditedElement);
                    }

                    tsz_screen_options(elementType);

                    if( elementType == 'text' ){

                        jQuery('#wp-ts_editor_id-wrap').find('.mce-i-fullscreen').parent('button').css('display', 'none');
                        // console.log(window.currentEditedElement.attr('data-text').replace(/--quote--/g, '"' ));
                        var contentEditor = editMode == 1 ? jQuery( window.currentEditedElement).attr('data-text').replace(/--quote--/g, '"' ) : '';

                        tinymce.get( 'ts_editor_id' ).setContent( contentEditor );

                        jQuery('#ts-builder-elements-modal-editor').modal({show:true});
                        jQuery('#ts-builder-elements-modal').css('opacity',0);

                        jQuery( '.tsz-text-editor-modal' ).css( 'display', 'block' );
                        jQuery( 'body' ).addClass( 'tsz-modal-editor-open' );

                    }else{
                        var titleModal = editMode == 0 ? jQuery('#ts-builder-elements-modal .modal-title').attr('data-elements-title') : jQuery('#ts-builder-elements-modal .modal-title').attr('data-element-title');

                        jQuery('#ts-builder-elements-modal').modal({show:true});
                        jQuery('#ts-builder-elements-modal .ts-change-element').show();

                        jQuery('#ts-builder-elements-modal-label').html(titleModal);
                    }

                    jQuery('#ts-builder-elements-modal').css('opacity',1);
                    jQuery('#ts-builder-elements-modal-preloader').hide();
                }
            );

        });

    // Close the elements modal
    $(document).on('click', '.ts-all-elements .modal-header .close', function(event) {
        jQuery('.ts-all-elements').addClass('ts-is-hidden');
        jQuery('body').toggleClass('ts-elements-modal-open');
        event.preventDefault();
    });

    // Remove element
    $(document).on('click', '.layout_builder_row span.delete', function(event) {
        event.preventDefault();
        if( ! layout.validateAction()) return;
        $(this).parent().remove();
        builderDataChanged = true;
    });

    // Edit columns settings
    $(document).on('click', '.edit-column', function(event) {
        event.preventDefault();
        // Act on the event
        window.currentEditedColumn = $(this).closest('li');
        window.currentColumnID = $(this).attr('id');
        window.currentSetId = new Date().getTime();

        jQuery('#ts-builder-elements-modal-preloader').show();
        jQuery.get(ajaxurl + '?action=photoedge_edit_template_column&height=700&width=835&modal=true"',function(result){
            jQuery('#ts-builder-elements-modal').modal({show:true});
            jQuery('#ts-builder-elements-modal .modal-body').html(result);
            jQuery('#ts-builder-elements-modal .ts-change-element').hide();
            jQuery('#ts-builder-elements-modal-label').html('Edit column settings');
            jQuery('#ts-builder-elements-modal-preloader').hide();
        });
    });

    // Edit Row settings
    $(document).on('click', '.edit-row-settings', function(event) {
        event.preventDefault();
        // Act on the event
        window.currentEditedRow = $(this).closest('ul');
        window.currentRowID = $(this).attr('id');
        window.currentSetId = new Date().getTime();

        jQuery('#ts-builder-elements-modal-preloader').show();
        jQuery.get(ajaxurl + '?action=photoedge_edit_template_row&height=700&width=835&modal=true"',function(result){
            jQuery('#ts-builder-elements-modal').modal({show:true});
            jQuery('#ts-builder-elements-modal .modal-body').html(result);
            jQuery('#ts-builder-elements-modal .ts-change-element').hide();
            jQuery('#ts-builder-elements-modal-label').html('Edit row settings');
            jQuery('#ts-builder-elements-modal-preloader').hide();
        });
    });

    // Save Column Settings
    $(document).on('click', '#save-column-settings', function(event) {
        event.preventDefault();
        // Act on the event
        var modalWindow = $('#ts-builder-elements-modal');
        window.currentEditedColumn.attr("data-name-id", modalWindow.find('#column-name-id').val());
        window.currentEditedColumn.attr("data-bg-color", modalWindow.find('#column-background-color').val());
        window.currentEditedColumn.attr("data-text-color", modalWindow.find('#column-text-color').val());
        window.currentEditedColumn.attr("data-mask-color", modalWindow.find('#column-mask-color').val());
        window.currentEditedColumn.attr("data-opacity", modalWindow.find('#column-opacity').val());
        window.currentEditedColumn.attr("data-bg-image", modalWindow.find('#column-bg-image').val());
        window.currentEditedColumn.attr("data-bg-video-mp", modalWindow.find('#column-bg-video-mp').val());
        window.currentEditedColumn.attr("data-bg-video-webm", modalWindow.find('#column-bg-video-webm').val());
        window.currentEditedColumn.attr("data-bg-position", modalWindow.find('#column-bg-position').val());
        window.currentEditedColumn.attr("data-bg-attachment", modalWindow.find('#column-bg-attachement').val());
        window.currentEditedColumn.attr("data-bg-repeat", modalWindow.find('#column-bg-repeat').val());
        window.currentEditedColumn.attr("data-bg-size", modalWindow.find('#column-bg-size').val());

        window.currentEditedColumn.attr("data-padding-top", modalWindow.find('#column-padding-top').val());
        window.currentEditedColumn.attr("data-padding-bottom", modalWindow.find('#column-padding-bottom').val());
        window.currentEditedColumn.attr("data-padding-left", modalWindow.find('#column-padding-left').val());
        window.currentEditedColumn.attr("data-padding-right", modalWindow.find('#column-padding-right').val());
        window.currentEditedColumn.attr("data-text-align", modalWindow.find('#text-align').val());
        window.currentEditedColumn.attr("data-mask", modalWindow.find('#column-mask').val());
        window.currentEditedColumn.attr("data-gutter-left", modalWindow.find('#column-gutter-left').val());
        window.currentEditedColumn.attr("data-gutter-right", modalWindow.find('#column-gutter-right').val());
        window.currentEditedColumn.attr("data-mask-gradient", modalWindow.find('#column-mask-gradient-color').val());
        window.currentEditedColumn.attr("data-mask-gradient-mode", modalWindow.find('#column-mask-gradient-mode').val());
        window.currentEditedColumn.attr("data-transparent", modalWindow.find('#column-transparent').val());

        window.builderDataChanged = true;
        jQuery('#ts-builder-elements-modal button.close').trigger('click');
    });

    // Save Row Settings
    $(document).on('click', '#save-row-settings', function(event) {
        event.preventDefault();
        // Act on the event
        var modalWindow = $('#ts-builder-elements-modal');
        window.currentEditedRow.attr("data-name-id", modalWindow.find('#row-name-id').val());
        window.currentEditedRow.attr("data-bg-color", modalWindow.find('#row-background-color').val());
        window.currentEditedRow.attr("data-text-color", modalWindow.find('#row-text-color').val());
        window.currentEditedRow.attr("data-mask-color", modalWindow.find('#row-mask-color').val());
        window.currentEditedRow.attr("data-opacity", modalWindow.find('#row-opacity').val());
        window.currentEditedRow.attr("data-bg-image", modalWindow.find('#row-bg-image').val());
        window.currentEditedRow.attr("data-bg-video-mp", modalWindow.find('#row-bg-video-mp').val());
        window.currentEditedRow.attr("data-bg-video-webm", modalWindow.find('#row-bg-video-webm').val());
        window.currentEditedRow.attr("data-bg-position-x", modalWindow.find('#row-bg-position-x').val());
        window.currentEditedRow.attr("data-bg-position-y", modalWindow.find('#row-bg-position-y').val());
        window.currentEditedRow.attr("data-bg-attachment", modalWindow.find('#row-bg-attachement').val());
        window.currentEditedRow.attr("data-bg-repeat", modalWindow.find('#row-bg-repeat').val());
        window.currentEditedRow.attr("data-bg-size", modalWindow.find('#row-bg-size').val());

        window.currentEditedRow.attr("data-margin-top", modalWindow.find('#row-margin-top').val() );
        window.currentEditedRow.attr("data-margin-bottom", modalWindow.find('#row-margin-bottom').val());
        window.currentEditedRow.attr("data-padding-top", modalWindow.find('#row-padding-top').val());
        window.currentEditedRow.attr("data-padding-bottom", modalWindow.find('#row-padding-bottom').val());
        window.currentEditedRow.attr("data-expand-row", modalWindow.find('#expand-row').val());
        window.currentEditedRow.attr("data-special-effects", modalWindow.find('#special-effects').val());
        window.currentEditedRow.attr("data-text-align", modalWindow.find('#text-align').val());
        window.currentEditedRow.attr("data-fullscreen-row", modalWindow.find('#fullscreen-row').val());
        window.currentEditedRow.attr("data-mask", modalWindow.find('#row-mask').val());
        window.currentEditedRow.attr("data-shadow", modalWindow.find('#row-shadow').val());
        window.currentEditedRow.attr("data-vertical-align", modalWindow.find('#row-vertical-align').val());
        window.currentEditedRow.attr("data-scroll-down-button", modalWindow.find('#scroll-down-button').val());
        window.currentEditedRow.attr("data-parallax", modalWindow.find('#row-parallax').val());
        window.currentEditedRow.attr("data-custom-css", modalWindow.find('#row-custom-css').val());
        window.currentEditedRow.attr("data-border-top", modalWindow.find('#row-border-top').val());
        window.currentEditedRow.attr("data-border-bottom", modalWindow.find('#row-border-bottom').val());
        window.currentEditedRow.attr("data-border-top-color", modalWindow.find('#row-color-border-top').val());
        window.currentEditedRow.attr("data-border-bottom-color", modalWindow.find('#row-color-border-bottom').val());
        window.currentEditedRow.attr("data-border-top-width", modalWindow.find('#row-width-border-top').val());
        window.currentEditedRow.attr("data-border-bottom-width", modalWindow.find('#row-width-border-bottom').val());
        window.currentEditedRow.attr("data-carousel", modalWindow.find('#row-columns-in-carousel').val());
        window.currentEditedRow.attr("data-slider-background", modalWindow.find('#slider-background').val());
        window.currentEditedRow.attr("data-mask-gradient", modalWindow.find('#row-mask-gradient-color').val());
        window.currentEditedRow.attr("data-mask-gradient-mode", modalWindow.find('#row-mask-gradient-mode').val());
        window.currentEditedRow.attr("data-transparent", modalWindow.find('#row-transparent').val());

        window.builderDataChanged = true;
        jQuery('#ts-builder-elements-modal button.close').trigger('click');
    });

    // ------ Layout section ----------------------------------------------------------

    // Create new layout
    $('#create-new-layout').on('click', function(event) {
        event.preventDefault();
        window.location.href = $(this).data('create-uri');
    });

    // Create Layout > Structure
    $('ul#layout-type label').on('click', function(event) {

        event.stopPropagation();
        $_this = $(this).parent();
        var layoutTypes = $_this.parent().find('li');

        $.each(layoutTypes, function(index, val) {
            var layout = $(val);
            if ( layout.hasClass('selected-layout') ) {
                layout.removeClass('selected-layout');
            }
        });

        if ( ! $_this.hasClass('selected-layout') ) {
            $_this.addClass('selected-layout');
        }
    });

    // Save template
    $(document).on('click', '#save-template', function(event) {
        event.preventDefault();
        layout.save();
    });

    // save header and footer
    $(document).on('click', '#save-header-footer', function(event) {
        event.preventDefault();
        var location = $(this).attr('data-location');

        var n,
            d = {};

        content = layout.save(location);
        d.mode = 'update';
        d['location'] = location;
        d['data'] = JSON.stringify(content);

         jQuery.ajax({
            data: d,
            url: ajaxurl + '?action=photoedge_save_layout',
            async: false,
            type: "POST"
        }).done(function(data) {
            if ( data.status === 'ok' ) {
                n = noty({
                    layout: 'bottomCenter',
                    type: 'success',
                    timeout: 4000,
                    text: 'Template saved'
                });
            } else {
                n = noty({
                    layout: 'bottomCenter',
                    type: 'error',
                    timeout: 4000,
                    text: data.message
                });
            }
        }).fail(function(data) {
            n = noty({
                layout: 'bottomCenter',
                type: 'error',
                timeout: 4000,
                text: "Error! Template can't be saved"
            });
        });
    });

    /**
     * Hide attached image manager for non gallery post formats
     */
    $(document).ready(function(){
        if( $('.post-format:checked').attr('value') == 'gallery' ){
            jQuery('#ts-gallery-images').css('display', '');
        } else{
            jQuery('#ts-gallery-images').css('display', 'none');
        }
    });

    $('.post-format').click(function(event) {
        if( $(this).attr('value') == 'gallery' ){
            jQuery('#ts-gallery-images').css('display', '');
        } else{
            jQuery('#ts-gallery-images').css('display', 'none');
        }
    });

    /**
     * Hide video embed for non video post formats
     */
    $(document).ready(function(){
        if( $('.post-format:checked').attr('value') == 'video' ){
            jQuery('#video_embed').show();
        } else{
            jQuery('#video_embed').hide();
        }
    });
    $('.post-format').click(function(event) {
        if( $(this).attr('value') == 'video' ){
            jQuery('#video_embed').show();
        } else{
            jQuery('#video_embed').hide();
        }
    });

    /**
     * Hide audio embed for non audio post formats
     */
    $(document).ready(function(){
        if( $('.post-format:checked').attr('value') == 'audio' ){
            jQuery('#audio_embed').show();
        } else{
            jQuery('#audio_embed').hide();
        }
    });
    $('.post-format').click(function(event) {
        if( $(this).attr('value') == 'audio' ){
            jQuery('#audio_embed').show();
        } else{
            jQuery('#audio_embed').hide();
        }
    });


    // Create/Edit Templates
    $(document).on('click', '.ts-modal-confirm', function(event) {
        event.preventDefault();
        $(this).siblings('button[data-dismiss="modal"]').trigger('click');
        $('#ts-blank-template-modal').modal();
    });

    $(document).on('click', '#new-template', function(event) {
        event.preventDefault();
        $('#ts-confirmation').modal();
    });

    // Save blank tempalte
    $(document).on('click', '#ts-save-blank-template-action', function(event) {

        event.preventDefault();

        var element = $(this);
        var closeModal = element.siblings('button').trigger("click");
        var template_id;
        var location = element.attr('data-location');
        var template_name = $('#ts-blank-template-name').val();

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'photoedge_save_layout',
                'mode': 'blank_template',
                'template_name': template_name,
                'location': location
            }
        }).done(function(data) {

            var blankTemplateName = $('#ts-blank-template-name');

            if (data['status'] === 'ok') {
                $('#ts-template-id').val(data.template_id);
                $('#ts-template-name').text(blankTemplateName.val());
                $('.layout_builder').html('');
            } else {
                alert("Error");
            }

            blankTemplateName.val("");

        }).fail(function() {
            alert("Error");
        });

    });

    // Save as... tempalte
    $(document).on('click', '#ts-save-as-template', function(event) {
        event.preventDefault();
        $('#ts-save-template-modal').modal();
    });

    // Save as... tempalte action
    $(document).on('click', '#ts-save-as-template-action', function(event) {

        event.preventDefault();

        var element = $(this);
        var closeModal = element.siblings('button');
        var template_name = $('#ts-save-template-name').val();
        var location = element.attr('data-location');
        var l = layout.save(location);

        var data = {
                action: 'photoedge_save_template_layout',
                mode: 'save_as',
                template_name: template_name,
                location: location,
                content: l['content']
        };

        console.log('@AJAX DEBUG: sent');
        console.log(data);

        if (typeof l['post_id'] !== "undefined") {
            data['post_id'] = l['post_id'];
        }

        if (typeof l['photoedge_header'] !== "undefined") {
            data['photoedge_header'] = l['photoedge_header'];
        }

        if (typeof l['photoedge_footer'] !== "undefined") {
            data['photoedge_footer'] = l['photoedge_footer'];
        }

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function(response) {

            console.log('@AJAX DEBUG: received');
            console.log(response);

            if (response.status === 'ok') {
                closeModal.trigger("click");
            } else {
                alert(response.message);
            }

        }).fail(function() {
            alert("Error");
        });
    });

    // Load template button
    $(document).on('click', '#ts-load-template-button', function(event) {

        event.preventDefault();

        var element = $(this);
        var location = element.attr('data-location');
        var defaultTemplate;

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            cache: false,
            data: {
                action: 'photoedge_load_all_templates',
                location: location
            }
        }).done(function(data) {

            $("#ts-layout-list").html(data);
            $("#ts-load-template").modal();

        }).fail(function() {
            alert("Error");
        });
    });

    // Load template action
    $(document).on('click', '#ts-load-template-action', function(event) {

        event.preventDefault();

        var element = $(this);
        var closeModal = element.siblings('button').trigger("click");
        var template_id;
        var location = element.attr('data-location');

        var selected = $(this).closest('div').siblings('.modal-body').find('input[type="radio"]').filter(function(){
            return $(this).is(":checked");
        });

        if ( typeof selected.val() === 'undefined') {
            template_id = 'default';
        } else {
            template_id = selected.val();
        }

        $.ajax({
            url: ajaxurl,
            type: 'GET',
            dataType: 'json',
            data: { action: 'photoedge_load_template', 'location': location, 'template_id': template_id }
        }).done(function(data) {

            $('#ts-template-id').val(data['template_id']);
            $('#ts-template-name').text(data['name']);
            $('.layout_builder').html(data['elements']);

            // console.log(data);

            layout.init();

        }).fail(function() {
            alert("Error");
        });

    });

    // Remove template
    $(document).on('click', '.ts-remove-template', function(event) {

        event.preventDefault();

        if( ! layout.validateAction()) return;

        var element = $(this);
        var template_id = element.attr('data-template-id');
        var location = element.attr('data-location');

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'photoedge_remove_template',
                location: location,
                template_id: template_id
            }
        }).done(function(data) {

            if (data['status'] === 'removed') {
                element.closest('tr').fadeOut('slow').remove();
            } else {
                alert(data.message);
            }

        }).fail(function() {
            alert("Error");
        });

    });

    jQuery('#publish').on('click', function() {
        window.builderDataChanged = false;
    });

    window.onbeforeunload = askUser;

    window.builderDataChanged = false;

    function askUser(){
        if (window.builderDataChanged == true) {
            return "The changes you made will be loast if you navigate away from this page";
        }
    }
});

// read "data-*" properties and transform them to object
function readElementProperties (element) {

    var elementType = element.attr('data-element-type'),
        elementOptions = jQuery('#builder-elements');

    // slider
    var sliderID = function (element) {
        return (element.attr('data-slider-id') > 0) ? element.attr('data-slider-id') : 0 ;
    };

    // ------- Funtions for parsing element display mode options ------------------------------

    // Enable carousel mode
    var enableCarousel = function (element) {

        var validValues     = ['y', 'n'],
            enableCarousel  = element.attr('data-enable-carousel');

        return (jQuery.inArray(enableCarousel, validValues) > -1) ?
                                enableCarousel : 'n';
    };

    // How to display title
    var displayTitle = function (element) {
        // Display title variants
        var displayTitleVariants = ['title-above-image', 'title-below-image'];

        // How to display Title
        var displayTitle = element.attr('data-display-title');

        return (jQuery.inArray(displayTitle, displayTitleVariants) > -1) ?
                                displayTitle : 'title-above-image';
    };

    // Show Meta
    var showMeta = function (element) {
        var showMeta = element.attr('data-show-meta'),
            showMetaVariants = ['y', 'n'];
        return (jQuery.inArray(showMeta, showMetaVariants) > -1) ? showMeta : 'y';
    };

    var showMetaThumbnail = function (element) {
        var showMeta = element.attr('data-meta-thumbnail'),
            showMetaVariants = ['y', 'n'];
        return (jQuery.inArray(showMeta, showMetaVariants) > -1) ? showMeta : 'y';
    };

    // Show Label
    var showLabel = function (element) {
        var showLabel = element.attr('data-show-label'),
            showLabelVariants = ['y', 'n'];
        return (jQuery.inArray(showLabel, showLabelVariants) > -1) ? showLabel : 'y';
    };

    // Nuber of elements per row
    var elementsPerRow = function (element) {
        var elementsPerRow = element.attr('data-elements-per-row');
        return ( elementsPerRow > 12 || elementsPerRow < 0 ) ? 1 : elementsPerRow;
    };

    // Limit number of posts
    var postsLimit = function (element) {
        var postsLimit = element.attr('data-posts-limit');
        return (postsLimit < -1 || postsLimit > 102) ? 9 : postsLimit;
    };

    // Limit number of posts
    var imageHeight = function (element) {
        var imageHeight = element.attr('data-height');
        return (imageHeight < -1 || imageHeight >= 4000) ? 585 : imageHeight;
    };

    // Order posts by
    var orderBy = function (element) {
        var orderBy = element.attr('data-order-by'),
            orderByVariants = ['comments', 'date', 'views', 'likes', 'start-date'];

        return (jQuery.inArray(orderBy, orderByVariants) != -1 ) ?  orderBy : 'date';
    };

    // Order direction
    var orderDirection = function (element) {
        var orderDirection = element.attr('data-order-direction'),
            orderDirectionVariants = ['asc', 'desc'];

        return (jQuery.inArray(orderDirection, orderDirectionVariants) != -1) ? orderDirection : 'desc';
    };

    // Show image
    var imageShow = function (element) {
        var imageShow = element.attr('data-image'),
            imageShowVariants = ['y', 'n'];

        return (jQuery.inArray(imageShow, imageShowVariants) != -1) ? imageShow : 'n';
    };

    // Enable number of row
    var numberRow = function (element) {
        var numberRow = element.attr('data-rows'),
            numberRowVariants = ['2', '3'];

        return (jQuery.inArray(numberRow, numberRowVariants) != -1) ? numberRow : '2';
    };

    // Change effects to scroll
    var effectsScrollMosaic = function (element) {
        var effectsScrollMosaic = element.attr('data-effects-scroll'),
            effectsScrollMosaicVariants = ['default', 'fade'];

        return (jQuery.inArray(effectsScrollMosaic, effectsScrollMosaicVariants) != -1) ? effectsScrollMosaic : 'fade';
    };

    var layoutMosaic = function (element) {
        var layoutMosaic = element.attr('data-layout'),
            layoutMosaicVariants = ['rectangles', 'square'];

        return (jQuery.inArray(layoutMosaic, layoutMosaicVariants) != -1) ? layoutMosaic : 'square';
    };

    // Enable number of row
    var displayScroll = function (element) {
        var displayScroll = element.attr('data-scroll'),
            displayScrollVariants = ['y', 'n'];

        return (jQuery.inArray(displayScroll, displayScrollVariants) != -1) ? displayScroll : 'n';
    };

    //Pagination enable
    var enablePagination = function (element) {
        var enablePagination = element.attr('data-pagination'),
            enablePaginationVariants = ['n', 'y', 'load-more', 'infinite'];

        return (jQuery.inArray(enablePagination, enablePaginationVariants) != -1) ? enablePagination : 'n';
    };

    var imagePosition = function (element) {
        var imagePosition = element.attr('data-image-position'),
            imagePositionVariants = ['left', 'right', 'mosaic'];

        return (jQuery.inArray(imagePosition, imagePositionVariants) != -1) ? imagePosition : 'left';
    };

    var showExcerpt = function (element) {
        var showExcerpt = element.attr('data-excerpt'),
            showExcerptVariants = ['y', 'n'];

        return (jQuery.inArray(showExcerpt, showExcerptVariants) != -1) ? showExcerpt : 'y';
    };

    //Pagination enable
    var showRelated = function (element) {
        var showRelated = element.attr('data-related-posts'),
            showRelatedVariants = ['n', 'y'];

        return (jQuery.inArray(showRelated, showRelatedVariants) != -1) ? showRelated : 'n';
    };
    // Image split
    var imageSplit = function (element) {
        var imageSplit = element.attr('data-image-split');

        return (imageSplit < 1 && imageSplit > 11) ? 4 : imageSplit;
    };

    // Content split
    var contentSplit = function (element) {
        var contentSplit = element.attr('data-content-split');

        return (contentSplit < 1 && contentSplit > 11) ? 4 : contentSplit;
    };

    var showRelatedPosts = function (element) {
        var showRelatedPosts = element.attr('data-related-posts'),
            showRelatedPostsVariants = ['y', 'n'];

        return (jQuery.inArray(showRelatedPosts, showRelatedPostsVariants) != -1) ? showRelatedPosts : 'y';
    };

    var specialEffects = function (element) {
        var specialEffects = element.attr('data-special-effects'),
            specialEffectsVariation = ['none', 'opacited', 'rotate-in', '3dflip', 'scaler'];

        return (jQuery.inArray(specialEffects, specialEffectsVariation) != -1) ? specialEffects : 'none';
    };

    var gutter = function (element) {
        var gutter = element.attr('data-gutter'),
            gutterVariation = ['n', 'y'];

        return (jQuery.inArray(gutter, gutterVariation) != -1) ? gutter : 'n';
    };

    // -------------------------- Call to action functions ------------------------------
    var callactionText = function (element) {
        return element.attr('data-callaction-text');
    };

    var callactionLink = function (element) {
        return (element.attr('data-callaction-link')) ? element.attr('data-callaction-link') : '';
    };

    var callactionButtonText = function (element) {
        return (element.attr('data-callaction-button-text')) ? element.attr('data-callaction-button-text') : '';
    };

    // ---------------------------- Advertising --------------------------------------

    var advertising = function (element) {
        return element.attr('data-advertising');
    };

    // ---------------------------- Delimiter ---------------------------------------

    var delimiterType = function (element) {
        var delimiterType = element.attr('data-delimiter-type'),
            delimiterVariants = [
                'dotsslash',
                'doubleline',
                'lines',
                'squares',
                'gradient',
                'line',
                'iconed icon-close',
                'small-line'
            ];

        return (jQuery.inArray(delimiterType, delimiterVariants) != -1) ? delimiterType : 'line';
    };

    var titleStyle = function (element) {
        var elementStyle = element.attr('data-style'),
            styles = [
                'title-icon',
                'lineariconcenter',
                '2lines',
                'simpleleft',
                'lineafter',
                'linerect',
                'leftrect',
                'simplecenter',
                'with-subtitle-above',
                'align-right',
                'bottom-decoration',
                'brackets',
                'with-subtitle-over',
                'with-small-line-below'
            ];

        return (jQuery.inArray(elementStyle, styles) != -1) ? elementStyle : 'simpleleft';
    };

    var titleSizes= function (element) {
        var elementSize = element.attr('data-size'),
            sizes = [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6'
            ];

        return (jQuery.inArray(elementSize, sizes) != -1) ? elementSize : 'h1';
    };


    // ---------------------------- Page -----------------------------------------------

    var pageID = function (element) {
        return element.attr('data-page-id');
    };

    // ---------------------------- Post ------------------------------------------------

    var postID = function (element) {
        return element.attr('data-post-id');
    };

    var menuStyle = function (element) {
        return element.attr('data-element-style');
    };

    var sidebarmenuPosition = function(element) {
        return element.attr('data-sidebar-menu-style');
    };

    var getSidebarID = function (element) {
        return element.attr('data-sidebar-id');
    };


    if (elementType === 'logo') {

        elementOptions.find('#logo-align').val(element.attr('data-logo-align'));
        elementOptions.find('#logo-effect').val(element.attr('data-logo-effect'));
        elementOptions.find('#logo-effect-delay').val(element.attr('data-logo-effect-delay'));

    } else if (elementType === 'instance') {

        elementOptions.find("#instance-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#instance-title").val(element.attr('data-title'));
        elementOptions.find('#instance-image-url').val(element.attr('data-image'));
        elementOptions.find("#instance-align").val(element.attr('data-align'));
        elementOptions.find('#instance-button-target').val(element.attr('data-button-target'));
        elementOptions.find('#instance-button-url').val(element.attr('data-button-url'));
        elementOptions.find('#instance-button-text').val(element.attr('data-button-text'));
        elementOptions.find('#image_preview').html(jQuery('<img>').attr('src', element.attr('data-image')).attr('style', 'max-width:400px'));
        elementOptions.find("#instance-content").val(element.attr('data-content'));

    } else if (elementType === 'social-buttons') {

        elementOptions.find('#social-align').val(element.attr('data-social-align'));
        elementOptions.find('#social-buttons-admin-label').val(element.attr('data-admin-label'));
        elementOptions.find('#social-labels').val(element.attr('data-labels'));

    } else if (elementType === 'cart') {

        elementOptions.find('#cart-align').val(element.attr('data-cart-align'));

    } else if (elementType === 'breadcrumbs') {


    } else if (elementType === 'searchbox') {

        elementOptions.find("#searchbox-align").val(element.attr('data-align'));
        elementOptions.find('#searchbox-show-mobile option[value="' + element.attr('data-show-mobile') + '"]').attr("selected", "selected");

    } else if (elementType === 'menu') {

        var menuID = menuStyle(element),
            sidebarMenuStyle = sidebarmenuPosition(element);

        elementOptions.find('#menu-styles option[value="' + menuID + '"]').attr("selected", "selected");
        elementOptions.find('#sidebar-menu-style option[value="'+ sidebarMenuStyle +'"]').attr("selected", "selected");
        elementOptions.find("#menu-custom").val(element.attr('data-menu-custom'));
        elementOptions.find("#menu-element-bg-color").val(element.attr('data-menu-bg-color'));
        elementOptions.find("#menu-element-text-color").val(element.attr('data-menu-text-color'));
        elementOptions.find("#menu-element-bg-color-hover").val(element.attr('data-menu-bg-color-hover'));
        elementOptions.find("#menu-element-text-color-hover").val(element.attr('data-menu-text-color-hover'));
        elementOptions.find("#menu-element-submenu-bg-color").val(element.attr('data-submenu-bg-color'));
        elementOptions.find("#menu-element-submenu-text-color").val(element.attr('data-submenu-text-color'));
        elementOptions.find("#menu-element-submenu-bg-color-hover").val(element.attr('data-submenu-bg-color-hover'));
        elementOptions.find("#menu-element-submenu-text-color-hover").val(element.attr('data-submenu-text-color-hover'));
        elementOptions.find("#menu-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#menu-text-align").val(element.attr('data-menu-text-align'));
        elementOptions.find("#menu-uppercase").val(element.attr('data-uppercase'));
        elementOptions.find("#menu-name").val(element.attr('data-name'));
        elementOptions.find("#menu-description").val(element.attr('data-description'));
        elementOptions.find("#menu-search-icon").val(element.attr('data-search-icon'));
        elementOptions.find("#menu-cart-element").val(element.attr('data-cart-element'));
        elementOptions.find("#menu-social-icons").val(element.attr('data-social-icons'));
        elementOptions.find("#menu-icons").val(element.attr('data-icons'));
        elementOptions.find("#menu-font-type").val(element.attr('data-font-type'));
        elementOptions.find("#ts-fontchanger-menu").val(element.attr('data-font-name'));
        elementOptions.find("#ts-menu-font-subsets").val(element.attr('data-font-subsets'));
        elementOptions.find("#ts-menu-font-weight").val(element.attr('data-font-weight'));
        elementOptions.find("#ts-menu-font-style").val(element.attr('data-font-style'));
        elementOptions.find("#ts-menu-font-size").val(element.attr('data-font-size'));
        elementOptions.find("#menu-demo").val(element.attr('data-font-demo'));
        elementOptions.find('#menu-show-mobile option[value="' + element.attr('data-show-mobile') + '"]').attr("selected", "selected");

        tsz_logic_exclude({
            mode : 'display_if',
            element : '#menu-styles',
            allowed_values : ['style4'],
            target: '#sidebar-menu-style-row',
            trigger: 'change',
        });

    } else if (elementType === 'featured-article') {

        elementOptions.find('option[value="featured-article"]').attr("selected", "selected");
        elementOptions.find('#featured-article-showImage').val(element.attr('data-showImage'));
        elementOptions.find('#featured-article-showMeta').val(element.attr('data-showMeta'));

        if( element.attr('data-post-title') !== '' && typeof(element.attr('data-post-title')) !== 'undefined' ){
            elementOptions.find('#search-posts-results').html('<tr><td><input id="postID" type="radio" name="postID" value="' + element.attr('data-post-id') + '" checked="checked"/></td><td><label for="postID">' + element.attr('data-post-title') + '</label></td></tr>');
        }

    } else if (elementType === 'sidebar') {

        var sidebarID = getSidebarID(element);

        elementOptions.find('#ts_sidebar_sidebars option[value="' + sidebarID + '"]').attr("selected", "selected");
        elementOptions.find('#sidebar-sticky option[value="' + element.attr('data-sidebar-sticky') + '"]').attr("selected", "selected");
        elementOptions.find("#sidebar-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'slider') {

        var slider_id = sliderID(element);

        elementOptions.find('#slider-name option[value="' + slider_id + '"]').attr("selected", "selected");
        elementOptions.find("#slider-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'image-carousel') {

        elementOptions.find('#carousel_image_gallery').val(element.attr('data-images'));
        elementOptions.find('#carousel_height').val(element.attr('data-carousel-height'));
        elementOptions.find("#image-carousel-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'list-portfolios') {

        var category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');
        elementOptions.find("#list-portfolios-admin-label").val(element.attr('data-admin-label'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#list-portfolios-category option').each(function(index, el) {
            var element = jQuery(el);

            if ( jQuery.inArray(element.val(), category) > -1 ) {
                element.attr("selected", "selected");
            }
        });

        // How to display last posts
        var displayModeVariants = ['grid', 'list', 'thumbnails', 'big-post', 'super-post', 'mosaic'],
            displayMode = element.attr('data-display-mode');

        displayMode = (jQuery.inArray(displayMode, displayModeVariants) > -1) ? displayMode : 'grid';
        elementOptions.find('#list-portfolios-display-mode option[value="' +  displayMode + '"]').attr("selected", "selected");

        if (displayMode === 'grid') {
            elementOptions.find('#list-portfolios-grid-behavior option[value="' +  element.attr('data-behavior') + '"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-grid-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-grid-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-portfolios-grid-el-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-grid-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-portfolios-grid-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-grid-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-grid-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");

        } else if (displayMode === 'list') {
            elementOptions.find('#list-portfolios-list-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-list-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-portfolios-list-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-portfolios-list-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-list-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-list-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");

        } else if (displayMode === 'thumbnails') {
            elementOptions.find('#list-portfolios-thumbnail-title option[value="' + element.attr('data-display-title')  + '"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-thumbnail-behavior option[value="'+element.attr('data-behavior')+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-thumbnail-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-thumbnail-limit').val(postsLimit(element));
            elementOptions.find('#list-portfolios-thumbnail-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-thumbnail-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-thumbnail-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-thumbnail-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");

        } else if (displayMode === 'big-post') {

            elementOptions.find('#list-portfolios-big-post-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-portfolios-big-post-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-portfolios-big-post-split option[value="'+imageSplit(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-big-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-big-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-big-post-show-related-' + showRelatedPosts(element)).attr("checked", "checked");
            elementOptions.find('#list-portfolios-big-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");

        } else if (displayMode === 'super-post') {

            elementOptions.find('#list-portfolios-super-post-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-super-post-limit').val(postsLimit(element));
            elementOptions.find('#list-portfolios-super-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-super-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-super-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");

        } else if (displayMode === 'mosaic') {

            elementOptions.find('#list-portfolios-mosaic-rows option[value="'+numberRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-scroll option[value="'+displayScroll(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-effects option[value="'+effectsScrollMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-layout option[value="'+layoutMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-portfolios-mosaic-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");

            if( layoutMosaic(element) == 'rectangles' ){
                elementOptions.find('#list-portfolios-mosaic-post-limit-rows-' + numberRow(element)).val(postsLimit(element));
            }else{
                elementOptions.find('#list-portfolios-mosaic-post-limit-rows-squares').val(postsLimit(element));
            }

            tsz_show_post_exclude_first('list-portfolios', 'mosaic');

        } else {

            e['display-title'] = 'above-image';
            e['show-meta'] = 'y';
            e['elements-per-row'] = 3;
            e['posts-limit'] = 9;
            e['order-by'] = 'date';
            e['order-direction'] = 'desc';
            e['special-effects'] = 'none';
            e['pagination'] = 'n';
        }

    } else if (elementType === 'tab') {

        dataAttr = {};
        dataAttr['element-type'] = 'tab';

        elementOptions.find('#tab_content').val(element.attr('data-tab'));
        elementOptions.find("#tab-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#tab-mode").val(element.attr('data-mode'));

    } else if (elementType === 'video-carousel') {

        dataAttr = {};
        dataAttr['element-type'] = 'video-carousel';

        elementOptions.find('#video-carousel_content').val(element.attr('data-video-carousel'));
        elementOptions.find("#video-carousel-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#video-carousel-source").val(element.attr('data-source'));

    } else if (elementType === 'grease-slider') {

        dataAttr = {};
        dataAttr['element-type'] = 'grease-slider';

        elementOptions.find('#grease-slider').val(element.attr('data-grease-slider'));
        elementOptions.find("#grease-slider-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#grease-slider-source").val(element.attr('data-source'));

    } else if (elementType === 'elastic-slider') {

        dataAttr = {};
        dataAttr['element-type'] = 'elastic-slider';

        elementOptions.find('#elastic-slider').val(element.attr('data-elastic-slider'));
        elementOptions.find("#elastic-slider-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#elastic-slider-source").val(element.attr('data-source'));

    } else if (elementType === 'count-down') {

        dataAttr = {};
        dataAttr['element-type'] = 'count-down';

        elementOptions.find("#count-down-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#count-down-title").val(element.attr('data-title'));
        elementOptions.find("#count-down-date").val(element.attr('data-date'));
        elementOptions.find("#count-down-hours").val(element.attr('data-hours'));
        elementOptions.find("#count-down-style").val(element.attr('data-style'));

    } else if (elementType === 'testimonials') {

        dataAttr = {};
        dataAttr['element-type'] = 'testimonials';

        elementOptions.find('#testimonials-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");

        elementOptions.find('#testimonials_content').val(element.attr('data-testimonials'));

        elementOptions.find('#testimonials-enable-carousel option[value="' +  element.attr('data-enable-carousel') + '"]').attr("selected", "selected");
        elementOptions.find("#testimonials-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'skills') {

        elementOptions.find("#skills-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#skills-display-mode").val(element.attr('data-display-mode'));
        elementOptions.find('#skills_content').val(element.attr('data-skills'));

    } else if (elementType === 'boca' || elementType === 'nona') {

        elementOptions.find("#"+ elementType +"-admin-label").val(element.attr('data-admin-label'));

        var category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#'+ elementType +'-categories-'+ element.attr('data-custom-post') +' option').each(function(index, el) {
            var element = jQuery(el);

            if (jQuery.inArray(element.val(), category) > -1) {
                element.attr("selected", "selected");
            }
        });

        elementOptions.find("#"+ elementType +"-custom-post").val(element.attr('data-custom-post'));
        elementOptions.find("#"+ elementType +"-featured").val(element.attr('data-featured'));
        elementOptions.find("#"+ elementType +"-orderby").val(element.attr('data-orderby'));
        elementOptions.find("#"+ elementType +"-order").val(element.attr('data-order'));
        elementOptions.find("#"+ elementType +"-posts_per_page").val(element.attr('data-posts_per_page'));

    } else if (elementType === 'list-products') {

        var category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');

        elementOptions.find("#list-products-admin-label").val(element.attr('data-admin-label'));
        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#list-products-category option').each(function(index, el) {
            var element = jQuery(el);

            if (jQuery.inArray(element.val(), category) > -1) {
                element.attr("selected", "selected");
            }
        });

        elementOptions.find('#list-products-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
        elementOptions.find('#list-products-el-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
        elementOptions.find('#list-products-nr-of-posts').val(postsLimit(element));
        elementOptions.find('#list-products-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
        elementOptions.find('#list-products-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
        elementOptions.find('#list-products-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
        elementOptions.find("#list-products-admin-label").val(element.attr('data-admin-label'));


    } else if (elementType === 'last-posts') {

        var category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');

        elementOptions.find('#last-posts-exclude').val(element.attr('data-id-exclude'));
        elementOptions.find('#last-posts-exclude-first').val(element.attr('data-exclude-first'));
        elementOptions.find("#last-posts-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#last-posts-featured").val(element.attr('data-featured'));
        elementOptions.find("#last-posts-side-content").val(element.attr('data-side-content'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#last-posts-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

        // How to display last posts
        var displayModeVariants = ['grid', 'list', 'thumbnails', 'big-post', 'super-post', 'timeline', 'mosaic'],
            displayMode = element.attr('data-display-mode');

        displayMode = (jQuery.inArray(displayMode, displayModeVariants) > -1) ? displayMode : 'grid';
        elementOptions.find('#last-posts-display-mode option[value="' +  displayMode + '"]').attr("selected", "selected");

        if (displayMode === 'grid') {
            elementOptions.find('#last-posts-grid-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#last-posts-grid-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#last-posts-grid-el-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#last-posts-grid-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-grid-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('last-posts', 'grid');

        } else if (displayMode === 'list') {
            elementOptions.find('#last-posts-list-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#last-posts-list-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#last-posts-list-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#last-posts-list-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-list-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-list-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-list-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-list-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('last-posts', 'list');

        } else if (displayMode === 'thumbnails') {
            elementOptions.find('#last-posts-thumbnail-title option[value="' +  element.attr('data-display-title') + '"]').attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnails-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnail-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnail-limit').val(postsLimit(element));
            elementOptions.find('#last-posts-thumbnail-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnails-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnail-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnail-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-thumbnail-show-meta-' + showMetaThumbnail(element)).attr("checked", "checked");
            elementOptions.find('#last-posts-thumbnails-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('last-posts', 'thumbnails');

        } else if (displayMode === 'big-post') {

            elementOptions.find('#last-posts-big-post-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#last-posts-big-post-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#last-posts-big-post-image-split option[value="'+imageSplit(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-image-position option[value="'+imagePosition(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-excerpt option[value="'+showExcerpt(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-carousel option[value="'+element.attr('data-carousel')+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-big-post-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('last-posts', 'big-post');

        } else if (displayMode === 'super-post') {

            elementOptions.find('#last-posts-super-post-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-super-post-limit').val(postsLimit(element));
            elementOptions.find('#last-posts-super-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-super-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-super-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-super-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('last-posts', 'super-post');

        } else if (displayMode === 'timeline') {
            elementOptions.find('#last-posts-timeline-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#last-posts-timeline-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#last-posts-timeline-post-limit').val(postsLimit(element));
            elementOptions.find('#last-posts-timeline-image option[value="'+imageShow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-timeline-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-timeline-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-timeline-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('last-posts', 'timeline');

        } else if (displayMode === 'mosaic') {
            elementOptions.find('#last-posts-mosaic-rows option[value="'+numberRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-scroll option[value="'+displayScroll(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-effects option[value="'+effectsScrollMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-layout option[value="'+layoutMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#last-posts-mosaic-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");

            if( layoutMosaic(element) == 'rectangles' ){
                elementOptions.find('#last-posts-mosaic-post-limit-rows-' + numberRow(element)).val(postsLimit(element));
            }else{
                elementOptions.find('#last-posts-mosaic-post-limit-rows-squares').val(postsLimit(element));
            }

            tsz_show_post_exclude_first('last-posts', 'mosaic');

        } else {

            e['display-title'] = 'above-image';
            e['show-meta'] = 'y';
            e['elements-per-row'] = 3;
            e['posts-limit'] = 9;
            e['order-by'] = 'date';
            e['order-direction'] = 'desc';
            e['special-effects'] = 'none';
            e['image'] = 'n';
            e['layout'] = 'rectangles-gutter';
            e['height'] = '585';
            e['gutter'] = 'y';
            e['effects-scroll'] = 'fade';
            e['rows'] = '2';
        }

    } else if (elementType === 'list-galleries') {

        var category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');

        elementOptions.find('#list-galleries-exclude').val(element.attr('data-id-exclude'));
        elementOptions.find('#list-galleries-exclude-first').val(element.attr('data-exclude-first'));
        elementOptions.find("#list-galleries-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#list-galleries-featured").val(element.attr('data-featured'));
        elementOptions.find("#list-galleries-side-content").val(element.attr('data-side-content'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#list-galleries-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

        // How to display last posts
        var displayModeVariants = ['grid', 'list', 'thumbnails', 'big-post', 'super-post', 'timeline', 'mosaic', 'post-scroll'],
            displayMode = element.attr('data-display-mode');

        displayMode = (jQuery.inArray(displayMode, displayModeVariants) > -1) ? displayMode : 'grid';
        elementOptions.find('#list-galleries-display-mode option[value="' +  displayMode + '"]').attr("selected", "selected");

        if (displayMode === 'grid') {
            elementOptions.find('#list-galleries-grid-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-galleries-grid-el-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-galleries-grid-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-grid-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'grid');

        } else if (displayMode === 'list') {
            elementOptions.find('#list-galleries-list-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-list-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-galleries-list-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-galleries-list-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-list-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-list-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-list-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-list-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'list');

        } else if (displayMode === 'post-scroll') {
            elementOptions.find('#list-galleries-post-scroll-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-post-scroll-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-galleries-post-scroll-image-split option[value="'+imageSplit(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-post-scroll-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-post-scroll-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-post-scroll-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-post-scroll-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'list');

        } else if (displayMode === 'thumbnails') {
            elementOptions.find('#list-galleries-thumbnail-title option[value="' +  element.attr('data-display-title') + '"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnails-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnail-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnail-limit').val(postsLimit(element));
            elementOptions.find('#list-galleries-thumbnail-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnails-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnail-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnail-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-thumbnail-show-meta-' + showMetaThumbnail(element)).attr("checked", "checked");
            elementOptions.find('#list-galleries-thumbnails-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'thumbnails');

        } else if (displayMode === 'big-post') {

            elementOptions.find('#list-galleries-big-post-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-galleries-big-post-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-galleries-big-post-image-split option[value="'+imageSplit(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-image-position option[value="'+imagePosition(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-excerpt option[value="'+showExcerpt(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-carousel option[value="'+element.attr('data-carousel')+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-big-post-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'big-post');

        } else if (displayMode === 'super-post') {

            elementOptions.find('#list-galleries-super-post-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-super-post-limit').val(postsLimit(element));
            elementOptions.find('#list-galleries-super-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-super-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-super-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-super-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'super-post');

        } else if (displayMode === 'timeline') {
            elementOptions.find('#list-galleries-timeline-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-timeline-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-galleries-timeline-post-limit').val(postsLimit(element));
            elementOptions.find('#list-galleries-timeline-image option[value="'+imageShow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-timeline-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-timeline-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-timeline-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('list-galleries', 'timeline');

        } else if (displayMode === 'mosaic') {
            elementOptions.find('#list-galleries-mosaic-rows option[value="'+numberRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-scroll option[value="'+displayScroll(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-effects option[value="'+effectsScrollMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-layout option[value="'+layoutMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-galleries-mosaic-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");

            if( layoutMosaic(element) == 'rectangles' ){
                elementOptions.find('#list-galleries-mosaic-post-limit-rows-' + numberRow(element)).val(postsLimit(element));
            }else{
                elementOptions.find('#list-galleries-mosaic-post-limit-rows-squares').val(postsLimit(element));
            }

            tsz_show_post_exclude_first('list-galleries', 'mosaic');

        } else {

            e['display-title'] = 'above-image';
            e['show-meta'] = 'y';
            e['elements-per-row'] = 3;
            e['posts-limit'] = 9;
            e['order-by'] = 'date';
            e['order-direction'] = 'desc';
            e['special-effects'] = 'none';
            e['image'] = 'n';
            e['layout'] = 'rectangles-gutter';
            e['height'] = '585';
            e['gutter'] = 'y';
            e['effects-scroll'] = 'fade';
            e['rows'] = '2';
        }

    } else if (elementType === 'accordion') {

        var posts_type, category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');
        elementOptions.find('#accordion-admin-label').val(element.attr('data-admin-label'));
        elementOptions.find('#accordion-posts-type').val(element.attr('data-posts-type'));
        elementOptions.find('#accordion-featured').val(element.attr('data-featured'));
        elementOptions.find('#accordion-order-by').val(element.attr('data-order-by'));
        elementOptions.find("#accordion-order-direction").val(element.attr('data-order-direction'));
        elementOptions.find("#accordion-nr-of-posts").val(element.attr('data-nr-of-posts'));
        elementOptions.find("#accordion-posts-type").val(element.attr('data-posts-type'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        jQuery('#accordion-' + element.attr('data-posts-type') + '-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

    } else if (elementType === 'latest-custom-posts') {

        var posts_type, category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');
        elementOptions.find('#latest-custom-posts-exclude').val(element.attr('data-id-exclude'));
        elementOptions.find('#latest-custom-posts-exclude-first').val(element.attr('data-exclude-first'));
        elementOptions.find("#latest-custom-posts-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#latest-custom-posts-featured").val(element.attr('data-featured'));

        posts_type = element.attr('data-post-type') ? element.attr('data-post-type').split(',') : [];

        elementOptions.find('#latest-custom-posts-type option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), posts_type) > -1) {
                elem.attr("selected", "selected");
            }
        });

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        jQuery(posts_type).each(function(i, value){
            jQuery('#latest-custom-posts-category-' + value + ' option').each(function(index, el) {
                var elem = jQuery(el);

                if (jQuery.inArray(elem.val(), category) > -1) {
                    elem.attr("selected", "selected");
                }
            });
        });

        // How to display last posts
        var displayModeVariants = ['grid', 'list', 'thumbnails', 'big-post', 'super-post', 'timeline', 'mosaic'],
            displayMode = element.attr('data-display-mode');

        displayMode = (jQuery.inArray(displayMode, displayModeVariants) > -1) ? displayMode : 'grid';
        elementOptions.find('#latest-custom-posts-display-mode option[value="' +  displayMode + '"]').attr("selected", "selected");

        if (displayMode === 'grid') {
            elementOptions.find('#latest-custom-posts-grid-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#latest-custom-posts-grid-el-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#latest-custom-posts-grid-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-grid-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('latest-custom-posts', 'grid');

        } else if (displayMode === 'list') {
            elementOptions.find('#latest-custom-posts-list-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-list-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#latest-custom-posts-list-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#latest-custom-posts-list-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-list-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-list-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-list-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
             elementOptions.find('#latest-custom-posts-list-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('latest-custom-posts', 'list');

        } else if (displayMode === 'thumbnails') {

            elementOptions.find('#latest-custom-posts-thumbnail-title option[value="' +  element.attr('data-display-title') + '"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnails-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnail-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnail-limit').val(postsLimit(element));
            elementOptions.find('#latest-custom-posts-thumbnail-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnails-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnail-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnail-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-thumbnail-show-meta-' + showMetaThumbnail(element)).attr("checked", "checked");
            elementOptions.find('#latest-custom-posts-thumbnails-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('latest-custom-posts', 'thumbnails');

        } else if (displayMode === 'big-post') {

            elementOptions.find('#latest-custom-posts-big-post-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#latest-custom-posts-big-post-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#latest-custom-posts-big-post-image-split option[value="'+imageSplit(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-image-position option[value="'+imagePosition(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-excerpt option[value="'+showExcerpt(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-big-post-carousel option[value="'+element.attr('data-carousel')+'"]').attr("selected", "selected");
             elementOptions.find('#latest-custom-posts-big-post-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('latest-custom-posts', 'big-post');

        } else if (displayMode === 'super-post') {

            elementOptions.find('#latest-custom-posts-super-post-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-super-post-limit').val(postsLimit(element));
            elementOptions.find('#latest-custom-posts-super-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-super-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-super-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-super-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('latest-custom-posts', 'super-post');

        } else if (displayMode === 'timeline') {
            elementOptions.find('#latest-custom-posts-timeline-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-timeline-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#latest-custom-posts-timeline-post-limit').val(postsLimit(element));
            elementOptions.find('#latest-custom-posts-timeline-image option[value="'+imageShow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-timeline-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-timeline-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-timeline-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('latest-custom-posts', 'timeline');

        } else if (displayMode === 'mosaic') {
            elementOptions.find('#latest-custom-posts-mosaic-rows option[value="'+numberRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-scroll option[value="'+displayScroll(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-effects option[value="'+effectsScrollMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-layout option[value="'+layoutMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#latest-custom-posts-mosaic-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");

            if( layoutMosaic(element) == 'rectangles' ){
                elementOptions.find('#latest-custom-posts-mosaic-post-limit-rows-' + numberRow(element)).val(postsLimit(element));
            }else{
                elementOptions.find('#latest-custom-posts-mosaic-post-limit-rows-squares').val(postsLimit(element));
            }

            tsz_show_post_exclude_first('latest-custom-posts', 'mosaic');

        } else {

            e['display-title'] = 'above-image';
            e['show-meta'] = 'y';
            e['elements-per-row'] = 3;
            e['posts-limit'] = 9;
            e['order-by'] = 'date';
            e['order-direction'] = 'desc';
            e['special-effects'] = 'none';
            e['image'] = 'n';
            e['layout'] = 'rectangles-gutter';
            e['height'] = '585';
            e['gutter'] = 'y';
            e['effects-scroll'] = 'fade';
            e['rows'] = '2';
        }

    } else if (elementType === 'callaction') {

        elementOptions.find('#callaction-text').val(callactionText(element));
        elementOptions.find('#callaction-link').val(callactionLink(element));
        elementOptions.find('#callaction-button-text').val(callactionButtonText(element));
        elementOptions.find("#callaction-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'teams') {

        var category;

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#teams-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

        elementOptions.find('#teams-elements-per-row option[value="' + elementsPerRow(element) + '"]').attr("selected", "selected");
        elementOptions.find('#teams-post-limit').val(postsLimit(element));
        elementOptions.find('#teams-remove-gutter option[value="' +  element.attr('data-remove-gutter') + '"]').attr("selected", "selected");
        elementOptions.find('#teams-enable-carousel option[value="' +  element.attr('data-enable-carousel') + '"]').attr("selected", "selected");
        elementOptions.find("#teams-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#teams-effect").val(element.attr('data-effect'));
        elementOptions.find("#teams-delay").val(element.attr('data-delay'));

    } else if (elementType === 'pricing-tables') {

        elementOptions.find("#pricing-tables-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#pricing-tables-effect").val(element.attr('data-effect'));
        elementOptions.find("#pricing-tables-delay").val(element.attr('data-delay'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

         elementOptions.find('#pricing-tables-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

        elementOptions.find('#pricing-tables-elements-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
        elementOptions.find('#pricing-tables-post-limit').val(postsLimit(element));
        elementOptions.find('#pricing-tables-remove-gutter option[value="' +  element.attr('data-remove-gutter') + '"]').attr("selected", "selected");
        elementOptions.find('#pricing-tables-equal-height option[value="' +  element.attr('data-equal-height') + '"]').attr("selected", "selected");
        elementOptions.find('#pricing-tables-enable-carousel option[value="' +  element.attr('data-enable-carousel') + '"]').attr("selected", "selected");

    } else if (elementType === 'advertising') {

        elementOptions.find('#advertising').val(advertising(element));
        elementOptions.find("#advertising-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'empty') {


    } else if (elementType === 'delimiter') {

        elementOptions.find('#delimiter-color').val(element.attr('data-delimiter-color'));
        elementOptions.find('#delimiter-type option[value="'+delimiterType(element)+'"]').attr("selected", "selected");
        elementOptions.find("#delimiter-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'title') {

        elementOptions.find('#builder-element-title-icon option[value="'+element.attr('data-title-icon')+'"]').attr("selected", "selected");
        elementOptions.find('#title-title').val(element.attr('data-title'));
        elementOptions.find('#builder-element-title-color').val(element.attr('data-title-color'));
        elementOptions.find('#title-subtitle').val(element.attr('data-subtitle'));
        elementOptions.find('#builder-element-title-subtitle-color').val(element.attr('data-subtitle-color'));
        elementOptions.find('#title-size option[value="' +titleSizes(element)+ '"]').attr("selected", "selected");
        elementOptions.find('#title-style option[value="'+titleStyle(element)+'"]').attr("selected", "selected");
        elementOptions.find("#title-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#title-target").val(element.attr('data-target'));
        elementOptions.find("#title-link").val(element.attr('data-link'));
        elementOptions.find("#title-effect").val(element.attr('data-effect'));
        elementOptions.find("#title-delay").val(element.attr('data-delay'));
        elementOptions.find("#title-letter-spacing").val(element.attr('data-letter-spacer'));

    } else if (elementType === 'video') {

        elementOptions.find('#video-embed').val(element.attr('data-embed'));
        elementOptions.find("#video-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#video-lightbox").val(element.attr('data-lightbox'));
        elementOptions.find("#video-title").val(element.attr('data-title'));

    } else if (elementType === 'facebook-block') {

        elementOptions.find('#facebook-url').val(element.attr('data-facebook-url'));
        elementOptions.find('#facebook-cover option[value="' + element.attr('data-cover')+ '"]').attr("selected", "selected");

    } else if (elementType === 'image') {

        elementOptions.find('#image_url').val(element.attr('data-image-url'));
        elementOptions.find('#image-target').val(element.attr('data-image-target'));
        elementOptions.find('#forward-image-url').val(element.attr('data-forward-url'));
        elementOptions.find('#image_preview').html(jQuery('<img>').attr('src', element.attr('data-image-url')).attr('style', 'max-width:400px'));
        elementOptions.find("#image-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#image-retina").val(element.attr('data-retina'));
        elementOptions.find("#image-align").val(element.attr('data-align'));
        elementOptions.find("#image-effect").val(element.attr('data-effect'));
        elementOptions.find("#image-delay").val(element.attr('data-delay'));

    } else if (elementType === 'powerlink') {

        elementOptions.find("#powerlink-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#image-powerlink-url').val(element.attr('data-image'));
        elementOptions.find('#powerlink-image-preview').html(jQuery('<img>').attr('src', element.attr('data-image')).attr('style', 'max-width:400px'));
        elementOptions.find("#powerlink-title").val(element.attr('data-title'));
        elementOptions.find('#powerlink-button-url').val(element.attr('data-button-url'));
        elementOptions.find("#powerlink-button-text").val(element.attr('data-button-text'));

    } else if (elementType === 'filters') {

        elementOptions.find('#filters-post-type option[value="' + element.attr('data-post-type')+ '"]').attr("selected", "selected");

        var category = element.attr('data-categories').split(',');
        elementOptions.find('#filters-' + element.attr('data-post-type') + '-category option').each(function(){
            for(var cat in category){
                if( jQuery(this).val() == category[cat] ) jQuery(this).attr('selected', 'selected');
            }
        });

        elementOptions.find('#filters-posts-limit').val(element.attr('data-posts-limit'));
        elementOptions.find('#filters-elements-per-row option[value="' +  elementsPerRow(element) + '"]').attr("selected", "selected");
        elementOptions.find('#filters-order-by').val(element.attr('data-order-by'));
        elementOptions.find('#filters-order-direction option[value="'+element.attr('data-direction')+'"]').attr("selected", "selected");
        elementOptions.find('#filters-special-effects option[value="'+element.attr('data-special-effects')+'"]').attr("selected", "selected");
        elementOptions.find('#filters-gutter option[value="'+element.attr('data-gutter')+'"]').attr("selected", "selected");
        elementOptions.find("#filters-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#filters-meta").val(element.attr('data-meta-thumbnail'));

    } else if (elementType === 'feature-blocks') {

        elementOptions.find('#feature-blocks-category option[value="' +  element.attr('data-category') + '"]').attr("selected", "selected");
        elementOptions.find('#feature-blocks-style option[value="' +  element.attr('data-style') + '"]').attr("selected", "selected");
        elementOptions.find('#feature-blocks-per-row option[value="' +  elementsPerRow(element) + '"]').attr("selected", "selected");
        elementOptions.find('#feature-blocks-limit').val(postsLimit(element));

    } else if (elementType === 'banner') {

        elementOptions.find('#image-banner-url').val(element.attr('data-banner-image'));
        elementOptions.find('#banner-image-preview').html(jQuery('<img>').attr('src', element.attr('data-banner-image')).attr('style', 'max-width:400px'));
        elementOptions.find('#banner-title').val(element.attr('data-banner-title'));
        elementOptions.find('#banner-subtitle').val(element.attr('data-banner-subtitle'));
        elementOptions.find('#banner-button-title').val(element.attr('data-banner-button-title'));
        elementOptions.find('#banner-button-url').val(element.attr('data-banner-button-url'));
        elementOptions.find('#banner-button-background').val(element.attr('data-banner-button-background'));
        elementOptions.find('#banner-font-color').val(element.attr('data-banner-font-color'));
        elementOptions.find('#banner-text-align').val(element.attr('data-banner-text-align'));
        elementOptions.find('#banner-height').val(element.attr('data-banner-height'));
        elementOptions.find("#banner-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#banner-button-text-color").val(element.attr('data-button-text-color'));

    } else if (elementType === 'toggle') {

        elementOptions.find('#toggle-title').val(element.attr('data-toggle-title'));
        elementOptions.find('#toggle-description').val(element.attr('data-toggle-description'));
        elementOptions.find('#toggle-state').val(element.attr('data-toggle-state'));
        elementOptions.find("#toggle-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'timeline') {

        elementOptions.find("#timeline-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#timeline_content').val(element.attr('data-timeline'));

    } else if (elementType === 'map') {

        elementOptions.find('option[selected="selected"]').removeAttr('selected');
        elementOptions.find("#map-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#map-address').val(element.attr('data-map-address'));
        elementOptions.find('#map-width').val(element.attr('data-map-width'));
        elementOptions.find('#map-height').val(element.attr('data-map-height'));
        elementOptions.find('#map-latitude').val(element.attr('data-map-latitude'));
        elementOptions.find('#map-longitude').val(element.attr('data-map-longitude'));
        elementOptions.find('#map-zoom').val(element.attr('data-map-zoom'));
        elementOptions.find('#map-type option[value="'+element.attr('data-map-type')+'"]').attr("selected", "selected");
        elementOptions.find('#map-style option[value="'+element.attr('data-map-style')+'"]').attr("selected", "selected");
        elementOptions.find('#map-type-control option[value="'+element.attr('data-map-type-control')+'"]').attr("selected", "selected");
        elementOptions.find('#map-zoom-control option[value="'+element.attr('data-map-zoom-control')+'"]').attr("selected", "selected");
        elementOptions.find('#map-scale-control option[value="'+element.attr('data-map-scale-control')+'"]').attr("selected", "selected");
        elementOptions.find('#map-scroll-wheel option[value="'+element.attr('data-map-scroll-wheel')+'"]').attr("selected", "selected");
        elementOptions.find('#map-draggable-direction option[value="'+element.attr('data-map-draggable-direction')+'"]').attr("selected", "selected");
        elementOptions.find('#map-marker-icon option[value="'+element.attr('data-map-marker-icon')+'"]').attr("selected", "selected");
        elementOptions.find("#map-marker-attachment").val(element.attr('data-map-marker-img'));
        elementOptions.find('#map-marker-image-preview').html(jQuery('<img>').attr('src', element.attr('data-map-marker-img')));

        setTimeout(function(){
            initialize();
        },100)

    }  else if (elementType === 'counters') {

        elementOptions.find("#counters-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#counters-text').val(element.attr('data-counters-text'));
        elementOptions.find('#counters-precents').val(element.attr('data-counters-precents'));
        elementOptions.find('#counters-text-color').val(element.attr('data-counters-text-color'));
        elementOptions.find('#counters-track-bar').val(element.attr('data-track-bar'));
        elementOptions.find('#counters-track-bar-color').val(element.attr('data-track-bar-color'));
        elementOptions.find('#counters-icon').val(element.attr('data-track-bar-icon'));
        elementOptions.find('#counters-special-effect').val(element.attr('data-effect'));
        elementOptions.find('#counters-delay').val(element.attr('data-delay'));

    }  else if (elementType === 'alert') {

        elementOptions.find("#alert-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#alert-icon option[value="'+element.attr('data-icon')+'"]').attr("selected", "selected");
        elementOptions.find('#alert-title').val(element.attr('data-title'));
        elementOptions.find('#alert-text').val(element.attr('data-text').replace(/<br \/>/g, '\n'));
        elementOptions.find('#alert-background-color').val(element.attr('data-background-color'));
        elementOptions.find('#alert-text-color').val(element.attr('data-text-color'));

    }  else if (elementType === 'spacer') {

        elementOptions.find('#spacer-height').val(element.attr('data-height'));
        elementOptions.find("#spacer-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#spacer-show-mobile option[value="' + element.attr('data-show-mobile') + '"]').attr("selected", "selected");

    } else if (elementType === 'icon') {

        elementOptions.find('#builder-element-icon-size').val(element.attr('data-icon-size'));
        elementOptions.find('#builder-element-icon-color').val(element.attr('data-icon-color'));
        elementOptions.find('#builder-element-icon option[value="'+element.attr('data-icon')+'"]').attr("selected", "selected");
        elementOptions.find('#builder-element-icon-align option[value="'+element.attr('data-icon-align')+'"]').attr("selected", "selected");
        elementOptions.find("#icon-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'listed-features') {

        elementOptions.find('#listed-features_content').val(element.attr('data-features'));
        elementOptions.find('#listed-features-align').val(element.attr('data-features-align'));
        elementOptions.find('#listed-features-color-style').val(element.attr('data-color-style'));
        elementOptions.find("#listed-features-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'clients') {

        dataAttr = {};
        dataAttr['element-type'] = 'clients';

        elementOptions.find('#clients-enable-carousel-' +  enableCarousel(element) ).attr("checked", "checked");
        elementOptions.find('#clients-row option[value="' +  elementsPerRow(element) + '"]').attr("selected", "selected");
        elementOptions.find('#clients_content').val(element.attr('data-clients'));
        elementOptions.find("#clients-admin-label").val(element.attr('data-admin-label'));

    }  else if (elementType === 'features-block') {

        elementOptions.find("#features-block-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#features-block-row option[value="' +  elementsPerRow(element) + '"]').attr("selected", "selected");
        elementOptions.find('#features-block-style').val(element.attr('data-style'));
        elementOptions.find('#features-block_content').val(element.attr('data-features-block'));
        elementOptions.find('#features-block-gutter').val(element.attr('data-gutter'));

    } else if (elementType === 'buttons') {

        elementOptions.find('#builder-element-button-icon option[value="'+element.attr('data-button-icon')+'"]').attr("selected", "selected");
        elementOptions.find('#button-text').val(element.attr('data-text'));
        elementOptions.find('#button-icon-align').val(element.attr('data-icon-align'));
        elementOptions.find('#button-size').val(element.attr('data-size'));
        elementOptions.find('#button-target').val(element.attr('data-target'));
        elementOptions.find('#button-text-color').val(element.attr('data-text-color'));
        elementOptions.find('#button-background-color').val(element.attr('data-bg-color'));
        elementOptions.find('#button-url').val(element.attr('data-url'));
        elementOptions.find('#button-align').val(element.attr('data-button-align'));
        elementOptions.find("#buttons-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#button-mode-display").val(element.attr('data-mode-display'));
        elementOptions.find("#button-border-color").val(element.attr('data-border-color'));
        elementOptions.find("#button-effect").val(element.attr('data-effect'));
        elementOptions.find("#button-delay").val(element.attr('data-delay'));
        elementOptions.find("#button-text-hover-color").val(element.attr('data-text-hover-color'));
        elementOptions.find("#button-border-hover-color").val(element.attr('data-border-hover-color'));
        elementOptions.find("#button-background-hover-color").val(element.attr('data-bg-hover-color'));

    } else if (elementType === 'ribbon') {

        elementOptions.find("#ribbon-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#ribbon-title").val(element.attr('data-title'));
        elementOptions.find("#ribbon-text").val(element.attr('data-text'));
        elementOptions.find("#ribbon-text-color").val(element.attr('data-text-color'));
        elementOptions.find("#ribbon-background-color").val(element.attr('data-background'));
        elementOptions.find("#ribbon-align").val(element.attr('data-align'));
        elementOptions.find("#ribbon-attachment").val(element.attr('data-image'));
        elementOptions.find('#builder-element-ribbon-icon option[value="'+element.attr('data-button-icon')+'"]').attr("selected", "selected");
        elementOptions.find('#ribbon-button-text').val(element.attr('data-button-text'));
        elementOptions.find('#ribbon-button-size').val(element.attr('data-button-size'));
        elementOptions.find('#ribbon-button-target').val(element.attr('data-button-target'));
        elementOptions.find('#ribbon-button-background-color').val(element.attr('data-button-background-color'));
        elementOptions.find('#ribbon-button-url').val(element.attr('data-button-url'));
        elementOptions.find('#ribbon-button-align').val(element.attr('data-button-align'));
        elementOptions.find("#ribbon-button-mode-display").val(element.attr('data-button-mode-display'));
        elementOptions.find("#ribbon-button-border-color").val(element.attr('data-button-border-color'));
        elementOptions.find("#ribbon-button-text-color").val(element.attr('data-button-text-color'));
        elementOptions.find('#ribbon-image-preview').html(jQuery('<img>').attr('src', element.attr('data-image')));

    } else if (elementType === 'contact-form') {

        elementOptions.find("#contact-form-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#contact-form_content').val(element.attr('data-contact-form'));

        if (element.attr('data-hide-icon') === '1') {
            elementOptions.find('#contact-form-hide-icon').attr("checked", "checked");
        } else {
            elementOptions.find('#contact-form-hide-icon').removeAttr("checked");
        }

        if (element.attr('data-hide-subject') === '1') {
            elementOptions.find('#contact-form-hide-subject').attr("checked", "checked");
        } else {
            elementOptions.find('#contact-form-hide-subject').removeAttr("checked");
        }

    } else if (elementType === 'featured-area') {

        var featuredAreaCategories;

        elementOptions.find("#featured-area-admin-label").val(element.attr('data-admin-label'));

        elementOptions.find('#featured-area-custom-post option[value="'+element.attr('data-custom-post')+'"]').attr("selected", "selected");
        elementOptions.find("#featured-area-exclude-first").val(element.attr('data-exclude-first'));
        elementOptions.find("#featured-area-order-by").val(element.attr('data-order-by'));
        elementOptions.find("#featured-area-order-direction").val(element.attr('data-order-direction'));

        featuredAreaCategories = element.attr('data-selected-categories');

        if (typeof featuredAreaCategories != "undefined") {
            featuredAreaCategories = featuredAreaCategories.split(',');
        } else {
            featuredAreaCategories = [];
        }

        elementOptions.find('.featured-area option').each(function(index, el) {

            var element = jQuery(el);
            if ( jQuery.inArray( element.val(), featuredAreaCategories ) > -1 ) {
                element.attr("selected", "selected");
            }
        });

    } else if (elementType === 'shortcodes') {

        elementOptions.find('#ts-shortcodes').val(element.attr('data-shortcodes'));
        elementOptions.find('#shortcodes-paddings').val(element.attr('data-paddings'));
        elementOptions.find("#shortcodes-admin-label").val(element.attr('data-admin-label'));

    } else if (elementType === 'text') {

        var text_container = jQuery('.tsz-text-editor-modal');

        text_container.find("#text-admin-label").val(element.attr('data-admin-label'));
        text_container.find("#text-effect").val(element.attr('data-effect'));
        text_container.find("#text-delay").val(element.attr('data-delay'));

    } else if (elementType === 'list-videos') {

        var category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');

        elementOptions.find('#list-videos-exclude').val(element.attr('data-id-exclude'));
        elementOptions.find('#list-videos-exclude-first').val(element.attr('data-exclude-first'));
        elementOptions.find("#list-videos-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#list-videos-featured").val(element.attr('data-featured'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#list-videos-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

        // How to display last posts
        var displayModeVariants = ['grid', 'list', 'thumbnails', 'big-post', 'super-post', 'timeline', 'mosaic'],
           displayMode = element.attr('data-display-mode');

        displayMode = (jQuery.inArray(displayMode, displayModeVariants) > -1) ? displayMode : 'grid';
        elementOptions.find('#list-videos-display-mode option[value="' +  displayMode + '"]').attr("selected", "selected");

        if (displayMode === 'grid') {
            elementOptions.find('#list-videos-grid-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#list-videos-grid-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-videos-grid-el-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-videos-grid-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-grid-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('list-videos', 'grid');

        } else if (displayMode === 'list') {
            elementOptions.find('#list-videos-list-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-videos-list-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-videos-list-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-videos-list-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-list-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-list-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-list-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-list-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");

        } else if (displayMode === 'thumbnails') {
            elementOptions.find('#list-videos-thumbnails-behavior option[value="'+element.attr('data-behavior')+'"]' ).attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnail-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnail-limit').val(postsLimit(element));
            elementOptions.find('#list-videos-thumbnail-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnails-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnail-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnail-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnail-show-meta-' + showMetaThumbnail(element)).attr("checked", "checked");
            elementOptions.find('#list-videos-thumbnails-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-thumbnails-title option[value="' +  element.attr('data-display-title') + '"]').attr("selected", "selected");
            tsz_show_post_exclude_first('list-videos', 'thumbnails');

        } else if (displayMode === 'big-post') {

            elementOptions.find('#list-videos-big-post-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-videos-big-post-nr-of-posts').val(postsLimit(element));
            elementOptions.find('#list-videos-big-post-image-split option[value="'+imageSplit(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-related option[value="'+showRelated(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-image-position option[value="'+imagePosition(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-excerpt option[value="'+showExcerpt(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-carousel option[value="'+element.attr('data-carousel')+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-big-post-image option[value="'+element.attr('data-show-image')+'"]' ).attr("selected", "selected");
            tsz_show_post_exclude_first('list-videos', 'big-post');

        } else if (displayMode === 'super-post') {

            elementOptions.find('#list-videos-super-post-posts-per-row option[value="'+elementsPerRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-super-post-limit').val(postsLimit(element));
            elementOptions.find('#list-videos-super-post-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-super-post-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-super-post-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-super-post-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('list-videos', 'super-post');

        } else if (displayMode === 'timeline') {
            elementOptions.find('#list-videos-timeline-title option[value="' +  displayTitle(element) + '"]').attr("selected", "selected");
            elementOptions.find('#list-videos-timeline-show-meta-' + showMeta(element)).attr("checked", "checked");
            elementOptions.find('#list-videos-timeline-post-limit').val(postsLimit(element));
            elementOptions.find('#list-videos-timeline-image option[value="'+imageShow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-timeline-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-timeline-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-timeline-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");
            tsz_show_post_exclude_first('list-videos', 'timeline');

        } else if (displayMode === 'mosaic') {
            elementOptions.find('#list-videos-mosaic-rows option[value="'+numberRow(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-post-limit').val(postsLimit(element));
            elementOptions.find('#list-videos-mosaic-scroll option[value="'+displayScroll(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-effects option[value="'+effectsScrollMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-layout option[value="'+layoutMosaic(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-gutter option[value="'+gutter(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
            elementOptions.find('#list-videos-mosaic-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");

            if( layoutMosaic(element) == 'rectangles' ){
                elementOptions.find('#list-videos-mosaic-post-limit-rows-' + numberRow(element)).val(postsLimit(element));
            }else{
                elementOptions.find('#list-videos-mosaic-post-limit-rows-squares').val(postsLimit(element));
            }

            tsz_show_post_exclude_first('list-videos', 'mosaic');
        } else {

            e['display-title'] = 'above-image';
            e['show-meta'] = 'y';
            e['elements-per-row'] = 3;
            e['posts-limit'] = 9;
            e['order-by'] = 'date';
            e['order-direction'] = 'desc';
            e['special-effects'] = 'none';
            e['image'] = 'n';
            e['layout'] = 'rectangles-gutter';
            e['height'] = '585';
            e['gutter'] = 'y';
            e['effects-scroll'] = 'fade';
            e['rows'] = '2';
        }

    } else if (elementType === 'events') {

        var category;

        elementOptions.find('option[selected="selected"]').removeAttr('selected');
        elementOptions.find("#events-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find('#events-exclude').val(element.attr('data-id-exclude'));
        elementOptions.find('#events-exclude-first').val(element.attr('data-exclude-first'));
        elementOptions.find('#events-nr-of-posts').val(element.attr('data-posts-limit'));

        category = element.attr('data-category') ? element.attr('data-category').split(',') : [];

        elementOptions.find('#events-category option').each(function(index, el) {
            var elem = jQuery(el);

            if (jQuery.inArray(elem.val(), category) > -1) {
                elem.attr("selected", "selected");
            }
        });

        elementOptions.find('#events-order-by option[value="'+orderBy(element)+'"]').attr("selected", "selected");
        elementOptions.find('#events-order-direction option[value="'+orderDirection(element)+'"]').attr("selected", "selected");
        elementOptions.find('#events-special-effects option[value="'+specialEffects(element)+'"]').attr("selected", "selected");
        elementOptions.find('#events-pagination option[value="'+enablePagination(element)+'"]').attr("selected", "selected");

    } else if (elementType === 'calendar') {

        elementOptions.find("#calendar-admin-label").val(element.attr('data-admin-label'));
        elementOptions.find("#calendar-size").val(element.attr('data-size'));

    } else if (elementType === 'chart') {

        elementOptions.find('#chart-admin-label').val(element.attr('data-admin-label'));
        elementOptions.find('#chart_pie_content').val(element.attr('data-chart_pie'));
        elementOptions.find('#chart_line_content').val(element.attr('data-chart_line'));
        elementOptions.find('#chart-mode').val(element.attr('data-mode'));
        elementOptions.find('#chart-title').val(element.attr('data-title'));
        elementOptions.find('#chart-label').val(element.attr('data-label'));
        elementOptions.find('#chart-scaleShowGridLines').val(element.attr('data-scaleShowGridLines'));
        elementOptions.find('#chart-scaleGridLineColor').val(element.attr('data-scaleGridLineColor'));
        elementOptions.find('#chart-scaleGridLineWidth').val(element.attr('data-scaleGridLineWidth'));
        elementOptions.find('#chart-scaleShowHorizontalLines').val(element.attr('data-scaleShowHorizontalLines'));
        elementOptions.find('#chart-scaleShowVerticalLines').val(element.attr('data-scaleShowVerticalLines'));
        elementOptions.find('#chart-bezierCurve').val(element.attr('data-bezierCurve'));
        elementOptions.find('#chart-bezierCurveTension').val(element.attr('data-bezierCurveTension'));
        elementOptions.find('#chart-pointDot').val(element.attr('data-pointDot'));
        elementOptions.find('#chart-pointDotRadius').val(element.attr('data-pointDotRadius'));
        elementOptions.find('#chart-pointDotStrokeWidth').val(element.attr('data-pointDotStrokeWidth'));
        elementOptions.find('#chart-pointHitDetectionRadius').val(element.attr('data-pointHitDetectionRadius'));
        elementOptions.find('#chart-datasetStroke').val(element.attr('data-datasetStroke'));
        elementOptions.find('#chart-datasetStrokeWidth').val(element.attr('data-datasetStrokeWidth'));
        elementOptions.find('#chart-datasetFill').val(element.attr('data-datasetFill'));
        elementOptions.find('#chart-segmentShowStroke').val(element.attr('data-segmentShowStroke'));
        elementOptions.find('#chart-segmentStrokeColor').val(element.attr('data-segmentStrokeColor'));
        elementOptions.find('#chart-segmentStrokeWidth').val(element.attr('data-segmentStrokeWidth'));
        elementOptions.find('#chart-percentageInnerCutout').val(element.attr('data-percentageInnerCutout'));
        elementOptions.find('#chart-animationSteps').val(element.attr('data-animationSteps'));
        elementOptions.find('#chart-animateRotate').val(element.attr('data-animateRotate'));
        elementOptions.find('#chart-animateScale').val(element.attr('data-animateScale'));

    } else if (elementType === 'gallery') {
        elementOptions.find('#gallery-admin-label').val(element.attr('data-admin-label'));
        elementOptions.find('#gallery_image_gallery').val(element.attr('data-images'));
        elementOptions.find('#gallery_layout option[value="'+element.attr('data-layout')+'"]').attr('selected', 'selected');
        elementOptions.find('#gallery_scroll_effect option[value="'+element.attr('data-scroll-effect')+'"]').attr('selected', 'selected');
        elementOptions.find('#gallery_items_per_row option[value="'+element.attr('data-items-per-row')+'"]').attr('selected', 'selected');
        elementOptions.find('#grid_gallery_behavior option[value="'+element.attr('data-grid-gallery-behavior')+'"]').attr('selected', 'selected');
        elementOptions.find('#gallery_custom_height').val(element.attr('data-image-size-height'));
        elementOptions.find('#gallery_custom_width ').val(element.attr('data-image-size-width'));

        /* display scroll effect select only when List or Grid gallery styles are selected */
        tsz_gallery_logics();
        gallery_element_image_sizes();

    }
}

jQuery(document).on('change', '#menu-font-type', function(e){
    if( jQuery(this).val() == 'google' ){
        jQuery('.ts-builder-element-menu').css('display', '');
    }else{
        jQuery('.ts-builder-element-menu').css('display', 'none');
    }
});

jQuery(document).on('keypress', '[type="search"]', function(e){
    if( e.which == 13 ) e.preventDefault();
});

function tsz_screen_animation_delay(){
    jQuery('.ts-select-animation select').each(function(){
        if( jQuery(this).val() !== 'none' ){
            jQuery(this).closest('table').find('.ts-select-delay').css('display', '');
        }else{
            jQuery(this).closest('table').find('.ts-select-delay').css('display', 'none');
        }
    });
}

function tsz_screen_options(elementType){

    switch(elementType){

        case 'menu':

            if( jQuery('#menu-custom').val() == 'y' ) {
                jQuery('.menu-custom-colors').removeClass('hidden');
            }else{
                jQuery('.menu-custom-colors').addClass('hidden');
            }

            if( jQuery('#menu-font-type').val() == 'google' ){
                jQuery('.ts-builder-element-menu').css('display', '');
            }else{
                jQuery('.ts-builder-element-menu').css('display', 'none');
            }

            ts_google_fonts(jQuery, {
                font_name: jQuery('#ts-fontchanger-menu').val(),
                selected_subsets: jQuery('#ts-menu-font-subsets').val().split(','),
                allfonts: jQuery("#fontchanger-menu"),
                prefix: 'menu',
                subsetsTypes: jQuery('.menu-font-subsets'),
                section: 'builder-element-menu'
            });

            tsz_logic_exclude({
                mode : 'display_if',
                element : '#menu-styles',
                allowed_values : ['style4'],
                target: '#sidebar-menu-style-row',
                trigger: 'change',
            });

            tsz_restart_color_picker();

        break;
        case 'latest-custom-posts':

            tsz_multiple_select();

            jQuery('#latest-custom-posts-type option').each(function(){
                jQuery('#ts-block-category-' + jQuery(this).attr('value')).addClass('hidden');
            });

            var arrayValues = jQuery('#latest-custom-posts-type').val();
            for(key in arrayValues){
                jQuery('#ts-block-category-' + arrayValues[key]).removeClass('hidden');
            }

            custom_selectors_run();

            tsz_mosaic_screen_layout();

            tsz_slider_pips(6, 102, 6, jQuery('#latest-custom-posts-mosaic-post-limit-rows-2').val(), 'latest-custom-posts-mosaic-post-limit-rows-2-slider', 'latest-custom-posts-mosaic-post-limit-rows-2');
            tsz_slider_pips(9, 99, 9, jQuery('#latest-custom-posts-mosaic-post-limit-rows-3').val(), 'latest-custom-posts-mosaic-post-limit-rows-3-slider', 'latest-custom-posts-mosaic-post-limit-rows-3');
            tsz_slider_pips(5, 100, 5, jQuery('#latest-custom-posts-mosaic-post-limit-rows-squares').val(), 'latest-custom-posts-mosaic-post-limit-rows-squares-slider', 'latest-custom-posts-mosaic-post-limit-rows-squares');

            break;

        case 'filters':

            jQuery('#filters-post-type option').each(function(){
                var notSelected = jQuery(this).val();
                if( jQuery('#filters-post-type').val() !== notSelected ){
                    jQuery('#' + notSelected + '-categories').addClass('hidden');
                }else{
                    jQuery('#' + notSelected + '-categories').removeClass('hidden');
                }
            });

            tsz_multiple_select();

            custom_selectors_run();

            break;

        case 'accordion':

            tsz_multiple_select();

            jQuery('.ts-accordion-category').addClass('hidden');

            jQuery('.ts-accordion-category-' + jQuery('#accordion-posts-type').val()).removeClass('hidden');

            break;

        case 'last-posts':

            tsz_multiple_select();

            tsz_mosaic_screen_layout();

            custom_selectors_run();

            tsz_slider_pips(6, 102, 6, jQuery('#last-posts-mosaic-post-limit-rows-2').val(), 'last-posts-mosaic-post-limit-rows-2-slider', 'last-posts-mosaic-post-limit-rows-2');
            tsz_slider_pips(9, 99, 9, jQuery('#last-posts-mosaic-post-limit-rows-3').val(), 'last-posts-mosaic-post-limit-rows-3-slider', 'last-posts-mosaic-post-limit-rows-3');
            tsz_slider_pips(5, 100, 5, jQuery('#last-posts-mosaic-post-limit-rows-squares').val(), 'last-posts-mosaic-post-limit-rows-squares-slider', 'last-posts-mosaic-post-limit-rows-squares');

            break;

        case 'list-videos':

            tsz_multiple_select();

            tsz_mosaic_screen_layout();

            custom_selectors_run();

            tsz_slider_pips(6, 102, 6, jQuery('#list-videos-mosaic-post-limit-rows-2').val(), 'list-videos-mosaic-post-limit-rows-2-slider', 'list-videos-mosaic-post-limit-rows-2');
            tsz_slider_pips(9, 99, 9, jQuery('#list-videos-mosaic-post-limit-rows-3').val(), 'list-videos-mosaic-post-limit-rows-3-slider', 'list-videos-mosaic-post-limit-rows-3');
            tsz_slider_pips(5, 100, 5, jQuery('#list-videos-mosaic-post-limit-rows-squares').val(), 'list-videos-mosaic-post-limit-rows-squares-slider', 'list-videos-mosaic-post-limit-rows-squares');

            break;

            case 'list-galleries':

            tsz_multiple_select();

            tsz_mosaic_screen_layout();

            custom_selectors_run();

            tsz_slider_pips(6, 102, 6, jQuery('#list-galleries-mosaic-post-limit-rows-2').val(), 'list-galleries-mosaic-post-limit-rows-2-slider', 'list-galleries-mosaic-post-limit-rows-2');
            tsz_slider_pips(9, 99, 9, jQuery('#list-galleries-mosaic-post-limit-rows-3').val(), 'list-galleries-mosaic-post-limit-rows-3-slider', 'list-galleries-mosaic-post-limit-rows-3');
            tsz_slider_pips(5, 100, 5, jQuery('#list-galleries-mosaic-post-limit-rows-squares').val(), 'list-galleries-mosaic-post-limit-rows-squares-slider', 'list-galleries-mosaic-post-limit-rows-squares');

            break;

        case 'list-portfolios':

            tsz_multiple_select();

            tsz_mosaic_screen_layout();

            custom_selectors_run();

            tsz_slider_pips(6, 102, 6, jQuery('#list-portfolios-mosaic-post-limit-rows-2').val(), 'list-portfolios-mosaic-post-limit-rows-2-slider', 'list-portfolios-mosaic-post-limit-rows-2');
            tsz_slider_pips(9, 99, 9, jQuery('#list-portfolios-mosaic-post-limit-rows-3').val(), 'list-portfolios-mosaic-post-limit-rows-3-slider', 'list-portfolios-mosaic-post-limit-rows-3');
            tsz_slider_pips(5, 100, 5, jQuery('#list-portfolios-mosaic-post-limit-rows-squares').val(), 'list-portfolios-mosaic-post-limit-rows-squares-slider', 'list-portfolios-mosaic-post-limit-rows-squares');

            break;
        case 'list-products':
            tsz_multiple_select();

            custom_selectors_run();

        break;

        case 'events':

            tsz_multiple_select();

            break;

        case 'pricing-tables':

            tsz_multiple_select();

            custom_selectors_run();

            tsz_screen_animation_delay();

            break;

        case 'teams':

            tsz_multiple_select();

            custom_selectors_run();

            tsz_screen_animation_delay();

            break;

        case 'testimonials':

            custom_selectors_run();

            tsz_repopulate_element('testimonials', new Array('id','image','name','text','company','url'));

            break;

        case 'delimiter':

            tsz_restart_color_picker();

            break;

        case 'title':

            tsz_restart_color_picker();

            tsz_screen_animation_delay();

            custom_selectors_run();

            tsz_slider_pips(-10, 15, 1, jQuery('#title-letter-spacing').val(), 'title-letter-spacing-slider', 'title-letter-spacing');

            break;

        case 'video':

            if( jQuery('#video-lightbox').val() == 'n' ){
                jQuery('.ts-video-title').css('display', 'none');
            }else{
                jQuery('.ts-video-title').css('display', '');
            }

            break;

        case 'image':

            tsz_screen_animation_delay();

            tsz_upload_files('#select_image', '#image_media_id', '#image_url', 'Insert image', '#image_preview', 'image');

            break;

        case 'instance':

            tsz_upload_files('#select_image', '#image_media_id', '#instance-image-url', 'Insert image', '#image_preview', 'image');

            break;

        case 'buttons':

            tsz_restart_color_picker();

            tsz_screen_animation_delay();

            custom_selectors_run();

            tsz_buttons_display_mode('button');

            break;

        case 'contact-form':

            tsz_repopulate_element('contact-form', new Array('id','title','type','require','options'));

            jQuery('.contact-form-type').each(function(){
                if( jQuery(this).val() == 'select' ){
                    jQuery(this).parent().parent().parent().find('.contact-form-options').css('display','');
                }else{
                    jQuery(this).parent().parent().parent().find('.contact-form-options').css('display','none');
                }
            });

            break;

        case 'featured-area':

            if( jQuery('#featured-area-custom-post').val() == 'video' ){
                jQuery('.featured-area-video').css('display','');
            }else if( jQuery('#featured-area-custom-post').val() == 'ts-gallery' ){
                jQuery('.featured-area-ts-gallery').css('display','');
            }else if( jQuery('#featured-area-custom-post').val() == 'post' ){
                jQuery('.featured-area-post').css('display','');
            }

            tsz_multiple_select();

            break;

        case 'icon':

            custom_selectors_run();

            tsz_restart_color_picker();

            break;

        case 'listed-features':

            tsz_repopulate_element('listed-features', new Array('id','icon','title','text','iconcolor','bordercolor','backgroundcolor','url'));

            custom_selectors_run();

            break;

        case 'features-block':

            tsz_repopulate_element('features-block', new Array('id','icon','title','text','url','background','font', 'effect', 'delay'));

            custom_selectors_run();

            tsz_screen_animation_delay();

            break;

        case 'counters':

            if( jQuery('#counters-track-bar').val() == 'with-track-bar' ){
                jQuery('.ts-counters-track-bar-color').css('display', '');
                jQuery('.ts-counters-icons').css('display', 'none');
            }else{
                jQuery('.ts-counters-track-bar-color').css('display', 'none');
                jQuery('.ts-counters-icons').css('display', '');
            }

            custom_selectors_run();

            tsz_screen_animation_delay();

            tsz_restart_color_picker();

            break;

        case 'clients':

            custom_selectors_run();

            tsz_repopulate_element('clients', new Array('id','image','title','url'));

            break;

        case 'map':

            setTimeout(function(){
                initialize();
            }, 300);

            tsz_upload_files('#map-marker-select-image', '#map-marker-media-id', '#map-marker-attachment', 'Choose image', '#map-marker-image-preview','image');

            break;

        case 'banner':

            tsz_restart_color_picker();

            tsz_upload_files('#select_banner_image','#banner_image_media_id','#image-banner-url','Choose image','#banner_image_preview','image');

            break;

        case 'tab':

            tsz_repopulate_element('tab', new Array('id','title','text'));

            break;

        case 'ribbon':

            tsz_restart_color_picker();

            custom_selectors_run();

            tsz_upload_files('#ribbon-select-image', '#ribbon-media-id', '#ribbon-attachment', 'Choose image', '#ribbon-image-preview','image');

            tsz_buttons_display_mode('ribbon-button');

            break;

        case 'timeline':

            tsz_repopulate_element('timeline', new Array('id','title','text','align','image', 'effect', 'delay'));

            break;

        case 'video-carousel':

            tsz_repopulate_element('video-carousel', new Array('id','title','text','url','embed'));

            if( jQuery("#video-carousel-source").val() == "custom-slides" ){
                jQuery(".ts-video-carousel-custom").css("display", "");
            }else{
                jQuery(".ts-video-carousel-custom").css("display", "none");
            }

            break;

        case 'grease-slider':

            if( jQuery("#grease-slider-source").val() == "custom-slides" ){
                jQuery(".ts-grease-slider-custom").css("display", "");
            }else{
                jQuery(".ts-grease-slider-custom").css("display", "none");
            }

            break;

        case 'gallery':

            tsz_gallery_logics();
            gallery_element_image_sizes();
            jQuery('#gallery_layout').trigger('change');
            break;

        case 'elastic-slider':

            if( jQuery("#elastic-slider-source").val() == "custom-slides" ){
                jQuery(".ts-elastic-slider-custom").css("display", "");
            }else{
                jQuery(".ts-elastic-slider-custom").css("display", "none");
            }

            break;

        case 'powerlink':

            tsz_upload_files('#select_powerlink_image', '#powerlink_image_media_id', '#image-powerlink-url', 'Insert banner', '#powerlink-image-preview', 'image');

            break;

        case 'alert':

            tsz_restart_color_picker();

            custom_selectors_run();

            break;

        case 'skills':

            tsz_restart_color_picker();

            custom_selectors_run();

            tsz_repopulate_element('skills', new Array('id','title','percentage','color'));

            break;

        case 'chart':

            tsz_restart_color_picker();

            tsz_repopulate_element('chart_line', new Array('id','title','fillColor','strokeColor','pointColor','pointStrokeColor','pointHighlightFill','pointHighlightStroke','data'));
            tsz_repopulate_element('chart_pie', new Array('id','title','value','color','highlight'));

            if( jQuery('#chart-mode').val() == 'pie' ){
                jQuery('.chart-line-options').css('display', 'none');
                jQuery('.chart-pie-options').css('display', '');
            }else{
                jQuery('.chart-line-options').css('display', '');
                jQuery('.chart-pie-options').css('display', 'none');
            }

            break;

        case 'text':

            tsz_screen_animation_delay();

            break;

        case 'boca':
        case 'nona':

            if( jQuery('#'+ elementType +'-custom-post').val() == 'video' ){
                jQuery('.'+ elementType +'-video').css('display','');
            }else if( jQuery('#'+ elementType +'-custom-post').val() == 'ts-gallery' ){
                jQuery('.'+ elementType +'-ts-gallery').css('display','');
            }else if( jQuery('#'+ elementType +'-custom-post').val() == 'post' ){
                jQuery('.'+ elementType +'-post').css('display','');
            }

            tsz_multiple_select();

            break;

        default:

            break;
    }

    return;
}

function tsz_multiple_select(){
    jQuery('.ts-custom-select-input').each(function(){
        var select_placeholder = jQuery(this).attr('data-placeholder');
        jQuery(this).css({'width':'380px'}).select2({
            placeholder : select_placeholder,
            allowClear: true
        });
    });
}

function tsz_mosaic_screen_layout(){
    jQuery('.ts-mosaic-layout').each(function(){
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
            jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-2').css('display', 'none');
            jQuery(this).closest('table').find('.ts-mosaic-post-limit-rows-3').css('display', 'none');
            jQuery(this).closest('table').find('.ts-mosaic-rows').closest('tr').css('display', 'none');
        }
    });
}

jQuery(document).on('change', '#menu-custom', function(e){
    if ( jQuery(this).val() == 'y' ) {
        jQuery('.menu-custom-colors').removeClass('hidden');
    } else{
        jQuery('.menu-custom-colors').addClass('hidden');
    }
});

jQuery(document).on('change', 'select.ts-custom-select-input', function(){

    value = jQuery(this).val();

    if( typeof(value) == null || typeof(value) == 'undefined' || jQuery.isEmptyObject(value) ) return;

    if( value.indexOf('0') >= 0 ){

        var id = jQuery(this).parent().find("div[class*='select2-container']").attr('id').replace('s2id_', ''),
            element = jQuery('#' + id);

        var selected = [];
        element.find("option[value!='0']").each(function(i, e){
            selected[selected.length] = jQuery(e).attr('value');
        });

        element.select2('val', selected);
        jQuery(this).find('option[value="0"]').hide();

    }

});

//show select category by custom post type in element latest custom posts
jQuery(document).on('change', '#latest-custom-posts-type', function(e){

    var arrayValues = jQuery(this).val();
    jQuery(this).find('option').each(function(){
        jQuery('#ts-block-category-' + jQuery(this).attr('value')).addClass('hidden');
    });

    for(key in arrayValues){
        jQuery('#ts-block-category-' + arrayValues[key]).removeClass('hidden');
    }
});

function tsz_repopulate_element(element_name, items_array){

    list_items = jQuery.parseJSON(jQuery('#' + element_name + '_content').val());

    if (list_items != '') {
        name_blocks_template = jQuery('#' + element_name + '_items_template').html();

        var json_to_array = '';

        jQuery(list_items).each(function(index, value){

            li_content = '';
            var li_appended = false;

            if ( value != '' ) {

                var elemId = '';
                for(var i in value){

                    if( i == 'id' ){
                        var elemId = value[i];
                        if (li_appended == false) {
                            li_content = name_blocks_template.replace(/{{item-id}}/g, elemId);
                            jQuery('#' + element_name + '_items').append(li_content);
                        }
                        li_appended = true;
                    }

                    if( i == 'icon' ){
                        var elemIcon = value[i];
                    }

                    if( i == 'title' ){

                        var title = value[i].replace(/--quote--/g, '"');
                        jQuery('#' + element_name + '_items li:last-child').find('.ts-multiple-item-tab').html('Item: ' + title);

                        if( elemIcon ){
                            jQuery('#' + element_name + '-' + elemId + '-icon').find('option[value="' + elemIcon + '"]').attr('selected','selected');
                        }
                    }

                    if( i == 'name' ){
                        var name = value[i];
                        jQuery('#' + element_name + '_items li:last').find('.ts-multiple-item-tab').html('Item: ' + name);
                    }

                    if( i == 'image' ){
                        var img = jQuery("<img>").attr('src', value[i]).attr('style', 'width:400px');
                        jQuery('#image-preview-' + elemId).html(img);

                    }

                    if( i == 'percentage' && element_name == 'skills' ) tsz_slider_pips(0, 100, 1, value[i], 'skills-' + elemId + '-percentage-slider', 'skills-' + elemId + '-percentage');

                    jQuery('#' + element_name + '-' + elemId + '-' + i).val(value[i].replace(/--quote--/g, '"').replace(/<br \/>/g, '\n'));

                    if( elemIcon ){

                        jQuery('div.' + element_name + '.builder-element .builder-icon-list').each(function(){

                            this_id = '#' + jQuery(this).attr('id') + ' li i';

                            jQuery('div.' + element_name + '.builder-element .builder-icon-list li i').click(function(){
                                targetselect = jQuery(this).parent().parent().attr('data-selector');
                                custom_selectors(jQuery(this), targetselect);
                            });

                        });
                    }

                }

                tsz_upload_files('#uploader_' + elemId, '#slide_media_id-' + elemId, '#' + element_name + '-' + elemId + '-image', 'Insert image', '#image-preview-' + elemId, 'image');

                if(element_name == 'listed-features'){
                    tsz_listed_features_style_color();
                }

            }
            tsz_restart_color_picker();
        });
    };

    var name_block_items = jQuery('#' + element_name + '_items > li').length;

    jQuery('#' + element_name + '_items').sortable();
    
}

function tsz_show_post_exclude_first(name_element, mode_display_name){

    jQuery('#' + name_element + '-mosaic-scroll').change(function(){
        if( jQuery(this).val() == 'y' ){
            jQuery('.class-' + name_element + '-mosaic-pagination').css('display', 'none');
        }else{
           jQuery('.class-' + name_element + '-mosaic-pagination').css('display', '');
        }
    });

    if( jQuery('#' + name_element + '-mosaic-scroll').val() == 'y' ){
        jQuery('.class-' + name_element + '-mosaic-pagination').css('display', 'none');
    }else{
       jQuery('.class-' + name_element + '-mosaic-pagination').css('display', '');
    }

    if( name_element == 'last-posts' && mode_display_name == 'mosaic' ){
        jQuery('#last-posts-mosaic-scroll').change(function(){
            if( jQuery(this).val() == 'y' ){
                jQuery('.last-posts-mosaic-pagination').css('display', 'none');
            }else{
               jQuery('.last-posts-mosaic-pagination').css('display', '');
            }
        });

        if( jQuery('#last-posts-mosaic-scroll').val() == 'y' ){
            jQuery('.last-posts-mosaic-pagination').css('display', 'none');
        }else{
           jQuery('.last-posts-mosaic-pagination').css('display', '');
        }
    }

    jQuery('#' + name_element + '-' + mode_display_name + '-behavior').change(function(){
        if( jQuery(this).val() == 'carousel' || jQuery(this).val() == 'scroll' || jQuery(this).val() == 'tabbed' ){
            jQuery('.' + name_element + '-' + mode_display_name + '-pagination').css('display','none');
        }else{
            jQuery('.' + name_element + '-' + mode_display_name + '-pagination').css('display','');
        }
    });

    jQuery('#' + name_element + '-' + mode_display_name + '-behavior-selector').click(function(){

       if( jQuery('#' + name_element + '-' + mode_display_name + '-behavior').val() == 'carousel' || jQuery('#' + name_element + '-' + mode_display_name + '-behavior').val() == 'scroll' || jQuery('#' + name_element + '-' + mode_display_name + '-behavior').val() == 'tabbed' ){
            jQuery('.' + name_element + '-' + mode_display_name + '-pagination').css('display','none');
       }else{
          jQuery('.' + name_element + '-' + mode_display_name + '-pagination').css('display','');
       }

    });

    if( jQuery('#' + name_element + '-' + mode_display_name + '-behavior').val() == 'carousel' || jQuery('#' + name_element + '-' + mode_display_name + '-behavior').val() == 'scroll' || jQuery('#' + name_element + '-' + mode_display_name + '-behavior').val() == 'tabbed' ){
         jQuery('.' + name_element + '-' + mode_display_name + '-pagination').css('display','none');
    }else{
       jQuery('.' + name_element + '-' + mode_display_name + '-pagination').css('display','');
    }

    jQuery('#' + name_element + '-' + mode_display_name + '-pagination').change(function(){
        if( jQuery(this).val() == 'y' ){
            jQuery('.' + name_element + '-exclude').css('display','none');
        }else{
            jQuery('.' + name_element + '-exclude').css('display','');
        }
    });

    if( jQuery('#' + name_element + '-' + mode_display_name + '-pagination').val() == 'y' ){
        jQuery('.' + name_element + '-exclude').css('display','none');
    }else{
       jQuery('.' + name_element + '-exclude').css('display','');
    }

    jQuery('#' + name_element + '-big-post-carousel').change(function(){
        if( jQuery(this).val() == 'y' ){
            jQuery('.' + name_element + '-big-post-pagination').css('display','none');
        }else{
            jQuery('.' + name_element + '-big-post-pagination').css('display','');
        }
    });

    jQuery('#' + name_element + '-big-post-behavior-selector').click(function(){
       if( jQuery('#' + name_element + '-big-post-carousel').val() == 'y' ){
            jQuery('.' + name_element + '-big-post-pagination').css('display','none');
       }else{
          jQuery('.' + name_element + '-big-post-pagination').css('display','');
       }
    });

    if( jQuery('#' + name_element + '-big-post-carousel').val() == 'y' ){
         jQuery('.' + name_element + '-big-post-pagination').css('display','none');
    }else{
       jQuery('.' + name_element + '-big-post-pagination').css('display','');
    }
}

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

function gallery_element_image_sizes(){
    // Fill image size inputs with defaults
    jQuery('#gallery_layout').change(function(e) {
        var $this = jQuery(this);
        if( $this.val() == 'gallery-horizontal-scroll' ) {
            var value = jQuery('#gallery_size_horizontal_scroll_h').val(),
                $elem = jQuery('#gallery_custom_height');

            if( $elem.val().length <= 0 ) {
                $elem.val(value);
            }

        } else if( $this.val() == 'gallery-carousel' ) {
            var value = jQuery('#gallery_size_carousel_h').val(),
                $elem = jQuery('#gallery_custom_height')

            if( $elem.val().length <= 0 ) {
                $elem.val(value);
            }

        } else if( $this.val() == 'gallery-fade-flip' ) {

            var value_h = jQuery('#gallery_size_fade_flip_h').val();
            var value_w = jQuery('#gallery_size_fade_flip_w').val();

            if( jQuery('#gallery_custom_height').val().length <= 0 ) {
                jQuery('#gallery_custom_height').val(value_h);
            }
            if( jQuery('#gallery_custom_width').val().length <= 0 ) {
                jQuery('#gallery_custom_width').val(value_w);
            }

        }
    });

}

function tsz_gallery_logics(){
        tsz_logic_exclude({
            mode : 'display_if',
            element : '#gallery_layout',
            allowed_values : ['gallery-list', 'gallery-grid'],
            target: '#gallery_scroll_effect_row',
            trigger: 'change',
        });

        /* Display items-per-row select only when Grid or Fade-flip gallery styles are selected */
        tsz_logic_exclude({
            mode : 'display_if',
            element : '#gallery_layout',
            allowed_values : ['gallery-fade-flip', 'gallery-grid'],
            target: '#gallery_items_per_row_row',
            trigger: 'change',
        });
        /* Grid gallery behavior display only if Grid style selected */
        tsz_logic_exclude({
            mode : 'display_if',
            element : '#gallery_layout',
            allowed_values : ['gallery-grid'],
            target: '#grid_gallery_behavior_row',
            trigger: 'change',
        });

        /* Display custom height if horizontal scroll or carousel, or fade-flip selected */

        tsz_logic_exclude({
            mode: 'display_if',
            element: '#gallery_layout',
            allowed_values: ['gallery-horizontal-scroll', 'gallery-carousel', 'gallery-fade-flip'],
            target: '#gallery_custom_sizes',
            trigger: 'change',
        });

        tsz_logic_exclude({
            mode: 'display_if',
            element: '#gallery_layout',
            allowed_values: ['gallery-horizontal-scroll', 'gallery-carousel', 'gallery-fade-flip'],
            target: '#gallery_custom_height_row',
            trigger: 'change',
        });

        tsz_logic_exclude({
            mode: 'display_if',
            element: '#gallery_layout',
            allowed_values: ['gallery-fade-flip', ],
            target: '#gallery_custom_width_row',
            trigger: 'change',
        });

        tsz_logic_exclude({
            mode: 'display_if',
            element: '#gallery_layout',
            allowed_values: ['gallery-fullscreen'],
            target: '#fullscreen-gallery-advice',
            trigger: 'change',
        })
}

//show/hide the option 'Background color' end 'Border color' in element 'Button'&'ribbon banner' depending of option 'Choose your mode to display:'
function tsz_buttons_display_mode(element_name){
    var option_display_mode = jQuery('#' + element_name + '-mode-display');
    jQuery(option_display_mode).change(function(){
        if( jQuery(this).val() === 'background-button' ){
            jQuery('.' + element_name + '-border-color').css('display', 'none');
            jQuery('.' + element_name + '-background-color').css('display', '');
        }else{
            jQuery('.' + element_name + '-background-color').css('display', 'none');
            jQuery('.' + element_name + '-border-color').css('display', '');
        }
    });

    if( jQuery(option_display_mode).val() === 'background-button' ){
        jQuery('.' + element_name + '-border-color').css('display', 'none');
        jQuery('.' + element_name + '-background-color').css('display', '');
    }else{
        jQuery('.' + element_name + '-background-color').css('display', 'none');
        jQuery('.' + element_name + '-border-color').css('display', '');
    }
}

function element_icon (element) {

    var icon_class = 'icon-empty';

    switch (element) {

        case 'logo':
            icon_class = 'icon-logo';
            break;

        case 'featured-article':
            icon_class = 'icon-featured-article';
            break;

        case 'cart':
            icon_class = 'icon-basket';
            break;

        case 'breadcrumbs':
            icon_class = 'icon-code';
            break;

        case 'social-buttons':
            icon_class = 'icon-social';
            break;

        case 'searchbox':
            icon_class = 'icon-search';
            break;

        case 'menu':
            icon_class = 'icon-menu';
            break;

        case 'menu':
            icon_class = 'icon-menu';
            break;

        case 'sidebar':
            icon_class = 'icon-sidebar';
            break;

        case 'slider':
            icon_class = 'icon-desktop';
            break;

        case 'list-portfolios':
            icon_class = 'icon-briefcase';
            break;

        case 'list-products':
            icon_class = 'icon-basket';
            break;

        case 'instance':
            icon_class = 'icon-analysis';
            break;

        case 'pricing-tables':
            icon_class = 'icon-dollar';
            break;

        case 'testimonials':
            icon_class = 'icon-comments';
            break;

        case 'tab':
            icon_class = 'icon-tabs';
            break;

        case 'video-carousel':
            icon_class = 'icon-coverflow';
            break;

        case 'grease-slider':
            icon_class = 'icon-empty';
            break;

        case 'elastic-slider':
            icon_class = 'icon-empty';
            break;

        case 'count-down':
            icon_class = 'icon-megaphone';
            break;

        case 'clients':
            icon_class = 'icon-clients';
            break;

        case 'counters':
            icon_class = 'icon-time';
            break;

        case 'facebook-block':
            icon_class = 'icon-facebook';
            break;

        case 'last-posts':
            icon_class = 'icon-view-mode';
            break;

        case 'list-galleries':
            icon_class = 'icon-gallery';
            break;

        case 'latest-custom-posts':
            icon_class = 'icon-window';
            break;

        case 'accordion':
            icon_class = 'icon-clipboard';
            break;

        case 'callaction':
            icon_class = 'icon-direction';
            break;

        case 'teams':
            icon_class = 'icon-team';
            break;

        case 'advertising':
            icon_class = 'icon-money';
            break;

        case 'empty':
            icon_class = 'icon-empty';
            break;

        case 'features-block':
            icon_class = 'icon-tick';
            break;

        case 'delimiter':
            icon_class = 'icon-delimiter';
            break;

        case 'title':
            icon_class = 'icon-font';
            break;

        case 'filters':
            icon_class = 'icon-filter';
            break;

        case 'page':
            icon_class = 'icon-post';
            break;

        case 'post':
            icon_class = 'icon-post';
            break;

        case 'feature-blocks':
            icon_class = 'icon-tick';
            break;

        case 'spacer':
            icon_class = 'icon-resize-vertical';
            break;

        case 'image':
            icon_class = 'icon-image';
            break;

        case 'video':
            icon_class = 'icon-movie';
            break;

        case 'buttons':
            icon_class = 'icon-button';
            break;

        case 'ribbon':
            icon_class = 'icon-ribbon';
            break;

        case 'contact-form':
            icon_class = 'icon-mail';
            break;

        case 'featured-area':
            icon_class = 'icon-featured-area';
            break;

        case 'shortcodes':
            icon_class = 'icon-code';
            break;

        case 'listed-features':
            icon_class = 'icon-list';
            break;

        case 'text':
            icon_class = 'icon-text';
            break;

        case 'image-carousel':
            icon_class = 'icon-coverflow';
            break;

        case 'icon':
            icon_class = 'icon-flag';
            break;

        case 'map':
            icon_class = 'icon-pin';
            break;

        case 'banner':
            icon_class = 'icon-link-ext';
            break;

        case 'toggle':
            icon_class = 'icon-resize-full';
            break;

        case 'timeline':
            icon_class = 'icon-parallel';
            break;

        case 'list-videos':
            icon_class = 'icon-movie';
            break;

        case 'powerlink':
            icon_class = 'icon-ticket';
            break;

        case 'calendar':
            icon_class = 'icon-calendar';
            break;

        case 'events':
            icon_class = 'icon-text';
            break;

        case 'alert':
            icon_class = 'icon-attention';
            break;

        case 'skills':
            icon_class = 'icon-pencil-alt';
            break;

        case 'boca':
            icon_class = 'icon-empty';
            break;

        case 'nona':
            icon_class = 'icon-empty';
            break;

        case 'chart':
            icon_class = 'icon-chart';
            break;

        case 'gallery':
            icon_class = 'icon-gallery';
            break;

        default:
            icon_class = 'icon-empty';
            break;
    }

    return icon_class;
}

jQuery(document).on('click', '.ts-tab-elements li', function(){
    var categoryTab = jQuery(this).attr('data-ts-tab');
    jQuery('.ts-tab-elements li.selected').removeClass('selected');
    jQuery(this).addClass('selected');

    jQuery('.builder-element-array li').each(function(){

        if( jQuery(this).attr('data-ts-tab-element') == categoryTab ){
            jQuery(this).css('display', '');
        }else{
            jQuery(this).css('display', 'none');
        }

        if( categoryTab == 'ts-all-tab' ){
            jQuery(this).css('display', '');
        }

    });
});

jQuery(document).on('click', '.ts-change-element', function(e){
    e.preventDefault();

    jQuery( '.tsz-text-editor-modal' ).css( 'display', 'none' );

    jQuery('#ts-builder-elements-modal, .ts-all-elements .modal-header').find('.close').trigger('click');

    setTimeout(function(){
        jQuery('.ts-all-elements').removeClass('ts-is-hidden');
    }, 900);
});