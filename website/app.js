//Global Variables
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//Use of API to access weather database
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=3c695c0303609cf395d095d701f8ad45';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Activate event listener with generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    fetchWeather(baseURL, newZip, apiKey)

    .then(function(inputData) {
        console.log(data); //newData or postData???

    postData('/addInfo', {date:newDate, temp:inputData.main.temp, content:content}); /* '/add' instead?*/
    })
    .then(function(newData) {
        updateUI(); 
    });
}

//GET request to weather API info on the web
const fetchWeather = async(baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + apiKey);
    try {
        const inputData = await res.json();
        console.log(data);
        return inputData;
    }
    catch (error) {
        console.log("error", error);
    }
}

//Async POST
const postData = async ( url = '/addInfo', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ // body data type must match "Content-Type" header 
        date: data.date,
        temp: data.temp,
        content: data.content,
    })        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }
    catch(error) {
    console.log("error", error);
    }
};

//Update UI
const updateUI = async () => {
    const request = await fetch('/') /* '/all' instead?*/
    try {
        const allData = await request.json()
        console.log(allData);
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;    
    
    }catch(error){
        console.log("error", error)
    }
}

