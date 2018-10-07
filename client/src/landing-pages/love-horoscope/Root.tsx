import * as React from 'react'
import './assets/css/styles.less?raw'
import mkTracker from '../../pacman/record'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HOC, {initialState, mockedCompletedState, HOCProps, MSISDNEntryFailure, MSISDNEntrySuccess, PINEntryFailure, PINEntrySuccess, match} from '../../clients/lp-api/HOC'
import * as RDS from "../../common-types/RemoteDataState";
import {TranslationProvider, Translate, FormattedMessage, injectIntl} from './localization/index'
import Disclaimer from '../../legal-components/Disclaimer';

const tracker = mkTracker((typeof window != "undefined") ? window : null, process.env.country, 'love-horoscope')

const ExampleTransition = ({
  key,
  ...props
}: {
  key: string;
  children: JSX.Element;
  props?: any[];
}) => (
  <CSSTransition
    timeout={{ enter: 100, exit: 300 }}
    classNames={{
      enter: "test-enter",
      enterActive: "test-enter-active",
      exit: "test-exit",
      exitActive: "test-exit-active"
    }}
    key={key}
    {...props}
  />
);

const GenderSelector = injectIntl(({ className, intl }) => <div className={className}>
  <b><FormattedMessage id="sex" defaultMessage="Sex:" /></b>
  <div className={"input"} id="genre1">
    <div className={"input-in dropdown center"}>
      <select className={"operator"}>
        <option value="man">{intl.formatMessage({id:'male'})}</option>
        <option value="woman">{intl.formatMessage({id:'female'})}</option>
      </select>
    </div>
  </div>
</div>)

const Step0 = ({onEnd}) => (
  <div id="step0" className={"step center"}>
    <div className={"logo center"}></div>
    <div className={"text center font1"}><b><FormattedMessage id={"check_if_according"} defaultMessage={`Put your names to the test and see if you're meant to be!`} /> </b></div>
    <div className={"text text2 center font2"}><Translate id="what_is_your" /> </div>

    <div className={"genres center"}>
      <GenderSelector className="input-left font5" />
      <div className={"plus center font3"}>+</div>
      <GenderSelector className="input-right font5" />
    </div>

    <div className={"bt font4 btstep1"} onClick={onEnd}>
      <div><FormattedMessage id="start_»" defaultMessage="Start now »" /></div>
    </div>

  </div>)

const NumberSelector = ({title, from, to}) => {
  const dir = to >= from
  return <select className={"operator"}>
    <option value="">{title}</option>
    {[...Array(Math.abs(to - from + 1)).keys()]
    .map(d => dir ? from + d : from - d)
    .map(d => 
      <option value={d} key={d.toString()}>{d < 10 ? `0${d}` : `${d}`}</option>  
    )}
    </select>
}

const DOBSelector = injectIntl(({className, intl}) => <div className={className}>
  <b><FormattedMessage id="date_of_birth:" defaultMessage="Date of birth:" /></b>
  <div className={"star rotate-it"}></div>
  <div className={"input"} id="birthdate1_d">
    <div className={"input-in dropdown center"}>
      <NumberSelector title={ intl.formatMessage({id:'day'}) } from={1} to={31} />
    </div>
  </div>
  <div className={"input center"} id="birthdate1_m">
    <div className={"input-in dropdown center"}>
      <NumberSelector title={ intl.formatMessage({id:'month'}) } from={1} to={12} />
    </div>
  </div>
  <div className={"input"} id="birthdate1_y">
    <div className={"input-in dropdown center"}>
      <NumberSelector title={ intl.formatMessage({id:'year'}) } from={new Date().getFullYear() - 13} to={new Date().getFullYear() - 80} />
    </div>
  </div>
  <div className={"doll doll1 center anim-jump"}></div>
</div>)


const Step1 = injectIntl(({onEnd, intl}) => (<div className={"step center"} id="step1">
  <div className={"logo center"}></div>
  <div className={"text center font1"}><FormattedMessage id="please_fill_in" defaultMessage="Fill in the requested data" /></div>

  <div className={"names center"}>
    <div className={"input-left font5"}>
      <b>{intl.formatMessage({id:'name'})}</b>
      <div className={"star rotate-it"}></div>
      <div className={"input"} id="name1">
        <div className={"input-in center"}><input type="text" /></div>
      </div>
    </div>

    <div className={"plus center font3"}>+</div>

    <div className={"input-right font5"}>
      <b>{intl.formatMessage({id:'name'})}</b>
      <div className={"star rotate-it"}></div>
      <div className={"input"} id="name2">
        <div className={"input-in center"}><input type="text" /></div>
      </div>
    </div>
  </div>

  <div className={"birthdates center"}>
    <DOBSelector className="input-left font12" />
    <DOBSelector className="input-right font12" />
  </div>

  <div className={"bt font4 btstep2"} onClick={onEnd}>
    <div><FormattedMessage id="check_your_compatibility" defaultMessage="See Zodiac Compatibility!" /></div>
  </div>
</div>
))

