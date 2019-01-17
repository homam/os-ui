import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";


interface IProps {
  value,
  onSendClicked
}

class MOStep extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value
  }

  render() {
    return <div className="animated" id="MOStep">

      <div id="moForm">

       function MO({ keyword, shortcode, backToStart }: IKeywordShortcode & { backToStart: () => void }) {
  return <div className="mo-wrapper">

 <h1><Translate id="roxy_final_step" defaultMessage="Final Step!"/></h1>

    <MOLink keywordAndShortcode={{ keyword, shortcode }}><h2><Translate id="send_sms"></Translate> </h2>

      <div> <span className="keyword">{keyword}</span> <Translate id="roxy_to"></Translate> <span className="shortcode">{shortcode}  </span></div>

      <button type="button" className="button"><Translate id="send_sms"></Translate></button>

    </MOLink>
    <div>

      <a className="try-again" onClick={() => backToStart()}><Translate id="try-again"></Translate></a>
    </div>
  </div>
}

      </div>


    </div>


  }

}

export default injectIntl(MOStep)