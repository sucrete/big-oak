const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=42.907&longitude=-76.963" +
  "&current=temperature_2m,wind_speed_10m,weather_code,is_day" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
  "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/New_York&forecast_days=5";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var weatherData;

async function getWeather() {
  await fetch(apiUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const dayName = days[new Date(data.current.time).getDay()];
      console.log(`%c${dayName}`, "color:green");
      weatherData = data;
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function populateDOM() {
  await getWeather();

  const weatherIcon = document.getElementsByClassName("icon-img")[0];
  const theTemp = document.getElementsByClassName("the-temp")[0];
  const weather = document.getElementsByClassName("what-weather")[0];
  const windSpeed = document.getElementsByClassName("wind")[0];

  const tomorrowDay = document.getElementsByClassName("tomorrow")[0];
  const tomorrowWeatherIcon =
    document.getElementsByClassName("tomorrow-icon")[0];
  const tomorrowHi = document
    .getElementsByClassName("future-row-1")[0]
    .getElementsByClassName("hi")[0];
  const tomorrowLo = document
    .getElementsByClassName("future-row-1")[0]
    .getElementsByClassName("lo")[0];

  const dayAfterTomorrowDay =
    document.getElementsByClassName("day-after-tomorrow")[0];
  const dayAfterTomorrowIcon = document.getElementsByClassName(
    "day-after-tomorrow-icon"
  )[0];
  const dayAfterTomorrowHi = document
    .getElementsByClassName("future-row-2")[0]
    .getElementsByClassName("hi")[0];
  const dayAfterTomorrowLo = document
    .getElementsByClassName("future-row-2")[0]
    .getElementsByClassName("lo")[0];

  const threeDaysFromTodayDay = document.getElementsByClassName(
    "three-days-from-today"
  )[0];
  const threeDaysFromTodayIcon = document.getElementsByClassName(
    "three-days-from-today-icon"
  )[0];
  const threeDaysFromTodayHi = document
    .getElementsByClassName("future-row-3")[0]
    .getElementsByClassName("hi")[0];
  const threeDaysFromTodayLo = document
    .getElementsByClassName("future-row-3")[0]
    .getElementsByClassName("lo")[0];

  const current = weatherData.current;
  const daily = weatherData.daily;

  weatherIcon.src = `./assets/images/icons/${assignIcon(current.weather_code, current.is_day)}.png`;
  theTemp.innerHTML = Math.ceil(current.temperature_2m);
  weather.innerHTML = weatherDescription(current.weather_code);
  windSpeed.innerHTML = Math.ceil(current.wind_speed_10m);

  const tomorrow = 1;
  tomorrowDay.innerHTML = days[new Date(daily.time[tomorrow]).getDay()];
  tomorrowWeatherIcon.src = `./assets/images/icons/${assignIcon(daily.weather_code[tomorrow])}.svg`;
  tomorrowHi.innerHTML = Math.ceil(daily.temperature_2m_max[tomorrow]);
  tomorrowLo.innerHTML = Math.ceil(daily.temperature_2m_min[tomorrow]);

  const dat = 2;
  dayAfterTomorrowDay.innerHTML = days[new Date(daily.time[dat]).getDay()];
  dayAfterTomorrowIcon.src = `./assets/images/icons/${assignIcon(daily.weather_code[dat])}.svg`;
  dayAfterTomorrowHi.innerHTML = Math.ceil(daily.temperature_2m_max[dat]);
  dayAfterTomorrowLo.innerHTML = Math.ceil(daily.temperature_2m_min[dat]);

  const third = 3;
  threeDaysFromTodayDay.innerHTML = days[new Date(daily.time[third]).getDay()];
  threeDaysFromTodayIcon.src = `./assets/images/icons/${assignIcon(daily.weather_code[third])}.svg`;
  threeDaysFromTodayHi.innerHTML = Math.ceil(daily.temperature_2m_max[third]);
  threeDaysFromTodayLo.innerHTML = Math.ceil(daily.temperature_2m_min[third]);
}

populateDOM();

// Maps WMO weather codes to icon filenames
const assignIcon = function (code, isDay = true) {
  if (code === 0 || code === 1) return isDay ? "sun" : "sun";
  if (code === 2) return "part-cloud";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "foggy";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code === 85 || code === 86) return "snow";
  if (code >= 95) return "rain";
  return "sun";
};

// Maps WMO weather codes to human-readable descriptions
const weatherDescription = function (code) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code === 51 || code === 53 || code === 55) return "Drizzle";
  if (code === 56 || code === 57) return "Freezing Drizzle";
  if (code === 61 || code === 63 || code === 65) return "Rain";
  if (code === 66 || code === 67) return "Freezing Rain";
  if (code === 71 || code === 73 || code === 75) return "Snow";
  if (code === 77) return "Snow Grains";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code === 85 || code === 86) return "Snow Showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm & Hail";
  return "Unknown";
};
