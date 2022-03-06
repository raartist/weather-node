const request = require("request");

const geocode = (address, callback) => {
  const mapBox_url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY29yZXVubG9ja2VkIiwiYSI6ImNreG10dTRyYTVmcHcyeG81ZHIwM2RqaGIifQ.JfgGZJ0soreEA7vybC73kA&limit=1";

  request({ url: mapBox_url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the network!", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("Try another search query!", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].geometry.coordinates[1],
        longitude: response.body.features[0].geometry.coordinates[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
