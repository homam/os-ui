import * as React from "react";


export default class ChatScreen extends React.PureComponent{


  render() {

    return (<div className="chatScreen">

      <div className="header">
        
          <span id="status"></span>

          <div className="user-details">

            <h1>Medium Amanda</h1>

            <p>Astrologer</p>

          </div>

      </div>

      <div className="area">

            <div id="chatInner">

            <ul id="chatBox"></ul>

            </div>

      </div>

      <div className="footer">

            <div className="boolean-group animated" id="boolean-buttons">

              <button data-reply="Yes">Yes</button>

              <button data-reply="No">No</button>

            </div>

            <div className="terms-group animated" id="terms-buttons">

              <div className="instructions">Do you accept the Terms and Conditions?</div>

              <div className="terms-buttons">

                <button data-reply="Yes">Yes</button>

                <button data-reply="No">No</button>

              </div>

            </div>

            <div className="animated" id="mo">

              <button>SMS NOW</button>

            </div>

      </div>

    </div>)

  }


}