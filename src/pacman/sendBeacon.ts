export default function(root : Window) : (url: string, data?: any) => void {

  var isSupported = (('navigator' in root) &&
                     ('sendBeacon' in root.navigator));

  var sendBeacon = function (url, data) {
    var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url, false);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', '*/*');
    if (typeof data === 'string') {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      xhr.responseType = 'text/plain';
    } 
    
    /*else if (({}).toString.call(data) === '[object Blob]') {
      if (data.type) {
        xhr.setRequestHeader('Content-Type', data.type);
      }
    }*/

    try {
      xhr.send(data);
    } catch (error) {console.error(error)}
    return true;
  }

  if (isSupported) {
    sendBeacon = navigator.sendBeacon.bind(navigator);
  }

  return sendBeacon
}