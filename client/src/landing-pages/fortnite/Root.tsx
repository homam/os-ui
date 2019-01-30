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
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import PhoneInput , { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
import './assets/style.css?raw';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { createDiffieHellman } from 'crypto';

const { commonPrefix } = getConfig(process.env.country);

const tracker = mkTracker(
  
  typeof window != "undefined" ? window : null,
  "xx",
  "Fortnite" //TODO: replace Unknown with your page's name
);

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    minHeight: 100,
    color: '#fff',

  },
  
};

var _self2;

function slideRenderer(params) {
  const { index, key } = params;

  

  switch (mod(index, 4)) {
    case 0:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
          <div className="hero constructor slideInRight animated"></div>
          <div className="swiper">
          <p>select your class</p>
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide orange">
          <p>constructor</p>
          </div>
          <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'second', dataname: 'constructor' }) }}>I play constructor</button>
        </div>
      );

    case 1:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
        <div className="hero ninja"></div>
        <div className="swiper">
          <p>select your classe</p>
          <div className="icon">
          <div className="hand"></div>
          </div>
          </div>
         <div className="container-slide grey">
         <p>ninja</p>
          </div>
          <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'second', dataname: 'ninja' }) }}>I play ninja</button>
        </div>
      );

    case 2:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
          <div className="hero outlander"></div>
          <div className="swiper">
          <p>select your classe</p>
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide green">
          <p>outlander</p>
          </div>
          <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'second', dataname: 'outlander' }) }}>I play outlander</button>
        </div>
      );

      case 3:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
        <div className="hero soldier "></div>
        <div className="swiper">
        <p>select your classe</p>
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div  className="container-slide blue">
        <p>soldier</p>
        </div>
        <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'second', dataname: 'soldier' }) }}>I play soldier</button>
      </div>
      );

    default:
      return null;
  }
}

function slideRenderer2(params) {
  const { index, key } = params;

  switch (mod(index, 5)) {
    case 0:
      return (
        <div key={key} className="slide improver" style={Object.assign({}, styles.slide)}>
          <div className="swiper">
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide building">
          <p>Building</p>
          </div>
          <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'msisdn', skillname: 'building' }) }}>I want to build faster</button>
        </div>
      );

    case 1:
      return (
        <div key={key} className="slide improver" style={Object.assign({}, styles.slide)}>
        <div className="swiper">
          <div className="icon"><div className="hand"></div></div>
          </div>
         <div className="container-slide onevone">
         <p>1 v 1</p>
          </div>
          <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'msisdn', skillname: 'onevone' }) }}>I want to win more 1v1</button>
        </div>
      );

    case 2:
      return (
        <div key={key} className="slide improver" style={Object.assign({}, styles.slide)}>
          <div className="swiper">
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide aimshooting">
          <p>AIM and Shooting</p>
          </div>
          <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'msisdn', skillname: 'aimshooting' }) }}>I want to frag more</button>
        </div>
      );

      case 3:
      return (
        <div key={key} className="slide improver" style={Object.assign({}, styles.slide)}>
        <div className="swiper">
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div className="container-slide weapon">
        <p>Weapon crafting</p>
        </div>
        <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'msisdn', skillname: 'weapon' }) }}>I want the best weapon</button>
      </div>
      );

      case 4:
      return (
        <div key={key} className="slide improver" style={Object.assign({}, styles.slide)}>
        <div className="swiper">
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div className="container-slide everything">
        <p>Everything</p>
        </div>
        <button className="pulse animated" onClick={() => { _self2.setState({ applicationState: 'msisdn', skillname: 'everything' }) }}>I want to learn everything</button>
      </div>
      );

    default:
      return null;
  }
}


class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    isValid: false,
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
        <p className="msisdn-text">We need your phone number
to send your <span>personalised results</span></p>
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
          <button className="msisdn-button" ref={this.buttonRef} type="submit" disabled={!this.state.isValid}>Submit</button>
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
          <button className="pinButton" type="submit" disabled={!this.state.isValid}>OK</button>
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
  <h3>Thank you!</h3>
  <a href={finalUrl}><button className="msisdn-button">Access your results now</button></a>
</div>;


class Root extends React.PureComponent<HOCProps> {

  state = {
    locale: "en",
    msisdn: "",
    checked: false,
    applicationState: "intro",
    dataname: "",
    skillname:"",
  };
  render() {

    _self2 = this;
    return (
      <div className={`container-full display-${this.state.applicationState}`}>
        <header> 
          <div className="top-bar">
            <div className="fortnite-logo"></div>
            <div className="online">
              <div className="profile">
                <div className="green-blink"></div>
              </div>
              <p><span>Ninja</span> is online now to give you personalised advices</p>

            </div>
        </div>

        <div className="full-title">
          <div className="badge"></div>
          <div className="h-title">
            <h1>Get ultimate secret tips</h1>
            <h2>for Fortnite season 7</h2>
          </div>
        </div>

        </header>

        <div className="heroes hide intro">
          <div className="question">
          <div className="subtitle"><p>what kind of player are you?</p></div>
          <div className="title"><p><span>1</span>What is your main classe?</p></div>

          </div>
          {/* <VirtualizeSwipeableViews slideRenderer={slideRenderer} enableMouseEvents resistance/> */}

          <VirtualizeSwipeableViews slideRenderer={slideRenderer} enableMouseEvents resistance/>
        
        </div>
        <div className="improve hide second">
        <div className="question">
          <div className="subtitle"><p>what kind of player are you?</p></div>
          <div className="title"><p><span>2</span>What do you want to learn?</p></div>
         
          </div>
          <VirtualizeSwipeableViews slideRenderer={slideRenderer2} enableMouseEvents resistance/>
        </div>

        <div className="hide msisdn">
        <div className="question">
          <div className="subtitle"><p>your personalised tips</p></div>
          <div className="title"><p><span>3</span>Are ready !</p></div>
         
          </div>
          <div className="msisdn-container">
        <TranslationProvider locale={this.state.locale}>
          <TransitionGroup className={simpleOpacityTransitionStyles.group}>
            {match({
              msisdnEntry: rds => (
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
              ),
              pinEntry: rds => (
                <SimpleOpacityTransition key="pinEntry">
                  <PINEntryStep
                    onEnd={pin => this.props.actions.submitPIN(pin)}
                    backToStart={() => this.props.actions.backToStart()}
                    msisdn={this.state.msisdn}
                    rds={rds}
                  />
                </SimpleOpacityTransition>
              ),
              completed: ({ finalUrl }) => (
                <SimpleOpacityTransition key="completed">
                  <TQStep finalUrl={finalUrl} />
                </SimpleOpacityTransition>
              )
            })(this.props.currentState)}
          </TransitionGroup>
        </TranslationProvider>
        </div>
        <p className="improve-txt">You choose to improve :</p>
        <div className="choice-container">
          <div className="class-skill">
          <div className={`choice ${this.state.dataname}`}></div><div className={`choice ${this.state.skillname}`}></div>
          </div>
          <div className="edit" onClick={() => { this.setState({ applicationState: 'intro'}) }}>
          <p>Edit</p>
          <div className="edit-icon"></div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
export default HOC(tracker, Root)(mockedCompletedState);