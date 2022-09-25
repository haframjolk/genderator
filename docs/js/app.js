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
    "img/12.png",
    "img/13.png",
    "img/14.png",
    "img/15.png",
    "img/16.png"
];

// Words to use
const words = ["kosmós", "kaos", "alsæla", "já", "nei", "úff", "???", "!!!", "UwU", "aha!", "öööö", "heimurinn", "leið", "farartæki", "algrími", "alkuldi", "varmi", "dagbók", "augu", "nef", "munnur", "líkami", "fyndið", "sniðugt", "kort", "landslag", "blóm", "líf", "dauði", "gleði", "sorg", "OwO", "haaaaa", "þvættingur", "skilningur", "hraði", "kósí", "list", "ljóð", "fjöll", "sjór", "lækur", "skýin", "sól", "tungl", "fluga", "snigill", "manneskja", "einmitt", "taugar", "rætur", "flækja", "lauf", "skógur", "tígull", "stjarna", "hendur", "stjórn", "stjórnleysi", "jafnvægi", "óskilamunur", "fylgja", "skuggi", "ljós", "eitt", "pláneta", "heimur", "vídd", "tími", "lengd", "rými", "regnbogi", "veður", "hreinsun", "engill", "púki", "efni", "tómið", "tölva", "atóm", "stemming", "stuð", "þrumur", "morgun", "texti", "hljóð", "þögn", "læti", "vatn", "loft", "eldur"]

// Width of images displayed in CSS pixels, used for calculating margins
const imgWidth = 300;

// Time to display gender on screen in ms
const displayTime = 60000;

// DOM elements
const startScreen = document.getElementById("start-screen");
const genderView = document.getElementById("gender");
const genderGraphics = document.querySelectorAll("#gender-graphics img");
const genderWords = document.querySelectorAll("#gender-words span");

// Timeout used to show start screen again after generating gender
let startScreenTimeout;

/**
 * Generates a random integer between min and max
 * @param {number} min Minimum number (inclusive)
 * @param {number} max Maximum number (exclusive)
 * @returns A random integer in the range [min, max)
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a random item from the specified array
 * @param {any[]} array Array to choose from
 * @returns A random item from array
 */
function randomChoice(array) {
    return array[randInt(0, array.length)];
}

/**
 * Generates a random percentage position for an object
 * @returns An object with random values between 0 and 100 for the left and top positions of an object
 */
function generatePercentPosition() {
    return {
        left: randInt(0, 100),
        top: randInt(0, 100)
    };
}

/**
 * Hides the start screen
 */
function hideStartScreen() {
    // Hide start screen
    startScreen.classList.add("hidden");

    // Show the start screen if gender has been on screen for specified displayTime
    startScreenTimeout = setTimeout(showStartScreen, displayTime);
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
    
    // Graphics
    const usedGraphics = [];
    // Iterator
    let i = 0;
    for (const genderGraphic of genderGraphics) {
        // Choose a random graphic that has not been used before in this gender
        let src;
        do {
            src = randomChoice(images);
        } while (usedGraphics.includes(src));

        // Add graphic to usedGraphics to make sure it doesn't appear twice
        usedGraphics.push(src);

        // Set graphic content
        genderGraphic.src = src;

        // Set graphic position
        const graphicPos = generatePercentPosition();
        genderGraphic.style.left = `max(0px, ${graphicPos.left}% - ${imgWidth}px)`;
        genderGraphic.style.top = `max(0px, ${graphicPos.top}% - ${imgWidth}px)`;
    }

    // Words
    const usedWords = [];
    // Iterator
    let j = 0;
    for (const genderWord of genderWords) {
        // Choose a random word that has not been used before in this gender
        let word;
        do {
            word = randomChoice(words);
        } while (usedWords.includes(word));

        // Add word to usedWords to make sure it doesn't appear twice
        usedWords.push(word);

        // Set word content
        genderWord.textContent = randomChoice(words);

        // Set word position
        const wordPos = generatePercentPosition();
        genderWord.style.left = `max(0px, ${wordPos.left}% - ${imgWidth}px)`;
        genderWord.style.top = `max(0px, ${wordPos.top}% - ${imgWidth}px)`;
    }

    // Hide the start screen
    hideStartScreen();
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

// Preload images
const imgElements = [];
for (const src of images) {
    const image = new Image();
    image.src = src;
    imgElements.push(image);
}

// Handle keypresses
document.addEventListener("keypress", handleKeypress);
