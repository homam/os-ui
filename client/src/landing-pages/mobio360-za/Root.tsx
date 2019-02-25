import * as React from 'react'
import mkTracker from '../../pacman/record'
import {TranslationProvider, Translate} from './localization/index'
import './assets/style.css?raw'
import SimpleSlider from "./components/SimpleSlider";


const tracker = mkTracker((typeof window != "undefined") ? window : null, 'xx', 'Mobio360 Experience')

const abTest_variant = (() => {
  const variant = Math.round(Math.random());

  return () => variant
})()

// function gtag(...args) {window.dataLayer.push(...args)}

if (typeof window != "undefined") {
  window.addEventListener('load', () => setTimeout(() => {
    const ga = window['ga']
    if (!!ga) {

      const setGAExperimentCX = (_expId, _vId) => {
        const gtm = ga.getAll()[0].get('name')
        ga(`${gtm}.set`, 'exp', _expId.toString() + '.' + _vId.toString());
        ga(`${gtm}.send`, 'event', 'Experiment', 'Trigger', _expId.toString() + '.' + _vId.toString());
      }
      setGAExperimentCX('gAZPmFoSS_yMRi4IUMEKAg', abTest_variant());
    }

  }, 750))

}

class Root extends React.PureComponent  {
  state = {
    locale: 'en',
    abTestVariant: 0
  }

  componentDidMount() {
    this.setState({ abTestVariant: abTest_variant() })
    document.body.classList.add(`ab-${abTest_variant()}`)
  }

  render() {
    return <div>
       {
            this.state.abTestVariant == 0
            ? <Root0 {...this.props} />
            : <Root1 {...this.props} />
          }
      </div>

  }
}

class Root0 extends React.PureComponent {
  state = {
    appStage: "intro",
  }
  render() {
    return <div className={`container-full display-${this.state.appStage}`}>

    <div className="step intro">
      <div className="header">
        <div className="title">
        <p>A fully immersive</p>
        <h1 className="tracking-in-expand">digital experience</h1>
        </div>
        <div className="available">
        </div>
      </div>
      <div className="cover fade-in "></div>
      <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => { this.setState({ appStage: 'first' }); tracker.advancedInPreFlow("ab0-first"); }}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
      <div className="custom-footer">
      <div className="rated"><div className="icon"></div><p className="top">TOP RATED</p><p className="app">app</p></div>
      <div className="price">
      <p>R7/day</p>
      <div className="logo"></div>
      <p><a href="http://n.mobi360vr.com/za/tnc-mobio360?offer=1">T&C</a></p>
      </div>
      <div className="videos"><div className="icon"></div><p className="top">MORE THAN</p><p className="app">500 VR videos</p></div>
      </div>
      <div className="vodacom"><div className="icon"></div></div>

    </div>

    <div className="step first">

    <div className="header ">
        <div className="title">
        <p>What would you like</p>
        <h2 className="tracking-in-expand">to experience today?</h2>
        </div>
      </div>
      <div className="experience min-europe slide-in-a">
      <div className="title">A CITY TRIP IN EUROPE</div>
      <div className="subtitle">from barcelona to amsterdam</div>
      <button className="listbtn"  onClick={() => { this.setState({ appStage: 'europe' }); tracker.advancedInPreFlow("ab0-second-europe"); }}><p>Live this dream</p><div className="arrow-right"></div></button>
      </div>

      <div className="experience min-northern slide-in-b">
      <div className="title">TAKE A DEEP BREATH</div>
      <div className="subtitle">Discover the northern lights</div>
      <button className="listbtn"  onClick={() => { this.setState({ appStage: 'northern' }); tracker.advancedInPreFlow("ab0-second-northern"); }}><p>Live this dream</p><div className="arrow-right"></div></button>
      </div>
      
      <div className="experience min-mountain slide-in-c">
      <div className="title">LIVE THE ADVENTURE</div>
      <div className="subtitle">Climb mount Everest and the Alps</div>
      <button className="listbtn"  onClick={() => { this.setState({ appStage: 'mountain' }); tracker.advancedInPreFlow("ab0-second-mountain"); }}><p>Live this dream</p><div className="arrow-right"></div></button>
      </div>

      <div className="vodacom"><div className="icon"></div></div>


    </div>

    <div className="step europe">

