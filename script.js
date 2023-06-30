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

() => {
  const target = document.querySelectorAll(".carousel-item");
  target.forEach((element) => {
    document.querySelector("body").onscroll = () => {
      const scroll = document.scrollingElement.scrollTop;

      const xvalue = "center";
      const scrollfactor = 0.3;
      const yValue = scroll * scrollfactor;
      element.style.backgroundPosition = xvalue + " " + yValue + "px";
    };
  });
};
