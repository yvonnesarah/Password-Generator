// =========================
// 🎯 ELEMENT SELECTION
// =========================
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
  if (lowerEl.checked) sets.push(lower);
  if (upperEl.checked) sets.push(upper);
  if (numbersEl.checked) sets.push(numbers);
  if (symbolsEl.checked) sets.push(symbols);

  if (!sets.length) return '';

  let pwd = sets.map(s => s[Math.floor(Math.random()*s.length)]);
  const all = sets.join('');

  while (pwd.length < lengthSlider.value) {
    pwd.push(all[Math.floor(Math.random()*all.length)]);
  }

  return pwd.sort(() => Math.random() - 0.5).join('');
}

// =========================
// 📊 PASSWORD STRENGTH
// =========================
function updateStrength(pwd) {
  let s = 0;
  if (pwd.length >= 10) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;

  strengthBar.style.width = (s/5)*100 + "%";

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
// 💬 TOAST NOTIFICATIONS
// =========================
function showToast(message, type = 'success', duration = 2000) {
  toast.textContent = message;
  toast.className = '';
  toast.classList.add('show', type);

  setTimeout(() => toast.classList.remove('show'), duration);
}

// =========================
// 🧠 PASSWORD HISTORY
// =========================
function saveToHistory(pwd) {
  if (!pwd) return;

  let h = JSON.parse(localStorage.getItem('history')||'[]');
  h.unshift(pwd);
  h = h.slice(0,10);
  localStorage.setItem('history', JSON.stringify(h));

  renderHistory();
}

function renderHistory() {
  const h = JSON.parse(localStorage.getItem('history')||'[]');
  const filter = historySearch.value.toLowerCase();
  historyList.innerHTML = '';

  h.forEach(pwd => {
    if (!pwd.toLowerCase().includes(filter)) return;

    const li = document.createElement('li');
    li.textContent = pwd;

    li.onclick = () => {
      passwordField.value = pwd;
      updateStrength(pwd);
      showToast('Password reused', 'info');
    };

    const star = document.createElement('button');
    star.textContent = '★';
    star.title = 'Mark as favorite';
    star.onclick = e => {
      e.stopPropagation();
      li.classList.toggle('favorite');
      showToast(li.classList.contains('favorite') ? 'Marked favorite' : 'Unmarked favorite', 'info');
    };

    li.appendChild(star);
    historyList.appendChild(li);
  });
}

// =========================
// ✍️ UPDATE PASSWORD
// =========================
function updatePassword() {
  if (!lowerEl.checked && !upperEl.checked && !numbersEl.checked && !symbolsEl.checked) {
    showToast('Select at least one character type!', 'warning');
    return;
  }

  const pwd = generatePassword();
  passwordField.value = pwd;
  updateStrength(pwd);
  saveToHistory(pwd);
}

// =========================
// 🛠 EVENT HANDLERS
// =========================
lengthSlider.oninput = () => {
  lengthValue.textContent = lengthSlider.value;
  updatePassword();
};

[lowerEl, upperEl, numbersEl, symbolsEl].forEach(el => el.onchange = updatePassword);
generateBtn.onclick = updatePassword;

copyBtn.onclick = () => {
  if (!passwordField.value) return;
  navigator.clipboard.writeText(passwordField.value);
  showToast('Password copied!', 'success');
};

clearHistoryBtn.onclick = () => {
  localStorage.removeItem('history');
  renderHistory();
  showToast('Password history cleared', 'info');
};

exportBtn.onclick = () => {
  const blob = new Blob([localStorage.getItem('history')||'[]'], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'password_history.json';
  a.click();
};

historySearch.oninput = renderHistory;

themeSelector.onchange = () => {
  document.body.className = themeSelector.value;
  localStorage.setItem('theme', themeSelector.value);
};

// =========================
// 🚀 INITIALIZATION ON LOAD
// =========================
window.onload = () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.className = saved;
  themeSelector.value = saved;

  lengthValue.textContent = lengthSlider.value;
  renderHistory();
  updatePassword();
};