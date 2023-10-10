const quotes = [
  "Have you tried turning it off and on again?",
  "The world as it was at the end of the 20th century.",
  "Have you ever had a dream, Neo, that you were so sure was real?",
  // ... more quotes
];

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const columns = canvas.width / 20; // width of each character
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

let currentQuoteIndex = 0;
let quoteDisplayTime = 0;
let isQuoteRevealing = false;
let quoteRevealProgress = 0;
let quoteRevealStart = Math.floor(columns / 3); // About 1/3 in, adjust as needed
let timeSinceLastQuote = 0;
let currentQuote = quotes[0];
let quoteHoldTime = 0;
let quoteY = Math.floor(canvas.height / 2) + 15;  // +15 to account for the font size change

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function displayQuote() {
  const quote = quotes[currentQuoteIndex];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#33ff33";
  ctx.font = "bold 30px Courier New";
  ctx.textAlign = "center";
  ctx.fillText(quote, canvas.width / 2, canvas.height / 2);

  if (quoteDisplayTime > 150) {
    quoteDisplayTime = 0;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    return false; // Quote display complete
  }

  quoteDisplayTime++;
  return true; // Quote still displaying
}

//let isQuoteDisplayed = false;
//let framesSinceLastQuote = 0;

function drawMatrixRain() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "limegreen";
  ctx.font = "20px Courier New";

  let quoteX = Math.floor((canvas.width - currentQuote.length * 20) / 2);

  for (let i = 0; i < drops.length; i++) {
    if (isQuoteRevealing && i == quoteRevealStart + quoteRevealProgress) {
      ctx.fillStyle = "#33ff33";  // A brighter shade of green
      ctx.font = "bold 30px Courier New";
      ctx.fillText(
        currentQuote[quoteRevealProgress],
        quoteX + quoteRevealProgress * 20,
        quoteY
      );
    } else {
      const text = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      ctx.fillText(text, i * 20, drops[i] * 20);
    }

    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  if (isQuoteRevealing) {
    if (quoteRevealProgress < currentQuote.length) {
      quoteRevealProgress += 1;
    } else if (quoteHoldTime < 150) {
      quoteHoldTime++;
    } else {
      quoteRevealProgress = 0;
      quoteHoldTime = 0;
      isQuoteRevealing = false;
      currentQuote = quotes[(quotes.indexOf(currentQuote) + 1) % quotes.length];
      timeSinceLastQuote = 0;
    }
  } else {
    timeSinceLastQuote++;
    if (timeSinceLastQuote > 450) {
      // Roughly 15 seconds
      isQuoteRevealing = true;
    }
  }
}

window.addEventListener('resize', resizeCanvas);
setInterval(drawMatrixRain, 33);
