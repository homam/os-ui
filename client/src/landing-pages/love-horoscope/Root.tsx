import * as React from 'react'
import './assets/css/styles.less'
import mkTracker from '../../pacman/record'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HOC, {initialState, HOCProps, MSISDNEntryFailure, MSISDNEntrySuccess, PINEntryFailure, PINEntrySuccess} from '../../clients/lp-api/HOC'
import * as RDS from "../../common-types/RemoteDataState";

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

const Step0 = ({onEnd}) => (
  <div id="step0" className={"step center"} ref="step0">
    <div className={"logo center"}></div>
    <div className={"text center font1"}><b>Put your names to the test and see if you're meant to be! </b></div>
    <div className={"text text2 center font2"}>What is your gender?</div>

    <div className={"genres center"}>
      <div className={"input-left font5"}>
        <b>Sex:</b>
        <div className={"input"} id="genre1">
          <div className={"input-in dropdown center"}>
            <select className={"operator"}>
              <option value="man">Male</option>
              <option value="woman">Female</option>
            </select>
          </div>
        </div>
      </div>

      <div className={"plus center font3"}>+</div>

      <div className={"input-right font5"}>
        <b>Sex:</b>
        <div className={"input"} id="genre2">
          <div className={"input-in dropdown center"}>
            <select className={"operator"}>
              <option value="woman">Female</option>
              <option value="man">Male</option>
            </select>
          </div>
        </div>
      </div>

    </div>

    <div className={"bt font4 btstep1"} onClick={onEnd}>
      <div>Start now »</div>
    </div>

  </div>)

