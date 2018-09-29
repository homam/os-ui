import * as React from "react";
import * as RDS from "../../common-types/RemoteDataState";
import HOC, {ITolaProps} from "../../tola/TolaHOC";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Counter from "./components/Counter";
import Timer from "./components/Timer";
require("../../reset.css");
import * as styles from "./assets/css/styles.less";
import { addLocaleData, IntlProvider } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";
import nlLocaleData from "react-intl/locale-data/nl";

import mkTracker from '../../pacman/record'
import queryString from '../../pacman/queryString'

const tracker = mkTracker((typeof window != "undefined") ? window : null, queryString(window.location.search, 'xcid'), 'ke', 'first')


const imgLogo = require("./assets/img/logo.png");
const imgBadge = require("./assets/img/badge.png");
const imgPhone = require("./assets/img/phone.png");
const imgDownload = require("./assets/img/download.png");

const translations = {
  nl: {
    localeData: nlLocaleData,
    "msisdn.number_is_invalid": `Het lijkt erop dat {msisdn, number} ongeldig is`
  },
  en: {
    localeData: enLocaleData
  }
};
addLocaleData(enLocaleData);
addLocaleData(nlLocaleData);

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
      enter: styles.testEnter,
      enterActive: styles.testEnterActive,
      exit: styles.testExit,
      exitActive: styles.testExitActive
    }}
    key={key}
    {...props}
  />
);

const PrelanderStep1 = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.freeScan}>
    <h3 className={styles.mainTitle}>IS YOUR DEVICE PROTECTED?</h3>
    <div className={styles.phoneBadge}>
      <img className={styles.phone} src={imgPhone} />
    </div>
    <div className={styles.content}>
      <div className={styles.timer}>
        Free scan ends in <Timer duration={20} className={styles.cTimer} />
      </div>
      <button
        className={styles.btn + " " + styles.buttonExample}
        onClick={onClick}
      >
        scan my device now
      </button>

      <div className={styles.persuasiveItem}>
        <img src={imgDownload} />
        <h4>78,169 Downloads</h4>
        <p>In the last 7 days</p>
      </div>
    </div>
  </div>
);

