import {IPacman} from './types'

/*
    From Vlad
*/

export default function(d: Document, w: Window, n: Navigator, pacman: IPacman) {

  var vp = "hidden";
  (vp in d) || ((vp = "mozHidden") in d) || ((vp = "webkitHidden") in d) || ((vp = "msHidden") in d);
  var r = function(f) {
      try {
          var o = f.apply(this, arguments);
          return (typeof(o) == typeof(true)) ? +o : o;
      } catch (e) { return null }
  },
  ua = n.userAgent.toLowerCase(),
  re = "CSS1Compat" == document.compatMode ? document.documentElement : document.body || document.documentElement,
  pv = {
      't': 'pageview',
      's': 0,
      'tz': -(new Date).getTimezoneOffset(),
      'n': r(function () { return Notification.permission }),
      'f': r(function () { return w.top != w.self }),
      'nt': r(function () { return n.connection.type || null }),
      'ns': r(function () { return n.connection.effectiveType || null }),
      'l': r(function () {
          var a = w.navigator ? n.language || n.userLanguage || n.browserLanguage || n.systemLanguage : null;
          return "[object String]" == Object.prototype.toString.call(a) ? a.toLowerCase() : null
      }),
      'lz': r(function () {return n.languages.join(' ').toLowerCase()}),
      'vw': r(function () {return re.clientWidth || w.innerWidth}),
      'vh': r(function () {return re.clientHeight || w.innerHeight}),
      'sw': r(function () {return w.screen.width}),
      'sh': r(function () {return w.screen.height}),
      'sd': w.screen.colorDepth || null,
      'sr': w.devicePixelRatio || null,
      'np': r(function () {return n.platform || null}),
      'dnt': r(function () {
          if (typeof n.doNotTrack !== 'undefined' && n.doNotTrack !== null) {
              if (n.doNotTrack == 'yes') { return true } else if (n.doNotTrack == 'no') { return false }
              return !!n.doNotTrack;
          } else if (typeof w.doNotTrack !== 'undefined' && w.doNotTrack !== null) {
              return !!w.doNotTrack;
          }
          return null;
      }),
      'c': r(function () {return n.cookieEnabled}),
      'ss': r(function () {return !!w.sessionStorage}),
      'wd': r(function () {return !!n.webdriver}),
      'ls': r(function () {return !!w.localStorage}),
      'ib': r(function () {return !!w.indexedDB}),
      'od': r(function () {return !!w.openDatabase}),
      'hf': r(function () {return !!d.hasFocus()}),
      'iv': r(function () {return !!!d[vp]}),
      'll': r(function () {return n.languages[0].substr(0, 2) !== n.language.substr(0, 2)}),
      'lr': r(function () {return w.screen.width < w.screen.availWidth || w.screen.height < w.screen.availHeight}),
      'lo': r(function () {
          var cpu = n.oscpu, p = n.platform.toLowerCase();
          if (ua.indexOf('windows phone') >= 0 || ua.indexOf('win') >= 0) return null;
          if (ua.indexOf('android') >= 0)
              return typeof n.plugins === 'undefined' || p.indexOf('win') >= 0 || p.indexOf('mac') >= 0 || p.indexOf('ipad') >= 0 || p.indexOf('ipod') >= 0 || p.indexOf('iphone') >= 0;
          if (ua.indexOf('linux') >= 0) return null;
          if (ua.indexOf('iphone') >= 0 || ua.indexOf('ipad') >= 0)
              return (typeof n.plugins === 'undefined' || p.indexOf('win') >= 0 || p.indexOf('linux') >= 0 || p.indexOf('android') >= 0 || p.indexOf('pike') >= 0);
          return null;
      }),
      'lb': r(function () {
          var ps = n.productSub, t = eval.toString().length;
          if (ua.indexOf('firefox') >= 0) return t !== 37;
          if (ua.indexOf('opera') >= 0 || ua.indexOf('opr') >= 0) return ps !== '20030107' || t !== 33;
          if (ua.indexOf('chrome') >= 0) return ps !== '20030107' || t !== 33;
          if (ua.indexOf('safari') >= 0) return ps !== '20030107' || t !== 37;
          if (ua.indexOf('trident') >= 0) return t !== 39;
          return null;
      })
  };
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', pacman.server_url, true);
  xhr.send(JSON.stringify({
      'r': pacman.r,
      'm': pacman.m,
      'b': pacman.b++,
      'd': [{'t': 'pageview', 's': 0, 'a': pv}]
  }));
  
}