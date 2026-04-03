const passwordField = document.querySelector('#password');
const lengthSlider = document.querySelector('#length');
const lengthValue = document.querySelector('#length-value');

const lowerEl = document.querySelector('#lower');
const upperEl = document.querySelector('#upper');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');

const generateBtn = document.querySelector('#generate');
const copyBtn = document.querySelector('#copy');
const historyList = document.querySelector('#history-list');
const themeToggle = document.querySelector('#theme-toggle');

const strengthBar = document.querySelector('#strength-bar');
const strengthText = document.querySelector('#strength-text');

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '@%+/\\\'!#$^?:,(){}[]~-_.';

// 🔁 Generate password
function generatePassword() {
  let chars = '';
  if (lowerEl.checked) chars += lower;
  if (upperEl.checked) chars += upper;
  if (numbersEl.checked) chars += numbers;
  if (symbolsEl.checked) chars += symbols;

  if (!chars) return '';

  let password = '';
  for (let i = 0; i < lengthSlider.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

// ✍️ Update UI
function updatePassword() {
  const pwd = generatePassword();
  passwordField.value = pwd;
  updateStrength(pwd);
  saveToHistory(pwd);
}

// 📊 Strength meter
function updateStrength(password) {
  let strength = 0;
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const width = (strength / 5) * 100;
  strengthBar.style.width = width + "%";

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

// 📋 Copy
copyBtn.addEventListener('click', () => {
  if (!passwordField.value) return alert("No password!");
  navigator.clipboard.writeText(passwordField.value);
  alert("Password been copied!");
});

// 🎚 Slider update
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
  updatePassword(); // LIVE update
});

// 🔘 Toggle live updates
[lowerEl, upperEl, numbersEl, symbolsEl].forEach(el => {
  el.addEventListener('change', updatePassword);
});

// 🔘 Button
generateBtn.addEventListener('click', updatePassword);

// 🌙 Dark mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark'));
});

// Load theme
if (localStorage.getItem('theme') === 'true') {
  document.body.classList.add('dark');
}

// 🧠 History
function saveToHistory(password) {
  if (!password) return;

  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.unshift(password);
  history = history.slice(0, 10);

  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  historyList.innerHTML = '';

  history.forEach(pwd => {
    const li = document.createElement('li');
    li.textContent = pwd;

    // click to reuse
    li.addEventListener('click', () => {
      passwordField.value = pwd;
      updateStrength(pwd);
    });

    historyList.appendChild(li);
  });
}

// 🚀 Init
function init() {
  lengthValue.textContent = lengthSlider.value;
  renderHistory();
  updatePassword();
}

window.addEventListener('load', init);