// =========================
// 📌 ELEMENT SELECTION
// =========================

// Main password display field
const passwordField = document.querySelector('#password');

// Slider for password length
const lengthSlider = document.querySelector('#length');

// Span that shows current length value
const lengthValue = document.querySelector('#length-value');

// Checkbox options for character types
const lowerEl = document.querySelector('#lower');
const upperEl = document.querySelector('#upper');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');

// Buttons
const generateBtn = document.querySelector('#generate');
const copyBtn = document.querySelector('#copy');

// History list container
const historyList = document.querySelector('#history-list');

// Theme toggle button (dark/light mode)
const themeToggle = document.querySelector('#theme-toggle');

// Strength meter elements
const strengthBar = document.querySelector('#strength-bar');
const strengthText = document.querySelector('#strength-text');


// =========================
// 🔤 CHARACTER SETS
// =========================

// Available characters for password generation
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '@%+/\\\'!#$^?:,(){}[]~-_.';


// =========================
// 🔁 GENERATE PASSWORD
// =========================

function generatePassword() {
  let chars = '';

  // Add selected character sets
  if (lowerEl.checked) chars += lower;
  if (upperEl.checked) chars += upper;
  if (numbersEl.checked) chars += numbers;
  if (symbolsEl.checked) chars += symbols;

  // If no options selected, return empty string
  if (!chars) return '';

  let password = '';

  // Generate password based on selected length
  for (let i = 0; i < lengthSlider.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}


// =========================
// ✍️ UPDATE PASSWORD UI
// =========================

function updatePassword() {
  const pwd = generatePassword();

  // Display password
  passwordField.value = pwd;

  // Update strength meter
  updateStrength(pwd);

  // Save to history
  saveToHistory(pwd);
}


// =========================
// 📊 PASSWORD STRENGTH
// =========================

function updateStrength(password) {
  let strength = 0;

  // Check different criteria
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password)) strength++;        // lowercase
  if (/[A-Z]/.test(password)) strength++;        // uppercase
  if (/[0-9]/.test(password)) strength++;        // numbers
  if (/[^A-Za-z0-9]/.test(password)) strength++; // symbols

  // Convert strength to percentage width
  const width = (strength / 5) * 100;
  strengthBar.style.width = width + "%";

  // Update text + color
  if (strength <= 2) {
    strengthText.textContent = "Strength: Weak";
    strengthBar.style.background = "red";
  } else if (strength <= 4) {
    strengthText.textContent = "Strength: Medium";
    strengthBar.style.background = "orange";
  } else {
    strengthText.textContent = "Strength: Strong";
    strengthBar.style.background = "green";
  }
}


// =========================
// 📋 COPY TO CLIPBOARD
// =========================

copyBtn.addEventListener('click', () => {
  // Prevent copying empty password
  if (!passwordField.value) return alert("No password!");

  // Copy to clipboard
  navigator.clipboard.writeText(passwordField.value);

  alert("Password Copied!");
});


// =========================
// 🎚 LENGTH SLIDER
// =========================

lengthSlider.addEventListener('input', () => {
  // Update displayed length value
  lengthValue.textContent = lengthSlider.value;

  // Regenerate password live
  updatePassword();
});


// =========================
// 🔘 OPTION TOGGLES
// =========================

// Regenerate password when any checkbox changes
[lowerEl, upperEl, numbersEl, symbolsEl].forEach(el => {
  el.addEventListener('change', updatePassword);
});


// =========================
// 🔘 GENERATE BUTTON
// =========================

generateBtn.addEventListener('click', updatePassword);


// =========================
// 🌙 DARK MODE TOGGLE
// =========================

themeToggle.addEventListener('click', () => {
  // Toggle dark class on body
  document.body.classList.toggle('dark');

  // Save preference in localStorage
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark')
  );
});

// Load saved theme on page load
if (localStorage.getItem('theme') === 'true') {
  document.body.classList.add('dark');
}


// =========================
// 🧠 PASSWORD HISTORY
// =========================

function saveToHistory(password) {
  if (!password) return;

  // Get existing history or create empty array
  let history = JSON.parse(localStorage.getItem('history')) || [];

  // Add new password to the beginning
  history.unshift(password);

  // Keep only last 10 passwords
  history = history.slice(0, 10);

  // Save back to localStorage
  localStorage.setItem('history', JSON.stringify(history));

  // Update UI
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem('history')) || [];

  // Clear current list
  historyList.innerHTML = '';

  // Create list items for each password
  history.forEach(pwd => {
    const li = document.createElement('li');
    li.textContent = pwd;

    // Click on history item to reuse password
    li.addEventListener('click', () => {
      passwordField.value = pwd;
      updateStrength(pwd);
    });

    historyList.appendChild(li);
  });
}

// Clear history button
const clearHistoryBtn = document.querySelector('#clear-history');

clearHistoryBtn.addEventListener('click', () => {
  // Clear localStorage history
  localStorage.removeItem('history');

  // Clear UI list
  historyList.innerHTML = '';

  alert("Password History Cleared!");
});


// =========================
// 🚀 INITIALIZATION
// =========================

function init() {
  // Set initial slider value display
  lengthValue.textContent = lengthSlider.value;

  // Load history from storage
  renderHistory();

  // Generate initial password
  updatePassword();
}

// Run init when page loads
window.addEventListener('load', init);