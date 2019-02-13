(function($) {
    var imageUrl = $.siteData.siteRoot + '/css/images/ui-bg_flat_0_aaaaaa_40x100.png';
    $.extend($.blockUI.defaults, {
        // .ui-widget-overlay
        overlayCSS: {
            background: '#aaaaaa url(' + imageUrl + ') 50% 50% repeat-x',
            opacity: .30,
            filter: 'Alpha(Opacity=30)'
        },
        fadeOut: 0
    });
})(jQuery);