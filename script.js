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

const decimalPointButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');

decimalPointButton.addEventListener('click', () => {
    if (shouldResetDisplay === true) {
        displayValue = '0.';
        display.textContent = displayValue;
        shouldResetDisplay = false;
        return;
    }
    if (displayValue.includes('.')) {
        return;
    } 
    displayValue += '.';
    display.textContent = displayValue;
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        numberButtons.forEach((button) => {
            if (button.textContent === e.key) {
                button.click();
            }
        });
    };

    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        operatorButtons.forEach((button) => {
            if (button.textContent === e.key) {
                button.click();
            };
        });
    }

    if (e.key === '.') {
        decimalPointButton.click();
    }

    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        equalsButton.click();
    }

    if (e.key === 'Escape') {
        clearButton.click();
    }

    if (e.key === 'Backspace') {
        backspaceButton.click();
    }
});

backspaceButton.addEventListener('click', () => {
    if (shouldResetDisplay) return;

    displayValue = displayValue.slice(0, -1);

    if (displayValue === '') {
        displayValue = '0';
    }
    display.textContent = displayValue;
});