import * as React from "react";
import "./ComponentPopup.less?raw"
import { TranslationProvider, Translate } from "../localization/index";

interface IProps{
  Translate,
  onClickYes,
  popupActive:boolean
}


export default class ComponentPopup extends React.PureComponent<IProps>{
  

  state={
    pop: false
  }

  componentDidUpdate(){

    this.setState({pop: this.props.popupActive})

  }

  render() {

    return <div className={`popup display-${this.state.pop}`}>



        <div className="modal">
        
            <p>

              <Translate id="sa_terms_text" defaultMessage="I accept" />

              <a href="http://n.winimi.com/gr/tnc-winimi?offer=1&_next=general_conditions.html" target="_blank">
              <Translate id="sa_terms_link_text" defaultMessage="Terms &amp; Conditions" />
              </a>

              {/*<Translate id="alternate_accept_first" defaultMessage="Terms" /> 
              <a href="http://n.appspool.net/gr/tnc-appspool?offer=1&amp;_next=general_conditions.html" target="_blank"> 
              <Translate id="text_terms" defaultMessage="Terms &amp; Conditions" /> </a>

              <Translate id="alternate_accept_second" defaultMessage="Conditions" /> 
              <a href="http://paydash.gr/pinakas-ypp/" target="_blank"> 
              <Translate id="text_price" defaultMessage="Final message price" /> </a>*/}

            </p>

            <button className="yesBtn msisdn-button" onClick={()=>this.props.onClickYes()}><Translate id="choicec1" defaultMessage="Yes" /></button>

        </div>

  </div>

  }

}