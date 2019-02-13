if (!window.external) window.external = {};
if (!window.name) window.name = '';
if (!window._genesys) window._genesys = {};
if (!window._gt) window._gt = [];

// var sServer = "http://fce-w0026.us.int.genesyslab.com";
var sServer = "http://fce-cw0060";       // http://fce-w0060:8090/ui/ad/v1/index.html    a1001/ no password


var webchat_validation = function(e, ndWrapper, ndInput, ndLabel, $, CXBus, Common){

    if(ndInput && ndInput.val())return true;

    return false
};



window._genesys.widgets = {

    main: {

        debug: true,
        theme: "light",
        themes: {

            dark: "cx-theme-dark",
            light: "cx-theme-light",
            blue: "cx-theme-blue",
            red: "cx-theme-red"
        },
        //i18n: "i18n.json",
        lang: "en",
        customStylesheetID: "genesys_widgets_custom",

        // downloadGoogleFont: true,
        //mobileMode: false,
        mobileModeBreakpoint: 600
    },

    extensions: {

        // LoadWebChat: "extensions/LoadWebChat.ext.js",
        // NeedHelp: "extensions/NeedHelp.ext.js",
        // ProactiveInvite: "extensions/ProactiveInvite.ext.js",
        // EventLifeCycleTest: "extensions/EventLifeCycleTest.ext.js",
        // WidgetLauncher: "extensions/WidgetLauncher.ext.js",
        // WebChatCustomFormDemo: "extensions/WebChatCustomFormDemo.ext.js"
        // PureWebChatTransport: "extensions/PureWebChatTransport.ext.js"
    },

    sidebar: {

        channels: [
            {name: "ChannelSelector"}
        ]
    },

    webchat: {

        // dataURL: "https://staging-genesys-prod.apigee.net/gms-chat/2/test-chat",
        // endpoint: "break",
        // apikey: "6SGPeMEI2BgW3dVsYhuknJ0ezITMe9aL",
        // dataURL: sServer + ":7777/genesys/2/chat/customer-support",
        dataURL: "http://fce-w0265:7777/genesys/2/chat/customer-support",
        // dataURL: "https://api.genesyscloud.com/gms-chat/2/customer-chat",
        // apikey: "LVmei1A1eZNv2o01pAzjWiqyDQSOOB85",

        // cometD: {
            
        //     enabled: true,
        //     cometURL: "http://172.24.135.142:8020/genesys/cometd",
        //     channel: "/service/chatV2/customer-support",
        //     apiURL: "http://172.24.135.142:8020/genesys/2/chat-ntf",
        //     websocketEnabled: true,
        //     logLevel: "debug"
        // },

        emojis: true,
        uploadsEnabled: true,
        charCountEnabled: true,

        transport: "PureWebChatTransport",

        proactive: {

            enabled: false,
            idleTimer: 5,
            cancelTimer: 30
        },
        // chatButton: {

        //     enabled: true,
        //     openDelay: 1000,
        //     effectDuration: 300,
        //     hideDuringInvite: true
        // },
        userData: {

            //"agent": "Chat_Test_01_2280"
        },

        // form: {

        //     wrapper: "<table>", // this is optional. It's <table> by default but this allows you to change what type of element the form will be inside.
        //     inputs: [

        //         {custom: "<tr><td colspan='2'><img src='img/banner002.jpg' style='width:100%'/></td></tr>"},

        //         {
        //             id: "cx_webchat_form_firstname", 
        //             name: "firstname", 
        //             type: "text",
        //             maxlength: "100",
        //             placeholder: "@i18n:webchat.ChatFormPlaceholderFirstName",
        //             label: "@i18n:webchat.ChatFormFirstName",

        //             validate: webchat_validation
        //         },

        //         {
        //             id: "cx_webchat_form_lastname", 
        //             name: "lastname", 
        //             type: "text",
        //             maxlength: "100",
        //             placeholder: "@i18n:webchat.ChatFormPlaceholderLastName",
        //             label: "@i18n:webchat.ChatFormLastName",

        //             validate: webchat_validation
        //         },

        //         {
        //             id: "cx_webchat_form_email", 
        //             name: "email", 
        //             type: "text",
        //             maxlength: "100",
        //             placeholder: "@i18n:webchat.ChatFormPlaceholderEmail",
        //             label: "@i18n:webchat.ChatFormEmail",

        //             validate: webchat_validation
        //         },

        //         {
        //             id: "cx_webchat_form_subject", 
        //             name: "subject", 
        //             type: "select",
        //             maxlength: "100",
        //             placeholder: "@i18n:webchat.ChatFormPlaceholderSubject",
        //             label: "@i18n:webchat.ChatFormSubject",

        //             options: [

        //                 {text: "Personal", group: true},
        //                 {text: "", value:""},
        //                 {text: "Account", value:"account"},
        //                 {text: "Billing", value:"billing"},
        //                 {text: "Credit Card", value:"credit card"},
        //                 {text: "General", group: true},
        //                 {text: "Warranty", value:"warranty"},
        //                 {text: "Return policy", value:"returns"},
        //             ],

        //             validate: webchat_validation
        //         },

        //         {
        //             id: "cx_webchat_form_message", 
        //             name: "message", 
        //             type: "textarea",
        //             placeholder: "Message here",

        //             validate: webchat_validation
        //         },

        //         {
        //             id: "cx_webchat_form_nickname", 
        //             name: "nickname", 
        //             value: "anonymous",
        //             type: "hidden",

        //             validate: webchat_validation
        //         },

        //         {
        //             id: "cx_webchat_form_check", 
        //             name: "check", 
        //             type: "checkbox",
        //             title: "@i18n:webchat.ChatEndQuestion",
        //             label: "@i18n:custom.Terms",

        //             // validate: webchat_validation
        //         },

        //         {
        //             custom: "<tr><td colspan='2' class='i18n' data-message='@i18n:custom.Disclaimer' style='font-size:12px'></td></tr>"
        //         }
        //     ]
        // }
    },

    callback: {

        dataURL: 'http://fce-w0026.us.int.genesyslab.com:8010/genesys/1/service/callback/samples',
        callDirection: 'USERTERMINATED',
        countryCodes: true,
        immediateCallback: true,
        scheduledCallback: false,
        ewt: {
            queue: "chat_ewt_test",
            immediateCallback: {

                thresholdMin: 10,
                thresholdMax: 3000
            }
        },
        userData: {}
    },

   
    callus: {

        contacts: [

            {displayName: "Schedule Now", i18n: "Number001", number: "+1866-308-4241" }
        ],
        hours: [
            "8am - 8pm Mon - Fri",
            "10am - 6pm Sat - Sun"
        ]
    },

    sendmessage: {

        dataURL: sServer + ":7777/genesys/2/email",
        apikey: "",
        // SendMessageButton: {enabled: true},
        userData: {

            testing: "ok",
            hoping: "please"
        }
    },

    calendar: {

        showAvailability: true, //default true
        numberOfDays: 6, // default 5

        calenderHours: {

            interval: 5, // default 15 minutes
            morning: {

                enable: true,
                openTime: '09:00', // default 08:00 AM
                closeTime: '11:59'
            },
            afternoon: {

                enable: true,
                openTime: '12:00',
                closeTime: '16:59'
            },
            evening: {

                enable: true,
                openTime: '17:00',
                closeTime: '23:59'
            }
        }
    },

    channelselector: {

        ewtRefreshInterval: 10,
        channels: [

            {enable: true, clickCommand: 'CallUs.open', readyEvent: 'CallUs.ready', displayName: 'Call Us', i18n: 'CallusTitle', icon: 'call-outgoing', html: ''},
            {enable: true, clickCommand: 'WebChat.open', readyEvent: 'WebChat.ready', displayName: 'Web Chat', i18n: 'ChatTitle', icon: 'chat', html: ''},
            {enable: true, clickCommand: 'SendMessage.open', readyEvent: 'SendMessage.ready', displayName: 'Send Message', i18n: 'EmailTitle', icon: 'email', html: ''},
            {enable: true, clickCommand: 'Callback.open', readyEvent: 'Callback.ready', displayName: 'Receive a Call', i18n: 'CallbackTitle', icon: 'call-incoming', html: ''}
        ]
    }
};

