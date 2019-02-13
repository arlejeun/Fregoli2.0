(function($) {
    $(function() {
        var dlg = $("<div><i class='custom-alert-icon fa fa-warning fa-fw fa-2x' aria-hidden='true' style='float: left; margin: 0 10px 24px 0'></i><div style='display: table-cell; font-family: Tahoma, Arial; font-size: 10pt'></div></div>");
        dlg.dialog({
            autoOpen: false,
            modal: true,
            title: $.siteData && $.siteData.appTitle || 'Fregoli',
            width: 400,
            buttons: {
                OK: function() {
                    $(this).dialog('close');
                }
            },
            create: function (event) {
                $(event.target).parent().css('position', 'fixed'); 
            }
        });
        $.alert = function(s) {
            var message;
            var type = 'info';
            if ($.isPlainObject(s)) {
                message = s.message;
                type = s.type || type;
            } else {
                message = s;
            }
            var icon = dlg.find('i:first');
            if (type === 'warn') {
                icon.addClass('fa-warning').removeClass('fa-info-circle');
            } else {
                icon.addClass('fa-info-circle').removeClass('fa-warning');
            }
            dlg.find('div').text(message);
            dlg.dialog('open');
        };
        $.alertHtml = function(s) {
            dlg.find('div').html(s);
            dlg.dialog('open');
        };
    });

    window.displayAjaxError = function(xhr) {
        var msg = 'A server communication error occured. Server returns response code ' + xhr.status + ': ' + xhr.statusText;
        if ($.alert) {
            $.alert(msg);
        } else {
            alert(msg);
        }
    }

    var processingDiv;

    $.processing = function(method, options) {
        var defaults = {
            text: 'Processing...'
        };
        var settings = $.extend(defaults, options);
        var methods = {
            show: function(opts) {
                var defaults = {
                    delay: 1000
                };
                var options = $.extend(defaults, opts);
                if (processingDiv == null) {
                    var img = $.siteData.siteRoot + '/images/loading-big.gif';
                    processingDiv = $("<div class='processing ui-dialog ui-widgrt ui-widget-content ui-corner-all ui-front'><img src='" + img + "' /><span></span></div>");
                }
                processingDiv.find('span').text(settings.text);
                $.blockUI({ css: { border: 'none' }, message: processingDiv, fadeIn: options.delay });
            },
            hide: function() {
                $.unblockUI();
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' + method + ' does not exist');
            return null;
        }
    };
})(jQuery);
