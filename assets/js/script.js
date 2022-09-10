// global variables
let searchHistory = [];
const citySearch = document.querySelector("#city-search-form");
const mainContent = document.querySelector(".content");
const searchHistoryUl = document.querySelector("#search-history");

// day.js plug-ins
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// api call handlers
function cityLocation(city, state) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},usa&limit=1&appid=${config.myKey}`;

}

function currentWeather(location) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${config.myKey}`;

}

// display functions using call handlers
function displayAllWeather(city, data) {
    
}

function displayCurrentWeather(city, weather, timezone) {
    let icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    
}

function displayForecast(data, timezone) {

}

// related history functions
function initializeSearchHistory() {

}

function displaySearchHistory() {

}

function citySearchHandler(e) {

}

function appendSearchHistory(citySearch) {

}

// handler for localStorage of past searches
function historyListener(event) {

}

// load localstorage
initializeSearchHistory();

// event listeners
searchHistoryUl.addEventListener("click", );
citySearch.addEventListener("submit", );