const quotes = [
  "Hello, IT. Have you tried turning it off and on again?",
  "Yes, I've tried turning it off and on again. \nNo, I don't know what a graphical user interface is. \nCan you just fix it?",
  "No, you're wrong. You're wrong. You're wrong.",
  "If debugging is the process of removing software bugs,\nthen programming must be the process of putting them in.",
  "There are two ways to write \nerror-free programs; only the third one works.",
  "The best thing about a boolean is \neven if you are wrong, \nyou are only off by a bit.",
  "A good programmer is someone who always looks \nboth ways before crossing a one-way street.",
  "Always code as if the guy who ends up maintaining \nyour code will be a violent psychopath \nwho knows where you live.",
  "There are 10 types of people in the \nworld: those who understand binary, " +
    "and those who don't.",
  "Computers make very fast, very accurate mistakes.",
  "Be nice to nerds. Chances are \nyou'll end up working for one.",
  "If at first you don't succeed; \ncall it version 1.0",
  "My software never has bugs. \nIt just develops random features.",
  "I would love to change the world, \nbut they won't give me the source code.",
  "I'm not anti-social; I'm just not user friendly",
  "My attitude isn't bad. It's in beta.",
  "PICNIC - Problem In Chair, Not In Computer",
  "A CD. How quaint. We have these in museums.",
  "People who smile while they are alone used to be called insane \nuntil we invented smartphones and social media.",
  "I won’t be impressed with technology until I can download food.",
  "Life is too short to remove USB safely.",
  "Wi-Fi went down for five minutes, so I had to talk to my family. \nThey seem like nice people.",
  "This band is pretty good!",
  "Especially for some IT nerds!",
  "Never let a computer know you're in a hurry.",
  "Hardware: The parts of a computer system that can be kicked.",
  "The problem with troubleshooting is that trouble shoots back.",
  "Once a new technology rolls over you, if you're not part \nof the steamroller, you're part of the road.",
  "Man is a slow, sloppy and brilliant thinker; \nthe machine is fast, accurate and stupid."  
];

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const ctx = canvas.getContext("2d");

const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?'";
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
let quoteHoldTime = 500; // Increase this value to make the quote stay on the screen for a longer period of time
let quoteY = Math.floor(canvas.height / 2);

/*
function drawMatrixRain() {
  // Draw matrix rain
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "limegreen";
  ctx.font = "20px Courier New";

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    ctx.fillText(text, i * 20, drops[i] * 20);

    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  // Display quote
  const quote = quotes[currentQuoteIndex];
  const quoteLines = quote.split("\n");
  const quoteHeight = quoteLines.length * 30;
  const quoteWidth = Math.max(...quoteLines.map(line => ctx.measureText(line).width));
  const quoteX = Math.floor(canvas.width / 2 - quoteWidth / 2);
  const quoteY = Math.floor(canvas.height / 2 - quoteHeight / 2);

  ctx.fillStyle = "limegreen";
  ctx.font = "20px Courier New";
  ctx.textAlign = "center";
  for (let i = 0; i < quoteLines.length; i++) {
    const line = quoteLines[i];
    let lineX = quoteX;
    for (let j = 0; j < line.length; j++) {
      if (isQuoteRevealing && i * line.length + j < quoteRevealProgress) {
        ctx.fillText(line[j], lineX, quoteY + i * 30);
      } else {
        ctx.fillText(characters.charAt(Math.floor(Math.random() * characters.length)), lineX, quoteY + i * 30);
      }
      lineX += 20;
    }
  }

  // Pan quote
  if (isQuoteRevealing) {
    if (quoteRevealProgress < quote.length) {
      quoteRevealProgress += 1;
    } else if (quoteHoldTime < 200) {
      quoteHoldTime++;
    } else {
      quoteRevealProgress = 0;
      quoteHoldTime = 0;
      isQuoteRevealing = false;
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      timeSinceLastQuote = 0;
    }
  } else {
    timeSinceLastQuote++;
    if (timeSinceLastQuote > 50) {
      // Roughly 15 seconds
      isQuoteRevealing = true;
    }
  }
}
*/
function drawMatrixRain() {
  // Draw matrix rain
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "limegreen";
  ctx.font = "20px Courier New";

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    ctx.fillText(text, i * 20, drops[i] * 20);

    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  // Display quote
  const quote = quotes[currentQuoteIndex];
  const quoteLines = quote.split("\n");
  const quoteHeight = quoteLines.length * 30;
  const quoteWidth = Math.max(...quoteLines.map(line => ctx.measureText(line).width));
  const quoteX = Math.floor(canvas.width / 2 - quoteWidth / 2);
  let quoteY = Math.floor(canvas.height / 2 - quoteHeight / 2);

  // Center quote vertically
  const maxQuoteY = window.innerHeight - quoteHeight;
  quoteY = Math.min(quoteY, maxQuoteY);

  ctx.fillStyle = "limegreen";
  ctx.font = "20px Courier New";
  ctx.textAlign = "center";

  // Pan quote
  if (isQuoteRevealing) {
    if (quoteRevealProgress < quote.length) {
      quoteRevealProgress += 1;
    } else if (quoteHoldTime < 400) {
      quoteHoldTime++;
    } else {
      quoteRevealProgress = 0;
      quoteHoldTime = 0;
      isQuoteRevealing = false;
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      timeSinceLastQuote = 0;
    }
      for (let i = 0; i < quoteLines.length; i++) {
        ctx.fillText(quoteLines[i], canvas.width / 2, quoteY + i * 30);
      }
  } else {
    timeSinceLastQuote++;
    if (timeSinceLastQuote > 400) {
      // Roughly 15 seconds
      isQuoteRevealing = true;
    }
  }
}
setInterval(drawMatrixRain, 43);
