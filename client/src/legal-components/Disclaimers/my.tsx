import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

export const Disclaimer1 = ({
  className,
  intl
}: { className: string } & InjectedIntlProps) => (
  <div className={`${className || ""}`}>

<div className="general-terms">
<a href="http://webcms.buz2mobile.biz/main/tnc/8/MY" target="_blank">General Terms &amp; Conditions</a>
</div>
    {intl.locale == "zh"
      ? `   
      这是一项订阅式的服务。这手机程式只限于Android用户。订阅者可下载多项不同类型的手机程式和内容。可使用的手机品牌包括 Nokia, Sony, Samsung, Motorola, LG, HTC, Xiaomi 等。无需任何报名费。Maxis用户每条简讯收费RM4，每月最高收费RM30。电讯台可能另有网络收费。需开启3G/GPRS网络以下载内容。网络收费将另外计费。某些电话品牌可能不能支持GPRS/3G网络。18岁以下的用户请得到父母或监护人的许可。服务台 03-22011873 (9am-5pm 周一至周五)。要停止订阅，请发送STOP AYUMI到32616。Buz2mobile 根据了马来西亚短信服务的条例以经营。技术服务提供商：Macrokiosk Bhd。内容提供商：Sam Media Sdn Bhd。`
      : `
      This is a subscription service. This application is only valid for Android phone users. Subscribers can download different type of apps and contents from the content portal. Supported mobile brands include Nokia, Sony, Samsung, Motorola, LG, HTC, Xiaomi and more. No sign-up fees will be charged. For Maxis users will be charged RM4 per message, maximum RM30 per month. Normal mobile operator network charges apply. GPRS / 3G access needs to be enabled to download the content. Data charges are billed separately. Some phones do not support GPRS / 3G. Please seek parental or guardian approval if you are 18 years old or below. Helpdesk 03-22011873 (9am-5pm Mon-Fri). To cancel send STOP AYUMI to 32616. Buz2mobile operates according to the Malaysian code of conduct for SMS services. Technical Service Provider:Powered by MacroKiosk Bhd. Content Service Provider: Sam Media Sdn Bhd.
      `}
  </div>
);

export const Disclaimer = injectIntl(Disclaimer1);
