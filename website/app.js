/* Global Variables */
const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip="; //Units=imperial (to convert temp from Kelvin to Fahrenheit)
const apiKey = "&appid=fc12487f17eb0051e16a0ba627745325";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Call current weather data
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;

  // API Call
  getWeatherData(baseUrl, zipCode, apiKey).then(function (data) {
    console.log(data);
    //add data to POST request
    postData("/add", {
      date: d,
      temp: data.main.temp,
      content: feelings,
    });
    updateUI(); // we can update UI because of Async.
  });
}

// GET data from WEB API
const getWeatherData = async (url, zip, key) => {
  const res = await fetch(url + zip + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//POST request to server side code
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// retrieve data from our app
// Function to update user interface
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = "Date: " + allData.date;
    document.getElementById("temp").innerHTML =
      "Temperature is: " + allData.temperature + " Fahrenheit Degrees";
    document.getElementById("content").innerHTML =
      "and I'm feeling " + allData.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
