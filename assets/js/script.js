// global variables
let searchHistory = [];
const citySearch = document.querySelector('#city-search-form');
const mainContent = document.querySelector('.content');
const searchHistoryUl = document.querySelector('#search-history');

// day.js plug-ins
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// api call handlers
function cityLocation(city, state) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},usa&limit=1&appid=${config.myKey}`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            if (!data[0]) {
                alert('Location unknown')
            } else {
                appendSearchHistory(`${city}, ${state}`);
                Weather(data[0]);
            }
        })
        .catch((err) => console.log(err));
}

function Weather(location) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${config.myKey}`;
    const { lat, lon } = location;
    const cityState = `${location.name}, ${location.state}`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => displayAllWeather(cityState, data))
        .catch((err) => console.log(err));
}

// display functions using call handlers
function displayWeather(city, weather, timezone) {
    let icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    let altIcon = weather.weather[0].description;

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
    weatherIcon.setAttribute('alt', iconAlt);
    card.append(weatherIcon);

    dateEl.textContent = `Date: ${date}`;
    tempEl.textContent = `Temp: ${temp}°F`;
    windEl.textContent = `Wind Speed: ${wind} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    uvIndexEl.textContent = `UVI Index: ${uvi}`;

    card.append(dateEl);
    card.append(tempEl);
    card.append(windEl);
    card.append(humidEl);
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
            dateEl.textContent = dayjs.time(time).tz(timezone).format('M/D/YYYY');
            iconEl.setAttribute('src', iconUrl);
            iconEl.setAttribute('alt', iconDescription);
            tempEl.textContent = `Temp: ${temp}°F`;
            windEl.textContent = `Wind: ${wind} MPH`;
            humidityEl.textContent = `Humidity: ${humidity} %`;

            cardEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);
            cardcontainerRow.append(cardEl);
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

    let city = document.querySelector('#city-search').ariaValueMax.trim();
    let state = document.querySelector('#city-search-state').ariaValueMax;

    if(!city) {
        return;
    }

    cityLocation(city, state);
    citySearch.reset();
}

function appendSearchHistory(citySearch) {
    if(searchHistory.indexOf(citySeach) !== -1) {
        return;
    }
    searchHistory.push(citySearrch);

    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displaySearchHistory() {
    searchHistory.Ul.innerHTML = '';

    for(let i = searchHistory.length - 1; i>= 0; i--) {
        let searchLi = document.createElement('li');
        searchLi.textContent = searchHistory[i];
        searchLi.setAttribute('class', 'search-item');
        searchHistoryUl.append(searchLi);
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
searchHistoryUl.addEventListener('click',);
citySearch.addEventListener('submit',);