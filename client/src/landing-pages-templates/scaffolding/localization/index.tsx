/*
  {page}/localization/index.tsx
  This file is intended to be symlinked in the actual pages.
  If you edit this file, your changes will probably affect all pages. So be careful!
*/

import * as React from 'react'
import { injectIntl, IntlProvider, FormattedMessage } from "react-intl";
import * as translations from './addLocaleData'

type KeysOfType<A extends object, B> = { [K in keyof A]: A[K] extends B ? K : never }[keyof A]
export type TranslationKeys = KeysOfType<typeof translations.en, string>

export const Translate : React.ComponentType<{id : TranslationKeys}> = injectIntl((
  {id, defaultMessage, value, intl} : 
  {id: string, defaultMessage?: string, value?: object, intl: any}) => 
    intl.formatMessage({id, defaultMessage}, value)
  )

export const TranslationProvider = ({ locale, children }: { locale: string, children: React.ReactChild }) =>
  <IntlProvider
    locale={locale}
    messages={translations[locale]}
  >{children}</IntlProvider>

export {IntlProvider, FormattedMessage, injectIntl}