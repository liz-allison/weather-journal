/* Global Variables */
//Use of API to access weather database
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '3c695c0303609cf395d095d701f8ad45'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//GET request to weather info API
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, newZip, apiKey)
}

const getWeather = async(baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + apiKey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//Might use this variable later
//const request = await fetch(`${baseURL}?zip=${zip.value},&appid=${apiKey}&units=metric`);

