

    if(!window._genesys)window._genesys = {cxwidget:{ main: { debug:true }}};  // Had to add the 'main' object to this to turn on debug

    window._genesys.widgets = window._genesys.widgets||{};
    window._genesys.widgets.extensions = window._genesys.widgets.extensions||{};
    
    window._genesys.widgets.extensions["Fish"] = function($, CXBus, CXCommon){  // Change Fish to something else


        var oFish = CXBus.registerPlugin("Fish");  // Change this to what's in line 11.  Creates a namespace

        if(oFish){

            //$('#mybutton').click(function() { oFish.command("open") });

            oFish.registerEvents(["opened", "ready"]);
            
            oFish.fish = new Object();
            oFish.fish.domain = window.location.protocol + '//' + window.location.host;

            oFish.registerCommand("close", function(e1) {

                var iframey = document.getElementById('speechstorm_visual_ivr_iframe');
                // Tell the Visual Call that we're shutting down
                //iframey.contentWindow.submitOutputPath("hangup")
                
                iframey.contentWindow.postMessage('microapp:hangup', oFish.fish.domain);
                
                
                oFish.command("Overlay.close");
            });


            oFish.registerCommand("open", function(e1) {
                // Define logic here - look at the source code for how this works.

                //oFish.command("Commands");  // Log all available commands to console
                //oFish.command("Events");   // Same for events :)  Works with any plugin in the project

                // Remember to tell the CXBus about any custom events that we have defined:
                // 	    oWebChat.registerEvents(["ready", "opened", "closed", "minimized", "unminimized"]);

                // TODO - check if overlay is already open via a flag - see cx-webchat
                /*
                    if(bOpen){

    	            e.deferred.reject("already opened");

        	        }else{
                    ...
                */
                
            	var iAppID = e1.data.appID;
                console.log("Opening Visual IVR app ID " + iAppID);

                oFish.command("Overlay.open", {

                    html: CXCommon.Generate.Container({

                        type: "overlay",
                        title: "Visual Call",
                        body: '<iframe id="speechstorm_visual_ivr_iframe" style="border:none" width="400px" height="400px" src="https://sko-speechstorm.live.genesys.com/fish-visual-ivr/VisualCall.jsp?IsTestCall=true&id=' + encodeURIComponent(iAppID) + '&CLI=Visual&domain=' + encodeURIComponent(oFish.fish.domain) + '"></iframe>',
						
						//*** CONNO MULTI MODAL SERVER
						// body: '<iframe id="speechstorm_visual_ivr_iframe" style="border:none" width="400px" height="400px" src="http://demosrv:9991/#/start/' + encodeURIComponent(iAppID) +'"></iframe>',
						
                        icon: "cx-img-map preset-blue px32 star",
                        controls: "close",
                        xbuttons: {

                            type: "binary",
                            primary: "Accept",
                            secondary: "Reject"
                        }
                    }),
                    immutable: false    // If false, when another plugin opens an overlay it closes yours. If true, no other overlays can be opened.

                }).done(function(e2){  // Only need 'done' here if the command you're calling returns data that you're interested in (or
                                       // you want to know if it's completed.  Also can call fail())

                    if(e2.html){

                        // Process HTML inside of toaster view
                    	e2.html.find('.cx-titlebar').addClass('cx-speechstorm');
                    	e2.html.find('.cx-body').addClass('cx-speechstorm');
                    	e2.html.find('.cx-footer').addClass('cx-speechstorm');
                    	e2.html.addClass('cx-speechstorm');
                    	                    	
                    	
                    	
                        // Tell other components on the bus that we've opened successfully
                        e1.deferred.resolve(); // MO changed this from resolved() to resolve()
                        oFish.publish("opened");


                        e2.html.find(".btn-primary").click(function(){

                            // When Accept button is pressed

                            oFish.command("Overlay.close");
                        });

                        e2.html.find(".btn-default").click(function(){

                            // When Reject button is pressed

                            oFish.command("Overlay.close");
                        });

                        e2.html.find(".cx-button-close").click(function(){

                            // When Overlay’s X (close) button is clicked

                            oFish.command("close");
                        });
                    }
                });  // Could add '.fail(...)' here too
            });

            
            oFish.fishMessageListener = function(msg_p)
    		{
    			// TODO - check if msg_p.origin = 'http://bel-morr-m.us.int.genesyslab.com'
    			console.log("Received message: " + msg_p.data);
    			
    			if (/^microapp:progress:block:/.test(msg_p.data))
    			{
    				console.log("Got output progress: " + msg_p.data);
    				oFish.sendSecretMessageToAgent(msg_p.data, /^microapp:.*/);
    			}
    			else if (/^microapp:progress:ended$/.test(msg_p.data))
    			{
    				console.log("Got output progress: " + msg_p.data);
    				oFish.sendSecretMessageToAgent(msg_p.data, /^microapp:.*/); 

					setTimeout(function() {	window._genesys.widgets.bus.command("Fish.close"); }, 2000);
    			}
    			else
				{
    				console.log("Received unknown postMessage: " + msg_p.data);
				}
    		}
    		
            
            oFish.sendSecretMessageToAgent = function(sText_p, sRegex_p)
            {
            	var widgetBus = window._genesys.widgets.bus;
            	
            	widgetBus.command("WebChatService.sendFilteredMessage", { message: sText_p, regex: sRegex_p}
            	).done(function(e) {
            		console.log("Successfully sent filtered message: " + sText_p);
            	}).fail(function(e) {
            		console.log("Failed to send filtered message: " + sText_p + ": " + e);
            	});
            }
    		
    		if (window.addEventListener)
    		{
    		  	addEventListener("message", oFish.fishMessageListener, false)
    		} 
    		else 
    		{
    		  	attachEvent("onmessage", oFish.fishMessageListener)
    		}
            
            var widgetBus = window._genesys.widgets.bus;

    		
    		widgetBus.subscribe("cx.plugin.WebChat.ready", function(){
                console.log("MOTEST The WebChat plugin is 'ready'");
            });
            
    		
    		
    		widgetBus.subscribe("cx.plugin.WebChatService.started", function(e) {

            	window._genesys.widgets.bus.command("WebChatService.addPrefilter", { filters: [/^microapp:\/\//] })
                	.done(function(e){
                		console.log('Successfully registered prefilter:');
                		console.log(e);
                	}).fail(function (e) {
                		console.log("FAILED!!!  " + e);
                	});
            
            });
            
            
            
    		widgetBus.subscribe("cx.plugin.WebChatService.messageReceived", function(details){
                console.log("MOTEST Message receivied!");
                
                var isAlreadyOpened = false;
                
                for (i=0; i < details.data.originalMessages.length; i++)
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
                        		// URL will be in form "microapp://app/<appid>" or
                        		// "microapp://app/<appid>/<appdescription>"
                        		//
                        		var sUrlDetails = msg.text.substring(PROTOCOL_PREFIX.length);
                        		var sAppID = sUrlDetails.split(/\//)[0]; 
                        		
                            	window._genesys.widgets.bus.command("Fish.open", { appID: sAppID }).done(function(e){
                        			console.log('MOTEST successfully sent the visual IVR open request for app ID ' + sAppID);
                        		}).fail(function(e){
                        			// failure scenario: error, exception, improper arguments
                        			alert('Error!  ' + e);
                        		})	;
                        	}
                       	}
                    }
                }
            });


        
            oFish.publish("ready");  // Tell the bus that we've initialised successfully (but not opened yet)
        }
    };


