import * as React from "react";
import { Translate } from "./../localization/index"

interface IProps {
  onChange,
  activate: boolean
}

export default class SplashScreen extends React.PureComponent<IProps> {


  componentDidUpdate(prevProps) {

    prevProps.activate ? false : this.props.activate ? setTimeout(() => { this.props.onChange() }, 1000) : false;

  }


  render() {

    return (<div className="splashScreen">

      <div className="top-area"><Translate id="splash_header_msg" defaultMessage="Exclusive chat invitation" /></div>

      <div className="center-area">

        <h2><Translate id="splash_start_title" defaultMessage="The predictions" /></h2>

        <div className="avatar"></div>

        <h1><Translate id="splash_medium_amanda" defaultMessage="Medium Amanda" /></h1>

        <h2><Translate id="splash_startsub_title" defaultMessage="the most recognized astrologer in the whole world" /></h2>

        <p><Translate id="splash_footer_title" defaultMessage="Your future is written..." /></p>

      </div>

      <div className="bottom-area">

        <Translate id="establishing_text" defaultMessage="Establishing Connection, Please wait..." />

        <div className="progressbar">

          <div className="bar animated preload"></div>

        </div>

      </div>

    </div>)

  }


}