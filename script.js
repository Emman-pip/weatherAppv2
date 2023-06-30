import { searchWeather } from "./weather.js";

searchWeather(
  document.querySelector(".primary"),
  document.querySelector(".weatherInfo"),
  document.querySelector(".newsPanel")
);

(() => {
  const github = document.querySelector(".github");
  github.onclick = () => {
    window.open("https://github.com/Emman-pip");
  };
})();
