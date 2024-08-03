document.addEventListener('DOMContentLoaded', function() {
    let display = document.getElementById('display');
    let equationDisplay = document.getElementById('equation');
    let buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '0';
    let operator = '';
    let previousInput = '';

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            let buttonText = e.target.innerText;

            if (buttonText === 'C') {
                currentInput = '0';
                operator = '';
                previousInput = '';
                display.innerText = currentInput;
                equationDisplay.innerText = '';
            } else if (buttonText === '⌫') {
                currentInput = currentInput.slice(0, -1) || '0';
                display.innerText = currentInput;
                updateEquation();
            } else if (buttonText === '=') {
                if (operator && previousInput) {
                    currentInput = evaluate(previousInput, operator, currentInput);
                    display.innerText = currentInput;
                    operator = '';
                    previousInput = '';
                    equationDisplay.innerText = '';
                }
            } else if (isOperator(buttonText)) {
                if (currentInput && previousInput && operator) {
                    previousInput = evaluate(previousInput, operator, currentInput);
                    display.innerText = previousInput;
                    currentInput = '';
                } else {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = buttonText;
                updateEquation();
            } else {
                if (currentInput === '0') {
                    currentInput = buttonText;
                } else {
                    currentInput += buttonText;
                }
                display.innerText = currentInput;
                updateEquation();
            }
        });
    });

    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    function evaluate(a, operator, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        if (operator === '/' && b === 0) {
            return 'Error'; // Handle division by zero
        }

        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
        }
    }

    function updateEquation() {
        if (operator && previousInput) {
            equationDisplay.innerText = `${previousInput} ${operator} ${currentInput}`;
        } else {
            equationDisplay.innerText = currentInput;
        }
    }
});
