if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

const api_key = process.env.API_KEY;

app.post('/', (req, res) => {
    country = req.body.cityName;
    //console.log(api_key);
    const url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + country + "&appid=" + api_key + "&units=metric";
    console.log(url1);
    https.get(url1, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            //console.log(temp);

            const des = weatherData.weather[0].description;
            //console.log(des);
            const icon = weatherData.weather[0].icon;
            //JSON.stringify(object);
            const url2 = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in "+ country +" is " + temp + " degress Celcius.\n</h1>");
            res.write("<p>The weather is currently " + des + "</p>");
            res.write("<img src=" + url2 + ">");
            res.send();
        });
    });
})


app.listen(process.env.PORT || 3000 , function(){
    console.log("running....successfully");
});