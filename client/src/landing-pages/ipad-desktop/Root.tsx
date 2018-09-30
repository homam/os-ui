import * as React from "react";
import mkTracker from "../../pacman/record";
import * as styles from "./assets/css/styles.less";
import Timer from "../first/components/Timer";
import MSISDNInput from "../first/components/MSISDNInput";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown"
);

const imgIpad = require("./assets/img/ipad.png");
const imgIpadSmall = require("./assets/img/ipad-small.png");
const imgIpadBack = require("./assets/img/ipad-back.png");

class Root extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={styles.cHeader}>
          <div className={styles.header}>
            <div className={styles.logo}>iPad Pro</div>

            <button className={[styles.btn, styles.btnSmall].join(" ")}>
              Join Now
            </button>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.creative}>
            <div className={styles.cContent}>
              <div className={styles.content}>
                <h1 className={styles.mainTitle}>
                  Dont lose this chance to win <br />
                  an iPad Pro
                </h1>

                <p className={styles.leadText}>
                  You are closer to winning than you think
                </p>
                <p className={styles.persuasiveItem}>
                  <span>In High Demand</span> You have 1 in 3 chances to win{" "}
                </p>

                <h3  className={styles.offer}>Offer expires in &nbsp; <Timer duration={4} className={styles.timer} /></h3>

                <div className={styles.holder}>
                  <form className={styles.numberEntry}>
                    <label data-x-role="enter-number">
                      Enter phone number to compete now
                    </label>

                    <MSISDNInput maxLength={10} msisdn="+233" onChange={() => void 7} isValid={false} classNames={{
                      inputWrapper: styles.msisdnInputWrap
                    }} />

                    <a
                      href="javascript:void(0);"
                      className={styles.btn}
                    >
                      I want to Win
                    </a>

                    <div
                      className={styles.error}
                      data-x-role="already-subscribed-error"
                    >
                      You are already subscribed to this service
                    </div>

                    <div
                      className={styles.error}
                      data-x-role="invalid-number-error"
                    >
                      Please enter a valid number
                    </div>
                  </form>
                </div>

                <div className={styles.testimonies}>
                  <div className={styles.testimonyItem}>
                    <div className={styles.testimonyImg}>
                      <img src="assets/img/person1.jpg" />
                    </div>
                    <div className={styles.testimonyDesc}>
                      <div className={styles.testimonyName}>DJ Reimy </div>
                      <div className={styles.testimonyComment}>
                        testimony about the ipad and how wonderfull it is. get
                        your hands on this ipad today
                      </div>
                    </div>
                  </div>

                  <div className={styles.testimonyItem}>
                    <div className={styles.testimonyImg}>
                      <img src="assets/img/person1.jpg" />
                    </div>
                    <div className={styles.testimonyDesc}>
                      <div className={styles.testimonyName}>DJ Reimy </div>
                      <div className={styles.testimonyComment}>
                        testimony about the ipad and how wonderfull it is. get
                        your hands on this ipad today
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <img src={imgIpad} />
              </div>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <a href="javascript:void(0);" target="_blank">
              Terms and Conditions
            </a>
          </div>
        </div>

        <div className={styles.mo}>
          <div className={styles.summaryHeader}>
            <div className={styles.moContainer}>
              <div className={styles.cSummary}>
                <img className={styles.ipad} src={imgIpadSmall} />

                <div className={styles.summaryDetails}>
                  <p className={styles.spec}>
                    10.5-inch iPad Pro Wi-Fi 64GB - Silver
                  </p>
                  <p className={styles.priceInfo}>HK$4,988</p>
                  <p>No engraving</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.moContainer}>
            <div className={styles.moDetails}>
              <h2>Please confirm your entry to win your ipad Pro</h2>
              <p>You might not have this chance again. Send your SMS Now! </p>

              <div className={styles.keyword}>
                <p>
                  {" "}
                  Send SMS <span className={styles.actualkey}>
                    KEYWORD{" "}
                  </span> to <span className={styles.sendto}> 123456 </span>
                </p>

                <div className={styles.instructions}>
                  <p>1. Open SMS messanger</p>
                  <p>
                    2. Send <span>KEYWORD</span> to <span>123456</span>
                  </p>
                  <p>Send SMS and stand a chance to win free apple care</p>
                </div>
              </div>

              <div className={styles.persuaciveSubscription}>
                <div>10 people have sent sms in the past minute </div>
              </div>

              <img src={imgIpadBack} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
