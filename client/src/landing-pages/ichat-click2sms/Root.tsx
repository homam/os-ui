import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {initialState, HOCProps, IKeywordShortcode} from "../../clients/bupper-click2sms/HOC"
import * as RDS from "../../common-types/RemoteDataState";

import "./assets/css/styles.less?raw"
import { hydrate } from "react-dom";
import SelectionScreen from "./components/SelectionScreen";
import SplashScreen from "./components/SplashScreen";
import ChatScreen from "./components/ChatScreen";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  process.env.page
);

type ApplicationStates = "Selection" | "Splash" | "Chat" ;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    keyValue:"",
    applicationState: "Selection" as ApplicationStates
  };

  render() {

    var _self = this;

    function changeState() {

       _self.setState({applicationState: "Chat"});

    }

    const MOLink = this.props.MOLink
    const {keyword, shortcode} = RDS.WhenSuccess<IKeywordShortcode, IKeywordShortcode>(
      {keyword: "", shortcode: ""}, // when keyword and shortcode are not yet loaded, they are empty strings.
      kw => kw
    )(this.props.currentState)


    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
        <div className={`container display-${this.state.applicationState}`}>

              <SelectionScreen onSelected={({keyData})=> {this.setState({applicationState:'Splash', keyValue: keyData})}}/>

              <SplashScreen onChange={()=>{this.state.applicationState == "Splash" ? changeState() : null}}/>

              <ChatScreen/>

              {console.log(this.state.keyValue)}

             {/*<div>keyword:{this.state.keyValue}</div>*/}
             <MOLink className="cta-a-tag">SMS Now!</MOLink>

          </div>
        </TranslationProvider>
      </div>
    );
  }
}

//export default HOC(tracker, Root)(initialState);

// In the Netherlands use this instead of the above line:
export default HOC(tracker, Root, {tag: "keywordAndShortCode", shortcode: "8010", keyword: "Geld"})(initialState);