import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
    initialState,
    mockedCompletedState,
    HOCProps,
    MSISDNEntryFailure,
    MSISDNEntrySuccess,
    PINEntryFailure,
    PINEntrySuccess,
    match,
    mockedPINState
} from "../../clients/lp-api/HOC";

import './assets/css/style.less?raw';
import './assets/js/script.js';
import * as RDS from "../../common-types/RemoteDataState";
import {
    SimpleOpacityTransition,
    TransitionGroup,
    simpleOpacityTransitionStyles
} from "../../common-components/simple-opacity-transition";
import { en } from "../iphone-xs/localization/addLocaleData";
import { MockObserver } from "rx";
import { mockSuccessState } from "../../clients/mpesa/TolaHOC";
import CustomTesti from "../bid-win/components/CustomTesti";
import Disclaimer from "../../legal-components/Disclaimer";
import MsisdnEntry from "../../common-components/msisdn/msisdn-input";

function Wait(props) {
    return (
      <Translate id="wait_message" />
    )
  }

const tracker = mkTracker(
    typeof window != "undefined" ? window : null,
    "xx",
    "The Sunnah Way" //TODO: replace Unknown with your page's name
);

const banner = require("./assets/img/banner-2.jpg");
const flag = require("./assets/img/malaysia-flag.svg");
const bannerIntro = require("./assets/img/banner-1.jpg");
const mastHead = require("./assets/img/en/masthead.png");
const ratingBg = require("./assets/img/rating-bg.png");
const testimonialImg = require("./assets/img/display-pic.jpg");
const redRibbon = require("./assets/img/en/red-ribbon-en.png");
const star = require("./assets/img/star.png");
const download = require("./assets/img/download.png");
const history = require("./assets/img/history.png");


