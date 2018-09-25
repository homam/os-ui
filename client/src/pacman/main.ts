import {IPacman} from './types'


// import { map } from 'rxjs/operators';
import {map, bufferWhen, filter, debounceTime, first } from 'rxjs/operators';
import  {fromEvent, from, interval, empty, merge, zip } from 'rxjs';

export default function(d : Document, w: Window, loadTime: number, pacman: IPacman) {

    var precisionRound = function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    var documentProp = {
        getRootElement: function () {
            var element = d.documentElement;
            return "CSS1Compat" == d.compatMode ? element : d.body || element
        },
        getViewportSize: function () {
            var rootElement = documentProp.getRootElement();
            return [rootElement.clientWidth || w.innerWidth, rootElement.clientHeight || w.innerHeight]
        },
        getDocumentScroll: function () {
            return [w.pageXOffset || d.documentElement && d.documentElement.scrollLeft || d.body && d.body.scrollLeft || 0, w.pageYOffset || d.documentElement && d.documentElement.scrollTop || d.body && d.body.scrollTop || 0]
        }
    };

    var eventsManager = {
        getPos: function (event) {
            var b = documentProp.getRootElement(),
                c = documentProp.getDocumentScroll();
            return [event.pageX || event.clientX + c[0] - (b.clientLeft || 0) || 0, event.pageY || event.clientY + c[1] - (b.clientTop || 0) || 0]
        },
        getTarget: function (event) {
            var b = null;
            try {
                (b = event.target || event.srcElement) && !b.ownerDocument && b.documentElement && (b = b.documentElement)
            } catch (c) {
            }
            return b
        }
    };

    var getRelativeTime = function () {
        return (loadTime) ? Date.now() - loadTime  : 0;
    };

    var visibilityProperty = "hidden", visibilityChangeEvent : string;
    if (visibilityProperty in d)
        visibilityChangeEvent = 'visibilitychange';
    else if ((visibilityProperty = "mozHidden") in d)
        visibilityChangeEvent = 'mozvisibilitychange';
    else if ((visibilityProperty = "webkitHidden") in d)
        visibilityChangeEvent = 'webkitvisibilitychange';
    else if ((visibilityProperty = "msHidden") in d)
        visibilityChangeEvent = 'msvisibilitychange';

    var visibilities = visibilityChangeEvent ?
        fromEvent(d, visibilityChangeEvent).pipe(
            map(function (event) {
                return {
                    "t": d[visibilityProperty] ? 'hidden' : 'visible',
                    "s": precisionRound(getRelativeTime() / 1000, 1)
                }
            })
        ) : empty();

    var defaultMapping = map(function(event: Event) {
        return {
            "t": event.type,
            "s": precisionRound(getRelativeTime() / 1000, 1)
        }
    });

    var unload = fromEvent(w, 'beforeunload');
    var blur = fromEvent(w, 'blur').pipe(
        map(function(event) {
            return {
                "t": 'blur',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": "window"
                }
            }
        })
    );
    var focus = fromEvent(w, 'focus').pipe(
        map(function(event) {
            return {
                "t": 'focus',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": "window"
                }
            }
        })
    );
    var focusin = fromEvent(d, 'focusin').pipe(
        map(function(event) {
            return {
                "t": 'focus',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": eventsManager.getTarget(event).id
                }
            }
        })
    );
    var focusout = fromEvent(d, 'focusout').pipe(
        map(function(event) {
            return {
                "t": 'blur',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": eventsManager.getTarget(event).id
                }
            }
        })
    );
    var submit = fromEvent(d, 'submit').pipe(
        map(function(event) {
            return {
                "t": 'submit',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": eventsManager.getTarget(event).id
                }
            }
        })
    );

    var firstChange = fromEvent(d, 'change').pipe(
        map(function(event) {
            return {
                "t": 'fchange',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": eventsManager.getTarget(event).id
                }
            }
        }),
        first());

    var firstTouch = fromEvent(d, 'touchstart').pipe(
        map(function(event) {
            return {
                "t": 'ftouch',
                "s": precisionRound(getRelativeTime() / 1000, 1)
            }
        }),
        first());

    var firstMotion = fromEvent(w, 'devicemotion').pipe(
        map(function(event) {
            return {
                "t": 'fmotion',
                "s": precisionRound(getRelativeTime() / 1000, 1)
            }
        }),
        first());

    var full_load = fromEvent(w, 'load').pipe(
        map(function(event) {
            return {
                "t": 'full_load',
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "p": documentProp.getViewportSize()
                }
            }
        }));

    var html_load;
    if (d.readyState === "complete" || d.readyState === "interactive") {
        html_load = from([{
            "t": 'html_load',
            "s": precisionRound(getRelativeTime() / 1000, 1),
            "a": {
                "p": documentProp.getViewportSize()
            }
        }]);
    } else {
        html_load = fromEvent(d, 'DOMContentLoaded').pipe(
            map(function(event) {
                return {
                    "t": 'html_load',
                    "s": precisionRound(getRelativeTime() / 1000, 1),
                    "a": {
                        "p": documentProp.getViewportSize()
                    }
                }
            }));
    };

    var touchstart = fromEvent<TouchEvent>(d, 'touchstart');
    var touchend = fromEvent<TouchEvent>(d, 'touchend');

    var clicks = zip(
        touchstart,
        touchend
    ).pipe(
        filter(function(x) {
            return (x[1].timeStamp - x[0].timeStamp < 350) && x[0].touches.length == 1 && x[1].touches.length == 0
        }),
        map(function(event) {
            return {
                "t": "click",
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "e": eventsManager.getTarget(event[0].touches[0]).id,
                    "p": eventsManager.getPos(event[0].touches[0])
                }
            }
        })
    );

    var scrolls = fromEvent(w, 'scroll').pipe(
        debounceTime(500),
        map(function(event) {
            return {
                "t": event.type,
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "p": documentProp.getDocumentScroll()
                }
            }
        })
    );

    var resize = fromEvent(w, 'resize').pipe(
        debounceTime(500),
        map(function(event) {
            return {
                "t": event.type,
                "s": precisionRound(getRelativeTime() / 1000, 1),
                "a": {
                    "p": documentProp.getViewportSize()
                }
            }
        })
    );

    var stream = merge(
        clicks,
        scrolls,
        blur,
        focus,
        focusin,
        focusout,
        visibilities,
        firstTouch,
        firstChange,
        firstMotion,
        submit,
        resize,
        full_load,
        html_load
    )
    .pipe(
        bufferWhen(
            function () {
                return merge(
                    interval(7000),
                    unload,
                    blur
                )
            }
        ),
        filter(function(x) { return x.length > 0 })
    )

    var subscribe = stream.subscribe(function (x) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', pacman.server_url, true);
        xhr.send(JSON.stringify({
            'r': pacman.r,
            'm': pacman.m,
            'b': pacman.b++,
            'd': x
        }));
    });

}