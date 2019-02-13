// SMART TAG - Proactive Chat/Callback Pop-Up

// To trigger a PureEngage Chat, create an AltoCloud Action Map of type Chat with the following 2 boxes checked:
// Allow customers to leave a message when agents are offline?
// Override Altocloud default rendering?

// To trigger a PureEngage Callback, create an AltoCloud Action Map of type Chat with the following 3 boxes checked:
// Allow customers to leave a message when agents are offline?
// Override Altocloud default rendering?
// Allow customers to see message history?

try {

    console.log('[GTS - altocloud] Smart Tag - Purecloud Proactive Engagement');
    
    var max_chat_invites=1;
    var chat_no_invites_period_minutes=3;
    
    let oChatOfferView = {
		type: "generic",
		title: "Looking for info?",
		body: "An agent can help you if you have some questions about your favorite goodies?",
		icon: "chat",
		controls: "close",
		buttons: {
			type: "binary",
			primary: "Chat with an agent"
		}
	};
	
	let oCallbackOfferView = {
		type: "generic",
		title: "Looking for info?",
		body: "An agent can call you back as soon as possible?",
		icon: "callback",
		controls: "close",
		buttons: {
			type: "binary",
			primary: "Do you want a callback"
		}
	};
    
    function proactivePureCloudInvite(visit, engagementChannel, actionId) {
        if (engagementChannel=='chat') {
            console.log('[GTS - altocloud] AltoCloud Proactive Webchat for visit=', visit);
            window._genesys.widgets.bus.command("Toaster.open", oChatOfferView).done(function(e2){
    				$(e2.html).find(".cx-btn.cx-btn-default").hide();
    				$(e2.html).find(".cx-btn.cx-btn-primary").click(function(){				
    					window._genesys.widgets.bus.command("Toaster.close").done(function(){
    						window._genesys.widgets.bus.command('WebChat.open')
    					});
    					ac('record', 'button.clicked', 'webchat-engagement', {}); 
    				});
    			});
            
        } else {
            // Callback engagement
            console.log('[GTS - altocloud] AltoCloud Proactive Callback for visit=', visit);
            window._genesys.widgets.bus.command("Toaster.open", oCallbackOfferView).done(function(e2){
    				$(e2.html).find(".cx-btn.cx-btn-default").hide();
    				$(e2.html).find(".cx-btn.cx-btn-primary").click(function(){				
    					window._genesys.widgets.bus.command("Toaster.close").done(function(){
    						window._genesys.widgets.bus.command('Callback.open')
    					});
    					ac('record', 'button.clicked', 'callback-engagement', {}); 
    				});
    		});
        }
    }
    
    
    
    ac('on', 'actions:updated', function (actions) {
        console.log('[GTS - altocloud] Purecloud Proactive Engagement Triggered');
    	ac('api.visit.get',function(visit) {
            //console.log('[GTS - altocloud] AltoCloud Proactive Chat popped up...visit='+JSON.stringify(visit)+' actions='+JSON.stringify(actions));
            if (actions.interaction) {
                if (actions.interaction.category=='im' && actions.interaction.skipRender) {
                    var engagementChannel = 'chat';
                    if (actions.interaction.allowHistory)
                        engagementChannel='callback';
                    if (typeof(gsolAltocloud.readCookie)==='function') {
                        var _gsol_chat_invites = gsolAltocloud.readCookie("_gsol_chat_invites", false, false);
                        _gsol_chat_invites=(!_gsol_chat_invites) ? 0 : parseInt(_gsol_chat_invites);
                        if (_gsol_chat_invites++<max_chat_invites) {
                            proactivePureCloudInvite(visit, engagementChannel, actions.interaction.id);
                            gsolAltocloud.createCookie(/\..*/.exec(location.host)[0], "_gsol_chat_invites", _gsol_chat_invites, false, false, chat_no_invites_period_minutes, 'minutes');
                        } else {
                            console.log('[GTS - altocloud] AltoCloud Proactive Chat - Reached '+max_chat_invites+' invites - blocking invites for '+chat_no_invites_period_minutes+' minutes...');
                        }
                    } else {
                                console.log('[GTS - altocloud] AltoCloud Proactive Chat - Outside of GSol environment...');
                                proactivePureCloudInvite(visit, engagementChannel, actions.interaction.id);
                    }
                } else
                        console.log('[GTS - altocloud] AltoCloud Proactive Chat - No interaction identified!');
                    
            }
        });
    });
} 
catch(error) {
    console.error('[GTS - altocloud] Altocloud Smart Tag - Purecloud Webchat Error:',error);
}

