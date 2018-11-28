import mkSendBeacon from "./sendBeacon";
import uuid from "uuid/v1";
import queryString from './queryString'
import recordPacmanPageView from '../pacman/record-page-view'
import recordPacmanInteractions from '../pacman/main'

export {queryString}

export function recordImpression(
  window: Window,
  url: string,
  country: string,
  page: string
) {
  if (!window.pac_analytics) {
    const sendBeacon = mkSendBeacon(window);
    const rockmanId = uuid().replace(/-/g, "");
    const userId = rockmanId;
    const encCampaignId = queryString(window.location.search, 'xcid')
    const campaignId = parseInt(queryString(window.location.search, 'cid')) || 2
    const originalUrl = document.location.href;

    window.pac_analytics = {
      visitor: {
        rockmanId,
        impressionNumber: 1, //TODO: get impressionNumber from localStorage
        country,
        page,
        xaid: queryString(window.location.search, 'xaid'),
        cid: campaignId,
        offer: parseInt(queryString(window.location.search, 'offer')) || 1, // default to 1 offer id
      },
      startTime: new Date().valueOf(),
      queryString: key => queryString(window.location.search, key),
      url
    };

    sendBeacon(`${url}/impression/${encCampaignId}`, {
      rockmanId,
      userId,
      page,
      originalUrl
    });
  } else {
    console.info("No need to record an impression from client");
    window.pac_analytics.queryString = key => queryString(window.location.search, key)
  }

  recordPacmanPageView(window.document, window, window.navigator, {
    r: window.pac_analytics.visitor.rockmanId,
    m: window.pac_analytics.visitor.impressionNumber,
    server_url: 'https://de-pacman.sam-media.com/api/v2/mstore',
    b: 0
  })

  recordPacmanInteractions(window.document, window, Date.now(), {
      r: window.pac_analytics.visitor.rockmanId,
      m: window.pac_analytics.visitor.impressionNumber,
      server_url: 'https://de-pacman.sam-media.com/api/v2/mstore',
      b: 0
  })

  window.dataLayer.push({'affiliate_id': window.pac_analytics.visitor.xaid})

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
  const sendBeacon = mkSendBeacon(window);
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

    window.dataLayer.push({'xaid': pac_analytics.visitor.xaid, country, page, offer: pac_analytics.visitor.offer})

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
        const gaEvent = {category: "Flow", action: 'recede', label: `${reason}`}
        recordEvent(window, url, current_view, {
          ...gaEvent, args
        });
        window.dataLayer.push({...gaEvent, event: 'gaEvent'})
      },
      advancedInFlow: (flow: string, action: string, args?: any) => {
        const gaEvent = {category: "Flow", action: `advance`, label: `${action}`}
        recordEvent(window, url, current_view, {
          ...gaEvent, args
        })
        window.dataLayer.push({...gaEvent, event: 'gaEvent'})
      }
    };
  }
};
