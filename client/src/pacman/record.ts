import mkSenddBeacon from "./sendBeacon";
import uuid from "uuid/v1";
import queryString1 from './queryString'

export const queryString = queryString1

export function recordImpression(
  window: Window,
  url: string,
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
        country,
        page,
        xaid: queryString(window.location.search, 'xaid')
      },
      startTime: new Date().valueOf(),
      url
    };

    sendBeacon(`${url}/impression/${campaignId}`, {
      rockmanId,
      userId,
      page,
      originalUrl
    });
  } else {
    console.info("No need to record an impression from client");
  }

  return window.pac_analytics
}

export function recordEvent(
  window: Window,
  url: string,
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
  sendBeacon(`${url}/event`, {
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

    const url = !!window.pac_analytics ? window.pac_analytics.url : (queryString(window.location.search, 'pacman-server') || '/analytics')

    // recordImpression manipulates window object by adding pac_analytics
    const pac_analytics = recordImpression(window, url, country, page);

    window.dataLayer.push({'xaid': pac_analytics.visitor.xaid, country, page})

    return {
      viewChanged: (view: string) => {
        if (view != current_view) {
          recordEvent(window, url, view, {
            category: "UI",
            action: "ViewChanged"
          });
          current_view = view;
        }
      },
      msisdnSubmitted: (msisdn: string) => {
        recordEvent(window, url, current_view, {
          category: "UX",
          action: "MSISDN-Submitted",
          args: {msisdn}
        })
      },
      advancedInPreFlow: (label: string, args?: any) => {
        const gaEvent = {category: "Pre-Flow", action: 'advance', label}
        recordEvent(window, url, current_view, {
          ...gaEvent, args
        })
        window.dataLayer.push({...gaEvent, event: 'gaEvent'})
        // how to trigger a custom event on window object:
        // const event = new CustomEvent('gaEvent', { detail: {category: 'Pre-Flow'} });
        // window.dispatchEvent(event)
      },
      recedeInFlow: (flow: string, reason: string, args?: any) => {
        const gaEvent = {category: "Flow", action: 'recede', label: `${flow}::${reason}`}
        recordEvent(window, url, current_view, {
          ...gaEvent, args
        });
        window.dataLayer.push({...gaEvent, event: 'gaEvent'})
      },
      advancedInFlow: (flow: string, action: string, args?: any) => {
        const gaEvent = {category: "Flow", action: `advance`, label: `${flow}::${action}`}
        recordEvent(window, url, current_view, {
          ...gaEvent, args
        })
        window.dataLayer.push({...gaEvent, event: 'gaEvent'})
      }
    };
  }
};
