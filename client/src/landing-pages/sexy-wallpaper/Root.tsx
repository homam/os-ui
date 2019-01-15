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
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/style.less?raw";
import MsisdnInput from "../../common-components/msisdn/msisdn-input";
import CustomTesti from "../bid-win/components/CustomTesti";
import { any, string } from "prop-types";
import { PropertySignature } from "ts-simple-ast";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Sexy Wallpaper" //TODO: replace Unknown with your page's name
);

const rating = require("./assets/img/rating.svg");
const like = require("./assets/img/like.svg");


class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,

  };

  showPinMale = () => {
    this.setState({
      PinMale: 1,
      PinFemale: 0
    })
  }
  showPinFemale = () => {
    this.setState({
      PinMale: 0,
      PinFemale: 1
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


        {/* MSISDN START */}
        <div className="balloon balloon-4">
            <div className="title md-width top-sm">
              To keep watching, enter your phone number
          </div>
          <div className="input-container">
            {/* <input
                    placeholder="Phone number"
                    value={this.state.msisdn}
                    onChange={ev => this.setState({ msisdn: ev.target.value })}
                  /> */}
            <div className="sexy-wallpaper-input">
              <MsisdnInput maxLength={8}
                onChange={(msisdn) => this.setState({ msisdn })}
                countryCode={'+66'}></MsisdnInput>
            </div>
            <button type="submit" className="btn female full-width lg" disabled={RDS.IsLoading(this.props.rds)} onClick={this.showPinMale}>
              Submit to subscribe
          </button>
            {
              RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
            }
            <div className="error-msg">
              {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)}
            </div>
          </div>
        </div>
        {/* MSISDN END */}

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
        <div className="wrapper">
          <div className="header">
            <div className="rating">
              <img src={rating} />
            </div>
            <div className="like">
              <img src={like} /> <span className="blue">487k people</span> like this
            </div>
          </div>
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
        </div>

      </form>
    );
  }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div>
  <h3>Thank you!</h3>
  <a href={finalUrl}>Click here to access the product</a>
</div>;

// class GenderButton extends React.PureComponent {
//   constructor(props) {
//     super(props);
//   }


//   render() {

//     // gender: any
//     return (

//       <button type="button" className={"btn " + (this.props.gender === 'Male' ? "male" : "female")} onClick={e => this.selectGender(e)}>
//         {this.props.gender}
//       </button>

//     );

