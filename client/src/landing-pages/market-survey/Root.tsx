import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  match
} from "../../clients/lp-api/HOC";
import "./assets/css/styles.less?raw";
import mkQuizComponent, { IProps, IResultPhaseComponentProps } from "../market-survey/components/QuizComponent";
import QuizResultAndFlowComponent from "./step-components/QuizResultAndFlowComponent";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

const imgProduct = require("./assets/img/card.jpg");



const quizData = [
  {
    question: "Είστε άνδρας ή γυναίκα;",
    answers: ["Ανδρας", "Γυναικα"]
  },
  {
    question: "Τι ξοδεύετε για ψώνια κάθε εβδομάδα;",
    answers: ["<200€", ">200€"]
  },
  {
    question: "Θα θέλατε να κερδίσετε ένα Κουπόνι για Ψώνια αξίας 500€;",
    answers: ["Ναι", "Οχι"]
  }
];

const MyQuizComponent  = mkQuizComponent(({ answers, currentState, actions } : IResultPhaseComponentProps & HOCProps) => 
  <QuizResultAndFlowComponent 
      answers={answers} 
      currentState={currentState} 
      actions={actions} 
  />
  , quizData)

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
  };

  render() {
    return (

      <TranslationProvider locale={this.state.locale}>

        <div className="container">

        <div className="headerInfo">
            Η Prizezillas σας παρέχει την ευκαιρία για:
        </div>

          <div className="wrapper">

            <div className="holder">

              <img src={imgProduct} alt="" className="productImage" />

              <p className="info">
                Αυτή η προσφορά ισχύει μόνο για <strong>23-11-2018</strong>. Παρακαλώ απαντήστε στις ακόλουθες 3 ερωτήσεις για να μάθετε αν είστε ο νικητής!
              </p>

              <MyQuizComponent currentState={this.props.currentState} actions={this.props.actions}  />

            </div>

          </div>

        </div>

      </TranslationProvider>
    );
  }
}
export default HOC(tracker, Root)(initialState);