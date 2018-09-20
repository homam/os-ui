import mkSenddBeacon from "../sendBeacon";
import uuid from "uuid/v1";

export function recordImpression(
  window: Window,
  campaignId: string,
  country: string,
  page: string
) {
  if (!window.pac_analytics) {
    const sendBeacon = mkSenddBeacon(window);
    const rockmanId = uuid().replace(/-/g, "");
    const userId = rockmanId;
    const originalUrl = document.location.href;

    window.pac_analytics = {
      visitor: {
        rockmanId,
        country
      },
      startTime: new Date().valueOf()
    };

    sendBeacon(`//localhost:3030/analytics/impression/${campaignId}`, {
      rockmanId,
      userId,
      page,
      originalUrl
    });
  } else {
    console.info("No need to record an impression from client");
  }
}

export function recordEvent(
  window: Window,
  args: {
    category: string;
    action?: string;
    label?: string;
    value?: number;
    args?: any;
  }
) {
  const sendBeacon = mkSenddBeacon(window);
  if (!window.pac_analytics) {
    throw Error(
      "Please call recordImpression() first. 'pac_analytics' was not found."
    );
  }
  sendBeacon("//localhost:3030/analytics/event", {
    rockmanId: window.pac_analytics.visitor.rockmanId,
    relt: new Date().valueOf() - window.pac_analytics.startTime,
    ...args
  });
}
