export function loadingScreen() {
  const screen = document.querySelector(".loadingBlur");
  screen.classList.toggle("appear");
  window.addEventListener("load", ()=>{
    screen.classList.toggle("appear");
}
)
}