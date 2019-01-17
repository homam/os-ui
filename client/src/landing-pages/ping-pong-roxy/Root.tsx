import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, injectIntl } from "./localization/index";
import HOC, {
  initialState,
  mockedMSISDNEntrySuccess,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  match,
  MOLink,
} from "../../clients/lp-api-mo/HOC";
import "./assets/css/styles.less?raw"
import SplashScreen from "./components/SplashScreen";
import Chat from "./components/Chat";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "ping-pong-roxy" 
);

const SplashScreenDuration = 1500;

type ApplicationStates = "Splash" | "Chat" ;


class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
    applicationState: "Splash" as ApplicationStates
  };
  

componentDidMount(){

  setTimeout(() => {
    
    this.setState({applicationState : "Chat"});

  }, SplashScreenDuration + 600);

}

  render() {
    return (
      <div className={`container display-${this.state.applicationState}`}>
        <TranslationProvider locale={this.state.locale}>
          <div>
            {/*----------Splash Area----------*/}

            <SplashScreen duration={SplashScreenDuration} active={this.state.applicationState == "Splash" || this.state.applicationState == "Chat"}/>

            {/*----------Chat Area----------*/}

            <Chat currentState={this.props.currentState} actions={this.props.actions} />

          </div>

        </TranslationProvider>
      </div>
      
    );
  }
}
export default HOC(tracker, Root)(initialState);