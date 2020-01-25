const express = require('express')
const app = express()
const ejs = require('ejs')
const request = require('request')
const bodyParser = require('body-parser')

const apiKey = '4bace3f45fa6bed9671d9f09113dd0fe'

port = 3000


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
  })

app.post('/', function (req, res) {
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
  })
  
  app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})