const apiKey = "7ad41df879664c85b69132003232603";
const apiUrl = "https://api.weatherapi.com/v1/current.json?q=";
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const searchBar = document.querySelector(".search input");
const form = document.querySelector("form");
const weatherIcon = document.querySelector(".content img");
const weatherDisplay = document.querySelector(".content");
const errorMessage = document.querySelector(".error");
const loader = document.querySelector(".loader");

async function checkWeather(city) {
    try {
        weatherDisplay.style.display = "";
        loader.style.display = "block";
        const response = await fetch(`${apiUrl}${city}&key=${apiKey}`);
        const data = await response.json();
        loader.style.display = "";

        cityName.textContent = data.location.name;
        temp.textContent = `${data.current.temp_c}°C`;
        humidity.textContent = `${data.current.humidity}%`;
        windSpeed.textContent = `${data.current.wind_kph} km/h`;
        weatherIcon.src = `https://${data.current.condition.icon}`;
        weatherIcon.title = data.current.condition.text;
        errorMessage.style.display = "none";
        weatherDisplay.style.display = "block";
    }
    catch (error) {
        errorMessage.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkWeather(searchBar.value);
})