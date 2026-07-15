/* Load more button */
(function($) {

    $.loadmoreButton = function(element, options) {

        var defaults = {
            loaderClass: '.loader',
            prepend: false,
            infiniteScroll: true,
        }

        var plugin = this;

        var loader = '<div class="loader" />';

        plugin.settings = {}

        var $element = jQuery(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.appendLoader();
        }

        plugin.appendLoader = function(){

        	$element.addClass('visible-spinner');

        	if( plugin.settings.prepend == false ) {
            	$element.append(loader);
        	} else {
        		$element.prepend(loader);
        	}
        }

        plugin.removeLoader = function() {
        	$element.removeClass('visible-spinner');
            $element.find(plugin.settings.loaderClass).remove();
        }

        plugin.init();

        $element.click(function(){
        	plugin.appendLoader();
            if( plugin.settings.infiniteScroll == false ){
            	jQuery('#ts-loading-preload').hide();
            }        	
        });
    }

    $.fn.loadmoreButton = function(options) {
        return this.each(function() {
            if (undefined == jQuery(this).data('loadmoreButton')) {
                var plugin = new $.loadmoreButton(this, options);
                jQuery(this).data('loadmoreButton', plugin);
            }
        });
    }
})(jQuery);
