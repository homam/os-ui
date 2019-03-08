import * as React from "react";

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

var degree = 100;

var clicks = 0;

var result;

function spinIt(){

	clicks++;

	var newDegree = degree*clicks;

	var wheel = document.getElementById("inner-wheel");

	var extraDegree =  Math.floor(Math.random() * (360 - 1 + 1)) + 1;

	var totalDegree = newDegree+extraDegree * 100;

	wheel.style.transform='rotate(' + totalDegree + 'deg)';

	setTimeout(function(){

		wheel.style.transform='rotate(' + totalDegree/100 + 'deg)';

		var wr = totalDegree / 100;

		if(wr < 360 ){

			if((wr > 0 && wr < 30)||(wr > 0 && wr < -30)||(wr > 331 && wr < 365)){

				result = "bulb";
	
			}else if(wr > 269 && wr < 335 ){

				result = "bell";

			}else if(wr > 210 && wr < 270){
	
				result = "chat";

			}else if(wr > 149 && wr < 215){

				result = "smile";

			}else if(wr > 95 && wr < 148 ){

				result = "heart";

			}else if(wr > 34 && wr < 90){

				result = "star";

			}else{

				result = "no win";

			}

		}else{

	
			wheel.style.transform='rotate(' + 330 + 'deg)';

		}

	var myResult = document.getElementById("myResult");

	myResult.innerHTML=result;

	},700)


}

interface IProps{



}

export default class SpinningWheel extends React.PureComponent<IProps> {
	
	state = {
	
	}

  render() {



    return <div>

					<div id="wheel">
						<ul id="inner-wheel">
							{spinningWheel}
						</ul>
						<div id="spin" onClick={spinIt}>
							<div id="inner-spin"></div>
						</div>
						<div id="shine"></div>

					</div>

					<div id="myResult"></div>

			</div>
  }

}