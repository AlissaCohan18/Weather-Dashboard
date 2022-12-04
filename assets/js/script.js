// declare variables
var city = "orlando";
var apiKey = "2d7a4c5927b560838f4ca31749bda05b";
var latCoord;
var lonCoord;

var idCitySearchEl = document.getElementById("idCitySearch");

var cityNameEl = document.getElementById("cityName");
var tempEl = document.getElementById("temp0");
var windEl = document.getElementById("wind0");
var humidityEl = document.getElementById("humidity0");

var dateEl1 = document.getElementById("date1");
var tempEl1 = document.getElementById("temp1");
var windEl1 = document.getElementById("wind1");
var humidityEl1 = document.getElementById("humidity1");

var dateEl2 = document.getElementById("date2");
var tempEl2 = document.getElementById("temp2");
var windEl2 = document.getElementById("wind2");
var humidityEl2 = document.getElementById("humidity2");

var dateEl3 = document.getElementById("date3");
var tempEl3 = document.getElementById("temp3");
var windEl3 = document.getElementById("wind3");
var humidityEl3 = document.getElementById("humidity3");

var dateEl4 = document.getElementById("date4");
var tempEl4 = document.getElementById("temp4");
var windEl4 = document.getElementById("wind4");
var humidityEl4 = document.getElementById("humidity4");

var dateEl5 = document.getElementById("date5");
var tempEl5 = document.getElementById("temp5");
var windEl5 = document.getElementById("wind5");
var humidityEl5 = document.getElementById("humidity5");

//recalls and loads history from local storage
var allCities = JSON.parse(localStorage.getItem("cities"));
if (!allCities) {
  allCities = [];
} else {
  for (i = 0; i < allCities.length; i++) {
    var historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-lg btn-secondary");
    historyEl.innerText = allCities[i];
    document.querySelector(".history").appendChild(historyEl);
  }
}

//fetch coordinates when passing city name into function
var fetchCoordinates = function (city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
};

fetchCoordinates(city);

//pass in coordinates of city to display weather data
function displayWeather(data) {
  lonCoord = data.coord.lon;
  latCoord = data.coord.lat;

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latCoord +
      "&lon=" +
      lonCoord +
      "&units=imperial&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data1) => fetchWeather(data1));
}

//function call to display weather data to page
function fetchWeather(data1) {
  cityNameEl.textContent = data1.city.name;
  //Display current day
  var now = moment().format("MMMM Do YYYY");
  $(currentDay).text(now);

  //Function to retrieve the data entered in search
  // function search() {
  //         this.fetchWeather(document.querySelector(".search_btn").value);
  //       }

  //add only new cities to history array and create a button
  if (allCities.includes(data1.city.name) == false) {
    allCities.push(data1.city.name);
    localStorage.setItem("cities", JSON.stringify(allCities));
    historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-lg btn-secondary");
    historyEl.innerText = data1.city.name;
    document.querySelector(".history").appendChild(historyEl);
  }

  //converts all of the weather api data to text on the page for each day
  tempEl.textContent = "Temp: " + data1.list[0].main.temp;
  windEl.textContent = "Wind: " + data1.list[0].main.humidity;
  humidityEl.textContent = "Humidity: " + data1.list[0].wind.speed;

  dateEl1.textContent = moment().add(1, "days").format("l");
  tempEl1.textContent = "Temp: " + data1.list[1].main.temp;
  windEl1.textContent = "Wind: " + data1.list[1].main.humidity;
  humidityEl1.textContent = "Humidity: " + data1.list[1].wind.speed;

  dateEl2.textContent = moment().add(2, "days").format("l");
  tempEl2.textContent = "Temp: " + data1.list[2].main.temp;
  windEl2.textContent = "Wind: " + data1.list[2].main.humidity;
  humidityEl2.textContent = "Humidity: " + data1.list[2].wind.speed;

  dateEl3.textContent = moment().add(3, "days").format("l");
  tempEl3.textContent = "Temp: " + data1.list[3].main.temp;
  windEl3.textContent = "Wind: " + data1.list[3].main.humidity;
  humidityEl3.textContent = "Humidity: " + data1.list[3].wind.speed;

  dateEl4.textContent = moment().add(4, "days").format("l");
  tempEl4.textContent = "Temp: " + data1.list[4].main.temp;
  windEl4.textContent = "Wind: " + data1.list[4].main.humidity;
  humidityEl4.textContent = "Humidity: " + data1.list[4].wind.speed;

  dateEl5.textContent = moment().add(5, "days").format("l");
  tempEl5.textContent = "Temp: " + data1.list[5].main.temp;
  windEl5.textContent = "Wind: " + data1.list[5].main.humidity;
  humidityEl5.textContent = "Humidity: " + data1.list[5].wind.speed;
}

// TODO: Add icon for each of the 6 days

$(".search_btn").on("click", function () {
  fetchCoordinates(idCitySearch.value);
  $("#idCitySearch").val("");
});

// Event listener for click on historical search buttons
$(".history").on("click", (event) => {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    fetchCoordinates(event.target.innerText);
  }
});
