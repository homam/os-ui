import * as React from "react";
import * as RDS from "../../common-types/RemoteDataState";
import { Translate } from "./localization/index";
import { MSISDNEntryFailure, MSISDNEntrySuccess } from "../../clients/lp-api/HOC";
import TimerComponent from '../../common-components/timer/timer';
import { render } from "react-dom";






export class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    isFlow: 0
  };
  joinNowState = () => {
    this.setState({
      isFlow: 1
    });
  };

 


  render() {

    function Bonus(props) {
      return (
      <div className="bonus-comp">
      <div className="bonus-comp__img">
        <div className="bonus-tag">
          Bonus
    </div>
    
      </div>
      <div className="bonus-comp__details">
        <span>Join now </span> and get a new space battelfield games!
    </div>
    </div>
      );
    }

    return (<form onSubmit={ev => {
      ev.preventDefault();
      this.props.onEnd(this.state.msisdn);
    }}>
      <div>

        <div className={"prelander " + (this.state.isFlow === 0 ? "active" : "")}>

          <div className="cta-lead">
            Experience the thrilling combat and action gameplay </div>

          <div className="c-timer">
            <span>You have </span><TimerComponent timerDuration={30} /><span> To register</span>
          </div>

          <button type="button" className="btn primary" onClick={this.joinNowState}> Join Now</button>

         <Bonus/>
          
        </div>

        <div className={"msisdin " + (this.state.isFlow === 1 ? "active" : "")}>

          <label className="msisdn__label">Enter your number to get exclusive access</label>
          <div className="number-entry">
            <input className="phone-input" placeholder="Phone number" value={this.state.msisdn} onChange={ev => this.setState({ msisdn: ev.target.value })} />
          </div>
          <button type="submit" className="btn primary" disabled={RDS.IsLoading(this.props.rds)}>
            <Translate id="submit_phone" />
          </button>

          {RDS.WhenLoading(null, () => 'Preparing for download ...')(this.props.rds)}

<div className="error-msg">{RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)}</div>

          <Bonus/>

        </div>

        
      </div>
    </form>);
  }
}