const weatherSearch = document.getElementById("weather-search");
const para = document.getElementById("para");
const fetchNewWeather = document.getElementById("fetch-new-weather");
const toggleDegrees = document.getElementById("toggle-degrees");
let currentUnits = "metric";
let degreeUnitDOM = "°C";

toggleDegrees.addEventListener("click", (pointer) => {
  if (pointer.target.innerText === "°C") {
    // Change °C to °F
    let celsius = document
      .getElementById("temperature")
      .innerText.replace("°C", "");
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    document.getElementById("temperature").innerText = `${fahrenheit}°F`;
    document.getElementById(
      "feels-like"
    ).innerText = `Feels like ${fahrenheit}°F`;

    celsius = document.getElementById("max-data").innerText.replace("°C", "");
    fahrenheit = Math.round((celsius * 9) / 5 + 32);
    document.getElementById("max-data").innerText = `${fahrenheit}°C`;

    celsius = document.getElementById("min-data").innerText.replace("°C", "");
    fahrenheit = Math.round((celsius * 9) / 5 + 32);
    document.getElementById("min-data").innerText = `${fahrenheit}°C`;

    // Rerender the labels to say °F
    document.getElementById("max-data").innerText = document
      .getElementById("max-data")
      .innerText.replace("°C", "°F");
    document.getElementById("min-data").innerText = document
      .getElementById("min-data")
      .innerText.replace("°C", "°F");

    // Recalculate and rerender kmh-label
    let msWindSpeed = document.getElementById("wind-data").innerText;
    let mphWindSpeed = (msWindSpeed.replace("m/s", "") * 2.23694).toFixed(2);
    document.getElementById("wind-data").innerText = mphWindSpeed;
    let kmhElement = document.createElement("div");
    kmhElement.id = "kmh-label";
    kmhElement.innerText = "mp/h";
    document.getElementById("wind-data").appendChild(kmhElement);

    // Update units used
    currentUnits = "imperial";
    degreeUnitDOM = "°F";
    pointer.target.innerText = "°F";
  } else {
    // Change °F to °C
    let fahrenheit = document
      .getElementById("temperature")
      .innerText.replace("°F", "");
    let celsius = Math.round(((fahrenheit - 32) * 5) / 9);
    document.getElementById("temperature").innerText = `${celsius}°C`;
    document.getElementById("feels-like").innerText = `Feels like ${celsius}°C`;

    fahrenheit = document
      .getElementById("max-data")
      .innerText.replace("°F", "");
    celsius = Math.round(((fahrenheit - 32) * 5) / 9);
    document.getElementById("max-data").innerText = `${celsius}°C`;

    fahrenheit = document
      .getElementById("min-data")
      .innerText.replace("°F", "");
    celsius = Math.round(((fahrenheit - 32) * 5) / 9);
    document.getElementById("min-data").innerText = `${celsius}°C`;

    // Rerender the labels to say °C
    document.getElementById("max-data").innerText = document
      .getElementById("max-data")
      .innerText.replace("°F", "°C");
    document.getElementById("min-data").innerText = document
      .getElementById("min-data")
      .innerText.replace("°F", "°C");

    let mphWindSpeed = document.getElementById("wind-data").innerText;
    let msWindSpeed = (mphWindSpeed.replace("mp/h", "") * 0.44704).toFixed(2);
    document.getElementById("wind-data").innerText = msWindSpeed;
    let kmhElement = document.createElement("div");
    kmhElement.id = "kmh-label";
    kmhElement.innerText = "m/s";
    document.getElementById("wind-data").appendChild(kmhElement);

    // Update units used
    currentUnits = "metric";
    degreeUnitDOM = "°C";
    pointer.target.innerText = "°C";
  }
});
fetchNewWeather.addEventListener("click", function () {
  getNewWeather(weatherSearch.value);
});
weatherSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") getNewWeather(weatherSearch.value);
});

