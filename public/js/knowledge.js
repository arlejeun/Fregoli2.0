/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

var popupStatus = 1;
var topOffSet = 170;
var additionalData = {};

//loading popup with jQuery magic!
function loadPopup() {
    //loads popup only if it is disabled
	clearInterval(aTimer);
        jQuery("#backgroundPopup").css({
            "opacity": "0.7"
            //"opacity": "0"
        });
        jQuery("#backgroundPopup").fadeIn("slow");
        jQuery("#popupContact").fadeIn("slow");
        popupStatus = 1;
		setCookie('casanovaPopup', 'on', 1);
}

//disabling popup with jQuery magic!
function disablePopup() {
    //disables popup only if it is enabled
    if (popupStatus == 1) {
        jQuery("#backgroundPopup").fadeOut("slow");
        jQuery("#popupContact").fadeOut("slow");
        popupStatus = 0;
		//setCookie('casanovaPopup', 'off', 1);
    }
}

//centering popup
function centerHelp() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
// style='position: absolute; width: 1156px; height: 535px; top: 145px; left: 205px; border: medium none;'  740px; height: 580px
    var popupHeight = 580;
    var popupWidth = 740;
    //centering
	
    jQuery("#knowledgeQuestionArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });
    //only need force for IE6
}

function centerWait() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = 580;
    var popupWidth = 740;

    $("#imageloop").attr("src", "images/timer-watson.gif?" + Math.random());
	
    jQuery("#knowledgeWaitArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });
}

function centerWatson() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = 580;
    var popupWidth = 740;
	
    jQuery("#knowledgeWatsonArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });
}

function centerChat() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = 580;
    var popupWidth = 740;
	
    jQuery("#knowledgeChatArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });
}
function centerEvidence() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = 580;
    var popupWidth = 740;
    jQuery("#knowledgeEvidenceArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });
}

    var strReturn;
    var strError;
    var strQuestion='';
    var strAnswer='';
    var strPreQ='';
    var strPreA='';

function centerAnswer() {
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = 580;
    var popupWidth = 740;

    strPreQ = strQuestion;
    strQuestion = $('#q1').val();
// alert(strQuestion);
    $('h38').text(strQuestion);
	    strError = '';
	
	if (strQuestion.toUpperCase().indexOf('CANCEL') >= 0) {
		strReturn = {answer: 'Cancelation', skill:'Retention', title: 'agent', confidence: 90, link: 'Link'};
	} else if (strQuestion.toUpperCase().indexOf('CLOSE') >= 0) {
		strReturn = {answer: 'Closure', skill:'Retention', title: 'agent', confidence: 90, link: 'Link'};
	} else if (strQuestion.toUpperCase().indexOf('TRANSFER') >= 0) {
		strReturn = {answer: 'Transfer', skill:'Investments', title: 'agent', confidence: 90, link: 'Link'};
	} else if (strQuestion.toUpperCase().indexOf('OPEN') >= 0) {
		strReturn = {answer: 'Open', skill:'Sales', title: 'agent', confidence: 90, link: 'Link'};
	} else if (strQuestion.toUpperCase().indexOf('FEE') >= 0) {
		strReturn = {answer: 'Fee', skill:'Service', title: 'agent', confidence: 90, link: 'Link'};
	} else {
	
	if (1 == 0) { // Use Eliza
		strPreA = strAnswer;
			
		strAnswer = listen(strQuestion);
// alert(strAnswer);
		strReturn = {answer: strAnswer, title: strAnswer, confidence: 90, link: 'Link'};
		$('h22b').text(strAnswer);
	} else {
// alert('Getting answer');
$.ajax
({
  type: "POST",
  url: "/watson/question.aspx?vertical=banking",
  dataType: 'json',
  async:false,
  data: strQuestion,
//  headers: {
//	'Content-Type': 'application/json',
//	'X-SyncTimeout' : 30
//},
  error: function(XMLHttpRequest, textStatus, errorThrown){
	// alert(errorThrown);
	// alert(textStatus);
	// alert(XMLHttpRequest.responseText);
	strReturn = XMLHttpRequest.responseText;
	strError = XMLHttpRequest.responseText;

        console.debug(textStatus); console.debug(errorThrown);console.debug(XMLHttpRequest);
 },
  success: function (data){
      strReturn = data;
  }
})

.done(function( data ) {
      strReturn = data;
    });

 // alert(strReturn);
	// var obj = jQuery.parseJSON( strReturn );
	// alert( strReturn.title );
	}
	}
	$('h22b').text(strReturn.answer);
	$('h14rb').text (strReturn.title);
	strPreA = strAnswer;
	strAnswer = strReturn.answer;
	$('12l').text(strReturn.link);
	$('h14-3').text(strReturn.answer);
	var strFloor = Math.floor(strReturn.confidence * 100);
	
strFloor = '96';
   	$('#conf').text(strFloor + '%');
  // alert(strReturn.confidence);
	var strPng = 'confidence-75plus.png';
	if (strFloor >= 95) {
		strPng = 'confidence-95plus.png';
	} else if (strFloor >= 90) {
		strPng = 'confidence-90plus.png';
	} else if (strFloor >= 85) {
		strPng = 'confidence-85plus.png';
	} else if (strFloor >= 80) {
		strPng = 'confidence-80plus.png';
	} else if (strFloor >= 75) {
		strPng = 'confidence-75plus.png';
	} else if (strFloor >= 70) {
		strPng = 'confidence-70plus.png';
	} else if (strFloor >= 65) {
		strPng = 'confidence-65plus.png';
	}
	var strFull = 'images/' + strPng;
	$("#confpng").attr("src",strFull);

    jQuery("#knowledgeAnswerArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top":topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });			 
    jQuery("#knowledgeAgentArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });			 
    jQuery("#knowledgeErrorArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top": topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });			 
    jQuery("#knowledgeLinkArea").css({
        "position": "fixed",
	"width": 740, "height":500,
        "top":topOffSet,
        "left": windowWidth / 2 - popupWidth / 2
    });			 
}

