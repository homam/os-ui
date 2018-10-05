import * as React from 'react'


export default class Disclaimer extends React.Component<{className?: string}> {
  state = {
    Gr: null
  }
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const gr = import(/* webpackMode: "lazy" */ `./Disclaimers/${process.env.country}`).then(Gr => this.setState({Gr: Gr.Disclaimer}))
  }
  render() {
    const {Gr} = this.state
    return !Gr ? null : <Gr className={this.props.className} />
  }
}

