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


			if((wr > 0 && wr < 30)||(wr > 0 && wr < -30)||(wr > 330 && wr < 365)){

				console.log("bulb");
	
			}else if(wr > 269 && wr < 335 ){
	
				console.log("bell");
	
			}else if(wr > 215 && wr < 270){
	
				console.log("chat");
	
			}else if(wr > 149 && wr < 215){
	
				console.log("smile");
	
			}else if(wr > 95 && wr < 148 ){
	
				console.log("heart");
	
			}else if(wr > 34 && wr < 90){
	
				console.log("star");
	
			}else{
				console.log("no win!");
			}


		}else{

			wheel.style.transform='rotate(' + 330 + 'deg)';

		}

	},700)


}

interface IProps{



}

export default class SpinningWheel extends React.PureComponent<IProps> {
  
  render() {

    return  <div id="wheel">
						<ul id="inner-wheel">
							{spinningWheel}
						</ul>
						<div id="spin" onClick={spinIt}>
							<div id="inner-spin"></div>
						</div>
						<div id="shine"></div>
				</div>
  }

}