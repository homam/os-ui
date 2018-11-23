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

import './assets/css/style.css?raw';
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


const tracker = mkTracker(
    typeof window != "undefined" ? window : null,
    "xx",
    "The Sunnah Way" //TODO: replace Unknown with your page's name
);

const banner = require("./assets/img/banner-2.jpg");
const flag = require("./assets/img/malaysia-flag.svg");
const bannerIntro = require("./assets/img/banner-1.jpg");
const mastHead = require("./assets/img/masthead.png");
const ratingBg = require("./assets/img/rating-bg.png");
const testimonialImg = require("./assets/img/display-pic.jpg");
const redRibbon = require("./assets/img/red-ribbon.png");
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
        headlineMain: 1
    };

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

                <button className="language-switcher"
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
                            ? "Arabic"
                            : "English"
                    }</button>


                <div className={"black-bg fade-in-fwd hidden " + (this.state.introStep2 === 1 ? "active" : "")}></div>
                <div className="wrapper">
                    <div className="red-ribbon">
                        <img src={redRibbon} alt="Tagline" />
                    </div>
                    <img className={"banner-intro banner hidden " + (this.state.introStep === 0 ? "active" : "")}
                        src={bannerIntro} alt="The Sunnah Way" />

                    <img
                        className={"banner-honey banner hidden fade-in-bck " + (this.state.introStep === 1 ? "active" : "")}
                        src={banner} alt="The Sunnah Way" />

                    <div className="headline-container">
                        <img className="masthead" src={mastHead} alt="The Sunnah Way" />
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
                                Discover the <strong>Prophet Muhammad's</strong> great foods that used to eat that
                                proved to be useful for health
                            </div>

                            <button onClick={this.selectIntro} type="submit" className="btn uppercase more pulsate-fwd ">
                                Discover More
                            </button>
                        </div>

                        {/*This is Honey Intro*/}
                        <div className={
                            "content-honey " +
                            (this.state.introStep === 1 ? "active" : "")
                        }>
                            <h3>HONEY</h3>
                            <div className="body-copy center fade-in-bck ">
                                “Honey is a remedy for every illness and the quran is a remedy for all illness of the
                                mind,
                                therefore i recommend to you remedies, the quran and honey”. (bukhari)
                            </div>

                            <button onClick={this.selectIntro2} type="submit" className="btn uppercase now pulsate-fwd ">
                                Discover Now
                            </button>
                        </div>

                        {/*This is Testimonial Intro*/}
                        {/* <div className="testimonial">
                            <div className="img-container">
                                <img className="rounded" src={testimonialImg} alt="User View"/>
                            </div>
                            <div className="text-container">
                                <div className="text">
                                    The best of muslim home cooking tips ever based on the Prophet Muhammad's way
                                    <br/>
                                    <br/>
                                    <i>- Ahmad</i>
                                </div>
                            </div>
                        </div> */}

                        <CustomTesti
                            className="sunnah-testimonials"
                            testimonials={
                                [
                                    {
                                        Message: () => <span className="message">Wow! I couldn't believe my eyes when I received my iPhone X!</span>,
                                        Name: () => <span className="testimonials-name"> -Syazalina</span>,
                                        stars: 5
                                    },
                                    {
                                        Message: () => <span className="message">Wow! I couldn't believe my eyes when I received my iPhone X!</span>,
                                        Name: () => <span className="testimonials-name"> -Rahim</span>,
                                        stars: 4
                                    },
                                    {
                                        Message: () => <span className="message">I bid, confirmed and won! So happy! Thank you!</span>,
                                        Name: () => <span className="testimonials-name"> -Amira</span>,
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
                            Enter your number to get exclusive access to <span className="red-bold">Healthy Eating The Sunnah Way</span>
                        </div>
                        <div className="flag">
                            <img src={flag} alt="Malaysia Flag" />
                            <input type="text" className="code" placeholder="Phone number" value={this.state.msisdn}
                                onChange={ev => this.setState({ msisdn: ev.target.value })} />
                        </div>

                        <button onClick={this.selectIntro3} className="btn uppercase" type="submit"
                            disabled={RDS.IsLoading(this.props.rds)}>Discover More
                        </button>

                        {
                            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
                        }
                        <div className="sub-headline">
                            <div className="left-icon">
                                <img src={download} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <span className="red-bold"> 86,234</span> <strong>Downloads</strong>
                                <br />
                                <span className="text-sm"> in last 7 days</span>
                            </div>
                        </div>
                        <hr className="no-margin-padding" />
                        <div className="sub-headline">
                            <div className="left-icon">
                                <img src={history} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <strong>Most Downloads</strong>
                                <br />
                                <span className="text-sm"> Less than a minute ago</span>
                            </div>
                        </div>
                        <div>
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
        pin: ""
    };

    render() {
        return (
            <form
                onSubmit={ev => {
                    ev.preventDefault();
                    this.props.onEnd(this.state.pin);
                }}
            >
                <div className="wrapper">
                    <div className="black-bg"></div>
                    <div className="red-ribbon">
                        <img src={redRibbon} alt="Tagline" />
                    </div>
                    <img className="banner-honey banner " src={banner} alt="The Sunnah Way" />
                    <div className="headline-container">
                        <img className="masthead" src={mastHead} alt="The Sunnah Way" />
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
                            <h3>HONEY</h3>
                            <div className="body-copy center">
                                “Honey is a remedy for every illness and the quran is a remedy for all illness of the
                                mind,
                                therefore i recommend to you remedies, the quran and honey”. (bukhari)
                            </div>

                            <button type="submit" className="btn uppercase now">
                                Discover Now
                            </button>
                        </div>

                        {/*This is Testimonial Intro*/}
                        <div className="testimonial">
                            <div className="img-container">
                                <img className="rounded" src={testimonialImg} alt="User View" />
                            </div>
                            <div className="text-container">
                                <div className="text">
                                    The best of muslim home cooking tips ever based on the Prophet Muhammad's way
                                    <br />
                                    <br />
                                    <i>- Ahmad</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*This is Popup Number Section*/}
                    <div className="phone-number-wrapper">

                        <div className="headline">
                            <Translate id="we_just_sent_a_pin" />
                        </div>
                        <div className="pin code">
                            <input
                                placeholder="PIN"
                                value={this.state.pin}
                                onChange={ev => this.setState({ pin: ev.target.value })}
                            />
                            <button className="btn uppercase" type="submit" disabled={RDS.IsLoading(this.props.rds)}>Send to Confirm</button>
                            {
                                RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
                            }
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
                                <span className="red-bold"> 86,234</span> <strong>Downloads</strong>
                                <br />
                                <span className="text-sm"> in last 7 days</span>
                            </div>
                        </div>
                        <hr className="no-margin-padding" />
                        <div className="sub-headline">
                            <div className="left-icon">
                                <img src={history} alt="Downloads" />
                            </div>
                            <div className="align-left left-text">
                                <strong>Most Downloads</strong>
                                <br />
                                <span className="text-sm"> Less than a minute ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="wrapper">
    <div className="black-bg"></div>
    <div className="red-ribbon">
        <img src={redRibbon} alt="Tagline" />
    </div>
    <img className="banner-honey banner " src={banner} alt="The Sunnah Way" />
    <div className="headline-container">
        <img className="masthead" src={mastHead} alt="The Sunnah Way" />
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
            <h3>HONEY</h3>
            <div className="body-copy center">
                “Honey is a remedy for every illness and the quran is a remedy for all illness of the
                mind,
                therefore i recommend to you remedies, the quran and honey”. (bukhari)
                            </div>

            <button type="submit" className="btn uppercase now">
                Discover Now
                            </button>
        </div>

        {/*This is Testimonial Intro*/}
        <div className="testimonial">
            <div className="img-container">
                <img className="rounded" src={testimonialImg} alt="User View" />
            </div>
            <div className="text-container">
                <div className="text">
                    The best of muslim home cooking tips ever based on the Prophet Muhammad's way
                                    <br />
                    <br />
                    <i>- Ahmad</i>
                </div>
            </div>
        </div>
    </div>
    <div className="phone-number-wrapper">
        <div className="headline">
            <span className="red-bold-lg"> Congratulations!</span>
            <br /><br />
            We've got your confirmation to download <span className="red-bold"> Healthy Eating The Sunnah Way</span>
        </div>
        <a className="btn uppercase" href={finalUrl}>Download Now</a>
        <div className="sub-headline">
            <div className="left-icon">
                <img src={download} alt="Downloads" />
            </div>
            <div className="align-left left-text">
                <span className="red-bold"> 86,234</span> <strong>Downloads</strong>
                <br />
                <span className="text-sm"> in last 7 days</span>
            </div>
        </div>
        <hr className="no-margin-padding" />
        <div className="sub-headline">
            <div className="left-icon">
                <img src={history} alt="Downloads" />
            </div>
            <div className="align-left left-text">
                <strong>Most Downloads</strong>
                <br />
                <span className="text-sm"> Less than a minute ago</span>
            </div>
        </div>
    </div>

</div>;

class Root extends React.PureComponent<HOCProps> {
    state = {
        locale: "en",
        msisdn: "",
    };

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
                </TransitionGroup>
            </TranslationProvider>
        );
    }
}

export default HOC(tracker, Root)(initialState);