class Step2 extends React.PureComponent<{onEnd: () => void, timeout: number}> {
  timer: any
  componentDidMount() {
    this.timer = setInterval(() => this.props.onEnd(), this.props.timeout)
  }
  componentWillUnmount(){
    if(!!this.timer){
      clearInterval(this.timer)
    }
  }
  render() {
    const {onEnd} = this.props
    return (
      <div className={"step center"} id="step2">
        <div className={"logo center"}></div>
        <div className={"text center font11"}><b><FormattedMessage id="classic_zodiac" defaultMessage="Classic Zodiac!" /></b></div>
    
        <div className={"points points1 center"}>
          <div className={"point point1 empty"}>
            <div></div>
          </div>
          <div className={"point point2 empty"}>
            <div></div>
          </div>
          <div className={"point point3 empty"}>
            <div></div>
          </div>
          <div className={"point point4 empty"}>
            <div></div>
          </div>
          <div className={"point point5 empty"}>
            <div></div>
          </div>
        </div>
    
        <div className={"text text2 center font11"}><b><FormattedMessage id="chinese_horoscope" defaultMessage="Chinese Horoscope"/></b></div>
        <div className={"points points2 center"}>
          <div className={"point point1 empty"}>
            <div></div>
          </div>
          <div className={"point point2 empty"}>
            <div></div>
          </div>
          <div className={"point point3 empty"}>
            <div></div>
          </div>
          <div className={"point point4 empty"}>
            <div></div>
          </div>
          <div className={"point point5 empty"}>
            <div></div>
          </div>
        </div>
    
        <div className={"text text3 center font11"}><b><FormattedMessage id="name" defaultMessage="Name" /></b></div>
        <div className={"points points3 center"}>
          <div className={"point point1 empty"}>
            <div></div>
          </div>
          <div className={"point point2 empty"}>
            <div></div>
          </div>
          <div className={"point point3 empty"}>
            <div></div>
          </div>
          <div className={"point point4 empty"}>
            <div></div>
          </div>
          <div className={"point point5 empty"}>
            <div></div>
          </div>
        </div>
    
        <div className={"load font4"} onClick={onEnd}>
          <div className={"inner"}></div>
          <div className={"txt"}><FormattedMessage id="calculating..." defaultMessage="Calculating..." /></div>
        </div>
      </div>
    )
  }
}


class MSISDNEntryStep extends React.PureComponent<{msisdn: string, rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>, onEnd: (msisdn: string) => void}> {
  state = {
    msisdn: this.props.msisdn
  }
  render() {
    return (
      <div className={"step center"} id="step3">
        <div className={"logo center"} />
        <div className={"subs-cont center phone-section"}>
          <div className={"inner center"}>
            <div className={"text center font6"}>
              <FormattedMessage id="your_compatibility_results" defaultMessage="Your compatibility is about to be revealed." />
              <FormattedMessage id="please_enter_your" defaultMessage="Insert your mobile phone number to receive your access code." />
            </div>

            <div className={"input-left font5"}>
              <b><FormattedMessage id="phone_number:" defaultMessage="Mobile number:" /></b>
              <div className={"star rotate-it"} />
              <div className={"input"} id="phone">
                <div className={"input-in center"}>
                  <input type="tel" value={this.state.msisdn} onChange={ev => this.setState({msisdn: ev.target.value})} maxLength={10} />
                </div>
              </div>
            </div>
          </div>
          {
            RDS.WhenFailure(null, (err : MSISDNEntryFailure) => <div className={"error_msg center font7"} id="phone_msg">{
                err.errorType == "AlreadySubscribed" ? "You are already subscribed!"
              : err.errorType == "InvalidMSISDN" ? "This mobile number is incorrect, try again."
              : err.errorType == "UnknownError" ? "An unknown error occurred."
              : "Unknown Error"
            }</div>)(this.props.rds)
          }
          {
            RDS.WhenLoading(null, () => <div className={"loading center"}>
              <div className={"sprite-spinner"}>
              </div>
            </div>)(this.props.rds)
          }
          <div className={"legal center font9"} />
          <div className={"bt font4 btphone"} onClick={() => this.props.onEnd(this.state.msisdn)}>
            <div><FormattedMessage id="see_your_result" defaultMessage="Subscribe" /></div>
          </div>
        </div>
      </div>
    );
  }
}

