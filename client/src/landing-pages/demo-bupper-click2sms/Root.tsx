import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {initialState, HOCProps} from "../../clients/bupper-click2sms/HOC"

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "demo-bupper-click2sms"
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en"
  };
  render() {
    const MOLink = this.props.MOLink
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div>
            <MOLink>SMS Now!</MOLink>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}

// export default HOC(tracker, Root)(initialState);

// In Netherlands use this instead of the above line:
export default HOC(tracker, Root, {tag: "keywordAndShortCode", shortcode: "8010", keyword: "Geld"})(initialState);