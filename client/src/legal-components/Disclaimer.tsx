import * as React from 'react'


export default class Disclaimer extends React.Component<{className?: string}> {
  state = {
    Country: null
  }
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    import(/* webpackMode: "lazy" */ `./Disclaimers/${process.env.country}`)
    .then(Country => this.setState({Country: Country.Disclaimer}))
    .catch(err => console.warn(err))
  }
  render() {
    const {Country} = this.state
    return !Country ? null : <Country className={this.props.className} />
  }
}

