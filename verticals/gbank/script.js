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
        //var textField = this.findField('text');
        //textField.value('Init from script');
        //params.form.css('background', 'green');
        $.ajax({
            type: "POST",
            url: URL,
            data: JSON.stringify(params),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            mimeType: 'application/json',
            success: function(returndata, textStatus, jqXHR) {                       
               if (jqXHR.status == 204) {
                    location.hash = ''; // go home 
                    _infoAlert("Thank you!  Your survey feedback has been submitted.")  
               } else{
                    _warningAlert('<p>An Error occured: ' + jqXHR.responseText + '</p>');
               }                        
            },
         });
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
