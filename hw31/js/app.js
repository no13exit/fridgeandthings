
import { add, subtract, multiply, divide } from "./math.js";
import { getCircleArea, getRectangleArea, getCircleLength } from "./geometry.js";

const app = document.getElementById("app");

// Main title
const heading = document.createElement("h1");
heading.textContent = "COSMIC CALCULATOR";
heading.className = "main-title text-center mb-5";

// Two columns
const columns = document.createElement("div");
columns.className = "row g-4";

// MATH

const mathColumn = document.createElement("div");
mathColumn.className = "col-md-6";

const mathCard = document.createElement("section");
mathCard.className = "calc-card math-card";

const mathTitle = document.createElement("h2");
mathTitle.textContent = "MATH";

const mathSelect = document.createElement("select");
mathSelect.className = "form-select mb-3";

const addOption = document.createElement("option");
addOption.value = "add";
addOption.textContent = "Addition (+)";

const subtractOption = document.createElement("option");
subtractOption.value = "subtract";
subtractOption.textContent = "Subtraction (-)";

const multiplyOption = document.createElement("option");
multiplyOption.value = "multiply";
multiplyOption.textContent = "Multiplication (×)";

const divideOption = document.createElement("option");
divideOption.value = "divide";
divideOption.textContent = "Division (÷)";

mathSelect.append(addOption, subtractOption, multiplyOption, divideOption);

const mathA = document.createElement("input");
mathA.type = "number";
mathA.placeholder = "First number";
mathA.className = "form-control mb-3";

const mathB = document.createElement("input");
mathB.type = "number";
mathB.placeholder = "Second number";
mathB.className = "form-control mb-3";

const mathButton = document.createElement("button");
mathButton.textContent = "CALCULATE";
mathButton.className = "action-btn";

const mathResult = document.createElement("div");
mathResult.className = "result-box";
mathResult.hidden = true;

// Math block is ready
mathCard.append(mathTitle, mathSelect, mathA, mathB, mathButton, mathResult);
mathColumn.append(mathCard);

// GEOMETRY

const geoColumn = document.createElement("div");
geoColumn.className = "col-md-6";

const geoCard = document.createElement("section");
geoCard.className = "calc-card geometry-card";

const geoTitle = document.createElement("h2");
geoTitle.textContent = "GEOMETRY";

const geoSelect = document.createElement("select");
geoSelect.className = "form-select mb-3";

const circleAreaOption = document.createElement("option");
circleAreaOption.value = "circleArea";
circleAreaOption.textContent = "Circle area";

const rectangleOption = document.createElement("option");
rectangleOption.value = "rectangleArea";
rectangleOption.textContent = "Rectangle area";

const circleLengthOption = document.createElement("option");
circleLengthOption.value = "circleLength";
circleLengthOption.textContent = "Circle length";

geoSelect.append(circleAreaOption, rectangleOption, circleLengthOption);

const geoA = document.createElement("input");
geoA.type = "number";
geoA.placeholder = "Radius";
geoA.className = "form-control mb-3";

const geoB = document.createElement("input");
geoB.type = "number";
geoB.placeholder = "Height";
geoB.className = "form-control mb-3";
geoB.hidden = true;

const geoButton = document.createElement("button");
geoButton.textContent = "CALCULATE";
geoButton.className = "action-btn";

const geoResult = document.createElement("div");
geoResult.className = "result-box";
geoResult.hidden = true;

// Geometry block is ready
geoCard.append(geoTitle, geoSelect, geoA, geoB, geoButton, geoResult);
geoColumn.append(geoCard);

// Page is ready
columns.append(mathColumn, geoColumn);
app.append(heading, columns);



// MATH EVENTS

mathButton.addEventListener("click", () => {
    const a = Number(mathA.value);
    const b = Number(mathB.value);

    let result;

    if (mathA.value === "" || mathB.value === "") {
        mathResult.textContent = "Enter both numbers";
    } else {
        if (mathSelect.value === "add") {
            result = add(a, b);
        } else if (mathSelect.value === "subtract") {
            result = subtract(a, b);
        } else if (mathSelect.value === "multiply") {
            result = multiply(a, b);
        } else if (mathSelect.value === "divide") {
            result = divide(a, b);
        }

        mathResult.textContent = "Result: " + result;
    }

    mathResult.hidden = false;
});

// GEOMETRY EVENTS

geoSelect.addEventListener("change", () => {
    if (geoSelect.value === "rectangleArea") {
        geoA.placeholder = "Width";
        geoB.hidden = false;
    } else {
        geoA.placeholder = "Radius";
        geoB.hidden = true;
    }

    geoResult.hidden = true;
});

geoButton.addEventListener("click", () => {
    const a = Number(geoA.value);
    const b = Number(geoB.value);

    let result;

    if (geoA.value === "") {
        geoResult.textContent = "Enter a dimension";
    } else if (geoSelect.value === "rectangleArea" && geoB.value === "") {
        geoResult.textContent = "Enter height";
    } else if (a < 0 || (geoSelect.value === "rectangleArea" && b < 0)) {
        geoResult.textContent = "Dimensions cannot be negative";
    } else {
        if (geoSelect.value === "circleArea") {
            result = getCircleArea(a);
        } else if (geoSelect.value === "rectangleArea") {
            result = getRectangleArea(a, b);
        } else if (geoSelect.value === "circleLength") {
            result = getCircleLength(a);
        }

        geoResult.textContent = "Result: " + result;
    }

    geoResult.hidden = false;
});
