import * as React from "react";
const service = process.env.service || "default";
const iraqcomImg = require("../Disclaimers/assets/iraqcom_BIG.png");
import "../Disclaimers/iq-videozland.less?raw";

export const Disclaimer = ({ className }) =>(
  <div className={`disclaimer-iq ${className || ""}`}>
    <div>
      {" "}
      <div className="brand">'<img src={iraqcomImg}/>'</div>
      <h5>مرحباً بك في خدمة VideozLand تقدم هذه الخدمة مكتبة متنوعة من الفيديوهات المتميزة</h5>
      <h5>عند الاشتراك في الخدمة سوف تحصل على فترة مجانية لمدة ثلاثة أيام ستتلقى بعدها رسالة يوميا بسعر 300 دينار عراقي لكل رسالة، لإلغاء الاشتراك ارسل 0 إلى 2888</h5>
    </div>
    
      <a href="http://n.videozland.com/iq/4k-videos?page=component&key=T_C&device=smart&offer=1">الشروط والأحكام - سياسة الخصوصية</a>
    
  </div>
);