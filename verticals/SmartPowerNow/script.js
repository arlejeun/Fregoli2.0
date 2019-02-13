(function($, ko) {
    $.siteData = $.extend($.siteData, {
        callbacks: {
            submitClaim: submitClaim,
            initPurchase: initPurchase,
            submitPurchase: submitPurchase,
            submitSurvey: submitSurvey,
        }
    });

    function initPurchase(params) {
        var textField = this.findField('text');
        // INIT SAMPLE textField.value('Init from script');
        //params.form.css('background', 'green');
    }

    function submitPurchase(params) {
        alert('submitPurchase' + JSON.stringify(params));
    }

    function submitClaim(params) {
        
        ac('record', 'button.clicked', 'outage-report', {}); 
            // Submit claim task
        var data  = {
            "Demo-PFS_Mobile-Common-Subject": "Outage report",
            date: new Date(Date.now()).toLocaleString(),
            details: "Customer reported",
            reason: params.reason || '',
            subject: "Outage report",
            product: "Order",
            comment: params.comment || ''
        };
        
        if (typeof $.siteData.settings.url3 == 'string' && !!$.siteData.settings.url3) {
            data["--kvp--url3"] = $.siteData.settings.url3;
            data["--kvp--viewname3"] = $.siteData.settings.viewname3;
        }
        demoProcess.submitTask(data);
        
    }

    function submitSurvey(params) {
        demoProcess.submitSurvey(params);
        //alert('submitSurvey' + JSON.stringify(params));
    }
})(jQuery, ko);

var onChatStart = function(){
    let subj = $("#cx_webchat_form_subject").val();
    console.log('[CXW] Chat Subject: ', subj);
    if (subj.toLowerCase().indexOf('payment') >= 0){
        demoProcess.updateJourney('Billing', 'Pay bill question', 'Web Chat', null, 5, 'chat');
    }
};

var startSolarChat = function(){
    $.siteData.settings.Subject = "Solar +K";
    widgetCX.startChat({
        bot_cxw_auth_key: "c528dff1c7271774bbaf036e228ae0e49c2e5e0740ac49cb90bfd9f097290abc",
        GAAP_SiteID: "780",
        occasion: "SolarLead"
    });
}