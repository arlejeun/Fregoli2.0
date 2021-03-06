 
console.log('[CXW] init');

const CXW_ENABLED = true;
const CXW_VERSION = '9.0.007.07';
var disableWebSockets=false;
var _demoHost = '//core.demo.genesys.com'; 
var VIDYO_FILES = "//core.demo.genesys.com/vidyo";  

var widgetCX = (function(){

    var gweBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-gwe'+_demoHost.substr(_demoHost.indexOf('.')); // "https://POD-gwe.live.genesys.com";
    var gmsServer = _demoHost + '/gms_port_8010/genesys';
    var gaapBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-gaap'+_demoHost.substr(_demoHost.indexOf('.')) + ':8054'; // "https://POD-gaap.live.genesys.com";
    var gksBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-gkcsrv'+_demoHost.substr(_demoHost.indexOf('.')); // "https://POD-gkcsrv.live.genesys.com";
    var vidyoBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-vidyo'+_demoHost.substr(_demoHost.indexOf('.'));  // "https://POD-vidyo.live.genesys.com";
    var cobrowseBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-cobrowse'+_demoHost.substr(_demoHost.indexOf('.')); // "https://POD-cobrowse.live.genesys.com";

    var CXW_THEME = "light";
    var CXW_MESSAGE_BTN = false;
    var CXW_CHAT_BTN = false;
    var CXW_IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var cx_converter = new showdown.Converter();

    var DEFAULT_SERVICE = "customer-support";
    var CHATBOT_SERVICE = "bot";
    var CHAT_URL = gmsServer + "/2/chat/";  
    var STR_LOCALE = $.siteData.settings.language || "en-US";

    var isPlugCallback = true;
    var isPlugCallUs = true;
    var isPlugClick2Call = false;
    var isPlugChat = true;
    var isPlugEmail = true;
    var isPlugVideo = true;
    var isPlugSearch = true;
    var isChatDeflection = true;
    
    var gkcVersion = "v1";
    
    var isActive = false;

    var oWCC = null;
    var oPublished = {};
    var gweCfg = {};
    var videoData = {};
    var oChatConfig = {
        //transport:  "gms",
        dataURL:    CHAT_URL + DEFAULT_SERVICE,
        userData: {demoID: $.siteData.settings.template}, 
        emojis: true,
        actionsMenu: true,
        proactive: {
            enabled: false, // enable or disable
            idleTimer: 10,   // number of seconds of idle time before showing invite
            cancelTimer: 30 // number of seconds before invite auto-closes
        },
        chatButton: {

                enabled: CXW_ENABLED && CXW_CHAT_BTN,
                template: false,
                template: '<div>CHAT NOW</div>', 
                openDelay: 100,
                effectDuration: 200,
                hideDuringInvite: true
        }           
    };

    if(!window._genesys){
        window._genesys = {widgets: {}};
    }

    var _initCfg = function(){
        
        if ($.siteData.settings.GDemoHost) {
           $.siteData.env = $.siteData.env || {};
           $.siteData.env.GDemoHost = $.siteData.settings.GDemoHost;
           $.siteData.env.ConfigType = "pod";
        }
        
        // demoid from URL parameter
        if (demoProcess.getParameterByName("demoid")) {
            $.siteData.settings.template = demoProcess.getParameterByName("demoid");
        }
            
        _demoHost = '//' + $.siteData.env.GDemoHost;
        gmsServer = _demoHost + '/gms_port_8010/genesys';
        gweBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-gwe'+_demoHost.substr(_demoHost.indexOf('.')); // "https://POD-gwe.live.genesys.com";
        gaapBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-gaap'+_demoHost.substr(_demoHost.indexOf('.')) + ':8054'; // "https://POD-gaap.live.genesys.com";
        gksBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-gkcsrv'+_demoHost.substr(_demoHost.indexOf('.')); // "https://POD-gkcsrv.live.genesys.com";
        vidyoBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-vidyo'+_demoHost.substr(_demoHost.indexOf('.'));  // "https://POD-vidyo.live.genesys.com";
        cobrowseBaseUrl = _demoHost.substr(0,_demoHost.indexOf('.'))+'-cobrowse'+_demoHost.substr(_demoHost.indexOf('.')); // "https://POD-cobrowse.live.genesys.com";

        // chat url
        CHAT_URL = gmsServer + "/2/chat/";
        oChatConfig.dataURL =  CHAT_URL + DEFAULT_SERVICE;
        oChatConfig.userData = {demoID: $.siteData.settings.template, PFS_id: $.siteData.customer["customer.customer_phone"]};

        // cfg vidyo host
        _gv.config = {
            serverUrl : vidyoBaseUrl + "/VidyoServer",
            debug:true
        };

        // Theming
        if ($.siteData.settings.widget_color) {
            CXW_THEME = 'custom';
            var sheet = document.createElement('style')
            sheet.innerHTML = ".cx-widget.cx-theme-custom .cx-svg-icon-tone1, .cx-widget.cx-theme-custom .cx-svg-icon-tone2 {fill:"+$.siteData.settings.widget_color+"} ";
            sheet.innerHTML += ".cx-widget.cx-theme-custom .cx-btn-primary {background:"+$.siteData.settings.widget_color+"} ";
            sheet.innerHTML += ".cx-widget.cx-theme-custom *, .cx-widget.cx-theme-custom *:focus, .cx-widget.cx-theme-custom *:hover {border-color:"+$.siteData.settings.widget_color+"} ";
            sheet.innerHTML += ".cx-widget.cx-theme-custom .cx-btn-primary {background:"+$.siteData.settings.widget_color+"} ";
            document.body.appendChild(sheet);
/*.ark .cx-btn-primary {
    border-color: #CC0000!important;
background: #CC0000!important;}*/
        }

        // Channels selection        
        /*
        isPlugCallback = cData["_$_show_callback"] !== 'false';
        isPlugCallUs = cData["_$_show_callus"] !== 'false';
        isPlugClick2Call = cData["_$_show_click2call"] !== 'false';
        isPlugChat = cData["_$_show_chat"] !== 'false';
        isPlugEmail = cData["_$_show_email"] !== 'false';
        isPlugVideo = cData["_$_show_video"] !== 'false';
        isPlugSearch = cData["_$_show_search"] !== 'false';
        isChatDeflection = cData["_$_deflection"] !== 'false';
        */

        // cfg widgets
        window._genesys.widgets = {
            main: {
                plugins: [
                    "cx-sidebar",
                    "cx-channel-selector",
                    "cx-webchat",
                    "cx-webchat-service",
                    "cx-send-message",
                    "cx-send-message-service",
                    "cx-gwe",
                    "cx-cobrowse",
                    "cx-calendar",
                    isPlugSearch? "cx-search": "cx-skip",
                    "cx-knowledge-center-service",
                    "cx-chat-deflection",
                    "cx-callback-service",
                    "cx-stats-service",
                    "cx-callback",
                    //"cx-appointment",
                    //"cx-offers",
                    //"cx-preferences",
                    //"cx-console",
                    "cx-call-us"
                ],
                mobileMode: "auto",
                mobileModeBreakpoint: 600,
                theme: CXW_THEME,
                themes: {
                       green: 'cx-theme-green',
                       brown: 'cx-theme-brown',
                       gold: 'cx-theme-gold',
                       red: 'cx-theme-red',
                       blue: 'cx-theme-blue',
                       cyan: 'cx-theme-cyan',
                       purple: 'cx-theme-purple',
                       black: 'cx-theme-black',
                       custom: 'cx-theme-custom'
                },
                lang: STR_LOCALE,
                i18n: cxw_i18n,
                debug: true
            },
            sidebar: {
                showOnStartup: true,
                position: 'right',
                expandOnHover: true,
                channels: [{

                        name: 'ChannelSelector', 
                        clickCommand: 'ChannelSelector.open', 
                        readyEvent: 'ChannelSelector.ready', 
                        clickOptions: {}, 

                         //use your own static string or i18n query string for the below two display properties
                        displayName: '@i18n:channelselector.Title', 
                        displayTitle: '@i18n:channelselector.SubTitle',
                        icon: 'agent'
                    }, 
                    {
                        name: 'Search', 
                        clickCommand: 'Search.open', 
                        clickOptions: {}, 
                        readyEvent: 'Search.ready', 

                         // Example of i18n query string: '@i18n:search.SearchName' where 'search' refers to the plugin namepsace and 'SearchName' refers to the property key containing the actual text.

                        displayName: '@i18n:search.SidebarButton', 
                        displayTitle: '@i18n:search.Title', 

                        icon: 'knowledge-center', 
                        onClick: function ($, CXBus, Common) {
                             _genesys.widgets.bus.command('Search.open');
                        } 
                    }
                ]
            },
            gwe: {
                debug : true,
                httpEndpoint: gweBaseUrl,
                httpsEndpoint: gweBaseUrl,
                dslResource: gweBaseUrl + "/frontend/resources/dsl/domain-model.xml",
                disableWebSockets: disableWebSockets
            },
            cobrowse: {
                src: cobrowseBaseUrl + "/cobrowse/js/gcb.min.js",
                url: cobrowseBaseUrl + "/cobrowse"
            },            

            callback: {  
                dataURL: gmsServer + '/1/service/callback/' + $.siteData.settings.gsg_callback, 
                callDirection: 'USERTERMINATED',
                //formValidation: false,
                userData: {
                    FirstName: $.siteData.customer.local.FirstName || $.siteData.customer["customer.firstname"] || '',
                    LastName: $.siteData.customer.local.LastName || $.siteData.customer["customer.lastname"] || '',
                    customerNumber: $.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"] || '',
                    _phone_number: $.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"] || '',
                    PFS_id: $.siteData.customer.pfsid || '',
                    _callback_phone_number: $.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"] || '',
                    _customername: ($.siteData.customer.local.FirstName || $.siteData.customer["customer.firstname"]) + ' ' + 
                                    ($.siteData.customer.local.LastName || $.siteData.customer["customer.lastname"]) || '',
                    _callback: 'true',
                    _xtemplate: $.siteData.settings.template,
                    _app_name: 'Genesys',     
                    Config_Type: $.siteData.env.ConfigType,                    
                    subject: "", // $.siteData.appTitle + " Callback",
                    waitForAgent: 'true',
                    waitForUserConfirm: 'false',
                    _target: ($.siteData.env.ConfigType == 'gdemo')? '?:' + $.siteData.customer.pfsid + '>0': '?:Customer_Service >=1',
                    Base_Url: _demoHost,  
                    _call_direction: 'USERTERMINATED', 
                    _wait_for_agent: true,
                    _wait_for_user_confirm: false,
                    _media_type: 'voice',
                    demoID: $.siteData.settings.template,
                    PFS_id: $.siteData.customer["customer.customer_phone"] || ''
                },
                countryCodes: false
                //apikey : "m6gLKXREBMOK8VAlygOHHLLn3eNkgYjG"
            },
            calendar: {
                showAvailability: true,
                numberOfDays: 5,
                calenderHours: {
                    interval: 10, //min
                    morning: {
                        openTime: '09:00',
                        closeTime: '11:59'
                    },
                    afternoon: {
                        openTime: '12:00',
                        closeTime: '16:59'
                    },
                    evening: {
                        openTime: '17:00',
                        closeTime: '23:59'
                    }
                }
            },
            clicktocall: {
                'enableCountdown' : true,
                'provideAccessCode' : true,
                'autoDialAccessCode' : true,
                dataURL: gmsServer + '/1/service/callback/voice-userorig-immediate', // + ((genWeb.customer["CfgType"] == 'gdemo')? 'gbank-callback-gms': 'CallbackV2_VQ'),
                'ewt': {
                    'display': false,
                    'queue': 'QUEUE_NAME',
                    'threshold': 30,
                    'refreshInterval': 10
                },
                'confirmFormCloseEnabled' : true,
                'userData' : {
                    FirstName: $.siteData.customer.local.FirstName || $.siteData.customer["customer.firstname"] || '',
                    LastName: $.siteData.customer.local.LastName || $.siteData.customer["customer.lastname"] || '',
                    first_name: $.siteData.customer.local.FirstName || $.siteData.customer["customer.firstname"] || '',
                    lrst_name: $.siteData.customer.local.LastName || $.siteData.customer["customer.lastname"] || '',
                    email: $.siteData.customer.local.EmailAddress || $.siteData.customer["customer.email1"],
                    _customer_number: $.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"] || '',
                    _phone_number: $.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"] || '',
                    _customername: ($.siteData.customer.local.FirstName || $.siteData.customer["customer.firstname"] || '') + 
                        ' ' + ($.siteData.customer.local.LastName || $.siteData.customer["customer.lastname"] || ''),
                    _xtemplate: 'gbank',
                    _app_name: 'Genesys',
                    Config_Type: $.siteData.env.ConfigType,
                    subject: "Voice call",
                    Base_Url: _demoHost,
                    mediaType: 'voice',
                    demoID: $.siteData.settings.template,
                    PFS_id: $.siteData.customer.pfsid || '',
                    _target: ($.siteData.env.ConfigType == 'gdemo')? ($.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"]) + 
                        '@.GA': 'Customer_Service >=1'
                    },
            },    
            callus: {                
                contacts: [
                    {
                        displayName: "Contact info",
                        i18n: "Number001",
                        number: ""
                    },
                    {
                        displayName: "USA",
                        i18n: "Number001",
                        number: (demoProcess.getParameterByName("demoid") === 'icarus')? "+1(650)204-5201": $.siteData.settings.inbound_number
                    }                    
                ],
                hours: [
                    "8am - 8pm Mon - Fri",
                    "10am - 6pm Sat - Sun"
                ]
            }, 
            knowledgecenter: {
                host: gksBaseUrl+ (gkcVersion == "v1"? "/gks-server/v1": "/gks-server/api"),
                knowledgebases: [$.siteData.settings.gkc_db],
                lang: 'en',
                media: '',
                maxTrendingResults: 5,
                maxSearchResults: 3,
                apiClientId: 'webWizard',
                apiClientMediaType: 'selfserviceWizard',
                apiVersion: gkcVersion,

                deflection: {
                    enabled: isChatDeflection,
                    maxRephrased: -1,
                    agentTranscript: 'readable',
                    customerIdToken: 'email' // firstname | lastname | email
                },

                search : {
                    SearchButton : {
                        enabled: false
                    }
                }
            },            
            webchat: oChatConfig,
            sendmessage: {
                dataURL: gmsServer + "/2/email",  
                apikey: "",
                userData: {demoID: $.siteData.settings.template, PFS_id: $.siteData.customer["customer.customer_phone"]},
                SendMessageButton: {
                      enabled: CXW_ENABLED && CXW_MESSAGE_BTN
                }
            },
            speechstorm: {
                baseURL: gaapBaseUrl
            },
            onReady: function(oCXBus){

                // save a placeholder to transcript
                demoProcess.saveToGme({type: "chat"}, function(d){
                    if(typeof d === "object" && d["_data_id"]) {
                        widgetCX.transcript_id = d["_data_id"];
                    }
                });

                console.log('[CXW] Widget bus has been initialized!');
                widgetCX.setActive();
                widgetCX.setoWCC(oCXBus);

                // chat messages preprocessor
                oWCC.command("WebChatService.registerPreProcessor", {preprocessor: function(oMessage){

                      // Receive each chat message JSON as "oMessage"
                      // Modify oMessage https://genesys.api.vidyocloud.com/flex.html?roomdirect.html&key=P1TvDysakk

                        // saving transcript
                      if (oMessage.type === "Message") {
                          
                          oWCC.command("WebChatService.getTranscript").done(function(e){
                            if (widgetCX.transcript_id) {
                                demoProcess.updateInGme(widgetCX.transcript_id, e);
                            } 
                          });
                          
                          if (oMessage.text.indexOf("email with") >= 0) {
                            oMessage.html = true;
                            oMessage.text += "<br><img src='images/pdf_icon.png' onClick='window.open(\"images/Qoute.pdf\", \"_blank\")'>";
                          }
                          else if (oMessage.text.indexOf("orange color") >= 0) {
                            oMessage.html = true;
                            oMessage.text += "<br><img src='images/fiat500.jpg'>";
                          }
                      }
                      
                      // Quick responce menu
                    if (oMessage.text && oMessage.text.indexOf("Menu:") >= 0) {
                        
                        let menuIdx = oMessage.text.indexOf("Menu:");
                        let arrQuest = oMessage.text.substr(menuIdx).replace("Menu:", "").split('\n');

                        oMessage.text = oMessage.text.substr(0, menuIdx) + '<br>';

                        arrQuest.splice(0, 1); // skip 0 item

                        oMessage.text += '<br>';
                        $.each(arrQuest, function(idx, val){
                            oMessage.text += '<button type="button" class="cx-btn cx-btn-default i18n data-chat-menu" '+
                                            'onclick="widgetCX.sendChatMessage(\''+val+'\', this)"> '+val+' </button>';     
                        });

                        oMessage.html = true;                                                           
                    }

                    if (oMessage.text && (oMessage.text.indexOf("Message:https://genesys.api.vidyocloud.com") == 0 || 
                                            oMessage.text.indexOf("Message:http://Genesys.sandboxga.vidyo.com") == 0)) { 
                          oMessage.html = true;
                          var ref = oMessage.text.substr(43); 
                          if (! CXW_IS_MOBILE && oMessage.text.indexOf("Message:https://genesys.api.vidyocloud.com") == 0) {                          
                              oMessage.text = 'Please press button to start video:<br><br><button type="button" class="btn btn-primary i18n" onclick="widgetCX.startVidyo(&quot;' + ref + '&quot;);">Start video</button>';
                          }
                          else if(! CXW_IS_MOBILE) { // sandbox portal
                              oMessage.text = 'Please press button to start video:<br><br><button type="button" class="btn btn-primary i18n" onclick="widgetCX.startVidyoSandbox(&quot;' + ref + '&quot;);">Start video</button>';
                          }
                          else if(CXW_IS_MOBILE) {
                              oMessage.text = '***Video is not supported in mobile device browsers***';
                              oMessage.html = true;
                              oMessage.text = cx_converter.makeHtml(oMessage.text);
                          }
                      }
                      else if(oMessage.type == "PushUrl" && oMessage.from.type == "Agent" && oMessage.text) {
                          window.open(oMessage.text, "_blank");
                      }
                      else if(oMessage.text == "Message:EndVidyoRequest") {
                          oMessage.text = 'Video session is closed';
                      }
                      else if(oMessage.from.type == 'Agent' && oMessage.text) {
                          oMessage.html = true;
                          oMessage.text = cx_converter.makeHtml(oMessage.text);
                      }
                      
                      //console.log(JSON.stringify(oMessage, null, 4));

                      // Return it back to webchat
                      return oMessage;
                    }
                });

                    // Sidebar localization (officially not supported)
                oWCC.subscribe("SideBar.opened", function(){
                    $("div.cx-sidebar-button.cx-channel-selector > div.name").text(cxw_i18n[STR_LOCALE].channelselector.Title);
                    $(" div.cx-sidebar-button.cx-search > div.name").text(cxw_i18n[STR_LOCALE].search.Title);
                });
                
                    // prefilling 
                oWCC.subscribe("Callback.opened", function(){
                    _setFooter();
                    _prefillForm();
                    //_sidebarHide();
                });
                
                oWCC.subscribe("WebChat.opened", function(){
                    _setFooter();
                    _prefillForm();
                    
                    //_sidebarHide();
                    //if (location.href.indexOf('carLoanResult') > 0) oWCC.command("ChatDeflection.disable");
                    //else oWCC.command("ChatDeflection.enable");
                });
                
                oWCC.subscribe("ClickToCall.opened", function(){
                    _setFooter();
                    _prefillForm();
                    //_sidebarHide();
                });

                oWCC.subscribe("SendMessage.opened", function(){
                    _setFooter();
                    _prefillForm();
                    //_sidebarHide();
                });
                
                setTimeout(function(){_sidebarShow();}, 200);
                console.log('[CXW] The plugin is registered');
                
                // check state specific popup
                setTimeout(function(){demoProcess.checkRecentCmsState();}, 3000);

            }  // end of onReady()
        }; 

        // Stats
        window._genesys.widgets.stats = {
            ajaxTimeout: 3000,
            ewt: {
                dataURL: gmsServer + "/1/service/ewt-for-vq" 
                //apikey: 'n3eNkgLLgLKXREBMYjGm6lygOHHOK8VA'
            }
        };

        /*window._genesys.cxwidget.sidebar =  {
             autoOpen: false
        };*/ 

            // Live Assistance
        window._genesys.widgets.channelselector = {
            ewtRefreshInterval: 10,
            channels: []
        };

        if (isPlugCallback) {  // Callback
            window._genesys.widgets.channelselector.channels.push(
                {
                enable: true, 
                clickCommand: 'Callback.open', 
                readyEvent: 'Callback.ready', 
                displayName: 'Receive a Call', 
                i18n: 'CallbackTitle', 
                icon: 'call-incoming', 
                html: '', 
                ewt: {
                    display: true, 
                    queue: 'Inbound_Mobile', 
                    availabilityThresholdMin: 60, 
                    availabilityThresholdMax: 99999, 
                    hideChannelWhenThresholdMax: false
                    }
                }
            );
        }
        if (isPlugChat) {  // Chat
            window._genesys.widgets.channelselector.channels.push(
                {
                enable: true, 
                clickCommand: 'Wizard.openChat', 
                readyEvent: 'WebChat.ready', 
                displayName: 'Web Chat', 
                i18n: 'ChatTitle', 
                icon: 'chat', 
                ewt: {
                    display: true, 
                    queue: 'Omnichannel', 
                    availabilityThresholdMin: 90, 
                    availabilityThresholdMax: 299999, 
                    hideChannelWhenThresholdMax: false
                    } 
                }
            );
        }
        if (isPlugEmail) {  // Email
            window._genesys.widgets.channelselector.channels.push(
                {
                enable: true, 
                clickCommand: 'SendMessage.open', 
                readyEvent: 'SendMessage.ready', 
                displayName: 'Send Message', 
                i18n: 'EmailTitle', 
                icon: 'email', 
                ewt: {
                    display: false, 
                    queue: 'Omnichannel0', 
                    availabilityThresholdMin: 3000, 
                    availabilityThresholdMax: 99999, 
                    hideChannelWhenThresholdMax: false
                    }
                }
            );
        }
        if (isPlugCallUs) {  // Call Us
            window._genesys.widgets.channelselector.channels.push(
                {
                enable: true, 
                clickCommand: 'CallUs.open', 
                readyEvent: 'CallUs.ready', 
                displayName: 'Call Us', 
                i18n: 'CallusTitle', 
                icon: 'call-outgoing', 
                ewt: {
                    display: true, 
                    queue: 'Inbound_Mobile', 
                    availabilityThresholdMin: 90, 
                    availabilityThresholdMax: 99999, 
                    hideChannelWhenThresholdMax: false
                    }
                }
            );
        }
        if (isPlugClick2Call) {  // Click2Call
            window._genesys.widgets.channelselector.channels.push(
                {
                    enable: true,
                    clickCommand: 'Wizard.openClickToCall',
                    readyEvent: 'ClickToCall.ready',
                    displayName: 'Click To Call',
                    i18n: 'ClickToCallTitle',
                    icon: 'call-outgoing',
                    ewt: {
                        display: true,
                        queue: 'Inbound_Mobile',
                        availabilityThresholdMin: 90,

                        availabilityThresholdMax: 99999,
                        hideChannelWhenThresholdMax: false
                    }
                }
            );
        }
        if (isPlugSearch && !CXW_IS_MOBILE) {  // vidyo only for desktops
            window._genesys.widgets.channelselector.channels.push(
                {
                enable: true, 
                clickCommand: 'Vidyo.open', 
                readyEvent: 'Vidyo.ready', 
                displayName: 'Video Chat', 
                i18n: 'VideoTitle', 
                icon: 'videochat', 
                ewt: {
                    display: true, 
                    queue: 'Omnichannel', 
                    availabilityThresholdMin: 300, 
                    availabilityThresholdMax: 99999, 
                    hideChannelWhenThresholdMax: false
                    }
                }
            );
        }

        // vidyo extension
        if(!window._genesys.widgets.extensions){
            window._genesys.widgets.extensions = {};
        }

        window._genesys.widgets.extensions["CXSpeechStorm"] = function($, CXBus, Common) {

            'use strict';

            var speechStormPlugin = CXBus.registerPlugin("CXSpeechStorm"),
                isOpen = false,
                isMobileMode = false,
                isReserved = false,
                sTheme = "",
                speechStormOptions = {
                    baseURL : "",
                    domain: window.location.protocol + '//' + window.location.host
                },
                methods = {

                    open: function(e) {

                        var sAppToken = e.data.appToken,
                            sChatMessage = e.data.chatMessage,
                            sChatInteractionID = e.data.chatInteractionID,
                            sChatUserID = e.data.chatUserID,
                            sChatSecureKey = e.data.chatSecureKey;

                        // As we are not going to URL encode this app token
                        // we are adding extra checks for security.
                        var sAppTokenCharWhiteList = /[A-Za-z0-9-_+]/;
                        var bIsAllCharValid = sAppTokenCharWhiteList.test(sAppToken);

                        if (! sAppToken || ! bIsAllCharValid)
                        {
                            e.deferred.reject("The 'appToken' parameter must be passed to calls to the 'open' command.  speechStormPlugin has ignored your command.");
                            return;
                        }
                        
                        
                        //
                        //  Backup in case the configure URL didn't fire
                        //
                        if (window._genesys.widgets.speechstorm)
                        {
                            if (window._genesys.widgets.speechstorm.baseURL)
                            {
                                speechStormOptions.baseURL = window._genesys.widgets.speechstorm.baseURL;
                            }
                            if (window._genesys.widgets.speechstorm.domain)
                            {
                                speechStormOptions.domain = window._genesys.widgets.speechstorm.domain;
                            }
                        }
                        
                        if (! speechStormOptions.baseURL)
                        {
                            speechStormOptions.baseURL = speechStormOptions.domain;
                        }
                         
                        
                        //
                        // note we are not escaping sAppToken here as there is an issue with 
                        // tokens like lwm+p_8- ending up in WebIVRTokenStartServlet in a URL
                        // encoded state, lwm%2Bp_8- as requests can come in from browsers and
                        // the widget framework we just validate this token above with a RegEx.
                        //
                        var sURL = speechStormOptions.baseURL +
                                   '/fish-messaging/go/' +
                                   sAppToken +
                                   '?domain=' + encodeURIComponent(speechStormOptions.domain);
                        
                        if (sChatMessage)
                        {
                            sURL += '&chatMessage=' + encodeURIComponent(sChatMessage) +
                                    '&chatInteractionID=' + encodeURIComponent(sChatInteractionID) +
                                    '&chatSecureKey=' + encodeURIComponent(sChatSecureKey) +
                                    '&chatUserID=' + encodeURIComponent(sChatUserID);
                        }    

                        speechStormPlugin.command("Toaster.open", {
                            type:        "generic",
                            title:        '',
                            body:         '<iframe id="speechstorm_webivr_iframe" style="border:none" width="100%" height="418px" src="' + sURL + '"></iframe>',
                            controls:     'close', 
                            buttons:     {},
                            immutable: false
                        
                        }).done(function(e2) {
                            if (e2.html)
                            {
                                //
                                //  Add our styles to the HTML inside of the toaster
                                //
                                e2.html.addClass('cx-speechstorm');

                                if (isMobileMode) 
                                {
                                    e2.html.addClass("cx-mobile");
                                }
                                
                                //
                                //  When Overlay's X (close) button is clicked we want to close
                                //  down the WebIVR session too.
                                //
                                e2.html.find(".cx-button-close").click(function(){
                                   
                                    speechStormPlugin.command("close");
                                });
                                
                                //
                                //  Tell other components on the bus that we've opened successfully
                                //
                                e.deferred.resolve(); // MO changed this from resolved() to resolve()
                                isOpen = true;
                                speechStormPlugin.publish("opened");
                            }
                        });
                    },
                    
                    
                    

                    close: function(deferred) {

                        var webIVRFrame = document.getElementById('speechstorm_webivr_iframe');

                        if (webIVRFrame)
                        {
                            console.log("Notifying WebIVR that the session has ended.");
                            webIVRFrame.contentWindow.postMessage('speechstorm:hangup', speechStormOptions.baseURL);
                            isOpen = false;
                            speechStormPlugin.command("Toaster.close");                    
                            speechStormPlugin.publish("closed");
                        }
                    },



        //
                    handleWebIVRStatusUpdate: function(msg_p) {

                        console.log("Received message [" + msg_p.data + "] from domain [" + msg_p.origin + "]");

                        var sExpectedOrigin = (speechStormOptions.baseURL ? speechStormOptions.baseURL : speechStormOptions.domain);
                        
                        if (msg_p.origin !== sExpectedOrigin)
                        {
                            console.log("Ignoring message because its origin does not match the expected origin (" + sExpectedOrigin + ").  Message will be ignored.");
                            return;
                        }
                        
                        var MESSAGE_PREFIX = 'microapp:progress:';

                        if (/^microapp:progress:block:/.test(msg_p.data))
                        {
                            var sProgressDetailsDescription = msg_p.data.substring(MESSAGE_PREFIX.length);

                            console.log("Got output progress: " + msg_p.data);
                            speechStormPlugin.publish("progress", { milestone: sProgressDetailsDescription });
        //                    speechStormPlugin.command("sendSecretMessageToAgent", { message: msg_p.data, regex: /.*/ });

                        }
                        else if (/^microapp:progress:ended$/.test(msg_p.data))
                        {
                            console.log("Got output progress: " + msg_p.data);
                            speechStormPlugin.publish("ended")
        //                    speechStormPlugin.command("sendSecretMessageToAgent", { message: msg_p.data, regex: /.*/ });
                        }
                        else if ("speechstorm:closed" === msg_p.data)
                        {
                            // We can ignore this
                        }
                        else
                        {
                            console.log("Received unknown postMessage: " + msg_p.data);
                        }
                    },
                    
                    
                    

                    getCookieValue : function (sKey_p)
                    {
                        sKey_p += '=';
                        
                        var cookieArray = document.cookie.split(';');
                        
                        for (var i=0; i < cookieArray.length; i++)
                        {
                            var sCookie = cookieArray[i];
                            sCookie = sCookie.replace(/^ +/, '');        

                            if (sCookie.substring(0, sKey_p.length) == sKey_p)
                            {
                                return sCookie.substring(sKey_p.length);
                            }
                        }
                        
                        return undefined;
                    }
                }; // end of methods




            if (speechStormPlugin) 
            {
                speechStormPlugin.registerEvents(["opened", "ready", "closed", "progress", "ended"]);

                speechStormPlugin.registerCommand("open", function(e) {

                    if (!isReserved || e.commander === isReserved || e.commander === "App") 
                    {
                        if (isOpen) 
                        {
                            speechStormPlugin.command("close").done(function() {
                                methods.open(e);
                            });
                        }
                        else
                        {
                            methods.open(e);
                        }
                    }
                    else
                    {
                        e.deferred.reject("speechStorm view is currently reserved");
                    }
                });

                
                speechStormPlugin.registerCommand("close", function(e) {

                    if (isOpen) 
                    {
                        if (!isReserved || e.commander === isReserved || e.commander === "App") 
                        {
                            isReserved = false;

                            if (e.data && e.data.immediately) 
                            {
                                methods.close();
                                e.deferred.resolve();
                            }
                            else
                            {
                                methods.close(e.deferred);
                            }
                        }
                        else
                        {
                            e.deferred.reject("SpeechStorm view is currently reserved");
                        }
                    }
                    else
                    {
                        e.deferred.reject("SpeechStorm view is already closed");
                    }
                });
                

                speechStormPlugin.registerCommand("configure", function(e) {

                    if (e.data) 
                    {
                        if (typeof e.data.baseURL == "string")
                        {
                            speechStormOptions.baseURL = e.data.baseURL;
                        }
                        if (typeof e.data.domain == "string")
                        {
                            speechStormOptions.domain = e.data.domain;
                        }
                        e.deferred.resolve();
                    }
                    else
                    {
                        e.deferred.reject("Invalid configuration");
                    }
                });


                speechStormPlugin.subscribe("App.ready", function(e) {

                    speechStormPlugin.command("App.getTheme").done(function(sNewTheme) {

                        sTheme = sNewTheme;
                    });
                });
                

                speechStormPlugin.subscribe("App.closeAll", function(e) {

                    speechStormPlugin.command("close");
                });

                
                speechStormPlugin.subscribe("App.mobileMode", function() {

                    isMobileMode = true;
                });

                
                speechStormPlugin.subscribe("WebChatService.started", function(e) {

                    window._genesys.widgets.bus.command("WebChatService.addPrefilter", { filters: [/^microapp:/] })
                            .done(function(e) {
                                console.log('Successfully registered prefilter:');
                                console.log(e);
                            }).fail(function (e) {
                                console.log("FAILED to register prefilter for CXSpeechStorm: " + e);
                            });
                });
                
                
                speechStormPlugin.subscribe("WebChatService.messageReceived", function(details) {
                    console.log("CXSpeechStorm received a message from WebChatService");

                    var isAlreadyOpened = false;

                    for (var i=0; i < details.data.originalMessages.length; i++)
                    {
                        var msg = details.data.originalMessages[i];

                        if (msg.type == 'Message')
                        {
                            console.log("       " + msg.text);

                            var PROTOCOL_PREFIX = 'microapp://app/';

                            if (msg.text.indexOf(PROTOCOL_PREFIX) >= 0)
                               {
                                if (isAlreadyOpened)
                                   {
                                       console.log("ALREADY OPENED");
                                   }
                                else
                                {
                                    isAlreadyOpened = true;

                                    //
                                    // 'URL' in the message will be in form
                                    //     "microapp://app/<apptoken>\nParam1=Value1\nParam2=Value2"
                                    // or
                                    //     "microapp://app/<apptoken>/<appdescription>\nParam1=Value1\nParam2=Value2"
                                    //
                                    var sUrlDetails = msg.text.substring(PROTOCOL_PREFIX.length);
                                    var sAppToken = sUrlDetails.split(/\//)[0];
                                    
                                    //
                                    //  Extract some chat-server-specific settings from the cookie so that
                                    //  we can tie together the two sessions
                                    //
                                    var sChatInteractionID = methods.getCookieValue('_genesys.widgets.webchat.state.session'),
                                        sKeysCookieJson = methods.getCookieValue('_genesys.widgets.webchat.state.keys');
                                
                                    if (! (sChatInteractionID  &&  sKeysCookieJson))
                                    {
                                        console.log("Both 'session' and 'keys' cookies must be present if microapp is to be invoked from a chat message.  Session was '" + sChatInteractionID + "' and keys were '" + sKeysCookieJson + "'.  CXSpeechStorm has ignored your command.");
                                        return;
                                    }
                 
                                    var keysCookie = JSON.parse(decodeURIComponent(sKeysCookieJson)),
                                        params = {
                                            appToken: sAppToken,
                                            chatMessage: msg.text,
                                            chatInteractionID : sChatInteractionID,
                                            chatUserID : keysCookie.userId,
                                            chatSecureKey : keysCookie.secureKey
                                        };
                                    
                                    window._genesys.widgets.bus.command("CXSpeechStorm.open", params).done(function(e) {
                                        console.log('CXSpeechStorm successfully sent the WebIVR open request for app with token: ' + sAppToken);
                                    }).fail(function(e) {
                                        alert('Error!  ' + e);
                                    });
                                }
                               }
                        }
                    }
                });

                
            

                //
                //  Listen for events from the iframe; these will generally be related to caller's
                //  progress through the WebIVR callflow.
                //
                if (window.addEventListener)
                {
                      addEventListener("message", methods.handleWebIVRStatusUpdate, false)
                }
                else
                {
                      attachEvent("onmessage", methods.handleWebIVRStatusUpdate)
                }

                if (window._genesys && window._genesys && window._genesys.widgets && window._genesys.widgets.speechStormPlugin) {

                    speechStormPlugin.command("configure", window._genesys.widgets.speechStormPlugin);
                }

                speechStormPlugin.republish("ready");
            
            }  // End of 'if (speechStormPlugin)'
        }

        window._genesys.widgets.extensions["Vidyo"] = function($, CXBus, Common){
         
            var oVidyo = CXBus.registerPlugin("Vidyo");         
            
            oVidyo.subscribe("Vidyo.opened", function(e){}); 
            
            oVidyo.republish("ready");
         
            oVidyo.registerCommand("open", function(e){
                initGV();
            });    
            
            if (typeof oVidyo.ready == 'function') {  // available and required since 9.0.004.03
                oVidyo.ready();
            }
            
        };

        window._genesys.widgets.extensions["Wizard"] = function($, CXBus, Common){
         
            var oWizard = CXBus.registerPlugin("Wizard");         

            oWizard.registerCommand("openChat", function(e){
                oChatConfig.userData = $.extend(true, {}, oChatConfig.userData, gweCfg);
                oWCC.command("WebChatService.configure", oChatConfig);
                
                oWCC.command("WebChat.open").done(function(e){ 
                    $('.cx-form-horizontal >> .cx-btn-primary').one('click', function(){
                        if (typeof onChatStart === 'function') {
                            onChatStart();
                        }
                    });
                });
            });

            oWizard.before("WebChat.open", (oData)=>{
                if (demoProcess.getParameterByName("demoid") === 'icarus') {
                    widgetCX.isSubmit = true;

                    oData.userData = oData.userData || {};
                    // for new AC
                    oData.userData.subject = 'Car Insurance';
                    oData.userData.occasion = "CarInsuranceProspect";
                    oData.userData.transcript_id = widgetCX.transcript_id;
                    ac('record', 'button.clicked', 'agent-engagement', {}); 
                }
                return oData;
            });
            
            oWizard.registerCommand("openClickToCall", function(e){
                oWCC.command("ClickToCall.open");
            });

            oWizard.registerCommand("configure", function(e){

                var ctrlData = {}; //webDemo.getCxwControlData();
                var cxwData = {}; //webDemo.getCxwData();
                var cxwPostAct = {}; // webDemo.getCxwPostActions();
                var cxwSubj = {}; //webDemo.getCxwSubjects();
                var udata = {};

                // Chat Configuration ---------------------
                var agentLess = false;
                var url = CHAT_URL + (agentLess? CHATBOT_SERVICE: DEFAULT_SERVICE);

                // deflection
                if(true) oWCC.command("ChatDeflection.enable");
                else oWCC.command("ChatDeflection.disable");

                widgetCX.updateGweData();

                // Voice callback Configuration ---------------
                udata = {};
                if (agentLess) {
                    udata._agent_less = "true";
                }
                if (cxwPostAct["callback"]) {
                    udata["wiz_story_post_actions"] = cxwPostAct["callback"];
                }
                if (cxwSubj["callback"]) {
                    oChatConfig.userData.subject = cxwSubj["callback"];
                }

                udata =  $.extend(udata, cxwData);
                oWCC.command("CallbackService.configure", {"userData": udata});

                // Email Configuration ----------------
                udata = {};
                udata =  $.extend(udata, cxwData);
                if (cxwPostAct["email"]) {
                    udata["wiz_story_post_actions"] = cxwPostAct["email"];
                }
                if (cxwSubj["email"]) {
                    oChatConfig.userData.subject = cxwSubj["email"];
                }
                oWCC.command("SendMessageService.configure", {"userData": udata});

                // Video configuration ------------------    
                videoData = {};
                if (cxwPostAct["vidyo"]) {
                   videoData["wiz_story_post_actions"] = cxwPostAct["vidyo"];
                }
                if (cxwSubj["vidyo"]) {
                    videoData.subject = cxwSubj["vidyo"];
                }
                videoData =  $.extend(videoData, cxwData);

                // remove '"' tp w/a vidyo server 500 error on dbl quotes
                $.each(videoData, function (key, val) {
                    videoData[key] = videoData[key].replace(/\'/g, " ").replace(/\"/g, "'");
                });

            });        
	        if (typeof oWizard.ready == 'function') {  // available and required since 9.0.004.03
	            oWizard.ready();
	        }
        }

        if (CXW_ENABLED) {
            $('head').append('<link rel="stylesheet" type="text/css" href="https://app.genesys.cloud/widgets/'+CXW_VERSION+'/widgets.min.css">');
            (function(d, s, id, o){var f = function(){var fs = d.getElementsByTagName(s)[0], e;
                if (d.getElementById(id)) return;e = d.createElement(s);
                e.id = id;e.src = o.src;fs.parentNode.insertBefore(e, fs);},ol = window.onload;
            if(o.onload){typeof window.onload != "function"?window.onload=f:window.onload=function(){ol();f();}}else {f();};})
            (document,'script','genesys-cx-widget', {src: 'https://app.genesys.cloud/widgets/'+CXW_VERSION+'/widgets.min.js'});
        }   

    };  // end of initCfg()

    var _sidebarShow = function () {
        //oWCC.command("SideBar.open");
        $(".cx-sidebar").css("display", "block").show(200);
        console.log("[CXW] The sidebar is shown");
    };

    var _sidebarHide = function () {
        //oWCC.command("SideBar.close");
        $(".cx-sidebar").hide();
        console.log("[CXW] The sidebar is hidden");
    };

    var _prefillForm = function (isSubmit) {
        console.log('[CXW] prefilling the form');
        // custom form prefill
        $("[name='firstname'], #cx_webchat_form_firstname, #cx_firstname, #cx_sendmessage_form_firstname, #cx_form_callback_firstname, #cx_clicktocall_form_firstname")
                .val($.siteData.customer.local.FirstName || $.siteData.customer["customer.firstname"]);
        $("[name='lastname'], #cx_webchat_form_lastname, #cx_lastname, #cx_sendmessage_form_lastname, #cx_form_callback_lastname, #cx_clicktocall_form_lastname")
                .val($.siteData.customer.local.LastName || $.siteData.customer["customer.lastname"]);
        $("[name='email'], #cx_webchat_form_email, #cx_sendmessage_from, #cx_sendmessage_form_email, #cx_form_callback_email")
                .val($.siteData.customer.local.EmailAddress || $.siteData.customer["customer.email1"]);
        $("#cx_form_callback_phone_number, #cx_clicktocall_form_phonenumber")
                .val($.siteData.customer.local.PhoneNumber || $.siteData.customer["customer.customer_phone"]);
//        $("#cx_form_callback_subject").val("Web Callback");  // TODO - Subject
        $("#cx_webchat_form_subject").val($.siteData.settings.Subject || "Web Chat"); // TODO - Subject
        $("#cx_sendmessage_subject, #cx_sendmessage_form_subject").val($.siteData.settings.Subject || "Web Message"); 
        $.siteData.settings.Subject = null;

        if (widgetCX.isSubmit) {
            oWCC.command("ChatDeflection.disable");
            let submitButton = $(".cx-submit");
            if (submitButton[0]) {
                console.log('[CXW] AutoSubmitting Chat form');
                submitButton[0].click();
            }
        }
        widgetCX.isSubmit = false;
        
    };

    var _startIcarusChat = function(notSkip){
        
        if (! notSkip) return;

        widgetCX.isSubmit = true;
        $.siteData.settings.Subject = 'Car Insurance';

        // for new AC
        let uData = {occasion: "CarInsuranceProspect"}; // {url3:journeyUrl, viewname3:'ALTOCLOUD'}; 	
        uData["transcript_id"] = widgetCX.transcript_id;
        _startChat(uData);
        ac('record', 'button.clicked', 'agent-engagement', {}); 
        //

/*        
        let oRateOfferView = {
                type: "generic",
                title: "Car insurance?",
                body: 
                    "<table>"+
                        "<tr>"+
                            "<td>"+
                                "<img  style='padding:10px;' height='100px' width='100px' src='images/chatbot-01.png'/>&nbsp;&nbsp;"+
                            "</td>"+
                            "<td>"+
                                "<p>Hi "+ $.siteData.customer["customer.firstname"] +", I am Kate. I am happy to help you with your insurance research.</p>"+
                            "</td>"+
                        "</tr>"+
                    "</table>",
                icon: "chat",
                controls: "close",
                buttons: {
                    type: "binary",
                    primary: "Yes, Kate"
                }
            };
        let uData = {occasion: "CarInsuranceProspect"}; // {url3:journeyUrl, viewname3:'ALTOCLOUD'}; 	
        
        window._genesys.widgets.bus.command("Toaster.open", oRateOfferView).done(function(e2){
            $(e2.html).find(".cx-btn.cx-btn-default").hide();
            $(e2.html).find(".cx-btn.cx-btn-primary").click(function(){				
                window._genesys.widgets.bus.command("Toaster.close").done(function(){
                    uData["transcript_id"] = widgetCX.transcript_id;
                    _startChat(uData);
                });
                ac('record', 'button.clicked', 'agent-engagement', {}); 
            });
        });
*/        
        
    };
    
    var _startChat = function (customData) { // start from OLD menu

        if (! window._genesys.widgets.bus) {
            return; // not inited yet
        }
        oChatConfig.userData = $.extend(true, {}, customData, gweCfg);

        // check if route to chatbot
        if (false) {
            oChatConfig.dataURL = CHAT_URL + CHATBOT_SERVICE;
        }
        else {
            oChatConfig.dataURL = CHAT_URL + DEFAULT_SERVICE;
        }

        // deflection
        if(true) oWCC.command("ChatDeflection.enable");
        else oWCC.command("ChatDeflection.disable");

        console.log("[CXW] Menu Chat Config - " + JSON.stringify(oChatConfig, null, 4));

        oWCC.command("WebChatService.configure", oChatConfig);
        oWCC.command("WebChat.open", {userData: oChatConfig.userData});
    };

    var _invitePopup = function () {
        oWCC.command("ChatDeflection.disable"); // disable deflection for Invites
        oWCC.command("WebChat.invite");
    };

    var _generateVidyoFrameSrc = function(guestLink){
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);        
        var vidyoSrc = "";
        var webRtcUrl = "https://apps.vidyocloud.com/ve4genesys/simple/index.html";
        var vidyoWebUrl = "https://apps.vidyocloud.com/ve4genesys/dual/index.html";
        var vidUrl = isChrome? webRtcUrl: vidyoWebUrl;
        var firstName = $.siteData.customer.firstName;
        
        vidyoSrc = 
            webRtcUrl + "?portalUri=" +
            guestLink.replace('?', '&') + "&guestName=" + firstName;

        return vidyoSrc;
    }

    var _addChatButton = function () {
        oWCC.command("CXSideBar.addButton", {
                button: {
                    name: cxw_i18n[locale].webchat.ChatTitle,
                    //title: "Chat with a representative",
                    icon: "cx-img-map chat",
                    class: "cx-webchat"
                }
            })
            .done(function (e) {
                oWCC.subscribe(e.event, function (e) {
                    _sidebarHide();
                    // _showCustomForm();
                });
            })
            .fail(function (e) {
                console.log("[CXW] CXSideBar.addButton:fail : " + (e.error || "Unknown Error"));
                _sidebarShow();

            });

        // oWCC.command("CXSideBar.open");
    };

    var _setFooter = function () {
        // $(".cx-powered-by").html("<img src='http://epic-tm.live.genesys.com/iisEpic/cxw/logo.png'></img>");
    };
	
    var _setChatUrl = function (url) {
        CHAT_URL = url;
        oChatConfig.dataURL = CHAT_URL + DEFAULT_SERVICE; // if CHAT_URL was redefined in custom.js     
    };

    var _setoWCC = function (bus) {
        oWCC = bus;
    };

    var _getVideoData = function(){
        return $.extend(true, {demoID: $.siteData.settings.template, PFS_id: $.siteData.customer["customer.customer_phone"]}, videoData);
    };

    var _setCustomData = function (udata) {
            oChatConfig.userData = $.extend(true, oChatConfig.userData, udata);
    };

    var _cfgWidget = function(){
        oWCC.command("Wizard.configure");
    };

    var _startVidyo = function(url){
          setTimeout(function(){
            window.open(widgetCX.generateVidyoFrameSrc("https://genesys.api.vidyocloud.com&" + url), '_blank', "height=600, width=800, top=300, left=300, scrollbars=0")
          }, 200);
/*                  window._genesys.widgets.bus.command("Overlay.open", {html: '<strong>YAHOO!!!</strong>', immutable: true})
              .fail(function(text){console.log('FAIL - ' +text);})
              .done(function(text){console.log('DONE - ' +text);}); 
*/
    };

    var _startVidyoSandbox = function(url){
        window.open("http://Genesys.sandboxga.vidyo.com" + url, '_blank')
    };

    var _isActivated = function(){
        return isActive;
    };

    var _setActive = function(){
        isActive = true;
    };

    var _search = function(text){
        setTimeout(function(){oWCC.command("Search.open", {query: text});}, 300);
        if (text.toLowerCase().indexOf("car") >= 0) {
            ac('record', 'button_clicked', {label: 'car-search'}); 
            //setTimeout(()=>{window.widgetCX.startIcarusChat(true);}, 5000);
        }
    };

    var _updateGweData = function(callback){
        _gt.push(['getIDs', function(IDs) {
            console.log('[CXW] GWE IDs: ', JSON.stringify(IDs)); // getting GWE IDs
            $.extend(gweCfg, IDs);
            if (callback) callback();
        }]);
    };
    var _openCallback = function(){
        if ($.siteData.authenticated) {
            oWCC.command('Callback.open');
        }
        else {
            demoProcess.loginAlert();
        }
    };

    var _requestVidyo = function(){
        if ($.siteData.authenticated) {
            oWCC.command('Vidyo.open');
        }
        else {
            demoProcess.loginAlert();
        }
    };

    var _sendChatMessage = function (msg, e) { 

        if (! window._genesys.widgets.bus) {
            return; // not inited yet
        }

        oWCC.command('WebChatService.sendMessage', {message: msg});
        $(e).removeClass('cx-btn-default');
        $(e).addClass('cx-btn-primary');
        $(e).removeClass('data-chat-menu');
        $(e).addClass('data-chat-menu-selected');
        $("[data-chat-menu]").prop('disabled', true);
    }

   // public interface
    oPublished = {
        openCallback: _openCallback,
        updateGweData: _updateGweData,
        getVideoData: _getVideoData,
        setActive: _setActive,
        setoWCC: _setoWCC,
        isActivated: _isActivated,
        initCfg: _initCfg,
        sidebarShow: _sidebarShow,
        sidebarHide: _sidebarHide, 
        startChat: _startChat,
        invitePopup: _invitePopup,
		setChatUrl: _setChatUrl,
        setCustomData: _setCustomData,
        generateVidyoFrameSrc: _generateVidyoFrameSrc,
        cfgWidget: _cfgWidget,
        requestVidyo: _requestVidyo,
        startVidyo: _startVidyo,
        startVidyoSandbox: _startVidyoSandbox,
        search: _search,
        startIcarusChat: _startIcarusChat,
        sendChatMessage: _sendChatMessage
    };

    return oPublished;

})();

$.getScript( "//demo.genesyslab.com/gdemo_mobile/web/v2/js/cx-speechstorm.js" );

console.log('[CXW] init done');

//<!-- CXW script END --------------  -->

//<!-- VIDYO part starts -->

var _gv = _gv || {};

_gv.api = (function (window) {
    var jQ;
    var stompClient;
    var kvp;
    var cbOnSuccess;
    var cbOnError;
    var isReady = false;
    function init() {
        log("init()");
        initJQueryAsync(function ($) {
            jQ = $;
            log("init() jQuery has been loaded");
            loadJSResource(VIDYO_FILES + "/scripts/sockjs-0.3.4.min.js", function () {
                log("init() sockjs has been loaded");
                loadJSResource(VIDYO_FILES + "/scripts/stomp.min.js", function () {
                    log("init() stomp has been loaded");
                    isReady = true;
                });
            });
        });
    }
    function initJQueryAsync(initJQueryCallback) {
        if (window.jQuery) {
            initJQueryCallback(window.jQuery);
        } else {
            if (window.$) {
                initJQueryCallback(window.$);
            } else {
                loadJSResource(VIDYO_FILES + "/scripts/jquery.min.js", function () {
                    if (window.jQuery) {
                        initJQueryCallback(window.jQuery);
                    } else {
                        if (window.$) {
                            initJQueryCallback(window.$);
                        } else {
                            error("Failed to load jQuery");
                        }
                    }
                });
            }
        }
    }
    function loadJSResource(url, callback) {
        var script = window.document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    if (callback) {
                        callback();
                        callback = undefined;
                    }
                }
            };
        } else {
            script.onload = function () {
                if (callback) {
                    callback();
                    callback = undefined;
                }
            };
        }
        script.src = url;
        window.document.getElementsByTagName("head")[0].appendChild(script);
    }
    function callCbOnError(err) {
        if (cbOnError) {
            if (err && err.responseJSON) {
                cbOnError(err.responseJSON);
            } else {
                if (err && err.body) {
                    try {
                        cbOnError(jQ.parseJSON(err.body));
                    } catch (e) {
                        cbOnError(err.body);
                    }
                } else {
                    cbOnError(err);
                }
            }
        }
        disconnect();
    }
    function callCbOnSuccess(obj) {
        if (cbOnSuccess) {
            if (obj && obj.responseJSON) {
                cbOnSuccess(obj.responseJSON);
            } else {
                if (obj && obj.body) {
                    try {
                        cbOnSuccess(jQ.parseJSON(obj.body));
                    } catch (e) {
                        cbOnSuccess(obj.body);
                    }
                } else {
                    cbOnSuccess(obj);
                }
            }
        }
        disconnect();
    }
    function getServiceId() {
        jQ.ajax({
            contentType : "application/json",
            type : "POST",
            url : window._gv.config.serverUrl + "/service/click-to-vidyo",
            data : JSON.stringify(kvp),
            timeout : 600000,
            async : true,
            success : function (resp) {
                try {
                    log(resp);
                    if (resp && resp.id) {
                        connect(resp.id);
                    } else {
                        callCbOnError(resp);
                    }
                } catch (e) {
                    error(e);
                }
            },
            error : function (err) {
                error(err);
                callCbOnError(err);
            }
        });
    }
    function connect(id) {
        try {
            disconnect();
        } catch (e) {
            error(e);
        }
        var socket = new SockJS(window._gv.config.serverUrl + "/ws/service");
        console.log(JSON.stringify(socket));
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            log("Connected: " + frame);
            stompClient.subscribe("/user/queues/errors", function (obj) {
                error(obj);
                callCbOnError(obj);
            });
            stompClient.subscribe("/user/queue/service/" + id + "/guestLink", function (obj) {
                log(obj);
                callCbOnSuccess(obj);
            });
            sendGuestLinkReq(id);
        }, function (frame) {
            error("Websocket connection error. Fallback to polling...");
            try {
                disconnect();
            } catch (e) {
                error(e);
            }
            poll(id);
        });
    }
    function disconnect() {
        if (stompClient != null) {
            try {
                stompClient.disconnect();
            } catch (e) {
                error(e);
            }
        }
        log("Disconnected");
    }
    function sendGuestLinkReq(id) {
        stompClient.send("/vidyo/service/" + id + "/guestLink", {}, {});
    }
    function poll(id) {
        jQ.ajax({
            type : "GET",
            url : window._gv.config.serverUrl + "/service/" + id + "/guestLink",
            async : true,
            timeout : 600000,
            success : function (resp) {
                callCbOnSuccess(resp);
            },
            error : function (err) {
                callCbOnError(err);
            }
        });
    }
    function log(message) {
        console.log(message);
    }
    function error(msgObj) {
        try {
            if (msgObj && msgObj.responseJSON && msgObj.responseJSON.message) {
                log("ERROR: " + msgObj.responseJSON.message);
            } else {
                log("ERROR: " + msgObj);
            }
        } catch (e) {
            log("ERROR: " + msgObj);
        }
    }
    init();
    return {
        clickToVidyo : function (data, onSuccess, onError) {
            kvp = data;
            cbOnSuccess = onSuccess;
            cbOnError = onError;
            if (isReady) {
                getServiceId();
            } else {
                var s = "Not ready - required libraries not loaded yet";
                error(s);
                if (onError) {
                    onError({
                        message : s
                    });
                }
            }
        }
    };
})(window);

