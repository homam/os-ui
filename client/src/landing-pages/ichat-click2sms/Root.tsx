import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, injectIntl } from "./localization/index";
import HOC, {initialState, HOCProps, IKeywordShortcode} from "../../clients/bupper-click2sms/HOC"
import * as RDS from "../../common-types/RemoteDataState";

import "./assets/css/styles.less?raw"
import SelectionScreen from "./components/SelectionScreen";
import SplashScreen from "./components/SplashScreen";
import ChatScreen from "./components/ChatScreen";
import DisclaimerNL from "./components/DisclaimerNL";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  process.env.page
);

type IMode = "keyword" | "keywordAndShortCode"
const mode: IMode = "keywordAndShortCode"

type ApplicationStates = "Selection" | "Splash" | "Chat" ;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "hu",
    keyValue:"",
    preloader:false,
    startchat:false,
    applicationState: "Selection" as ApplicationStates
  };

  componentDidMount(){
  
    var splashArea = document.getElementById("splash"),
        chatArea = document.getElementById("chat"),
        wHeight = window.innerHeight-70 + "px",
        wWidth = window.innerWidth;
  
  
        if (wWidth < 1280){
          splashArea.style.height = wHeight ;
          chatArea.style.height = wHeight;
        }
  
  }
  

  render() {

    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
        <div className={`container display-${this.state.applicationState}`}>

              <SelectionScreen 
              onSelected={({keyData})=> {
                this.setState({
                  applicationState:'Splash', 
                  keyValue: keyData, 
                  preloader:true
                })
                if(mode == "keyword") {
                  this.props.actions.onSetKeyword(keyData)
                } else if(mode == "keywordAndShortCode") {
                  this.props.actions.onSetKeywordAndShortcode(keyData, "8010")
                }
              }}
              />

              <SplashScreen
              onChange={()=>{
                  this.setState({
                    applicationState: "Chat", 
                    startchat:true
                  })
                }} 
              activate={this.state.preloader}
              />

              <ChatScreen
              keyword={this.state.keyValue}
              MOLink={this.props.MOLink} 
              startchat={this.state.startchat}
              currentState={this.props.currentState} 
              tracker={tracker}
              />

              <DisclaimerNL/>

          </div>
        </TranslationProvider>
      </div>
    );
  }
}

export default HOC(tracker, Root, { tag: mode })(initialState);