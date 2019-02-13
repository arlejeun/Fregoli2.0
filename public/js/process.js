
var demoProcess = function($){
    
    var _isPopupOnTimer = false,
        _recentState = '',
        _recentService = '';
    
    $(window).on("hashchange", function(){
        
        // proactive invite
        if(! _isPopupOnTimer && $.siteData.authenticated && location.hash == "#contactus") {
            _isPopupOnTimer = true;
            setTimeout(function(){
                if($.siteData.authenticated && location.hash == "#contactus") {
                    widgetCX.invitePopup()
                }
                demoProcess.clearTimerFlag();
            }, 7000);
        }
    });
    
    $(document).ready(function(){
        demoProcess.getStory();
    });
    
    var _submitSurvey = function(params){

            var parent_id = '',
                rate = params.rate,
                comment = params.comment;    
                
            if (_getParameterByName('id')=='') {
                _warningAlert('The customer\'s ID is missed in the parameters');
            }
            else
            {                
                var URL = location.origin + "/pfsproxy/pfsmobileproxy/submitsurvey";

                var params = {
                    pfs_id: _getParameterByName('id'),
                    subject: "NPS Overall Rating: " + rate,
                    "comment": comment || "",
                    demoID: $.siteData.settings.template,
                    media: "survey",
                    overall: rate
                };

                if (_getParameterByName('parent_id').length > 0) {
                    params.parent_id = _getParameterByName('parent_id');
                }
                
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
    };
    
    var _infoAlert = function(text){
        $.alert({message: text, type: 'info'});
    };
    
    var _warningAlert = function(text){
        $.alert({message: text, type: 'warn'});
    };
    
    var _loginAlert = function(text){
        _warningAlert(demoProcess.getString('PleaseLogin'));
    };
    
    var _clearTimerFlag = function(){
        _isPopupOnTimer = false;
    };
    
    var _getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    
    var _getString = function(key){
        var res = '-- "'+ key +'" is Not defined for '+ $.siteData.settings.language +' --';
        if (f_i18n[$.siteData.settings.language] && f_i18n[$.siteData.settings.language][key]) {
            res = f_i18n[$.siteData.settings.language][key];
        }
        else if (f_i18n['en-US'] && f_i18n['en-US'][key]) {  // English - default
            res = f_i18n['en-US'][key];
        }
        return res;        
    };
    
    var _checkRecentCmsState = function(){

        if (! $.siteData.story) return; // no story loaded
        
        var service = _recentService,
            state = _recentState,
            story = $.siteData.story,
            prompt = '',
            page_id = '';

        try {
            prompt =  story["resources"]["cs-services"][service][state]["web"]["prompt"];
            page_id = story["resources"]["cs-services"][service][state]["web"]["page_id"];
        }
        catch (e) {
        }
        
        if (!! prompt && !! page_id) {
            
            var oToastView = {
                type: "generic",
                body: _getString(prompt),
                icon: "info",
                controls: "close",
                buttons: {
                    type: "binary",
                    secondary: cxw_i18n[$.siteData.settings.language].sendmessage.SendMsgFormClose  || "Cancel",
                    primary: cxw_i18n[$.siteData.settings.language].sendmessage.EmailOk  || "OK"
                }
            };

            // opening a state specific popup
            window._genesys.widgets.bus.command("Toaster.open", oToastView).done(function(e2){
                $(e2.html).find(".cx-btn.cx-btn-default").click(function(){
                    window._genesys.widgets.bus.command("Toaster.close");
                });
                $(e2.html).find(".cx-btn.cx-btn-primary").click(function(){
                    window._genesys.widgets.bus.command("Toaster.close");
                    location.href = "#" + page_id;
                });
            });
        }
    };

    var _saveToGme = function(params, callback){

        var demoHost = $.siteData.env.GDemoHost,
            gmsHost = demoHost.substr(0,demoHost.indexOf('.'))+'-gme'+demoHost.substr(demoHost.indexOf('.')),
            urlServices = "//"+gmsHost+"/genesys/1/service/store";

        $.ajax({
            type: "POST",
            url:  urlServices,
            data: {data: JSON.stringify(params)},
            dataType: "json",

            success:function (msg) {
                if (callback) {callback(msg);}
            },

            error:function (XMLHttpRequest, textStatus, a) {
                console.log('[CXW] GME Save Error: ', textStatus);
            }
        });

    };

    var _updateInGme = function(id, params, callback){

        var demoHost = $.siteData.env.GDemoHost,
            gmsHost = demoHost.substr(0,demoHost.indexOf('.'))+'-gme'+demoHost.substr(demoHost.indexOf('.')),
            urlServices = "//"+gmsHost+"/genesys/1/storage/"+id+"/600";

        $.ajax({
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url:  urlServices,
            data: {data: JSON.stringify(params)},

            success:function (msg) {
                if (callback) {callback(msg);}
            },

            error:function (XMLHttpRequest, textStatus, a) {
                console.log('[CXW] GME Update Error: ', textStatus);
            }
        });

    };

    var _getRecentCmsState = function(callback){

        var demoHost = $.siteData.env.GDemoHost,
            gmsHost = demoHost.substr(0,demoHost.indexOf('.'))+'-gme'+demoHost.substr(demoHost.indexOf('.')),
            contact_id = $.siteData.customer.local.contact_id,
            urlServices = "//"+gmsHost+"/genesys/1/cs/customers/"+contact_id+"/services/active?extensions=StoryService",
            urlStates,
            cmsServices,
            serviceId
            ;

        $.get(urlServices).done(function(services) {

            console.log('CMS services: ');
            console.log(services);

            if (services && services.length > 0) {
                cmsServices = services;
                serviceId = services[services.length-1].service_id;
                urlStates = "//"+gmsHost+"/genesys/1/cs/services/"+serviceId+"/states?extensions=StoryState";

                $.get(urlStates).done(function(states) {

                    console.log('CMS states: ');
                    console.log(states);

                    if (states.length > 0) {

                        var storySvc = cmsServices[cmsServices.length-1].StoryService;

                        if (storySvc && storySvc[0] && storySvc[0].title) { // is it a Story service?

                            var storyState = states[states.length-1].StoryState;

                            if (storyState && storyState[0] && storyState[0].title) {  // the last story service/state is found - play fanfares!
                                _recentState = storyState[0].title;
                                _recentService = storySvc[0].title;
                                //alert("service/state: \n" + _recentService + '\n' + _recentState);
                                if (callback) callback({service: _recentService, state: _recentState});
                            }
                        }
                    }
                });
            }
        });
    };

    var _getStory = function(){
        
        try {
// w/a - to read story from fregoli web app
//            $.get($.siteData.siteRoot + '/' 
//                + $.siteData.settings.vertical 
//                + '/story.cfg')  // getting customer story

    // TODO use Story II Service OR read story.cfg from GDemo:            
            $.get($.siteData.settings.storyUrl + '/' + $.siteData.settings.storyUser 
                + '/' + $.siteData.settings.storyId + '/story.cfg')  // getting customer story
                .done(function( result, textStatus ) {
                    $.siteData.story = JSON.parse(result);  // TODO RESTORE genWeb.story = result;
                })
                .fail(function( result, textStatus ) {
                    console.log("[FR] Story could not be loaded!");
                });
        }
        catch(e){
            console.log("[FR] No story info found!");
        }
    };

    var _cleanJourney = function(action){ // action - 'close-all'/'delete-all'
        var data = {
            action: "service",
            media_type: "workitem",
            queue: "Customer_Story.default.StoryPostQueue",
            pfs_id: $.siteData.customer["customer.customer_phone"],
            type: action
            };
            
            _submitInteraction(data);

    };

    var _submitInteraction = function(data, isSilent){

        var settings = {
                url: "//" + $.siteData.env.GDemoHost + "/pfsproxy/pfsmobileproxy/submitinteraction",
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                processData: false,
                dataType: "json",
                data: JSON.stringify(data)
            };

        $.ajax(settings)
            .success(function (response) {
                if (! isSilent) {
                    demoProcess.infoAlert(demoProcess.getString('RequestSubmitted'));
                }
                console.log('[FR] New interactoin - submitted: ');
                console.log(response);
            })        
            .error(function (response) {
                if (! isSilent) {
                    demoProcess.infoAlert(demoProcess.getString('RequestFailed'));
                }
                console.log('[FR] New interactoin - failed: ');
                console.log(response);
            });        
    };
    
    var _showJourney = function(action){
        window.open('https://'+ $.siteData.env.GDemoHost +'/cjourney-gsg/journey-v1/journey-app/app/?#/journey/' 
            + $.siteData.customer.local.contact_id, '_blank');
    };
    
    var _sendMessage = function(message, channel, isSurvey){ // 3 - phone, 4 - email, 6 - sms
    
    if (! message) {
            _warningAlert(_getString('EnterText'));
            return;
        }

        var data  = {
            text: message,
            media_type: "workitem",
            queue: "Customer_Story.default.StoryPostQueue",
            pfs_id: $.siteData.customer["customer.customer_phone"],
            survey: !!isSurvey
        };
        
        switch (channel) {
            case 3: 
                data.action = "call";
                data.demoID = $.siteData.settings.template;
                data["connect-to"] = "ivr";
                break;
            case 4: 
                data.action = "email";
                data.subject = _getString('Notification');
                break;
            case 6: 
                data.action = "sms";
                break;
        }
                    
        _submitInteraction(data);
    };
    
    var _updateJourney = function(service, state, details, comment, delay, mediatype){ // start SC state
    
        let data =                    
        {
            "PFS_id": $.siteData.customer["customer.customer_phone"],
            "action": "cms",
            "cs-media-type": "cobrowse",
            "demoID": $.siteData.settings.template || '',
            "media_type": mediatype || "workitem",
            "queue": "Customer_Story.default.StoryPostQueue",
            "sw_cs_action": JSON.stringify({
                "action": "cms",
                "delay": delay || 10,
                "cs-service": service,
                "cs-state": state,
                "details": details || '',
                "comment": comment || '',
                "service": service,
                "state": state
            })
        };    
        
        _submitInteraction(data, true);
    };
    
    var _submitTask = function(data){
        
        data["--kvp--story_routing"] = "NOTtrue"; // TODO fix to true
        data["Demo-PFS_Mobile-Common-Account"] = $.siteData.customer["customer.customer_phone"];
        data["pfs_id"] = $.siteData.customer["customer.customer_phone"];
        data["--kvp--PFS_id"] = $.siteData.customer["customer.customer_phone"];
        data["--kvp--demoID"] = $.siteData.settings.template;

        var settings = {
                url: "//" + $.siteData.env.GDemoHost + "/pfsproxy/pfsmobileproxy/dispute",
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                processData: false,
                dataType: "json",
                data: JSON.stringify(data)
            };

        $.ajax(settings)
            .success(function (response) {
                demoProcess.infoAlert(demoProcess.getString('RequestSubmitted'));
                console.log('[FR] iWD task ' + data.subject + ' - submitted');
            })        
            .error(function (response) {
                demoProcess.infoAlert(demoProcess.getString('RequestFailed'));
                console.log('[FR] iWD task ' + data.subject + ' - failed');
                console.log(response);
            });        
               
    };
    
    var oPublic = {
        submitInteraction: _submitInteraction,
        submitTask: _submitTask,
        sendMessage: _sendMessage,
        showJourney: _showJourney,
        cleanJourney: _cleanJourney,
        getStory: _getStory,
        getRecentCmsState: _getRecentCmsState,
        checkRecentCmsState: _checkRecentCmsState,
        clearTimerFlag: _clearTimerFlag, 
        getString: _getString,
        getParameterByName: _getParameterByName,
        infoAlert: _infoAlert,
        warningAlert: _warningAlert,
        submitSurvey: _submitSurvey,
        loginAlert: _loginAlert,
        updateJourney: _updateJourney,
        saveToGme: _saveToGme,
        updateInGme: _updateInGme
    };
    
    
    return oPublic;
    
}(jQuery);