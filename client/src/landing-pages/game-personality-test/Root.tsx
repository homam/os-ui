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
import CustomTesti from "../bid-win/components/CustomTesti";

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
    locale: "en",
    msisdn: this.props.msisdn,
    preLander1: 1,
    preLander2: 0,
    preLander3: 0,
    preLander4: 0,
    showMsisdn: 0,
  };

  showPrelander2 = () => {
    this.setState({
      preLander1: 0,
      preLander2: 1,
      preLander3: 0,
      preLander4: 0,
      showMsisdn: 0,
    })
  }

  showPrelander3 = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 1,
      preLander4: 0,
      showMsisdn: 0,
    })
  }

  showPrelander4 = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 0,
      preLander4: 1,
      showMsisdn: 0,
    })
  }

  showMsisdn = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 0,
      preLander4: 0,
      showMsisdn: 1,
    })
  }



  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >
        <div className="bg">
          <div className="starburst"></div>
         
          <div className="wrapper">
          {/* 1st Prelander */}
          <div className={"first-prelander " + (this.state.preLander1 === 1 ? "active" : "")}>
             
          <div className="masthead"></div>
           <div className="title">
                1 Take this SHORT test and find out!
              </div>
              <div className="ribbon title">
                <span className="alert">BONUS:</span> Receive your personalised game
              </div>
              <button className="btn" type="button" onClick={this.showPrelander2}>Test button</button>
            </div>

          {/* 2nd Prelander */}
          <div className={"second-prelander " + (this.state.preLander2 === 1 ? "active" : "")}>
          <div className="masthead sm"></div>
              <div className="title">
                2 Take this SHORT test and find out!
              </div>
              <div className="btn-container">  
              <button className="btn" type="button" onClick={this.showPrelander3}>Test button 1</button>
              <button className="btn" type="button" onClick={this.showPrelander3}>Test button 2</button>
              <button className="btn" type="button" onClick={this.showPrelander3}>Test button 3</button>
              </div>
            </div>

          {/* 3rd Prelander */}
          <div className={"third-prelander " + (this.state.preLander3 === 1 ? "active" : "")}>
          <div className="masthead sm"></div>
          <div className="title">
                3 Take this SHORT test and find out!
              </div>
          <button className="btn" type="button" onClick={this.showPrelander4}>Test button</button>
          </div>

          {/* 4th Prelander */}
          <div className={"fourth-prelander " + (this.state.preLander4 === 1 ? "active" : "")}>
          <div className="masthead sm"></div>
          <div className="title">
                4 Take this SHORT test and find out!
              </div>
          <button className="btn" type="button" onClick={this.showMsisdn}>Test button</button>
          </div>
          </div>


          {/* MSISDN INPUT START */}
          <div className={"msisdn-wrapper hidden " + (this.state.showMsisdn === 1 ? "active" : "")}>
          <div className="masthead sm"></div>

            <input
              placeholder="Phone number"
              value={this.state.msisdn}
              onChange={ev => this.setState({ msisdn: ev.target.value })}
            />
            <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
            {
              RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
            }
            <div>
              {
                RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
              }
            </div>
            {/* MSISDN INPUT END */}
          </div>
        </div>
        <div className="game-testimonial">
          <CustomTesti
            testimonials={
              [
                {
                  Message: () => <span className="message"><Translate id="testi_1" /></span>,
                  Name: () => <span className="Ahmed"> -<Translate id="testi_name1" /></span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message"><Translate id="testi_2" /></span>,
                  Name: () => <span className="testimonials-name"> -<Translate id="testi_name2" /></span>,
                  stars: 4
                },
                {
                  Message: () => <span className="message"> <Translate id="testi_3" /></span>,
                  Name: () => <span className="testimonials-name"> -<Translate id="testi_name3" /></span>,
                  stars: 5
                }
              ]
            }
          />
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


        {/* <div></div> */}

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