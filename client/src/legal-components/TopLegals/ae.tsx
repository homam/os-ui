import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

export const TopLegalsComponent = ({
  className,
  intl
}: { className: string } & InjectedIntlProps) => (
  <div className={`${className || ""}`}>
    {intl.locale == "ar"
      ? `   
      مشتركي اتصالات: مجانًا لمدة يوم واحد ثم 11 درهم في أسبوع. الضريبة مضافة. ولمشتركي دو: 10 درهم في الاسبوع
      `
      : `
      Etisalat: Free for 1 Day then AED 11 per Week VAT Included. Du: AED 10/week
      `}
  </div>
);

export const TopLegals = injectIntl(TopLegalsComponent);
