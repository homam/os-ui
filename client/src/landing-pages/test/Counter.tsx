import * as React from 'react'

class Counter extends React.Component<{}, { count: number , value: string}> {
  interval: number;

  constructor(props : any) {
    super(props)
    this.state = { count: 0, value: '' }
  }

  componentDidMount() {
    this.interval = window.setInterval(
      () => this.setState(prevState => ({ count: prevState.count + 1 })),
      200,
    )
  }

  generateString1() {
    return "1";
  }

  generateString2 = ()  => {
    return "1";
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <div>
      <span>{this.state.count} - {this.generateString1()} - {this.generateString2()}</span>
      <h1>HELLO</h1>
      <input type="text" value={this.state.value} onChange={ev => this.setState({value: ev.target.value})} />
    </div>
  }
}

export default Counter
