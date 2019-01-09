import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  HOCProps,
  match
} from "../../clients/redir-to-send-sms/HOC"
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import './assets/css/style.css?raw'
import MSISDNInput from "../../common-components/msisdn/msisdn-input"

const imgPhone = require("./assets/img/IphoneX.png");
const imgTv = require("./assets/img/tv-min.png");
const imgLaptop = require("./assets/img/laptop-min.png");
const imgLeftPhone = require("./assets/img/IphonXs-left.png");
const imgBigTV = require("./assets/img/tv-smsg.png");
const imgBigLaptop = require("./assets/img/laptop.png");


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  process.env.country,
  "xmas-wishlist"
);

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >
        <div>
          <p>Enter your mobile phone</p>
          <div className="input-box" id="input-box">
          <MSISDNInput
              maxLength={10}
              placeholder="Phone number"
              countryCode="+27"
              id="msisdnid"
              msisdn={this.state.msisdn}
              onChange={msisdn => this.setState({ msisdn })}
            />
            {/* <input
              placeholder="Phone number"
              value={this.state.msisdn}
              onChange={ev => this.setState({ msisdn: ev.target.value })}
            /> */}
            <button id="btn-submit" disabled type="submit" disabled={false}>OK</button>
            <div id="valid"></div>
            <span>subscription R10/day</span>
          </div>
        </div>
      </form>
    );
  }
}

function SendYesStep() {
  return <div className="reply-message"><p>Reply</p><h1>YES</h1><p>to the SMS you just received</p></div>
}

class Root extends React.PureComponent<HOCProps> {

  componentDidMount() {


    document.getElementById("btn-submit").disabled = true

    window.onkeyup = function(event) {
      if (document.querySelector('input').value.length >= 9) {
        document.querySelector('input').style.border = "2px solid #3A9960";
        document.querySelector('input').style.backgroundColor = "rgba(58, 153, 96, 0.2)";
        document.querySelector('input').style.color = "#3A9960";
        document.querySelector('input').style.fontWeight = "bold";
        document.getElementById('btn-submit').style.opacity = "1";
        document.getElementById("btn-submit").disabled = false;
        document.getElementById('valid').style.display = "block";
        
      }
      if (document.querySelector('input').value.length <= 9) {
        document.querySelector('input').style.border = "2px solid grey";
        document.querySelector('input').style.backgroundColor = "rgba(0, 0, 0, 0.05)";
        document.querySelector('input').style.color = "black";
        document.querySelector('input').style.fontWeight = "normal";
        document.getElementById('btn-submit').style.opacity = "0.2";
        document.getElementById("btn-submit").disabled = true;
        document.getElementById('valid').style.display = "none";
        
      }
    };

    
   

  var containers = document.getElementsByClassName('container-first');
  var giftsopen = document.getElementsByClassName('gift-open');
  var phonecontainer = document.getElementsByClassName('phone-container');
  var messagecontainer = document.getElementsByClassName('message-container');
  var successcontainer = document.getElementsByClassName('success-container');

    for(var i=0; i < containers.length; i++){
     containers[i].style.height = window.innerHeight + "px";
    }

    for(var i=0; i < giftsopen.length; i++){
      giftsopen[i].style.height = window.innerHeight + "px";
     }

    for(var i=0; i < phonecontainer.length; i++){
      phonecontainer[i].style.height = window.innerHeight + "px";
     }

    for(var i=0; i < messagecontainer.length; i++){
      messagecontainer[i].style.height = window.innerHeight + "px";
     }

     for(var i=0; i < successcontainer.length; i++){
      successcontainer[i].style.height = window.innerHeight + "px";
     }
  

    var gifts = document.getElementById("gifts"),
      gift = gifts.getElementsByClassName("gift");

    

    for (var i = 0; i < gift.length; i++) {

      gift[i].addEventListener("click", function () {

        var dataName = this.getAttribute('data-item');

        this.style.display = "none";

        if (dataName == 'iphone') {
          document.getElementById("wishlist-title").style.display = "none";
          document.getElementById("sml-iphone").style.display = "block";
          document.getElementById("arrow").style.left = "45%";
        };

        if (dataName == 'tv') {
          document.getElementById("wishlist-title").style.display = "none";
          document.getElementById("sml-tv").style.display = "block";
          document.getElementById("arrow").style.left = "47%";
        };

        if (dataName == 'laptop') {
          document.getElementById("wishlist-title").style.display = "none";
          document.getElementById("sml-laptop").style.display = "block";
          document.getElementById("arrow").style.left = "75%";
        };

      }, false)

    }



    var container = document.getElementById("container"),
      trigger = container.getElementsByClassName("add-to-wishlist");

    var checker = 0;

    for (var j = 0; j < trigger.length; j++) {

      trigger[j].addEventListener("click", function () {

        checker++;

        if (checker == 3) {

          setTimeout(function () {

            container.className = "";

            container.className += "container display-step8";

          }, 0)


        }

      })

    }

  }


