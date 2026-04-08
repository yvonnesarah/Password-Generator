// =========================
// 🎯 ELEMENTS
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
// 🔤 CHAR SETS
// =========================
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '@%+/\\\'!#$^?:,(){}[]~-_.';

// =========================
// 🔑 GENERATE PASSWORD
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
// 📊 STRENGTH
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
// 💬 TOAST
// =========================
function showToast(msg, type='success', duration=2000){
  toast.textContent = msg;
  toast.className = '';
  toast.classList.add('show', type);
  setTimeout(()=>toast.classList.remove('show'), duration);
}

// =========================
// 🧠 HISTORY
// =========================
function saveToHistory(pwd){
  if (!pwd) return;
  let h = JSON.parse(localStorage.getItem('history')||'[]');
  h.unshift(pwd);
  h = h.slice(0,10);
  localStorage.setItem('history', JSON.stringify(h));
  renderHistory();
}

function renderHistory(){
  const h = JSON.parse(localStorage.getItem('history')||'[]');
  const filter = historySearch.value.toLowerCase();
  historyList.innerHTML='';

  h.forEach(pwd=>{
    if (!pwd.toLowerCase().includes(filter)) return;

    const li = document.createElement('li');
    li.textContent = pwd;

    li.onclick = ()=>{
      passwordField.value = pwd;
      updateStrength(pwd);
      showToast('Password reused','info');
    };

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
const SECURITY_CONFIG = {
  clipboardTimeout: 10000,
  clearPasswordTimeout: 15000,
  requireFocus: true
};

// =========================
// 🛡 CLIPBOARD SECURITY
// =========================
function copyToClipboardSecure(text){

  if (SECURITY_CONFIG.requireFocus && document.hidden){
    showToast('Cannot copy while tab inactive','warning');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(()=>{
      showToast(`Copied! Clears in ${SECURITY_CONFIG.clipboardTimeout/1000}s`);

      // clear clipboard
      setTimeout(()=>{
        navigator.clipboard.readText().then(current=>{
          if(current===text){
            navigator.clipboard.writeText('');
            showToast('Clipboard cleared','info');
          }
        }).catch(()=>{});
      }, SECURITY_CONFIG.clipboardTimeout);

      // clear UI
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
  if (!lowerEl.checked && !upperEl.checked && !numbersEl.checked && !symbolsEl.checked){
  showToast('Select at least one option','warning');

  const controls = document.querySelector('.controls');
  controls.classList.add('shake');

  setTimeout(() => controls.classList.remove('shake'), 500);

  return;
}

  const pwd = generatePassword();
  passwordField.value = pwd;
  updateStrength(pwd);
  saveToHistory(pwd);
}

// =========================
// 🛠 EVENTS
// =========================
lengthSlider.oninput = ()=>{
  lengthValue.textContent = lengthSlider.value;
  updatePassword();
};

[lowerEl,upperEl,numbersEl,symbolsEl].forEach(el=>el.onchange=updatePassword);

generateBtn.onclick = updatePassword;

copyBtn.onclick = ()=>{
  if(!passwordField.value){
    showToast('No password','warning');
    return;
  }
  copyToClipboardSecure(passwordField.value);
};

clearHistoryBtn.onclick = ()=>{
  localStorage.removeItem('history');
  renderHistory();
  showToast('History cleared','info');
};

exportBtn.onclick = ()=>{
  const blob = new Blob([localStorage.getItem('history')||'[]'],{type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download='password_history.json';
  a.click();
};

historySearch.oninput = renderHistory;

themeSelector.onchange = ()=>{
  document.body.className = themeSelector.value;
  localStorage.setItem('theme', themeSelector.value);
};

// auto-hide on tab switch
document.addEventListener('visibilitychange',()=>{
  if(document.hidden && passwordField.value){
    passwordField.value='';
    strengthBar.style.width='0%';
    strengthText.textContent='Strength: -';
    showToast('Password hidden (tab inactive)','info');
  }
});

// =========================
// 🚀 INIT
// =========================
window.onload = ()=>{
  const saved = localStorage.getItem('theme')||'light';
  document.body.className = saved;
  themeSelector.value = saved;

  lengthValue.textContent = lengthSlider.value;
  renderHistory();
  updatePassword();
};