import * as React from "react";
import { Translate } from "aws-sdk/clients/all";



export default class DateComponent extends React.Component {

  render() {
    return (
    
      <div className='date'>
         <input type="text" id="date" />
  <small>Enter date as Month / Day / Year</small>
      </div>
    
    )
  }
}

  
