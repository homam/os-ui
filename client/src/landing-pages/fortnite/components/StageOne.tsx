import React from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import { TranslationProvider, Translate } from "../localization/index";
import { tracker } from "../../../pacman/events";


const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    minHeight: 460,
    color: "#fff"
  }

};

function nextStage(param) {
  document.getElementById(param).click();
}

function slideRenderer(params) {
  const { index, key } = params;

  switch (mod(index, 4)) {
    case 0:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>

          <div className="slide">
          <div className="hero constructor slideInRight animated"></div>
          <div className="swiper">
          <p><Translate id="select_your_class" /></p>
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide orange">
          <p>constructor</p>
          </div>

            <button className="pulse animated"
              onClick={() => {
                nextStage("clickA");
              }}
            >
            <Translate id="i_play_constructor" />
            </button>

            </div>

        </div>
      );

    case 1:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
          <div className="slide">
          
          <div className="hero ninja"></div>
        <div className="swiper">
          <p><Translate id="select_your_class" /></p>
          <div className="icon">
          <div className="hand"></div>
          </div>
          </div>
         <div className="container-slide grey">
         <p>ninja</p>
          </div>

          <button className="pulse animated"
            onClick={() => {
              nextStage("clickB");
            }}
          >
           <Translate id="i_play_ninja" />
          </button>
        </div>

        </div>
      );

    case 2:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
         <div className="slide">
         <div className="hero outlander"></div>
          <div className="swiper">
          <p><Translate id="select_your_class" /></p>
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide green">
          <p>outlander</p>
          </div>

          <button className="pulse animated"
            onClick={() => {
              nextStage("clickC");
            }}
          >
            <Translate id="i_play_outlander" />
          </button>
        </div>
        </div>
      );

      case 3:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
         <div className="slide">
         <div className="hero soldier "></div>
        <div className="swiper">
        <p><Translate id="select_your_class" /></p>
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div  className="container-slide blue">
        <p>soldier</p>
        </div>

          <button className="pulse animated"
            onClick={() => {
              nextStage("clickD");
            }}
          >
            <Translate id="i_play_soldier" />
          </button>
        </div>
        </div>
      );

    default:
      return null;
  }
}

interface IProps {
  onSelect;
}

export default class StageOne extends React.PureComponent<IProps> {
  render() {
    return (
      <div className="stageOne">
        <VirtualizeSwipeableViews
          slideRenderer={slideRenderer}
          enableMouseEvents
        />
        <div
          onClick={() =>
            this.props.onSelect({ keyData: "constructor" })}
          id="clickA"
          
        />
        <div
          onClick={() => this.props.onSelect({ keyData: "ninja" })}
          id="clickB"
        />
        <div
          onClick={() => this.props.onSelect({ keyData: "outlander" })}
          id="clickC"
        />
        <div
          onClick={() => this.props.onSelect({ keyData: "soldier" })}
          id="clickD"
        />
      </div>
    );
  }
}
