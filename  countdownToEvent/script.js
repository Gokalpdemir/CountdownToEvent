const date = document.querySelector(".date");
const remainingDiv = document.querySelector(".remainingDiv");
const remainingForm = document.getElementById("remainingForm");
const timeDiv = document.getElementById("timeDiv");
const timeSpans = document.querySelectorAll("span");
const btn = document.getElementById("btn");
const resetButton = document.getElementById("resetButton");
const compleateDiv = document.getElementById("compleate");
const compleateBtn = document.getElementById("compleateBtn");

const today = new Date().toISOString().split("T")[0];
date.setAttribute("min", today);
let chosenDate = "";
let currentDateValue = new Date().getTime();
let currentTımeInterval;
let localStorageTime;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function updateDom() {
  currentTımeInterval = setInterval(() => {
    const now = new Date().getTime();
    const betweenDate = currentDateValue - now;
    const days = Math.floor(betweenDate / day);
    const hours = Math.floor((betweenDate % day) / hour);
    const minutes = Math.floor((betweenDate % hour) / minute);
    const seconds = Math.floor((betweenDate % minute) / second);
    remainingDiv.hidden = true;
    if (betweenDate < 0) {
      timeDiv.hidden = true;
      clearInterval(currentTımeInterval);
      compleateDiv.hidden = false;
    } else {
      timeDiv.hidden = false;

      timeSpans[0].textContent = `${days}`;
      timeSpans[1].textContent = `${hours}`;
      timeSpans[2].textContent = `${minutes}`;
      timeSpans[3].textContent = `${seconds}`;
    }
  }, 1000);
}

function calculateTime(e) {
  e.preventDefault();
  chosenDate = remainingForm.date.value;
  localStorageTime = {
    date: chosenDate,
  };
  localStorage.setItem("time", JSON.stringify(localStorageTime));

  if (chosenDate == "") {
    alert("Lütfen Tarih Seçiniz !");
  } else {
    currentDateValue = new Date(chosenDate).getTime();
    updateDom();
  }
}
compleateBtn.addEventListener("click", resetTime);
function resetTime() {
  clearInterval(currentTımeInterval);
  compleateDiv.hidden = true;
  timeDiv.hidden = true;
  remainingDiv.hidden = false;
  localStorage.removeItem("time");
}
resetButton.addEventListener("click", resetTime);
remainingForm.addEventListener("submit", calculateTime);
function refreshTime() {
  if (localStorage.getItem("time")) {
    remainingDiv.hidden = true;
    localStorageTime = JSON.parse(localStorage.getItem("time"));
    chosenDate = localStorageTime.date;
    currentDateValue = new Date(chosenDate).getTime();

    updateDom();
  }
}
refreshTime();
