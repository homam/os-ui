import mkSenddBeacon from "./sendBeacon";
import uuid from "uuid/v1";
import queryString1 from './queryString'

export const queryString = queryString1

export function recordImpression(
  window: Window,
  country: string,
  page: string
) {
  if (!window.pac_analytics) {
    const sendBeacon = mkSenddBeacon(window);
    const rockmanId = uuid().replace(/-/g, "");
    const userId = rockmanId;
    const campaignId = queryString(window.location.search, 'xcid')
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
  view: string,
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
    view,
    ...args
  });
}

export type ITracker = {
  viewChanged: (view: string) => void;
  msisdnSubmitted: (msisdn: string) => void;
  advancedInFlow: (flow: string, action: string, args?: any) => void;
  advancedInPreFlow: (label: string, args?: any) => void;
  recedeInFlow: (flow: string, newState: string, args?: any) => void;
}

export default (
  window: Window,
  country: string,
  page: string
) : ITracker => {
  if (!window) {
    return {
      viewChanged: () => void 6,
      msisdnSubmitted: () => void 6,
      advancedInFlow: () => void 6,
      advancedInPreFlow: () => void 6,
      recedeInFlow: () => void 6
    };
  } else {
    var current_view = "Init";

    recordImpression(window, country, page);

    return {
      viewChanged: (view: string) => {
        if (view != current_view) {
          recordEvent(window, view, {
            category: "UI",
            action: "ViewChanged"
          });
          current_view = view;
        }
      },
      msisdnSubmitted: (msisdn: string) => {
        recordEvent(window, current_view, {
          category: "UX",
          action: "MSISDN-Submitted",
          args: {msisdn}
        })
      },
      advancedInPreFlow: (label: string, args?: any) => {
        recordEvent(window, current_view, {
          category: "Pre-Flow", action: 'advance', label, args
        })
      },
      recedeInFlow: (flow: string, reason: string, args?: any) => {
        recordEvent(window, current_view, {
          category: "Flow", action: 'recede', label: `${flow}::${reason}`, args
        })
      },
      advancedInFlow: (flow: string, action: string, args?: any) => {
        recordEvent(window, current_view, {
          category: "Flow", action: `advance`, label: `${flow}::${action}`, args
        })
      }
    };
  }
};
