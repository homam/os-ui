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
import "./assets/css/style.less?raw";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "WhatsApp Sticker" //TODO: replace Unknown with your page's name
);

const Monster = require("./assets/img/monster-body.png");
const Monster2 = require("./assets/img/monster-whatsapp.png");

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    locale: "en",
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

        {/* MSISDN START HERE*/}
        <div className="wrapper">
          <div className="monster-container1">
            <img src={Monster2} />
          </div>
          <div className="monster-container">
            <div className="body-container">
              <p>Express yourself with</p>
              <p>New Whatsapp Stickers</p>
            </div>
          </div>

          {/* MSISDN INPUT */}
          <div>
            <input
              placeholder="Phone number"
              value={this.state.msisdn}
              onChange={ev => this.setState({ msisdn: ev.target.value })}
            />
            <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
            {RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)}
          </div>
          <div>
            {
              RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
            }
          </div>

        </div>
        {/* MSISDN END HERE*/}
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
        <div>
          <input
            placeholder="PIN"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
          {
            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
          }
        </div>
        <div>
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
    );
  }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div>
  <h3>Thank you!</h3>
  <a href={finalUrl}>Click here to access the product</a>
</div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
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