import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState } from "../../clients/one-click/HOC";

import "./assets/css/styles.less?raw";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "candy-monster"
);

const operatorImg = require("./assets/img/iraqcom.png");

// Google Optimize Starts
const abTest_variant = (() => { 
  const variant = Math.round(Math.random()); 

  return () => variant
})()

function gtag(...args) {window.dataLayer.push(...args)}

if (typeof window != "undefined") {
  window.addEventListener('load', () => setTimeout(() => {
    const ga = window['ga']
    
    // update body class to have the ab test variant 
    document.body.classList.add(`ab-${abTest_variant()}`)

    if (!!ga) {


      const setGAExperimentCX = (_expId, _vId) => {
        const gtm = ga.getAll()[0].get('name')
        ga(`${gtm}.set`, 'exp', _expId.toString() + '.' + _vId.toString());
        ga(`${gtm}.send`, 'event', 'Experiment', 'Trigger', _expId.toString() + '.' + _vId.toString());

      }

      setGAExperimentCX('x-5qgNM5S7mgjClus71IIQ', abTest_variant());

    }

  }, 90))

}

// Google Optimize End

class Root extends React.PureComponent<IProps> {

  componentDidMount(){

 	
    var monster = document.getElementById("monster");

    
 function monsterAnimate(){
    
    if(monster.classList == "sleepy play"){
      
      monster.classList="";
      
      monster.classList="point play";
      
     monster.style.top="150px";
     monster.style.left="-100px";
     monster.style.transform="scale(1.3)";
      
    }else{
      
     monster.classList="";
     
     monster.classList="sleepy play";
     
     monster.style.top="150px";
     monster.style.left="0px";
     monster.style.transform="scale(1)";
      
    }
    
    
  }
         

 var id = setInterval(monsterAnimate, 4000);
    
  var backgroundParallax = document.getElementById('parallax');

   if (window.DeviceOrientationEvent) {
     window.addEventListener('deviceorientation', function(eventData) {
           var LR = eventData.gamma;
           var FB = eventData.beta;
           var DIR = eventData.alpha;
           deviceOrientationHandler(LR, FB, DIR);
       }, false);
   }

   function deviceOrientationHandler(LR, FB, DIR) {

       if(window.innerHeight < window.innerWidth){
       
           // landscape

           var landscapePosition = "translate3d("+(FB/4)+"px, "+(LR/4)+"px, 0)";

           backgroundParallax.style.webkitTransform = landscapePosition;
           backgroundParallax.style.MozTransform = landscapePosition;
           backgroundParallax.style.msTransform = landscapePosition;
           backgroundParallax.style.OTransform = landscapePosition;
           backgroundParallax.style.transform = landscapePosition;
           
       } else {
       
           // portrait

           var portraitPosition = "translate3d("+(LR/4)+"px, "+(FB/4)+"px, 0)";

           backgroundParallax.style.webkitTransform = portraitPosition;
           backgroundParallax.style.MozTransform = portraitPosition;
           backgroundParallax.style.msTransform = portraitPosition;
           backgroundParallax.style.OTransform = portraitPosition;
           backgroundParallax.style.transform = portraitPosition;
           
       }

   }

  }

  state = {
    locale: "en"
  };
  render() {
    return (

      <TranslationProvider locale={this.state.locale}>

        <div className="container">
        <div className="overlay"></div>
          {/* <div className="rating"></div> */}
         

          <div className="creative">
          <div className="persuasive animated bounceInDown"> خالي من الاعلانات</div>
            <div className="title animated bounceInDown"></div>

            <div id="monster"  className="sleepy play"></div>

            <div className="holder animated bounceInUp">

              <button onClick={() => this.props.actions.onClick()} className="btn">إشترك</button>

            </div>

          </div>

          <div className="footer animated bounceInUp">

            <img alt="" src={operatorImg} className="operator" />

            مرحباً بك في خدمة غيمس بارك. تقدم هذه الخدمة مكتبة متنوعة من المحتويات المتميزة من الألعاب والتطبيقات. مستخدمي آسياسيل: عند اشتراكك بالخدمة ستحصل على فترة مجانية لمدة ثلاث ايام. عند انتهاء الفترة المجانية
<br />
            <br />

            سوف تستلم 7 محتويات أسبوعيا بسعر 300 دينارعراقي لكل محتوى وللإلغاء الأشتراك، ارسل 0 الى 2884.
            <br />
            <br />
            <a href="http://iq.gamezpark.com/ar/privacy/?uid=fdf098fcc6&amp;uip=5.1.104.0"><span >&#8203;الشروط والأحكام&nbsp;-&nbsp;سياسية الخصوصيّة</span></a>

          </div>

          <div id="parallax"></div>

        </div>
      </TranslationProvider>

    );
  }
}
export default HOC(tracker, null, Root)(initialState);