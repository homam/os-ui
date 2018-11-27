import * as React from 'react'
import * as RDS from "../../../common-types/RemoteDataState";
import { Translate } from "../localization/index";
import { MSISDNEntryFailure, MSISDNEntrySuccess } from "../../../clients/lp-api/HOC";
export class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };
  render() {
    return (<form onSubmit={ev => {
      ev.preventDefault();
      this.props.onEnd(this.state.msisdn);
    }}>
      <div className="numberEntry">

        <h1>Παρακαλούμε συμπλήρωσε τον αριθμό του κινητού σου:</h1>

        <input 
        placeholder="Phone number"
        maxLength={10} 
        value={this.state.msisdn} 
        onChange={ev => this.setState({ msisdn: ev.target.value })} />
        <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>	Συνέχεια</button>
        {RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)}
      </div>
      <div className="errorMsg">
        {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)}
      </div>
    </form>);
  }
}