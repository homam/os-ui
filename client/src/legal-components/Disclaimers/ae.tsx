import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

export const Disclaimer1 = ({
  className,
  intl
}: { className: string } & InjectedIntlProps) => (
  <div className={`${className || ""}`}>
    {intl.locale == "ar"
      ? `   
      سوف تشترك في خدمة "موب فن". لمستخدمي اتصالات ، سيتم خصم 11 درهم في الأسبوع. ولمستخدمي Du ، سيتم خصم 10 درهم في الأسبوع. سيتم تجديد الاشتراك تلقائيا حتى تقوم بإلغاء الاشتراك من الخدمة. لإلغاء الاشتراك ، لمستخدمي اتصالات ارسل C MOB إلى 1111. لمستخدمي  Du ، أرسل UNSUB 11 إلى 4723.`
      : `
      By subscribing to this services, you will get to enjoy unlimited mix content such as games, videos, apps, wallpapers and many more. For Etisalat, you will be charged AED 11/week. And for Du, you will be charged AED 10/week. Subscription will be automatically renewed until you unsubscribe from the service.To unsubscribe, for Etisalat send C BZ to 1111. For Du, send UNSUB 11 to 4723.
      `}
  </div>
);

export const Disclaimer = injectIntl(Disclaimer1);
