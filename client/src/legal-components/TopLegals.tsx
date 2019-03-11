import * as React from 'react'


export default class TopLegals extends React.Component<{className?: string}> {
  state = {
    Country: null
  }
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    import(/* webpackMode: "lazy" */ `./TopLegals/${process.env.country}`)
    .then(Country => this.setState({Country: Country.TopLegals}))
    .catch(err => console.warn(err))
  }
  render() {
    const {Country} = this.state
    return !Country ? null : <Country className={this.props.className} />
  }
}

