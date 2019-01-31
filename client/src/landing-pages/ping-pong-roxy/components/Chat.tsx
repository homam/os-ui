import * as React from "react"
import NumberEntry from "./NumberEntry";
import {
  HOCProps,
  MSISDNEntryFailure,
  match,
  whenMSISDNEntry,
  MSISDNEntrySuccess,
  MOLink,
  State,
  IKeywordShortcode
} from "../../../clients/lp-api-mo/HOC";
import * as RDS from "../../../common-types/RemoteDataState"
import Loader from "./Loader";
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import { queryString, ITracker } from "../../../pacman/record";
import MOStep from "./MOStep";
const chatImg = require("../assets/imgs/chatImg.jpg");

function stateToKeywordAndShortcode(state: State) : IKeywordShortcode {
  return match<IKeywordShortcode>({
    msisdnEntry: RDS.match({
      nothingYet: () => null,
      loading: () => null,
      failure: () => null,
      success: (data) => data
    }),
    completed: (data) => null
  })(state) 
}

type ChatApplicationState = "Chatting" | "Subscribing"

class Chat extends React.PureComponent<HOCProps & InjectedIntlProps & {tracker: ITracker}> {

  state = {
      msisdnValue:"",
      pinValue: "",
      infoBox:"",
      applicationState: "Chatting" as ChatApplicationState,
      isShowingMOModal: false,
      messages: [
        [
            this.props.intl.formatMessage({
                id: "roxy_welcome",
                defaultMessage: "Hey baby! I was waiting for you."
            }),
            this.props.intl.formatMessage({
                id: "roxy_question",
                defaultMessage: "Do you think I look cute?"
            }),
            `<img src=${chatImg}/>`
        ],
      
        [
            this.props.intl.formatMessage({
                id: "roxy_more_photos",
                defaultMessage: "Do you want to see more sexy photos?"
            }), 
        ],

       
        [
          this.props.intl.formatMessage({
            id: "roxy_number_entry",
            defaultMessage: "I want to send it to your mobile number directly. Can you enter your mobile number for me?"
          }),
        ],

       
        [
            this.props.intl.formatMessage({
                id: "roxy_not_valid_number",
                defaultMessage: "It's seems the number you've sent is not valid. Please enter a valid mobile number baby."
            })
        ],
      
        [
            this.props.intl.formatMessage({
                id: "roxy_succesfully_subscribe",
                defaultMessage: "You've succesfully subscribe."
            })
        ],

        [
          this.props.intl.formatMessage({
              id: "roxy_empty_phone",
              defaultMessage: "Enter your mobile number to get more sexy photos baby!"
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

        var scrollValue = chatOuter.clientHeight - chatInner.clientHeight;

        chatInner.style.webkitTransform = "translateY(" + scrollValue + "px)";

      }

    }

    var btnsBoolean = booleanBtns.getElementsByTagName("button");

    var numberEntry = document.getElementById("numberEntry");

    var k = 1;


    function botMessageDone() {

      rowAdded();

      if (k != 3) {

        booleanBtns.style.display = "flex";

        booleanBtns.classList.add("fadeInUp");

      }

      if (k == 3) {

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
        
        self.props.tracker.advancedInPreFlow(`Answer-${k - 1}`, { 
          question: self.state.messages[k - 1][self.state.messages[k - 1].length - 1], 
          reply 
        }
      )

        if (k == 2) {

          setTimeout(() => botResponse(self.state.messages[1]), 1000);

        } else if (k == 3) {

          setTimeout(() => botResponse(self.state.messages[2]), 1000);

         }
         // else if (k == 4) {

        //   setTimeout(() => botResponse(self.state.messages[3]), 1000);

        // } else if (k == 5) {

        //   setTimeout(() => botResponse(self.state.messages[2]), 1000);

        // } 
        else {

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
          this.botResponse(self.state.messages[3]);
        }

        if(RDS.IsLoading(previous_rds) && RDS.IsSuccess(new_rds)) {
          // valid mobile number, show the user the popup
          this.setState({isShowingMOModal: true})
        }

      })(this.props.currentState)
    })(prevProps.currentState)

  }


  render() {
    const self = this
    const numberEntry = <NumberEntry 
      value={this.state.msisdnValue} 
      onSendClicked={({value}) => {
        
        if(value == ""){

          this.botResponse(self.state.messages[5]);

        }else{
          //Proceed if msisdn is not blank
          this.props.actions.submitMSISDN(window, null, value);
          this.setState({msisdnValue: value})
        }

        }} 
    />

    return <div className={`chat display-${this.state.applicationState}`}>

    {
      this.state.isShowingMOModal 
      ? 
        <MOStep {...stateToKeywordAndShortcode(this.props.currentState)} />
      : null
    }

      <div className={`infoBox display-${this.state.infoBox}`}>
      
          <div className="infoBoxContent">
          
            <div className="closeBtn" onClick={() => this.setState({infoBox:''})}>X</div>

          


          </div>

      </div>

      <div className="header">

        <span id="status"></span>

        <div className="user-details">

      
          <h1><Translate id="ping_pong_roxy" defaultMessage="Ping Pong Roxy" /></h1>
          <p><Translate id="escort" defaultMessage="Escort" /></p>

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

          <button data-reply={this.props.intl.formatMessage({id: "answer_yes", defaultMessage: "Yes"})}><Translate id="answer_yes" defaultMessage="Yes" /></button>

          <button data-reply={this.props.intl.formatMessage({id: "answer_no", defaultMessage: "No"})}><Translate id="answer_no" defaultMessage="No" /></button>

        </div>

        {
          match({
            completed: () => null,
            msisdnEntry: (rds) => RDS.match({
              nothingYet: () => numberEntry,
              loading: () => <Loader />,
              success: (result: MSISDNEntrySuccess) => {
                console.log(result.keyword, result.shortcode)
                return null;
              },
              failure: () => numberEntry
            })(rds)

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