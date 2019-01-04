import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState} from "../../clients/one-click/HOC"

import "./assets/styles.less?raw";

const tracker = mkTracker(
	typeof window != "undefined" ? window : null,
	"ar",
	"zombie" //page name
);
const operatorImg = require("./assets/imgs/iraqcom.png");

class Root extends React.PureComponent<IProps> {
	state = {
		locale: "ar"
	};
	render() {
		return (
			<TranslationProvider locale={this.state.locale}>
				<div id="container" className="ar">
					<div id="header">
						<div className="title"></div>
						<div className="rate"></div>
					</div>
					<div id="holder">
						<button className="submit-button" onClick={() => this.props.actions.onClick()}><Translate id="btn01" /></button>
					</div>
					<div id="parallax"></div>
					<footer id="disclaimer" className="animated fadeInUp delay2">
						<img alt="" src={operatorImg} className="operator" />

					<p>
						مرحباً بك في خدمة غيمس بارك. تقدم هذه الخدمة مكتبة متنوعة من المحتويات المتميزة من الألعاب والتطبيقات. مستخدمي آسياسيل: عند اشتراكك بالخدمة ستحصل على فترة مجانية لمدة ثلاث ايام. عند انتهاء الفترة المجانية

						سوف تستلم 7 محتويات أسبوعيا بسعر 300 دينارعراقي لكل محتوى وللإلغاء الأشتراك، ارسل 0 الى 2884.
						<br />
						<a href="http://iq.gamezpark.com/ar/privacy/?uid=fdf098fcc6&amp;uip=5.1.104.0"><span >&#8203;الشروط والأحكام&nbsp;-&nbsp;سياسية الخصوصيّة</span></a>
					</p>
					</footer>
				</div>
			</TranslationProvider>
		);
	}
}
export default HOC(tracker, null, Root)(initialState);