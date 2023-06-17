// api key

async function locationData(loc = "Philippines") {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${loc}}&appid=c41ecc1335087d556ee87ffa89750cad`
    );
    const coordinates = await data.json();
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;

    return [lat, lon];
  } catch (error) {
    alert(error + "\nNO WEATHER DATA AVAILABLE");
  }
}

async function weatherData(loc) {
  try {
    const data = await locationData(loc);
    const lat = data[0];
    const lon = data[1];

    //   const conditionsFetch = await fetch(
    //     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c41ecc1335087d556ee87ffa89750cad`
    //   );

    const currentConditionsFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=c41ecc1335087d556ee87ffa89750cad`
    );
    const conditionJson = await currentConditionsFetch.json();
    return conditionJson;
  } catch (error) {
    alert(error + "\nNO WEATHER DATA AVAILABLE");
    window.close();
  }
}

async function displayData(loc = "Philippines", parent) {
  //loc name, country

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("infos");

  const textContainer = document.createElement("div");

  const data = await weatherData(loc);
  const locName = document.createElement("div");
  locName.textContent = `${data.name}, ${data.sys.country}`;
  locName.classList.add("city");

  infoContainer.appendChild(locName);

  parent.appendChild(textContainer);
  textContainer.appendChild(infoContainer);

  //temperature
  const temp = document.createElement("div");
  const tempLabel = document.createElement("div");
  const temptext = document.createElement("div");
  tempLabel.textContent = "Temperature:";
  temptext.textContent = data.main.temp + "°C";
  temptext.classList.add("dataFont");
  temp.appendChild(tempLabel);
  temp.appendChild(temptext);
  infoContainer.appendChild(temp);
  //feels like
  const feelsLike = document.createElement("div");
  const feelsLabel = document.createElement("div");
  feelsLabel.textContent = "Feels like:";
  const feelstext = document.createElement("div");
  feelstext.classList.add("dataFont");
  feelstext.textContent = data.main.feels_like + "°C";

  infoContainer.appendChild(feelsLike);
  feelsLike.appendChild(feelsLabel);
  feelsLike.appendChild(feelstext);

  //condition
  const conditionText = document.createElement("div");
  conditionText.textContent = data.weather[0].description;
  conditionText.classList.add("conditionFont");
  const conditionImage = new Image();
  conditionImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  const conditionContainer = document.createElement("div");
  conditionContainer.classList.add("condition");
  conditionContainer.appendChild(conditionImage);
  conditionContainer.appendChild(conditionText);
  parent.appendChild(conditionContainer);

  //sunrise
  const date = new Date(data.sys.sunrise * 1000);
  const hours = date.getHours();
  var minutes = () => {
    if (date.getMinutes().toString().length == 1) {
      return "0" + date.getMinutes();
    } else {
      return date.getMinutes();
    }
  };

  const sunrise = document.createElement("div");
  const sunriseLabel = document.createElement("div");
  sunriseLabel.textContent = "Sunrise(UTC+8):";
  const sunriseText = document.createElement("div");
  sunriseText.textContent = hours + ":" + minutes();
  sunriseText.classList.add("dataFont");
  const date2 = new Date(data.sys.sunset * 1000);
  const hours2 = date2.getHours();
  var minutes2 = () => {
    if (date2.getMinutes().toString().length == 1) {
      return "0" + date2.getMinutes();
    } else {
      return date2.getMinutes();
    }
  };

  const sunset = document.createElement("div");
  const sunsetLabel = document.createElement("div");
  sunsetLabel.textContent = "Sunset(UTC+8):";
  const sunsetText = document.createElement("div");
  sunsetText.textContent = hours2 + ":" + minutes2();
  sunsetText.classList.add("dataFont");
  infoContainer.appendChild(sunrise);
  sunrise.appendChild(sunriseLabel);
  sunrise.appendChild(sunriseText);

  infoContainer.appendChild(sunset);
  sunset.appendChild(sunsetLabel);
  sunset.appendChild(sunsetText);
}

import { useNewsData } from "./news.js";

export async function searchWeather(
  parentOfSearchBar,
  parentOfWeatherWindow,
  parentOfNews
) {
  const container = document.createElement("div");
  container.classList.add("searchContainer");
  const searchBar = document.createElement("input");
  searchBar.placeholder = "Enter a valid location";
  searchBar.classList.add("search");
  searchBar.type = "search";
  const button = document.createElement("button");
  button.textContent = "Search";
  button.classList.add("button");
  parentOfSearchBar.appendChild(container);
  container.appendChild(searchBar);
  container.appendChild(button);
  await displayData("Philippines", parentOfWeatherWindow);
  await useNewsData("Philippines", parentOfNews);
  button.addEventListener("click", () => {
    parentOfWeatherWindow.innerHTML = "";
    parentOfNews.innerHTML = "";
    displayData(searchBar.value, parentOfWeatherWindow);
    useNewsData(searchBar.value, parentOfNews);
  });
  searchBar.addEventListener("keyup", (event) => {
    if (event.code == "Enter") {
      parentOfWeatherWindow.innerHTML = "";
      parentOfNews.innerHTML = "";
      displayData(searchBar.value, parentOfWeatherWindow);
      useNewsData(searchBar.value, parentOfNews);
    }
  });
}
