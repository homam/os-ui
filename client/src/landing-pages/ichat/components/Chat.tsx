import * as React from "react"
import NumberEntry from "./NumberEntry";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  PINEntryFailure,
  PINEntrySuccess,
  match,
  isMSISDNEntry,
  isPINEntry,
  whenMSISDNEntry,
  whenPINEntry
} from "../../../clients/lp-api/HOC";
import * as RDS from "../../../common-types/RemoteDataState"
import PinEntry from "./PinEntry";
import Loader from "./Loader";

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

const message5 = [
  "Because I would like it to be private and secure, I would like to send it to your cell phone.",
  "Please accept the Terms and Conditions. And enter your mobile number."
]

const message6 = [
  "It's seems the number you've sent is not valid. Please enter a valid mobile number."
]

const message7 = [
  "It's seems that you haven't agreed to terms and conditions. Please agree to the terms and conditions."
]

const message8 = [
  "Thank you for submitting your number." , "I sent you a code kindly enter it below."
]

const message9 = [
  "Please enter a valid PIN code."
]

const message10 = [
  "You've succesfully subscribe."
]

type ChatApplicationState = "Chatting" | "Subscribing"

export default class Chat extends React.PureComponent<HOCProps> {

  state = {
      msisdnValue:"",
      checked: false,
      pinValue: "",
      infoBox:"",
      applicationState: "Chatting" as ChatApplicationState
  }

  botResponse: (msg) => void;

  componentDidMount() {

    const self = this;

    var
      strTime, botMsg, i, li,
      chatWrap = document.getElementById("chat-wrap"),
      chatHeader = document.getElementById("chat-header"),
      chatFooter = document.getElementById("chat-footer"),
      chatOuter = document.getElementById("chat-outer"),
      chatInner = document.getElementById("chatInner"),
      chatMessages = document.getElementById("chatBox"),
      status = document.getElementById("status"),
      booleanBtns = document.getElementById("boolean-buttons");

    i = 0;

    function getTime() {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes().toString();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.length < 2 ? '0' + minutes : minutes;
      strTime = hours + ':' + minutes + ' ' + ampm;
    }

    function startChat() {

      setTimeout(() => status.classList.add('online'), 100);

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

      if (li.className == "botTyping") {

        li.innerHTML = "<div class='avatar'></div> <div class='bubble'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div>";

        li.appendChild(document.createTextNode(""));

        chatMessages.appendChild(li);

        rowAdded();

        getTime();

      } else { }

      setTimeout(function () {


        li.innerHTML = "";

        li.className = "botResponse";

        li.appendChild(document.createTextNode(botMsg[i]));

        li.innerHTML = "<div class='avatar'><span class='time'>" + strTime + "</span></div> <div class='bubble'>" + botMsg[i] + "</div>";

        chatMessages.appendChild(li);

        if (++i < botMsg.length) {

          setTimeout(function () {

            setTimeout(botRelay, 1500);

          }, 1000);

        } else {

          botMessageDone();

        }

      }, 1500);


    }

    function userResponse(userMessage) {

      var someMsg = userMessage;

      li = document.createElement("li");

      li.className = "userResponse";

      li.appendChild(document.createTextNode(someMsg));

      li.innerHTML = "<div class='res_bubble'>" + someMsg + "</div><span class='res_time'>" + strTime + "</span>"

      chatMessages.appendChild(li);

      rowAdded();

      getTime();

    }

    function rowAdded() {

      if (chatInner.clientHeight > chatOuter.clientHeight) {

        var scrollValue = chatOuter.clientHeight - chatInner.clientHeight;

        chatInner.style.webkitTransform = "translateY(" + scrollValue + "px)";

      }

    }

    var btnsBoolean = booleanBtns.getElementsByTagName("button");

    var numberEntry = document.getElementById("numberEntry");

    var k = 1;


    function botMessageDone() {

      rowAdded();

      if (k != 5) {

        booleanBtns.style.display = "flex";

        booleanBtns.classList.add("fadeInUp");

      }

      if (k == 5) {

        // numberEntry.style.display = "flex";
        self.setState({applicationState: "Subscribing"})

        numberEntry.classList.add("fadeInUp");


        var delayTimer;

        var userAgent = navigator.userAgent || navigator.vendor || window['opera'];

        if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {

          delayTimer = 400;

        } else {

          delayTimer = 2000;

        }

        setTimeout(function () {

          document.getElementById("msisdn").focus();

        }, delayTimer);


      }

    }

    for (var j = 0; j < btnsBoolean.length; j++) {

      btnsBoolean[j].addEventListener("click", function () {

        k++;

        var reply = this.getAttribute('data-reply');

        userResponse(reply);

        booleanBtns.style.display = "none";


        if (k == 2) {

          setTimeout(() => botResponse(message2), 1000);

        } else if (k == 3) {

          setTimeout(() => botResponse(message3), 1000);

        } else if (k == 4) {

          setTimeout(() => botResponse(message4), 1000);

        } else if (k == 5) {

          setTimeout(() => botResponse(message5), 1000);

        } else {

        }

      });

    }

    setTimeout(startChat, 2500);

    this.botResponse = botResponse
  }

