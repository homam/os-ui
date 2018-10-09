/*
  {page}/localization/index.tsx
  ⚠️ This file is intended to be symlinked in the actual pages.
  If you edit this file, your changes will probably affect all pages. So be careful!
  You will need to kill and restart webpack-dev-server when you change this file for your changes
  to take effect in the page.
*/

import * as React from 'react'
import { injectIntl, IntlProvider, FormattedMessage } from "react-intl";
import * as translations from './addLocaleData'

injectIntl(({intl}) => intl.formatMessage())

type KeysOfType<A extends object, B> = { [K in keyof A]: A[K] extends B ? K : never }[keyof A]
export type TranslationKeys = KeysOfType<typeof translations.en, string>

export const Translate : React.ComponentType<{id : TranslationKeys, values?: object, defaultMessage?: string}> = injectIntl((
  {id, defaultMessage, values, intl} : 
  {id: TranslationKeys, defaultMessage?: string, values?: object, intl: any}) => 
    intl.formatMessage({id, defaultMessage}, values)
  )

export const TranslationProvider = ({ locale, children }: { locale: string, children: React.ReactChild }) =>
  <IntlProvider
    locale={locale}
    messages={translations[locale]}
  >{children}</IntlProvider>

export {IntlProvider, FormattedMessage, injectIntl}