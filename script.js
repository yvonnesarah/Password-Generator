 // 1. prompt the user for the password criteria
  //   a. Password length 10 < 64
  //   b. Lowercase, Uppercase, Numeric, Special characters ($@%&*, etc.)
  //2. Validate the input
  //3. Generate password based on criteria
  
  //4. Display password to the page
 


// Array of character Length to be included in password
var characterLength = 10;

var choiceArray = [];

// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  choiceArray = [];
  
  characterLength = parseInt(prompt("How many characters do you want your password to be? (8 - 128 characters"));

if(isNaN(characterLength) || characterLength < 8 || characterLength > 128) {
    alert("Character length has to be a  number, 8 - 128 digits. Please try again!!!");
    return false;
  } 

  if(confirm("Would you like lowercase letters in your password?")){
    choiceArray = choiceArray.concat(lowerCasedCharacters);
  }

  if(confirm("Would you like uppercase letters in your password?")){
    choiceArray = choiceArray.concat(upperCasedCharacters);
  }
  
  if(confirm("Would you like special characters in your password?")){
    choiceArray = choiceArray.concat(specialCharacters);
  }
  if(confirm("Would you like numbers in your password?")){
    choiceArray = choiceArray.concat(numericCharacters);
  }
return true;

}

// Function to generate password with user input
function generatePassword() {
  //console.log("You clicked the button!!!")

 var password = "";
for(var i = 0; i < characterLength; i++){
  var randomIndex = Math.floor(Math.random() * choiceArray.length);
  password = password + choiceArray[randomIndex];
}
return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var correctPassword =  getPasswordOptions(); // either true or false
  var passwordText = document.querySelector('#password');
  
  if(correctPassword){
    var newPassword = generatePassword();
    passwordText.value = newPassword;
  }else{
    passwordText.value = "";
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