//lower left popup
function lowerLeftPopup() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = jQuery("#popupContact").height();
    var popupWidth = jQuery("#popupContact").width();
    //centering
	
    jQuery("#popupContact").css({
        "position": "fixed",
        //"top": windowHeight / 2 - popupHeight / 2,
        "bottom": 250,
        "right": 100
    });
    //only need force for IE6

    jQuery("#backgroundPopup").css({
        "height": windowHeight
    });

}

var aTimer;
var aState;

//CONTROLLING EVENTS IN jQuery
jQuery(function(){
    //LOADING POPUP
//	lowerLeftPopup();
//	aTimer=setInterval(function(){loadPopup()},5000);

    //Press Escape event!
    jQuery(document).keypress(function(e) {
        if (e.keyCode == 27 && popupStatus == 1) {
            disablePopup();
        }
    });

});

function clearWait() {
    clearInterval(aTimer);
    jQuery("#knowledgeWaitArea").fadeOut("fast");
    centerAnswer();
    if ((strError.length > 0) || (strReturn.confidence < 0)) {
        jQuery("#knowledgeErrorArea").fadeIn("fast");
    } else 
	if (strReturn.title == 'agent') {
// alert('Skill is '+ strReturn.skill);
	if (strReturn.skill == 'Retention')
	    $('h45a').text("We have an account supervisor ready to assist you.");
	else if (strReturn.skill == 'Investments')
	    $('h45a').text("We have an transfer specialist ready to assist you.");
	else if (strReturn.skill == 'Sales')
	    $('h45a').text("We have a new account specialist ready to assist you.");
	else if (strReturn.skill == 'Service')
	    $('h45a').text("We have an services specialist ready to assist you.");
	else if (strReturn.skill == 'Upgrades')
	    $('h45a').text("We have an upgrade specialist ready to assist you.");
	strAnswer = 'Redirected to Agent Assist';
        jQuery("#knowledgeAgentArea").fadeIn("fast");
    } else {
        jQuery("#knowledgeAnswerArea").fadeIn("fast");
    }
}

//lower left popup
function answerBack() {
	clearInterval(aTimer);
        jQuery("#helpArea").fadeOut("fast");
	centerAnswer();
        jQuery("#knowledgeAnswerArea").fadeIn("fast");
//	aState = 3;
}

function isInSide(rPosX, rPosY,top,left,bottom,right) {
	if (((rPosX > top) && (rPosY > left)) && 
	    ((rPosX < bottom) && (rPosY < right))) {
		return true;
	} else {
		return false;
	}

}

