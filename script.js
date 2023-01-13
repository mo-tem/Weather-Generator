const API_URL = "https://api.open-meteo.com/v1/forecast";
const latitude = 45.421106;
const longitude = -75.690308;
const requestURL = `${API_URL}?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&current_weather=true&timezone=auto`;


const weatherCodes = {
    "0": "Clear sky",
    "1": "Mainly clear",
    "2": "Partly cloudy",
    "3": "Overcast",
    "45": "Fog",
    "48": "Depositing rime fog",
    "51": "Drizzle: Light",
    "53": "Drizzle: Moderate",
    "55": "Drizzle: Dense intensity",
    "56": "Freezing Drizzle: Light",
    "57": "Freezing Drizzle: Dense intensity",
    "61": "Rain: Slight",
    "63": "Rain: Moderate",
    "65": "Rain: Heavy intensity",
    "66": "Freezing Rain: Light",
    "67": "Freezing Rain: Heavy intensity",
    "71": "Snow fall: Slight",
    "73": "Snow fall: Moderate",
    "75": "Snow fall: Heavy intensity",
    "77": "Snow grains",
    "80": "Rain showers: Slight",
    "81": "Rain showers: Moderate",
    "82": "Rain showers: Violent",
    "85": "Snow showers: Slight",
    "86": "Snow showers: Heavy",
    "95": "Thunderstorm: Slight or moderate",
    "96": "Thunderstorm with slight hail",
    "99": "Thunderstorm with heavy hail"
};


fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Extract current temperature from the API response
        weatherCodeNumber = data.current_weather.weathercode;
        let temperature = data.current_weather.temperature;
        let weatherInfo = weatherCodes[weatherCodeNumber];
        let windDirection = data.current_weather.winddirection;
        let windSpeed = data.current_weather.windspeed;
        let dateTime = data.current_weather.time;

        let time = dateTime.slice(-5);
        let timeOfDay = time.slice(0,1);
        console.log(timeOfDay)
        if (timeOfDay === "1") {
            time = time.slice(-4) + "PM"
        } else {
            time = time.slice(-4) + "AM"
        }

        const template = document.querySelector('#template');
        template.innerHTML = `
        <div class="block">
            <div id="icon"></div>
            <div id="temperature">${temperature}℃</div> 
            <div id="weatherInfo">${weatherInfo}</div> 
            <div id="windDirection">Wind Direction: ${windDirection}</div>
            <div id="windSpeed">Wind Speed: ${windSpeed}</div>
            <div id="dateTime">${time} ${dateTime.slice(0, 10)} (hourly basis)</div>
        </div>`
    });