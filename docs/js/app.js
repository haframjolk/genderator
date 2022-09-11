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

// Words to use
const words = ["kosmós", "kaos", "alsæla", "já", "nei", "úff", "???", "!!!", "UwU", "aha!", "öööö", "heimurinn", "leið", "farartæki", "algrími", "alkuldi", "varmi", "dagbók", "augu", "nef", "munnur", "líkami", "fyndið", "sniðugt", "kort", "landslag", "blóm", "líf", "dauði", "gleði", "sorg", "OwO", "haaaaa", "þvættingur", "skilningur", "hraði", "kósí", "list", "ljóð", "fjöll", "sjór", "lækur", "skýin", "sól", "tungl", "fluga", "snigill", "manneskja", "einmitt", "taugar", "rætur", "flækja", "lauf", "skógur", "tígull", "stjarna", "hendur", "stjórn", "stjórnleysi", "jafnvægi", "óskilamunur", "fylgja", "skuggi", "ljós", "eitt", "pláneta", "heimur", "vídd", "tími", "lengd", "rými", "regnbogi", "veður", "hreinsun", "engill", "púki", "efni", "tómið", "tölva", "atóm", "stemming", "stuð", "þrumur", "morgun", "texti", "hljóð", "þögn", "læti", "vatn", "loft", "eldur"]

// Width of images displayed in CSS pixels
const imgWidth = 300;

// Time to display gender on screen in ms
const displayTime = 60000;

// DOM elements
const startScreen = document.getElementById("start-screen");
const genderView = document.getElementById("gender");
const genderGraphics = document.querySelector("#gender-graphics").children;
const genderWords = document.querySelector("#gender-words").children;

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
 * @param {Number} width Screen width
 * @param {Number} height Screen height
 * @returns An object with random values for the left and top position of an object
 */
function generatePosition(margin, width, height) {
    return {
        left: randInt(margin, width - margin),
        top: randInt(margin, height - margin),
    }
}

/**
 * Hides the start screen
 */
function hideStartScreen() {
    // Remove event listener added after pressing button
    // TODO: fix
    // genderGraphic.removeEventListener("load", hideStartScreen);

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
    // TODO: show 2–3 words and 2–3 images to each screen

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
        const screenFraction = Math.floor(window.innerWidth / genderGraphics.length);
        const graphicPos = generatePosition(imgWidth, screenFraction, window.innerHeight);
        genderGraphic.style.left = `${graphicPos.left + i * screenFraction}px`;
        genderGraphic.style.top = `${graphicPos.top}px`;

        // Increment i for next fraction
        i++;
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
        // TODO: fix words sometimes appearing off-screen
        const screenFraction = Math.floor(window.innerHeight / genderWords.length);
        const wordPos = generatePosition(imgWidth, window.innerWidth, screenFraction);
        genderWord.style.left = `${wordPos.left}px`;
        genderWord.style.top = `${wordPos.top + j * screenFraction}px`;

        // Increment i for next fraction
        j++;
    }
    // TODO: add collision detection
    // do {
        
    // } while (checkCollision(graphicPos, textPos, imgWidth));  // TODO: add checks so this doesn't go on forever

    // TODO: fix this for multiple graphics
    // Once the graphic has been loaded, hide the start screen
    // genderGraphic.addEventListener("load", hideStartScreen);
    hideStartScreen();

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