$(document).ready(function(e) {
	
	$('#q1').keypress(function(e) {
		if(e.which == 13) {
			var strQ = $('#q1').val();
			if (strQ.length <= 0) {
				alert('Please type a question into the question box');
			} else {
				jQuery("#knowledgeQuestionArea").fadeOut("slow");
				centerWait();
				aTimer=setInterval(function(){clearWait()},3000);
				jQuery("#knowledgeWaitArea").fadeIn("slow");
			}		
		}
	});


    $('#askclose').click(function(e) {
	disablePopup();
    });   

    $('#askq').click(function(e) {
        	jQuery("#popupContact").fadeOut("slow");
		centerHelp();
        	jQuery("#knowledgeQuestionArea").fadeIn("slow");
		aState=3;
    });   

// Question DIV
    $('#knowledgeClose').click(function(e) {
        	jQuery("#knowledgeQuestionArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });   
    $('#knowledgeCancel').click(function(e) {
        	jQuery("#knowledgeQuestionArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });   
    $('#knowledgeGet').click(function(e) {
	var strQ = $('#q1').val();
	if (strQ.length <= 0) {
		alert('Please type a question into the question box');
	} else {
        	jQuery("#knowledgeQuestionArea").fadeOut("slow");
		centerWait();
		aTimer=setInterval(function(){clearWait()},3000);
        	jQuery("#knowledgeWaitArea").fadeIn("slow");
	}
    });   

// Wait DIV
    $('#knowledgeWaitClose').click(function(e) {
    	clearInterval(aTimer);
        jQuery("#knowledgeWaitArea").fadeOut("slow");
        jQuery("#backgroundPopup").fadeOut("slow");
    });   

// Answer DIV
    $('#knowledgeAnswerCancel').click(function(e) {
//alert('In Go Agent');
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
            $('#q1').val('');
            
            additionalData = {
            "watson_tealeaf": 'Car Loan', 
            "watson_website": 'Module Bank', 
            "watson_channel": "watson",
            "watson_skill": strReturn.skill, 
            "watson_preq": strPreQ, 
            "watson_prea": strPreA, 
            "watson_answer": strAnswer, 
            "watson_question": strQuestion, 
            "viewname": "WATSON", 
            "url1": "https://gbank.demo.genesys.com/watson/desktop.aspx?website=gbank&question=" + encodeURIComponent(strQuestion) + "&preq=" + 
                encodeURIComponent(strPreQ) + "&prea=" + encodeURIComponent(strPreA) + "&answer=" + encodeURIComponent(strAnswer) + "&page=calculator"
            };       

            //alert(JSON.stringify(additionalData));
            
            startChatSession();
            return false;
    });   
    $('#knowledgeAnswerClose').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });   
    $('#knowledgeAnswerCancel').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  
    $('#knowledgeAnswerGet').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
		$('#q1').val('');
		// centerHelp();
        	jQuery("#knowledgeQuestionArea").fadeIn("slow");
    });  
    $('#knowledgeAnswerWhere').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
		centerWatson();
        	jQuery("#knowledgeWatsonArea").fadeIn("slow");
    });  
    $('#knowledgeWhereLogo').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
		centerWatson();
        	jQuery("#knowledgeWatsonArea").fadeIn("slow");
    });  
    $('#knowledgeAnswerMoreTag').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
		centerEvidence();
        	jQuery("#knowledgeEvidenceArea").fadeIn("slow");
    });  
    $('#knowledgeAnswerMoreLink').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
		centerEvidence();
        	jQuery("#knowledgeLinkArea").fadeIn("slow");
    }); 
    $('#knowledgeAnswerUpsellLink').click(function(e) {
        	jQuery("#knowledgeAnswerArea").fadeOut("slow");
		window.location.replace("contactus.jsp?kc=0");
    }); 

