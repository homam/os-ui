import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

export const Disclaimer1 = ({
  className,
  intl
}: { className: string } & InjectedIntlProps) => (
  <div className={`${className || ""}`}>
    {intl.locale == "ar"
      ? `   
      عند اشتراكك في هذه الخدمة، مستخدمي أوريدو سيتم خصم 2 ريال للرسالة الواحدة. ولمستخدمي فودافون، سيتم خصم 9 ريال في الاسبوع. سيتم تجديد الاشتراك تلقائيا حتى تقوم بإلغاء الاشتراك من الخدمة. لإلغاء الاشتراك لمستخدي أوريدو، أرسل UNSUB 11 إلى 92482. ولمستخدمي فودافون أرسل UNSUB 44 الى 97757.`
      : `
      By subscribing to this service, for Ooredoo users you will be charged QAR 2/SMS. For Vodafone, you will be charged QAR 9/Week. Subscription would be automatically renewed until you unsubscribe from the service. To unsubscribe, for Ooredoo send UNSUB 11 to 92482. For Vodafone, send UNSUB 44 to 97757.
      `}
  </div>
);

export const Disclaimer = injectIntl(Disclaimer1);
