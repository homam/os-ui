import * as React from "react";
import submitMSISDN , {IConfig} from "./main";
import * as RDS from "../../common-types/RemoteDataState";
import { ITracker } from "../../pacman/record";

export type MSISDNEntryFailure = {
  errorType: MSISDNEntryErrorTypes;
  error: any;
};
export type MSISDNEntrySuccess = { };
export type PINEntryFailure = {
  errorType: PINEntryErrorTypes;
  error?: Error;
};
export type PINEntrySuccess = { finalUrl: string };
export type State =
  | {
      type: "MSISDNEntry";
      result: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
    }
  | {
      type: "PINEntry";
      result: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
    }
  | {
      type: 'Completed';
      result:PINEntrySuccess;
    };

export type MSISDNEntryErrorTypes =
  | "AlreadySubscribed"
  | "UnknownError"
  | "InvalidMSISDN";

export type PINEntryErrorTypes = "UnknownError" | "TooEarly" | "InvalidPIN";

export const initialState : State = { type: "MSISDNEntry", result: RDS.NothingYet<MSISDNEntryFailure, MSISDNEntrySuccess>()}
export const mockedCompletedState : State = { type: "Completed", result: {finalUrl: 'https://www.yahoo.com/'} }
// export const initialState : State = { type: "PINEntry", result: RDS.NothingYet<PINEntryFailure, PINEntrySuccess>()}

export interface IActions {
  submitMSISDN: (window: Window, config: IConfig, msisdn: string) => any,
  submitPIN: (pin: string) => any,
  backToStart: () => void
}

export type HOCProps = {
  currentState: State;
  actions: IActions;
};

export function match<R>(
  { msisdnEntry, pinEntry, completed }: 
  {   msisdnEntry: (rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>) => R
    , pinEntry: (rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>) => R 
    , completed: (result: PINEntrySuccess) => R
  }): (state: State) => R {
  return state => {
    switch (state.type) {
      case 'MSISDNEntry':
        return msisdnEntry(state.result)
      case 'PINEntry':
        return pinEntry(state.result)
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
              currentState: {type: "MSISDNEntry", result: RDS.Loading()} as State
            })
            const [,,msisdn] = args
            tracker.advancedInFlow('assrock/v1', 'msisdn-submitted',{msisdn})
            try {
              const submitPIN = await submitMSISDN(...args);
              tracker.advancedInFlow('assrock/v1', 'msisdn-submission-success',{msisdn})
              self.setState({
                currentState: {type: "PINEntry", result: RDS.NothingYet()} as State,
                actions: {...self.state.actions, submitPIN: async (pin: string) => {
                  this.setState({
                    currentState: {type: "PINEntry", result: RDS.Loading()} as State
                  })
                  tracker.advancedInFlow('assrock/v1', 'pin-submitted',{msisdn, pin})
                  try {
                    const result = await submitPIN(pin)
                    tracker.advancedInFlow('assrock/v1', 'pin-submission-success',{msisdn, pin})
                    this.setState({
                      currentState: {
                        type: "PINEntry",
                        result: RDS.Success<PINEntryFailure, PINEntrySuccess>({finalUrl: result})
                      } as State
                    })
                  } catch(ex) {
                    const errorType: PINEntryErrorTypes =
                      "SEInvalidPIN" === ex.type
                        ? "InvalidPIN"
                        : "UnknownError";
                    self.setState({
                      currentState: {
                        type: "PINEntry",
                        result: RDS.Failure<PINEntryFailure, PINEntrySuccess>({
                          errorType: errorType
                        })
                      } as State
                    })
                    tracker.recedeInFlow('assrock/v1', 'pin-submission-failure',{msisdn, pin})
                  }
                }}
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
              tracker.recedeInFlow('assrock/v1', 'msisdn-submission-failure',{msisdn, errorType: errorType || 'UnknwonError'})
            }
          },
          submitPIN: (_pin: string) =>
            self.setState({
              currentState: {
                type: "PINEntry",
                result: RDS.Failure<PINEntryFailure, PINEntrySuccess>({
                  errorType: "TooEarly"
                })
              } as State
            })
        }
      };
    }

    render() {
      return (
        <Comp currentState={this.state.currentState} actions={this.state.actions} />
      );
    }
  };
