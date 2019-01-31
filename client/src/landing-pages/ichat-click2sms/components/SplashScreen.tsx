import * as React from "react";

interface IProps {
  onChange
}

export default class SplashScreen extends React.PureComponent<IProps> {

  render(){

    setTimeout(()=>{

     this.props.onChange();

    },2800)

    return (<div className="splashScreen">

      <div className="top-area">Exclusive chat invitation</div>

      <div className="center-area">

        <h2>The predictions</h2>

        <div className="avatar"></div>

        <h1>Medium Amanda</h1>

        <h2>the most recognized astrologer in the whole world</h2>

        <p>Your future is written...</p>

      </div>

      <div className="bottom-area">

        Establishing Connection, Please wait...
       
        <div className="progressbar">

        <div className="bar animated preload"></div>

        </div>

      </div>

    </div>)

  }


}