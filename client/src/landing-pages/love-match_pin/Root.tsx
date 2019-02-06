import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate, injectIntl } from "./localization/index";
import HOC, {
  initialState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  PINEntryFailure,
  PINEntrySuccess,
  match,
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";

import "./assets/css/styles.less?raw";
import LoveQuiz from "./components/LoveQuiz";
import CustomTesti from "../bid-win/components/CustomTesti";
import MsisdnInput from "../../common-components/msisdn/msisdn-input";
import PinInput from "../../common-components/pin/pin-input";


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

// class MSISDNEntryStep extends React.PureComponent<{
const MSISDNEntryStep = injectIntl(class extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
  intl: any;
}> {
  state = {
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
        <h2 className="boxTitles"><Translate id="TooEarly" />:</h2>
        <MsisdnInput maxLength={10}
          placeholder={this.props.intl.formatMessage({ id: "msisdn_placeholder" })}
          onChange={(msisdn) => this.setState({ msisdn })}
          countryCode={'+372'}>
        </MsisdnInput>
        <button className="button3" type="submit" id="msisdn-submit-button" disabled={RDS.IsLoading(this.props.rds)}> <Translate id="submit" /></button>
        {
          RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
        }
        <p className="error">
          {
            RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
          }
        </p>
      </form>
    );
  }
})

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
        <h2>
          <Translate id="we_just_sent_a_pin" />
        </h2>
        <div>
          {/* <input
            placeholder="PIN"
            value={this.state.pin}
            onChange={ev => this.setState({ pin: ev.target.value })}
          /> */}
          <PinInput maxLength={4}
            placeholder={"● ● ● ●"}
            onChange={(pin) => this.setState({ PinInput })}>
          </PinInput>
          <button className="button3" type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
          {
            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
          }
        </div>
        <div>
          {
            RDS.match({
              failure: (err: PINEntryFailure) => (
                <div id="PINerror">
                  <p className="error"><Translate id={err.errorType} /></p>
                  <Translate id="if_not_your_mobile" values={{
                    phone: this.props.msisdn
                  }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                </div>
              ),
              nothingYet: () => (
                <div id="PINnothing">
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

const TQStep = () => {
  const rnd = Math.floor(Math.random() * 3)
  return (
    <div className="success" id="tq">
      <h2 className="result">
        {Math.round(100 - (rnd + 1) * 5.5)}%
    </h2>
      <p className={"text-result"}>
        {
            rnd == 1 ? <Translate id="you_are_a" />
          : rnd == 2 ? <Translate id="there_is_a" />
          : <Translate id="there_is_a" />
        }
      </p>
    </div>
  )
}

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "ee",
    msisdn: "",
    appState: "quiz"
  };
  render() {
    return (
      <div id={`lang_${this.state.locale}`}>
        <TranslationProvider locale={this.state.locale}>

          <div className={`container ${this.state.appState}`}>
            <div className="header"><Translate id="header_text" /></div>
            <div className="creative">
              <div className="stamp"></div>
              <div className="title"></div>
            </div>
            <div className="whiteBox">

              <LoveQuiz onFinish={() => this.setState({ appState: 'subscription' })} />

              <div className="subscription">
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
            <CustomTesti
              className="testi"
              testimonials={[
                {
                  Message: () => <span className="message"><Translate id="testi1_text" /></span>,
                  Name: () => <span className="testimonials-name">- <Translate id="testi1_name" /></span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message"><Translate id="testi2_text" /></span>,
                  Name: () => <span className="testimonials-name">- <Translate id="testi2_name" /></span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message"><Translate id="testi3_text" /></span>,
                  Name: () => <span className="testimonials-name">- <Translate id="testi3_name" /></span>,
                  stars: 5
                }
              ]}
            />
            <div className="disclaimer">
              Sisestades oma telefoninumbri ja tellides teenuse liitud Mozzi klubiga, mis maksab 3,2 Eurot nädalas. Selle eest saadame su mobiili iganädalaselt mobiilisisu: erineva helina, taustapildi või java-mängu, mida saad oma telefoni kaudu alla laadida. See saadetav SMS maksab 3,2 €. Teenusest loobumiseks saada sms: STOP numbrile 15181. Tegemist on iseuueneva teenusega ehk teenus kehtib kuni lõpetatakse kasutaja poolt. Teenuse kasutamiseks peab sinu telefon toetama WAP-i! Teenusega liitumiseks pead olema vähemalt 18-aastane. Juhul, kui sa ei ole teenust alla laadinud, on sul õigus lepingust taganeda 14 päeva jooksul ning saada makstud raha tagasi. Teenusetingimuste lugemiseks klikkige palun <a href="http://w1.mozzi.com/ee/tnc-mozzi?device=pc&offer=1" target="_blank">siia</a>. Teenus kasutatav järgmistes võrkudes: Telia, Elisa, Tele2. Mistahes küsimustega võid pöörduda klienditoe poole telefonil 666 2364 või elektronposti aadressil ee@mozzi.com. Käesolevat teenust pakub Sam Media, Van Diemenstraat 140, 1013CN - Amsterdam, Holland.
        </div>
          </div>

        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);