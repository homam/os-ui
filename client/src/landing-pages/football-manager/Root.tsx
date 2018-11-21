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
  match,
  mockedPINState
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import {
  SimpleOpacityTransition,
  TransitionGroup,
  simpleOpacityTransitionStyles
} from "../../common-components/simple-opacity-transition";

// CSS DECLARATION
import "./assets/css/styles.less?raw";

// IMAGES DECLARATION
// ok
//const imgiphone = require("./assets/images");
// const iphonexs_logo = require('./assets/images/iphonexs_logo.png')

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    isJerseySelected: false,
    isTeamSelected: false
  };

  submitTeam = () => {
    this.setState({
      isTeamSelected: true
    });
  };

  selectJersey = () => {
    this.setState({
      isJerseySelected: true
    });
  };

  render() {
    //console.log(this.state.stage);

    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >
        {/*
          <div className={"overlay"}></div>
          */}

        <div id="container">
          <div id="creative">
            <div className="logo" />
            {}

            <div
              className={
                "c-team-selection " +
                (this.state.isTeamSelected === false ? "active" : "")
              }
            >
              <div className="cta-lead" />
              <div className="cta-sub-lead">
                Manage and compete with others!
              </div>

              <div className="team-cta">select your team now!</div>

              <div className="jersey-selection">
                <input
                  type="radio" 
                  onClick={this.selectJersey}
                  name="jersey"
                  id="red-jersey"
                />

                <label htmlFor="red-jersey" className="jersey">
                  <div className="jersey-red" />
                </label>

                <input
                  type="radio"
                  onClick={this.selectJersey}
                  name="jersey"
                  id="blue-jersey"
                />

                <label htmlFor="blue-jersey" className="jersey">
                  <div className="jersey-blue" />
                </label>

                <input
                  type="radio"
                  onClick={this.selectJersey}
                  name="jersey"
                  id="yellow-jersey"
                />

                <label htmlFor="yellow-jersey" className="jersey">
                  <div className="jersey-yellow" />
                </label>
              </div>

              <button
                onClick={this.submitTeam}
                className={
                  "btn" +
                  (this.state.isJerseySelected === true ? " enabled" : "")
                }
              >
                {" "}
                SUBMIT YOUR TEAM
              </button>
            </div>

            <div
              className={
                "c-start-match " +
                (this.state.isTeamSelected === true ? "active" : "")
              }
            >
              <div className="cta-lead2" />

              <div className="cta-sub-lead">
                Give your phone number to register your team.
              </div>

              <div className="number-entry">
              <div className="input-wrapper">
                <input
                  placeholder="Phone number"
                  value={this.state.msisdn}
                  onChange={ev => this.setState({ msisdn: ev.target.value })}
                />
                </div>
                <button
                  className="btn"
                  type="submit"
                  disabled={RDS.IsLoading(this.props.rds)}
                >
                  I want to start now!
                </button>

                {RDS.WhenLoading(null, () => "Wait...")(this.props.rds)}
              </div>
              <div>
                {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => (
                  <Translate id={err.errorType} />
                ))(this.props.rds)}
              </div>
            </div>
          </div>
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
    pin: ""
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.pin);
        }}
      >
        <div>
          <Translate id="we_just_sent_a_pin" />
        </div>

        <div id="pin-entry">
          <input
            placeholder="PIN"
            className="pin-input"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value })}
          />
          <button type="submit" className="btn" disabled={RDS.IsLoading(this.props.rds)}>
            OK
          </button>
          {RDS.WhenLoading(null, () => <div />)(this.props.rds)}
        </div>

        <div>
          {RDS.match({
            failure: (err: PINEntryFailure) => (
              <div>
                <div>
                  <Translate id={err.errorType} />
                </div>
                <Translate
                  id="if_not_your_mobile"
                  values={{
                    phone: this.props.msisdn
                  }}
                />
                &nbsp;
                <a onClick={() => this.props.backToStart()}>
                  <Translate id="click_here_to_change_your_number" />
                </a>
              </div>
            ),
            nothingYet: () => (
              <div>
                <Translate
                  id="didnt_receive_pin_yet"
                  values={{
                    phone: this.props.msisdn
                  }}
                />
                &nbsp;
                <a onClick={() => this.props.backToStart()}>
                  <Translate id="click_here_to_change_your_number" />
                </a>
              </div>
            ),
            loading: () => null,
            success: () => null
          })(this.props.rds)}
        </div>
      </form>
    );
  }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => (
  <div>
    <h3>Thank you!</h3>
    <a href={finalUrl}>Click here to access the product</a>
  </div>
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: ""
  };
  render() {
    return (
      <div>
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
    );
  }
}

export default HOC(tracker, Root)(initialState);
//export default HOC(tracker, Root)(mockedPINState);
//export default HOC(tracker, Root)(mockedCompletedState);
