import * as React from "react";
import { timer } from "rxjs";
import "./style.less?raw";
import { TimerId } from "aws-sdk/clients/swf";



class PercentageLoader extends React.Component {

  myInterval: any


  state = {
    timeLeft: 0
  };


  render() {
    //const { timeLeft } = this.state



    return (
      <div>
        <div> {this.state.timeLeft} %</div>
        <div className="loader" style={{ width: this.state.timeLeft }}  ></div>
        <div className="procesing-items">
          <div>Caluate age</div>
          <div>Caluate names </div>
          <div>Caluate age</div>
          <div>result is coming</div>
        </div>
      </div>
    )
  }



  startLoader =() => {

    this.myInterval = setInterval(() => {
      if (this.state.timeLeft < 100) {
        this.setState(prevState => ({
          timeLeft: this.state.timeLeft + 1
        }))
      } else {
        clearInterval(this.myInterval)
      }
    }, 15)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
}



export default PercentageLoader