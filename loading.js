// TODO: add a function to detect the loading of API

export function loadingScreen() {
  const screen = document.querySelector(".loadingBlur");
  screen.classList.toggle("appear");
  window.addEventListener("load", ()=>{
    screen.classList.toggle("appear");
}
)
}