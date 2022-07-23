


const weatherSearch = document.getElementById("weather-search")
const para = document.getElementById("para");
const fetchNewWeather = document.getElementById("fetch-new-weather")

fetchNewWeather.addEventListener("click", function() {
    getNewWeather(weatherSearch.value)
})
weatherSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") getNewWeather(weatherSearch.value)
})

function renderWeatherInformation(dataJSON) {

    let element = document.getElementById("location")
    element.innerText = `${dataJSON.name},  ${dataJSON.sys.country}`

    element = document.getElementById("temperature")
    element.innerText = `${Math.round(dataJSON.main.temp)}°C`

    element = document.getElementById("weather-state")
    let labelElement = document.getElementById("weather-state-label")
    labelElement.innerText = `${dataJSON.weather[0].main}`
    console.log()
    if (dataJSON.weather[0].icon[2] === "n") {
        document.getElementById("container").style.backgroundImage = "url(https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.honolulumagazine.com/content/uploads/2021/01/010.jpg)"
    } else {
        document.getElementById("container").style.backgroundImage = ""
    }
    let dataElement = document.getElementById("weather-state-image")
    dataElement.src = `http://openweathermap.org/img/wn/${dataJSON.weather[0].icon}@2x.png`

    element = document.getElementById("feels-like")
    element.innerText = `Feels like ${Math.round(dataJSON.main.feels_like)}°C`

    element = document.getElementById("max-temp")
    labelElement = document.getElementById("max-label")
    labelElement.innerText = "High: "
    dataElement = document.getElementById("max-data")
    dataElement.innerText = `${Math.round(dataJSON.main.temp_max)}°C`


    element = document.getElementById("min-temp")
    labelElement = document.getElementById("min-label")
    labelElement.innerText = "Low: "
    dataElement = document.getElementById("min-data")
    dataElement.innerText = `${Math.round(dataJSON.main.temp_min)}°C`

    element = document.getElementById("wind")
    labelElement = document.getElementById("wind-label")
    labelElement.innerText = "Wind: "
    dataElement = document.getElementById("wind-data")
    dataElement.innerText = `${dataJSON.wind.speed}`
    let kmhElement = document.createElement("div")
    kmhElement.id = "kmh-label"
    kmhElement.innerText = "km/h"
    dataElement.appendChild(kmhElement)

    element = document.getElementById("humidity")
    labelElement = document.getElementById("humidity-label")
    labelElement.innerText = "Humidity: "
    dataElement = document.getElementById("humidity-data")
    dataElement.innerText = `${dataJSON.main.humidity}%`

}



getNewWeather()
async function getNewWeather(query) {
    try {
        document.getElementById("loading-animation").style.display = "inline"
        const response = await fetch(query ? `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=12b934443d60dec9f4ff371e466a165f&units=metric` : `https://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&appid=12b934443d60dec9f4ff371e466a165f&units=metric`)
        const responseData = await response.json()
        console.log(responseData)
        renderWeatherInformation(responseData)
        document.getElementById("loading-animation").style.display = "none"
        weatherSearch.value = ""
    } catch (error) {
        if (error === "Bad Search") console.log("Bad Search")
        console.log("Error", error)
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