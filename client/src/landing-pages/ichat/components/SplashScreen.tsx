import * as React from "react"
import {Translate} from "./../localization/index"

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
    return <div className={`panel splash ${animating ? "active" : ""}`} id="splash">

      <div className="top-area"><Translate id="splash_header_msg" defaultMessage="Exclusive chat invitation"/></div>

      <div className="center-area">

        <h2><Translate id="splash_start_title" defaultMessage="The predictions"/></h2>

        <div className="avatar"></div>

        <h1><Translate id="splash_medium_amanda" defaultMessage="Medium Amanda"/></h1>

        <h2><Translate id="splash_startsub_title" defaultMessage="the most recognized astrologer in the whole world"/></h2>

        <p><Translate id="splash_footer_title" defaultMessage="Your future is written..."/></p>

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