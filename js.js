let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  const clear = document.querySelector(".clear-btn");
  const equal = document.querySelector(".equal-sign");
  const decimal = document.querySelector(".decimal-point");
  const previousScreen = document.querySelector("#previous-input");
  const currentScreen = document.querySelector("#current-input");
  const operators = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previousScreen.textContent = `${previousValue} ${operator}`;
      currentScreen.textContent = currentValue;
    })
  );

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    currentScreen.textContent = currentValue;
    previousScreen.textContent = currentValue;
  });

  equal.addEventListener("click", function() {
    if (currentValue !== "" && previousValue !== "") {
      calculate();
      previousScreen.textContent = "";
      if (parseFloat(previousValue) % 1 !== 0) { // ondalık basamak sayısı kontrolü
        currentScreen.textContent = parseFloat(previousValue).toFixed(4);
      } else {
        currentScreen.textContent = previousValue;
      }
    }
  });
  

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

const calculate = () => {
  previousValue = parseFloat(previousValue);
  currentValue = parseFloat(currentValue);
  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }
  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
  currentValue = parseFloat(currentValue).toFixed(4);
};

const handleOperator = (opr) => {
  if (currentValue !== "" && previousValue !== "") {
    calculate();
  }

  operator = opr;

  if (currentValue !== "" && previousValue === "") {
    previousValue = currentValue;
    currentValue = "";
  }

  const previousInput = document.querySelector("#previous-input");
  previousInput.textContent = `${previousValue} ${operator}`;

  if (operator === "=") {
    operator = "";
    previousInput.textContent = "";
  }
};

const handleNumber = (num) => {
  if (currentValue.length < 12) {
    currentValue += num;
  }
};

const roundNumber = (num) => {
  return Math.round(num * 10000) / 10000;
};

const addDecimal = () => {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
};
