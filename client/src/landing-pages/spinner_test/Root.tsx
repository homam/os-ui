import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState} from "../../clients/one-click/HOC"

import "./assets/css/styles.less?raw";
import { string } from "prop-types";

const tracker = mkTracker(
	typeof window != "undefined" ? window : null,
	"gb",
	"Unknown" //TODO: replace Unknown with your page's name
);

const wheelitems = [{
	title: 'bell',
	name: 'fa-bell-o'
}, {
	title: 'comment',
	name: 'fa-comment-o'
}, {
	title: 'smile',
	name: 'fa-smile-o'
}, {
	title: 'heart',
	name: 'fa-heart-o'
}, {
	title: 'star',
	name: 'fa-star-o'
}, {
	title: 'lightbulb',
	name: 'fa-lightbulb-o'
}
];

const spinningWheel = wheelitems.map( (item) =>
	<li key={item.title} className="sec"><span className ={"fa " + item.name}></span></li>
);

const degree = 1800;
var clicks = 0;

function spinIt(){
	clicks += 1;
/* generates random rotation amount */
	const newDegree = degree*clicks;
	const extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
	const totalDegree = newDegree + extraDegree;
	console.log("clicks " + clicks + " totalDegree " + totalDegree);
/* tilts the button when edges hit it */
var wheelSlices = document.querySelectorAll('#wheel .sec');
Array.prototype.forEach.call(wheelSlices, function(slice){
	var t = slice;
	var noY = 0;
	var c = 0;
	var n = 700;
	var interval = setInterval(function(){
		c++;
		if (c === n) {
			clearInterval(interval);
		}
		var aoY = t.offsetTop;
		document.getElementById("txt").innerHTML = aoY;
		/* 23.7 is the minumum offset number that
			each section can get, in a 30 angle degree.
			So, if the offset reaches 23.7, then we know
			that it has a 30 degree angle and therefore,
			exactly aligned with the spin btn */
		if(aoY < 23.89){
			console.log('<<<<<<<<<< ' + aoY );
			var spinner = document.getElementById("spin");
			spinner.classList.add("spin");
			setTimeout(function (){
				spinner.classList.remove("spin");
			}, 100);
		}
	}, 10);
	document.getElementById("inner-wheel").style.transform = 'rotate(' + totalDegree + 'deg)';
	noY = t.offsetTop;
});

}

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

				<div id="wheel">
						<ul id="inner-wheel">
							{spinningWheel}
						</ul>
						<div id="spin" onClick={spinIt}>
							<div id="inner-spin"></div>
						</div>
						<div id="shine"></div>
				</div>
				<div id="txt"></div>

			</div>
		);
	}
}
export default HOC(tracker, null, Root)(initialState);