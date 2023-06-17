export function loadingScreen() {
  const screen = document.querySelector(".loadingBlur");
  screen.classList.toggle("appear");
  setTimeout(() => {
    screen.classList.toggle("appear");
  }, 3000);
}
