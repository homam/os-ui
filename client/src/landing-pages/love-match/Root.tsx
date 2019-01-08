import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate, injectIntl } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  match,
  MOLink,
} from "../../clients/lp-api-mo/HOC";
import * as RDS from "../../common-types/RemoteDataState";

import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/styles.less?raw";
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";
import CustomTesti from "../bid-win/components/CustomTesti";
import MsisdnInput from "../../common-components/msisdn/msisdn-input";
import TimerComponent from "../../common-components/timer/timer";
import { translate } from "../../../webpack/dev-utils/translate-by-yandex";
import DOBPicker from "./components/DOBPicker";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "love-match" 
);
 const MoComp = ({ keyword, shortcode }: IKeywordShortcode ) => {

  return  <div className="whiteBox boxMove">
  <div className="boxTitles moHead"><Translate id="send_sms_text"/></div>
  <div className="tag1"><Translate id="results_deleted_text"/> <span className="timer"><TimerComponent timerDuration={30} /></span></div>

    <MOLink keywordAndShortcode={{ keyword, shortcode }}>
    
 {/* FROM HERE YOU DESIGN */}
    
 <button type="button" className="button3" id="sms-now-button"><Translate id="sms_now_text"/></button>

  <div className="or">- <Translate id="or_text"/> -</div>

   <div className="keys"> <Translate id="SMS_text"/> <span className="keyword">{keyword}</span> <Translate id="To_text"/> <span className="shortcode">{shortcode}  </span></div>

   {/*  HERE END DESIGN */}
    
    </MOLink>
    {/* <div>
      <a className="try-again" onClick={() => this.backToStart()}>Incorrect. Please try again.</a>
    </div> */}
  </div>

 } 

const MSISDNEntryStep = injectIntl(class extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
  intl: any;
  
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

      <div className="header"><Translate id="header_text"/></div>
      <div className="creative">
      <div className="stamp"></div>
      <div className="title"></div>
      </div>
        <div className={"beginDiv " + (this.state.displayScreen == 1 ? "display" : "")}>
        <div className="whiteBox boxMove">
          <h2 className="boxTitles firstHead"><Translate id="discover_text"/></h2>
          <h6 className="smallTitle"><Translate id="invite_text"/></h6>
          <button type="button" className="button fat1" id="start-button" onClick={this.updateState} >
            <Translate id="start_now"/>
          </button>
        </div>
        </div>



        <div className={"genderDiv " + (this.state.displayScreen == 2 ? "display" : "")}>
        <div className="whiteBox">
          <h2 className="boxTitles"><Translate id="select_gender"/></h2>
          <div className="btnGender">
          <button type="button" className="button1"  id="male-button" onClick={this.updateState} ></button>

          <button type="button" className="button2" id="female-button" onClick={this.updateState} ></button>
          </div>
          <div className="gend">
            <div className="male"><Translate id="Male_text"/></div>
            <div className="female"><Translate id="Female_text"/></div>
          </div>
        </div>
        </div>



        
        <div className={"nameDiv " + (this.state.displayScreen == 3 ? "display" : "")}>
        <div className="whiteBox bigBox">
          <h2 className="boxTitles"><Translate id="fill_your_details"/></h2>

        <div className="c-input-name form1">
        <label className="labelStyle"><Translate id="your_name"/></label><input className="inputStyle1" type="text"/>
        </div>

        <div className="c-input-name form1">
        <label className="labelStyle"><Translate id="your_dob"/></label><DOBPicker />
        </div>

        <button type="button" className="button3" id="submit-your-details" onClick={this.updateState} >
          <Translate id="submit"/>
        </button>
        </div>
        </div>



      
      <div className={"dateDiv " + (this.state.displayScreen == 4 ? "display" : "")}>
      <div className="whiteBox bigBox">
        <h2 className="boxTitles boxFont"><Translate id="fill_lovers_details"/></h2>

        <div className="c-input-name form1">
        <label className="labelStyle"><Translate id="lovers_name"/></label><input className="inputStyle1" type="text"/>
        </div>

        <div className="c-input-name form1">

        <label className="labelStyle"><Translate id="lovers_dob"/></label><DOBPicker />
        </div>

        <button type="button" className="button3" id="submit-lover-details" onClick={this.updateState} >
            <Translate id="submit"/>
        </button>
       </div>
      </div>


     <div className={"phoneDiv " + (this.state.displayScreen == 5 ? "display" : "")}>
     <div className="overlay">
     <div className="tagline"><Translate id="incentive_statement"/></div>
     </div>
     <div className="whiteBox boxMove">
     <h2 className="boxTitles entryTitle"><Translate id="phone_entry_statement"/></h2>
     <button type="button" className="button" onClick={this.updateState} >
     <Translate id="submit"/>
        </button>
        <div>
         
          <MsisdnInput maxLength={10}
                      placeholder={this.props.intl.formatMessage({ id: "msisdn_placeholder" })}
                      onChange={(msisdn) => this.setState({ msisdn })}
                      countryCode={'+84'}></MsisdnInput>
          <button className="button3" type="submit" id="msisdn-submit-button" disabled={RDS.IsLoading(this.props.rds)}> <Translate id="submit"/></button>
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



        <div className={"moDiv" + (this.state.displayScreen == 6 ? "display" : "")}>
        <MoComp keyword="LOVE" shortcode="666"/>
        </div>
      </form>



        <CustomTesti
          className="testi"
          testimonials={
            [
              {
                Message: () => <span className="message"><Translate id="testi1_text"/></span>,
                Name: () => <span className="testimonials-name">- <Translate id="testi1_name"/></span>,
                stars: 5
              },
              {
                Message: () => <span className="message"><Translate id="testi2_text"/></span>,
                Name: () => <span className="testimonials-name">- <Translate id="testi2_name"/></span>,
                stars: 5
              },
              {
                Message: () => <span className="message"><Translate id="testi3_text"/></span>,
                Name: () => <span className="testimonials-name">- <Translate id="testi3_name"/></span>,
                stars: 5
              }
            ]
          }
        />

      </div>
    );
  }
});