//   }
// }

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
    gender: '',
    preLander: 1,
  };


  nextPrelander = () => {
    this.setState({
      preLander: this.state.preLander + 1
    })
  }

  genderFemale = () => {
    this.setState({
      gender: this.state.gender = 'female',
    });

    console.log(this.state.gender);
    this.nextPrelander();

  }

  genderMale = () => {
    this.setState({
      gender: this.state.gender = 'male',
    });

    console.log(this.state.gender);
    this.nextPrelander();

  }

  render() {
    return (

      <div>
        <div className="wrapper">

          <div className="header">
            <div className="rating">
              <img src={rating} />
            </div>
            <div className="like">
              <img src={like} /> <span className="blue">487k people</span> like this
          </div>
          </div>

          <div className="dark-bg">

            {/* 1ST PRELANDER */}
            <div className={"start " + (this.state.preLander === 1 ? "active" : "hidden")}>
              <div className="prelander-img-1">
                <div className="guy-1"></div>
                <div className="girl-1"></div>
              </div>
              <div className="balloon balloon-1">
                <div className="title">
                  Choose your babe and get an exclusive sexy wallpaper!
                </div>
                <div className="title-2">
                  Choose your babe
                </div>
                <div className="btn-container">
                  <button type="button" className="btn male" onClick={e => this.genderMale(e)}>
                    Male
                  </button>

                  <button type="button" className="btn female" onClick={e => this.genderFemale(e)}>
                    Female
                  </button>
                </div>
              </div>
            </div>

            {/* 2ND PRELANDER */}
            <div className={"prelander " + (this.state.preLander === 2 ? "active" : "hidden")}>

              <div className={"prelander-img-1 " + (this.state.gender === 'female' ? "active" : "hidden")}>
                <div className="prelander-img-1">
                  <div className="girl-2"></div>
                </div>
                <div className="balloon balloon-2">
                  <div className="title-2 margin-sm">
                    You think I’m hot, huh?
                </div>
                  <div className="btn-container">
                    <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                      Of Course!
                    </button>
                    <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                      Oh yes babe!
                    </button>
                  </div>
                </div>
              </div>

              <div className={"prelander-img-1 " + (this.state.gender === 'male' ? "active" : "hidden")}>

                <div className="guy-2"></div>

                <div className="balloon balloon-2">
                  <div className="title-2 margin-sm">
                    You think I’m hot, huh?
                </div>
                  <div className="btn-container">
                    <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                      Of Course!
            </button>
                    <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                      Oh yes babe!
            </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3RD PRELANDER */}
            <div className={"prelander " + (this.state.preLander === 3 ? "active" : "hidden")}>

              <div className={"prelander-img-1 " + (this.state.gender === 'male' ? "active" : "hidden")}>
                <div className="guy-3"></div>
              </div>
              <div className="balloon balloon-3">
                <div className="title-2 md-width margin-sm">
                  You seem intense, do you want a massage?
                </div>
                <div className="btn-container">
                  <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                    Shoulder Massage
                  </button>
                  <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                    Foot Massage
                </button>
                </div>
              </div>

              <div className={"prelander " + (this.state.gender === 'female' ? "active" : "hidden")}>
                <div className="prelander-img-1">
                  <div className="girl-3"></div>
                </div>
                <div className="balloon balloon-3">
                  <div className="title-2 md-width margin-sm">
                    My shirt is dirty, what should I do?
                  </div>
                  <div className="btn-container">
                    <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                      Take off my shirt
                    </button>
                    <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                      Wash me
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={"prelander " + (this.state.preLander === 4 ? "active" : "hidden")}>
              <TranslationProvider locale={this.state.locale}>
                <TransitionGroup className={simpleOpacityTransitionStyles.group}>

                  {/* MALE MSISDN */}
                  <div className={"prelander prelander-img-1 " + (this.state.gender === 'male' ? "active" : "hidden")}>
                    <div className="balloon balloon-5">
                      <div className="title-sm guy">
                        Want to see more action?
                          </div>
                    </div>
                    <div className="guy-4"></div>
                  </div>

                  {/* FEMALE MSISDN */}
                  <div className={"prelander prelander-img-1 " + (this.state.gender === 'female' ? "active" : "hidden")}>
                    <div className="balloon balloon-5">
                      <div className="title-sm guy">
                        Follow me to the shower
                          </div>
                    </div>
                    <div className="girl-4"></div>
                    <div className="balloon balloon-4">
                      <div className="title md-width top-sm">
                        To keep watching, enter your phone number
                        </div>
                    </div>
                  </div>


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
            <CustomTesti className="sexy-wallpaper" testimonials={[
              {
                Message: () => <span className="message">I really like this app, it has really great pictures.</span>,
                Name: () => <span className="testimonials-name">- Mongkut</span>,
                stars: 5
              },
              {
                Message: () => <span className="message">Like the sexyness. I would give you 10 stars if I could.</span>,
                Name: () => <span className="testimonials-name">- Naiyana</span>,
                stars: 5
              },
              {
                Message: () => <span className="message">I love the display and quality of the pictures. It's great!</span>,
                Name: () => <span className="testimonials-name">- Somchai</span>,
                stars: 5
              },
            ]} />
          </div>
          <div className="sexy-wallpaper-disclaimer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum, magna eget convallis faucibus, libero orci molestie diam, eu pellentesque neque eros quis turpis. Aenean pulvinar rutrum eros ac bibendum. Integer id sem finibus, convallis quam ac, semper ex. Suspendisse congue, orci a viverra mollis, nisl nisi tempus neque, sollicitudin porttitor erat lectus at tellus. Morbi cursus fringilla rutrum. Aenean lacus massa, rutrum at convallis vel, scelerisque nec nunc. Mauris lacinia tempor fringilla. Mauris in quam tempor, ultrices ex id, mollis dui. Nunc nec odio rhoncus, aliquam diam et, fringilla ipsum. Sed tincidunt nisl sed arcu venenatis efficitur quis eget enim. Praesent a augue ligula.
        </div>
        </div>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);