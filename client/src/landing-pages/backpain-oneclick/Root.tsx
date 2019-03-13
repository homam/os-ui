import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState, Link } from "../../clients/one-click/HOC";
import "./assets/css/styles.less?raw";
import CustomToplegal from "./components/CustomToplegal";


const photo1 = require("./assets/imgs/photo.png");
const photo2 = require("./assets/imgs/photo2.png");
const photo3 = require("./assets/imgs/photo3.png");

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "backpain-oneclick" //TODO: replace Unknown with your page's name
);

const ButtonArea = ({ clicked, subscribeNowClicked, confirmClicked }) => {
  if (clicked) {
    return <div>

      <Link className="ConfirmBtn" tracker={tracker}>Confirm</Link>
    </div>
  } else {
    return <div><button className="SubscribeBtn" onClick={subscribeNowClicked}>Subscribe Now!</button></div>

  }

}

class Root extends React.PureComponent<IProps> {
  state = {
    locale: "en",
    appState: "splash",
    appQuestion: "question1",
    loader:"",
    clicked: false
  };

  componentDidMount(){

      setTimeout(()=>{

        this.setState({ appState: "questions" });

      },1500)
 

  }

  newRedirect(){

    this.setState({ appState: "redirection", loader:"active" }) 

    setTimeout(()=>{

      this.setState({ appState: "yoga" }) 

    },1500)
    
  }

  render() {
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div className={`container display_${this.state.appState}`}>

            <div className="scene splash">
              <h1 className="title splash">Specialised Yoga Instructions<br></br><span>To Help Improve Your Body and Health</span></h1>
              
              <div className="loader">
                <div className="spinner"></div>
                <div className="out-circle">
                  <div className="in-circle">
                    <span className="inside"></span>
                  </div>
                </div>

              </div>

              <div className="customtesti">
                <div className="testi">
                  <ul>
                    <li>143 reviews</li>
                  </ul>
                  <div className="avatar"></div>
                  <p className="message"><span className="date">4 March</span>
                    <span className="name">Elizabeth Stone</span>Yoga has helped with my posture and helped alleviate the pain I had in my back! I always recommend it
                  to my friends and family.</p>
                </div>
              </div>

              <h1 className="price">ONLY £4.50 per week.</h1>
            </div>

            <div className={`scene questions display_${this.state.appQuestion}`}>
              

              <div className="set question1">

              <div className="header">
                 <h1 className="logo"><span>Home</span> Yoga</h1>
                 <div className="line"></div>
              </div>

              <h1 className="number1">01</h1>
              <h1 className="title1">Does your lower back hurt after sitting for too long?</h1>
              <img className="photo1" src={photo1} alt="photo 1" />

              <button className="btn1" onClick={() => {tracker.advancedInPreFlow("question1_btn_yes"), this.setState({ appQuestion: "question2" })}}>Yes</button>
              <button className="btn2" onClick={() => {tracker.advancedInPreFlow("question1_btn_no"), this.setState({ appQuestion: "question2" })}}>No</button>

              <div className="testimonial">
                <div className="line2"></div>       
                <p className="info1">Answer question and learn about yoga poses that can help address both the symptoms and root causes of back pain Special yoga videos only £4.50 per week.</p>
              </div>

            
              </div>

              <div className="set question2">
              <div className="header">
                 <h1 className="logo"><span>Home</span> Yoga</h1>
                 <h2 className="price2">Only £4.50 per week</h2>
                 <div className="line"></div>
              </div>

              <h1 className="number2">02</h1>
              <h1 className="title2">Do you find it hard to bend down at times?</h1>
              <img className="photo2" src={photo2} alt="photo 2" />

              <button className="btn3" onClick={() => {tracker.advancedInPreFlow("question2_btn_yes"),this.setState({ appQuestion: "question3" })}}>Yes</button>
              <button className="btn4" onClick={() => {tracker.advancedInPreFlow("question2_btn_no"),this.setState({ appQuestion: "question3" })}}>No</button>

              <div className="testimonial">
              <div className="line2"></div>  
                <p className="info2">You can really get a great workout without leaving the house. That simple act of self-care has the potential to change your life.</p>         
              </div>


              </div>

              <div className="set question3">

              <div className="header">
                 <h1 className="logo"><span>Home</span> Yoga</h1>
                 <div className="line"></div>
              </div>

              <h1 className="number3">03</h1>
              <h1 className="title3">Does you back feel tight after waking up?</h1>
              <img className="photo3" src={photo3} alt="photo 3" />

              <button className="btn5" onClick={() => {tracker.advancedInPreFlow("question3_btn_yes"),this.newRedirect()}}>Yes</button>
              <button className="btn6" onClick={() => {tracker.advancedInPreFlow("question3_btn_no"),this.newRedirect()}}>No</button>

              <div className="testimonial">
              <div className="line2"></div>       
                <p className="info3">You don’t need to head to the studio to find your flow. Learn everything you need to start an at-home yoga practice for only £4.50 per week.</p>
              </div>

              </div>

            </div>
            
            <div className="scene redirection">

                <div className="popup">
                <div className="logo"></div>
                <h1 className="brand">HOME YOGA VIDEOS</h1>
                <p className="yogatext">We Have Specialised Yoga Programs for You!</p>
                <h1 className="text2">Yoga videos from certified instructors in the comfort of your home! Only £4.50 per week.</h1>
                  <div className="progressbar">
                    <span className={`loading ${this.state.loader}`}></span>
                    <div className="load">LOADING...</div>  
                  </div>
                </div>          
            </div>

            <div className="scene yoga">
              <CustomToplegal />
              <div className="toptext">UNLIMITED ACCESS TO YOGA VIDEOS</div>
              <div className="yogacreative">
              <h1 className="yogatitle">HEALING YOGA</h1>
              <p className="yogatext">Relieve Back Pains, Fix Posture, Increased Core Strength and Makes You Happy</p> 
              <div className="pricetag"><span>FREE for 24 HRS,<br></br>THEN £4.50 Per Week</span></div>
              
              </div>
             
              <div className="wrap">

              <ButtonArea clicked={this.state.clicked}
              subscribeNowClicked={() => {
                this.setState({ clicked: true });
                tracker.advancedInPreFlow('Click 1')
              } }
              confirmClicked={() => this.props.actions.onClick()}

             />
              
              <p className="wraptext">This will be charged to your mobile phone bill</p>
              <div className="customtesti">
                <div className="testi">
                  <div className="avatar"></div>
                  <p className="message"><span className="date">4 March</span>
                    <span className="name">Elizabeth Stone</span>Yoga has helped with my posture and helped alleviate the pain I had in my back! I always recommend it
                  to my friends and family.</p>
                </div>
              </div>
              </div>

              <div className="disclaimer">
              <p>Subscribe and transform your body, mind and life today for just £4.50 a week! Service provided by Mobio TV</p>
                <div className="links">
                <a href="http://n.mobiotv.com/uk/tnc-mobiotv?offer=1&_next=index.html" className="align-left">Terms &amp; Conditions</a>
                <a href="http://n.mobiotv.com/uk/tnc-mobiotv?offer=1&_next=privacy_policy.html" className="align-right">Privacy Policy</a>
                </div>
              </div>
              <div className="logoarea">
              <div className="mobiotv"></div>
              </div>

            </div>


          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);