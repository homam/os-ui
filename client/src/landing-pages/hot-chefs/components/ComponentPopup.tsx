import * as React from "react";
import "./ComponentPopup.less?raw"
import { TranslationProvider, Translate } from "../localization/index";

interface IProps{
  Translate,
  popupActive:boolean,
  onClickYes
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
              <Translate id="alternate_accept_first" defaultMessage="Terms" /> 
             <a href="http://n.appspool.net/gr/tnc-appspool?offer=1&amp;_next=general_conditions.html" target="_blank"> 
              <Translate id="text_terms" defaultMessage="Terms &amp; Conditions" /> </a>

              <Translate id="alternate_accept_second" defaultMessage="Conditions" /> 
              <a href="http://paydash.gr/pinakas-ypp/" target="_blank"> 
              <Translate id="text_price" defaultMessage="Final message price" /> </a>
            </p>

            <button className="yesBtn" onClick={()=>this.props.onClickYes()}>Yes</button>

        </div>

  </div>

  }

}