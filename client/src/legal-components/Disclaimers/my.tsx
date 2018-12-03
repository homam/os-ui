import * as React from "react";
const service = process.env.service || "default";

export const Disclaimer = ({ className }) => (
  <div className={`disclaimer-my ${className || ""}`}>
    <div>
      {" "}
      <strong>This is a subscription service.</strong>&nbsp;This application is
      only valid for Android phone users. Subscribers will receive Phone Memory
      application as first content and then mix application contents for the
      next broadcast onwards. Supported mobile brands include Nokia, Sony,
      Samsung, Motorola, LG, HTC, Xiaomi and more.&nbsp;
      <strong>
        No subscription fee will be charged. Maxis subscribers: RM6(incl. 0 GST)
        per message,&nbsp;maximum RM30(incl. 0 GST) per month.
      </strong>
      &nbsp;Normal mobile operator network charges apply. GPRS / 3G access needs
      to be enabled to download the content. Data charges are billed separately.
      Some phones do not support GPRS / 3G. Please seek parental or guardian
      approval if you are 18 years old or below.&nbsp;Helpdesk 03-21643273
      (9am-5pm Mon-Fri).&nbsp;
      <strong>To cancel send STOP BRAIN to 36556.&nbsp;</strong>
      Buz2mobile&nbsp;operates according to the Malaysian code of conduct for
      SMS services. Powered by&nbsp;MacroKiosk Bhd.
    </div>
    <div>
      <a href="http://webcms.buz2mobile.biz/main/tnc/8/MY">FAQ</a>
    </div>
  </div>
);
