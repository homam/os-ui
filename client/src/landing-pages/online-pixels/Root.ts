import mkTracker, { queryString } from "../../pacman/record";

if(typeof window != 'undefined') {

  const redirectUrl = decodeURIComponent(queryString(window.location.search, 'redirect') || '')

  const tracker = mkTracker(
    typeof window != "undefined" ? window : null,
    (queryString(window.location.search, 'country') || 'xx').toLowerCase(),
    "Unknown" //TODO: replace Unknown with your page's name
  );

  window.dataLayer.push({
    view: 'pixels'
  })

  if(!!redirectUrl && redirectUrl.length > 0) {
    setTimeout(() => {
      window.location.href = redirectUrl
    }, 2500);
  }
}
export default () => {

}