class PrelanderStep2 extends React.Component<{ onClick: () => void }> {
  state: {
    showReport: boolean;
  };
  constructor(props) {
    super(props);
    this.state = {
      showReport: false
    };
  }
  render() {
    return (
      <div id="question2">
        <h3 className={styles.mainTitle}>SCANNING YOUR DEVICE</h3>
        <div className={styles.scanLine} />
        <img className={styles.phone} src={imgPhone} />

        <div className={styles.contentScan}>
          <div className={styles.progress}>
            <Counter
              className={styles.scanDisplay}
              from={0}
              to={100}
              interval={10}
              onEnd={() => this.setState({ showReport: true })}
            />
            %
          </div>

          <div
            className={
              styles.scanReport +
              " " +
              (this.state.showReport ? styles.show : "")
            }
          >
            <h3>possible infections have been detected</h3>
            <div className={styles.reportItem}>
              <div className={styles.reportItemLabel}>Infections found</div>
              <div className={styles.reportItemCount}>18</div>
            </div>

            <div className={styles.reportItem}>
              <div className={styles.reportItemLabel}>
                Infected objects removed
              </div>
              <div className={styles.reportItemCount}>11</div>
            </div>

            <div className={styles.reportItem}>
              <div className={styles.reportItemLabel}>Spyware found</div>
              <div className={styles.reportItemCount}>0</div>
            </div>

            <button className={styles.modalBtn} onClick={this.props.onClick}>
              clean my device now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Prelander extends React.Component<{ onEnd: () => void }> {
  state: {
    step: number;
  };
  constructor(params) {
    super(params);
    this.state = {
      step: 1
    };
  }

  render() {
    return (
      <TransitionGroup className={styles.fadeTransitionGroup}>
        {this.state.step == 1 ? (
          <ExampleTransition key="step-1">
            <PrelanderStep1 onClick={() => {
              tracker.advancedInPreFlow('Step 2')
              this.setState({ step: 2 })
            }} />
          </ExampleTransition>
        ) : (
          <ExampleTransition key="step-2">
            <PrelanderStep2 onClick={this.props.onEnd} />
          </ExampleTransition>
        )}
      </TransitionGroup>
    );
  }
}

const imgGift = require("./assets/img/gift.png");
const imgTick = require("./assets/img/tick.svg");
const imgClock = require("./assets/img/clock-circular-outline.png");

const NumberEntry = ({
  currentState,
  msisdn,
  onChange,
  chargeAndWait,
  error
}) => (
  <div>
    <p>
      To start cleaning,
      <br /> register NOW &amp; get
      <br />
      <strong>FREE</strong> memory booster
    </p>
    <label className={styles.numberEntryLabel}>Enter your mobile number</label>

    <div className={styles.inputWrapper}>
      <span className={styles.flag} />
      <span className={styles.feedback}>
        <img src={imgTick} />
      </span>
      <input
        type="tel"
        disabled={currentState.type == "Loading"}
        className={styles.numberEntryInput}
        maxLength={10}
        value={msisdn}
        onChange={e => onChange(e.target.value)}
      />
    </div>

    <button
      disabled={currentState.type == "Loading"}
      className={styles.btn}
      onClick={() => chargeAndWait(msisdn, "PAY", 10)}
    >
      {currentState.type == "Loading" ? "..." : "register my number"}
    </button>
    {!!error ? (
      <div
        className={styles.error}
        id="already-subscribed-error"
        data-x-role="already-subscribed-error"
      >
        You are already subscribed to this service!
      </div>
    ) : (
      ""
    )}
  </div>
);

class Modal extends React.Component<ITolaProps> {
  state: {
    msisdn: string;
  };
  constructor(props) {
    super(props);
    this.state = {
      msisdn: "05"
    };
  }
  render() {
    const { currentState, actions } = this.props;
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <img src={imgGift} className={styles.giftImg} />
          <div className={styles.numberEntry}>
            <TransitionGroup
              className={styles.fadeTransitionGroup}
              style={{ height: 280 }}
            >
              {RDS.match({
                nothingYet: () => (
                  <ExampleTransition key="nothingYet">
                    <NumberEntry
                      currentState={currentState}
                      msisdn={this.state.msisdn}
                      chargeAndWait={actions.chargeAndWait}
                      onChange={msisdn => this.setState({ msisdn })}
                      error={null}
                    />
                  </ExampleTransition>
                ),
                loading: () => (
                  <ExampleTransition key="loading">
                    <div>
                      <p>Enter your mPesa PIN</p>
                    </div>
                  </ExampleTransition>
                ),
                success: () => (
                  <ExampleTransition key="success">
                    <div>
                      <p>Thank you!</p>
                    </div>
                  </ExampleTransition>
                ),
                failure: error => (
                  <ExampleTransition key="failure">
                    <NumberEntry
                      currentState={currentState}
                      msisdn={this.state.msisdn}
                      chargeAndWait={actions.chargeAndWait}
                      onChange={msisdn => this.setState({ msisdn })}
                      error={error}
                    />
                  </ExampleTransition>
                )
              })(currentState)}
            </TransitionGroup>
          </div>
        </div>

        <div className={styles.persuasiveItem}>
          <img src={imgClock} alt="" />
          <h4>Most Recent Download</h4>
          <p>Less than a minute ago</p>
        </div>
      </div>
    );
  }
}

class Root extends React.Component<ITolaProps> {
  state: {
    locale: string;
    inPrelander: boolean;
  };
  constructor(params) {
    super(params);
    this.state = { locale: "en", inPrelander: true };
  }
  render() {
    console.log("Root", this.props, this.context);

    return (
      <IntlProvider
        locale={this.state.locale}
        messages={translations[this.state.locale]}
      >
        <div className={styles.container}>
          <div className={styles.creative}>
            <div className={styles.header}>
              <div className={styles.logo}>
                <img src={imgLogo} />
              </div>
              <div className={styles.badge}>
                <img src={imgBadge} />
              </div>
            </div>
            <TransitionGroup>
              <Prelander onEnd={() => {
                tracker.viewChanged('CTA')
                this.setState({ inPrelander: false })
              }} />
              {this.state.inPrelander ? (
                <div />
              ) : (
                <ExampleTransition key="loading">
                  <Modal {...this.props} />
                </ExampleTransition>
              )}
            </TransitionGroup>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default (props: any) => {
  const H = HOC(tracker, Root)(RDS.NothingYet());
  return <H {...props} />;
};
