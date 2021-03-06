// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');
//Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder(folder names is "website"). This connects the local server to the client side code.
app.use(express.static('website'));  

// Setup Server
const port = 8080;

//Callback
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
});  

//GET route to return endpoint data. Whenever the homepage is visited,
//the GET request is triggered, and a long string of data is returned
app.get('/fetchWeatherData', (req, res) => {
    console.log(projectData)
    res.send(projectData)
});

// POST route to store data to then be used in the future, 
//and accessed through a get request
app.post('/saveWeatherData', (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.send(projectData)
});