    <div className="header">
        <div className="title">
        <p>Now is the time to</p>
        <h2 className="tracking-in-expand">Travel to europe</h2>
        </div>
      </div>
      <div className="cover l-europe fade-in ">
      <div className="available">
        </div>
      <div className="min-text"><p>From Barcelona</p>
      <p>to Amsterdam</p></div>
      </div>
      <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => { tracker.advancedInPreFlow("ab0-third-europe"); }}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
      <div className="custom-footer">
      <div className="rated"><div className="icon"></div><p className="top">TOP RATED</p><p className="app">app</p></div>
      <div className="price">
      <p>R7/day</p>
      <div className="logo"></div>
      <p><a href="http://n.mobi360vr.com/za/tnc-mobio360?offer=1">T&C</a></p>
      </div>
      <div className="videos"><div className="icon"></div><p className="top">MORE THAN</p><p className="app">500 VR videos</p></div>
      </div>
      <div className="vodacom"><div className="icon"></div></div>

    </div>

    <div className="step mountain">
    <div className="header">
        <div className="title">
        <p>Now is the time to</p>
        <h2 className="tracking-in-expand">Live the aventure</h2>
        </div>
      </div>
      <div className="cover l-mountain fade-in ">
      <div className="available">
        </div>
      <div className="min-text"><p>Climb Mount Everest</p>
      <p>And discover the alps</p></div>
      </div>
      <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => { tracker.advancedInPreFlow("ab0-third-mountain"); }}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
      <div className="custom-footer">
      <div className="rated"><div className="icon"></div><p className="top">TOP RATED</p><p className="app">app</p></div>
      <div className="price">
      <p>R7/day</p>
      <div className="logo"></div>
      <p><a href="http://n.mobi360vr.com/za/tnc-mobio360?offer=1">T&C</a></p>
      </div>
      <div className="videos"><div className="icon"></div><p className="top">MORE THAN</p><p className="app">500 VR videos</p></div>
      </div>
      <div className="vodacom"><div className="icon"></div></div>
    </div>

    <div className="step northern">
    <div className="header">
        <div className="title">
        <p>Now is the time to</p>
        <h2 className="tracking-in-expand">TAKE A DEEP BREATH</h2>
        </div>
      </div>
      <div className="cover l-northern fade-in ">
      <div className="available">
        </div>
      <div className="min-text"><p>Discover the</p>
      <p>Northern lights</p></div>
      </div>
      <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => { tracker.advancedInPreFlow("ab0-third-northern"); }}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
      <div className="custom-footer">
      <div className="rated"><div className="icon"></div><p className="top">TOP RATED</p><p className="app">app</p></div>
      <div className="price">
      <p>R7/day</p>
      <div className="logo"></div>
      <p><a href="http://n.mobi360vr.com/za/tnc-mobio360?offer=1">T&C</a></p>
      </div>
      <div className="videos"><div className="icon"></div><p className="top">MORE THAN</p><p className="app">500 VR videos</p></div>
      </div>
      <div className="vodacom"><div className="icon"></div></div>
    </div>

    </div>
  }
}


class Root1 extends React.PureComponent {
  state = {
    appStage: "intro",
  }
  render() {
    return <div className={`container-full display-${this.state.appStage}`}>

<div className="step intro">
      <div className="header">
        <div className="title">
        <p>A fully immersive</p>
        <h1 className="tracking-in-expand">digital experience</h1>
        </div>
      </div>
      <div className="cover fade-in ">
      <div className="available">
        </div>
      </div>
      <div className="btn-container">
        <button className="round-btn pulsate-fwd" onClick={() => { this.setState({ appStage: 'first' }); tracker.advancedInPreFlow("ab1-first"); }}><p className="enter">ENTER</p><p className="now">now</p></button>
        </div>
      <div className="custom-footer">
      <div className="rated"><div className="icon"></div><p className="top">TOP RATED</p><p className="app">app</p></div>
      <div className="price">
      <p>R7/day</p>
      <div className="logo"></div>
      <p><a href="http://n.mobi360vr.com/za/tnc-mobio360?offer=1">T&C</a></p>
      </div>
      <div className="videos"><div className="icon"></div><p className="top">MORE THAN</p><p className="app">500 VR videos</p></div>
      </div>
      <div className="vodacom"><div className="icon"></div></div>

    </div>

    <div className="step first">
       <SimpleSlider iniTracker={(k)=> (tracker.advancedInPreFlow(k),console.log(k))}/> 
       <div className="custom-footer">
      <div className="rated"><div className="icon"></div><p className="top">TOP RATED</p><p className="app">app</p></div>
      <div className="price">
      <p>R7/day</p>
      <div className="logo"></div>
      <p><a href="http://n.mobi360vr.com/za/tnc-mobio360?offer=1">T&C</a></p>
      </div>
      <div className="videos"><div className="icon"></div><p className="top">MORE THAN</p><p className="app">500 VR videos</p></div>
      </div>
      <div className="vodacom"><div className="icon"></div></div>
    </div>

    </div>
  }
}

export default Root