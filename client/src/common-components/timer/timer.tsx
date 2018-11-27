import * as React from "react";
import { timer } from "rxjs";
import { TimerId } from "aws-sdk/clients/swf";

interface IProps {
  timerDuration: number
}

interface IState {
  timeLeft: number
}

class TimerComponent extends React.Component<IProps, IState> {

  myInterval: any


  state = {
    timeLeft: this.props.timerDuration
  };


  render() {
    const { timeLeft } = this.state
    var date = new Date(null);
    date.setSeconds(timeLeft);
    var timeString = date.toISOString().substr(14, 5);
    return (
      <span>
        {timeString}
      </span>
    )
  }

  componentDidMount() {

    const { timerDuration } = this.props

    this.myInterval = setInterval(() => {
      if (this.state.timeLeft > 0) {
        this.setState(prevState => ({
          timeLeft: prevState.timeLeft - 1
        }))
      } else {
        clearInterval(this.myInterval)
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
}



export default TimerComponent