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
        <a href="https://myvodacom.secure.vodacom.co.za/cloud/dcb/doi?acr=33f6019941df28418ef388e7b2cef2159e77d82126bea3c68e8c29947c5e5b9a3723bf9870d245c3755966197649387c37f54189e7d310d13c9c3454568ac26700568297070368bf88b2d7d6025f234adb2f9a3e61880aa4d1b05e106cf962c551eae9e6662808d58c3f2630afc9795d7b709fca847f0675cf1b703ffec04a5b0fdde04fc28eff3e1f1b00920e1369a4f23727513e524e2b3a4d680fa55b3c2d5ab95434a05661a908cf29c374f4b5b14224df3488820bb438ecc8129faa15712033e16a80d235da27030c851de734795d3efd4a4705ac794a4e9ac67bc1743d5cf47b5d9e5a46d686b95c8d7e7666e622f6ce20def9c2001568a84e4bd2d02b&custom-message=You%20are%20about%20to%20subscribe%20to%20Mobio360%20@%20R7.00%20per%20day.&service-name=Mobio360&transaction-id=5c740a0df126bd1cc2ad3bd2&partner-name=DCB_MX_SM&custom-consent-msg-hash=c32d6ff7a55a8a9706ba38cb4c3c71549880dd4240963813391827521a8ab3978b39409e9aa8fa9e31240e090d10ed8a4affc771efcbd54f031b6c7f5b58269a&client-txn-id=edbdab0f398343d48855380852a60b62"  className="round-btn pulsate-fwd" onClick={() => this.props.iniTracker("ab1-second-mountain")}><p className="enter">ENTER</p><p className="now">now</p></a>
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
        <a href="https://myvodacom.secure.vodacom.co.za/cloud/dcb/doi?acr=33f6019941df28418ef388e7b2cef2159e77d82126bea3c68e8c29947c5e5b9a3723bf9870d245c3755966197649387c37f54189e7d310d13c9c3454568ac26700568297070368bf88b2d7d6025f234adb2f9a3e61880aa4d1b05e106cf962c551eae9e6662808d58c3f2630afc9795d7b709fca847f0675cf1b703ffec04a5b0fdde04fc28eff3e1f1b00920e1369a4f23727513e524e2b3a4d680fa55b3c2d5ab95434a05661a908cf29c374f4b5b14224df3488820bb438ecc8129faa15712033e16a80d235da27030c851de734795d3efd4a4705ac794a4e9ac67bc1743d5cf47b5d9e5a46d686b95c8d7e7666e622f6ce20def9c2001568a84e4bd2d02b&custom-message=You%20are%20about%20to%20subscribe%20to%20Mobio360%20@%20R7.00%20per%20day.&service-name=Mobio360&transaction-id=5c740a0df126bd1cc2ad3bd2&partner-name=DCB_MX_SM&custom-consent-msg-hash=c32d6ff7a55a8a9706ba38cb4c3c71549880dd4240963813391827521a8ab3978b39409e9aa8fa9e31240e090d10ed8a4affc771efcbd54f031b6c7f5b58269a&client-txn-id=edbdab0f398343d48855380852a60b62"  className="round-btn pulsate-fwd" onClick={() => this.props.iniTracker("ab1-second-northern")}><p className="enter">ENTER</p><p className="now">now</p></a>
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
        <a href="https://myvodacom.secure.vodacom.co.za/cloud/dcb/doi?acr=33f6019941df28418ef388e7b2cef2159e77d82126bea3c68e8c29947c5e5b9a3723bf9870d245c3755966197649387c37f54189e7d310d13c9c3454568ac26700568297070368bf88b2d7d6025f234adb2f9a3e61880aa4d1b05e106cf962c551eae9e6662808d58c3f2630afc9795d7b709fca847f0675cf1b703ffec04a5b0fdde04fc28eff3e1f1b00920e1369a4f23727513e524e2b3a4d680fa55b3c2d5ab95434a05661a908cf29c374f4b5b14224df3488820bb438ecc8129faa15712033e16a80d235da27030c851de734795d3efd4a4705ac794a4e9ac67bc1743d5cf47b5d9e5a46d686b95c8d7e7666e622f6ce20def9c2001568a84e4bd2d02b&custom-message=You%20are%20about%20to%20subscribe%20to%20Mobio360%20@%20R7.00%20per%20day.&service-name=Mobio360&transaction-id=5c740a0df126bd1cc2ad3bd2&partner-name=DCB_MX_SM&custom-consent-msg-hash=c32d6ff7a55a8a9706ba38cb4c3c71549880dd4240963813391827521a8ab3978b39409e9aa8fa9e31240e090d10ed8a4affc771efcbd54f031b6c7f5b58269a&client-txn-id=edbdab0f398343d48855380852a60b62" className="round-btn pulsate-fwd" onClick={() => this.props.iniTracker("ab1-second-europe")}><p className="enter">ENTER</p><p className="now">now</p></a>
        </div>
        </div>
       
      </Slider>

    );
  }
}

export default SimpleSlider