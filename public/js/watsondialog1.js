		var enablePopup = 1;

		var imageUrl 	= '<?php echo get_option("csnv_popup_img"); ?>';

		var articleUrl 	= '<?php echo get_option("csnv_popup_url"); ?>';

		var targetUrl 	= '<?php echo get_option("csnv_popup_target"); ?>';

		var dynamic_chat_pop = "";

		var knowledge_chat_pop = "";

		var knowledge_question = "";

		var knowledge_wait = "";

		var knowledge_answer = "";

		var knowledge_watson = "";

		var knowledge_evidence = "";

		var knowledge_agent = "";

		var knowledge_error = "";

		var knowledge_chat = "";

		var knowledge_link = "";

		var help_area = "";

		var knowledge_area = "";

		var answer_area = "";

			// Dynamic Chat Popup

			dynamic_chat_pop += "<div id='popupChatContact'>";

			dynamic_chat_pop += "<img src='images/a.png' width='280'>";

			dynamic_chat_pop += "</div><div id='backgroundPopup'></div>";



			// Knowledge Chat Popup

			knowledge_chat_pop += "<div id='popupContact'>";

			knowledge_chat_pop += "<div id='askclose'><img src='images/icon-close-x.png'></div>";

			knowledge_chat_pop += "<div id='askhelp'><img src='images/IBMavatar.png'></div>";

			knowledge_chat_pop += "<div id='askget'><h2>Get answers right away</h2></div>";

			knowledge_chat_pop += "<div id='askq'><h3>I have a question</h3></div>";

			knowledge_chat_pop += "</div><div id='backgroundPopup'></div>";



			// Knowledge Chat Question Area

			knowledge_question += "<div id='knowledgeQuestionArea'>";

			// knowledge_question += "<div id='knowledgeClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

			// knowledge_question += "<div id='knowledgePrevious'><h22></h22></div>";

			knowledge_question += "<div id='knowledgeTitle'><h45>How can we help you?</h45></div>";

			knowledge_question += "<div id='knowledgeQuestion'><input id='q1' type='text' name='question' class='input' placeholder='Please ask your question.  We will get your answer right away!'></div>";

			knowledge_question += "<div id='knowledgeOuter' style='width:100%'>";

			knowledge_question += "<div id='knowledgeCenter'>";

			knowledge_question += "<div id='knowledgeGet'><h2>Get my answer</h2></div>";

			// knowledge_question += "<div id='knowledgeCancel'><h2>Cancel</h2></div>";

			knowledge_question += "</div></div>";

			knowledge_question += "<div id='knowledgePowered'><h17></h17></div>";

			knowledge_question += "<div id='knowledgeLogo'><img src='images/IBMpowered.png'></div>";

			knowledge_question += "<div id='knowledgeGenesysLogo'><img src='images/Genesys_logo_RGB.png'></div>";

			knowledge_question += "</div>";



			// Knowledge Wait Area

			knowledge_wait += "<div id='knowledgeWaitArea'>";

			// knowledge_wait += "<div id='knowledgeWaitClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

			knowledge_wait += "<div id='knowledgeWaitTitle'><h45>Your answer is on the way.</h45></div>";

			knowledge_wait += "<div id='knowledgeBlock'></div>";

			knowledge_wait += "<div id='knowledgeGIF'><img id='imageloop' src='images/timer-watson.gif'></div>";

			knowledge_wait += "<div id='knowledgeBlock'></div>";

			knowledge_wait += "<div id='knowledgeWaitPowered'><h17></h17></div>";

			knowledge_wait += "<div id='knowledgeWaitLogo'><img src='images/IBMpowered.png'></div>";

			knowledge_wait += "<div id='knowledgeGenesysLogo'><img src='images/Genesys_logo_RGB.png'></div>";

			knowledge_wait += "</div>";



			// Knowledge Answer Area

