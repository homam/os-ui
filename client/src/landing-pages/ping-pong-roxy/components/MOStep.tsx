import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import { MOLink } from "../../../clients/lp-api-mo/HOC";
import { IKeywordShortcode } from "../../../clients/lp-api-mo/main";


interface IProps {
  value,
  onSendClicked
}


const MOStep = ({ keyword, shortcode }: any ) => {

  return( 
    <div className="whiteBox boxMove">
     
      <div className="boxTitles moHead">Final Step!</div>

        <MOLink keywordAndShortcode={{ keyword, shortcode }}>
        
    {/* FROM HERE YOU DESIGN */}
    <div className="overlay">
    <button type="button" className="moBtn" id="sms-now-button">SMS Now</button>

      <div className="or">- OR -</div>

      <div className="keys"> SMS <span className="keyword">{keyword}</span> to <span className="shortcode">{shortcode}  </span></div>
      </div>
      {/*  HERE END DESIGN */}
        </MOLink>
        {/* <div>
          <a className="try-again" onClick={() => this.backToStart()}>Incorrect. Please try again.</a>
        </div> */}
      </div>
  ) 
}


export default injectIntl(MOStep)