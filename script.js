//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={729a71a88e28be01a3768b495136f3e6}

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const cityElement = document.getElementById("city");
  const dateElement = document.getElementById("date");
  const weatherIconElement = document.getElementById("weather-icon");
  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const tempMaxElement = document.getElementById("temp-max");
  const tempMinElement = document.getElementById("temp-min");
  const humidityElement = document.getElementById("humidity");
  const cloudyElement = document.getElementById("cloudy");
  const windElement = document.getElementById("wind");



//   searchButton.addEventListener("click", function () {
//     const cityName = searchInput.value;
//     getWeatherInfo(cityName);
//   });

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Formaning yuborishini oldini olish

    const cityName = searchInput.value;
    getWeatherInfo(cityName);
  });

  function getWeatherInfo(cityName) {
    const apiKey = "729a71a88e28be01a3768b495136f3e6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateWeatherInfo(data);
      })
      .catch((error) => {
        console.error(
          "Ob-havo ma'lumotlarini olishda xatolik yuz berdi:",
          error
        );
      });
  }

  function updateWeatherInfo(data) {
    const maxTemperature = Math.round(data.main.temp_max - 273.15); // Kelvin dan Celsius ga o'tkazish
    const minTemperature = Math.round(data.main.temp_min - 273.15);
    const humidity = data.main.humidity;
    const cloudy = data.clouds.all;
    const wind = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    cityElement.textContent = data.name;
    dateElement.textContent = getCurrentDateTime();
    weatherIconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    weatherIconElement.alt = weatherDescription;
    weatherDescriptionElement.textContent = weatherDescription;
    tempMaxElement.textContent = `${maxTemperature}°`;
    tempMinElement.textContent = `${minTemperature}°`;
    humidityElement.textContent = `${humidity}%`;
    cloudyElement.textContent = `${cloudy}%`;
    windElement.textContent = `${wind}km/h`;
  }

  function getCurrentDateTime() {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[now.getDay()];
    const time = `${now.getHours()}:${now.getMinutes()}`;
    return `${time} - ${day}, ${now.getDate()} ${getMonthName(now.getMonth())} '${now.getFullYear().toString().slice(2)}`;
  }

  function getMonthName(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  }
});
