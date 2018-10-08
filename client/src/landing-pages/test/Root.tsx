import { hot } from 'react-hot-loader'
import * as React from 'react'
import mkTracker from '../../pacman/record'
import {TranslationProvider, Translate} from './localization/index'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Counter from './Counter';
import Hello from './Hello';
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  PINEntryFailure,
  PINEntrySuccess,
  match
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";

const tracker = mkTracker((typeof window != "undefined") ? window : null, 'xx', 'Unknown');

const SimpleOpacityTransition = ({
  key,
  ...props
}: {
  key: string;
  children: JSX.Element;
  props?: any[];
}) => (
  <CSSTransition
    timeout={{ enter: 100, exit: 300 }}
    classNames={{
      enter: "simple-opacity-enter",
      enterActive: "simple-opacity-enter-active",
      exit: "simple-opacity-exit",
      exitActive: "simple-opacity-exit-active"
    }}
    key={key}
    {...props}
  />
);

const Step0 = ({onEnd}) => <div>
  <h1>Step 0</h1>
  <button onClick={() => onEnd()}>Go to step 1</button>
</div> 

const Step1 = ({onBack}) => <div>
  <h1>Step 1</h1>
  <button onClick={() => onBack()}>Back to step 0</button>
  <h2>1 I I</h2>
  <hr />
</div> 

class Root extends React.PureComponent<HOCProps>  {
  state = {
    locale: 'en',
    step: 0
  }
  render() {
    return <TranslationProvider locale={this.state.locale}>
      <div>
        <Counter />
        <TransitionGroup>
        {
            this.state.step == 0 ? 
              <SimpleOpacityTransition key="step-0">
                <Step0 onEnd={() => this.setState({step: 1})} />
              </SimpleOpacityTransition>
          : this.state.step == 1 ? 
              <SimpleOpacityTransition key="step-1">
                <Step1 onBack={() => this.setState({step: 0})} />
              </SimpleOpacityTransition>
          : null
        }
        </TransitionGroup>
        <Hello />
        <h3>HAAHlll!:) :)</h3>
      </div>
    </TranslationProvider>
  }
}
const H = HOC(tracker, Root)(initialState);
const RootApp =  (props: any) => {
  return <H {...props} />;
};


export default hot(module)(RootApp)
