import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import { MOLink } from "../../../clients/lp-api-mo/HOC";
import { IKeywordShortcode } from "../../../clients/lp-api-mo/main";


interface IProps {
  value,
  onSendClicked
}


const MOStep = ({ keyword, shortcode }: IKeywordShortcode ) => {

  return( 
    <div className="overlay">
      <MOLink keywordAndShortcode={{ keyword, shortcode }}>
        <div className="moBox">
          <div className="title1"><Translate id="roxy_final_step"/></div>
          <div className="title2"><Translate id="roxy_receive"/></div>
          <div className="title3"><Translate id="send_sms"/></div>
          <div className="keyShort"><span className="keyword">{keyword}</span> to <span className="shortcode">{shortcode}</span></div>
          <div className="or"><Translate id="roxy_or"/></div>
          <button type="button" className="moBtn" id="sms-now-button"><Translate id="send_sms"/></button>
        </div>
      </MOLink>
    </div>
  ) 
}

export default injectIntl(MOStep)