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
    if (b === 0) {
        return '∞ is not allowed';
    }
    return a / b;
}

//let aNumber = 3;
//let operator = '+';
//let bNumber = 5;

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
let firstNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay === true) {
            displayValue = button.textContent;
            display.textContent = displayValue;
            shouldResetDisplay = false;
            return;
        }
        
        if (displayValue === '0') {
            displayValue = button.textContent;
        } else {
            displayValue += button.textContent;
        }
        display.textContent = displayValue;
    });
});

const operatorButtons = document.querySelectorAll('.operators');

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const newOperator = button.textContent;
        if (firstNumber === null) {
            firstNumber = displayValue;
            currentOperator = newOperator;
            shouldResetDisplay = true;
        } else if (shouldResetDisplay === true) {
            currentOperator = newOperator;
        } else {
            const a = Number(firstNumber);
    const b = Number(displayValue);
    const result = operate(a, currentOperator, b);

    displayValue = result.toString();
    display.textContent = displayValue;

    firstNumber = displayValue;
    currentOperator = newOperator;
    shouldResetDisplay = true;
        };
    });
});

const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => {
    if (firstNumber === null || currentOperator === null) {
        return;
    }
    const a = Number(firstNumber);
    const b = Number(displayValue);
    const result = operate(a, currentOperator, b);

    displayValue = result.toString();
    display.textContent = displayValue;

    firstNumber = displayValue;
    currentOperator = null;
    shouldResetDisplay = true;
});

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    displayValue = '0';
    display.textContent = displayValue;
    firstNumber = null;
    currentOperator = null;
    shouldResetDisplay = false;
});