const Step1 = ({onEnd}) => (<div className={"step center"} id="step1">
  <div className={"logo center"}></div>
  <div className={"text center font1"}>Fill in the requested data</div>

  <div className={"names center"}>
    <div className={"input-left font5"}>
      <b>Name:</b>
      <div className={"star rotate-it"}></div>
      <div className={"input"} id="name1">
        <div className={"input-in center"}><input type="text" /></div>
      </div>
    </div>

    <div className={"plus center font3"}>+</div>

    <div className={"input-right font5"}>
      <b>Name:</b>
      <div className={"star rotate-it"}></div>
      <div className={"input"} id="name2">
        <div className={"input-in center"}><input type="text" /></div>
      </div>
    </div>
  </div>

  <div className={"birthdates center"}>
    <div className={"input-left font12"}>
      <b>Date of birth:</b>
      <div className={"star rotate-it"}></div>
      <div className={"input"} id="birthdate1_d">
        <div className={"input-in dropdown center"}>
          <select className={"operator"}>
            <option value="">Day</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
        </div>
      </div>
      <div className={"input center"} id="birthdate1_m">
        <div className={"input-in dropdown center"}>
          <select className={"operator"}>
            <option value="">Month</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <div className={"input"} id="birthdate1_y">
        <div className={"input-in dropdown center"}>
          <select className={"operator"}>
            <option value="">Year</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            <option value="1979">1979</option>
            <option value="1978">1978</option>
            <option value="1977">1977</option>
            <option value="1976">1976</option>
            <option value="1975">1975</option>
            <option value="1974">1974</option>
            <option value="1973">1973</option>
            <option value="1972">1972</option>
            <option value="1971">1971</option>
            <option value="1970">1970</option>
            <option value="1969">1969</option>
            <option value="1968">1968</option>
            <option value="1967">1967</option>
            <option value="1966">1966</option>
            <option value="1965">1965</option>
            <option value="1964">1964</option>
            <option value="1963">1963</option>
            <option value="1962">1962</option>
            <option value="1961">1961</option>
            <option value="1960">1960</option>
            <option value="1959">1959</option>
            <option value="1958">1958</option>
            <option value="1957">1957</option>
            <option value="1956">1956</option>
            <option value="1955">1955</option>
            <option value="1954">1954</option>
            <option value="1953">1953</option>
            <option value="1952">1952</option>
            <option value="1951">1951</option>
            <option value="1950">1950</option>
            <option value="1949">1949</option>
            <option value="1948">1948</option>
            <option value="1947">1947</option>
            <option value="1946">1946</option>
            <option value="1945">1945</option>
            <option value="1944">1944</option>
            <option value="1943">1943</option>
            <option value="1942">1942</option>
            <option value="1941">1941</option>
            <option value="1940">1940</option>
            <option value="1939">1939</option>
            <option value="1938">1938</option>
            <option value="1937">1937</option>
            <option value="1936">1936</option>
            <option value="1935">1935</option>
            <option value="1934">1934</option>
            <option value="1933">1933</option>
            <option value="1932">1932</option>
            <option value="1931">1931</option>
            <option value="1930">1930</option>
            <option value="1929">1929</option>
            <option value="1928">1928</option>
            <option value="1927">1927</option>
            <option value="1926">1926</option>
            <option value="1925">1925</option>
            <option value="1924">1924</option>
            <option value="1923">1923</option>
            <option value="1922">1922</option>
            <option value="1921">1921</option>
            <option value="1920">1920</option>
            <option value="1919">1919</option>
            <option value="1918">1918</option>
          </select>
        </div>
      </div>
      <div className={"doll doll1 center anim-jump"}></div>
    </div>

    <div className={"input-right font12"}>
      <b>Date of birth:</b>
      <div className={"star rotate-it"}></div>
      <div className={"input"} id="birthdate2_d">
        <div className={"input-in dropdown center"}>
          <select className={"operator"}>
            <option value="">Day</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
        </div>
      </div>
      <div className={"input center"} id="birthdate2_m">
        <div className={"input-in dropdown center"}>
          <select className={"operator"}>
            <option value="">Month</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <div className={"input"} id="birthdate2_y">
        <div className={"input-in dropdown center"}>
          <select className={"operator"}>
            <option value="">Year</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            <option value="1979">1979</option>
            <option value="1978">1978</option>
            <option value="1977">1977</option>
            <option value="1976">1976</option>
            <option value="1975">1975</option>
            <option value="1974">1974</option>
            <option value="1973">1973</option>
            <option value="1972">1972</option>
            <option value="1971">1971</option>
            <option value="1970">1970</option>
            <option value="1969">1969</option>
            <option value="1968">1968</option>
            <option value="1967">1967</option>
            <option value="1966">1966</option>
            <option value="1965">1965</option>
            <option value="1964">1964</option>
            <option value="1963">1963</option>
            <option value="1962">1962</option>
            <option value="1961">1961</option>
            <option value="1960">1960</option>
            <option value="1959">1959</option>
            <option value="1958">1958</option>
            <option value="1957">1957</option>
            <option value="1956">1956</option>
            <option value="1955">1955</option>
            <option value="1954">1954</option>
            <option value="1953">1953</option>
            <option value="1952">1952</option>
            <option value="1951">1951</option>
            <option value="1950">1950</option>
            <option value="1949">1949</option>
            <option value="1948">1948</option>
            <option value="1947">1947</option>
            <option value="1946">1946</option>
            <option value="1945">1945</option>
            <option value="1944">1944</option>
            <option value="1943">1943</option>
            <option value="1942">1942</option>
            <option value="1941">1941</option>
            <option value="1940">1940</option>
            <option value="1939">1939</option>
            <option value="1938">1938</option>
            <option value="1937">1937</option>
            <option value="1936">1936</option>
            <option value="1935">1935</option>
            <option value="1934">1934</option>
            <option value="1933">1933</option>
            <option value="1932">1932</option>
            <option value="1931">1931</option>
            <option value="1930">1930</option>
            <option value="1929">1929</option>
            <option value="1928">1928</option>
            <option value="1927">1927</option>
            <option value="1926">1926</option>
            <option value="1925">1925</option>
            <option value="1924">1924</option>
            <option value="1923">1923</option>
            <option value="1922">1922</option>
            <option value="1921">1921</option>
            <option value="1920">1920</option>
            <option value="1919">1919</option>
            <option value="1918">1918</option>
          </select>
        </div>
      </div>
      <div className={"doll doll2 center anim-jump2"}></div>
    </div>

  </div>

  <div className={"bt font4 btstep2"} onClick={onEnd}>
    <div>See Zodiac Compatibility!</div>
  </div>
</div>
)

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

class PINEntryStep extends React.PureComponent<{msisdn: string, rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>, backToStart: () => void}> {
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
              <div className={"input-in center"}><input type="tel" maxLength={8} /></div>
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
        <div className={"bt font4 btpin"}>
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
    step: 3,
    msisdn: ""
  }
  render() {
    const step = this.state.step
    const currentState = this.props.currentState
    return <div>
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
                    : <ExampleTransition key="step-3-pin"><PINEntryStep backToStart={() => this.props.actions.backToStart()} msisdn={this.state.msisdn} rds={currentState.result} /></ExampleTransition>
              : step === 4 ? <ExampleTransition key="step-4"><Step4 /></ExampleTransition>
              : null
            }
          
          </TransitionGroup>
        </div>
      </div>
    </div>
  }
}

export default (props: any) => {
  const H = HOC(tracker, Root)(initialState);
  return <H {...props} />;
};
