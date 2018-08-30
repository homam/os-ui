import * as React from "react";

export default class Counter extends React.Component<{
  from: number;
  to: number;
  className: string;
  interval: number;
  onEnd?: () => void;
}> {
  private count: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
    this.count = React.createRef();
  }
  componentDidMount() {
    const { from, to, interval } = this.props;
    const dir = to >= from ? 1 : -1;
    const self = this;
    const tick = (current: number) => {
      self.count.current.innerHTML = current.toString();
      if (current != to) {
        setTimeout(() => tick(current + dir), interval);
      } else {
        if (!!this.props.onEnd) {
          this.props.onEnd();
        }
      }
    };
    tick(from);
  }
  render() {
    return (
      <span ref={this.count} className={this.props.className}>
        {this.props.from}
      </span>
    );
  }
}