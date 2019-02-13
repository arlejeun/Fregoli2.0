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
        ac('record', 'button.clicked', 'get-quotes', {}); 

            // Submit claim task
        var data  = {
            "Demo-PFS_Mobile-Common-Subject": "Get Quotes",
            date: new Date(Date.now()).toLocaleString(),
            details: "Customer request",
            reason: params.reason || '',
            subject: "Get quotes",
            product: "Order",
            comment: params.comment || ''
        };
        
        if (typeof $.siteData.settings.url3 == 'string' && !!$.siteData.settings.url3) {
            data["--kvp--url3"] = $.siteData.settings.url3;
            data["--kvp--viewname3"] = $.siteData.settings.viewname3;
        }

        demoProcess.submitTask(data);
        }

    function submitClaim(params) {

    
            // Submit claim task
        var data  = {
            "Demo-PFS_Mobile-Common-Subject": "New claim",
            date: new Date(Date.now()).toLocaleString(),
            details: "Customer reported",
            reason: params.reason || '',
            subject: "New claim",
            product: "Order",
            comment: params.comment || ''
        };

        
        demoProcess.submitTask(data);
        
            // Journey state update
        var stateInfo = {
            service: "Claim",
            state: "Case Opened",
            comment: "Car Accident",
            details: "Claim No. 31897598",
            media: "workitem"           
        };    
        
        var story = $.siteData.story;
        try {
            stateInfo.state_actions = story.resources["cs-services"][stateInfo.service][stateInfo.state]["state-actions"];
        }
        catch (e){
            console.log('[FR] No post actions for CMS state ' + stateInfo.service+'/ '+stateInfo.state);
        }
        
        if (story && story.resources["cs-services"][stateInfo.service] && story.resources["cs-services"][stateInfo.service])
        
        data  = {
            action: "cms",
            media_type: "workitem",
            queue: "Customer_Story.default.StoryPostQueue",
            PFS_id: $.siteData.customer["customer.customer_phone"],
            sw_cs_action: JSON.stringify(stateInfo) // for V2 Story strategy
        };
            
        demoProcess.submitInteraction(data);
        //alert('submitClaim ' + JSON.stringify(params));
    }

    function submitSurvey(params) {
        demoProcess.submitSurvey(params);
        //alert('submitSurvey' + JSON.stringify(params));
    }
    
    if (demoProcess.getParameterByName("demoid") === 'icarus') {
        $("<link/>", {
           rel: "stylesheet",
           type: "text/css",
           href: "css/icarus.css"
        }).appendTo("head");        
    }
    
})(jQuery, ko);
