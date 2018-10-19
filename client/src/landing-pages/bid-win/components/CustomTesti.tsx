import * as React from 'react'

import "./ComponentTesti.less?raw"

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return <div className="customTesti">

      <ul className="customTestiSlider slide">
        <li>
          <div className="avatar person1"></div>
          <div className="details">
            <span className="message">I'm so lucky to have grabbed <br></br> this deal while it lasted!</span>
            <span className="rating">
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <span> -Chege</span>
            </span>
          </div>
        </li>

        <li>
          <div className="avatar person2"></div>
          <div className="details">
            <span className="message">Wow! I couldn't believe my eyes when I received my iPhone X!</span>
            <span className="rating">
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <span> -Felistas</span>
            </span>
          </div>
        </li>

        <li>
          <div className="avatar person3"></div>
          <div className="details">
            <span className="message">I bid, confirmed and won! So happy! Thank you!</span>
            <span className="rating">
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <i className="icon-star"></i>
              <span> -Mandere</span>
            </span>
          </div>
        </li>
      </ul>

    </div>
  }

}