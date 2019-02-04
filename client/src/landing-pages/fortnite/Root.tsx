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
  mockedPINSuccesState,
  match
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import PhoneInput , { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
import './assets/style.css?raw';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { createDiffieHellman } from 'crypto';
import DisclaimerGR from './components/DisclaimerGR'
import StageOne from "./components/StageOne";
import StageTwo from "./components/StageTwo";

const { commonPrefix } = getConfig(process.env.country);

const tracker = mkTracker(
  
  typeof window != "undefined" ? window : null,
  "xx",
  "Fortnite" //TODO: replace Unknown with your page's name
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
    validationError: null
  };
  buttonRef = React.createRef<HTMLButtonElement>()
  inputRef = React.createRef<HTMLInputElement>()
  render() {
    
    return (
      <form
      onSubmit={ev => {
        ev.preventDefault();
        if (this.state.msisdn == "") {

          this.setState({ validationError: "Παρακαλώ βάλε έναν έγκυρο αριθμό." })
          console.log("Please fill in your mobile number!");

        } else if (!this.state.checked) {

          this.setState({ validationError: "Παρακαλώ αποδέξου τους Όρους & Προϋποθέσεις" })
          console.log("Please agree to the terms and conditions!");

        } else {
          this.setState({ validationError: null })
          this.props.onEnd(this.state.msisdn, this.state.checked);
        }
      }}
    >
      <div>
        <p className="msisdn-text"><Translate id="we_need_your_phone" /> <span><Translate id="send_personalised_result" /></span></p>
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
          
         <p className="terms">
       <input type="checkbox" checked={this.state.checked} onChange={ev => this.setState({checked: ev.target.checked})} name="agree" id="agree"/>
       <label htmlFor="agree">
      
         <span><Translate id="alternate_accept_first" defaultMessage="Terms" /></span>
         <a href="http://n.mobiworld.biz/gr/tnc-mobiworld?offer=1&_next=general_conditions.html" target="_blank">
         <span><Translate id="text_terms" defaultMessage="Terms &amp; Conditions" /></span></a>

         <span><Translate id="alternate_accept_second" defaultMessage="Conditions" /></span>

         <a href="http://dimoco.eu/dimoco-services-greece/" target="_blank">
         <span><Translate id="text_price" defaultMessage="Final message price" /></span></a>
         </label>
          </p>
          <div className="error">
          {
            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
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
    isValid: false,
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.pin);
        }}
      >
        <div className="pintitle">
          <Translate id="we_just_sent_a_pin" />
        </div>
        <div>
          <input
            className="pin"
            placeholder="_ _ _ _"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value, isValid: true })}
          />
          <button className="pinButton" type="submit" disabled={!this.state.isValid}><Translate id="ok" /></button>
            <div className="error">
            {
              RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
            }
            </div>
        </div>
        <div className="mobile-change">
          {
            RDS.match({
              failure: (err: PINEntryFailure) => (
                <div>
                  <div><Translate id={err.errorType} /></div>
                  <Translate id="if_not_your_mobile" values={{
                      phone: this.props.msisdn
                  }} />&nbsp;
                  <a className="editmobile" onClick={() => this.props.backToStart()}>
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
    );
  }
}

const TQStep = ({finalUrl} : {finalUrl: string}) => <div className="tqstep">
  <h3><Translate id="thank_you" /></h3>
  <a href={finalUrl}><button className="msisdn-button"><Translate id="access_results_now" /></button></a>
</div>;


class Root extends React.PureComponent<HOCProps> {

  state = {
    locale: "el",
    msisdn: "69",
    checked: false,
    appStage: "intro",
    setA: "Nothing",
    setB: "Nothing"

  };
  render() {

    return (
      <div>
      <TranslationProvider locale={this.state.locale}>
      
      <div className={`container-full display-${this.state.appStage}`}>
        <header> 
          <div className="top-bar">
            <div className="fortnite-logo"></div>
            <div className="online">
              <div className="profile">
              </div>
              <p><span><Translate id="o_ninja" /></span> <Translate id="is_online" /></p>

            </div>
        </div>

        <div className="full-title">
          <div className="badge"></div>
          <div className="h-title">
            <h1><Translate id="get_ultimate" /></h1>
            <h2><Translate id="fortnite_season" /></h2>
          </div>
        </div>

        </header>

        <div className="heroes hide intro">
          <div className="question">
          <div className="subtitle"><p><Translate id="kind_of_player" /></p></div>
          <div className="title"><p><span>1</span><Translate id="main_class" /></p></div>

          </div>
          {/* <VirtualizeSwipeableViews slideRenderer={slideRenderer} enableMouseEvents resistance/> */}
          
          <StageOne
          onSelect={({ keyData }) => {
            this.setState({
              appStage: "second",
              setA: keyData
            });
          }}
        />
         
        
        </div>
        <div className="improve hide second">
        <div className="question">
          <div className="subtitle"><p><Translate id="kind_of_player" /></p></div>
          <div className="title"><p><span>2</span><Translate id="what_to_learn" /></p></div>
          </div>
         
          <StageTwo
          onSelect={({ keyData }) => {
            this.setState({
              appStage: "msisdn",
              setB: keyData
            });
          }}
        />

      </div>

        <div className="hide msisdn">
        <div className="question">
          <div className="subtitle"><p><Translate id="personalised_tips" /></p></div>
          <div className="title"><p><span>3</span><Translate id="are_ready" /></p></div>
         
          </div>
          <div className="msisdn-container">
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
        <p className="improve-txt"><Translate id="choose_to_improve" /></p>
        <div className="choice-container">
          <div className="class-skill">
          <div className={`choice ${this.state.setA}`}></div><div className={`choice ${this.state.setB}`}></div>
          </div>
          <div className="edit" onClick={() => { this.setState({ appStage: 'intro'}) }}>
          <p><Translate id="edit" /></p>
          <div className="edit-icon"></div>
          </div>
        </div>
        </div>
        <DisclaimerGR />

        </div>
      </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);