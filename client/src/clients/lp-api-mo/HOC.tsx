import * as React from "react";
import submitMSISDN, { IConfig, IKeywordShortcode } from "./main";
import * as RDS from "../../common-types/RemoteDataState";
import { ITracker } from "../../pacman/record";

export type MSISDNEntryFailure = {
  errorType: MSISDNEntryErrorTypes;
  error: any;
};
export type MSISDNEntrySuccess = IKeywordShortcode

export type State =
  | {
    type: "MSISDNEntry";
    result: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  }
  | {
    type: 'Completed';
    result: void;
  };

export type MSISDNEntryErrorTypes =
  | "AlreadySubscribed"
  | "UnknownError"
  | "InvalidMSISDN";

export type PINEntryErrorTypes = "UnknownError" | "TooEarly" | "InvalidPIN";

export const initialState: State = { type: "MSISDNEntry", result: RDS.NothingYet<MSISDNEntryFailure, MSISDNEntrySuccess>() }
export const mockedMSISDNEntrySuccess: State = { type: "MSISDNEntry", result: RDS.Success<MSISDNEntryFailure, MSISDNEntrySuccess>({ keyword: 'TEST OK', shortcode: '666' }) }
export const mockedCompletedState: State = { type: "Completed", result: void 6 }

export interface IActions {
  submitMSISDN: (window: Window, config: IConfig, msisdn: string) => void,
  backToStart: () => void
}

export type HOCProps = {
  currentState: State;
  actions: IActions;
};

export function match<R>(
  { msisdnEntry, completed }:
    {
      msisdnEntry: (rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>) => R
      , completed: (result: void) => R
    }): (state: State) => R {
  return state => {
    switch (state.type) {
      case 'MSISDNEntry':
        return msisdnEntry(state.result)
      case 'Completed':
        return completed(state.result)
    }
  }
}

export default <P extends HOCProps>(tracker: ITracker, Comp: React.ComponentType<P>) => (
  initialState: State
) =>
  class HOC extends React.PureComponent {
    state: {
      currentState: State;
      actions: IActions;
    };
    constructor(props) {
      super(props);
      const self = this;
      this.state = {
        currentState: initialState,
        actions: {
          backToStart: () => {
            this.setState({
              currentState: initialState
            })
          },
          submitMSISDN: async (...args) => {
            this.setState({
              currentState: { type: "MSISDNEntry", result: RDS.Loading() } as State
            })
            const [, , msisdn] = args
            tracker.advancedInFlow('assrock/v1', 'msisdn-submitted', { msisdn })
            try {
              const keywordAndShortcode = await submitMSISDN(...args);
              tracker.advancedInFlow('assrock/v1', 'msisdn-submission-success', { msisdn })
              self.setState({
                currentState: { type: "MSISDNEntry", result: RDS.Success<MSISDNEntryFailure, MSISDNEntrySuccess>(keywordAndShortcode) } as State,
                actions: { ...self.state.actions }
              })
            } catch (ex) {
              const errorType: MSISDNEntryErrorTypes =
                "SEAlreadySubscribed" === ex.type
                  ? "AlreadySubscribed"
                  : "SEInvalidMSISDN" == ex.type
                    ? "InvalidMSISDN"
                    : "UnknownError";
              self.setState({
                currentState: {
                  type: "MSISDNEntry",
                  result: RDS.Failure<MSISDNEntryFailure, MSISDNEntrySuccess>({
                    errorType: errorType,
                    error: ex
                  })
                } as State
              });
              tracker.recedeInFlow('assrock/v1', 'msisdn-submission-failure', { msisdn, errorType: errorType || 'UnknownError' })
            }
          }
        }
      };
    }

    render() {
      return (
        <Comp currentState={this.state.currentState} actions={this.state.actions} />
      );
    }
  };

const formatSMSLink = (keywordAndShortcode : IKeywordShortcode) =>
  (/iPhone/i.test(navigator.userAgent) || /Mac OS/i.test(navigator.userAgent))
  ? `sms:${keywordAndShortcode.shortcode}&body=${keywordAndShortcode.keyword}`
  : `sms:${keywordAndShortcode.shortcode}?body=${keywordAndShortcode.keyword}`

 

export const MOLink = ({keywordAndShortcode, children}: {keywordAndShortcode: IKeywordShortcode, children: React.ReactNode}) =>
  <a href={formatSMSLink(keywordAndShortcode)}>{children}</a>