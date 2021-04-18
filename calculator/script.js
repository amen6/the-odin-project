const numbersButtons = document.querySelectorAll("[data-number]");
const operatorsButtons = document.querySelectorAll("[data-operator]");
const deleteButton = document.querySelectorAll("[data-delete]");
const clearButton = document.querySelectorAll("[data-clear]");
const equalButton = document.querySelectorAll("[data-equal]");
const screen = document.querySelector(".loweroutput");
const upperScreen = document.querySelector(".upperoutput");

function add(x, y) {
    return x+y;
}

function substract(x, y) {
    return x-y;
}

function multiply(x, y) {
    return x*y;
}

function divide(x, y) {
    return x/y;
}

function operate(operator, number1, number2) {
    if (operator == '+') {
        return add(number1, number2);
    } else if (operator == '-') {
        return substract(number1, number2);
    } else if (operator == '*') {
        return multiply(number1, number2);
    } else {
        return divide(number1, number2);
    }
}

function displayNumber(e){
    if (e.target.innerText === '.' && screen.innerText.includes('.')) return;
    let output = numberWithoutCommas(screen.innerText +  e.target.innerText);
    return screen.innerText = numberWithCommas(output) ;
}

function printOutput(num) {
    if (num === '') {
        return screen.innerText = 0;
    }
    return screen.innerText = numberWithCommas(num);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithoutCommas(x) {
    return x.replace(/,/g, "");
}

function twoNumbersAfterDecimal(num){
    return num.toFixed(2).replace(/\.?0*$/,'');
}

function deleteNumber() {
    let output = numberWithoutCommas(screen.innerText)
    output = output.slice(0, -1)
    return screen.innerText = numberWithCommas(output);
}

function calculate(){
        if (!screen.innerText) return;
        let pastOperator = upperScreen.innerText.charAt(upperScreen.innerText.length-1);
        let historyNumber = numberWithoutCommas(upperScreen.innerText.slice(0, -1));
        let currentNumber = numberWithoutCommas(screen.innerText);
        if (pastOperator == '÷' && currentNumber == 0) return;
        let output = operate(pastOperator, parseFloat(historyNumber), parseFloat(currentNumber));
        upperScreen.innerText = '';
        return screen.innerText = numberWithCommas(twoNumbersAfterDecimal(output));
}

// displaying numbers when user click on them
numbersButtons.forEach((number) => {
    number.addEventListener('click', displayNumber)
})

// clearing everything
clearButton.forEach((clearbutton) => {
    clearbutton.addEventListener('click', function(){
        screen.innerText = '';
        upperScreen.innerText = '';
        return;
    })
})

// deleting one digit from current number when user clicks on delete
deleteButton.forEach((deletebutton) => {
    deletebutton.addEventListener('click', deleteNumber)
})

operatorsButtons.forEach((operator) => {
    operator.addEventListener('click', function(){
        if (!upperScreen.innerText) {
            if (!screen.innerText) return;
            upperScreen.innerText = screen.innerText + operator.innerText;
            return screen.innerText = '';
        } else {
            calculate();
        }
        
    })
})

// caclculating after user clicks on equal button
equalButton.forEach((equalbutton) => {
    equalbutton.addEventListener('click', function(){
        if (!upperScreen.innerText || !screen.innerText) return;
        calculate();
    })
})

// keyboard support
window.addEventListener('keydown', function(e) {
    if (e.key >= 0 && e.key <= 9) {
        let output = numberWithoutCommas(screen.innerText +  e.key);
        return screen.innerText = numberWithCommas(output) ;
    } else if (e.key === ".") {
        if (screen.innerText.includes('.')) return;
        return screen.innerText += e.key ;
    } else if (e.key === "Enter" || e.key === "=") {
        if (!upperScreen.innerText || !screen.innerText) return;
        calculate();
    } else if (e.key === '+' || e.key === '*' || e.key === '-' || e.key === '/') {
        if (!upperScreen.innerText) {
            if (!screen.innerText) return;
            if (e.key === '/') {
                upperScreen.innerText = screen.innerText + '÷';
            } else {
                upperScreen.innerText = screen.innerText + e.key;
            }
            return screen.innerText = '';
        } else {
            calculate();
        }
    } else if (e.key === "Backspace") {
        deleteNumber();
    } else if (e.key === "Escape") {
        screen.innerText = '';
        upperScreen.innerText = '';
    }
})