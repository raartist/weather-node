const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=00f1ce7f3c4ad101c27e52413be2ca4c&query=${latitude}&${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("put some nice string to search.", undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

module.exports = forecast;
