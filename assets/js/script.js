// =========================
// 🎯 ELEMENTS
// =========================
// Select DOM elements for password field, controls, buttons, history, strength, toast notifications, and theme selector
const passwordField = document.querySelector('#password');
const lengthSlider = document.querySelector('#length');
const lengthValue = document.querySelector('#length-value');
const lowerEl = document.querySelector('#lower');
const upperEl = document.querySelector('#upper');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateBtn = document.querySelector('#generate');
const copyBtn = document.querySelector('#copy');
const exportBtn = document.querySelector('#export');
const historyList = document.querySelector('#history-list');
const clearHistoryBtn = document.querySelector('#clear-history');
const strengthBar = document.querySelector('#strength-bar');
const strengthText = document.querySelector('#strength-text');
const toast = document.querySelector('#toast');
const themeSelector = document.querySelector('#theme-selector');
const historySearch = document.querySelector('#history-search');

// =========================
// 🔤 CHAR SETS
// =========================
// Character sets for password generation
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '@%+/\\\'!#$^?:,(){}[]~-_.';

// =========================
// 🔑 GENERATE PASSWORD
// =========================
function generatePassword() {
  const selectedSets = [];

  // Add selected character sets based on checkbox inputs
  if (lowerEl.checked) selectedSets.push(lower);
  if (upperEl.checked) selectedSets.push(upper);
  if (numbersEl.checked) selectedSets.push(numbers);
  if (symbolsEl.checked) selectedSets.push(symbols);

  // ⚡ EDGE CASE: no sets selected, return empty string
  if (selectedSets.length === 0) return '';

  const length = parseInt(lengthSlider.value);

  // ⚡ EDGE CASE: password length smaller than number of selected sets
  if (length < selectedSets.length) {
    showToast(`Minimum length is ${selectedSets.length}`, 'warning');
    lengthSlider.value = selectedSets.length;
    lengthValue.textContent = selectedSets.length;
  }

  const finalLength = Math.max(length, selectedSets.length);
  let passwordArray = [];

  // ✅ Ensure at least ONE char from EACH selected set
  selectedSets.forEach(set => {
    passwordArray.push(set[Math.floor(Math.random() * set.length)]);
  });

  // Combine all sets for remaining characters
  const allChars = selectedSets.join('');

  // Fill remaining password length randomly from all selected characters
  while (passwordArray.length < finalLength) {
    passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle password array using Fisher-Yates algorithm for better randomness
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
}

// =========================
// 📊 STRENGTH
// =========================
function updateStrength(pwd) {
  let s = 0;

  // Increment strength score based on password criteria
  if (pwd.length >= 10) s++;          // length >= 10
  if (/[a-z]/.test(pwd)) s++;        // contains lowercase
  if (/[A-Z]/.test(pwd)) s++;        // contains uppercase
  if (/[0-9]/.test(pwd)) s++;        // contains number
  if (/[^A-Za-z0-9]/.test(pwd)) s++; // contains symbol

  // Update strength bar width
  strengthBar.style.width = (s/5)*100 + "%";

  // Update strength text and color
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
// 💬 TOAST
// =========================
// Display temporary toast notification
function showToast(msg, type='success', duration=2000){
  toast.textContent = msg;
  toast.className = '';
  toast.classList.add('show', type);
  setTimeout(()=>toast.classList.remove('show'), duration);
}

// =========================
// 🧠 HISTORY
// =========================
// Save password to localStorage history (max 10 entries)
function saveToHistory(pwd){
  if (!pwd) return;
  let h = JSON.parse(localStorage.getItem('history')||'[]');
  h.unshift(pwd);
  h = h.slice(0,10);
  localStorage.setItem('history', JSON.stringify(h));
  renderHistory();
}

// Render password history and allow interactions
function renderHistory(){
  const h = JSON.parse(localStorage.getItem('history')||'[]');
  const filter = historySearch.value.toLowerCase();
  historyList.innerHTML='';

  h.forEach(pwd=>{
    if (!pwd.toLowerCase().includes(filter)) return;

    const li = document.createElement('li');
    li.textContent = pwd;

    // Click password to reuse it
    li.onclick = ()=>{
      passwordField.value = pwd;
      updateStrength(pwd);
      showToast('Password reused','info');
    };

    // Favourite toggle button
    const star = document.createElement('button');
    star.textContent = '★';
    star.onclick = e=>{
      e.stopPropagation();
      li.classList.toggle('favourite');
      showToast(li.classList.contains('favourite') ? 'Marked favourite' : 'Unmarked favourite','info');
    };

    li.appendChild(star);
    historyList.appendChild(li);
  });
}

// =========================
// 🛡 SECURITY CONFIG
// =========================
// Clipboard and UI clearing timeouts
const SECURITY_CONFIG = {
  clipboardTimeout: 10000,        // ms before clearing clipboard
  clearPasswordTimeout: 15000,    // ms before clearing displayed password
  requireFocus: true              // only copy if tab is active
};

// =========================
// 🛡 CLIPBOARD SECURITY
// =========================
function copyToClipboardSecure(text){

  // Prevent copying if tab inactive
  if (SECURITY_CONFIG.requireFocus && document.hidden){
    showToast('Cannot copy while tab inactive','warning');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(()=>{
      showToast(`Copied! Clears in ${SECURITY_CONFIG.clipboardTimeout/1000}s`);

      // Clear clipboard after timeout
      setTimeout(()=>{
        navigator.clipboard.readText().then(current=>{
          if(current===text){
            navigator.clipboard.writeText('');
            showToast('Clipboard cleared','info');
          }
        }).catch(()=>{});
      }, SECURITY_CONFIG.clipboardTimeout);

      // Clear displayed password after timeout
      setTimeout(()=>{
        if(passwordField.value===text){
          passwordField.value='';
          strengthBar.style.width='0%';
          strengthText.textContent='Strength: -';
          showToast('Password cleared from screen','info');
        }
      }, SECURITY_CONFIG.clearPasswordTimeout);

    })
    .catch(()=>showToast('Copy failed','warning'));
}

// =========================
// ✍️ UPDATE PASSWORD
// =========================
function updatePassword(){
  // Ensure at least one character type is selected
  if (!lowerEl.checked && !upperEl.checked && !numbersEl.checked && !symbolsEl.checked){
    showToast('Select at least one character type','warning');

    const controls = document.querySelector('.controls');
    controls.classList.add('shake'); // visual shake animation
    setTimeout(() => controls.classList.remove('shake'), 500);

    return;
  }

  const pwd = generatePassword();

  if (!pwd) return; // safety fallback

  passwordField.value = pwd;
  updateStrength(pwd);
  saveToHistory(pwd);
}

// =========================
// 🛠 EVENTS
// =========================
// Slider input updates length value and regenerates password
lengthSlider.oninput = ()=>{
  lengthValue.textContent = lengthSlider.value;
  updatePassword();
};

// Checkbox change events regenerate password
[lowerEl,upperEl,numbersEl,symbolsEl].forEach(el=>el.onchange=updatePassword);

// Generate button click
generateBtn.onclick = updatePassword;

// Copy button click
copyBtn.onclick = ()=>{
  if(!passwordField.value){
    showToast('No password','warning');
    return;
  }
  copyToClipboardSecure(passwordField.value);
};

// Clear history button click
clearHistoryBtn.onclick = ()=>{
  localStorage.removeItem('history');
  renderHistory();
  showToast('History cleared','info');
};

// Export history button click
exportBtn.onclick = ()=>{
  const blob = new Blob([localStorage.getItem('history')||'[]'],{type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download='password_history.json';
  a.click();
};

// History search input event
historySearch.oninput = renderHistory;

// Theme selector change
themeSelector.onchange = ()=>{
  applyTheme(themeSelector.value);
};

// Auto-hide password when switching tabs
document.addEventListener('visibilitychange',()=>{
  if(document.hidden && passwordField.value){
    passwordField.value='';
    strengthBar.style.width='0%';
    strengthText.textContent='Strength: -';
    showToast('Password hidden (tab inactive)','info');
  }
});

// =========================
// 🎨 THEME
// =========================
function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme); // persist theme in localStorage
}

// =========================
// 🚀 INIT
// =========================
window.onload = ()=>{
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  themeSelector.value = savedTheme;

  // Set initial password length display and generate initial password
  lengthValue.textContent = lengthSlider.value;
  renderHistory();
  updatePassword();
};