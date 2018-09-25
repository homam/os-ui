declare module 'react-tracker' {
  import React from 'react'

  export interface IEvent<EventType extends string> {
    type: EventType
  }
  export type EventTracker<ET extends string, T extends IEvent<ET>> = (event: T, history: T[]) => T | void
  export class Tracker<ET extends string, T extends IEvent<ET>> {
    constructor(trackers: EventTracker<ET, T>[])
    on(type: ET, callback: EventTracker<ET, T>): void;
    trackEvent(event: T);
    getHistory() : T[];
  }

  export class TrackerProvider<ET extends string, T extends IEvent<ET>> extends React.Component<{tracker: Tracker<ET, T>}> {}
}