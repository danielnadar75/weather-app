const request = require('request');

function forecast(longitude, latitude, callback) {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=51b5a70cc96dfcb3aa6f0e16e8194acd&units=metric'

    request( {url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.message) {
            callback('Unable to find location, try another search.', undefined);
        } else {
            callback( undefined, body.weather[0].description + '.' + ' It is currently ' + body.main.temp + ' degrees out. There is a ' + body.main.feels_like + '% chances of rain.' + ' Minimum Temperature ' + body.main.temp_min + ' degrees and Maximum Temperature ' + body.main.temp_max + ' degrees with ' + body.main.humidity + '% of humidity.');
        }
    })
}

module.exports = forecast;