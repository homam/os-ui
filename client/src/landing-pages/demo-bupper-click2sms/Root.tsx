import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {initialState, HOCProps, IKeywordShortcode} from "../../clients/bupper-click2sms/HOC"
import * as RDS from "../../common-types/RemoteDataState";

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
    const {keyword, shortcode} = RDS.WhenSuccess<IKeywordShortcode, IKeywordShortcode>(
      {keyword: "", shortcode: ""},
      kw => kw
    )(this.props.currentState)
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div>
            {/* This example shows how you can override the default keyword by specifying another keyword */}
            {/* Use any className that you want of course. */}
            <MOLink className="cta-a-tag" keyword="Geluk">SMS Now!</MOLink>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}

// export default HOC(tracker, Root)(initialState);

// In the Netherlands use this instead of the above line:
export default HOC(tracker, Root, {tag: "keywordAndShortCode", shortcode: "8010", keyword: "Geld"})(initialState);