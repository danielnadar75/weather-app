const request = require('request');


function forecast(longitude, latitude, callback) {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon='+ longitude +'&appid=51b5a70cc96dfcb3aa6f0e16e8194acd&units=metric';
    
    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.message) {
            callback('Unable to find location, try another search.', undefined);
        } else {
            callback( undefined, body.current.weather[0].description + ' through out the day.' + ' It is currently ' + body.current.temp + ' degrees out. There is a ' + body.current.feels_like + '% chances of rain.');
    
        }
    })
}


module.exports = forecast;