function renderWeatherInformation(dataJSON, NewLocationTime) {
  let element = document.getElementById("location");
  element.innerText = `${dataJSON.name},  ${dataJSON.sys.country}`;

  element = document.getElementById("local-time");
  let labelElement = document.getElementById("local-time-label");
  labelElement.innerText = "Local Time: ";
  let dataElement = document.getElementById("local-time-data");
  dataElement.innerText = NewLocationTime.toLocaleTimeString().slice(0, 5);

  element = document.getElementById("temperature");
  element.innerText = `${Math.round(dataJSON.main.temp)}${degreeUnitDOM}`;

  element = document.getElementById("weather-state");
  labelElement = document.getElementById("weather-state-label");
  labelElement.innerText = `${dataJSON.weather[0].main}`;
  console.log();
  // If its currently day time
  if (dataJSON.weather[0].icon[2] === "d") {
    // Cloudy
    if (dataJSON.weather[0].main === "Clouds") {
      document.getElementById("container").style.backgroundImage =
        "url(public/clouds.webp)";
    }
    // Clear sky
    // else if (dataJSON.weather[0].main === "Clear") {
    //   document.getElementById("container").style.backgroundImage =
    //     "url(public/clear_sky.jpg)";
    // }
    // Raining
    else if (
      dataJSON.weather[0].main === "Rain" ||
      dataJSON.weather[0].main === "Drizzle"
    ) {
      document.getElementById("container").style.backgroundImage =
        "url(public/rain.jpg)";
    }
    // Default image
    else {
      document.getElementById("container").style.backgroundImage =
        "url(public/day.webp)";
    }
  }
  // If its currently night time
  else {
    if (
      dataJSON.weather[0].main === "Rain" ||
      dataJSON.weather[0].main === "Drizzle"
    ) {
      document.getElementById("container").style.backgroundImage =
        "url(public/rain_night.webp)";
    }
    // default image
    else {
      document.getElementById("container").style.backgroundImage =
        "url(public/night.webp)";
    }
  }
  dataElement = document.getElementById("weather-state-image");
  dataElement.src = `http://openweathermap.org/img/wn/${dataJSON.weather[0].icon}@2x.png`;

  element = document.getElementById("feels-like");
  element.innerText = `Feels like ${Math.round(
    dataJSON.main.feels_like
  )}${degreeUnitDOM}`;

  element = document.getElementById("max-temp");
  labelElement = document.getElementById("max-label");
  labelElement.innerText = "High: ";
  dataElement = document.getElementById("max-data");
  dataElement.innerText = `${Math.round(
    dataJSON.main.temp_max
  )}${degreeUnitDOM}`;

  element = document.getElementById("min-temp");
  labelElement = document.getElementById("min-label");
  labelElement.innerText = "Low: ";
  dataElement = document.getElementById("min-data");
  dataElement.innerText = `${Math.round(
    dataJSON.main.temp_min
  )}${degreeUnitDOM}`;

  element = document.getElementById("wind");
  labelElement = document.getElementById("wind-label");
  labelElement.innerText = "Wind: ";
  dataElement = document.getElementById("wind-data");
  dataElement.innerText = `${dataJSON.wind.speed}`;
  let kmhElement = document.createElement("div");
  kmhElement.id = "kmh-label";
  if (currentUnits === "metric") kmhElement.innerText = "m/s";
  else kmhElement.innerText = "mp/h";
  dataElement.appendChild(kmhElement);

  element = document.getElementById("humidity");
  labelElement = document.getElementById("humidity-label");
  labelElement.innerText = "Humidity: ";
  dataElement = document.getElementById("humidity-data");
  dataElement.innerText = `${dataJSON.main.humidity}%`;
}

getNewWeather();
async function getNewWeather(query) {
  try {
    document.getElementById("loading-animation").style.display = "inline";
    const response = await fetch(
      query
        ? `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=12b934443d60dec9f4ff371e466a165f&units=${currentUnits}`
        : `https://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&appid=12b934443d60dec9f4ff371e466a165f&units=${currentUnits}`
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.cod === "404") {
      alert("City Not Found.");
    } else {
      let localTime = new Date();
      let secondsToAdd = localTime.getUTCSeconds();
      localTime.setSeconds(localTime.getTimezoneOffset() * 60);
      localTime.setSeconds(responseData.timezone);
      localTime.setSeconds(secondsToAdd);
      renderWeatherInformation(responseData, localTime);
    }
    document.getElementById("loading-animation").style.display = "none";
    weatherSearch.value = "";
  } catch (error) {
    if (error === "Bad Search") console.log("Bad Search");
    console.log("Error", error);
  }
}

// const settings = {
//     method: "GET",
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     }
// };
// const timeZone = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=xml&by=zone&zone=America/Chicago`)
// console.log(timeZone)
// let time = timeZone.json()
