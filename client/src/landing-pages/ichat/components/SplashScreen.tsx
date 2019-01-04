import * as React from "react"

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

      <div className="top-area">Exclusive chat invitation</div>

      <div className="center-area">

        <h2>The predictions</h2>

        <div className="avatar"></div>

        <h1>Medium Amanda</h1>

        <h2>the most recognized astrologer <br></br> in the whole world</h2>

        <p>Your future is written...</p>

      </div>

      <div className="bottom-area">

        Establishing Connection, Please wait...
  
      <div className="progressbar">

          <div className="bar" style={{ transitionDuration: `${duration}ms` }}></div>

        </div>

      </div>

    </div>
  }
}