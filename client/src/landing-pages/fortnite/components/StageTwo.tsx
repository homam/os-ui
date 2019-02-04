import React from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import { TranslationProvider, Translate } from "../localization/index";

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

  switch (mod(index, 5)) {
    case 0:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
          <div className="slide improver">
          <div className="swiper">
          <div className="icon"><div className="hand"></div></div>
          </div>
          <div className="container-slide building">
          <p>Building</p>
          </div>
          <button className="pulse animated"
            onClick={() => {
              nextStage("clickE");
            }}
          >
            <Translate id="build_faster" />
          </button>
          </div>
        </div>
      );

    case 1:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
          <div className="slide improver">
          <div className="swiper">
          <div className="icon"><div className="hand"></div></div>
          </div>
         <div className="container-slide onevone">
         <p><Translate id="one_v_one" /></p>
          </div>
          <button className="pulse animated"
            onClick={() => {
              nextStage("clickF");
            }}
          >
            <Translate id="win_one_v_one" />
          </button>
          </div>
        </div>
      );

    case 2:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
        <div className="slide improver">
        <div className="swiper">
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div className="container-slide aimshooting">
        <p><Translate id="aim_and_shooting" /></p>
        </div>
        <button 
        className="aimshootingbtn pulse animated"
          onClick={() => {
            nextStage("clickG");
          }}
        >
          <Translate id="frag_more" />
        </button>
        </div>
      </div>
    );

      case 3:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
        <div className="slide improver">
        <div className="swiper">
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div className="container-slide weapon">
        <p><Translate id="weapon_crafting" /></p>
        </div>
          <button  className="pulse animated"
            onClick={() => {
              nextStage("clickH");
            }}
          >
            <Translate id="best_weapon" />
          </button>
          </div>
        </div>
      );

      case 4:
      return (
        <div key={key} style={Object.assign({}, styles.slide)}>
        <div className="slide improver">
        <div className="swiper">
        <div className="icon"><div className="hand"></div></div>
        </div>
        <div className="container-slide everything">
        <p><Translate id="everything" /></p>
        </div>
          <button className="pulse animated"
            onClick={() => {
              nextStage("clickI");
            }}
          >
        <Translate id="learn_everything" />
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

export default class StageTwo extends React.PureComponent<IProps> {
  render() {
    return (
      <div className="stageTwo">
        <VirtualizeSwipeableViews
          slideRenderer={slideRenderer}
          enableMouseEvents
        />
        <div
          onClick={() => this.props.onSelect({ keyData: "building" })}
          id="clickE"
        />
        <div
          onClick={() => this.props.onSelect({ keyData: "onevone" })}
          id="clickF"
        />
        <div
          onClick={() => this.props.onSelect({ keyData: "aimshooting" })}
          id="clickG"
        />
         <div
          onClick={() => this.props.onSelect({ keyData: "weapon" })}
          id="clickH"
        />
         <div
          onClick={() => this.props.onSelect({ keyData: "everything" })}
          id="clickI"
        />
      </div>
    );
  }
}
