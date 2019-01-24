import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState} from "../../clients/one-click/HOC"

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

class Root extends React.PureComponent<IProps> {
  state = {
    locale: "en"
  };
  render() {
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div>
            <button onClick={() => this.props.actions.onClick()}>Click here!</button>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);