import * as React from 'react'
import './assets/css/styles.less'
import mkTracker from '../../pacman/record'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HOC, {initialState, HOCProps, MSISDNEntryFailure, MSISDNEntrySuccess, PINEntryFailure, PINEntrySuccess} from '../../clients/lp-api/HOC'
import * as RDS from "../../common-types/RemoteDataState";
import { addLocaleData, IntlProvider, FormattedMessage, injectIntl } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";
import elLocaleData from "react-intl/locale-data/el";

const translations = {
  "en": {
      localeData: enLocaleData,
      "check_if_according": "Check if according to your horoscope you are made for each other",
      "what_is_your": "What is your gender?",
      "sex": "Sex",
      "male": "Male",
      "female": "Female",
      "start_»": "Start »",
      "please_fill_in": "Please fill in the information below",
      "name": "Name",
      "date_of_birth:": "Date of birth:",
      "day": "Day",
      "month": "Month",
      "year": "Year",
      "check_your_compatibility": "Check your Compatibility!",
      "classic_zodiac": "Classic Zodiac",
      "chinese_horoscope": "Chinese Horoscope",
      "calculating...": "Calculating...",
      "your_compatibility_results": "Your compatibility results are now ready",
      "please_enter_your": "Please enter your phone number to receive your access code.",
      "phone_number:": "Phone Number:",
      "see_your_result": "See your result",
      "please_now_enter": "Please now enter the PIN code you received on your phone.",
      "pin": "PIN",
      "confirm_»": "Confirm »",
      "95%": "95%",
      "83%": "83%",
      "75%": "75%",
      "you_are_a": "You are a great couple! Or at least it is what you feel you are. The chemistry between you is very good, but there are some problems that you have to solve throughout the adventure you have together, but you are not sure what do you want at times. However, you are not willing to sacrifice your relationship. Don't forget that respect of personal preferences and good communication between you two are the key to a healthy, lasting and successful relationship. A very positive aspect is that you will never get bored of each other and that you can always count on each other in sensitive situations.",
      "there_is_a": "There is a lot of respect between you two. If you add a little more excitement, the flame of passion would awaken more, and it is very likely that you will live the whole happy life together. Try to always maintain this flame and this respect that is only given by the mutual love you feel for each other, even though there are problems - they will be solved and will never affect your relationship in the long run.",
      "never_formalize_a": "Never formalize a relationship just because you think you should do it. Everyone: your friends, your family and even people who are not so close, think that you are the perfect couple. The love in your relationship can grow and strengthen. It does not have to go too fast, give it time and experiences. It's time to relax and find out if your relationship is solid or only fleeting.",
      "enter_a_valid": "Enter a valid phone number.",
      "accept_the_terms": "Accept the terms and conditions.",
      "accept_the": "Accept the",
      "terms_and_conditions": "Terms and Conditions",
      "this_code_is": "this code is your personal ID",
      "please_enter_correct": "Please enter correct PIN",
      "checking_the_subscription...": "Checking the subscription...",
      "if_": "if  is not your phone number",
      "click_here...": "Click here..."
  },
  "el": {
      localeData: elLocaleData,
      "check_if_according": "Ελέγξτε αν σύμφωνα με το ωροσκόπιό σας είστε φτιαγμένοι ο ένας για τον άλλο",
      "what_is_your": "Ποιο είναι το φύλο σας;",
      "sex": "Φύλο",
      "male": "Άνδρας",
      "female": "Γυναίκα",
      "start_»": "Έναρξη »",
      "please_fill_in": "Συμπληρώστε τις παρακάτω πληροφορίες",
      "name": "Όνομα",
      "date_of_birth:": "Ημερομηνία γέννησης:",
      "day": "Ημέρα",
      "month": "Μήνας",
      "year": "Έτος",
      "check_your_compatibility": "Ελέγξτε τη συμβατότητά σας!",
      "classic_zodiac": "Κλασικά Ζώδια",
      "chinese_horoscope": "Κινέζικο Ωροσκόπιο",
      "calculating...": "Υπολογισμός...",
      "your_compatibility_results": "Τα αποτελέσματα συμβατότητάς σας είναι τώρα έτοιμα",
      "please_enter_your": "Εισαγάγετε τον αριθμό τηλεφώνου σας για να λάβετε τον κωδικό πρόσβασής σας.",
      "phone_number:": "Αριθμός Τηλεφώνου:",
      "see_your_result": "Δείτε το αποτέλεσμά σας",
      "please_now_enter": "Εισαγάγετε τώρα τον κωδικό PIN που λάβατε στο τηλέφωνό σας.",
      "pin": "PIN",
      "confirm_»": "Επιβεβαίωση »",
      "95%": "95%",
      "83%": "83%",
      "75%": "75%",
      "you_are_a": "Είστε ένα υπέροχο ζευγάρι! Ή τουλάχιστον αυτό νιώθετε ότι είστε. Η χημεία μεταξύ σας είναι πολύ καλή, αλλά υπάρχουν κάποια προβλήματα που πρέπει να λύσετε στην περιπέτεια που περνάτε μαζί, αλλά δεν είστε σίγουροι τι θέλετε κατά καιρούς. Ωστόσο, δεν είστε διατεθειμένοι να θυσιάσετε τη σχέση σας. Μην ξεχνάτε ότι ο σεβασμός των προσωπικών προτιμήσεων και της καλής επικοινωνίας μεταξύ των δύο σας είναι το κλειδί για μια υγιή, σταθερή και επιτυχημένη σχέση. Μια πολύ θετική πτυχή είναι ότι ποτέ δεν θα βαρεθείτε ο ένας τον άλλον και ότι μπορείτε πάντα να υπολογίζετε ο ένας στον άλλο σε ευαίσθητες καταστάσεις.",
      "there_is_a": "Υπάρχει πολύς σεβασμός μεταξύ των δυο σας. Εάν προσθέσετε λίγο περισσότερο ενθουσιασμό, η φλόγα του πάθους θα ξυπνήσει περισσότερο, και είναι πολύ πιθανό ότι θα ζήσετε μια ε��τυχισμένη ζωή μαζί. Προσπαθήστε πάντα να διατηρείτε αυτή τη φλόγα και τον σεβασμό που επιτυγχάνεται από την αμοιβαία αγάπη που αισθάνεστε ο ένας για τον άλλον, παρόλο που υπάρχουν προβλήματα - θα επιλυθούν και δεν θα επηρεάσουν ποτέ τη σχέση σας μακροπρόθεσμα.",
      "never_formalize_a": "Ποτέ μην επισημοποιήσετε μια σχέση μόνο και μόνο επειδή νομίζετε ότι πρέπει να το κάνετε. Όλοι: οι φίλοι σας, η οικογένειά σας ακόμη και οι άνθρωποι που δεν είναι τόσο κοντά σας, νομίζουν ότι είστε το τέλειο ζευγάρι. Η αγάπη στη σχέση σας μπορεί να αυξηθεί και να ενισχυθεί. Δεν χρειάζεται να προχωρήσετε πολύ γρήγορα, δώστε χρόνο και απολαύστε εμπειρίες. Ήρθε η ώρα να χαλαρώσετε και να μάθετε εάν η σχέση σας είναι σταθερή ή κάτι φευγαλέο.",
      "enter_a_valid": "Εισαγάγετε έναν έγκυρο αριθμό τηλεφώνου.",
      "accept_the_terms": "Αποδεχτείτε τους όρους και τις προϋποθέσεις.",
      "accept_the": "Απο��εχτείτε τους",
      "terms_and_conditions": "Όρους και Προϋποθέσεις",
      "this_code_is": "αυτός ο κωδικός είναι το προσωπικό σας ID",
      "please_enter_correct": "Εισαγάγετε το σωστό PIN",
      "checking_the_subscription...": "Έλεγχος της συνδρομής ...",
      "if_": "αν   δεν είναι ο αριθμός τηλεφώνου σας",
      "click_here...": "Κάντε κλικ ΕΔΩ..."
  }
}