class PINEntryStep extends React.PureComponent<{msisdn: string, rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>, backToStart: () => void, onEnd: (pin: string) => void}> {
  state = {
    pin: ""
  }
  render() {
    return <div className={"step center"} id="step3">
      <div className={"logo center"}></div>

      <div className={"subs-cont center pin-section"}>
        <div className={"inner center"}>

          <div className={"text center font6"}><FormattedMessage id="please_now_enter" defaultMessage="Please, insert the pin sent to you phone." /></div>

          <div className={"input-center center font5"}>
            <b><FormattedMessage id="pin" defaultMessage="PIN"/></b>
            <div className={"star rotate-it"}></div>
            <div className={"input"} id="pin">
              <div className={"input-in center"}><input type="tel" maxLength={5} value={this.state.pin} onChange={ev => this.setState({pin: ev.target.value})} /></div>
            </div>
          </div>

        </div>

        {
          RDS.WhenFailure(null, (err: PINEntryFailure) => <div className={"error_msg center font7"} id="pin_msg">{
              err.errorType == "InvalidPIN" ? <FormattedMessage id="please_enter_correct" defaultMessage="Invalid PIN, try agian." />
            : err.errorType == "UnknownError" ? "An unknown error occurred."
            : err.errorType == "TooEarly" ? "You must furst submit a mobile number!"
            : "Unknwon error"
          }</div>)(this.props.rds)
        }
        {
          RDS.WhenLoading(null, () => <div className={"loading center"}>
            <div className={"sprite-spinner"}>
            </div>
          </div>)(this.props.rds)
        }
        <div className={"center font10"} id="back">We sent a PIN to {this.props.msisdn}. Wrong cell number? <a onClick={() => this.props.backToStart()}>Click here to correct</a></div>
        <div className={"legal center font9"}></div>
        <div className={"bt font4 btpin"} onClick={() => this.props.onEnd(this.state.pin)}>
          <div>Confirm »</div>
        </div>

      </div>
    </div>
  }
}

const Step4 = () => {
  const rnd = Math.floor(Math.random() * 3)
  return (
  <div className={"step success center"} id="step4">
    <div className={"logo center"}></div>
    <div className={"img-legal img-legal1"}></div>
    <div className={"img-legal img-legal2"}></div>
    <div className={"img-legal img-legal3"}></div>
    <div className={"img-legal img-legal4"}></div>

    <div className={"text center font8"}>
      <div className={"star star-left"}></div>
      <div className={"star star-right"}></div>
      <span className={"result1"}><b>{ Math.round(100 - (rnd + 1) * 5.5) }%</b></span>
    </div>

    <div className={"text-result center font6"}>
      <span className={"text-result1"}>{
          rnd == 1 ? <Translate id="you_are_a" />
        : rnd == 2 ? <Translate id="there_is_a" />
        : <Translate id="there_is_a" />
      }</span>
    </div>
    <div className={"legal-suc center font9 legal-success-default"}></div>

  </div>
)}


class Root extends React.PureComponent<HOCProps>  {
  state = {
    step: 0,
    msisdn: "",
    locale: typeof window != 'undefined' ?  window.localStorage.getItem('locale') || 'el' : 'el'
  }
  toggleLang() {
    const {locale} = this.state
    const newLocale = locale == 'el' ? 'en' : 'el'
    this.setState({locale: newLocale});
    localStorage.setItem('locale', newLocale)
  }
  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if(prevState.step < this.state.step) {
      tracker.advancedInPreFlow(`Step ${this.state.step}`)
    }
  }
  render() {
    const step = this.state.step
    const currentState = this.props.currentState
    return <TranslationProvider
        locale={this.state.locale}
    ><div>
      <div id="legals">
        <div className={"header fontHeader"}></div>
      </div>
      <div className={"footer fontFooter modal-legal-content"}>
        <div className={"footer fontFooter"}><Disclaimer /></div>
      </div>
      <div className={"main center"}>
        <div className={"box center"}>
          <TransitionGroup>
            {
                step === 0 ? <ExampleTransition key="step-0"><Step0 onEnd={() => this.setState({step: 1}) } /></ExampleTransition>
              : step === 1 ? <ExampleTransition key="step-1"><Step1 onEnd={() => this.setState({step: 2})} /></ExampleTransition>
              : step === 2 ? <ExampleTransition key="step-2"><Step2 onEnd={() => this.setState({step: 3})} timeout={5000} /></ExampleTransition>
              : step === 3 ? 
                  match({
                    msisdnEntry: rds => (
                      <ExampleTransition key="step-3-msisdn">
                        <MSISDNEntryStep msisdn={this.state.msisdn} rds={rds} onEnd={
                          msisdn => {
                            this.setState({msisdn})
                            this.props.actions.submitMSISDN(window, {host: 'm.mobiworld.biz', country: 'gr', handle: 'mobilearts', offer: window.pac_analytics.visitor.offer}, msisdn)
                          }
                        } />
                      </ExampleTransition>),
                    pinEntry: rds => (
                      <ExampleTransition key="step-3-pin">
                        <PINEntryStep onEnd={ pin => this.props.actions.submitPIN(pin) } backToStart={() => this.props.actions.backToStart()} msisdn={this.state.msisdn} rds={rds} />
                      </ExampleTransition>
                    ),
                    completed: ({finalUrl}) => (
                      <ExampleTransition key="step-4"><Step4 /></ExampleTransition>
                    )
                  })(currentState)
              : null
            }
          </TransitionGroup>
        </div>
        {/* <button onClick={() => this.toggleLang()}>{this.state.locale == 'en' ? 'Greek' : 'English'}</button> */}
      </div>
    </div>
    </TranslationProvider>
  }
}

export default (props: any) => {
  const H = HOC(tracker, Root)(initialState);
  return <H {...props} />;
};
