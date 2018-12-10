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
import "./assets/css/styles.less?raw";
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
    msisdn: this.props.msisdn,
    displayScreen: 1, 
  };

  updateState = () => {
    this.setState({
      displayScreen: this.state.displayScreen + 1
    });
  }

  render() {

    return (
      <div className="container">
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >

      <div className="header">Is your partner going to leave you?</div>
      <div className="creative">
      <div className="stamp"></div>
      <div className="title"></div>
      </div>
        <div className={"beginDiv " + (this.state.displayScreen == 1 ? "display" : "")}>
        <div className="whiteBox">
          <h2 className="boxTitles">Discover how compatible are you with your partner!</h2>
          <button type="button" className="button fat1" onClick={this.updateState} >
            Start Now!
          </button>
        </div>
        </div>



        <div className={"genderDiv " + (this.state.displayScreen == 2 ? "display" : "")}>
        <div className="whiteBox">
          <h2 className="boxTitles">Select your Gender</h2>
          <button type="button" className="button" onClick={this.updateState} >
            Male
          </button>

          <button type="button" className="button" onClick={this.updateState} >
            Female
          </button>
        </div>
        </div>



        
        <div className={"nameDiv " + (this.state.displayScreen == 3 ? "display" : "")}>
        <div className="whiteBox">
          <h2 className="boxTitles">Fill your details below:</h2>

        <div className="c-input-name">
        <label className="labelStyle">Your Name:</label><input className="inputStyle" type="text"/>
        </div>

        <div className="c-input-name">
        <label className="labelStyle">Your DOB:</label><input className="inputStyle" type="date"/>
        </div>

        <button type="button" className="button" onClick={this.updateState} >
          Submit
        </button>
        </div>
        </div>



      
      <div className={"dateDiv " + (this.state.displayScreen == 4 ? "display" : "")}>
      <div className="whiteBox">
        <h2 className="boxTitles">Fill your lover's below:</h2>

        <div className="c-input-name">
        <label className="labelStyle">Lover's Name:</label><input className="inputStyle" type="text"/>
        </div>

        <div className="c-input-name">
        <label className="labelStyle">Lover's DOB:</label><input  className="inputStyle" type="date" />
        </div>

        <button type="button" className="button" onClick={this.updateState} >
            Submit
        </button>
       </div>
      </div>


     <div className={"phoneDiv " + (this.state.displayScreen == 5 ? "display" : "")}>
     <div className="overlay"></div>
     <div className="whiteBox">
     <h2 className="boxTitles">Enter your phone number below to get results:</h2>
        <div>
          <input
            placeholder="Phone number"
            value={this.state.msisdn}
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
          {
            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
          }
        </div>
        <div>
          {
            RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
          }
        </div>
        </div>
        
        </div>
      </form>

        <CustomTesti
          className="testi"
          testimonials={
            [
              {
                Message: () => <span className="message">"This app has been fun!"</span>,
                Name: () => <span className="testimonials-name">- Mena Wang</span>,
                stars: 5
              },
              {
                Message: () => <span className="message">"I love how accurate this is."</span>,
                Name: () => <span className="testimonials-name">- Mira Woh</span>,
                stars: 5
              },
              {
                Message: () => <span className="message">"Love matching is everything"</span>,
                Name: () => <span className="testimonials-name">- Mimi Blah</span>,
                stars: 5
              }
            ]
          }
        />
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

// function MO({ keyword, shortcode, backToStart }: IKeywordShortcode & { backToStart: () => void }) {
//   return <div className="mo-wrapper">

//   <h1>Your game is ready for download</h1>

//     <div><h2>To <em>download</em> send SMS </h2>
    
//    <div> <span className="keyword">{keyword}</span> to <span className="shortcode">{shortcode}  </span></div>

//    <button type="button" className="btn primary">SMS Now</button>
    
//     </div>
//     <div>

//       <a className="try-again" onClick={() => backToStart()}>Try again</a>
//     </div>
//   </div>
// }

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