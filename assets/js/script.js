// global variables
let searchHistory = [];
const citySearchEl = document.querySelector('#citySearchForm');
const mainContent = document.querySelector('.content');
const searchHistoryEl = document.querySelector('#searchHistory');

// day.js plug-ins
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// api call handlers
function cityLocation(city) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},usa&limit=1&appid=43307f36c133c1b4d80feb3644b2ab3e
    `;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            if (!data[0]) {
                alert('Location unknown')
            } else {
                appendSearchHistory(`${city}`);
                Weather(data[0]);
            }
        })
        // .catch((err) => console.log(err));
}

function Weather(location) {    
    const { lat, lon } = location;
    const apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=43307f36c133c1b4d80feb3644b2ab3e
    `;
    const cityState = `${location.name}, ${location.state}`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => displayAllWeather(cityState, data))
        // .catch((err) => console.log(err));
}

// display functions using call handlers
function displayWeather(city, weather, timezone) {
    console.log(weather);
    let icon = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`;
    // let altIcon = weather.weather[0].description;
    let weatherIcon = document.createElement('img');
    let card = document.createElement('div');
    let date = dayjs().tz(timezone).format('M/D/YYYY');
    let temp = weather.temp;
    let wind = weather.wind_speed;
    let humidity = weather.humidity;
    // let uvIndex = weather.uvi;
    
    // element creation
    let cityName = document.createElement('h1');
    let dateEl = document.createElement('h3');
    let tempEl = document.createElement('h4');
    let windEl = document.createElement('h4');
    let humidityEl = document.createElement('h4');
    let uvIndexEl = document.createElement('h4');

    card.setAttribute('class', 'currentWeather');

    cityName.textContent = `${city}`;
    card.append(cityName);
    weatherIcon.setAttribute('src', icon);
    // weatherIcon.setAttribute('alt', iconAlt);
    card.append(weatherIcon);

    dateEl.textContent = `Date: ${weather.current.date}`;
    tempEl.textContent = `Temp: ${weather.current.temp}°F`;
    windEl.textContent = `Wind Speed: ${weather.current.wind_speed} MPH`;
    humidityEl.textContent = `Humidity: ${weather.current.humidity} %`;
    uvIndexEl.textContent = `UVI Index: ${weather.current.uvi}`;

    card.append(dateEl);
    card.append(tempEl);
    card.append(windEl);
    card.append(humidityEl);
    card.append(uvIndexEl);

    mainContent.innerHTML = '';
    mainContent.append(card);
}

function displayForecast(data, timezone) {
    
    const start = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
    const end = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();

    let cardContainerEl = document.createElement('div');
    let cardContainerHeadEl = document.createElement('h3');
    let cardContainerRow = document.createElement('div');
  
    cardContainerEl.setAttribute('class', 'card-container');
    cardContainerHeadEl.textContent = '5-Day Forecast:';
    cardContainerRow.setAttribute('class', 'row');
    cardContainerEl.append(cardContainerHeadEl);
  
    mainContent.append(cardContainerEl);

    for(let i = 0; i < data.length; i++) {

        if(data[i].dt >= start && data[i].dt < end) {

            let iconUrl = `http://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`;
            let iconDescription = data[i].weather[0].description;
            let temp = data[i].temp.day;
            let wind = data[i].wind_speed;
            let { humidity } = data[i];
            let time = data[i].dt;

            let cardEl = document.createElement('div');            
            let iconEl = document.createElement('img');
            let dateEl = document.createElement('h3');
            let tempEl = document.createElement('h4');
            let windEl = document.createElement('h4');
            let humidityEl = document.createElement('h4');

            cardEl.setAttribute('class', 'card');
            dateEl.textContent = moment(time).format('M/D/YYYY');
            iconEl.setAttribute('src', iconUrl);
            iconEl.setAttribute('alt', iconDescription);
            tempEl.textContent = `Temp: ${temp}°F`;
            windEl.textContent = `Wind: ${wind} MPH`;
            humidityEl.textContent = `Humidity: ${humidity} %`;

            cardEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);
            cardContainerRow.append(cardEl);
        }
    }
    cardContainerEl.append(cardContainerRow);
}

function displayAllWeather(city, data) {

    displayWeather(city, data, data.timezone);
    displayForecast(data.daily, data.timezone);
}

// related history functions
function initializeSearchHistory() {
    let storedHistory = localStorage.getItem('search-history');

    if(storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }

    displaySearchHistory();
}

function citySearch(e) {
    e.preventDefault();

    let city = document.querySelector('#city-search-city').value.trim();

    if(!city) {
        return;
    }

    cityLocation(city);
}

function appendSearchHistory(citySearch) {
    if(searchHistory.indexOf(citySearch) !== -1) {
        return;
    }
    searchHistory.push(citySearch);

    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displaySearchHistory() {
    searchHistoryEl.innerHTML = '';

    for(let i = searchHistory.length - 1; i>= 0; i--) {
        let searchLi = document.createElement('li');
        searchLi.textContent = searchHistory[i];
        searchLi.setAttribute('class', 'search-item');
        searchHistoryEl.append(searchLi);
    }
}

// handler for localStorage of past searches
function historyListener(event) {
 if(!event.target.matches('.search-item')){
    return;
 }

 let search = event.target.textContent;
 const searchArr = search.split(', ');

 getCityLocation(searchArr[0], searchArr[1]);
}

// load localstorage
initializeSearchHistory();

// event listeners
searchHistoryEl.addEventListener('click',historyListener);
citySearchEl.addEventListener('submit', citySearch);
