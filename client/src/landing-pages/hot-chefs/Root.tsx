import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import  CustomTesti  from "./components/CustomTesti";

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
import DisclaimerGR from "../ichat/components/DisclaimerGR";

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

          <h3>Γράψτε το κινητό σας για <br></br>να δείτε τους <u>τους Καυτούς Σεφ!</u></h3>

          <input
            placeholder="Κινητό τηλέφωνο"
            value={this.state.msisdn}
    
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>Επόμενο</button>
          <div>
          {
            RDS.WhenLoading(null, () => <div className="wait-msg">Παρακαλώ περιμένετε...</div>)(this.props.rds)
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

          <h3>Σας στείλαμε έναν μοναδικό 4ψήφιο κωδικό. <br></br>Γράψτε τον παρακάτω για να αποκτήσετε <br></br>πρόσβαση στα βίντεο</h3>

          <input
            placeholder="PIN"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>Επόμενο</button>
          {
            RDS.WhenLoading(null, () =>  <div className="wait-msg">Παρακαλώ περιμένετε...</div>)(this.props.rds)
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
					<h3><strong>ΣΥΓΧΑΡΗΤΗΡΙΑ</strong></h3>
					
					<p>Μπορείτε τώρα να δείτε τα βίντεο</p>
					
					<button className="btn">Δείτε τώρα!</button>
</div>;


<div className="disclaimer">

    <h1>Terms &amp; Conditions</h1>

</div> 


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

          <h1>Χορτάστε με τους πιο σέξι σεφ!</h1>

        </div>
     
        <div className={`holder display-${this.state.phase == 'initial' ? 'initial' : 'flow'}`}>

          <div className="logo"></div>

          <div className="panel initial">

            <h3>Μάθετε εύκολες συνταγές από <br></br> τους πιο καυτούς σεφ</h3>

            <div className="instructions">Πρέπει να είστε άνω των 18 για να επισκεφθείτε τη σελίδα</div>

            <h2>Είστε άνω των 18; </h2>

            <button className="btn" onClick={() => this.setState({ phase: 'flow' })}>ΝΑΙ, είμαι</button>

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

        <DisclaimerGR />
      
      <CustomTesti/>

      </div>
  

    </TranslationProvider>

    
    
    


    );
  }
}


export default HOC(tracker, Root)(initialState);