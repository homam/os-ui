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
import CustomTesti from "../bid-win/components/CustomTesti";
import MsisdnInput from "../../common-components/msisdn/msisdn-input";


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "WhatsApp Sticker" //TODO: replace Unknown with your page's name
);

const Monster2 = require("./assets/img/monster-whatsapp.png");
const LaughitUp = require("./assets/img/laugh.png")
const New = require("./assets/img/star.png");
const More = require("./assets/img/more.png");
const NewSm = require("./assets/img/star-sm.svg");
const Monster1 = require("./assets/img/monster-1.png");
const StickerPack = require("./assets/img/sticker-pack.png");
const HumourSticker = require("./assets/img/humour-sticker.png");
const Romance = require("./assets/img/romance.png");

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;

}> {
  state = {
    locale: "en",
    msisdn: this.props.msisdn,
    firstStep: 1,
    secondStep: 0,
    humour: 0,
    romance: 0,
  };

  showStep = () => {
    this.setState({
      firstStep: 0,
      secondStep: 0,
      humour: 1,
      romance: 0,
    })
  }

  showStep2 = () => {
    this.setState({
      firstStep: 0,
      secondStep: 1,
      humour: 0,
      romance: 1,
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
        {/* FIRST PRELANDER*/}
        <div className="bg"></div>
        <div className="wrapper">
          <div className="new">
            <img src={New} />
          </div>
          <div className="laugh-it">
            <img src={LaughitUp} />
          </div>
          <div className={"first-prelander " + (this.state.firstStep === 1 ? "active" : "")}>
            <div className="monster-container1">
              <img src={Monster2} />
            </div>
            <div className="monster-container">
              <div className="body-container2 body-container2--monster1">
                <div className={"monster-1 " + (this.state.firstStep === 1 ? "active" : "")}>
                  <img src={Monster1} />
                </div>
                <div className="body-copy">
                  <p><Translate id="express-yourself"></Translate></p>
                  <p>New <span className="green">WhatsApp Stickers</span></p>
                </div>
                <p>Choose your sticker type:</p>
                <div className="btn-wrapper">
                  <div>
                    <button type="button" className="btn" onClick={this.showStep}>Funny</button>
                  </div>
                  <div>
                    <button type="button" className="btn" onClick={this.showStep2}>Romance</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MSISDN INPUT */}
          <div className={"hidden " + (this.state.firstStep === 0 ? "active" : "")}>
            <div className="monster-container">
              {/* FUNNY */}
              <div className="body-container2 body-container2--monster2">
                <div className={"humour " + (this.state.humour === 0 ? "hidden" : "")}>
                  <div className="monster-2">
                    <img src={HumourSticker} />
                  </div>
                  <div className="space1"></div>
                  <div className="title">
                    You’ve got good sense of humour
                  </div>
                </div>
                {/* ROMANCE */}
                <div className={"romantic " + (this.state.romance === 0 ? "hidden" : "")}>
                  <div className="monster-2 monster-2--md">
                    <img src={Romance} />
                  </div>
                  <div className="space1"></div>
                  <div className="title">
                    You are so romantic
                  </div>
                </div>
                <div>
                  Enter your phone number to get all the sticker packs.
                </div>
                {/* <input
                  placeholder="Phone number"
                  value={this.state.msisdn}
                  onChange={ev => this.setState({ msisdn: ev.target.value })}
                /> */}
                <div className="whatsapp-input">
                  <MsisdnInput maxLength={8}
                    onChange={(msisdn) => this.setState({ msisdn })}
                    countryCode={'+971'}></MsisdnInput>
                </div>

                <button className="btn" type="submit" disabled={RDS.IsLoading(this.props.rds)}>Submit to Subscribe</button>
                {RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)}
                <div className="error-msg">
                  {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)}
                </div>
                {/* MSISDN END HERE*/}
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="more">
            <div className="new-sm">
              <img src={NewSm} />
            </div>
            <img src={More} />
          </div>
          <div className="whatsapp-testimonial">
            <CustomTesti
              className="whatsapp-sticker"
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="faris"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="layla"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="ismail"></Translate></span>,
                    stars: 5
                  }
                ]
              }
            />
          </div>
          <div className="disclaimer">
            <p><Translate id="disclaimers" /></p>
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
        {/* PIN FLOW */}
        <div className="bg"></div>
        <div className="wrapper">
          <div className="new">
            <img src={New} />
          </div>
          <div className="laugh-it">
            <img src={LaughitUp} />
          </div>
          <div className="monster-container sticker-ready">
            <div className="body-container2">
              <div className="monster-2 sticker-pack">
                <img src={StickerPack} />
              </div>
              <div className="title">
                The sticker packs are ready!
            </div>
              <div className="pin-title">
                <Translate id="we_just_sent_a_pin" />
              </div>
              <div>
                <input id="pin-entry"
                  className="pin-input"
                  placeholder="PIN Number"
                  pattern="\d*"
                  maxLength={5}
                  value={this.state.pin}
                  onChange={ev => this.setState({ pin: ev.target.value })}
                />
                <button className="btn" type="submit" disabled={RDS.IsLoading(this.props.rds)}>Confirm</button>
                {RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)}
              </div>

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
                  <a className="link" onClick={() => this.props.backToStart()}>
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
          <div className="more">
            <div className="new-sm">
              <img src={NewSm} />
            </div>
            <img src={More} />
          </div>
          <div className="whatsapp-testimonial">
            <CustomTesti
              className="whatsapp-sticker"
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="faris"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="layla"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="ismail"></Translate></span>,
                    stars: 5
                  }
                ]
              }
            />
          </div>
          <div className="disclaimer">
            <p><Translate id="disclaimers" /></p>
          </div>
        </div>
      </form>
    );
  }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div>
  <div className="bg"></div>
  <div className="wrapper">
    <div className="new">
      <img src={New} />
    </div>
    <div className="laugh-it">
      <img src={LaughitUp} />
    </div>

    <div className="monster-container sticker-ready">
      <div className="body-container2 thank-you">
        <div className="monster-2">
          <img src={HumourSticker} />
        </div>
        <div className="space1"></div>
        <div className="title">Thank you!</div>
        <div>Now you can express your emotions with the amazing stickers. Have fun!</div>
        <a className="btn" href={finalUrl}>Download Now</a>
      </div>
    </div>
    <div className="space2"></div>
    <div className="disclaimer">
      <p><Translate id="disclaimers" /></p>
    </div>
  </div>
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