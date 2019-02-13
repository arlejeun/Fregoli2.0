$(".gcb-chat-systemMessage").DOMNodeAppear(function() {
    systmsg = $(".gcb-chat-systemMessage").last().text().trim();
    console.log("Stef: systemMessage appeared message="+systmsg);
    if (systmsg.indexOf("has joined the session")!=-1) {
        //Agent just joined
        agtName = systmsg.replace("Representative ","").replace(" has joined the session","");
        agtFirstName = agtName.substring(0, agtName.indexOf(" "));
        // Display Call Buttons:
        // V1
        // document.getElementById("videoTitle").textContent = "You can now talk with "+agtFirstName;
        //$("#genesys_video").css("visibility", "inherit");

        // V2
        // Add Video buttons if not existing:
        console.log("Stef: videochat-buttons="+$(".videochat-buttons"));
        if ($(".videochat-buttons").length <= 0) {
            console.log("Stef: Adding videochat-buttons");
            myDiv='<div class="videochat-branding-top" style="display: flex;align-items: center;">';
            $(".gcb-chat-body").prepend(myDiv);
            $(".gcb-chat-branding").prependTo(".videochat-branding-top");

            myDiv='<div class="videochat-buttons" style="margin-top: 10px;margin-left: 10px;">';
            myButton1='<button class="videochat-button-voice" style="background-color: #e3b33b;color: white;border: none; margin-right: 15px">+Voice</button>';
            myButton2='<button class="videochat-button-video" style="background-color: #e3b33b;color: white;border: none;">+Video</button>';


            $(".videochat-branding-top").append(myDiv)
            $(".videochat-buttons").append(myButton1)
            $(".videochat-buttons").append(myButton2)

            $(".videochat-button-voice").click(function(){
                window.open('https://video2-tm.live.genesys.com/user/demo/sdki.html?service=saypage&amp;type=VOICE&amp;forceFlash=false&amp;destination=sip:8017@199.79.227.147&amp;arg1=X-Genesys-PFS_id%3D<%=getSessionField("customer_phone",session)%>%26X-__Genesys-ExternalId%3D' + getCookie('GenesysVideo'),'genesys'+'%26X-Genesys-VideoMode%3DChat2VideoEscalation','directories=no,titlebar=no,toolbar=yes,location=no,status=no,menubar=yes,scrollbars=no,resizable=yes,left=660,top=120,width=540,height=520');
            });

            $(".videochat-button-video").click(function(){
                window.open('https://video2-tm.live.genesys.com/user/demo/sdki.html?service=saypage&amp;type=VIDEO&amp;forceFlash=false&amp;destination=sip:8017@199.79.227.147&amp;arg1=X-Genesys-PFS_id%3D<%=getSessionField("customer_phone",session)%>%26X-__Genesys-ExternalId%3D' + getCookie('GenesysVideo'),'genesys'+'%26X-Genesys-VideoMode%3DChat2VideoEscalation','directories=no,titlebar=no,toolbar=yes,location=no,status=no,menubar=yes,scrollbars=no,resizable=yes,left=660,top=120,width=540,height=520');
            });
        } else {
            $(".videochat-buttons").css("visibility", "inherit");
        }
    } else if (systmsg.indexOf("has left the session")!=-1) {
        $(".videochat-buttons").css("visibility", "hidden");
    }
});
