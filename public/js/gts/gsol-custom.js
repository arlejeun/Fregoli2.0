/**
 * GSol custom library
 *
 * @author Arnaud Lejeune
 * @version 1.0
 *
 */

  'use strict';
  
  var gsol = gsol || {};

    // Widgets, and any components that manipulate the DOM.
    gsol.UI = {};

    // Classes that have reusable logic or calculation.
    gsol.Altocloud = {};

    // Custom code that works with external javascript libraries in a reusable way.
    gsol.Purecloud = {};

    // Generic utilities.
    gsol.Utils = {};

    // Init CX Widgets for PureCloud
    gsol.CXWidgets = {};

    /***********************
     * 
     * 
     * 
     ***********************/

     
    var CalculatorClass = function () {

      var validationClass = '.js-validate';
      var stepformClass = '.js-step-form';
      var animationLinkClass = '.js-animation-link';
      var rangeSliderClass = '.js-range-slider';
      var default_settings = {'zipCode':'64064', 'sqf':'3000'};
 
      var updateROI = function(options, sqfoot) {
        console.log(JSON.stringify(options));
        var kpis = {};
        //logic for calculation
        kpis.revPerMonth = Math.round(250 + ( sqfoot - 3000)/3000 * 100 + (options.solarSlider - 40)/40 * 5);
        kpis.loanPaymentperMonth = Math.round(329);
        kpis.netCostperMonth = kpis.revPerMonth - kpis.loanPaymentperMonth;
        kpis.value30yr = Math.round(kpis.revPerMonth * 12 * 30);
        kpis.payment = 94200;
        kpis.credit = 16700;
        kpis.cost = Math.round(kpis.value30yr + kpis.credit - kpis.payment);
        return kpis;
      }

      this.init = function() {
        $.HSCore.components.HSValidation.init(validationClass);
        // initialization of step form
        $.HSCore.components.HSStepForm.init(stepformClass);
        // initialization of show animations
        $.HSCore.components.HSShowAnimation.init(animationLinkClass);
        // initialization of forms
        $.HSCore.components.HSRangeSlider.init(rangeSliderClass);
      }

      this.update = function() {
        //var inputs = $(":input");
        //var $inputs = $("#residential-calculator :input");        
        var options = {'zipcode':$("#residential-calculator input[name=zipcode]").val(),
                        'address': $("#residential-calculator input[name=address]").val(),
                        'city': $("#residential-calculator input[name=city]").val(),
                        'sqfoot':$("#residential-calculator #sqfoot").val() || 3000,
                        'solarSlider':$("#residential-calculator #solar-slider").val() || 40,
                        'bill':$("#residential-calculator #bill").val() || 150
                      }
        var numberPattern = /\d+/g;
        var sqfoot = options.sqfoot.match(numberPattern)[0];
        var bill = options.bill.match(numberPattern)[0];

        options.priority = (sqfoot == "5000" || bill == "500") ? 'high':'normal';

        var kpis = {};
        kpis = updateROI(options, sqfoot);
        $("#save-per-month").html('$'+ kpis.revPerMonth);
        $("#rev-per-month").html('<span class="align-top font-size-2">$</span>'+ kpis.revPerMonth);
        $("#payPerMonth").html('-<span class="align-top font-size-2">$</span>'+kpis.loanPaymentperMonth);
        $("#costPerMonth").html('<span class="align-top font-size-2">$</span>'+kpis.netCostperMonth);
        $("#cash-value").html(' <span class="align-top"> $</span>'+ kpis.value30yr);
        $("#total-cost").html(' <span class="align-top">-$</span>'+ kpis.payment);
        $("#tax-credit").html(' <span class="align-top"> $</span>'+ kpis.credit);
        $("#cost-30yr").html( '$' + kpis.cost);
        
        var summary = {
          address:options.address+', '+options.zipcode+', '+options.city,
          bill:options.bill,
          area:options.sqfoot,
          value30yr:'$'+kpis.value30yr,
          taxCredit:'$'+kpis.credit,
          priority:options.priority
        }

        ac('record', 'button.clicked', 'Residential House Information', summary);

      }

      this.finalize = function(){
        ac('record', 'form.submitted', 'Residential Hot Lead');
        window._genesys.widgets.bus.command('ChannelSelector.open');
      }

      this.getContactInfo = function() {
        var isOwner = $("#residential-calculator #customRadioInline1")[0].checked ? 'yes':'no';
        var attr = {'firstname':$("#residential-calculator input[name=firstname]").val(),
                       'lastname':$("#residential-calculator input[name=lastname]").val(),
                       'email':$("#residential-calculator input[name=email]").val(),
                       'phone':$("#residential-calculator input[name=phone]").val(),
                       'homeowner': isOwner
                  }
        //Improve phone number validation based on AC rules - Only US for now
        var phoneNumber = {"value":attr.phone};
        var opt = {
          givenName:attr.firstname,
          familyName:attr.lastname,
          email:attr.email,
          mobilePhone: phoneNumber,
        };
        ac('api.customer.update', opt);
        if ($("#residential-calculator #customRadioInline1")[0].checked){
          ac('record', 'button.clicked', 'HomeOwner', attr.isOwner);
        }

      }



      this.settings = default_settings;

    }

    var LandingClass = function () {

      this.init = function() {
            // initialization of show animations
            $.HSCore.components.HSShowAnimation.init('.js-animation-link');
            // initialization of slick carousel
            $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

      }

    }

    var pureCloudWebchatClass = function (options) {

      //var queueName = options.queueName || 'Member Services';
      var chatContainer = 'chat-container';
      
      var chatConfig = {
          webchatAppUrl: 'https://apps.mypurecloud.com/webchat',
          webchatServiceUrl: 'https://realtime.mypurecloud.com:443',
          orgId: 8480,
          orgName: 'purecloudnow',
          //queueName : queueName,
          //queueName : 'Member Services',
          reconnectEnabled: true,
          reconnectOrigins: [ '127.0.0.1:8000','gsol-dev.demo.genesys.com'],
          
          // Whether to show submit button or send message on Enter keypress
          showSubmitButton: false,

          // Log level
          logLevel: 'DEBUG',

          // Locale code
          locale: 'en',

          // Logo used within the chat window
          companyLogoSmall: {
              width: 149,
              height: 149,
              url: 'https://dhqbrvplips7x.cloudfront.net/webchat/1.0.23/company-logo-small-9c9fe09b.png'
          },
          // Fallback image used for agent if no agent image is defined in the agent's PureCloud profile
          agentAvatar: {
              width: 149,
              height: 149,
              url: 'https://dhqbrvplips7x.cloudfront.net/webchat/1.0.23/agent-e202505f.png'
          },

          // Text displayed with chat window is displayed
          welcomeMessage: '',

          // CSS class applied to the chat window
          cssClass: 'webchat-frame',

          // Custom style applied to the chat window
          css: {
              width: '100%',
              height: '100%'
          }
      };

      var setupWebchatSettings = function (input) {
        var s = {};
        s.Email = input.email;
        s.department = input.queue; 
        s.UserName = input.firstName+' '+input.lastName;
        s.FirstName = input.firstName;
        s.LastName = input.lastName;
        return s;
      };

      var webChatStartAction = function(settings) {
        console.log('[gts] - Entering custtom function');
        $(".cx-widget .cx-body").append($('<div id="chat-container" style="height:400px"></div>'));
        $("#chat-button").trigger('click', settings.data);
        $(".cx-widget .cx-body .cx-form").remove();
      };
      
      this.init = function(settings) {

        var webchatSettings = setupWebchatSettings(settings);
        var pureCloudChatPlugin = window._genesys.widgets.bus.registerPlugin('pureCloudChatPlugin');
        pureCloudChatPlugin.subscribe('WebChat.opened', function(e){ 
            /* sample code */ 
            console.log('[gts] Change actions of cx-webchat buttons for purecloud webchat');
            $(".cx-form-wrapper .cx-button-group .cx-submit").remove();
            $(".cx-form-wrapper .cx-button-group").append('<button id="chat-virtual-button" class="cx-submit cx-btn cx-btn-primary i18n" data-message="ChatFormSubmit" tabindex="0">Custom</button>');
            $("#cx_webchat_form_firstname").val(webchatSettings.FirstName);
            $("#cx_webchat_form_lastname").val(webchatSettings.LastName);
            $("#cx_webchat_form_email").val(webchatSettings.Email);
            $("#chat-virtual-button").click(webchatSettings, webChatStartAction);
          }
        );
        pureCloudChatPlugin.subscribe('WebChat.closed', function(e){ 
            /* sample code */ 
            console.log('[gts] Change actions of cx-webchat buttons for purecloud webchat');
            window.location.reload();
        });

        var instantiatePurecloudWebchat = function (webchat) {
                
          $chatButton.onclick = function (settings) {
            
            var firstName = $("#cx_webchat_form_firstname")[0].value;
            var lastName = $("#cx_webchat_form_lastname")[0].value;
            var customerEmail = $("#cx_webchat_form_email")[0].value;
            var CustomerSubject = $("#cx_webchat_form_subject")[0].value;
            var visitId = '';
            var customerId = '';
            var address = '';
            var city= '';
            var state = '';
            var postal = '';
            var phone = '';
            var queueName='';
            var skills = [];
            var scriptId = '858ab9be-73d7-4866-ad83-8d07732be76d';
            //var scriptId = 'faa96800-8f3e-11e7-8e51-330afc9b247e';
            var acVisit = JSON.parse(sessionStorage.getItem('acVisitProfile'));
            if (!!acVisit) {
              visitId = acVisit.id;
              customerId = acVisit.customer;
            }
            var userPrefs = JSON.parse(sessionStorage.getItem('userSettings'));
            if (!!userPrefs) {
              address = userPrefs.address;
              city = userPrefs.city;
              state = userPrefs.state;
              postal = userPrefs.postal;
              phone = userPrefs.phoneNumber;
              queueName = userPrefs.queue;
              skills.push(userPrefs.lastNameSkill);
              skills.push(userPrefs.membershipSkill);
            }
            
            // https://core.demo.genesys.com/altocloud/acjourneyFwk.html?instance=cjnw7wjwiyp8d0fn27ce64g1s&customerId=5c1d356b0acc5ef5081a881e&visitId=5c1d356b0acc5ef5081a881e
            // https://core.demo.genesys.com/altocloud/acjourneyFwk.html?instance=cjnw7wjwiyp8d0fn27ce64g1s&customerId={{acCustomerId}}&visitId={{acVisitID}}
            // Use getConfig.setConfigProperty() for any web chat configuration property to dynamically set config values.
            /*webchat.getConfig().setData({
                    queueName: queueName,
                    skills: skills,
                    CustomerFirstName: firstName,
                    CustomerLastName: lastName,
                    email:customerEmail,
                    addressStreet: address,
                    addressCity: city,
                    addressPostalCode: postal,
                    addressState: state,
                    phoneNumber: phone,
                    phoneType: 'Cell',
                    acVisitID: visitId,
                    acCustomerId: customerId
              });*/

              webchat.getConfig().setData({
                firstName: firstName,
                lastName: lastName,
                queueName: queueName,
                skills: skills,
                scriptId: scriptId,
                CustomerSubject: CustomerSubject,
                CustomerFirstName: firstName,
                CustomerLastName: lastName,
                email:customerEmail,
                addressStreet: address,
                addressCity: city,
                addressPostalCode: postal,
                addressState: state,
                phoneNumber: phone,
                phoneType: 'Cell',
                acVisitID: visitId,
                acCustomerId: customerId
            });

            webchat.updateConfig({
              queueName: queueName,
              skills: skills
            });
            
            webchat.chatEnded = function () {
            //Code to run when chat ends.
                console.log('[gts] - Chat ended');
                //window.location.reload();
            };

            webchat.chatStarted = function () {
            //Code to run when chat ends.
            /*
                setTimeout(function(){ 
                    console.log('[gts] - PureCloud Header removed');
                    $(".webchat-header-container").remove();
                  }, 5000);
            */  
            };
                
            webchat.renderFrame({
                containerEl: document.getElementById('chat-container')
            })

        }
        };
        
        // Required if reconnects are enabled
        window.PURECLOUD_WEBCHAT_FRAME_CONFIG = {
          containerEl: chatContainer
        };
  
        var $chatButton = document.getElementById('chat-button');

        ININ.webchat.create(chatConfig).then(instantiatePurecloudWebchat)
        .catch(function (err){
            console.log('[gts] Cannot instanciate chat container')
            console.log(err);
          }
        );
      
      };
      
    };

    var pureCloudCallbackClass = function (options) {

        var callBackSentWithSuccess = function(resp){
          console.log('[GTS Purecloud] Callback Scheduled');
          var confirmation_content = '<div class="cx-confirmation-wrapper" tabindex="0">'+     
            '<h3 class="i18n cx-confirm-description" data-message="CallbackConfirmDescription">You are booked in!</h3>'+      
            '<div class="i18n cx-number-description" data-message="CallbackNumberDescription">We will call you at the number provided shortly</div>'+      
            '</div><div class="cx-button-group cx-buttons-default cx-callback-done">'+
            '</div>';
          $(".cx-widget.cx-callback .cx-content.wrapper .cx-confirmation").append(confirmation_content);
        };

        var CallbackSentWithFailure = function(resp){
          console.log('[GTS Purecloud] Callback Failure');
          var failure_content = '<div class="cx-confirmation-wrapper" tabindex="0">'+     
            '<h3 class="i18n cx-confirm-description" data-message="CallbackConfirmDescription">Sorry but we are currently unavailable to handle your callback.</h3>'+      
            '</div>';
          $(".cx-widget.cx-callback .cx-content.wrapper .cx-confirmation").append(failure_content);
        };

        var setupCallbackSettings = function(input){
          var s = {};
          var numbers = [];
          numbers[0] = '+'+input.phoneNumber;
          var evtTime = new Date().toISOString();
          s.callbackUserName = input.firstName+' '+input.lastName;
          s.callbackFirstName = input.firstName;
          s.callbackLastName = input.lastName;
          s.queueName = input.queue;
          s.callbackNumbers=numbers;
          s.orgName = 'purecloudnow';
          s.scriptId = '54f0f81f-060c-4208-8c3b-2ca13e5184af';
          s.membershipSkill = input.membershipSkill;
          s.lastNameSkill = input.lastNameSkill;
          sessionStorage['callbackSettings'] = JSON.stringify(s);
          return s;
        };

        var callBackSubmitAction = function(settings){
          var confirmation_container = '<div class="cx-confirmation" height:50px;padding: 75px 15px;></div>';
            // Read email, Subject and Message from the CX Callback widget form for Purecloud Callback body            
          if (settings.data) {
            var uSettings = JSON.parse(sessionStorage.getItem('userSettings'));
            settings.data.callbackNumbers[0] = $("#cx_form_callback_phone_number").val() || settings.data.callbackNumbers[0];
            settings.data.callbackScheduledTime = new Date().toISOString();
            var d = {};
            d.notes = $("#cx_form_callback_subject").val();
            d.address = uSettings.address+', '+uSettings.city+', '+uSettings.postal+' '+uSettings.state;
            d.callbackUserName = uSettings.displayName;
            settings.data['data'] = d;
          }

          $(".cx-widget.cx-callback .cx-content.wrapper .cx-wrapper.cx-form").remove()
          $(".cx-widget.cx-callback .cx-content.wrapper").append(confirmation_container);

          console.log('[GTS - Purecloud] - Callback Start Action ' + JSON.stringify(settings.data));
          
          $.post("https://webportal.simdomain.com/SimPc/api/Callback",
                  settings.data,
                  callBackSentWithSuccess
              )
              .fail(CallbackSentWithFailure);

        };
     
        this.init = function(settings) {

          if ('callbackSettings' in sessionStorage) {
            var callbackSettings = JSON.parse(sessionStorage.getItem('callbackSettings'));
          }
          else {
            var callbackSettings = setupCallbackSettings(settings);
          }
            
            var pureCloudCallbackPlugin = window._genesys.widgets.bus.registerPlugin('pureCloudCallbackPlugin');
                pureCloudCallbackPlugin.subscribe('Callback.opened', function(e){ 
                /* sample code */ 
                  console.log('[GTS - purecloud] Change actions of cx-callback buttons for purecloud callback');
                  $(".cx-widget.cx-callback .cx-form .cx-button-group .cx-callback-confirm").remove();
                  $(".cx-widget.cx-callback .cx-form .cx-button-group").append('<button id="callback-virtual-button" class="cx-submit cx-btn cx-btn-primary i18n" data-message="callbackFormSubmit" tabindex="0">Call Back</button>');
                  $("#callback-virtual-button").click(callbackSettings, callBackSubmitAction);
                  $("#cx_form_callback_firstname").val(callbackSettings.callbackFirstName);
                  $("#cx_form_callback_lastname").val(callbackSettings.callbackLastName);
                  $(".cx-form-inputs .flag-container").remove()
                  $("#cx_form_callback_phone_number").val(callbackSettings.callbackNumbers[0]);

              });

              pureCloudCallbackPlugin.subscribe('Callback.closed', function(e){ 
                  /* sample code */ 
                  console.log('[GTS - purecloud] Closed Callback widget');       
              });
        
        }

    }

    var pureCloudMailClass = function (options) {


        var MessageSentWithSuccess = function(resp){
          console.log('[GTS - purecloud] Message Sent - ' + JSON.stringify(resp));

          var confirmation_content = '<div class="cx-confirmation-wrapper">'+     
            '<label class="cx-control-label i18n">"Thank you!  An agent will contact you shortly."</label>'+      
            '</div>';
            $(".cx-widget.cx-send-message .cx-body .cx-wrapper .cx-form-success .cx-confirmation").append(confirmation_content);

        };

        var MessageSentWithFailure = function(resp){
          console.log('[GTS - purecloud] Message Sent - ' + JSON.stringify(resp));

          var confirmation_content = '<div class="cx-confirmation-wrapper">'+     
            '<label class="cx-control-label i18n">"Sorry but we are currently unavailable to handle your email."</label>'+      
            '</div>';
            $(".cx-widget.cx-send-message .cx-body .cx-wrapper .cx-form-success .cx-confirmation").append(confirmation_content);

        };

        var setupEmailSettings = function(input){
          var s = {};
          s.Email = input.email;
          s.department = input.queue; 
          s.UserName = input.firstName+' '+input.lastName;
          s.FirstName = input.firstName;
          s.LastName = input.lastName;
          // By default, return address is the one from purecloud configuration
          s.returnAddr = input.email;

          sessionStorage['emailSettings'] = JSON.stringify(s);
          return s;
        };

        var emailSubmitAction = function(settings){
          
          var confirmation_container = '<div class="cx-confirmation" style="height:150px;padding:70px 5px 10px 30px"></div>';
          
          // Read email, Subject and Message from the CX Mail widget form for Purecloud Email body
          if (settings.data) {
            settings.data.returnAddr = $("#cx_sendmessage_form_email")[0].value || settings.data.returnAddr;
            settings.data.subject = $("#cx_sendmessage_form_subject")[0].value;
            settings.data.message = $("#cx_sendmessage_form_messagebody")[0].value;
          }
          
          $(".cx-widget.cx-send-message .cx-body .cx-form").remove();
          $(".cx-widget.cx-send-message .cx-body .cx-wrapper .cx-form-success").height(120);
          $(".cx-widget.cx-send-message .cx-body .cx-wrapper .cx-form-success").show();
          $(".cx-widget.cx-send-message .cx-body .cx-wrapper .cx-form-success").append(confirmation_container);
          
          console.log('[GTS - Purecloud] - Mail Start Action ' + JSON.stringify(settings.data));
          $.post("https://webportal.simdomain.com/SimNotify/api/Mail",
                  settings.data,
                  MessageSentWithSuccess
                )
                .fail(MessageSentWithFailure);
        };

      
      this.init = function(settings) {

        var self = this;    
        // Create the request body for Email Purecloud
        if ('emailSettings' in sessionStorage) {
          var emailSettings = JSON.parse(sessionStorage.getItem('emailSettings'));
        } else {
           emailSettings = setupEmailSettings(settings);
        }

        var pureCloudMailPlugin = window._genesys.widgets.bus.registerPlugin('pureCloudMailPlugin');
        
          pureCloudMailPlugin.subscribe('SendMessage.opened', function(e){ 
              /* sample code */ 
              console.log('[GTS - purecloud] Change actions of cx-sendmessage buttons for purecloud mail');
              $(".cx-widget.cx-send-message .cx-form .cx-form-group.cx-submitForm .cx-right-half").remove()
              $(".cx-widget.cx-send-message .cx-form .cx-form-group.cx-submitForm").append('<button id="mail-virtual-button" class="cx-submit cx-btn cx-btn-primary i18n" data-message="MailFormSubmit" tabindex="0">Send</button>');
              $("#mail-virtual-button").click(emailSettings, emailSubmitAction);
             
              $("#cx_sendmessage_form_firstname").val(emailSettings.FirstName);
              $("#cx_sendmessage_form_lastname").val(emailSettings.LastName);
              $("#cx_sendmessage_form_email").val(emailSettings.Email);

          });

          pureCloudMailPlugin.subscribe('SendMessage.closed', function(e){ 
              /* sample code */ 
              console.log('[GTS - purecloud] Closed Send Message widget');       
          });

      }

    }

    var gsolGTSAC = function(){

      var getCartInfo = function() {
        console.log('GTS - Get Cart Info');
        var cartInfo = {};
        var items = $('.cart-dropdown__total')[0].attributes['data-quantity'].value;
        var total = $('.cart-dropdown__total p').text().trim().replace('$','').replace(',','');
        var value = $('.cart-dropdown__total p span') + total;
        var status = getCustomerStatusbyCartValue(total);
        var discount = checkDiscountEligibility(total);
        cartInfo = {total: total, items: items, status: status, discount: discount};
        return cartInfo;
      };

      var getCustomerStatusbyCartValue = function (total) {
        var result = 'UNKNOWN';
        if (total > 0) {
          if (total < 100) {
            result = 'Bronze';
          } else if (total < 501  ) {
            result = 'Silver';
          } else if (total > 500  ) {
            result = 'Gold';
          }
        }
        return result;
      };
      
      var checkDiscountEligibility = function (total) {
      // Offer prospect with a $10, $50, 75$ and $100 discount for Missouri region
        var result = {};
        if (total > 1500) { //Suggest for a value of $2000
          result['eligible'] = {status:'yes',value:100};
        //} else if (total > 800 && (1000 - total) > 100) {  //Suggest for a value of $1000
        } else if (total > 800) { 
          result['eligible'] = {status:'yes',value:75};
        } else if (total > 350) {  //Suggest for a value of $500
          result['eligible'] = {status:'yes',value:50};
        } else if (total > 170) {  //Suggest for a value of $250
          result['eligible'] = {status:'yes',value:25};
        } else {
          result['eligible'] = {status:'no',value:0};
        }
      
        return result;
      };

      //ensure altocloud is loaded
      this.updateCart = function(data) {

        console.log('GTS - Cart update ' + data);

        if (data.message === 'Items added to the Cart') {
        
          console.log('GTS - Add product to Cart');
          var prodName = $('.product__info__name').text().trim();
          var productSKU = data.variant.schemaData.sku;
          var productQuantity = data.quantity;
          var productPrice = data.variant.schemaData.price * data.quantity + ' ' + data.variant.schemaData.priceCurrency;
          var prodInfo = { name: prodName,
            sku: productSKU,
            quantity: productQuantity,
            price: productPrice
          };
          ac('record', 'product.added', prodInfo.name, prodInfo);
          setTimeout(function() {
            var cartInfo = getCartInfo();
            ac('set', cartInfo);
            ac('pageview')
          }, 1500);	
        }
        
        else if (data.message === 'Updated Items quantity from Cart') {
          console.log('GTS - Updated Items quantity from Cart');
          ac('record', 'product.updated', data.product, data);
          setTimeout(function() {
            var cartInfo = getCartInfo();
            ac('set', cartInfo);
            ac('pageview')
          }, 1500);	
        
        }
        
        else if (data.message === 'Items removed from Cart') {
          console.log('GTS - Items removed from Cart');
          ac('record', 'product.removed', data.product, data);
          setTimeout(function() {
            var cartInfo = getCartInfo();
            ac('set', cartInfo);
            ac('pageview')
          }, 1500);	
          
        
        }
        
        else if (data.message === 'All Items removed from Cart') {
          console.log('GTS - Items removed from Cart');
          setTimeout(function() {
            var cartInfo = {total: 0, items: '', status: 'CART CLEARED', discount: ''};
            ac('set', cartInfo);
            ac('pageview')
          }, 500);				
        }
        
        var messageError = data.message.quantity;
        var errorLabel = 'N/A';
        if (typeof messageError != 'undefined' && messageError) {
          console.log('GTS - Check for application errors');
          if (messageError.constructor === Array) {
            errorLabel = messageError[0];
          }
          // create a personae rule for stock which contains 'out of stock' expression
          ac('set', {stock: errorLabel});
          ac('pageview');
        }
          
      };

      this.addCart = function() {
        console.log('GTS - Add product to Cart');
        var prodName = $('.product__info__name').text().trim();
        var productQuantity = $( "input[type=number][name=quantity]").val();
        var productSKU = 'SKU-'+ Math.floor(Math.random()*1000);
        var productPrice = parseFloat($('.product__info__price').text().trim().replace('$','').replace(',','')) * productQuantity + ' ' + $('.product__info__price .currency').text();
      
        var prodInfo = { name: prodName,
            sku: productSKU,
            quantity: productQuantity,
            price: productPrice
          };
        ac('record', 'product.added', prodInfo.name, prodInfo);	
        setTimeout(function() {
            var cartInfo = getCartInfo();
            ac('set', cartInfo);
            ac('pageview')
          }, 1500);
      
      };

      this.updateACProfile = function(visit){
        sessionStorage['acVisitProfile'] = JSON.stringify(visit);
      };

      this.readACProfile = function(){
        var acProfile = JSON.parse(sessionStorage.getItem('acVisitProfile'));
        return acProfile;
      }

      // Create cookie
      this.createCookie = function(domain, name, value, isJson, escaped, expiration, expirationUnit) {
        console.log("[GDemo] createCookie on domain="+domain+" name="+name+" value="+JSON.stringify(value));
        var expires;
        if (expiration) {
            var date = new Date();
            if (expirationUnit=='days')
                date.setTime(date.getTime()+(expiration*24*60*60*1000));
            else if (expirationUnit=='hours')
                date.setTime(date.getTime()+(expiration*60*60*1000));
            else if (expirationUnit=='minutes')
                date.setTime(date.getTime()+(expiration*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else {
            expires = "; expires=0;";
        }
        if (isJson)
            if (escaped)
                document.cookie = encodeURIComponent(name)+"="+encodeURIComponent(JSON.stringify(value))+expires+"; path=/;domain="+domain;
            else
                document.cookie = name+"="+JSON.stringify(value)+expires+"; path=/;domain="+domain;
        else
            if (escaped)
                document.cookie = encodeURIComponent(name)+"="+encodeURIComponent(value)+expires+"; path=/;domain="+domain;
            else
                document.cookie = name+"="+value+expires+"; path=/;domain="+domain;
      };

      this.readCookie = function(name, isJson, escaped) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                if (isJson)
                    if (escaped)
                        return JSON.parse(decodeURIComponent(c.substring(nameEQ.length,c.length)));
                    else
                        return JSON.parse(c.substring(nameEQ.length,c.length));
                else
                    if (escaped)
                        return decodeURIComponent(c.substring(nameEQ.length,c.length));
                    else
                        return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
      };

      // Erase cookie
      this.eraseCookie = function(name) {
        var self = this;
        self.createCookie(".genesys.com",name,"",-1,false,true);
      }

      this.resetACCookie = function(){
        // clear cookies
        //document.cookie = '_actmu=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain='+/\..*/.exec(location.host)[0]+'; path=/';
        document.cookie = '_actvc=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain='+/\..*/.exec(location.host)[0]+'; path=/';
        document.cookie = '_actms=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain='+/\..*/.exec(location.host)[0]+'; path=/';
        // reload page
        window.location.reload();
        var userSettings = JSON.parse(sessionStorage.getItem('userSettings'));
        window.ac('identify', email, userSettings);
        window.ac('api.customer.update', {
          givenName: userSettings.givenName,
          familyName: userSettings.familyName
        });
      }
    
    }
    
    var pureCloudUser = function (email){
      
      /* Warning - Login is defined based on these current user settings
        {
            "firstName": "Arnaud",
            "lastName": "Goodspeed",
            "address": "8812 SW 4th Street",
            "city": "Blue Springs",
            "state": "MO",
            "postal": "64064",
            "membershipSkill": "Gold",
            "lastNameSkill": "Lima",
            "region": "USC",
            "phoneNumber": "13128527519",
            "customImageURL": "",
            "customButtonURL": "",
            "customColor": "",
            "customCompanyName": "",
            "customScriptHeader": "",
            "customEmbeddedWebURL": ""
        }*/

      var getQueue = function(region) {
        switch (region) {
          case 'MemberServices':
            return 'Member Services';
          case 'APAC':
            return 'Region APAC - Partner Operations';
          case 'APAC_Partner':
            return 'Region APAC - Sales Operations';
          case 'CANADA':
            return 'Region Canada - Partner Operations';
          case 'CANADA_Partner':
            return 'Region Canada - Sales Operations';
          case 'EMEA':
            return 'Region EMEA - Partner Operations';
          case 'EMEA_Partner':
            return 'Region EMEA - Sales Operations';
          case 'LATAM':
            return 'Region LATAM - Partner Operations';
          case 'LATAM_Partner':
            return 'Region LATAM - Sales Operations';
          case 'US_Partner':
            return 'Region US - Partner Operations';
          case 'USC':
            return 'Region US Central - Sales Operations';
          case 'USE':
            return 'Region US East - Sales Operations';
          case 'USW':
            return 'Region US West - Sales Operations';
          case 'VELOCITY':
            return 'Velocity - Sales Operations';
        }
        return 'Wrong Assignment';
      }

      var getUserDetails = function(email) {
        console.log("[GTS - purecloud] Calling Function getUserDetails by email - " + JSON.stringify(email));
        return $.ajax({
            url: "https://webportal.simdomain.com/PcnSqlSkillService/api/GetUserDetailsEmail" ,
            type: "POST",
            data: {"emailAddress":email},               
            dataType: "json"
        });
      }
      
      //Initialize widgets
      var customizeCXWidgets = function(data) {
        var gsolPureCloudWebChat = new gsol.Purecloud.WebChat();
        var gsolPureCloudCallback = new gsol.Purecloud.Callback();
        var gsolPureCloudMail = new gsol.Purecloud.Mail();
        gsolPureCloudWebChat.init(data);
        gsolPureCloudCallback.init(data);
        gsolPureCloudMail.init(data);

      }

  
      this.customizePureCloudWidgets = function (email) {
        if ('userSettings' in sessionStorage){
          console.log('[GTS - pureCloud] Get User profile from Web Sttorage')
          var userSettings = JSON.parse(sessionStorage.getItem('userSettings'));
          
         /* window.ac('identify', email, userSettings);
          window.ac('api.customer.update', {
            givenName: userSettings.givenName,
            familyName: userSettings.familyName
          });
         */
          customizeCXWidgets(userSettings);
        }
        
        else {
          console.log('[GTS - pureCloud] Get User profile from Web service')
          var promise = getUserDetails(email);
          promise.done(
            function (data){
              var d = $.extend({},data,{queue:getQueue(data.region)});
              d.email = email;
              d.familyName = d.lastName;
              d.givenName = d.firstName;
              d.displayName = d.firstName+' '+d.lastName;
              sessionStorage['userSettings'] = JSON.stringify(d);
              window.ac('identify', email, d);
              window.ac('api.visit.get', function(visit){
                sessionStorage['acVisitProfile'] = JSON.stringify(visit);
              });
              customizeCXWidgets(d);
            })
        }
        //Identify customer with Altocloud

      }

    }

    gsol.UI.Calculator = CalculatorClass;
    gsol.UI.Landing = LandingClass;
    gsol.Purecloud.WebChat = pureCloudWebchatClass;
    gsol.Purecloud.Callback = pureCloudCallbackClass;
    gsol.Purecloud.Mail = pureCloudMailClass;
    gsol.Altocloud = gsolGTSAC;
    gsol.CXWidgets = 
    gsol.User = pureCloudUser;
