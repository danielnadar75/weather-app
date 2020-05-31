const path = require('path');
const express = require('express'); 
const hbs = require('hbs');
const geocode = require('./util/geocode');
const forecast = require('./util/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../tempalate/views');
const partialsPath = path.join(__dirname, '../tempalate/partials')

// Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>  {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Nadar',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daniel Nadar'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Get all the help to be a professional coder!',
        title: 'Help',
        name: 'Daniel Nadar',
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address to search.'
        }) 
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,

            });
        })
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Help document not found',
        name: 'Daniel Nadar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page not found!',
        name: 'Daniel Nadar'
    })
})

app.listen(port, () => {
    console.log('Serving port ' + port);
});
