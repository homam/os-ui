import * as React from "react";

export default class Timer extends React.PureComponent {

  componentDidMount(){

      var countDownDate = new Date("Feb 14, 2019 23:59:59").getTime();
      var x = setInterval(function() {


      var now = new Date().getTime();


      var distance = countDownDate - now;


      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("timer").innerHTML = days + ' μέρα έμεινε';

      // document.getElementById("timer").innerHTML = days + "days left " + hours + "h "
      // + minutes + "m " + seconds + "s ";


      if (distance < 0) {
      clearInterval(x);
      document.getElementById("valentine-timer").innerHTML = 'Ημέρα του Αγίου Βαλεντίνου πέρασε, αλλά μπορείτε ακόμα να συμμετάσχετε';
      }
      }, 1000);

  }

  render() {

    return <div id="valentine-timer">
      <p>Μόνο <span id="timer"></span> μέχρι του Αγίου Βαλεντίνου</p>
    </div>

  }

}

