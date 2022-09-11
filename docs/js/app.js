"use strict";

// Background colors to be used
const backgroundColors = [
    "#E40303",
    "#FF8C00",
    "#FFDC00",
    "#008026",
    "#004DFF",
    "#750787"
];

// Image source URLs
const images = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png",
    "img/11.png",
    "img/12.png"
];

// Width of images displayed in CSS pixels
const imgWidth = 300;

// Time to display gender on screen in ms
const displayTime = 60000;

// DOM elements
const startScreen = document.getElementById("start-screen");
const genderView = document.getElementById("gender");
const genderGraphic = document.getElementById("gender-graphic");
const genderText = document.getElementById("gender-text");

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
 * Hides the start screen
 */
function hideStartScreen() {
    // Remove event listener added after pressing button
    genderGraphic.removeEventListener("load", hideStartScreen);

    // Hide start screen
    startScreen.classList.add("hidden");
}

/**
 * Shows the start screen
 */
function showStartScreen() {
    // Stop timeout set to show start screen
    clearTimeout(startScreenTimeout);

    // Show start screen
    startScreen.classList.remove("hidden");
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
    } while (checkCollision(graphicPos, textPos, imgWidth));  // TODO: add checks so this doesn't go on forever
    genderText.style.left = `${textPos.left}px`;
    genderText.style.top = `${textPos.top}px`;

    // Once the graphic has been loaded, hide the start screen
    genderGraphic.addEventListener("load", hideStartScreen);

    // Show the start screen if gender has been on screen for specified displayTime
    startScreenTimeout = setTimeout(showStartScreen, displayTime);
}

/**
 * Shows start screen if it is hidden, generates gender otherwise
 */
function handleKeypress() {
    if (startScreen.classList.contains("hidden")) {
        showStartScreen();
    } else {
        generateGender();
    }
}

// Timeout used to show start screen again after generating gender
let startScreenTimeout;

// Handle keypresses
document.addEventListener("keypress", handleKeypress);
