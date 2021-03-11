const express = require("express");
const bodyParser = require("body-parser");
const https = require ("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
        const unit = "metric";
        const apiKey = "bef59ca4cda1ef9fe53966342b5bc9c8";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
        
  

   https.get(url, function(response) {
        console.log("Status code is: " + response.statusCode);

        response.on("data", function(data) {           

            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description; 
            const temp = weatherData.main.temp
            const weatherIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

 
            res.write("<h1> Weather App </h1>");

            res.write("<p> The temperature in <b>" + query +  "</b> is  <b>" + temp + "</b> degree Celcius </p>");

            res.write("<p> The weather condistion is <b>" + description + "</b> </p>");

            res.write("<img src =" + imageUrl +">");

            res.write('<br> <a href="/"> Reset </a>');

            res.send();


        });
        

    } );
});


app.listen(3000, function() {
    console.log("server is running on port 3000");
});

    