knowledge_answer += "<div id='knowledgeAnswerArea'>";

	knowledge_answer += "<div id='knowledgeAnswerTop'>";

		// knowledge_answer += "<div id='knowledgeAnswerClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

		knowledge_answer += "<div id='knowledgeYourQuestion'><h17>Your Question:</h17></div>";

		knowledge_answer += "<div id='knowledgePreviousQuestion'><h38>Does the iPhone 5 have WiFis?</h38></div>";

	knowledge_answer += "</div>";

	knowledge_answer += "<div id='knowledgeAnswerBottom'>";

		knowledge_answer += "<div id='knowledgeAnswerLeft'>";

			knowledge_answer += "<div id='knowledgeLeftTop'>";

				knowledge_answer += "<div id='knowledgeOurAnswer'><h17>Our Answer:</h17></div>";

				knowledge_answer += "<div id='knowledgeTheAnswer'><h22b>The iPhone 5 supports WiFi for 2.4GHz and 5GHz 802.11a/b/g/n.</h22b></div>";

				knowledge_answer += "<div id='knowledgeOuter' style='width:100%'>";

					knowledge_answer += "<div id='knowledgeAnswerCenter'>";

						knowledge_answer += "<div id='knowledgeAnswerCancel'><h2>Ask an Advisor</h2></div>";

						knowledge_answer += "<div id='knowledgeAnswerGet'><h2>New question</h2></div>";

						knowledge_answer += "<div id='knowledgeAnswerAgent'><h14>Would you prefer to </h14><h14r id=knowledgeGoAgent>ask an agent?</h14></div>";

					knowledge_answer += "</div>";

				knowledge_answer += "</div>";

			knowledge_answer += "</div>";

			knowledge_answer += "<div id='knowledgeLeftBottom'>";

				knowledge_answer += "<div id='knowledgeAnswerMore'><h17>More about this topic...</h17></div>";

				knowledge_answer += "<div id='knowledgeAnswerMoreTag'><h14rb>Simply put, we’re the best product on the market...</h14rb></div>";

				

			knowledge_answer += "</div>";

		knowledge_answer += "</div>";

		knowledge_answer += "<div id='knowledgeAnswerRight'>";

			knowledge_answer += "<div id='knowledgeRightTop'>";

				knowledge_answer += "<div id='knowledgeAnswerRelated'><h17>Related...</h17></div>";

				knowledge_answer += "<div id='knowledgeAnswerUpsell'><img src='images/Phones.png'></div>";

				knowledge_answer += "<div id='knowledgeAnswerUpsellLink'><h14rb2>New ATM Locations...</h14rb></div>";

			knowledge_answer += "</div>";

			knowledge_answer += "<div id='knowledgeRightBottom'>";

				knowledge_answer += "<div id='knowledgeAnswerWhere'><h12d>Where did my answer come from...?</h12></div>";

				knowledge_answer += "<div id='knowledgeWhereLogo'><img src='images/IBMwordmark.png'></div>";

			knowledge_answer += "</div>";

		knowledge_answer += "</div>";

	knowledge_answer += "</div>";

knowledge_answer += "</div>";



			// Knowledge Watson Area

