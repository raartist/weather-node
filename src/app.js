const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const staticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);

const app = express();
const port = process.env.PORT || 4400;

app.set("views", viewsPath);

app.set("view engine", "hbs");
app.use(express.static(staticDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "Rishabh",
  });
});

app.get("/help", (req, res) => {
  res.render("temp", { title: "help page", msg: "You can get help here...", author: "Rishabh" });
});

app.get("/about", (req, res) => {
  res.render("temp", {
    title: "About me",
    msg: "This page tells lil bit about me.",
    author: "Rishabh",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "You must provide an address." });
  }

  geocode(address, (err, geocodeRes) => {
    if (err) {
      res.status(409);

      return res.send({ message: err });
    } else {
      forecast(
        { latitude: geocodeRes.latitude, longitude: geocodeRes.longitude },
        (err2, result) => {
          if (err2) {
            res.status(409);
            return res.send({ message: err2 });
          } else {
            const forecastData = `${result.weather_descriptions[0]} starting in the evening. It is currently ${result.temperature} degrees out. There is ${result.cloudcover}% chance of rain.`;
            res.send({
              forecast: forecastData,
              result,
              geocodeRes,
            });
          }
        }
      );
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("temp", { title: "404", errorMsg: "Help article not found!" });
});

app.get("*", (req, res) => {
  res.render("temp", { title: "404", errorMsg: "404 page not found!" });
});

app.listen(port, () => {
  console.log("app is listening to port no. " + port);
});
