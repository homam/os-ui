import React from "react";
import Slider from "react-slick";
import { TranslationProvider, Translate } from "../localization/index";
import { tracker } from "../../../pacman/events";

interface IProps{
  iniTracker
}

class SimpleSlider extends React.Component<IProps> {

  render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      arrows:false,
      autoplay:true,
      autoplaySpeed:4500,
      focusOnSelect:true,
      pauseOnFocus:true,
      rows:1,
      slidesPerRow: 1,
      slidesToShow:1,
      centerMode: true,
      centerPadding: '25px',
    };
    
    return (

      <Slider {...settings}>  
        <div className="slide-custom">
        <div className="header">
        <div className="title">
        <p>Now is the time to</p>
        <h2 className="tracking-in-expand">LIVE THE ADVENTURE</h2>
        </div>
      </div>
          <div className="cover l-mountain fade-in ">
            <div className="available"></div>
            <div className="min-text"><p>Climb Mount Everest</p>
      <p>And discover the alps</p></div>
          </div>
          <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => this.props.iniTracker("ab1-second-mountain")}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
        </div>

        <div className="slide-custom">
        <div className="header">
        <div className="title">
        <p>Now is the time to</p>
        <h2 className="tracking-in-expand">TAKE A DEEP BREATH</h2>
        </div>
      </div>
          <div className="cover l-northern fade-in ">
            <div className="available"></div>
            <div className="min-text"><p>Discover the</p>
      <p>Northern lights</p></div>
          </div>
          <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => this.props.iniTracker("ab1-second-northern")}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
        </div>


        <div className="slide-custom">
        <div className="header">
        <div className="title">
        <p>Now is the time to</p>
        <h2 className="tracking-in-expand">Travel to europe</h2>
        </div>
      </div>
          <div className="cover l-europe fade-in ">
          <div className="available"></div>
          <div className="min-text"><p>From Barcelona</p>
      <p>to Amsterdam</p></div>
          </div>
          <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => this.props.iniTracker("ab1-second-europe")}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
        </div>
       
      </Slider>

    );
  }
}

export default SimpleSlider