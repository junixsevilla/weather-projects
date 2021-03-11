const express = require("express");
const https = require ("https");

const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Christchurch&appid=bef59ca4cda1ef9fe53966342b5bc9c8&units=metric"
    
    https.get(url, function(response) {
        console.log("Status code is: " + response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description; 
            const temp = weatherData.main.temp
            const weatherIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";


            console.log("Weather description : " + description);
            console.log("Temp is: " + temp);

            res.write("<p> The temperature in Christchurch is " + temp + " degree Celcius </p>");

            res.write("<p> The weather condistion is " + description + "</p>");

            res.write("<img src =" + imageUrl +">");

            res.send();

            // reverse of parse = stringify
            //const object =  {
            //    name: "Junix",
            //    age: 30,
            //}
            //console.log(JSON.stringify(object));
        });
        

    } );

  // res.send("Server is up and running!");
});



app.listen(3000, function() {
    console.log("server is running on port 3000");
});

// api key: bef59ca4cda1ef9fe53966342b5bc9c8
