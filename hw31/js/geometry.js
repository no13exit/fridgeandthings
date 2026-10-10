
const PI = 3.14159;

function getCircleArea(radius) {
    return PI * radius * radius;
}

function getRectangleArea(width, height) {
    return width * height;
}

function getCircleLength(radius) {
    return 2 * PI * radius;
}

export { PI, getCircleArea, getRectangleArea, getCircleLength };
