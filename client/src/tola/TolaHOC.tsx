import * as React from "react"
import * as TAPI from "./TolaAPI"
import * as RDS from "../common-types/RemoteDataState"
import { ITracker } from "../pacman/record";

export type TolaRDS = TAPI.TolaRDS
export type ITolaProps = {
  currentState: TAPI.TolaRDS;
  actions: TAPI.ITolaActions;
};

export type TolaFailure = TAPI.TolaFailure
export type TolaSuccess = TAPI.TolaSuccess

export function match<R>
  (matcher: RDS.IMatcher<TAPI.TolaFailure, TAPI.TolaSuccess, R>)
  { return (rds: TolaRDS) => RDS.match(matcher)(rds) }

export function MatchSuccess<R>(matcher: RDS.ISuccessMatcher<TolaFailure, TolaSuccess, R>){
  return (rds: TolaRDS) => RDS.MatchSuccess(matcher)(rds)
}

export default (tracker: ITracker, Comp: React.ComponentType<ITolaProps>) => (initState: TAPI.TolaRDS) => 
  class HOC extends React.Component {
    state: {
      current: TAPI.TolaRDS;
    };
    actions: TAPI.ITolaActions; 
    constructor(props: any) {
      super(props);
      this.state = {
        current: initState
      };
      const self = this;
      this.actions = {
        chargeAndWait: (msisdn: string, message: string, price: number) => 
          TAPI.chargeAndWait(msisdn, message, price, st => {
            self.setState({ current: st })
            RDS.match<TolaFailure, TolaSuccess, void>({
              loading: () => tracker.advancedInFlow('tola', 'chargeAndWait', {msisdn, message, price}),
              success: () => tracker.advancedInFlow('tola', 'success', {msisdn, message, price}),
              failure: (error) => tracker.recedeInFlow('tola', 'failure', {error: error.type}),
              nothingYet: () => void 8
            })(st)
          }
          ),
        backToNothingYet: () => self.setState({ current: RDS.NothingYet() })
      };
    }

    render() {
      const self = this;
      return (
        <Comp
          actions={self.actions}
          currentState={self.state.current}
          {...this.props}
        />
      );
    }
  }


export const initialState = RDS.NothingYet() as TolaRDS