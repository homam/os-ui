import * as React from 'react'
import * as RDS from "../../../common-types/RemoteDataState";
import { Translate } from "../localization/index";
import { PINEntryFailure, PINEntrySuccess } from "../../../clients/lp-api/HOC";
export class PINEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
  backToStart: () => void;
  onEnd: (pin: string) => void;
}> {
  state = {
    pin: ""
  };
  render() {
    return (<form onSubmit={ev => {
      ev.preventDefault();
      this.props.onEnd(this.state.pin);
    }}>
      <div>
        <Translate id="we_just_sent_a_pin" />
      </div>
      <div className="pinEntry">
        <input placeholder="PIN" value={this.state.pin} onChange={ev => this.setState({ pin: ev.target.value })} />
        <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
        {RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)}
      </div>
      <div>
        {RDS.match({
          failure: (err: PINEntryFailure) => (<div>
            <div><Translate id={err.errorType} /></div>
            <Translate id="if_not_your_mobile" values={{
              phone: this.props.msisdn
            }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
              <Translate id="click_here_to_change_your_number" />
            </a>
          </div>),
          nothingYet: () => (<div>
            <Translate id="didnt_receive_pin_yet" values={{
              phone: this.props.msisdn
            }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
              <Translate id="click_here_to_change_your_number" />
            </a>
          </div>),
          loading: () => null,
          success: () => null
        })(this.props.rds)}
      </div>
    </form>);
  }
}