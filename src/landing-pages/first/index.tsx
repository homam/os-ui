import * as React from 'react'
require('../../reset.css')
// require('./css/styles.css')
import * as styles from './assets/css/styles.css'
// const testStyles = require('./Test.css')
// export default () => <div>Hello</div>
import {addLocaleData, IntlProvider} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';

const catImage = require ('./cat.jpeg')
const dogImage = require ('./dog.jpg')

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
    
    <div className={styles.container}>
      <h1>Hello there all!</h1>
      <div className={styles.btn}>
        CLIik
      </div>
    </div>
    
    </IntlProvider>
  }
}
