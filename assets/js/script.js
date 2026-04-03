
var characterLength = 12; // default stronger length
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

function writePassword() {
  var valid = getPasswordOptions();

  if (valid) {
    passwordField.value = generatePassword();
  } else {
    passwordField.value = "";
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

// 🌟 Auto-Generate on Page Load
function autoGeneratePassword() {
  setDefaultOptions();
  passwordField.value = generatePassword();
}

// Event Listeners
generateBtn.addEventListener('click', writePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Run on page load
window.addEventListener('load', autoGeneratePassword);


