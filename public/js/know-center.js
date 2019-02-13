var _KC_URL = location.protocol + '//' + location.host + '/knowmgt/gks-server/v1';
var _KC_PROXY_URL = location.protocol + '//' + location.host + '/pfsproxy/pfsmobileproxy';
var _KC_FOOTER = "<hr><div style='float: right'><strong><i>Powered By Genesys Knowledge Center</i></strong></div>";
var _KC_FOOTER_VOTE = 
			'<br><div id="kc_footer"><i>Was it helpful? </i>&nbsp;&nbsp;' + 
			'<button class="more_btn2 gradient" style=" margin-top: -10px;" onclick="_kcVoteForDoc(true);">Yes</button>&nbsp;' + 
			'<button class="more_btn2 gradient" style=" margin-top: -10px;" onclick="_kcVoteForDoc(false);">No</button></div>';

var _kc_SessionId = '00000000-0000-0000-0000-0000000000';  
var _kc_SearchStr = '';
var _kc_Suggestions = [];
var _kc_Docs = [];
var _kc_DocsIdx = 0;
var _kc_ShowBack = true;
var _kc_Email = '';

$(document).ready(function(){
    // Assign kc source 'change' processing
    $('[kc-source]').keyup(function(){
        var str = $(this).val().trim();
        if (str === _kc_SearchStr )      // skip search if it is the same 
            return;
        
        _kc_SearchStr = str;    
        _kcFindDocs(); // search the docs
    });

})

// open KC session
function _kcOpenSession(email, success){
	
    $.ajax({
        url: _KC_PROXY_URL + '/kc-new-session',
        type: 'POST',
        headers: {'gkc_customerId': email},
        data: JSON.stringify({"email": email}),
        contentType: "application/json; charset=UTF-8",
        processData: false,
        dataType: "json",
        success: function(result) {
            _kc_SessionId = result['sessionId'];
			_kc_Email = email;
			if(success != null)
				success(result);
        }
    });	
}

// open KC session
function _kcLinkSession(email, success){
    
	if (_kc_SessionId.length == 0)
        return;
		
    $.ajax({
        url: _KC_URL + '/sessions/' + _kc_SessionId,
        type: 'POST',
		headers: {'gkc_customerId': email},
        success: function(result) {
            _kc_SessionId = result['sessionId'];
			_kc_Email = email;
			console.log(_kc_SessionId);	
			if(success != null)
				success(result);
        }
    });
}

// open Anonymous KC session
function _kcOpenAnonymousSession(success){

    $.ajax({
        url: _KC_URL + '/sessions/new',
        type: 'PUT',
        success: function(result) {
            _kc_SessionId = result['sessionId'];
			if(success != null)
				success(result);
			console.log(_kc_SessionId);	
        }
    });
}

// find documents
function _kcFindDocs(context, callback){

    if (_kc_SessionId.length == 0)
        return;

    if (_kc_SearchStr.length == 0 && context == null) {
        _kcHideSuggestions();
        return;
    }

    console.log("KC Suggestions for: " + (context==null?_kc_SearchStr:context));
	
    $.ajax({
        type: "POST",
        url:  _KC_URL + '/kbs/gbank/suggestions?sessionId='+_kc_SessionId,
        data: JSON.stringify({"query": (context==null?_kc_SearchStr:context)}),
        contentType: "application/json; charset=UTF-8",
        processData: false,
        dataType: "json",

        success: function (result, textStatus, reques) {
            console.log("KC Suggestions: " + JSON.stringify(result));
            
			if (callback != null) {
				callback(result);
				return;
			}
			else {
				if (result.response.suggestions.length == 0) 
					_kcHideSuggestions();
				else {
					_kc_Suggestions = result.response.suggestions;
					_kcShowSuggestions();
				}
			}
        },

        error: function (XMLHttpRequest, textStatus, a) {
            console.log("KC /suggestions Failed: " + XMLHttpRequest.responseText + "\n\tError: " + textStatus);
        }
    });
        
}

