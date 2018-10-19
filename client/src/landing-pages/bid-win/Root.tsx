import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { ITolaProps, MatchSuccess, TolaRDS, TolaFailure, initialState, match, mockLoadingState, mockFailureState, mockSuccessState } from "../../clients/mpesa/TolaHOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/styles.less?raw"
import CustomSlider from "./components/CustomSlider";
import CustomTesti from "./components/CustomTesti";
import CustomLoader from "./components/CustomLoader";
import { string } from "prop-types";
import { mockedCompletedState } from "../../clients/lp-api/HOC";

const imgPhone = require("./assets/img/iphoneX.png");

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "bid-win"
);

const alphabet =  "BDGHJKLMNPQRTVXWZ123456789".split('');
const random = (items) => items[Math.floor(Math.random()*items.length)];
const randomString = (n) => n < 1 ? '' : random(alphabet) + randomString(n - 1)
const mkUniqueCode = () => `iPHONE_${randomString(4)}`

const QuestionView = ({ onEnd }) => (
  <div className="questionView">

    <img src={imgPhone} alt="iPhone X" className="iphoneX" />

    <div className="questionTitle">Answer this question for your chance to win:</div>

    <h2>What is the price of the new iPhone X?</h2>

    <button onClick={() => {
      onEnd(false)
    }}>KSh 159,999</button>

    <button onClick={() => {
      onEnd(true)
    }}>KSh 159</button>

  </div>
);

const AnswerView = ({ onEnd, correctAnswer }) => (

  <div className="answerView">

    {
      correctAnswer
        ? <div><i className="icon icon-thumbs-up"></i> <h2>Well done!</h2></div>
        : <div><i className="icon icon-ok-circled2"></i><h2>Correct!</h2></div>
    }

    <p>In a shop the new iPhone X costs KSh 159,999 bu you can now get it for as low as KSh 159!</p>

    <button onClick={() => { onEnd() }}>Get my iPhone X deal now!</button>

  </div>

);

interface IBidViewProps {
  bidValue: number;
  onEnd: (bidValue: number) => void;
}

class BidView extends React.PureComponent<IBidViewProps> {
  state = {
    bidValue: this.props.bidValue
  }
  render() {
    return (

      <div className="bidView">

        <i className="icon icon-help-circled"></i> <h2>How much do you want to bid <br></br> for your new iPhone X?</h2>

        <CustomSlider currency={"KSh"} min={159} max={300} value={this.state.bidValue} onChange={bidValue => this.setState({ bidValue })} />

        <div className="note"><span>*Note!</span> The highest unique bid wins!</div>

        <button onClick={() => { this.props.onEnd(this.state.bidValue) }}>Check my bid</button>

      </div>

    );
  }
}

interface INumberEntryViewProps {
  msisdn: string;
  error?: TolaFailure;
  onEnd: (msisdn: string) => void;
}

class NumberEntryView extends React.PureComponent<INumberEntryViewProps> {
  state = {
    msisdn: this.props.msisdn
  }
  telRef = React.createRef<HTMLInputElement>()
  componentDidMount(){
    this.telRef.current.focus()
  }
  render() {
    return (

      <div className="numberEntryView">
    
        <i className="icon icon-mobile"></i> <h2>Great bid!</h2>
    
        <p>Your bid stands a good chance to win the new iPhone X!</p>
    
        <h3>To claim enter your mobile number now!</h3>

        <input
          ref={this.telRef}
          maxLength={10}
          name="phone"
          type="tel"
          value={this.state.msisdn}
          onChange={ev => this.setState({msisdn: ev.target.value})}
        />

        {
          !!this.props.error 
          ? <div className="error"><Translate id={this.props.error.type} /></div>
          : null
        }
        <button onClick={() => { this.props.onEnd(this.state.msisdn) }}>Continue</button>
    
        <p>and confirm your bid <span>mPesa</span> now!</p>
    
      </div>
    
    );
  }
}

const ProcessView = ({ onEnd, mode }) => (

    <div className={`processView mode-${mode}`}>

      <i className="icon icon-cog-alt"></i> <h2>Processing</h2>

      <div className="customLoader">
        <CustomLoader/>
      </div>

      <ul>
        <li><i className="icon-ok"></i> iPhone X in stock</li>
        <li><i className="icon-ok"></i> Your registration received</li>
        <li><i className="icon-ok"></i> mPesa verified</li>
        <li><i className="icon-ok"></i> You have a chance to win!</li>
      </ul>

      <div className="msgBubble">
        <strong>Confirm your bid</strong> <br></br> in the <strong className="highlighted">mPesa</strong> page now!
      </div>

    </div>

);

const ThankYouView = ({ onBidAgain, onWatchNow }) => (

    <div className="thankYouView">
    
      <i className="icon icon-thumbs-up"></i> <h2>Well done!</h2>

      <h3>Your bid for the new iPhone X is confirmed!</h3>

      <p>Winners will be contacted by phone. <br></br> Please keep your mPesa SMS.</p>

      <button onClick={() => { onBidAgain() }}>Bid again <span>Increase chance of winning</span></button>

      <button onClick={() => { onWatchNow() }}>Watch now <span>Stream your favorite shows</span></button>

    </div>

);