knowledge_watson += "<div id='knowledgeWatsonArea'>";

	knowledge_watson += "<div id='knowledgeWatsonTop'>";

		// knowledge_watson += "<div id='knowledgeWatsonClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

		knowledge_watson += "<div id='knowledgeWatsonAbout'><h45>About our answer...</h45></div>";

	knowledge_watson += "</div>";

	knowledge_watson += "<div id='knowledgeWatsonMiddle'>";

		knowledge_watson += "<div id='knowledgeWatsonMiddleLeft'><img id='confpng' src='images/confidence-85plus.png'>";

		knowledge_watson += "<p id='conf'>87</p></div>";

		knowledge_watson += "<div id='knowledgeWatsonMiddleRight'>";

			knowledge_watson += "<h22b2>IBM Watson Answers</h22b2><p><h14-2>We were able to identify <strong>3 answers</strong> to your question that had a confidence rating of <strong>more than 65%</strong>.  The answer we provided was the <strong>top-rated answer</strong>.</h14-2></p><p><h14-2>IBM Watson relies on hypothesis generation and evaluation to rapidly return relevant answers that fall within our predefined confidence parameters.<h14-2></p>";

			knowledge_watson += "<div id='knowledgeWatsonBack'><h2>Back to my answer</h2></div>";

		knowledge_watson += "</div>";

	knowledge_watson += "</div>";

	knowledge_watson += "<div id='knowledgeWatsonBottom'>";

		knowledge_watson += "<div id='knowledgeWatsonBottomLeft'>";

			knowledge_watson += "<div id='knowledgeWatsonTopThree'><h17>The top three answers to your question...</h17></div>";

			knowledge_watson += "<div id='knowledgeWatsonA1'><h14r><strong>What is a 529 plan...</strong></h14r></div>";

			knowledge_watson += "<div id='knowledgeWatsonA2'><h14r>529 plan contribution limits...</h14r></div>";

			knowledge_watson += "<div id='knowledgeWatsonA3'><h14r>Different types of 529 plans...</h14r></div>";		knowledge_watson += "</div>";

		knowledge_watson += "<div id='knowledgeWatsonBottomRight'>";

			knowledge_watson += "<div id='knowledgeWatsonFeedback'><h17>Feedback...</h17></div>";

			knowledge_watson += "<div id='knowledgeWatsonFeedback2'><h14>Was this answer helpful?</h14></div>";

			knowledge_watson += "<div id='knowledgeWatsonYes'><h2>Yes</h2></div>";

			knowledge_watson += "<div id='knowledgeWatsonNo'><h2>No</h2></div>";

		knowledge_watson += "</div>";

	knowledge_watson += "</div>";

knowledge_watson += "</div>";



		



			// Knowledge Evidence Area

knowledge_evidence += "<div id='knowledgeEvidenceArea'>";

	knowledge_evidence += "<div id='knowledgeWatsonTop'>";

		// knowledge_evidence += "<div id='knowledgeEvidenceClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

		knowledge_evidence += "<div id='knowledgeWatsonAbout'><h45>More on this topic...</h45></div>";

	knowledge_evidence += "</div>";

	knowledge_evidence += "<div id='knowledgeEvidenceMiddle'>";

		knowledge_evidence += "<div id='knowledgeEvidence'><h14-3>The evidence is mounting</h14-3></div>";

		knowledge_evidence += "<div id='knowledgeEvidenceBack'><h2>Back to my answer</h2></div>";

	knowledge_evidence += "</div>";

	knowledge_evidence += "<div id='knowledgeWatsonBottom'>";

		knowledge_evidence += "<div id='knowledgeWatsonBottomLeft'>";

			knowledge_evidence += "<div id='knowledgeWatsonTopThree'><h17>The top three answers to your question...</h17></div>";

			knowledge_evidence += "<div id='knowledgeWatsonA1'><h14r><strong>What is a 529 plan...</strong></h14r></div>";

			knowledge_evidence += "<div id='knowledgeWatsonA2'><h14r>529 plan contribution limits...</h14r></div>";

			knowledge_evidence += "<div id='knowledgeWatsonA3'><h14r>Different types of 529 plans...</h14r></div>";

		knowledge_evidence += "</div>";

		knowledge_evidence += "<div id='knowledgeWatsonBottomRight'>";

			knowledge_evidence += "<div id='knowledgeWatsonFeedback'><h17>Feedback...</h17></div>";

			knowledge_evidence += "<div id='knowledgeWatsonFeedback2'><h14>Was this answer helpful?</h14></div>";

			knowledge_evidence += "<div id='knowledgeWatsonYes'><h2>Yes</h2></div>";

			knowledge_evidence += "<div id='knowledgeWatsonNo'><h2>No</h2></div>";

		knowledge_evidence += "</div>";

	knowledge_evidence += "</div>";

knowledge_evidence += "</div>";





			// Knowledge Agent Area

