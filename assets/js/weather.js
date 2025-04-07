//~ Standard Variables
// API URL
const apiUrl =
  "https://api.pirateweather.net/forecast/ntC8U5xrrc5kn10XQebmEvssDHcleOe5/42.907,-76.963?exclude=minutely,hourly,alerts,flags";

// Days of the week
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

//~ First call Pirate Weather API
async function getWeather() {
  await fetch(apiUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(JSON.stringify(data, null, 2));
      // code below gets day of the week
      console.log(
        `%c${days[new Date(data.currently.time * 1000).getDay()]}`,
        "color:green"
      );
      weatherData = data;
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//~ Begin DOM manipulation - fired when fetch to API is finished - receives data object
async function populateDOM() {
  await getWeather();
  // now you can directly use jsonData

  //~ grab all DOM elements
  // today
  const weatherIcon = document.getElementsByClassName("icon-img")[0];
  const theTemp = document.getElementsByClassName("the-temp")[0];
  const weather = document.getElementsByClassName("what-weather")[0];
  const windSpeed = document.getElementsByClassName("wind")[0];

  // tomorrow
  const tomorrowDay = document.getElementsByClassName("tomorrow")[0];
  const tomorrowWeatherIcon =
    document.getElementsByClassName("tomorrow-icon")[0];
  const tomorrowHi = document
    .getElementsByClassName("future-row-1")[0]
    .getElementsByClassName("hi")[0];
  const tomorrowLo = document
    .getElementsByClassName("future-row-1")[0]
    .getElementsByClassName("lo")[0];

  // day after tomorrow
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

  // three days from today
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

  //~ Set Today's Weather
  // console.log(weatherData.currently.icon);
  const today = weatherData.currently;
  // set today's icon
  const iconPath = assignIcon(today.icon);
  weatherIcon.src = `./assets/images/icons/${iconPath}.png`;

  // set today's temperature readable
  theTemp.innerHTML = Math.ceil(today.temperature);

  // set today's weather readable
  weather.innerHTML = today.summary;

  // set today's wind speed
  windSpeed.innerHTML = Math.ceil(today.windSpeed);

  //~ set tomorrow's Weather
  const tomorrow = weatherData.daily.data[2];
  tomorrowDay.innerHTML = days[new Date(tomorrow.time * 1000).getDay()];
  tomorrowWeatherIcon.src = `./assets/images/icons/${assignIcon(
    tomorrow.icon
  )}.svg`;
  tomorrowHi.innerHTML = Math.ceil(tomorrow.temperatureHigh);
  tomorrowLo.innerHTML = Math.ceil(tomorrow.temperatureLow);

  //~ set day after tomorrow's Weather
  const DAT = weatherData.daily.data[3];
  dayAfterTomorrowDay.innerHTML = days[new Date(DAT.time * 1000).getDay()];
  dayAfterTomorrowIcon.src = `./assets/images/icons/${assignIcon(
    DAT.icon
  )}.svg`;
  dayAfterTomorrowHi.innerHTML = Math.ceil(DAT.temperatureHigh);
  dayAfterTomorrowLo.innerHTML = Math.ceil(DAT.temperatureLow);

  //~ set three days from today's Weather
  const thirdOut = weatherData.daily.data[4];
  threeDaysFromTodayDay.innerHTML =
    days[new Date(thirdOut.time * 1000).getDay()];
  threeDaysFromTodayIcon.src = `./assets/images/icons/${assignIcon(
    thirdOut.icon
  )}.svg`;
  threeDaysFromTodayHi.innerHTML = Math.ceil(thirdOut.temperatureHigh);
  threeDaysFromTodayLo.innerHTML = Math.ceil(thirdOut.temperatureLow);
}

getWeather();
populateDOM();

const assignIcon = function (icon) {
  // console.log(`%c${icon}`, "color: orange");
  let iconSrc;
  if (icon == "clear-day" || icon == "clear-night") {
    iconSrc = "sun";
  } else if (icon == "rain") {
    iconSrc = "rain";
  } else if (icon == "snow" || icon == "sleet") {
    iconSrc = "snow";
  } else if (icon == "wind") {
    iconSrc = "wind";
  } else if (icon == "fog") {
    iconSrc = "foggy";
  } else if (icon == "cloudy") {
    iconSrc = "cloudy";
  } else if (icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {
    iconSrc = "part-cloud";
  }
  // console.log(`%c${iconSrc}`, "color: yellow");
  return iconSrc;
};
