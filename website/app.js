//Global Variables
const date = document.getElementById('date').value;
const temp = document.getElementById('temp').value;

//Use of API to access weather database
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=6e381fb440fb6a71c301f150e40464d3&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Activate event listener with generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getTemperature (baseURL, newZip, apiKey)
        .then(function(inputData) {
            postData('/saveWeatherData', {date:newDate, temp:inputData.main.temp, content:content});
        })
        .then(function(newData) {
            updateUI(); 
        })
        .catch(function(error) {
            console.log(error);
          });
}

//GET request to weather API info on the web
const getTemperature = async(baseURL, newZip, apiKey) => {
    const response = await fetch(baseURL + newZip + apiKey);
    //console.log(response);
    try {
        const inputData = await response.json();
        return inputData;
    }
    catch (error) {
        console.log("error", error);
    }
}

//Async POST
const postData = async ( url = '', data = {})=>{
    const request = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // body data type must match "Content-Type" header 
        date: data.date,
        temp: data.temp,
        content: data.content
    })        
  });

    try {
        const newData = await request.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

//Update UI
const updateUI = async () => {
    const request = await fetch('/fetchWeatherData') 
    try {
        const allData = await request.json()
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + " degrees Fahrenheit";
        document.getElementById('content').innerHTML = allData.content;    
    
    }catch(error){
        console.log("error", error)
    }
}

