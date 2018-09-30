import { recordImpression, recordEvent } from "./record";

export type AnalyticsEvents =
    {
      category: "performance";
      action: "window-load";
      relt: number;
      args: {
        loadEnd_navStart?: number;
        domInt_fetchStart?: number;
        loadEnd_fetchStart?: number;
        visibilityState: string;
        screen_availWidth: number;
        screen_availHeight: number;
        screen_width: number;
        screen_height: number;
        window_inner_width: number;
        window_inner_height: number;
      };
    }
  | { category: "performance"; data: string };

export function mkWindowLoadEvent(now: number): AnalyticsEvents {
  const timingObj = () => {
    if (!!window.performance && !!window.performance.timing) {
      const timing = window.performance.timing;

      return {
        loadEnd_navStart: timing.loadEventEnd - timing.navigationStart,
        domInt_fetchStart: timing.domInteractive - timing.fetchStart,
        loadEnd_fetchStart: timing.loadEventEnd - timing.fetchStart
      };
    } else return {};
  };

  return {
    category: "performance",
    action: "window-load",
    relt: now - window.pac_analytics.startTime,
    args: {
      ...timingObj(),
      visibilityState: document.visibilityState,
      screen_availWidth: screen.availWidth,
      screen_availHeight: screen.availHeight,
      screen_width: screen.width,
      screen_height: screen.height,
      window_inner_width: window.innerWidth,
      window_inner_height: window.innerHeight
    }
  };
}

export type EventTracker = (event: AnalyticsEvents) => void;

export const tracker: EventTracker = (event: AnalyticsEvents) => {
  console.log(">Event", event);
};

if (typeof window != "undefined") {
  recordImpression(window, "ke", "first");
  window.addEventListener("load", ev => {
    const now = new Date().valueOf();
    const loadEvent = mkWindowLoadEvent(now);
    setTimeout(() => recordEvent(window, "Unknown-View", loadEvent), 500);
  });
}