class MSISDNEntryStep extends React.PureComponent<{
    msisdn: string;
    rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
    onEnd: (msisdn: string) => void;
}> {

    state = {
        locale: "en",
        msisdn: this.props.msisdn,
        introStep: 0,
        introStep2: 0,
        introStep3: 0,
        headlineMain: 1,
        mastheadEN: 1,
    };

    defaultLang = () => {
        document.getElementsByTagName('html')[0].setAttribute("lang", "en");
    }

    componentDidMount() {
        this.defaultLang();
    }

    selectIntro = () => {
        this.setState({
            introStep: 1
        });
    };

    selectIntro2 = () => {
        this.setState({
            introStep: 1,
            introStep2: 1
        });
    };

    selectIntro3 = () => {
        this.setState({
            introStep3: 1,
            headlineMain: 0
        });
    };

    render() {
        return (


            <form
                onSubmit={ev => {
                    ev.preventDefault();
                    this.props.onEnd(this.state.msisdn);
                }}
            >




                <div className={"black-bg fade-in-fwd hidden " + (this.state.introStep2 === 1 ? "active" : "")}></div>
                <div className="wrapper">
                    <div className="red-ribbon red-ribbon-img">
                    </div>
                    <img className={"banner-intro banner hidden " + (this.state.introStep === 0 ? "active" : "")}
                        src={bannerIntro} alt="The Sunnah Way" />

                    <img
                        className={"banner-honey banner hidden fade-in-bck " + (this.state.introStep === 1 ? "active" : "")}
                        src={banner} alt="The Sunnah Way" />

                    <div className="headline-container masthead-container masthead-img">
                    </div>
                    <div className="rating">
                        <img src={ratingBg} alt="5 Star Rating" />
                    </div>
                    <div className="content">
                        <div className="star">
                            <img src={star} alt="5 Star Rating" />
                        </div>
                        <div className="rating-text">
                            <Translate id="rating"></Translate>
                        </div>

                        {/*This is Main Intro*/}
                        <div className={
                            "content-intro " +
                            (this.state.introStep === 0 ? "active" : "")
                        }>
                            <div className="body-copy-main center">
                                <Translate id="introduction"></Translate><strong><Translate id="prophet-bold"></Translate></strong>
                            </div>

                            <button onClick={this.selectIntro} type="button" className="btn uppercase more pulsate-fwd ">
                                <Translate id="discover-more"></Translate>
                            </button>
                        </div>

                        {/*This is Honey Intro*/}
                        <div className={
                            "content-honey " +
                            (this.state.introStep === 1 ? "active" : "")
                        }>
                            <h3><Translate id="honey"></Translate></h3>
                            <div className="body-copy center fade-in-bck ">
                                <Translate id="honey-description"></Translate><br></br>
                                <Translate id="honey-description-2"></Translate>
                            </div>

                            <button onClick={this.selectIntro2} type="button" className="btn uppercase now pulsate-fwd ">
                                <Translate id="unlock"></Translate>
                            </button>
                        </div>


                        <CustomTesti
                            className="sunnah-testimonials"
                            testimonials={
                                [
                                    {
                                        Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                                        Name: () => <span className="testimonials-name"> - <Translate id="ahmed"></Translate></span>,
                                        stars: 5
                                    },
                                    {
                                        Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                                        Name: () => <span className="testimonials-name"> - <Translate id="latifa"></Translate></span>,
                                        stars: 5
                                    },
                                    {
                                        Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                                        Name: () => <span className="testimonials-name"> - <Translate id="karim"></Translate></span>,
                                        stars: 5
                                    }
                                ]
                            }
                        />


                    </div>

                    {/*This is Popup Number Section*/}
                    <div className={"phone-number-wrapper slide-in-bottom hidden " +
                        (this.state.introStep2 === 1 ? "active" : "")
                    }>
                        <div className="headline ">
                            <Translate id="enter-your-number"></Translate>
                        </div>
                        {/* <div className="flag">
                            <img src={flag} alt="Malaysia Flag" />
                            <input type="text" className="code" placeholder="Phone number" value={this.state.msisdn}
                                onChange={ev => this.setState({ msisdn: ev.target.value })} />
                        </div> */}
                        <div className="input-container">
                            <div className="number-entry">
                                <MsisdnEntry maxLength={8}
                                    onChange={(msisdn) => this.setState({ msisdn })}
                                    countryCode={'+974'}></MsisdnEntry>

                                <button onClick={this.selectIntro3} className="btn btn--small-margin uppercase" type="submit"
                                    disabled={RDS.IsLoading(this.props.rds)}><Translate id="get-exclusive"></Translate>
                                </button>
                            </div>
                        </div>
                        {RDS.WhenLoading(null, () => <Wait />)(this.props.rds)}
                        <div className="sub-headline fade-in-top">
                            <div className="left-icon">
                                <img src={download} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <span className="red-bold"> 86,234</span> <strong><Translate id="downloads"></Translate></strong>
                                <br />
                                <span className="text-sm"> <Translate id="in-last-7-days"></Translate></span>
                            </div>
                        </div>
                        <hr className="no-margin-padding" />
                        <div className="sub-headline fade-in-top-2">
                            <div className="left-icon">
                                <img src={history} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <strong><Translate id="most-downloads"></Translate></strong>
                                <br />
                                <span className="text-sm"> <Translate id="less-than-a-minute"></Translate></span>
                            </div>
                        </div>
                        <div className="error-msg">
                            {
                                RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate
                                    id={err.errorType} />)(this.props.rds)
                            }
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

class PINEntryStep extends React.PureComponent
    <{
        msisdn: string;
        rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
        backToStart: () => void;
        onEnd: (pin: string) => void;
    }> {
    state = {
        locale: "en",
        pin: ""
    };

    defaultLang = () => {
        document.getElementsByTagName('html')[0].setAttribute("lang", "en");
    }

    render() {
        return (
            <form
                onSubmit={ev => {
                    ev.preventDefault();
                    this.props.onEnd(this.state.pin);
                }}
            >
                <div className="black-bg"></div>
                <div className="wrapper">
                    <div className="red-ribbon red-ribbon-img">
                    </div>
                    <img className="banner-honey banner " src={banner} alt="The Sunnah Way" />
                    <div className="headline-container masthead-container masthead-img">
                    </div>
                    <div className="rating">
                        <img src={ratingBg} alt="5 Star Rating" />
                    </div>
                    <div className="content">
                        <div className="star">
                            <img src={star} alt="5 Star Rating" />
                        </div>
                        <div className="rating-text">
                            <Translate id="rating"></Translate>
                        </div>

                        {/*This is Honey Intro*/}
                        <div className="content-honey active">
                            <h3><Translate id="honey"></Translate></h3>
                            <div className="body-copy center">
                                <Translate id="honey-description"></Translate><br></br>
                                <Translate id="honey-description-2"></Translate>
                            </div>

                            <button type="submit" className="btn uppercase now">
                                <Translate id="unlock"></Translate>
                            </button>
                        </div>

                        {/*This is Testimonial Intro*/}
                        {/* <CustomTesti
                            className="sunnah-testimonials"
                            testimonials={
                                [
                                    {
                                        Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                                        Name: () => <span className="testimonials-name"> - <Translate id="ahmed"></Translate></span>,
                                        stars: 5
                                    },
                                    {
                                        Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                                        Name: () => <span className="testimonials-name"> - <Translate id="latifa"></Translate></span>,
                                        stars: 5
                                    },
                                    {
                                        Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                                        Name: () => <span className="testimonials-name"> - <Translate id="karim"></Translate></span>,
                                        stars: 5
                                    }
                                ]
                            }
                        /> */}
                    </div>
                    {/*This is Popup Number Section*/}
                    <div className="phone-number-wrapper">

                        <div className="headline">
                            <Translate id="we_just_sent_a_pin" />
                        </div>
                        <div className="pin code sunnah-pin">
                            <input
                                maxLength={10}
                                value={this.state.pin}
                                onChange={ev => this.setState({ pin: ev.target.value })}
                            />
                            <button className="btn btn--small-margin uppercase" type="submit" disabled={RDS.IsLoading(this.props.rds)}><Translate id="verify"></Translate></button>
                            {RDS.WhenLoading(null, () => <Wait />)(this.props.rds)}
                        </div>
                        <div className="pin-message">
                            {
                                RDS.match({
                                    failure: (err: PINEntryFailure) => (
                                        <div>
                                            <div><Translate id={err.errorType} /></div>
                                            <Translate id="if_not_your_mobile" values={{
                                                phone: this.props.msisdn
                                            }} />&nbsp;
                                    <a onClick={() => this.props.backToStart()}>
                                                <Translate id="click_here_to_change_your_number" />
                                            </a>
                                        </div>
                                    ),
                                    nothingYet: () => (
                                        <div className="pin-message">
                                            <Translate id="didnt_receive_pin_yet" values={{
                                                phone: this.props.msisdn
                                            }} />&nbsp;
                                    <a onClick={() => this.props.backToStart()}>
                                                <Translate id="click_here_to_change_your_number" />
                                            </a>
                                        </div>
                                    ),
                                    loading: () => null,
                                    success: () => null
                                })(this.props.rds)
                            }
                        </div>
                        <div className="sub-headline">
                            <div className="left-icon">
                                <img src={download} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <span className="red-bold"> 86,234</span> <strong><Translate id="downloads"></Translate></strong>
                                <br />
                                <span className="text-sm"> <Translate id="in-last-7-days"></Translate></span>
                            </div>
                        </div>
                        <hr className="no-margin-padding" />
                        <div className="sub-headline">
                            <div className="left-icon">
                                <img src={history} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <strong><Translate id="most-downloads"></Translate></strong>
                                <br />
                                <span className="text-sm"> <Translate id="less-than-a-minute"></Translate></span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="">
    <div className="black-bg"></div>
    <div className="wrapper">
        <div className="red-ribbon red-ribbon-img">
        </div>
        <img className="banner-honey banner " src={banner} alt="The Sunnah Way" />
        <div className="headline-container masthead-container masthead-img">
        </div>
        <div className="rating">
            <img src={ratingBg} alt="5 Star Rating" />
        </div>
        <div className="content">
            <div className="star">
                <img src={star} alt="5 Star Rating" />
            </div>
            <div className="rating-text">
                <Translate id="rating"></Translate>
            </div>

            {/*This is Honey Intro*/}
            {/* <div className="content-honey active">
                <h3><Translate id="honey"></Translate></h3>
                <div className="body-copy center">
                    <Translate id="honey-description"></Translate><br></br>
                    <Translate id="honey-description-2"></Translate>
                </div>

                <button type="submit" className="btn uppercase now">
                    <Translate id="unlock"></Translate>
                </button>
            </div> */}

            {/*This is Testimonial Intro*/}
            {/* <CustomTesti
                className="sunnah-testimonials"
                testimonials={
                    [
                        {
                            Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                            Name: () => <span className="testimonials-name"> - <Translate id="ahmed"></Translate></span>,
                            stars: 5
                        },
                        {
                            Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                            Name: () => <span className="testimonials-name"> - <Translate id="latifa"></Translate></span>,
                            stars: 5
                        },
                        {
                            Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                            Name: () => <span className="testimonials-name"> - <Translate id="karim"></Translate></span>,
                            stars: 5
                        }
                    ]
                }
            /> */}
        </div>

        <div className="phone-number-wrapper custom-height">
            <div className="headline">
                <span className="red-bold-lg"> <Translate id="congratulations"></Translate></span>
                <br /><br />
                <Translate id="we-got-your-confirmation"></Translate> <span className="red-bold"> <Translate id="healthy-eating"></Translate></span>
            </div>
             {/* <a className="btn btn--small-margin uppercase" href={finalUrl}><Translate id="download-now"></Translate></a>
           <div className="sub-headline">
                <div className="left-icon">
                    <img src={download} alt="Downloads" />
                </div>
                <div className="align-left left-text">
                    <span className="red-bold"> 86,234</span> <strong><Translate id="downloads"></Translate></strong>
                    <br />
                    <span className="text-sm"> <Translate id="in-last-7-days"></Translate></span>
                </div>
            </div>
            <hr className="no-margin-padding" />
            <div className="sub-headline">
                <div className="left-icon">
                    <img src={history} alt="Downloads" />
                </div>
                <div className="align-left left-text">
                    <strong><Translate id="most-downloads"></Translate></strong>
                    <br />
                    <span className="text-sm"> <Translate id="less-than-a-minute"></Translate></span>
                </div>
            </div> */}
        </div>
    </div>
</div>;

class Root extends React.PureComponent<HOCProps> {
    state = {
        locale: "en",
        msisdn: "",
    };

    defaultLang = () => {
        document.getElementsByTagName('html')[0].setAttribute("lang", "en");
    }

    render() {
        return (
            <TranslationProvider locale={this.state.locale}>
                <TransitionGroup className={simpleOpacityTransitionStyles.group}>
                    {match({
                        msisdnEntry: rds => (
                            <SimpleOpacityTransition key="msisdnEntry">
                                <MSISDNEntryStep
                                    msisdn={this.state.msisdn}
                                    rds={rds}
                                    onEnd={msisdn => {
                                        this.setState({ msisdn });
                                        this.props.actions.submitMSISDN(window, null, msisdn);
                                    }}
                                />
                            </SimpleOpacityTransition>
                        ),
                        pinEntry: rds => (
                            <SimpleOpacityTransition key="pinEntry">
                                <PINEntryStep
                                    onEnd={pin => this.props.actions.submitPIN(pin)}
                                    backToStart={() => this.props.actions.backToStart()}
                                    msisdn={this.state.msisdn}
                                    rds={rds}
                                />
                            </SimpleOpacityTransition>
                        ),
                        completed: ({ finalUrl }) => (
                            <SimpleOpacityTransition key="completed">
                                <TQStep finalUrl={finalUrl} />
                            </SimpleOpacityTransition>
                        )
                    })(this.props.currentState)}
                    <div className="wrapper">
                        <button type="button" className="language-switcher"
                            onClick={() => {
                                if (this.state.locale === "en") {
                                    this.setState({ locale: "ar" })
                                    document.getElementsByTagName('html')[0].setAttribute("lang", "ar")
                                } else {
                                    this.setState({ locale: "en" })
                                    document.getElementsByTagName('html')[0].setAttribute("lang", "en")
                                }
                            }}
                        >{
                                this.state.locale === "ar"
                                    ? "EN"
                                    : "عربى"
                            }</button>
                    </div>

                </TransitionGroup>
            </TranslationProvider>
        );
    }
}

export default HOC(tracker, Root)(mockedCompletedState);