  componentDidUpdate(prevProps : HOCProps) {
    whenMSISDNEntry(previous_rds => {
      whenMSISDNEntry(new_rds => {
        if(RDS.IsLoading(previous_rds) && RDS.IsFailure(new_rds)) {
          // invalid mobile number
          this.botResponse(message6);
        }
      })(this.props.currentState)

      whenPINEntry(new_rds => {
        if(RDS.IsNothingYet(new_rds)) {
          // we just sent you a pin
          this.botResponse(message8);
        }
      })(this.props.currentState)
    })(prevProps.currentState)


    whenPINEntry(previous_rds => {
      whenPINEntry(new_rds => {
        if(RDS.IsLoading(previous_rds) && RDS.IsFailure(new_rds)) {
          // invalid pin
          this.botResponse(message9);
        }
      })(this.props.currentState)

      whenPINEntry(new_rds => {
        RDS.whenSuccess((data: PINEntrySuccess) => {
          // succesful subscribe
          this.botResponse(message10);
        })(new_rds)
      })(this.props.currentState)


    })(prevProps.currentState)
  }


  render() {
    const numberEntry = <NumberEntry 
      value={this.state.msisdnValue} 
      checked={this.state.checked}
      onTermsClicked = {() =>  this.setState({infoBox:'active'})}
      onSendClicked={({value, checked}) => {

        if(value == ""){

          this.botResponse(message6);

        }else if(!checked){

          this.botResponse(message7);

        }else{
          //Proceed if msisdn is not blank and accepted terms
          this.props.actions.submitMSISDN(window, null, value);
          this.setState({checked, msisdnValue: value})
        }

        }} 
    />
    const pinEntry = <PinEntry 
      msisdnValue={this.state.msisdnValue} 
      value={this.state.pinValue} 
      onSendClicked={pin => this.props.actions.submitPIN(pin) }
      onNotMyMobileClicked={() => this.props.actions.backToStart()}
      />   

    return <div className={`chat display-${this.state.applicationState}`}>

      <div className={`infoBox display-${this.state.infoBox}`}>
      
          <div className="infoBoxContent">
          
            <div className="closeBtn" onClick={() => this.setState({infoBox:''})}>X</div>

          
          </div>

      </div>

      <div className="header">

        <span id="status"></span>

        <div className="user-details">

          <h1>Medium Amanda</h1>
          <p>Astrologer</p>

        </div>

        <div className="info" onClick={() => this.setState({infoBox:'active'})}></div>

      </div>

      <div className="area" id="chat-outer">

        <div id="chatInner">

          <ul id="chatBox"></ul>

        </div>

      </div>

      <div className="footer">

        <div className="boolean-group animated" id="boolean-buttons">

          <button data-reply="Yes">Yes</button>

          <button data-reply="No">No</button>

        </div>

        {
          match({
            completed: () => null,
            msisdnEntry: (rds) => RDS.match({
              nothingYet: () => numberEntry,
              loading: () => <Loader />,
              success: () => null,
              failure: (error : MSISDNEntryFailure) => numberEntry
            })(rds),
            pinEntry: (rds) => RDS.match({
              nothingYet: ()  => pinEntry,
              loading: () => <div>...</div>,
              success: (succ: PINEntrySuccess) => <div className="animated" id="finalLink">
                <a href={succ.finalUrl} className="button">Access Portal</a>
              </div>,
              failure: (err: PINEntryFailure) => pinEntry
            })(rds) ,

          })(this.props.currentState) 
        }

        <div className="animated" id="mo">

          <button>SMS NOW</button>

        </div>

      </div>

    </div >

  }
}