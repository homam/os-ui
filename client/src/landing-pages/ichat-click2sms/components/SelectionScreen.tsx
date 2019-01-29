import * as React from "react";

interface IProps {
  onSelected
}

export default class SelectionScreen extends React.PureComponent<IProps>{


  render() {

    return (<div className="selectionScreen">

      <div className="header">

        Get exclusive live <strong>Astrology</strong> <span>reading today!</span>

      </div>

      <div className="question">

        What do you want to know about?

      </div>

      <div className="button-holder">

        <button onClick={() => this.props.onSelected({ keyData: "Love" })}>Love</button>
        <button onClick={() => this.props.onSelected({ keyData: "Luck" })}>Luck</button>
        <button onClick={() => this.props.onSelected({ keyData: "Money" })}>Money</button>
        <button onClick={() => this.props.onSelected({ keyData: "Family" })}>Family</button>
        <button onClick={() => this.props.onSelected({ keyData: "Work" })}>Work</button>

      </div>

    </div>)

  }


}