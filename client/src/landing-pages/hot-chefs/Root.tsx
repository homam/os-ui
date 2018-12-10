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
import "./assets/css/styles.less?raw";
import * as RDS from "../../common-types/RemoteDataState";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "hot-chefs"
);

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    display: 'numberEntry'
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >
        <div className="panel numberEntry">

          <h3>Enter your number to get <br></br> exclusive access to <u>Hot Chef’s Cooking</u></h3>

          <input
            placeholder="Phone number"
            value={this.state.msisdn}
    
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
          <div>
          {
            RDS.WhenLoading(null, () => <div className="wait-msg">Wait...</div>)(this.props.rds)
          }
          </div>
        </div>
        <div>
          {
           RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <div className="error-msg"><Translate id={err.errorType} /></div>)(this.props.rds)
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
       {/* <div>
          <Translate id="we_just_sent_a_pin" />
       </div>*/}
       
        <div className="panel pinEntry">

          <h3>We’ve sent you a 4 digit code <br></br> please enter it below this is your unique <br></br> code for accessing the videos.</h3>

          <input
            placeholder="PIN"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
          {
            RDS.WhenLoading(null, () =>  <div className="wait-msg">Wait...</div>)(this.props.rds)
          }
        </div>
        <div>
          {
            RDS.match({
              failure: (err: PINEntryFailure) => (
                <div>
                  <div className="error-msg"><Translate id={err.errorType} /></div>
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

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="congrats">
					<h3><strong>CONGRATULATIONS!</strong></h3>
					
					<p>We’ve got your confirmation to access the videos</p>
					
					<button className="btn">Access now!</button>
</div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
    phase: "initial"
  };
  render() {
    return (
      <TranslationProvider locale={this.state.locale}>
      <div className="container">

        <div className="creative">

          <div className="badge"></div>

          <h1>Feast your eyes on CHEF's</h1>

        </div>

        <div className={`holder display-${this.state.phase == 'initial' ? 'initial' : 'flow'}`}>

          <div className="logo"></div>

          <div className="panel initial">

            <h3>Learn easy recipes from these hilarious <br></br> (and delicious) hunks</h3>

            <div className="instructions">This portal requires you to be 18 years or older to enter.</div>

            <h2>Are you over 18 old? </h2>

            <button className="btn" onClick={() => this.setState({ phase: 'flow' })}>YES, I am</button>

          </div>

                    {match({
              msisdnEntry: rds => (
                  <MSISDNEntryStep
                    msisdn={this.state.msisdn}
                    rds={rds}
                    onEnd={msisdn => {
                      this.setState({ msisdn });
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
      </TranslationProvider>
    );
  }
}
export default HOC(tracker, Root)(initialState);