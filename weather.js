const apiKey = "bf0fe56a584f607fe9049680b3f5c69f";   //copied from openweathermap.org website 

const weatherDataElement = document.querySelector(".weather-data");
const cityInputElement = document.getElementById("city-input");
const formE = document.querySelector("form");

formE.addEventListener("submit" , (event) => {
    event.preventDefault();  //prevent from refreshing of page.
    const cityValue = cityInputElement.value;
    console.log();
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
         const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
          );
          if(!response.ok){
            throw new Error("Network response was not ok");
          }
          
    const data = await response.json();

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

    weatherDataElement.querySelector(".temperature").textContent = `${temperature}°C`;

    weatherDataElement.querySelector(".description").textContent = description;

    weatherDataElement.querySelector(".details").innerHTML = details.map((detail) =>`<div>${detail}</div>`).join("");



  } catch (error) {
    weatherDataElement.querySelector(".icon").innerHTML = "";
    weatherDataElement.querySelector(".temperature").textContent = "";
    weatherDataElement.querySelector(".description").textContent =
      "An error occured, please try again later";

    weatherDataElement.querySelector(".details").innerHTML = "";
  }
}
