import request from "request";

export function callv1(event: any) {
  var options = {
    uri: "https://de-pacman.sam-media.com/api/v1/store",
    method: "POST",
    json: event
  };

  request(options, function(error, response, body) {
    if (!!error && response.statusCode != 200) {
      console.error("Error in recording v1 event:", error, body)
    } else {
      // thank you!
    }
  });
}
