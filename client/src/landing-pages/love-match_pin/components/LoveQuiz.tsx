import * as React from "react";
import {Translate} from "./../localization/index"
import DOBPicker from "./DOBPicker";

interface IProps{
  onFinish
}

export default class LoveQuiz extends React.PureComponent<IProps> {

  state = {
    updateState: "l-1"
  }

  render() {

    return (
        <div className={`loader display-${this.state.updateState}`}>
          <div className="l-1 beginDiv">
            <h2 className="firstHead"><Translate id="discover_text" /></h2>
            <h6 className="smallTitle"><Translate id="invite_text" /></h6>
            <button type="button" className="button" id="start-button" onClick={()=>{ this.setState({ updateState: 'l-2' }) }} >
              <Translate id="start_now" />
            </button>
          </div>

          <div className="l-2 genderDiv">
            <h2><Translate id="select_gender" /></h2>
            <div className="btnGender">
              <button type="button" className="gender male" id="male-button" onClick={()=>{ this.setState({ updateState: 'l-3' }) }} ><Translate id="Male_text" /></button>

              <button type="button" className="gender female" id="female-button" onClick={()=>{ this.setState({ updateState: 'l-3' }) }} ><Translate id="Female_text" /></button>
            </div>
          </div>

          <div className="l-3 nameDiv">
            <h2><Translate id="fill_your_details" /></h2>

            <div className="c-input-name form1">
              <label className="labelStyle"><Translate id="your_name" /></label><input className="inputStyle1" type="text" />
            </div>

            <div className="c-input-name form1">
              <label className="labelStyle"><Translate id="your_dob" /></label><DOBPicker />
            </div>

            <button type="button" className="button3" id="submit-your-details" onClick={()=>{ this.setState({ updateState: 'l-4' }) }} >
              <Translate id="submit" />
            </button>
          </div>

          <div className="l-4 dateDiv">
            <h2 className="boxFont"><Translate id="fill_lovers_details" /></h2>

            <div className="c-input-name form1">
              <label className="labelStyle"><Translate id="lovers_name" /></label><input className="inputStyle1" type="text" />
            </div>

            <div className="c-input-name form1">
              <label className="labelStyle"><Translate id="lovers_dob" /></label><DOBPicker />
            </div>

            <button type="button" className="button3" id="submit-lover-details"
             onClick={()=>{
              this.props.onFinish()
             }} >
              <Translate id="submit" />
            </button>
          </div>
        </div>
      )
    }

  }