// open a document
function _kcOpenDoc(context, callback){

    $.ajax({
        type: "POST",
        url:  _KC_URL + '/kbs/gbank/search?sessionId='+_kc_SessionId+'&size=5',
        headers: {'gkc_customerId': _kc_Email},
        data: JSON.stringify({"query": context}),
        contentType: "application/json; charset=UTF-8",
        processData: false,
        dataType: "json",

        success: function (result, textStatus, reques) {
            console.log("KC Search: " + JSON.stringify(result));

            if (result.response.documents.length > 0) {
				_kc_Docs = result.response.documents;
				_kc_DocsIdx = 0;
				_kcShowDocs(0);
            }

            if (callback != null)
				callback(result.response.documents);
		},
        error: function (XMLHttpRequest, textStatus, a) {
            console.log("KC /search Failed: " + XMLHttpRequest.responseText + "\n\tError: " + textStatus);
        }
    });

}

// Vote for a good Doc
function _kcVoteForDoc(res){
	
	var docId = _kc_Docs[_kc_DocsIdx]["id"];
	
	console.log("KC vote '" + res + "' or for: " + docId);

    $.ajax({
        type: "POST",
        url:  _KC_URL + '/feedback/gbank/documents/' + docId + '/vote?relevant=' + res + '&sessionId=' + _kc_SessionId, 
        data: JSON.stringify({"query": _kc_Docs[_kc_DocsIdx]["question"], "categories":[]}),
        contentType: "application/json; charset=UTF-8",
        processData: false,
        dataType: "json",

        success: function (result, textStatus, reques) {
            console.log("KC /vote success: " + JSON.stringify(result));            
        },

        error: function (XMLHttpRequest, textStatus, a) {
            console.log("KC /vote Failed: " + XMLHttpRequest.responseText + "\n\tError: " + textStatus);
        }
    });
	
	$("#kc_footer").html("<i>Thank you for your feedback!</i>");
}

// Show doc
function _kcShowDocs(idx){

    var htmlStr = '';
	
	if (_kc_ShowBack)
		htmlStr += '<button class="more_btn2 gradient" style="float: left; margin-top: -10px;" onclick="_kcShowSuggestions();">Back</button>'; 

	if (idx < _kc_Docs.length-1)
		htmlStr += '<button class="more_btn2 gradient" style="float: right; margin-top: -10px; margin-left: 5px;" onclick="_kcShowDocs(++_kc_DocsIdx);">Next</button>';

	if (idx != 0)
		htmlStr += '<button class="more_btn2 gradient" style="float: right; margin-top: -10px;" onclick="_kcShowDocs(--_kc_DocsIdx);">Prev</button>';
	
	htmlStr += '<br><strong>'+_kc_Docs[idx]['question']+'</strong><br>';
	htmlStr += _kc_Docs[idx]['answer'];
	htmlStr += _KC_FOOTER_VOTE + _KC_FOOTER;

    $('#kc-frame').html(htmlStr).scrollTop(0).show();
}

function _kcHideSuggestions(){
    $('#kc-frame').text('').hide();
}

function _kcShowSuggestions(){
    
    var htmlStr = '<table style="width:100%;">';
    for (i=0; i<_kc_Suggestions.length; i++ ) {
        htmlStr += '<tr kc-row="'+ i +'"><td class="kc-td">&#8226;&nbsp;&nbsp;' + _kc_Suggestions[i] + '</td></tr>';
    }
    htmlStr += '</table>';
	htmlStr += _KC_FOOTER;
	
    $('#kc-frame').html(htmlStr).show();

    $('[kc-row]').hover(
        function(){
            $(this).toggleClass( "kc-over" );
        }).click(function(){
            _kcOpenDoc(_kc_Suggestions[$(this).attr('kc-row')]);
        });
}
