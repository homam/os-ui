import * as React from "react"
import * as TAPI from "./TolaAPI"
import * as RDS from "../common-types/RemoteDataState"
import { ITracker } from "../pacman/record";
import { TolaSuccessResult, TolaErrors } from "./TolaState";

export type ITolaProps = {
  currentState: TAPI.TolaRDS;
  actions: TAPI.ITolaActions;
};

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
            RDS.match<TolaErrors<string>, TolaSuccessResult, void>({
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



