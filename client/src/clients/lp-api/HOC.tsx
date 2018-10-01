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
    };

export type MSISDNEntryErrorTypes =
  | "AlreadySubscribed"
  | "UnknownError"
  | "InvalidMSISDN";

export type PINEntryErrorTypes = "UnknownError" | "TooEarly" | "InvalidPIN";

export const initialState : State = { type: "MSISDNEntry", result: RDS.NothingYet<MSISDNEntryFailure, MSISDNEntrySuccess>()}

export interface IActions {
  submitMSISDN: (window: Window, { host, country, handle, offer }: IConfig, msisdn: string) => any,
  submitPIN: (pin: string) => any,
  backToStart: () => void
}

export type HOCProps = {
  currentState: State;
  actions: IActions;
};

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
            try {
              this.setState({
                currentState: {type: "MSISDNEntry", result: RDS.Loading()} as State
              })
              const submitPIN = await submitMSISDN(...args);
              self.setState({
                currentState: {type: "PINEntry", result: RDS.NothingYet()} as State,
                actions: {...self.state.actions, submitPIN: async (pin: string) => {
                  try {
                    const result = await submitPIN(pin)
                    this.setState({
                      currentState: {
                        type: "PINEntry",
                        result: RDS.Success<PINEntryFailure, PINEntrySuccess>({finalUrl: result})
                      } as State
                    })
                  } catch(ex) {
                    self.setState({
                      currentState: {
                        type: "PINEntry",
                        result: RDS.Failure<PINEntryFailure, PINEntrySuccess>({
                          errorType: "TooEarly"
                        })
                      } as State
                    })
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
