import * as React from 'react'

export default class Timer extends React.Component<{ duration: number, className?: string }> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const startTimer = (duration: number, display: HTMLElement) => {
      const doInterval = (timer: number) => {
        const seconds = parseInt((timer % 60).toString(), 10);

        const secondsStr = seconds < 10 ? "0" + seconds : seconds.toString();

        display.textContent = secondsStr;
        if (timer < 1) {
          // do nothing
        } else {
          setTimeout(() => {
            doInterval(timer - 1);
          }, 1000);
        }
      };

      doInterval(duration);
    };

    startTimer(this.props.duration, this.refs.timer as HTMLElement);
  }

  render() {
    return (
      <span className={this.props.className}>
        00:
        <span ref="timer">{this.props.duration}</span>
      </span>
    );
  }
}