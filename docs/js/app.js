"use strict";

const startScreen = document.getElementById("start-screen");
const genderView = document.getElementById("gender");
const genderGraphic = document.getElementById("gender-graphic");
const genderText = document.getElementById("gender-text");

// Width of images displayed in CSS pixels
const imgWidth = 300;

// TODO: rainbow colors
const backgroundColors = [
    "#FF0000",
    "#00FF00",
    "#0000FF"
];
const images = [
    "img/1.png",
    "img/2.png",
    "img/3.png"
];

/**
 * Generates a random integer between min and max
 * @param {Number} min Minimum number (inclusive)
 * @param {Number} max Maximum number (exclusive)
 * @returns A random integer in the range [min, max)
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a random item from the specified array
 * @param {Array} array Array to choose from
 * @returns A random item from array
 */
function randomChoice(array) {
    return array[randInt(0, array.length)];
}

/**
 * Generates a random position for an object, with the specified margin
 * @param {Number} margin Minimum margin from screen border
 * @returns An object with random values for the left and top position of an object
 */
function generatePosition(margin) {
    return {
        left: randInt(margin, window.innerWidth - margin),
        top: randInt(margin, window.innerHeight - margin),
    }
}

/**
 * Returns true if object in pos1 collides with object in pos2
 * @param {Object} pos1 Position object with left and top attributes
 * @param {Object} pos2 Position object with left and top attributes
 * @param {Number} size Minimum difference between positions (x and y) required to not collide
 * @returns true if objects collide, false otherwise
 */
function checkCollision(pos1, pos2, size) {
    return (Math.abs(pos1.left - pos2.left) < size) && (Math.abs(pos1.top - pos2.top) < size);
}

/**
 * Generates a gender and displays on the page
 */
function generateGender() {
    // Set background color
    genderView.style.backgroundColor = randomChoice(backgroundColors);
    
    // Set graphic content and position
    genderGraphic.src = randomChoice(images);
    const graphicPos = generatePosition(imgWidth);
    genderGraphic.style.left = `${graphicPos.left}px`;
    genderGraphic.style.top = `${graphicPos.top}px`;

    // Set text content and position
    genderText.textContent = "lorem";
    let textPos;
    do {
        textPos = generatePosition(imgWidth);
    } while (checkCollision(graphicPos, textPos, imgWidth));
    genderText.style.left = `${textPos.left}px`;
    genderText.style.top = `${textPos.top}px`;

    // Hide start screen
    startScreen.classList.add("hidden");
}

document.addEventListener("keydown", generateGender);
