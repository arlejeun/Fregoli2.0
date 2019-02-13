(function($) {
    var defaults = {
        searchForm: null,
        callback: null
    };

    var options = defaults;
    
    var methods = {
        init: function(opts) {
            options = $.extend({}, defaults, opts);
            if (!options.searchForm) {
                return;
            }

            $(options.searchForm).submit(function() {
                if ($.isFunction(options.callback)) {
                    if (options.callback($('input[type=text]', options.searchForm).val())) {
                        return false;
                    }
                }
                return true;
            });
            $('a', options.searchForm).click(function() {
                $(this).closest('form').submit();
                return false;
            });
        },
        
        callback: function(c) {
            options.callback = c;
        }
    };
    
    $.search = function(method) {
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' not implemented');
        }        
    };

    $(function() {
        $.search({ searchForm: $('form#search') });
    });
})(jQuery);
