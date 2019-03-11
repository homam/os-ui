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
import PhoneInput, { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
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
      setGAExperimentCX('Nx3aSK99QTiY9bqzHaC3VQ', abTest_variant());
    }

  }, 750))

}


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
            placeholder="Phone number"
            msisdn={this.state.msisdn}
            countryCode={process.env.country}
            showFlag={true}
            showMobileIcon={true}
            showError={true}
            onChange={({ msisdn, isValid, bupperNumber }) => {

              this.setState({ msisdn, isValid, bupperNumber })

            }
            }

          /></div>
          <button className="msisdn-button" ref={this.buttonRef} type="submit" disabled={!this.state.isValid}><Translate id="submit" /></button>

          <p className="terms">
            <input type="checkbox" checked={this.state.checked} onChange={ev => this.setState({ checked: ev.target.checked })} name="agree" id="agree" />
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
              RDS.WhenLoading(null, () => 'Παρακαλούμε περίμενε...')(this.props.rds)
            }
          </div>
        </div>
        <div className="error">
          {
            RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
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

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="tqstep">
  <h3><Translate id="thank_you" /></h3>
  <a href={finalUrl}><button className="msisdn-button"><Translate id="access_results_now" /></button></a>
</div>;


class Root extends React.PureComponent<HOCProps> {

  state = {
    locale: "el",
    abTestVariant: 0
  };

  componentDidMount() {
    this.setState({ abTestVariant: abTest_variant() })
    document.body.classList.add(`ab-${abTest_variant()}`)
  }

  render() {

    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          {
            this.state.abTestVariant == 0
            ? <Root0 {...this.props} />
            : <Root1 {...this.props} />
          }
        </TranslationProvider>
      </div>
    );
  }
}

class Root0 extends React.PureComponent<HOCProps> {
  state = {
    msisdn: "69",
    checked: false,
    appStage: "intro",
    setA: "Nothing",
    setB: "Nothing",
  }
  render() {
    return <div className={`container-full display-${this.state.appStage}`}>
      <header>
        <div className="top-bar">
          <div className="fortnite-logo"></div>
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

            tracker.advancedInPreFlow(`cardSelect1`, { card: keyData });

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

            tracker.advancedInPreFlow(`cardSelect2`, { card: keyData });

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
          <div className="edit" onClick={() => { this.setState({ appStage: 'intro' }) }}>
            <p><Translate id="edit" /></p>
            <div className="edit-icon"></div>
          </div>
        </div>
      </div>
      <DisclaimerGR />

    </div>

  }
}

class Root1 extends React.PureComponent<HOCProps> {
  state = {
    msisdn: "69",
    checked: false,
    appStage: "intro",
    setA: "Nothing",
    setB: "Nothing",
  }
  render() {
    return <div className={`container-full display-${this.state.appStage}`}>
    <header>
      <div className="top-bar">
        <div className="fortnite-logo"></div>
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

      <div className="selector-container">
      <div className="class constructor-s">
        <div className="min-image constructor slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'second', setA: 'constructor' }); tracker.advancedInPreFlow("step1"); }}> <Translate id="i_play_constructor" /></button>
      </div> 

      <div className="class ninja-s">
        <div className="min-image ninja slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'second', setA: 'ninja' }); tracker.advancedInPreFlow("step1"); }} > <Translate id="i_play_ninja" /></button>
      </div> 

      <div className="class constructor-s">
        <div className="min-image outlander slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'second', setA: 'outlander' }); tracker.advancedInPreFlow("step1"); }} > <Translate id="i_play_outlander" /></button>
      </div> 

      <div className="class constructor-s">
        <div className="min-image soldier slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'second', setA: 'soldier' }); tracker.advancedInPreFlow("step1"); }} > <Translate id="i_play_soldier" /></button>
      </div> 
     </div>


    </div>


    <div className="improve hide second">
      <div className="question">
        <div className="subtitle"><p><Translate id="kind_of_player" /></p></div>
        <div className="title"><p><span>2</span><Translate id="what_to_learn" /></p></div>
      </div>

      <div className="selector-container">
      <div className="class constructor-s">
        <div className="min-image building slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'msisdn', setB: 'building' }); tracker.advancedInPreFlow("step2"); }}> <Translate id="build_faster" /></button>
      </div> 

      <div className="class ninja-s">
        <div className="min-image onevone slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'msisdn', setB: 'onevone' }); tracker.advancedInPreFlow("step2"); }} > <Translate id="win_one_v_one" /></button>
      </div> 

      <div className="class constructor-s">
        <div className="min-image aimshooting slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'msisdn', setB: 'aimshooting' }); tracker.advancedInPreFlow("step2"); }} > <Translate id="frag_more" /></button>
      </div> 

      <div className="class constructor-s">
        <div className="min-image weapon slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'msisdn', setB: 'weapon' }); tracker.advancedInPreFlow("step2"); }} > <Translate id="best_weapon" /></button>
      </div> 

      <div className="class constructor-s">
        <div className="min-image everything slideInLeft animated"></div>
        <button className="listbutton" onClick={() => { this.setState({ appStage: 'msisdn', setB: 'everything' }); tracker.advancedInPreFlow("step2"); }} >  <Translate id="learn_everything" /></button>
      </div> 

     </div>

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
        <div className="edit" onClick={() => { this.setState({ appStage: 'intro' }) }}>
          <p><Translate id="edit" /></p>
          <div className="edit-icon"></div>
        </div>
      </div>
    </div>
    <DisclaimerGR />

  </div>
  }
}

export default HOC(tracker, Root)(initialState);