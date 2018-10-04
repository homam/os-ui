import { injectIntl } from "react-intl";
import './addLocaleData'
import * as translations from './translations.json';

export type KeysOfType<A extends object, B> = { [K in keyof A]: A[K] extends B ? K : never }[keyof A]
type TranslationKeys = KeysOfType<typeof translations.en, string>

export const Translate : React.ComponentType<{id : TranslationKeys}> = injectIntl((
  {id, defaultMessage, value, intl} : 
  {id: string, defaultMessage?: string, value?: object, intl: any}) => 
    intl.formatMessage({id, defaultMessage}, value)
  )

export {translations}