knowledge_agent += "<div id='knowledgeAgentArea'>";

	knowledge_agent += "<div id='knowledgeWatsonTop'>";

		// knowledge_agent += "<div id='knowledgeAgentClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

		knowledge_agent += "<div id='knowledgeYourQuestion'><h17>Your Question:</h17></div>";

		knowledge_agent += "<div id='knowledgePreviousQuestion'><h38>Does the iPhone 5 have WiFis?</h38></div>";

	knowledge_agent += "</div>";

	knowledge_agent += "<div id='knowledgeAgentMiddle'>";

		knowledge_agent += "<div id='knowledgeAgentReady'><h45a>We have an account specialist</br>ready to assist you.</h45a></div>";

	knowledge_agent += "</div>";

	knowledge_agent += "<div id='knowledgeAgentOuter' style='width:100%'>";

		knowledge_agent += "<div id='knowledgeAgentCenter'>";

			knowledge_agent += "<div id='knowledgeAgentGet'><h2>Connect Me</h2></div>";

			knowledge_agent += "<div id='knowledgeAgentCancel'><h2>Another Question</h2></div>";

			knowledge_agent += "<div id='knowledgeAnswerAgent'><h14>Or would you like to </h14><h14r id=knowledgeGoQ>ask another question?</h14></div>";			

		knowledge_agent += "</div>";

		knowledge_agent += "<div id='knowledgeAgentNumber'>";

			knowledge_agent += "<h17 id='knowledgeSay'></h17></br><h17 id='knowledgeCount'></h17>";

		knowledge_agent += "</div>";

	knowledge_agent += "</div>";

	knowledge_agent += "<div id='knowledgeWatsonAgentBottom'>";

			knowledge_agent += "<div id='knowledgeAgentPowered'><h17></h17></div>";

			knowledge_agent += "<div id='knowledgeAgentLogo'><img src='images/IBMpowered.png'></div>";

			knowledge_agent += "<div id='knowledgeGenesysLogo'><img src='images/Genesys_logo_RGB.png'></div>";

	knowledge_agent += "</div>";

knowledge_agent += "</div>";





			// Knowledge Error Area

knowledge_error += "<div id='knowledgeErrorArea'>";

	knowledge_error += "<div id='knowledgeWatsonTop'>";

		// knowledge_error += "<div id='knowledgeAgentClose'><h14>Close&nbsp;</h14><img src='images/icon-close-x.png'></div>";

		knowledge_error += "<div id='knowledgeYourQuestion'><h17>Your Question:</h17></div>";

		knowledge_error += "<div id='knowledgePreviousQuestion'><h38>Does the iPhone 5 have WiFis?</h38></div>";

	knowledge_error += "</div>";

	knowledge_error += "<div id='knowledgeErrorMiddle'>";

		knowledge_error += "<div id='knowledgeErrorReady'><h45>We can't seem to find an answer</h45></div>";

		knowledge_error += "<div id='knowledgeErrorQuestion'><input id='q2' type='text' name='question' class='input' placeholder='Would you like to rephrase your question and try again?'></div>";	knowledge_error += "</div>";

	knowledge_error += "<div id='knowledgeAgentOuter' style='width:100%'>";

		knowledge_error += "<div id='knowledgeAgentCenter'>";

			knowledge_error += "<div id='knowledgeErrorGet'><h2>Get my answer</h2></div>";

			knowledge_error += "<div id='knowledgeErrorCancel'><h2>Cancel</h2></div>";

			knowledge_error += "<div id='knowledgeErrorAgent'><h14>Would you prefer to </h14><h14r id=knowledgeGoChat>ask an agent?</h14></div>";			

		knowledge_error += "</div>";

	knowledge_error += "</div>";

			knowledge_error += "<div id='knowledgeWatsonErrorBottom'>";
			knowledge_error += "<div id='knowledgeLogo'><img src='images/IBMpowered.png'></div>";
			knowledge_error += "<div id='knowledgeGenesysLogo'><img src='images/Genesys_logo_RGB.png'></div>";

	knowledge_error += "</div>";

knowledge_error += "</div>";









		

			    document.write(knowledge_area);

			    document.write(knowledge_question);

			    document.write(knowledge_wait);

			    document.write(knowledge_answer);

			    document.write(knowledge_watson);

			    document.write(knowledge_evidence);

			    document.write(knowledge_agent);

			    document.write(knowledge_error);

			    document.write(knowledge_chat);

			    document.write(answer_area);





		centerHelp();

        	jQuery("#knowledgeQuestionArea").fadeIn("slow");

			

		aState=3;