interface IMSISDNEntryProps {
  msisdn: string;
  rds: TolaRDS;
  onEnd: (msisdn: string, bidValue: number) => void;
  onBidAgain: () => void
}

class MSISDNEntryStep extends React.PureComponent<IMSISDNEntryProps> {
  state = {
    msisdn: this.props.msisdn,
    step: 1,
    bidValue: 159,
    correctAnswer: null,
    showTQ: false
  };
  componentDidUpdate(prevProps : IMSISDNEntryProps) {
    if(RDS.IsLoading(prevProps.rds) && RDS.IsSuccess(this.props.rds)) {
      setTimeout(() => this.setState({showTQ: true}), 4500);
    }
  }
  render() {
    var stepComponent = <div>Unknown Step!</div>
    {
      match({
        nothingYet: () => {
          switch (this.state.step) {
            case 1:
              stepComponent = <QuestionView onEnd={correctAnswer =>
                this.setState({ step: 2, correctAnswer: correctAnswer })
              } />
              break;
            case 2:
              stepComponent = <AnswerView correctAnswer={this.state.correctAnswer} onEnd={() => {
                this.setState({ step: 3 });
              }} />
              break;
            case 3:
              stepComponent = <BidView
                bidValue={this.state.bidValue}
                onEnd={(bidValue) => {
                  if(this.state.msisdn.length > 5) {
                    // if we already know the MSISDN, then just set the bidValue and charge the user
                    this.setState({ bidValue });
                    this.props.onEnd(this.state.msisdn, bidValue)
                    console.log("processing");
                  } else {
                    // otherwise, if we do not know the MSISDN, set the bidValue and go to step 4 to ask MSISDN from user
                    this.setState({ step: 4, bidValue });
                    console.log("number entry will be next");
                  }
                }} />
              break;
            case 4:
              stepComponent = <NumberEntryView
                msisdn={this.state.msisdn}
                onEnd={(msisdn) => {
                  this.setState({ msisdn });
                  this.props.onEnd(msisdn, this.state.bidValue)
                  console.log("processing");
                }} />
              break;
            default:
              break;
          }
        },
        loading: () => stepComponent = <ProcessView mode="loading" onEnd={() => {
          console.log("Thank you");
        }} />
        ,
        failure: (error) => stepComponent = <NumberEntryView
          msisdn={this.state.msisdn}
          error={error}
          onEnd={(msisdn) => {
            this.setState({ msisdn });
            this.props.onEnd(msisdn, this.state.bidValue)
            console.log("processing");
          }}/>,
        success: (data) =>stepComponent =  this.state.showTQ
          ? <ThankYouView 
              onBidAgain={() => {
                this.setState({step: 3})
                this.props.onBidAgain()
              }}
              onWatchNow={() => {
                window.location.href = 'http://safaricom.bidiotv.com/#/?uid=fdf098fcc6'
              }} 
            />
          : <ProcessView mode="success" onEnd={() => {
            console.log("Thank you");
          }} />
      })(this.props.rds)
    }
    return <div>
      {stepComponent}
      {this.state.step > 1 ? <div className="overlay"></div> : null}
    </div>
  }
}

class Root extends React.PureComponent<ITolaProps> {
  state = {
    locale: "en",
    msisdn: "07",
  };
  render() {
    return (
      <div className="container">

        <div className="mainTitle">

          <h4>Stand a chance to</h4>

          <h1><strong>Win the new</strong> iPhone X!</h1>

        </div>

        {/* simpleOpacityTransitionStyles.group */}
        <TranslationProvider locale={this.state.locale}>
          <MSISDNEntryStep
            msisdn={this.state.msisdn}
            rds={this.props.currentState}
            onEnd={(msisdn, bidValue) => {
              this.setState({ msisdn });
              this.props.actions.chargeAndWait(msisdn, mkUniqueCode(), bidValue);
            }}
            onBidAgain={() => this.props.actions.backToNothingYet()}
          />
        </TranslationProvider>


      <CustomTesti/>

      <div className="disclaimer">
      
          <h1>Terms &amp; Conditions</h1>
            
          <p>
            Service available only to users with a valid mPesa or Airtel money account.
            Service cost is Ksh 199 for a ticket into the draw for a new iPhone X, unless alternative prizes were specifically promoted. 
            Promotion runs from 16-10-2018 until 02-01-2019. Winners will be drawn randomly and contacted by telephone on the mobile number 
            associated with the account used to make payment. Proof of payment SMS required to claim prize. 

            <br></br>
            <br></br>

            The service provider will cover the cost of shipping prizes to winners within the Republic of Kenya. 
            Prizes are not transferable and non redeemable for cash. By entering the draw you confirm to be 18 years or older and that you have obtained the 
            bill payer's permission. By using the service you agree to receive promotional marketing related to this and similar services from the same provider. 
            Service provided by Right Net Limited, under authorisation of the Betting Control and Licensing Board (license number 002397 of 2018).
            For help call 0703065013.   
          </p> 


      </div>

      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);