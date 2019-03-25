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
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import PhoneInput , { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
import './assets/style.css?raw';
import Timer from "./components/Timer";
import DisclaimerGR from './components/DisclaimerGR';
import ComponentPopup from "./components/ComponentPopup";


const abTest_variant = (() => {
  const variant = Math.round(Math.random());

  return () => variant
})()

// function gtag(...args) {window.dataLayer.push(...args)}

if (typeof window != "undefined") {
  window.addEventListener('load', () => setTimeout(() => {
    const ga = window['ga']
    if (!!ga) {

      const setGAExperimentCX = (_expId, _vId) => {
        const gtm = ga.getAll()[0].get('name')
        ga(`${gtm}.set`, 'exp', _expId.toString() + '.' + _vId.toString());
        ga(`${gtm}.send`, 'event', 'Experiment', 'Trigger', _expId.toString() + '.' + _vId.toString());
      }
      setGAExperimentCX('mo1jCLkaQku8pFJUmFN6VQ', abTest_variant());
    }

  }, 750))

}

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Valentine's Trip Prelander" //TODO: replace Unknown with your page's name
);



class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  checked: boolean;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string, checked: boolean) => void;

}> {
  state = {
    msisdn: this.props.msisdn,
    checked: this.props.checked,
    isValid: false,
    validationError: null,
    popup:false,
  };
  buttonRef = React.createRef<HTMLButtonElement>()
  inputRef = React.createRef<HTMLInputElement>()
  render() {
    
    return (
      <div>
      <span><Translate id="msisdn-ask" /></span>
      <form
      onSubmit={ev => {
        ev.preventDefault();
        if (this.state.msisdn == "") {

          this.setState({ validationError: "Παρακαλώ βάλε έναν έγκυρο αριθμό." })
          console.log("Please fill in your mobile number!");

        } else if (!this.state.checked) {

          this.setState({ validationError: "Παρακαλώ αποδέξου τους Όρους & Προϋποθέσεις", popup:true })
          console.log("Please agree to the terms and conditions!");

        } else {
          this.setState({ validationError: null })
          this.props.onEnd(this.state.msisdn, this.state.checked);
        }
      }}
    >
      <div>

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
                
              }
            }
        
           /></div>
          <button className="msisdn-button" ref={this.buttonRef} type="submit" disabled={!this.state.isValid}><Translate id="submit" /></button>
          
          <div className="terms">

<input type="checkbox" checked={this.state.checked} onChange={ev => this.setState({ checked: ev.target.checked })} name="agree" id="agree" />


<label htmlFor="agree">

<Translate id="sa_terms_text" defaultMessage="I accept" />

<a href="javascript:void(0)" onClick={()=> this.setState({popup:true})}><Translate id="sa_terms_link_text" defaultMessage="Terms &amp; Conditions" /></a>

{/*<Translate id="alternate_accept_first" defaultMessage="Terms" /> 
&nbsp;<a href="http://n.appspool.net/gr/tnc-appspool?offer=1&amp;_next=general_conditions.html" target="_blank"> 
<Translate id="text_terms" defaultMessage="Terms &amp; Conditions" /> </a>

<Translate id="alternate_accept_second" defaultMessage="Conditions" /> 
&nbsp;&nbsp;<a href="http://paydash.gr/pinakas-ypp/" target="_blank"> 
<Translate id="text_price" defaultMessage="Final message price" /> </a>*/}

</label>

</div>

<ComponentPopup Translate popupActive={this.state.popup} onClickYes={() =>  {this.setState({popup:false, checked:true}), tracker.advancedInPreFlow("popup_agree")}}/>

          
          
          <div className="error">
          {
            RDS.WhenLoading(null, () => 'Παρακαλούμε περίμενε...')(this.props.rds)
          }
          </div>
        </div>
        <div className="error">
          {
            RDS.WhenFailure(null, (err : MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
          }
        {
            this.state.validationError != null
              ? <div className="error-msg">{this.state.validationError}</div>
              : null
          }

        </div>
      </form>
      </div>
    );
  }
}

class PINEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
  backToStart: () => void;
  onEnd: (pin: string) => void;
}> {
  state = {
    pin: "",
    isValid: false
  };
  render() {
    return (
      <div>
      <p><Translate id="confirm" /></p>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.pin);
        }}
      >
        <div className="pintxt">
          <Translate id="we_just_sent_a_pin" />
        </div>
        <div className="pin">
          <input
            placeholder="_ _ _ _"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value, isValid: true })}
          />
          <button className="pinButton" type="submit" disabled={!this.state.isValid}><Translate id="submit"/> </button>
            {
              RDS.WhenLoading(null, () => 'Παρακαλούμε περίμενε...')(this.props.rds)
            }
        </div>
        <div className="mobile-error">
          {
            RDS.match({
              failure: (err: PINEntryFailure) => (
                <div>
                  <div><Translate id={err.errorType} /></div>
                  <Translate id="if_not_your_mobile" values={{
                      phone: this.props.msisdn
                  }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                </div>
              ),
              nothingYet: () => (
                <div>
                  <Translate id="didnt_receive_pin_yet" values={{
                      phone: this.props.msisdn
                  }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                </div>
              ),
              loading: () => null,
              success: () => null
            })(this.props.rds)
          }
        </div>
      </form>
      </div>
    );
  }
}

