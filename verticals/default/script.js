(function($, ko) {
    $.siteData = $.extend($.siteData, {
        callbacks: {
            submitClaim: submitClaim,
            initPurchase: initPurchase,
            submitPurchase: submitPurchase,
            submitSurvey: submitSurvey
        }
    });

    function initPurchase(params) {
        var textField = this.findField('text');
        textField.value('Init from script');
        //params.form.css('background', 'green');
    }

    function submitClaim(params) {
        alert('submitClaim ' + JSON.stringify(params));
    }

    function submitPurchase(params) {
        alert('submitPurchase' + JSON.stringify(params));
    }

    function submitSurvey(params) {
        alert('submitSurvey' + JSON.stringify(params));
    }
})(jQuery, ko);
