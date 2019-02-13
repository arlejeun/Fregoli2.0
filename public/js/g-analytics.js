
var _gAnalytics = (function(){
    
    var _event = function(category, action, label){
        if (typeof ga == 'undefined') return;
        var params = {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label
        };
        ga('send', params);
    };
    
    var _page = function(){
        if (typeof ga == 'undefined') return;
        ga('set', 'page', '/home' + location.hash);
        ga('send', 'pageview');
    };
    
    return {
        event: _event,
        page: _page
    };
})();




