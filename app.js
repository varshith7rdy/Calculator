let add = false;
let sub = false;
let mul = false;
let div = false;

let curr_val = 0;
let inputStr = "";

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    const action = btn.dataset.action;
    const value = btn.dataset.value;
    const display = document.getElementById("display");

    if (action === "clear") {
      display.textContent = "0";
      curr_val = 0;
      inputStr = "";
      add = sub = mul = div = false;
      return;
    }

    if (action === "add") {
      curr_val = parseFloat(inputStr) || curr_val;
      add = true;
      inputStr = "";
      display.textContent = curr_val;
      return;
    }

    if (action === "subtract") {
      curr_val = parseFloat(inputStr) || curr_val;
      sub = true;
      inputStr = "";
      display.textContent = curr_val;
      return;
    }

    if (action === "multiply") {
      curr_val = parseFloat(inputStr) || curr_val;
      mul = true;
      inputStr = "";
      display.textContent = curr_val;
      return;
    }

    if (action === "divide") {
      curr_val = parseFloat(inputStr) || curr_val;
      div = true;
      inputStr = "";
      display.textContent = curr_val;
      return;
    }

    if (action === "backspace") {
      inputStr = inputStr.slice(0, -1);
      display.textContent = inputStr || 0;
      return;
    }

    if (action === "equals") {
      if (inputStr !== "") {
        const num = parseFloat(inputStr);
        if (add) curr_val += num;
        else if (sub) curr_val -= num;
        else if (mul) curr_val *= num;
        else if (div) curr_val /= num;
        else curr_val = num;
      }
      display.textContent = curr_val;
      inputStr = "";
      add = sub = mul = div = false;
      return;
    }

    // If the user pressed a number
    if (value !== undefined) {
      inputStr += value;
      display.textContent = inputStr;
    }
  });
});

let setMode = false;

const darkMode = document.getElementById("theme-toggle");

darkMode.onclick = function(){

  setMode = !setMode;
  if(setMode)
  {
    document.getElementById("theme-toggle").textContent = "🌙 Dark Mode";
    document.body.style.backgroundColor = "hsla(0, 5%, 19%, 1.00)";
  }
  else{
    document.getElementById("theme-toggle").textContent = "🌞 Light Mode";
    document.body.style.backgroundColor = "#f4f4f4";
  }
};


const mode = document.getElementById("theme-toggle");

const h1 = document.createElement("h1");

h1.textContent = "I know this is Funny";
h1.style.color = "hsla(1.0,100%,0%,0.6)"
h1.style.fontSize = "1.1rem"

document.body.after(h1);
