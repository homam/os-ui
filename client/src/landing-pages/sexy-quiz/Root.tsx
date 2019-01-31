import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  match,
  mockedMSISDNEntrySuccess,
  mockedMSISDNEntryFailure,
  MOLink,
} from "../../clients/lp-api-mo/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import PhoneInput , { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
import './assets/style.css?raw'



const { commonPrefix } = getConfig(process.env.country);


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Sexy Quiz" //TODO: replace Unknown with your page's name
);

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: commonPrefix,
    bupperNumber: "",
    isValid: false,
    marginer:"",
    custombtn:""
  };
  buttonRef = React.createRef<HTMLButtonElement>()
  inputRef = React.createRef<HTMLInputElement>()
  render() {
    return (
    
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >
      <div>
     
      <h1>ENTER YOUR PHONE NUMBER</h1>
      <h2>to unlock more girls</h2>

      <div className={`arrow-left bounce-left ${this.state.marginer}`}></div>
      <div className={`arrow-right bounce-right ${this.state.marginer}`}></div>
      <div className="gradient"><PhoneInput
            inputElementRef={this.inputRef}
            placeholder = "Phone number"
            msisdn={this.state.msisdn}
            countryCode={process.env.country}
            showFlag={true}
            showMobileIcon={true}
            showError={true}
            onChange={({msisdn, isValid, bupperNumber}) => {

                this.setState({ msisdn, isValid, bupperNumber })
                if(isValid){

                  this.setState({ marginer: 'custom-margin' }) 
                  this.setState({ custombtn: 'custombtn' }) 

                } else {
                  this.setState({ marginer: '' })
                  this.setState({ custombtn: '' })
                }
              }
            }
        
           /></div>
          <div className={`push ${this.state.custombtn}`}><button ref={this.buttonRef} type="submit" disabled={!this.state.isValid}>Submit<div className="heart"></div></button></div>
          {
            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
          }
        </div>
        <div>
          {
            RDS.WhenFailure(null, (err : MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
          }
        </div>
      </form>
     
    );
  }
}

const TQStep = ({keywordAndShortcode}) => 

<div className="SMS-step">

  <h1>Last step</h1>
  <h2>to unlock more girls</h2>
  
  <p className="keyword">Send <span>{keywordAndShortcode.keyword}</span> to <span>{keywordAndShortcode.shortcode}</span></p>

  <MOLink keywordAndShortcode={keywordAndShortcode}><div className="push custombtn"><button className="sendsms">Send SMS</button></div> </MOLink>


</div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
    checked: false,
    applicationState: "intro"
  };
  render() {

    const msisdnEntryStep = rds => (
      <SimpleOpacityTransition key="msisdnEntry">
        <MSISDNEntryStep
          msisdn={this.state.msisdn}
          rds={rds}
          onEnd={msisdn => {
            this.setState({ msisdn });
            this.props.actions.submitMSISDN(window, null, msisdn);
          }}
        />
      </SimpleOpacityTransition>
    )

    const completedStep = (keywordAndShortcode) => (
      <SimpleOpacityTransition key="completed">
        <TQStep keywordAndShortcode={keywordAndShortcode} />
      </SimpleOpacityTransition>
    )

    return (
      <div className={`container-full display-${this.state.applicationState}`}>

      <div className="question intro" onClick={() => { this.setState({ applicationState: 'first' }) }}>
        
        <div className="header">
          <div className="logo flicker-in-1"></div>
        </div>

        <div className="girls">
          <div className="girl introa"></div>
          <div className="separator"></div>
          <div className="girl introb"></div>
        </div>

        <div className="CTA_box">
          <div className="title">
            <p className="pink">romantic<span> or </span>naughty</p>
            <p className="subtitle">Pick your girls</p>
          </div> 
          <div className="push heartbeat ">
          <button><p>Start</p><div className="heart heartbeat"></div></button>
          </div>
        </div>

        <div className="testimonial">
              <div className="picture"></div>
              <div className="txt">
                <div className="title"><p>Daniel 2 days ago</p><span>5.0</span><div className="star"></div></div>
                <div className="quote">Those girls are so HOT, you can’t even imagine! </div>
              </div>
          </div>

      </div>

      {/* END INTRO */}

      <div className="question first" onClick={() => { this.setState({ applicationState: 'second' }) }}>

        <div className="choice-header">
        <p className="pink">PICK ONE</p>
        <div className="progress_bar stepa"></div>
        </div>

        <div className="girls">
          <div className="girl girla"></div>
          <div className="separator"></div>
          <div className="girl girlb"></div>
        </div>

        <div className="button-container">
        <div className="push heartbeat ">
          <button><div className="heart heartbeat"></div></button>
          </div>
          <div className="push heartbeatb">
          <button><div className="heart heartbeat"></div></button>
          </div>
        </div>


      </div>

       {/* END First */}

      <div className="question second" onClick={() => { this.setState({ applicationState: 'third' }) }}>
   
      <div className="choice-header">
        <p className="pink">PICK ONE</p>
        <div className="progress_bar stepb"></div>
        </div>

        <div className="girls">
          <div className="girl girlc"></div>
          <div className="separator"></div>
          <div className="girl girld"></div>
        </div>

        <div className="button-container">
        <div className="push heartbeat ">
          <button><div className="heart heartbeat"></div></button>
          </div>
          <div className="push heartbeatb">
          <button><div className="heart heartbeat"></div></button>
          </div>
        </div>

      </div>

       {/* END Second */}

       <div className="question third" onClick={() => { this.setState({ applicationState: 'subscription' }) }}>
   
       <div className="choice-header">
        <p className="pink">PICK ONE</p>
        <div className="progress_bar stepc"></div>
        </div>

        <div className="girls">
          <div className="girl girle"></div>
          <div className="separator"></div>
          <div className="girl girlf"></div>
        </div>

        <div className="button-container">
        <div className="push heartbeat ">
          <button><div className="heart heartbeat"></div></button>
          </div>
          <div className="push heartbeatb">
          <button><div className="heart heartbeat"></div></button>
          </div>
        </div>

      </div>

       {/* END Third */}

      <div className="question subscription">
      <div className="choice-header">
        <p className="pink">WANT TO SEE MORE? </p>
        <p className="subtitle">YOU MIGHT BE SURPRISED…</p>
        <div className="progress_bar stepd"></div>
        </div>

        <div className="container-msisdn zoomIn animated">
        <TranslationProvider locale={this.state.locale}>
          <TransitionGroup className={simpleOpacityTransitionStyles.group}>
            {match({
              msisdnEntry: rds => RDS.match(
              {
                nothingYet: () => msisdnEntryStep(rds),
                loading: () => msisdnEntryStep(rds),
                failure: () => msisdnEntryStep(rds),
                success: (keywordAndShortcode) => completedStep(keywordAndShortcode)
              }
              )(rds),
              completed: (keywordAndShortcode) => completedStep(keywordAndShortcode)
            })(this.props.currentState)}
          </TransitionGroup>
        </TranslationProvider>
        
        </div>
      
          <div className="helper">
          <div className="fire"></div>
          <div className="text">
          <span>Many hotties are waiting for you… </span>
          <p>We need to verify your identity to unlock your personalised content </p>
          </div>
          </div>

          </div>
        </div>
     
    );
  }
}
export default HOC(tracker, Root)(initialState);