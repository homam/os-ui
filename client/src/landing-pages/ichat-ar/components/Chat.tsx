import * as React from "react"
import NumberEntry from "./NumberEntry";
import {
  HOCProps,
  MSISDNEntryFailure,
  PINEntryFailure,
  PINEntrySuccess,
  match,
  whenMSISDNEntry,
  whenPINEntry
} from "../../../clients/lp-api/HOC";
import * as RDS from "../../../common-types/RemoteDataState"
import PinEntry from "./PinEntry";
import Loader from "./Loader";
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import { queryString, ITracker } from "../../../pacman/record";


type ChatApplicationState = "Chatting" | "Subscribing"

class Chat extends React.PureComponent<HOCProps & InjectedIntlProps & {tracker: ITracker}> {

  state = {
      msisdnValue:"69",
      checked: false,
      pinValue: "",
      infoBox:"",
      termsBox:"",
      applicationState: "Chatting" as ChatApplicationState,
      isDelayingPinUI: true,
      messages: [
        [
            this.props.intl.formatMessage({
                id: "amanda_welcome",
                defaultMessage: "Welcome, I was waiting for you."
            }),
            this.props.intl.formatMessage({
                id: "amanda_amazing_vision",
                defaultMessage: "An amazing vision occured and I am sensing information about you."
            }),
            this.props.intl.formatMessage({
                id: "amanda_your_dob",
                defaultMessage: "Is it correct that you were born {month}?" 
            }, {month: typeof window == "undefined" ? "Unknown" : this.props.intl.formatMessage({id: (queryString(window.location.search, "month") || "on_a_day").toLowerCase(), defaultMessage: "on a day"})})
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_your_gender",
                defaultMessage: "Is it right that you are a {gender}?"
            }, {gender: typeof window == "undefined" ? "Unknown" : this.props.intl.formatMessage({id: (queryString(window.location.search, "gender") || "woman").toLowerCase(), defaultMessage: "woman"})})
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_marital_status",
                defaultMessage: "Is it correct that you are currently married?"
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_signals",
                defaultMessage: "Ok, I have already confirmed that I am receiving your signals."
            }),
            this.props.intl.formatMessage({
                id: "amanda_would_you_future",
                defaultMessage: "Would you like to receive your complete reading of the future?"
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_private_secure",
                defaultMessage: "Because I would like it to be private and secure, I would like to send it to your cell phone."
            }),
            this.props.intl.formatMessage({
                id: "amanda_accept_tnc",
                defaultMessage: "Please accept the Terms and Conditions. And enter your mobile number."
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_not_valid_number",
                defaultMessage: "It's seems the number you've sent is not valid. Please enter a valid mobile number."
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_have_not_agreed_tnc",
                defaultMessage: "It's seems that ou haven't agreed to terms and conditions. Please agree to the terms and conditions."
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_tq_submit_number",
                defaultMessage: "Thank you for submitting your number.",
            }),
            this.props.intl.formatMessage({
              id: "amanda_sent_you_a_code",
              defaultMessage: "I sent you a code kindly enter it below."
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_valid_pin",
                defaultMessage: "Please enter a valid PIN code."
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "amanda_succesfully_subscribe",
                defaultMessage: "You've succesfully subscribe."
            })
        ],

        [
          this.props.intl.formatMessage({
              id: "ops_orange",
              defaultMessage: "You've succesfully subscribe."
          })
      ],

      [
        this.props.intl.formatMessage({
            id: "ops_vodafone",
            defaultMessage: "You've succesfully subscribe."
        })
    ]
      
      ]
  }

  botResponse: (msg) => void;

  componentDidMount() {

    console.log(queryString(window.location.search, "gender"), this.state.messages)

    const self = this;

    var
      strTime, botMsg, i, li,
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

      botResponse(self.state.messages[0]);

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

        var scrollValue = (chatOuter.clientHeight - chatInner.clientHeight) - 120;

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

          /*
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
            */


      }

    }

    for (var j = 0; j < btnsBoolean.length; j++) {

      btnsBoolean[j].addEventListener("click", function () {

        k++;

        var reply = this.getAttribute('data-reply');

        userResponse(reply);

        booleanBtns.style.display = "none";

        self.props.tracker.advancedInPreFlow(`Answer-${k - 1}`, { 
            question: self.state.messages[k - 1][self.state.messages[k - 1].length - 1], 
            reply 
          }
        )

        if (k == 2) {

          setTimeout(() => botResponse(self.state.messages[1]), 1000);

        } else if (k == 3) {

          setTimeout(() => botResponse(self.state.messages[2]), 1000);

        } else if (k == 4) {

          setTimeout(() => botResponse(self.state.messages[3]), 1000);

        } else if (k == 5) {

          setTimeout(() => botResponse(self.state.messages[4]), 1000);

        } else {

        }

      });

    }

    setTimeout(startChat, 2500);

    this.botResponse = botResponse
  }

  componentDidUpdate(prevProps : HOCProps) {
    const self = this
    whenMSISDNEntry(previous_rds => {
      whenMSISDNEntry(new_rds => {
        if(RDS.IsLoading(previous_rds) && RDS.IsFailure(new_rds)) {
          // invalid mobile number
          this.botResponse(self.state.messages[5]);
        }
      })(this.props.currentState)

      whenPINEntry(new_rds => {
        if(RDS.IsNothingYet(new_rds)) {
          // we just sent you a pin
          this.botResponse(self.state.messages[7]);
          this.setState({isDelayingPinUI: true})
          setTimeout(() => {
            this.setState({isDelayingPinUI: false})
          }, 6500)
        }
      })(this.props.currentState)
    })(prevProps.currentState)


    whenPINEntry(previous_rds => {
      whenPINEntry(new_rds => {
        if(RDS.IsLoading(previous_rds) && RDS.IsFailure(new_rds)) {
          // invalid pin
          this.botResponse(self.state.messages[8]);
        }
      })(this.props.currentState)

      whenPINEntry(new_rds => {
        RDS.whenSuccess(() => {
          // succesful subscribe
          this.botResponse(self.state.messages[9]);
        })(new_rds)
      })(this.props.currentState)


    })(prevProps.currentState)
  }


  render() {
    const self = this
    const numberEntry = <NumberEntry 
      value={this.state.msisdnValue} 
      checked={this.state.checked}
      onTermsClicked = {() =>  this.setState({infoBox:'active'})}
      onSendClicked={({value, checked}) => {

        if(value == this.state.msisdnValue){

          this.botResponse(self.state.messages[5]);

        }else if(!checked){

          this.setState({ termsBox: 'terms' });
          this.botResponse(self.state.messages[6]);

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

    return <div className={`chat display-${this.state.applicationState}`} id="chat">

      <div className={`infoBox display-${this.state.infoBox}`}>
      
          <div className="infoBoxContent">
          
            <div className="closeBtn" onClick={() => this.setState({infoBox:''})}>X</div>

          </div>

      </div>

      <div className="header">

        <span id="status"></span>

        <div className="user-details">

          <h1><Translate id="medium_amanda" defaultMessage="Medium Amanda" /></h1>
          <p><Translate id="astrologer" defaultMessage="Astrologer" /></p>

        </div>

        <div className="info" onClick={() => this.setState({infoBox:'active'})}></div>

      </div>

      <div className="area" id="chat-outer">

        <div id="chatInner">

          <ul id="chatBox"></ul>

        </div>

      </div>

      <div className={`footer display-${this.state.termsBox}`} id="footer">

        <div className="boolean-group animated" id="boolean-buttons">

          <button data-reply={this.props.intl.formatMessage({id: "answer_yes", defaultMessage: "Yes"})}><Translate id="answer_yes" defaultMessage="Yes" /></button>

          <button data-reply={this.props.intl.formatMessage({id: "answer_no", defaultMessage: "No"})}><Translate id="answer_no" defaultMessage="No" /></button>

        </div>

        <div className="boolean-operator animated" id="operator-buttons">

          {/* <button data-reply={this.props.intl.formatMessage({ id: "ops_orange", defaultMessage: "Yes" })}>Vodafone</button>

          <button data-reply={this.props.intl.formatMessage({ id: "ops_vodafone", defaultMessage: "No" })}>Orange</button> */}

          <button type="button" className="btn-vodafone" id="select-btn1">Vodafone</button>
          <button type="button" className="btn-orange" id="select-btn2">Orange</button>

        </div>

        <div className="terms-group animated" id="terms-buttons">

          <div className="instructions"><Translate id="terms_msg" defaultMessage="Do you accept the Terms and Conditions?" /></div>

          <div className="terms-buttons">
          <button data-reply={this.props.intl.formatMessage({id: "answer_yes", defaultMessage: "Yes"})}
          
            onClick = {()=>{

              this.setState({ termsBox: null })
              document.getElementById('numberEntry').style.display="none";
              document.getElementById('agree').click();
              document.getElementById('msisdnBtn').click();

            }}
             
          ><Translate id="terms_yes" defaultMessage="Yes" /></button>

          <button data-reply={this.props.intl.formatMessage({id: "answer_no", defaultMessage: "No"})} onClick={()=>{this.setState({ termsBox: '' })}}><Translate id="terms_no" defaultMessage="No" /></button>

          </div>  

        </div>

        {
          match({
            completed: () => null,
            msisdnEntry: (rds) => RDS.match({
              nothingYet: () => numberEntry,
              loading: () => <Loader />,
              success: () => null,
              failure: () => numberEntry
            })(rds),
            pinEntry: (rds) => RDS.match({
              nothingYet: ()  => this.state.isDelayingPinUI ? <Loader /> : pinEntry,
              loading: () => <Loader />,
              success: (succ: PINEntrySuccess) => <div className="animated fadeUp" id="finalLink">
                <a href={succ.finalUrl} className="button"><Translate id="access_portal" defaultMessage="Access Portal" /></a>
              </div>,
              failure: () => pinEntry
            })(rds) ,

          })(this.props.currentState) 
        }

        <div className="animated" id="mo">

          <button><Translate id="sms_now" defaultMessage="SMS NOW" /></button>

        </div>

      </div>

    </div >
  }
}

export default(injectIntl(Chat))