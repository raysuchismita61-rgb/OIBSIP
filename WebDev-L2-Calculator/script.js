const display = document.getElementById("display");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".decimal");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let waitingForSecond = false;

// Number Buttons
numbers.forEach(button => {
    button.addEventListener("click", () => {
        if (!waitingForSecond) {
            firstNumber += button.textContent;
            display.value = firstNumber;
        } else {
            secondNumber += button.textContent;
            display.value = secondNumber;
        }
    });
});

// Decimal Button
decimalBtn.addEventListener("click", () => {
    if (!waitingForSecond) {
        if (!firstNumber.includes(".")) {
            firstNumber += firstNumber === "" ? "0." : ".";
            display.value = firstNumber;
        }
    } else {
        if (!secondNumber.includes(".")) {
            secondNumber += secondNumber === "" ? "0." : ".";
            display.value = secondNumber;
        }
    }
});

// Operator Buttons
operators.forEach(button => {
    button.addEventListener("click", () => {

        if (firstNumber === "") return;

        if (waitingForSecond && secondNumber !== "") {
            calculate();
        }

        let op = button.textContent.trim();

        if (op === "×") currentOperator = "*";
        else if (op === "÷") currentOperator = "/";
        else if (op === "−") currentOperator = "-";
        else if (op === "+") currentOperator = "+";

        waitingForSecond = true;
    });
});

// Calculate
function calculate() {

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    let result;

    switch (currentOperator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                display.value = "Error";
                firstNumber = "";
                secondNumber = "";
                currentOperator = "";
                waitingForSecond = false;
                return;
            }
            result = num1 / num2;
            break;

        default:
            return;
    }

    firstNumber = result.toString();
    secondNumber = "";
    display.value = firstNumber;
}

// Equals
equalBtn.addEventListener("click", () => {

    if (firstNumber !== "" && secondNumber !== "") {

        calculate();
        waitingForSecond = false;
    }

});

// Clear
clearBtn.addEventListener("click", () => {

    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    waitingForSecond = false;
    display.value = "";

});

// Backspace
deleteBtn.addEventListener("click", () => {

    if (!waitingForSecond) {
        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber;
    } else {
        secondNumber = secondNumber.slice(0, -1);
        display.value = secondNumber;
    }

});