// Watson DIV

    $('#knowledgeWatsonBack').click(function(e) {
        	jQuery("#knowledgeWatsonArea").fadeOut("slow");
		// centerHelp();
        	jQuery("#knowledgeAnswerArea").fadeIn("slow");
    });  
    $('#knowledgeWatsonClose').click(function(e) {
        	jQuery("#knowledgeWatsonArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  

// Evidence DIV

    $('#knowledgeEvidenceBack').click(function(e) {
        	jQuery("#knowledgeEvidenceArea").fadeOut("slow");
		// centerHelp();
        	jQuery("#knowledgeAnswerArea").fadeIn("slow");
    });  
    $('#knowledgeEvidenceClose').click(function(e) {
        	jQuery("#knowledgeEvidenceArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  


// Agent DIV

    $('#knowledgeGoQ').click(function(e) {
        	jQuery("#knowledgeAgentArea").fadeOut("slow");
		$('#q1').val('');
        	jQuery("#knowledgeQuestionArea").fadeIn("slow");
    });  
    $('#knowledgeAgentClose').click(function(e) {
        	jQuery("#knowledgeAgentArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  
    $('#knowledgeAgentCancel').click(function(e) {
        	jQuery("#knowledgeAgentArea").fadeOut("slow");
		$('#q1').val('');
       	jQuery("#knowledgeQuestionArea").fadeIn("slow");
    });  
    $('#knowledgeAgentGet').click(function(e) {
	var strData = '_tealeaf=' + encodeURIComponent('Car Loan') +  '&_website=' + encodeURIComponent('Module Bank') + '&_channel=watson&_skill=' +  encodeURIComponent(strReturn.skill) + '&_preq=' + encodeURIComponent(strPreQ) + '&_prea=' +  encodeURIComponent(strPreA) + '&_answer=' +  encodeURIComponent(strAnswer) + '&_question='+ encodeURIComponent(strQuestion) + '&page=Agent&phone=blue&level=5&_provide_code=false&location_lat=85&location_long=42';
    
    additionalData = {
        "watson_demoID": "gbank",
        "watson_tealeaf": 'Car Loan', 
        "watson_website": 'Module Bank', 
        "watson_channel": "watson", 
        "watson_skill": strReturn.skill, 
        "watson_preq": strPreQ, 
        "watson_prea": strPreA, 
        "watson_answer": strAnswer, 
        "watson_question": strQuestion, 
        "viewname": "WATSON", 
        "url1": "https://gbank.demo.genesys.com/watson/desktop.aspx?website=gbank&question=" + encodeURIComponent(strQuestion) + "&preq=" + 
            encodeURIComponent(strPreQ) + "&prea=" + encodeURIComponent(strPreA) + "&answer=" + encodeURIComponent(strAnswer) + "&page=calculator"
            
    };
        
        var strResult = '';
	startChatSession();
            return false;

    });  

// Error DIV

    $('#knowledgeErrorGet').click(function(e) {
        	jQuery("#knowledgeErrorArea").fadeOut("slow");
		$('#q1').val('');
        	jQuery("#knowledgeQuestionArea").fadeIn("slow");
    });  
    $('#knowledgeErrorClose').click(function(e) {
        	jQuery("#knowledgeErrorArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  
    $('#knowledgeErrorCancel').click(function(e) {
        	jQuery("#knowledgeErrorArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  
    $('#knowledgeErrorGet').click(function(e) {
	var strQ = $('#q2').val();
	$('#q1').val(strQ);

	if (strQ.length <= 0) {
		alert('Please type a question into the question box');
	} else {
        	jQuery("#knowledgeErrorArea").fadeOut("slow");
		centerWait();
		aTimer=setInterval(function(){clearWait()},3000);
        	jQuery("#knowledgeWaitArea").fadeIn("slow");
	}
    });   

    $('#knowledgeGoChat').click(function(e) {
        jQuery("#knowledgeErrorArea").fadeOut("slow");
		$('#q1').val('');
		centerChat();
        jQuery("#knowledgeChatArea").fadeIn("slow");
        
        
        if(typeof strPreA == 'undefined'){ strPreA = 'We cannot seem to find an answer';}
        if(typeof strAnswer == 'undefined') { strAnswer = 'We cannot seem to find an answer';}
        
        additionalData = {
        "watson_demoID": "gbank",
        "watson_tealeaf": 'Car Loan', 
        "watson_website": 'Module Bank', 
        "watson_channel": "watson", 
        "watson_skill": strReturn.skill, 
        "watson_preq": strPreQ, 
        "watson_prea": strPreA, 
        "watson_answer": strAnswer, 
        "watson_question": strQuestion, 
        "viewname": "WATSON", 
        "url1": "https://gbank.demo.genesys.com/watson/desktop.aspx?website=gbank&question=" + encodeURIComponent(strQuestion) + "&preq=" + 
            encodeURIComponent(strPreQ) + "&prea=" + encodeURIComponent(strPreA) + "&answer=" + encodeURIComponent(strAnswer) + "&page=calculator"
        };
        
        var strResult = '';
        
        startChatSession();
        return false;     
    });  

// Chat DIV

    $('#knowledgeChatClose').click(function(e) {
        	jQuery("#knowledgeChatArea").fadeOut("slow");
        	jQuery("#backgroundPopup").fadeOut("slow");
    });  

// Link DIV

    $('#knowledgeLinkClose').click(function(e) {
        	jQuery("#knowledgeErrorArea").fadeOut("slow");
		$('#q1').val('');
        	jQuery("#knowledgeQuestionArea").fadeIn("slow");
    });  


});


/*function startChatFrame() {
    var url = "ChatAx/ChatAxHE.html?FirstName=${fname}&LastName=${lname}&EmailAddress=${email}";
    var features = "scrollbars=0,toolbar=0,menubar=0, location=no, status=0,resizable=0,width=400,height=300";
    window.open(url, "GenesysChat", features);
}
*/