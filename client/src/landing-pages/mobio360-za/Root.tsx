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

function gtag(...args) {window.dataLayer.push(...args)}

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
        <button  className="round-btn pulsate-fwd" onClick={() => { this.setState({ appStage: 'first' }); tracker.advancedInPreFlow("ab0-first"); }}><p className="enter">ENTER</p><p className="now">now</p></button>
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
        <a href="https://myvodacom.secure.vodacom.co.za/cloud/dcb/doi?acr=33f6019941df28418ef388e7b2cef2159e77d82126bea3c68e8c29947c5e5b9a3723bf9870d245c3755966197649387c37f54189e7d310d13c9c3454568ac26700568297070368bf88b2d7d6025f234adb2f9a3e61880aa4d1b05e106cf962c551eae9e6662808d58c3f2630afc9795d7b709fca847f0675cf1b703ffec04a5b0fdde04fc28eff3e1f1b00920e1369a4f23727513e524e2b3a4d680fa55b3c2d5ab95434a05661a908cf29c374f4b5b14224df3488820bb438ecc8129faa15712033e16a80d235da27030c851de734795d3efd4a4705ac794a4e9ac67bc1743d5cf47b5d9e5a46d686b95c8d7e7666e622f6ce20def9c2001568a84e4bd2d02b&custom-message=You%20are%20about%20to%20subscribe%20to%20Mobio360%20@%20R7.00%20per%20day.&service-name=Mobio360&transaction-id=5c740a0df126bd1cc2ad3bd2&partner-name=DCB_MX_SM&custom-consent-msg-hash=c32d6ff7a55a8a9706ba38cb4c3c71549880dd4240963813391827521a8ab3978b39409e9aa8fa9e31240e090d10ed8a4affc771efcbd54f031b6c7f5b58269a&client-txn-id=edbdab0f398343d48855380852a60b62"  className="round-btn pulsate-fwd" onClick={() => { tracker.advancedInPreFlow("ab0-third-europe"); }}><p className="enter">ENTER</p><p className="now">now</p></a>
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
        <a href="https://myvodacom.secure.vodacom.co.za/cloud/dcb/doi?acr=33f6019941df28418ef388e7b2cef2159e77d82126bea3c68e8c29947c5e5b9a3723bf9870d245c3755966197649387c37f54189e7d310d13c9c3454568ac26700568297070368bf88b2d7d6025f234adb2f9a3e61880aa4d1b05e106cf962c551eae9e6662808d58c3f2630afc9795d7b709fca847f0675cf1b703ffec04a5b0fdde04fc28eff3e1f1b00920e1369a4f23727513e524e2b3a4d680fa55b3c2d5ab95434a05661a908cf29c374f4b5b14224df3488820bb438ecc8129faa15712033e16a80d235da27030c851de734795d3efd4a4705ac794a4e9ac67bc1743d5cf47b5d9e5a46d686b95c8d7e7666e622f6ce20def9c2001568a84e4bd2d02b&custom-message=You%20are%20about%20to%20subscribe%20to%20Mobio360%20@%20R7.00%20per%20day.&service-name=Mobio360&transaction-id=5c740a0df126bd1cc2ad3bd2&partner-name=DCB_MX_SM&custom-consent-msg-hash=c32d6ff7a55a8a9706ba38cb4c3c71549880dd4240963813391827521a8ab3978b39409e9aa8fa9e31240e090d10ed8a4affc771efcbd54f031b6c7f5b58269a&client-txn-id=edbdab0f398343d48855380852a60b62"  className="round-btn pulsate-fwd" onClick={() => { tracker.advancedInPreFlow("ab0-third-mountain"); }}><p className="enter">ENTER</p><p className="now">now</p></a>
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
        <a href="https://myvodacom.secure.vodacom.co.za/cloud/dcb/doi?acr=33f6019941df28418ef388e7b2cef2159e77d82126bea3c68e8c29947c5e5b9a3723bf9870d245c3755966197649387c37f54189e7d310d13c9c3454568ac26700568297070368bf88b2d7d6025f234adb2f9a3e61880aa4d1b05e106cf962c551eae9e6662808d58c3f2630afc9795d7b709fca847f0675cf1b703ffec04a5b0fdde04fc28eff3e1f1b00920e1369a4f23727513e524e2b3a4d680fa55b3c2d5ab95434a05661a908cf29c374f4b5b14224df3488820bb438ecc8129faa15712033e16a80d235da27030c851de734795d3efd4a4705ac794a4e9ac67bc1743d5cf47b5d9e5a46d686b95c8d7e7666e622f6ce20def9c2001568a84e4bd2d02b&custom-message=You%20are%20about%20to%20subscribe%20to%20Mobio360%20@%20R7.00%20per%20day.&service-name=Mobio360&transaction-id=5c740a0df126bd1cc2ad3bd2&partner-name=DCB_MX_SM&custom-consent-msg-hash=c32d6ff7a55a8a9706ba38cb4c3c71549880dd4240963813391827521a8ab3978b39409e9aa8fa9e31240e090d10ed8a4affc771efcbd54f031b6c7f5b58269a&client-txn-id=edbdab0f398343d48855380852a60b62"  className="round-btn pulsate-fwd" onClick={() => { tracker.advancedInPreFlow("ab0-third-northern"); }}><p className="enter">ENTER</p><p className="now">now</p></a>
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
     
    </div>


    </div>
  }
}

export default Root