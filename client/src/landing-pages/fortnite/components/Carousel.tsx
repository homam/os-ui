import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    minHeight: 100,
    color: '#fff',

  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },

  slide4: {
    backgroundColor: '#11111F',
  },
};

function slideRenderer(params) {
  const { index, key } = params;

  switch (mod(index, 4)) {
    case 0:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
          <div className="hero constructor"></div>
          <div className="swiper">
          <p>select your class</p>
          <div className="icon"></div>
          </div>
          <div className="container-slide orange">
          <p>constructor</p>
          </div>
          <button>I play constructor</button>
        </div>
      );

    case 1:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
        <div className="hero ninja"></div>
        <div className="swiper">
          <p>select your classe</p>
          <div className="icon"></div>
          </div>
         <div className="container-slide grey">
         <p>ninja</p>
          </div>
          <button>I play ninja</button>
        </div>
      );

    case 2:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
          <div className="hero outlander"></div>
          <div className="swiper">
          <p>select your classe</p>
          <div className="icon"></div>
          </div>
          <div className="container-slide green">
          <p>outlander</p>
          </div>
          <button>I play outlander</button>
        </div>
      );

      case 3:
      return (
        <div key={key} className="slide" style={Object.assign({}, styles.slide)}>
        <div className="hero soldier"></div>
        <div className="swiper">
        <p>select your classe</p>
        <div className="icon"></div>
        </div>
        <div className="container-slide blue">
        <p>soldier</p>
        </div>
        <button>I play soldier</button>
      </div>
      );

    default:
      return null;
  }
}



export default class Carousel extends React.PureComponent {

  render(){

    return <VirtualizeSwipeableViews slideRenderer={slideRenderer} enableMouseEvents resistance/>;
  }

}