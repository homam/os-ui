import * as React from 'react'
import './Root.styl'
// export default () => <div>Hello</div>
import MSISDN from './MSISDN'
import {addLocaleData, IntlProvider} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';

const locale = "nl"
const translations = {
  nl: {
    localeData: nlLocaleData,
    "msisdn.number_is_invalid": `Het lijkt erop dat {msisdn} ongeldig is`
  },
  en: {
    localeData: enLocaleData
  }
}
addLocaleData(translations[locale].localeData);
const messages = translations[locale]

export default class Root extends React.Component {
  constructor(params : any) {
    super(params)
  }
  render() {
    return <IntlProvider locale={locale} messages={messages}>
    
    <div className='root'>Hello World!!!!!

      <MSISDN msisdn="3373" maxLength={10} />
    </div>
    </IntlProvider>
  }
}
