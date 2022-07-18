const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

const https = require("https");

const port = 3000;

app.post("/response", (req,res) => {

  inputs = req.body;

  const city = inputs['city'];
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=610c3e39159b9a418b4ca902ae61c651&units="+units;
  https.get(url, (response) => {
    console.log(response.statusCode)

    response.on("data", (data) => {
      const weather_data = JSON.parse(data);
      const temperature = weather_data.main.temp;
      const feels_like = weather_data.main.feels_like;
      const temp_min = weather_data.main.temp_min;
      const temp_max = weather_data.main.temp_max;
      const pressure = weather_data.main.pressure;
      const humidity = weather_data.main.humidity;
      console.log(temperature);
      res.send("The current temperature in "+city+" is "+temperature);
    })
  })
  // res.sendFile(__dirname+"/index.html")
})

app.get("/", (req,res) => {

  // inputs = req.body;
  //
  // const city = inputs['city'];
  // const units = "metric";
  // const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=610c3e39159b9a418b4ca902ae61c651&units="+metric;
  // https.get(url, (res) => {
  //   console.log(res.statusCode)
  //
  //   res.on("data", (data) => {
  //     const weather_data = JSON.parse(data);
  //     const temperature = weather_data.main.temp;
  //     const feels_like = weather_data.main.feels_like;
  //     const temp_min = weather_data.main.temp_min;
  //     const temp_max = weather_data.main.temp_max;
  //     const pressure = weather_data.main.pressure;
  //     const humidity = weather_data.main.humidity;
  //     console.log(temperature);
  //   })
  // })
  res.sendFile(__dirname+"/index.html")
})

app.listen(port, () => {
  console.log("Go to http://localhost:"+port)
})
