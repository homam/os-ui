import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState} from "../../clients/one-click/HOC"

import "./assets/css/styles.less?raw";
import { string } from "prop-types";
import SpinningWheel from "./components/spinningWheel";

const tracker = mkTracker(
	typeof window != "undefined" ? window : null,
	"gb",
	"Unknown" //TODO: replace Unknown with your page's name
);



class Root extends React.PureComponent<IProps> {
	state = {
		locale: "en"
	};

	render() {

		return (
			<div id="wrapper">
			<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" />
				{/*
				<TranslationProvider locale={this.state.locale}>
					<div>
						<button onClick={
							() => this.setState({locale: this.state.locale == 'en' ? 'el' : 'en'})
						}>Change Language</button>
						<h1><Translate id="hello_world" /> </h1>
						<button onClick={() => this.props.actions.onClick()}>yoga button test!</button>
					</div>
				</TranslationProvider>
				*/}

				<SpinningWheel/>

			</div>
		);
	}
}
export default HOC(tracker, null, Root)(initialState);