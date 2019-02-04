import * as React from "react"
import {Translate} from "./../localization/index"
const imgLogo = require("../assets/imgs/logo2.png");

interface IProps {duration : number, active: boolean}

export default class SplashScreen extends React.PureComponent<IProps> {

  state = {
    animating: false
  }

  startAnimating() {
    setTimeout(() => {
      this.setState({animating: true})
    }, 0)
  }

  componentDidMount(){
    if(this.props.active) {
      this.startAnimating()
    }
  }

  componentDidUpdate() {
    if(this.props.active) {
      this.startAnimating()
    } else {
      this.setState({animating: false})
    }
  }

  render() {
    const {duration} = this.props
    const {animating} = this.state
    return <div className={`panel splash ${animating ? "active" : ""}`} >

      <div className="top-area"><img src={imgLogo}/><Translate id="splash_header_msg" defaultMessage="Private invitation"/></div>

      <div className="center-area">
          <h1><Translate id="splash_ping_roxy" defaultMessage="Ping Pong Roxy" /></h1>
          <h2><Translate id="splash_startsub_title" defaultMessage="The most satisfying experience you will ever have" /></h2>
          <p><Translate id="splash_footer_title" defaultMessage="Leaves you craving for more..." /></p>
      </div>

      <div className="bottom-area">

        <Translate id="establishing_text" defaultMessage="Establishing Connection, Please wait..."/>
  
      <div className="progressbar">

          <div className="bar" style={{ transitionDuration: `${duration}ms` }}></div>

        </div>

      </div>

    </div>
  }
}