// class PINEntryStep extends React.PureComponent<{
//   msisdn: string;
//   rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
//   backToStart: () => void;
//   onEnd: (pin: string) => void;
// }> {
//   state = {
//     pin: ""
//   };
//   render() {
//     return (
//       <form
//         onSubmit={ev => {
//           ev.preventDefault();
//           this.props.onEnd(this.state.pin);
//         }}
//       >
//         <div>

//           <Translate id="we_just_sent_a_pin" />
//         </div>
//         <div>
//           <input
//             placeholder="PIN"
//             value={this.state.pin}
//             onChange={ev => this.setState({ pin: ev.target.value })}
//           />
//           <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
//           {
//             RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
//           }
//         </div>
//         <div>
//           {
//             RDS.match({
//               failure: (err: PINEntryFailure) => (
//                 <div>
//                   <div><Translate id={err.errorType} /></div>
//                   <Translate id="if_not_your_mobile" values={{
//                     phone: this.props.msisdn
//                   }} />&nbsp;
//                   <a onClick={() => this.props.backToStart()}>
//                     <Translate id="click_here_to_change_your_number" />
//                   </a>
//                 </div>
//               ),
//               nothingYet: () => (
//                 <div>
//                   <Translate id="didnt_receive_pin_yet" values={{
//                     phone: this.props.msisdn
//                   }} />&nbsp;
//                   <a onClick={() => this.props.backToStart()}>
//                     <Translate id="click_here_to_change_your_number" />
//                   </a>
//                 </div>
//               ),
//               loading: () => null,
//               success: () => null
//             })(this.props.rds)
//           }
//         </div>
//       </form>
//     );
//   }
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
          {match({
                    msisdnEntry: rds => (
                      <div>
                        {
                          RDS.WhenSuccess<MSISDNEntrySuccess, JSX.Element>(<MSISDNEntryStep
                            msisdn={this.state.msisdn}
                            rds={rds}
                            onEnd={msisdn => {
                              this.setState({ msisdn });
                              this.props.actions.submitMSISDN(window, null, msisdn);
                            }}
                          />, data => <MoComp {...data}  />)(rds)
                        }
                      </div>
                    ),
                    completed: () => (
                      <div>
                        <TQStep finalUrl={""} />
                      </div>
                    )
                  })(this.props.currentState)}
        </TranslationProvider>

        <div className="disclaimer">
        Ngay sau khi đăng ký, bạn sẽ nhận link truy cập dịch vụ để tải các ứng dụng (chỉ dành cho điện thoại Android). 
        Đây là gói thuê bao theo ngày, mức phí 3.000vnd/ngày (đối với mạng Viettel, Vinaphone), dịch vụ tự động gia hạn. 
        Để dừng thuê bao đối với mạng Viettel, gửi  <span>HUY APP1</span> đến <span>5657</span>. 
        Để dừng thuê bao đối với mạng Vinaphone, gửi <span>HUY APP</span> đến <span>1266</span>. 
        ĐTHT: 024.22159988 (Viettel), 0943110634 (Vinaphone). 
        </div>
        
      </div>
     
    );
  }
}
export default HOC(tracker, Root)(initialState);