const TQStep = ({finalUrl} : {finalUrl: string}) => <div>
  <h3><Translate id="thank_you" /></h3>
  <a href={finalUrl} target="_blank"><button className="msisdn-button end-button"><Translate id="final_url" /></button></a>
</div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "el",
    msisdn: "69",
    checked: false,
    appState: "questiona",
    abTestVariant: 0,
  };

  componentDidMount() {
    this.setState({ abTestVariant: abTest_variant() })
    document.body.classList.add(`ab-${abTest_variant()}`)
  }

  render() {
    return (
    <TranslationProvider locale={this.state.locale}>
    <div className={`container display-${this.state.appState}`}>

          

          <div className="prizes">
          <p className="heart"><Translate id="or" /></p>
          <p className="subtext"><Translate id="subtext" /></p>
          </div>

          <div className="separator"></div>

          <div className="questiona hide">

            <div className="qcontainer">

              <div className="progress-bar">
                <div className="step actv">1</div>
                <div className="step">2</div>
                <div className="step">3</div>
              </div>
              
              <div className="qtitle">
              <div className="qsubt"><Translate id="question_1" /></div>
              <p><Translate id="questiona" /></p>
              </div>

              <button className="msisdn-button" onClick={() => { this.setState({ appState: 'questionb' }); tracker.advancedInPreFlow("step1"); }}><Translate id="choicea1" /></button>
              <button className="msisdn-button" onClick={() => { this.setState({ appState: 'questionb' }); tracker.advancedInPreFlow("step1"); }}><Translate id="choicea2" /></button>

            </div>

          </div>

          <div className="questionb hide">

          <div className="qcontainer">

              <div className="progress-bar">
                <div className="step">1</div>
                <div className="step actv">2</div>
                <div className="step">3</div>
              </div>
              
              <div className="qtitle">
              <div className="qsubt"><Translate id="question_2" /></div>
              <p><Translate id="questionb" /></p>
              </div>

              <button className="msisdn-button" onClick={() => { this.setState({ appState: 'questionc' }); tracker.advancedInPreFlow("step2"); }}><Translate id="choiceb1" /></button>
              <button className="msisdn-button" onClick={() => { this.setState({ appState: 'questionc' }); tracker.advancedInPreFlow("step2"); }}><Translate id="choiceb2" /></button>

            </div>

          </div>

          <div className="questionc hide">

            <div className="qcontainer">

              <div className="progress-bar">
                <div className="step ">1</div>
                <div className="step ">2</div>
                <div className="step actv">3</div>
              </div>

              <div className="qtitle">
              <div className="qsubt"><Translate id="question_3" /></div>
              <p><Translate id="questionc" /></p>
              </div>

              <button className="msisdn-button" onClick={() => { this.setState({ appState: 'msisdn' }); tracker.advancedInPreFlow("step3"); }}><Translate id="choicec1" /></button>
              <button className="msisdn-button" onClick={() => { this.setState({ appState: 'msisdn' }); tracker.advancedInPreFlow("step3"); }}><Translate id="choicec2" /></button>

              </div>
          
          </div>

          <div className="msisdn hide">
          {/* <div className="countdown"><Timer /></div> */}
         
         <div className="msisdn-container">

            <div className="trip-left"><Translate id="trip-left" /></div>
            {match({
              msisdnEntry: rds => (
              
                  <MSISDNEntryStep
                  msisdn={this.state.msisdn}
                  checked={this.state.checked}
                  rds={rds}
                  onEnd={(msisdn, checked) => {

                    this.setState({ msisdn, checked });
                    this.props.actions.submitMSISDN(window, null, msisdn);

                  }}
                  />
               
              ),
              pinEntry: rds => (
              
                  <PINEntryStep
                    onEnd={pin => this.props.actions.submitPIN(pin)}
                    backToStart={() => this.props.actions.backToStart()}
                    msisdn={this.state.msisdn}
                    rds={rds}
                  />
               
              ),
              completed: ({ finalUrl }) => (
                
                  <TQStep finalUrl={finalUrl} />
                
              )
            })(this.props.currentState)}
          

          </div>
          </div>
          <DisclaimerGR />
          </div>
        </TranslationProvider>
  
    );
  }
}
export default HOC(tracker, Root)(initialState);