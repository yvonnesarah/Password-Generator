var characterLength = 12;
var choiceArray = [];

var specialCharacters = ['@','%','+','\\','/','\'','!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];
var numericCharacters = ['0','1','2','3','4','5','6','7','8','9'];
var lowerCasedCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');
var upperCasedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function setDefaultOptions() {
  choiceArray = [].concat(
    lowerCasedCharacters,
    upperCasedCharacters,
    numericCharacters,
    specialCharacters
  );
}

function getPasswordOptions() {
  choiceArray = [];

  characterLength = parseInt(prompt("Password length (10–64)?"));

  if (isNaN(characterLength) || characterLength < 10 || characterLength > 64) {
    alert("Enter a number between 10 and 64");
    return false;
  }

  if (confirm("Include lowercase?")) choiceArray = choiceArray.concat(lowerCasedCharacters);
  if (confirm("Include uppercase?")) choiceArray = choiceArray.concat(upperCasedCharacters);
  if (confirm("Include special characters?")) choiceArray = choiceArray.concat(specialCharacters);
  if (confirm("Include numbers?")) choiceArray = choiceArray.concat(numericCharacters);

  if (choiceArray.length === 0) {
    alert("You must select at least one character type!");
    return false;
  }

  return true;
}

function generatePassword() {
  var password = "";

  for (var i = 0; i < characterLength; i++) {
    var randomIndex = Math.floor(Math.random() * choiceArray.length);
    password += choiceArray[randomIndex];
  }

  return password;
}

var generateBtn = document.querySelector('#generate');
var copyBtn = document.querySelector('#copy');
var passwordField = document.querySelector('#password');
var strengthBar = document.querySelector('#strength-bar');
var strengthText = document.querySelector('#strength-text');

function writePassword() {
  var valid = getPasswordOptions();

  if (valid) {
    var pwd = generatePassword();
    passwordField.value = pwd;
    updateStrength(pwd);
  } else {
    passwordField.value = "";
    updateStrength("");
  }
}

// 🌟 Copy to Clipboard Feature
function copyToClipboard() {
  var password = passwordField.value;

  if (!password) {
    alert("No password to copy!");
    return;
  }

  navigator.clipboard.writeText(password)
    .then(() => alert("Password copied to clipboard!"))
    .catch(() => alert("Failed to copy password."));
}

// 🧩 Strength Indicator Logic
function updateStrength(password) {
  var strength = 0;

  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  var width = (strength / 5) * 100;
  strengthBar.style.width = width + "%";

  if (strength <= 2) {
    strengthText.textContent = "Strength: Weak";
    strengthBar.style.background = "red";
  } else if (strength === 3 || strength === 4) {
    strengthText.textContent = "Strength: Medium";
    strengthBar.style.background = "orange";
  } else {
    strengthText.textContent = "Strength: Strong";
    strengthBar.style.background = "green";
  }
}

// 🔄 Auto-Generate on Page Load
function autoGeneratePassword() {
  setDefaultOptions();
  var pwd = generatePassword();
  passwordField.value = pwd;
  updateStrength(pwd);
}

// Event Listeners
generateBtn.addEventListener('click', writePassword);
copyBtn.addEventListener('click', copyToClipboard);

window.addEventListener('load', autoGeneratePassword);


