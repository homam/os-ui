// JavaScript Document
// BY KAYDEE Designer/Developer
// http://www.kudashamu.com

var buton = document.getElementById('scanBtn');
var question1 = document.getElementById('question1');
var question2 = document.getElementById('question2');

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("modal-btn");



// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}


buton.onclick = function () {

    question1.style.display = "none";
    question2.style.display = "block"; 

    var amount = 100;
    var counter = 0;

    var interval = setInterval(function () {

        $('#count').val(counter++);

        if (counter > amount) {
            clearInterval(interval);

        

             $(".scan-report").addClass("show");
        }
    }, 10);

}

var timeSet = document.querySelector('#timer').innerHTML;
display = document.querySelector('#timer');
startTimer(timeSet, display);

function startTimer(duration, display) {
    
    var timer = duration,
        minutes, seconds;

    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;
        if (--timer < 0) {
            timer = 0;
            //alert("Times Up");
        }
    }, 1000);
}