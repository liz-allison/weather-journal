// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser')
//Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder(folder names is "website")
app.use(express.static('website'));  

//GET route to return endpoint data
app.get('/', (req, res) => {
    res.send(projectData);
});

// POST route to store data
const data = [];
app.post('/', addZipAndFeelings);

function addZipAndFeelings (req,res){
    data.push(req.body);
};

// Setup Server
const port = 8000

//Callback
const server = app.listen(port, ()=> {
    console.log(`running on localhost: ${port}`)});  