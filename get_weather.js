const button = document.getElementById("weather-btn")
const contentDiv = document.getElementById("content")
const searchBar = document.getElementById("search")
const todayDiv = document.getElementById('weatherDiv')
const city = document.getElementById('location')
const tempToday = document.getElementById('tempToday')
const description = document.getElementById('description')
const maxTemp = document.getElementById('max-temp')
const lowTemp = document.getElementById('low-temp')
const icon = document.getElementById('icon')
let lat
let long

const images = {
    'clear-day':'🌞',
    'clear-night': '🌚',
    'cloudy': '☁️',
    'fog': '😶‍🌫️',
    'hail': '🪨 + 🧊',
    'partly-cloudy-day':'🌥️',
    'partly-cloudy-night': '🌛 + ☁️',
    'rain': '☔️',
    'thunder-rain':'⛈️'

}

button.addEventListener('click', ()=>{
    getWeatherToday()
})

navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    long = position.coords.longitude

    console.log(lat,long)

    startupWeather(lat,long)

    

})

async function startupWeather(lat,long) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}/?key=U7TBRDXVHJ44ZGEM78ZV24W9N&contentType=json`)


    const data = await response.json()
    
    const today = data.days[0]

    console.log(data)

    tempToday.innerHTML = `${today.temp} <sup>℉</sup>`
    maxTemp.textContent = `High: ${today.tempmax}` 
    lowTemp.textContent = `Low: ${today.tempmin}`
    description.textContent = today.description
    city.textContent = 'Your city 🏡'
    icon.textContent = images[today.icon]
   

}


async function getWeatherToday(){
   
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchBar.value}/?key=U7TBRDXVHJ44ZGEM78ZV24W9N&contentType=json`)


    const data = await response.json()
    
    const today = data.days[0]

    console.log(data)

    tempToday.innerHTML = `${today.temp} <sup>℉</sup>`
    maxTemp.textContent = `High: ${today.tempmax}` 
    lowTemp.textContent = `Low: ${today.tempmin}`
    description.textContent = today.description
    city.textContent = data.resolvedAddress
    icon.textContent = images[today.icon]
   

}













