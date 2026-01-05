const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

let aNumber = 3;
let operator = '+';
let bNumber = 5;

const operate = function (aNumber, operator, bNumber) {
    if (operator === '+') {
        return add(aNumber, bNumber);
    } else if (operator === '-') {
        return subtract(aNumber, bNumber);
    } else if (operator === '*') {
        return multiply(aNumber, bNumber);
    } else if (operator === '/') {
        return divide(aNumber, bNumber)
    } else {
        return 'ERROR';
    }
}

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.numbers');
let displayValue = '0';

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayValue === '0') {
            displayValue = button.textContent;
        } else {
            displayValue += button.textContent;
        }
        display.textContent = displayValue;
    });
});

