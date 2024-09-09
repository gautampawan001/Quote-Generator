const toggleSwitch = document.getElementById('darkModeToggle');
toggleSwitch.addEventListener('change', function() {
  document.body.classList.toggle('dark-mode');
  showAlert("Mode Changed");
});

const quotes = {
  inspirational: [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "The best way to predict your future is to create it.", author: "Peter Drucker" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
  ],
  science: [
    { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
    { text: "The important thing is not to stop questioning.", author: "Albert Einstein" },
    { text: "Research is what I'm doing when I don't know what I'm doing.", author: "Wernher von Braun" }
  ]
};

let currentCategory = 'inspirational';
let currentIndex = 0;

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const categorySelect = document.getElementById('categories');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const randomBtn = document.getElementById('random-btn');
const increaseFontBtn = document.getElementById('increase-font');
const decreaseFontBtn = document.getElementById('decrease-font');

let fontSize = 1.5;

function applyTextAnimation() {

  quoteText.classList.add('animate-quote-text');
  quoteAuthor.classList.add('animate-quote-author');


  setTimeout(() => {
    quoteText.classList.remove('animate-quote-text');
    quoteAuthor.classList.remove('animate-quote-author');
  }, 500); // Match this time with CSS animation duration
}

function displayQuote(index) {
  const quote = quotes[currentCategory][index];
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `- ${quote.author}`;

  // Apply animations
  applyTextAnimation();

  // Adding some visual effect when quote is updated
  const quoteBox = document.querySelector('.quote-box');
  quoteBox.style.transform = 'scale(1.05)';
  setTimeout(() => quoteBox.style.transform = 'scale(1)', 300); // Reset after animation
}

function nextQuote() {
  currentIndex = (currentIndex + 1) % quotes[currentCategory].length;
  displayQuote(currentIndex);
  showAlert("Next quote");
}

function prevQuote() {
  currentIndex = (currentIndex - 1 + quotes[currentCategory].length) % quotes[currentCategory].length;
  displayQuote(currentIndex);
  showAlert("Previous quote");
}

function randomQuote() {
  currentIndex = Math.floor(Math.random() * quotes[currentCategory].length);
  displayQuote(currentIndex);
  showAlert("Random quote");
}

// Font size control
function increaseFontSize() {
  fontSize = Math.min(3, fontSize + 0.1);
  quoteText.style.fontSize = `${fontSize}rem`;
  quoteAuthor.style.fontSize = `${fontSize * 0.8}rem`;
  showAlert("Font size increased");
}

function decreaseFontSize() {
  fontSize = Math.max(1, fontSize - 0.1);
  quoteText.style.fontSize = `${fontSize}rem`;
  quoteAuthor.style.fontSize = `${fontSize * 0.8}rem`;
  showAlert("Font size decreased");
}


nextBtn.addEventListener('click', nextQuote);
prevBtn.addEventListener('click', prevQuote);
randomBtn.addEventListener('click', randomQuote);
increaseFontBtn.addEventListener('click', increaseFontSize);
decreaseFontBtn.addEventListener('click', decreaseFontSize);


function showAlert(message, type = "success") {
  const alertBox = document.getElementById('alert-box');
  alertBox.textContent = message;
  alertBox.classList.remove('success', 'error'); 
  alertBox.classList.add(type); 
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 1500); 
}


displayQuote(currentIndex);
