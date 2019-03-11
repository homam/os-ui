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
import "./assets/css/styles.less?raw";
import { mockSuccessState } from "../../clients/mpesa/TolaHOC";
import DisclaimerGR_Appspool from "./components/DisclaimerGR_Appspool";
import ComponentPopup from "./components/ComponentPopup";


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "hot-chefs"
);


class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  checked: boolean;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string, checked: boolean) => void;
}> {
  state = {
    popup:false,
    msisdn: this.props.msisdn,
    checked: this.props.checked,
    validationError: null
  };
  render() {
    return (
      <form
        onSubmit={ev => {

          ev.preventDefault();
          if (this.state.msisdn.length < 5) {

            this.setState({ validationError: <Translate id="numberEntryErrorMobile" defaultMessage="Please fill in your mobile number!" />})
       
          } else if (!this.state.checked) {

            this.setState({ 
              validationError: <Translate id="numberEntryErrorCheck" defaultMessage="Please agree to the terms and conditions!" />, popup:true});
        
          } else {
            this.setState({ validationError: null })
            this.props.onEnd(this.state.msisdn, this.state.checked);
          }

        }}
      >

      <div className="panel numberEntry">

          <h3> <Translate id="numberEntryTitle" defaultMessage="Enter your number to get exclusive access to Hot Chef’s Cooking" /></h3>

          <input
            type="tel"
            value={this.state.msisdn}
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          />

          <div>
              {
                RDS.WhenLoading(null, () => <div className="wait-msg"><Translate id="numberEntryWait" defaultMessage="Please wait..." /></div>)(this.props.rds)
              }
              {
                RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <div className="error-msg"><Translate id={err.errorType} /></div>)(this.props.rds)
              }
              {
                this.state.validationError != null
                  ? <div className="error-msg">{this.state.validationError}</div>
                  : null
              }
            </div>

          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}><Translate id="numberEntrySubmit" defaultMessage="Submit" /></button>

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

          <h3><Translate id="pinEntryTitle" defaultMessage="We’ve sent you a 4 digit code please enter it below this is your unique code for accessing the videos." /></h3>

          <input
            placeholder="PIN"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}><Translate id="pinEntrySubmit" defaultMessage="Submit" /></button>
          {
            RDS.WhenLoading(null, () => <div className="wait-msg"><Translate id="pinEntryWait" defaultMessage="Please wait..." /></div>)(this.props.rds)
          }
        </div>
        <div>
          {
            RDS.match({
              failure: (err: PINEntryFailure) => (
                <div>
                  <div className="error-msg"><Translate id={err.errorType} /></div>

                  <div className="notNumber">
                    <Translate id="if_not_your_mobile" values={{
                      phone: this.props.msisdn
                    }} />&nbsp;
                    <a onClick={() => this.props.backToStart()}>
                      <Translate id="click_here_to_change_your_number" />
                    </a>
                  </div>
             
                </div>
              ),
              nothingYet: () => (
                <div className="notNumber">
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
  <h3><strong><Translate id="congratsTitle" defaultMessage="Congratulations!" /></strong></h3>

  <p><Translate id="congratsMsg" defaultMessage="Submit" /></p>

  <a href={finalUrl} className="btn" target="_blank"><Translate id="congratsSubmit" defaultMessage="Submit" /></a>
</div>;


<div className="disclaimer">

  <h1>Terms &amp; Conditions</h1>

</div>


class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "el",
    msisdn: "69",
    checked: false,
    phase: "initial"
  };
  render() {
    return (
      <TranslationProvider locale={this.state.locale}>
        <div className="container">


          <div className="creative">

            <div className="badge"></div>

            <h1><Translate id="creativeSubTitle" defaultMessage="Feast your eyes on CHEF's" /></h1>

          </div>

          <div className={`holder display-${this.state.phase == 'initial' ? 'initial' : 'flow'}`}>

            <div className="logo"></div>

            <div className="panel initial">

              <h3><Translate id="initialTitle" defaultMessage="Learn easy recipes from these hilarious (and delicious) hunks" /></h3>

              <div className="instructions"><Translate id="initialSubTitle" defaultMessage="This portal requires you to be 18 years or older to enter." /></div>

              <h2><Translate id="initialWarning" defaultMessage="Are you over 18 old?" /></h2>

              <button className="btn" onClick={() => {this.setState({ phase: 'flow' }), tracker.advancedInPreFlow("age-validate")}}><Translate id="initialSubmit" defaultMessage="Yes, I am" /></button>

            </div>

            {match({
              msisdnEntry: rds => (
                <MSISDNEntryStep
                  msisdn={this.state.msisdn}
                  rds={rds}
                  checked={this.state.checked}
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


            <DisclaimerGR_Appspool/>


        </div>

      </TranslationProvider>

    );
  }
}


export default HOC(tracker, Root)(initialState);