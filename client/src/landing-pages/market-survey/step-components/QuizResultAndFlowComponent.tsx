import * as React from 'react'
import mkTracker from "../../../pacman/record";
import { TranslationProvider, Translate } from "../localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  PINEntryFailure,
  PINEntrySuccess,
  match
} from "../../../clients/lp-api/HOC";
import * as RDS from "../../../common-types/RemoteDataState";
import { MSISDNEntryStep } from './MSISDNEntryStep';
import { PINEntryStep } from './PINEntryStep';
import TQStep from './TQStep';
import { IResultPhaseComponentProps } from '../components/QuizComponent';


function QuizResult({ answers }) {
  return (

    <div className="quizResult">

      <h3>Ελέγχουμε τις απαντήσεις σας</h3>

      <div className="progressStripe"></div>

      <div className="dataAnswers">{answers[0]} {answers[1]} {answers[2]}</div>

    </div>
  );
}

export default class QuizResultAndFlowComponent extends React.PureComponent<IResultPhaseComponentProps & HOCProps> {
  timer: any
  state = {
    phase: "result", // "flow"
    msisdn: ''
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ phase: 'flow' })
    }, 2000)
  }
  render() {
    console.log(this.state, this.props)
    return <div className={`quiz-result-and-flow ${this.state.phase == 'result' ? 'result' : 'flow'}`}>

      <div className="quiz-result result">
        <QuizResult answers={this.props.answers} />
      </div>
      <div className="subscriptionArea flow">
        {match({
          msisdnEntry: rds => (

            <MSISDNEntryStep
              msisdn={this.state.msisdn}
              rds={rds}
              onEnd={msisdn => {
                this.setState({ msisdn });
                this.props.actions.submitMSISDN(window, null, msisdn);
              }}
            />

          ),
          pinEntry: rds => (

            <PINEntryStep
              onEnd={pin => this.props.actions.submitPIN(pin)}
              backToStart={() => this.props.actions.backToStart()}
              msisdn={this.state.msisdn}
              rds={rds}
            />

          ),

          completed: ({ finalUrl }) => (

            <TQStep finalUrl={finalUrl} />

          )
        })(this.props.currentState)}

      </div>
    </div>
  }
}