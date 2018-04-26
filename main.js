document.addEventListener("DOMContentLoaded", ready);

function ready() {

    let firstNumber = document.querySelector('.first-number');
    let secondNumber = document.querySelector('.second-number');
    let firstRandomNumber = getRandomNumber(6, 9);
    let secondRandomNumber = getRandomNumber(11, 14) - firstRandomNumber;
    let sumNumbers = firstRandomNumber + secondRandomNumber;
    firstNumber.innerHTML = firstRandomNumber;
    secondNumber.innerHTML = secondRandomNumber;

    // Получение рандомного значения в диапазоне (min, max)
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let canvas = document.getElementById('cnvs');
    let context = canvas.getContext('2d');
    let division = 38.8;

    // Параметры первой дуги
    let firstArcCenter = (division * firstRandomNumber) / 2;
    let firstArcCurve = -60;
    let firstArcEnd = division * firstRandomNumber;

    //Рисуем первую дугу
    function createFirstArc() {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.moveTo(0, 80);
        context.quadraticCurveTo(firstArcCenter, firstArcCurve, firstArcEnd, 80);
        context.stroke();

        context.beginPath();
        context.moveTo(firstArcEnd, 80);
        context.lineTo(firstArcEnd - 15, 73);
        context.moveTo(firstArcEnd, 80);
        context.lineTo(firstArcEnd - 2, 65);
        context.stroke();
    }
    createFirstArc();

    // Параметры второй дуги
    let secondArcCenter = ((division * firstRandomNumber) + ((division * firstRandomNumber) + (division * secondRandomNumber))) / 2;
    let secondArcCurve = -60 / 3;
    let secondArcEnd = (division * secondRandomNumber) + (division * firstRandomNumber);

    //Рисуем вторую дугу
    function createSecondArc() {
        context.beginPath();
        context.moveTo(firstArcEnd, 80);
        context.quadraticCurveTo(secondArcCenter, secondArcCurve, secondArcEnd, 80);
        context.stroke();

        context.beginPath();
        context.moveTo(secondArcEnd, 80);
        context.lineTo(secondArcEnd - 15, 73);
        context.moveTo(secondArcEnd, 80);
        context.lineTo(secondArcEnd - 2, 65);
        context.stroke();
    }

    let firstNumberInput = document.createElement('input');
    let canv = document.querySelector('.axis');
    firstNumberInput.setAttribute("type", "text");
    firstNumberInput.setAttribute("maxlength", "1");
    firstNumberInput.classList.add('number-input');
    canv.append(firstNumberInput);
    firstNumberInput.style.left = (firstArcCenter + 20 + 'px');
    firstNumberInput.style.top = (firstArcCurve * 2 + 'px');

    let secondNumberInput = document.createElement('input');

    let equallyInput = document.createElement('input');
    equallyInput.setAttribute("type", "text");
    equallyInput.setAttribute("maxlength", "2");
    equallyInput.classList.add('equally-input');
    let sum = document.querySelector('.sum');
    let expr = document.querySelector('.expression');


    function checkInputValue(inputValue, spanValue, span) {
        if (inputValue.value != spanValue) {
            inputValue.classList.add('input-error');
            span.classList.add('span-error');
        } else {
            inputValue.disabled = true;
            inputValue.classList.remove('input-error');
            span.classList.remove('span-error');
            appendInputValue();
        };

        if (firstNumberInput.disabled === true && secondNumberInput.disabled === true) {
            expr.replaceChild(equallyInput, sum)
        };

    };

    function appendInputValue() {
        let inputs = document.querySelectorAll('input');
        for (let input of inputs) {
            if (!input.disabled) {
                return;
            } else if (input.disabled) {
                secondNumberInput.setAttribute("type", "text");
                secondNumberInput.setAttribute("maxlength", "1");
                secondNumberInput.classList.add('number-input');
                canv.append(secondNumberInput);
                secondNumberInput.style.left = (secondArcCenter + 20 + 'px');
                secondNumberInput.style.top = (firstArcCurve * 1.5 + 'px');
                createSecondArc();
            }
        };
    };

    function checkSum() {
        if (equallyInput.value === String(sumNumbers)) {
            equallyInput.disabled = true;
            equallyInput.classList.remove('input-error');
        } else {
            equallyInput.classList.add('input-error');
        }
    };

    firstNumberInput.oninput = () => checkInputValue(firstNumberInput, firstRandomNumber, firstNumber);
    secondNumberInput.oninput = () => checkInputValue(secondNumberInput, secondRandomNumber, secondNumber);
    equallyInput.oninput = checkSum;
}