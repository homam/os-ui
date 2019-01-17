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
  "Bikini Yoga" //TODO: replace Unknown with your page's name
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
    marginer:""
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
      <h1>This is getting <span>hotter</span>🔥</h1>
      <h2>ENTER YOUR PHONE NUMBER TO SEE MORE</h2>

      <div className={`arrow-left bounce-left ${this.state.marginer}`}></div>
      <div className={`arrow-right bounce-right ${this.state.marginer}`}></div>
      <PhoneInput
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

                } else {this.setState({ marginer: '' }) }
              }
            }
        
           />
          <button ref={this.buttonRef} type="submit" disabled={!this.state.isValid}>Submit</button>
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

<div>

  <h3>Last step</h3>
  <p className="info">now send</p>
  <p className="keyword">{keywordAndShortcode.keyword}</p>
  <p className="info">to</p>
  <p className="shortcode">{keywordAndShortcode.shortcode}</p>
  <MOLink keywordAndShortcode={keywordAndShortcode}> <button className="sendsms">Send SMS NOW</button></MOLink>


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
      
      <header>
      <div className="logo"></div>
      </header>

      <div className="question intro" onClick={() => { this.setState({ applicationState: 'palms' }) }}>
        <div className="palms">
          <div className="palm-a shaker"></div>
          <div className="palm-b "></div>
          <div className="palm-c "></div>
          <div className="palm-d shaker2"></div>
        </div>
        <div className="button-intro">
        <p>Girsl are doing <span>bikini yoga...</span></p>
        <p><span>want to see?</span></p>
        <button>Yes</button>
        </div>
      </div>

      {/* END INTRO */}

      <div className="question palms" onClick={() => { this.setState({ applicationState: 'bikini' }) }}>
      <div className="palms-leaf">
          <div className="palm-a"></div>
          <div className="palm-b shaker"></div>
          <div className="palm-c shaker3"></div>
          <div className="palm-d shaker2"></div>
        </div>
      <div className="button-ui">
      <p>Remove palm?</p>
      <div className="push heartbeat"><button >Yes</button></div>
      </div>
      
      </div>

       {/* END PALM */}

      <div className="question bikini" onClick={() => { this.setState({ applicationState: 'subscription' }) }}>
      <div className="palms-leaf">
          <div className="palm-a roll-out-left"></div>
          <div className="palm-b roll-out-left"></div>
          <div className="palm-c roll-out-right"></div>
          <div className="palm-d roll-out-right"></div>
        </div>
      <div className="button-ui">
      <p>Remove bikini?</p>
      <div className="push heartbeat"><button>Yes</button></div>
      </div>
      </div>

       {/* END BIKINI */}


      <div className="subscription">
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
      
          <div className="testimonial">
            <div className="testimonial-content">
            <div className="quote-up"></div>
              <div className="picture"></div>
              <div className="txt">
                <div className="title"><p>Daniel 2 days ago</p><div className="star"></div></div>
                <div className="quote">I really enjoyed watching
those girls doing yoga on a beach</div>
              </div>
              <div className="quote-down"></div>
              </div>
          </div>

          </div>
        </div>
     
    );
  }
}
export default HOC(tracker, Root)(initialState);