function initGV() {
    
    var oLookingView = {
        type: "generic",
        title: "Video Chat",
        body: "Connecting to an agent...",
        icon: "videochat",
        controls: "close",
        buttons: {}
    };
    var oErrorView = {
        type: "generic",
        title: "Video Chat",
        body: "We are sorry, <br>we could not find an available agent",
        icon: "videochat",
        controls: "close",
        buttons: {}
    };
    var oConnectingView = {
        type: "generic",
        title: "Video Chat",
        body: "Agent is Ready! <br>Please press Connect button to start video chat!",
        icon: "videochat",
        controls: "close",
        buttons: {
            type: "binary",
            primary: "Connect",
        }
    };
    window._genesys.cxwidget.bus.command("Toaster.open", oLookingView);
    
    _gv.api.clickToVidyo(
        widgetCX.getVideoData(),  // TODO
        // on success
        function(resp) {
            var lnk = '';
            try{
                var obj2 = eval('('+resp.guestLink+')')
                lnk = obj2.url+'&key='+obj2.key;
            }catch(e){
                //alert('Sorry, the video chat cannot be opened at the moment!');
                console.log("Vidyo Failed: " + JSON.stringify(e, null, 4));
                window._genesys.cxwidget.bus.command("Toaster.close");
                window._genesys.cxwidget.bus.command("Toaster.open", oErrorView);

            }
            if(lnk != ''){
                //alert('Now you can join the video chat!');
                window._genesys.cxwidget.bus.command("Toaster.open", oConnectingView).done(function(e2){
                    $(e2.html).find(".cx-btn.cx-btn-default").hide();
                    $(e2.html).find(".cx-btn.cx-btn-primary").click(function(){
                        widgetCX.startVidyo(lnk.substr(35));
                        //window.open(lnk, '_blank');
                        window._genesys.cxwidget.bus.command("Toaster.close");
                    });
                });

            }else{
                //alert('Sorry, we could not find an available agent!');
                window._genesys.cxwidget.bus.command("Toaster.close");
                window._genesys.cxwidget.bus.command("Toaster.open", oErrorView);
                console.log("Vidyo: Unable to set up a video conference at this time. Please try again later.");
            }
        },
        // on error
        function(resp) {
            if(resp.message != undefined) {
                console.log("Vidyo: Failed: " + resp.message);
                //alert("Vidyo: Failed: " + resp.message);
                window._genesys.cxwidget.bus.command("Toaster.close");
                window._genesys.cxwidget.bus.command("Toaster.open", oErrorView);
            }
            else {
                console.log("Vidyo: Service response: " + resp.statusText + " (" + resp.status + ")");
                //alert("Vidyo: Service response: " + resp.statusText + " (" + resp.status + ")");
                window._genesys.cxwidget.bus.command("Toaster.close");
                window._genesys.cxwidget.bus.command("Toaster.open", oErrorView);
            }
    });

}

// <!-- VIDYO part ends -->

// load widget if session exists
$(document).ready(function (){
    if ($.siteData.authenticated) {
        if ($.siteData.settings['platform'] === 'purecloud') {
            // gsolUser.login('arnaud.lejeune@genesys.com')
            var gsolUser = new gsol.User();
            gsolUser.login('arnaud.lejeune@simdomain.com')
        } else {
            widgetCX.initCfg();
        }
    }
});