addLocaleData(enLocaleData);
addLocaleData(elLocaleData);


const tracker = mkTracker((typeof window != "undefined") ? window : null, 'xx', 'Unknown')

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
    <div className={"text text2 center font2"}><FormattedMessage id="what_is_your" defaultMessage="What is your gender?"/></div>

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
        <div className={"text center font11"}><b>Classic Zodiac</b></div>
    
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
    
        <div className={"text text2 center font11"}><b>Chinese Horoscope</b></div>
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
    
        <div className={"text text3 center font11"}><b>Name</b></div>
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
          <div className={"txt"}>Calculating...</div>
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
              Your compatibility is about to be revealed. Insert your mobile
              phone number to receive your access code.
            </div>

            <div className={"input-left font5"}>
              <b>Mobile number:</b>
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
            <div>Subscribe</div>
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

          <div className={"text center font6"}>Please, insert the pin sent to you phone.</div>

          <div className={"input-center center font5"}>
            <b>PIN</b>
            <div className={"star rotate-it"}></div>
            <div className={"input"} id="pin">
              <div className={"input-in center"}><input type="tel" maxLength={5} value={this.state.pin} onChange={ev => this.setState({pin: ev.target.value})} /></div>
            </div>
          </div>

        </div>

        {
          RDS.WhenFailure(null, (err: PINEntryFailure) => <div className={"error_msg center font7"} id="pin_msg">{
              err.errorType == "InvalidPIN" ? "Invalid PIN, try agian."
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

const Step4 = () => (
  <div className={"step success center"} id="step4">
    <div className={"logo center"}></div>
    <div className={"img-legal img-legal1"}></div>
    <div className={"img-legal img-legal2"}></div>
    <div className={"img-legal img-legal3"}></div>
    <div className={"img-legal img-legal4"}></div>

    <div className={"text center font8"}>
      <div className={"star star-left"}></div>
      <div className={"star star-right"}></div>
      <span className={"result1"}><b>95%</b></span>
      <span className={"result2"}><b>83%</b></span>
      <span className={"result3"}><b>75%</b></span>
    </div>

    <div className={"text-result center font6"}>
      <span className={"text-result1"}>Did you expect a casual sex relationship? Your chemistry is surprising and very
        rare. However there is only a physical attraction between you, without emotional connection. You can end up
        as great friends once your carnal relationship ends. Both of you are too focused on yourself to make your
        relationship work. Enjoy it while it lasts!</span>
      <span className={"text-result2"}></span>
      <span className={"text-result3"}></span>
    </div>
    <div className={"legal-suc center font9 legal-success-default"}></div>

  </div>
)


class Root extends React.PureComponent<HOCProps>  {
  state = {
    step: 0,
    msisdn: "",
    locale: "el"
  }
  render() {
    const step = this.state.step
    const currentState = this.props.currentState
    return <IntlProvider
        locale={this.state.locale}
        messages={translations[this.state.locale]}
    ><div>
      <div id="legals">
        <div className={"header fontHeader"}></div>
      </div>
      <div className={"footer fontFooter modal-legal-content"}>
        <div className={"footer fontFooter"}></div>
      </div>
      <div className={"main center"}>
        <div className={"box center"}>
          <TransitionGroup>
            
            {
                step === 0 ? <ExampleTransition key="step-0"><Step0 onEnd={() => this.setState({step: 1})} /></ExampleTransition>
              : step === 1 ? <ExampleTransition key="step-1"><Step1 onEnd={() => this.setState({step: 2})} /></ExampleTransition>
              : step === 2 ? <ExampleTransition key="step-2"><Step2 onEnd={() => this.setState({step: 3})} timeout={3000} /></ExampleTransition>
              : step === 3 ? 
                  currentState.type == 'MSISDNEntry'
                    ? <ExampleTransition key="step-3-msisdn"><MSISDNEntryStep msisdn={this.state.msisdn} rds={currentState.result} onEnd={
                      msisdn => {
                        this.setState({msisdn})
                        this.props.actions.submitMSISDN(window, {host: 'm.mobiworld.biz', country: 'gr', handle: 'mobilearts', offer: 853}, msisdn)
                      }
                    } /></ExampleTransition>
                    : <ExampleTransition key="step-3-pin"><PINEntryStep onEnd={ pin => this.props.actions.submitPIN(pin) } backToStart={() => this.props.actions.backToStart()} msisdn={this.state.msisdn} rds={currentState.result} /></ExampleTransition>
              : step === 4 ? <ExampleTransition key="step-4"><Step4 /></ExampleTransition>
              : null
            }
          
          </TransitionGroup>
        </div>
      </div>
    </div>
    </IntlProvider>
  }
}

export default (props: any) => {
  const H = HOC(tracker, Root)(initialState);
  return <H {...props} />;
};
