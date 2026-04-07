// =========================
// 🎯 ELEMENT SELECTION
// =========================
const passwordField = document.querySelector('#password');       // Password display field
const lengthSlider = document.querySelector('#length');          // Slider to select password length
const lengthValue = document.querySelector('#length-value');     // Span showing current length
const lowerEl = document.querySelector('#lower');                // Checkbox for lowercase
const upperEl = document.querySelector('#upper');                // Checkbox for uppercase
const numbersEl = document.querySelector('#numbers');            // Checkbox for numbers
const symbolsEl = document.querySelector('#symbols');            // Checkbox for symbols
const generateBtn = document.querySelector('#generate');         // Button to generate password
const copyBtn = document.querySelector('#copy');                 // Button to copy password
const exportBtn = document.querySelector('#export');             // Button to export history
const historyList = document.querySelector('#history-list');     // List to show password history
const clearHistoryBtn = document.querySelector('#clear-history'); // Button to clear history
const strengthBar = document.querySelector('#strength-bar');     // Strength meter bar
const strengthText = document.querySelector('#strength-text');   // Strength label
const toast = document.querySelector('#toast');                  // Toast notification
const themeSelector = document.querySelector('#theme-selector'); // Theme dropdown

// =========================
// 🔤 CHARACTER SETS
// =========================
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '@%+/\\\'!#$^?:,(){}[]~-_.';

// =========================
// 🔑 PASSWORD GENERATION
// =========================
function generatePassword() {
  const sets = [];

  // Include character sets based on user selection
  if (lowerEl.checked) sets.push(lower);
  if (upperEl.checked) sets.push(upper);
  if (numbersEl.checked) sets.push(numbers);
  if (symbolsEl.checked) sets.push(symbols);

  // If no sets selected, return empty string
  if (!sets.length) return '';

  // Ensure at least one character from each selected set
  let pwd = sets.map(s => s[Math.floor(Math.random()*s.length)]);
  
  // Combine all selected sets into one string
  const all = sets.join('');

  // Fill remaining length randomly from all selected characters
  while (pwd.length < lengthSlider.value) {
    pwd.push(all[Math.floor(Math.random()*all.length)]);
  }

  // Shuffle password for randomness and return as string
  return pwd.sort(() => Math.random() - 0.5).join('');
}

// =========================
// 📊 PASSWORD STRENGTH
// =========================
function updateStrength(pwd) {
  let s = 0;

  // Criteria checks
  if (pwd.length >= 10) s++;         // Minimum length
  if (/[a-z]/.test(pwd)) s++;        // Contains lowercase
  if (/[A-Z]/.test(pwd)) s++;        // Contains uppercase
  if (/[0-9]/.test(pwd)) s++;        // Contains numbers
  if (/[^A-Za-z0-9]/.test(pwd)) s++; // Contains symbols

  // Update strength bar width
  strengthBar.style.width = (s/5)*100 + "%";

  // Update strength label and color
  if (s <= 2) {
    strengthText.textContent = "Strength: Weak";
    strengthBar.style.background = "red";
  } else if (s <= 4) {
    strengthText.textContent = "Strength: Medium";
    strengthBar.style.background = "orange";
  } else {
    strengthText.textContent = "Strength: Strong";
    strengthBar.style.background = "green";
  }
}

// =========================
// 🧠 PASSWORD HISTORY
// =========================
function saveToHistory(pwd) {
  if (!pwd) return;

  // Get existing history from localStorage or empty array
  let h = JSON.parse(localStorage.getItem('history')||'[]');

  // Add new password to the start of the array
  h.unshift(pwd);

  // Keep only latest 10 passwords
  h = h.slice(0,10);

  // Save updated history
  localStorage.setItem('history', JSON.stringify(h));

  // Update history UI
  renderHistory();
}

const historySearch = document.querySelector('#history-search'); // New search input

function renderHistory() {
  const h = JSON.parse(localStorage.getItem('history') || '[]');
  const filter = historySearch.value.toLowerCase(); // Current filter
  historyList.innerHTML = '';

  h.forEach(pwd => {
    if (!pwd.toLowerCase().includes(filter)) return; // Skip if it doesn't match search

    const li = document.createElement('li');
    li.textContent = pwd;

    // Click to reuse password
    li.onclick = () => {
      passwordField.value = pwd;
      updateStrength(pwd);
    };

    // Add "favorite" star button
    const star = document.createElement('button');
    star.textContent = '★';
    star.title = 'Mark as favorite';
    star.onclick = e => {
      e.stopPropagation(); // Prevent li click
      li.classList.toggle('favorite');
    };

    li.appendChild(star);
    historyList.appendChild(li);
  });
}

// Filter history as user types
historySearch.oninput = renderHistory;

// =========================
// ✍️ UPDATE PASSWORD
// =========================
function updatePassword() {
  const pwd = generatePassword();
  passwordField.value = pwd;
  updateStrength(pwd);
  saveToHistory(pwd);
}

// =========================
// 🛠 EVENT HANDLERS
// =========================

// Update length display and regenerate password
lengthSlider.oninput = () => {
  lengthValue.textContent = lengthSlider.value;
  updatePassword();
};

// Update password when any character type checkbox changes
[lowerEl, upperEl, numbersEl, symbolsEl].forEach(el =>
  el.onchange = updatePassword
);

// Generate password on button click
generateBtn.onclick = updatePassword;

// Copy password to clipboard with toast notification
copyBtn.onclick = () => {
  if (!passwordField.value) return;
  navigator.clipboard.writeText(passwordField.value);
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2000);
};

// Clear password history
clearHistoryBtn.onclick = () => {
  localStorage.removeItem('history');
  renderHistory();
};

// Export password history as JSON file
exportBtn.onclick = () => {
  const blob = new Blob(
    [localStorage.getItem('history')||'[]'],
    {type:'application/json'}
  );
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'password_history.json';
  a.click();
};

// =========================
// 🎨 THEME SELECTION
// =========================
themeSelector.onchange = () => {
  document.body.className = themeSelector.value;
  localStorage.setItem('theme', themeSelector.value);
};

// =========================
// 🚀 INITIALIZATION ON LOAD
// =========================
window.onload = () => {
  // Load saved theme or default to light
  const saved = localStorage.getItem('theme') || 'light';
  document.body.className = saved;
  themeSelector.value = saved;

  // Set initial length display, render history, and generate password
  lengthValue.textContent = lengthSlider.value;
  renderHistory();
  updatePassword();
};