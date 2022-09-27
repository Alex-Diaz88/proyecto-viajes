let hideTextButton = document.getElementById("hideTextButton");

let hideText = document.getElementById("hideText");

hideTextButton.addEventListener("click", toggleText);

function toggleText() {
  hideText.classList.toggle("show");

  if (hideText.classList.contains("show")) {
    hideTextButton.innerHTML = "Leer menos";
  } else {
    hideTextButton.innerHTML = "Leer mas";
  }
}

export default toggleText;
