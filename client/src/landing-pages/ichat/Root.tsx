import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  PINEntryFailure,
  PINEntrySuccess,
  match
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import "./assets/css/styles.less?raw"
import { number } from "prop-types";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
  };

  componentDidMount(){

    var
    botMsg,i,li,
    chatWrap = document.getElementById("chat-wrap"),
    chatHeader = document.getElementById("chat-header"),
    chatFooter = document.getElementById("chat-footer"),
    chatOuter = document.getElementById("chat-outer"),
    chatInner = document.getElementById("chatInner"),
    chatMessages = document.getElementById("chatBox"),
    state = document.getElementById("status"),
    booleanBtns = document.getElementById("boolean-buttons");

    var strTime;	
	
    function getTime(){
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0'+ minutes : minutes;
      strTime = hours + ':' + minutes + ' ' + ampm;
    }

    window.addEventListener("resize", responsiveElements);
	
    function responsiveElements(){
  
      var lockedArea = chatHeader.clientHeight + chatFooter.clientHeight;
      
      chatOuter.style.marginTop = chatHeader.clientHeight + "px";
      
      chatOuter.style.height = chatWrap.clientHeight - lockedArea - 5 + "px";
  
    };

    function preloader() {
		
      var elem = document.getElementById("bar");   
      var width = 1;
      var id = setInterval(frame, 30);
      
      function frame() {
        
        if (width >= 100) {
              
          document.getElementById("splash").style.display="none";
          
          chatWrap.style.display="block";

          setTimeout(startChat, 1000);

          responsiveElements();
          
          clearInterval(id);
          
        } else {
          
          width++; 
          
          elem.style.width = width + '%'; 
          
        }
        
      }
    }
    
    preloader();


    i = 0;
	
    const message1 = [
      "Welcome, I was waiting for you.", 
      "An amazing vision occured and I am sensing information about you.", 
      "Is it correct that you were born December?"
    ];
    
    const message2 = [
      "Is it right that you are a woman?"
    ];
    
    const message3 = [
      "Is it correct that you are currently married?"
    ];
    
    const message4 = [
      "Ok, I have already confirmed that I am receiving your signals.",
      "Would you like to receive your complete reading of the future?"
    ]
    
    const message5 =[
      "Because I would like it to be private and secure, I would like to send it to your cell phone.",
      "Please accept the Terms and Conditions. And enter your mobile number."
    ]
    
    const message6 =[
      "Please enter a valid mobile number."
    ]
    
    const message7 =[
      "Please agree to the terms and conditions."
    ]
    
    const message8 =[
      "Please enter a valid PIN code."
    ]


    function startChat(){
		
      state.classList.add("online");

      botResponse(message1);
        
    }

    function botResponse(botMsgData) {
		
      i = 0;
      
      botMsg = [];
      
      botMsg = botMsgData;
    
      botRelay();
      
    }

    function botRelay() {
	
      li = document.createElement("li");
      
      li.className = "botTyping";
      
      if(li.className == "botTyping"){
        
        li.innerHTML = "<div class='avatar'></div> <div class='bubble'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div>";
        
        li.appendChild(document.createTextNode(""));
        
        chatMessages.appendChild(li);
        
        rowAdded();
        
        getTime();
        
      }else{}
        
      setTimeout(function(){
       
        
        li.innerHTML = "";  
          
          li.className = "botResponse";
         
          li.appendChild(document.createTextNode(botMsg[i]));
          
          li.innerHTML = "<div class='avatar'><span class='time'>"+strTime+"</span></div> <div class='bubble'>"+botMsg[i]+"</div>"; 
      
          chatMessages.appendChild(li);
      
          if (++i < botMsg.length) {
            
            setTimeout(function() {
              
              setTimeout(botRelay, 1500);
              
            }, 1000);
            
          } else {
            
          botMessageDone();
                      
          }
        
      },1500);
      
    
    }

    function userResponse(userMessage) {
		
      var someMsg = userMessage;
    
      li = document.createElement("li");
    
      li.className = "userResponse";
    
      li.appendChild(document.createTextNode(someMsg));
      
      li.innerHTML = "<div class='res_bubble'>"+someMsg+"</div><span class='res_time'>"+strTime+"</span>"
    
      chatMessages.appendChild(li);
      
      rowAdded();
      
      getTime();
      
    }

    function rowAdded(){
		
      if(chatInner.clientHeight > chatOuter.clientHeight ){
            
        var scrollValue = chatOuter.clientHeight - chatInner.clientHeight;
        
        chatInner.style.webkitTransform= "translateY("+scrollValue+"px)";		
  
      }  
    
    }

  var btnsBoolean =  booleanBtns.getElementsByTagName("button");
	
	var numberEntry =  document.getElementById("numberEntry");
	
	var k=1;
	
	
	function botMessageDone(){
		
		rowAdded();
		
		if(k != 5){
			
			booleanBtns.style.display="block";
			
			booleanBtns.classList.add("fadeInUp");
			
		}
		
		if (k==5){
			
			numberEntry.style.display="block";
			
			numberEntry.classList.add("fadeInUp");
			
			
			var delayTimer;
			
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;
			
			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				
				delayTimer=400;
		
			}else{
				
				delayTimer = 2000;
				
			}
			
			
			setTimeout(function(){
				
				document.getElementById("msisdn").focus();
				
			}, delayTimer);
			
			
		}
			
	}
	
	for (var j = 0; j < btnsBoolean.length; j++) {
	
		btnsBoolean[j].addEventListener("click", function(){
			
      k++;
      
      var reply = this.getAttribute('data-reply');

      userResponse(reply);
			
			booleanBtns.style.display="none";
			
				
				if(k==2){
				
					setTimeout(botResponse(message2),1000);
				
				}else if(k==3){
					
					setTimeout(botResponse(message3),1000);
					
				}else if(k==4){
					
					setTimeout(botResponse(message4),1000);
					
				}else if(k==5){
					
					setTimeout(botResponse(message5),1000);
					
				}else{
					
				}

		});
		
	} 

  }


  render() {
    return (
      <div className="container">
        <TranslationProvider locale={this.state.locale}>

{/*----------Splash Area----------*/}

<div>

<div className="panel splash" id="splash">
		
		<div className="top-area">Exclusive chat invitation</div>
			
		<div className="center-area">
			
			<h2>The predictions</h2>
			
			<div className="avatar"></div>
			
			<h1>Medium Amanda</h1>
			
			<h2>the most recognized astrologer <br></br> in the whole world</h2>
			
			<p>Your future is written...</p>	
			
		</div>	
		
		<div className="bottom-area">
			
			Establishing Connection, Please wait...
			
			<div className="progressbar">
			
				<div id="bar"></div>	
			
			</div>
			
		</div>

  </div>

 {/*----------Chat Area----------*/}

  <div className="panel chat" id="chat-wrap">
      
      <div className="top-area" id="chat-header">
          
          <span id="status"></span>
          
          <div className="user-details">
          
            <h1>Medium Amanda</h1>
            <p>Astrologer</p>
          
          </div>
          
          <div className="info"></div>
        
        </div>

        <div className="center-area" id="chat-outer">

          <div id="chatInner">

            <ul id="chatBox"></ul>

          </div> 

        </div>

        <div className="bottom-area" id="chat-footer">

        <div className="boolean-group animated" id="boolean-buttons">

            <button data-reply="Yes">Yes</button>

            <button data-reply="No">No</button>

        </div>

            <div className="animated" id="numberEntry">

                {/*<input type="tel" name="msisdn" id="msisdn" maxlength="10" placeholder="Enter mobile number here..."/>*/}

                  <button>Send</button>

                <div id="terms">

                 {/* <input type="checkbox" name="agree" value="agree"> I accept the <a href="#">Terms &amp; Conditions</a>*/}

                </div>

                <div className="clearFX"></div>
			

            </div>

            <div className="animated" id="pinEntry">

                {/*<input type="tel" name="pin" id="pin" maxlength="4" placeholder="Enter PIN here..."/>*/}

                <button>Send</button>

                <div id="msisdnCheck">

                  if <span id="userMSISDN"></span> is not your mobile number <a href="">Click here</a>.

                </div>

            </div>

            <div className="animated" id="mo">

              <button>SMS NOW</button>

            </div>

        </div>
      
    </div>

  </div>

        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);