  state = {
    locale: "en",
    msisdn: "",
    display: 'step1'
  };
  render() {
    return (
      <div className={`container display-${this.state.display}`} id="container">

        <div className="page step1">

          <div className="overlay-gift">

            <div className="container-first" id="wrapper">

              <div className="top-bar">
                <div className="step progress gray active"><span>1</span></div>
                <div className="step progress gray"><span>2</span></div>
                <div className="step progress gray"><span>3</span></div>
              </div>

              <div className="top-text">
                <div className="toptitle green">First</div>
                <h1 className="red">choose your gift</h1>
              </div>

              <div className="arrow-down" id="arrow"></div>
              <div className="gift-container">
                <div className="gifts" id="gifts">
                  <div className="gift shaker gyellow" data-item="iphone" onClick={() => { this.setState({ display: 'step2' }) }} id="gift1"></div>
                  <div className="gift shaker2 gblue" data-item="tv" onClick={() => { this.setState({ display: 'step4' }) }} id="gift2"></div>
                  <div className="gift shaker3 ggreen" data-item="laptop" onClick={() => { this.setState({ display: 'step6' }) }} id="gift3"></div>
                </div>

                <div className="snow"></div>
              </div>

              <div className="snt-wishlist">
                <div className="santa"></div>
                <div className="wishlist empty over-white">
                  <div className="leaf-red"></div>
                  <span className="green">Your wishlist</span>
                  <p className="gray" id="wishlist-title">is empty, open your first gift</p>
                  <div className="wishlist-gift">
                    <div id="sml-iphone"></div>
                    <div id="sml-tv"></div>
                    <div id="sml-laptop"></div>
                  </div>
                </div>



              </div>

            </div>
          </div>

        </div>

        <div className="page step2">

          <div className="gift-container">
            <div className="open-box yellow-gift">

              <div className="top-text">
                <h1 className="red">tap to open</h1>
              </div>
              <div className="big-gift gyellow" onClick={() => { this.setState({ display: 'step3' }) }}></div>

            </div>
          </div>

          <div className="overlay-gift cover blur-in">

            <div className="container-first">

            </div>
          </div>



        </div>

        <div className="page step3">

          <div className="open-box gift-open yellow-gift">

            <div className="top-text">
              <h1 className="red">Congratulations!</h1>
              <p className="gray">you have found:</p>
            </div>

            <div className="iphoneXs over-white box-over">
              <img src={imgLeftPhone} />
              <p> iPhoneXs </p>
            </div>

            <button className="add-to-wishlist" onClick={() => { this.setState({ display: 'step1' }) }}>Add to wishlist <span> + </span></button>
            <div className="santa"></div>
          </div>

          <div className="overlay-gift cover blur-in">

            <div className="container-first">

            </div>
          </div>

        </div>

        <div className="page step4">

          <div className="open-box blue-gift">

            <div className="top-text">
              <h1 className="red">tap to open</h1>
            </div>
            <div className="big-gift gblue" onClick={() => { this.setState({ display: 'step5' }) }}></div>

          </div>

          <div className="overlay-gift cover blur-in">

            <div className="container-first">

              <div className="top-bar">
                <div className="step progress gray active"><span>1</span></div>
                <div className="step progress gray"><span>2</span></div>
                <div className="step progress gray"><span>3</span></div>
              </div>

              <div className="top-text">
                <div className="toptitle green">First</div>
                <h1 className="red">choose your gift</h1>
              </div>


              <div className="gift-container">
                <div className="gifts">
                  <div className="gift shaker gyellow"></div>
                  <div className="gift shaker2 gblue"></div>
                  <div className="gift shaker3 ggreen"></div>
                </div>

                <div className="snow"></div>
              </div>

              <div className="snt-wishlist">
                <div className="santa"></div>
                <div className="wishlist empty over-white">
                  <div className="leaf-red"></div>
                  <span className="green">Your wishlist</span>
                  <p className="gray">is empty, open your first gift</p>
                </div>

              </div>

            </div>
          </div>

        </div>

        <div className="page step5">

          <div className="open-box gift-open blue-gift">

            <div className="top-text">
              <h1 className="red">Congratulations!</h1>
              <p className="gray">you have found:</p>
            </div>

            <div className="SmartTv over-white box-over">
              <img src={imgBigTV} />
              <p> Smart TV </p>
            </div>

            <button className="add-to-wishlist" onClick={() => { this.setState({ display: 'step1' }) }}>Add to wishlist <span> + </span></button>
            <div className="santa"></div>
          </div>

          <div className="overlay-gift cover blur-in">

            <div className="container-first">

            </div>
          </div>

        </div>

        <div className="page step6">

          <div className="open-box green-gift">

            <div className="top-text">
              <h1 className="red">tap to open</h1>
            </div>
            <div className="big-gift ggreen" onClick={() => { this.setState({ display: 'step7' }) }}></div>

          </div>

          <div className="overlay-gift cover blur-in">

            <div className="container-first">

              <div className="top-bar">
                <div className="step progress gray active"><span>1</span></div>
                <div className="step progress gray"><span>2</span></div>
                <div className="step progress gray"><span>3</span></div>
              </div>

              <div className="top-text">
                <div className="toptitle green">First</div>
                <h1 className="red">choose your gift</h1>
              </div>


              <div className="gift-container">
                <div className="gifts">
                  <div className="gift shaker gyellow"></div>
                  <div className="gift shaker2 gblue"></div>
                  <div className="gift shaker3 ggreen"></div>
                </div>

                <div className="snow"></div>
              </div>

              <div className="snt-wishlist">
                <div className="santa"></div>
                <div className="wishlist empty over-white">
                  <div className="leaf-red"></div>
                  <span className="green">Your wishlist</span>
                  <p className="gray">is empty, open your first gift</p>
                </div>

              </div>

            </div>
          </div>


        </div>

        <div className="page step7">

          <div className="open-box gift-open green-gift">
            <div className="top-text">
              <h1 className="red">Congratulations!</h1>
              <p className="gray">you have found:</p>
            </div>

            <div className="Laptop over-white box-over">
              <img src={imgBigLaptop} />
              <p> Laptop </p>
            </div>

            <button className="add-to-wishlist" onClick={() => { this.setState({ display: 'step1' }) }}>Add to wishlist <span> + </span></button>
            <div className="santa"></div>
          </div>


          <div className="overlay-gift cover blur-in">

            <div className="container-first">

            </div>
          </div>

        </div>

        <div className="page step8">

          <div className="phone-container">

            <div className="top-bar">
              <div className="step progress gray "><span>1</span></div>
              <div className="step progress gray active"><span>2</span></div>
              <div className="step progress gray"><span>3</span></div>
            </div>

            <div className="top-phone">
              <div className="subtitle green">Want your gifts under your tree this year?</div>
              <h1 className="red">SEND YOUR WISHLIST</h1>
              <div className="title-santa"><h2 className="red">to santa</h2></div>

            </div>

            <div className="santa-left"></div>


            <div className="over-white phone-enter">

              <TranslationProvider locale={this.state.locale}>
                <TransitionGroup className={simpleOpacityTransitionStyles.group}>
                  {match({
                    nothingYet: () => (
                      <SimpleOpacityTransition key="msisdnEntry">
                        <MSISDNEntryStep
                          msisdn={this.state.msisdn}
                          onEnd={msisdn => {
                            this.setState({ msisdn });
                            this.props.actions.submitMSISDN(window, null, msisdn);
                          }}
                        />
                      </SimpleOpacityTransition>
                    ),
                    msisdnEntered: () => (
                      <SimpleOpacityTransition key="sendYes">
                        <SendYesStep />
                      </SimpleOpacityTransition>
                    )
                  })(this.props.currentState)}
                </TransitionGroup>
              </TranslationProvider>
            </div>

            <div className="wishlist-container">
              <p>To stand a chance to win</p>
              <div className="wishlist add-tree over-white">
                <div className="leaf-red"></div>
                <span className="green">Your wishlist</span>
                <div className="wishlist-content "><img src={imgPhone} /><img src={imgTv} /><img src={imgLaptop} /></div>
              </div>
              <p>For Help call 011 218 5618' <a href="http://n.vidzclubs.com/za/tnc-vidzclubs?device=pc&offer=1">Terms and Conditions</a></p>
            </div>

            <div className="testimonial">
              <div className="picture"></div>
              <div className="text-container">
                <p className="name">2 days ago - Anna P.</p>
                <p className="testimonial-txt">«  My gifts were delivered wrapped! The kids are SO excited! »</p>
              </div>
            </div>

          </div>

          <div className="overlay-gift cover blur-in">

            <div className="container-first">

            </div>
          </div>

        </div>
        

      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);