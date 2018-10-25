import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState} from "../../clients/one-click/HOC";

import "./assets/css/styles.css?raw";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "racing-monster"
);

const operatorImg = require("./assets/img/iraqcom.png");

class Root extends React.PureComponent<IProps> {

  componentDidMount(){

    document.getElementById("container").classList.remove("preload");
	
	
    setTimeout(function(){
    
      document.getElementById("monster").classList.add("slideInRight");
      
      
      setTimeout(function(){
  
        document.getElementById("msg").classList.add("fadeIn");
        document.querySelector(".btn").classList.add("pulse");	
      
      }, 500)
    
    }, 1000)

  }

  state = {
    locale: "ar"
  };
  render() {
    return (

      <TranslationProvider locale={this.state.locale}>
        <div id="container" className="ar">
          <ul id="creative">

            <li className="ribbon"></li>

            <li id="monster">
              <div id="msg"></div>
            </li>

            <li className="title"></li>

            <li className="truck">
              <ul>
                <li className="rare"></li>
                <li className="front"></li>
                <li className="body"></li>
                <li className="smoke"></li>
                <li className="dirt"></li>
              </ul>
            </li>

            <li className="road"></li>
            <li className="mountain"></li>

          </ul>

          <div id="holder">

            <button onClick={() => this.props.actions.onClick()} className="btn">إشتراك</button>

          </div>

          <div id="footer">


          <img alt="" src={operatorImg} className="operator"/>

          مرحباً بك في خدمة غيمس بارك. تقدم هذه الخدمة مكتبة متنوعة من المحتويات المتميزة من الألعاب والتطبيقات. مستخدمي آسياسيل: عند اشتراكك بالخدمة ستحصل على فترة مجانية لمدة ثلاث ايام. عند انتهاء الفترة المجانية 
          <br />
          <br />

          سوف تستلم 7 محتويات أسبوعيا بسعر 300 دينارعراقي لكل محتوى وللإلغاء الأشتراك، ارسل 0 الى 2884.

          <a href="http://iq.gamezpark.com/ar/privacy/?uid=fdf098fcc6&amp;uip=5.1.104.0"><span >&#8203;الشروط والأحكام&nbsp;-&nbsp;سياسية الخصوصيّة</span></a>
	</div>

        </div>
      </TranslationProvider>

    );
  }
}
export default HOC(tracker, null, Root)(initialState);