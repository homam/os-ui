import * as React from 'react'
require('./reset.css')
import * as styles from './Root.styl'
import * as testStyles from './Test.less'
// const testStyles = require('./Test.css')
// export default () => <div>Hello</div>
import MSISDN from './MSISDN'
import {addLocaleData, IntlProvider} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';


const translations = {
  nl: {
    localeData: nlLocaleData,
    "msisdn.number_is_invalid": `Het lijkt erop dat {msisdn, number} ongeldig is`
  },
  en: {
    localeData: enLocaleData
  }
}
addLocaleData(enLocaleData);
addLocaleData(nlLocaleData);

export default class Root extends React.Component {
  state : {
    locale: string
  }
  constructor(params : any) {
    super(params)
    this.state = {locale: "en"}
  }
  render() { 
    return <IntlProvider locale={this.state.locale} messages={
      translations[this.state.locale]
    }>
    
    <div className={styles.root}>
      <h1 className={testStyles.mainTitle}>Hello there!</h1>
      <select onChange={
        ev => this.setState({locale: ev.target.value})
      }>
        <option value="en">English</option>
        <option value="nl">Dutch</option>
      </select>

      {/* <img src={catImage} onMouseDown={() => alert('meww')} /> */}
      {/* <img src={dogImage} /> */}
  
      <MSISDN msisdn={3373*100} maxLength={10} />
    </div>
    </IntlProvider>
  }
}
