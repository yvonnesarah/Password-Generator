 // 1. Prompt the user for the password criteria
//   a. Password length between 10 and 64 characters
//   b. Allow the user to choose whether to include Lowercase, Uppercase, Numeric, and Special characters

// 2. Validate the input (ensuring valid password length and criteria selection)
// 3. Generate the password based on selected criteria

// 4. Display the generated password to the page

// Array to store the password length (default is 10)
var characterLength = 10;

// Array to hold the user's selected character types for the password
var choiceArray = [];

// Array of special characters to be included in password
var specialCharacters = [
  '@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Function to prompt user for password options and validate input
function getPasswordOptions() {
  choiceArray = [];  // Reset the array holding character options
  
  // Prompt user for the password length and parse it to an integer
  characterLength = parseInt(prompt("How many characters do you want your password to be? (10 - 64 characters)"));

  // Validate the password length
  if (isNaN(characterLength) || characterLength < 10 || characterLength > 64) {
    alert("Character length has to be a number, between 10 and 64 digits. Please try again!");
    return false; // Return false if the input is invalid
  }

  // Prompt user for password criteria and add chosen character types to the choiceArray
  if (confirm("Would you like lowercase letters in your password?")) {
    choiceArray = choiceArray.concat(lowerCasedCharacters); // Add lowercase letters
  }

  if (confirm("Would you like uppercase letters in your password?")) {
    choiceArray = choiceArray.concat(upperCasedCharacters); // Add uppercase letters
  }

  if (confirm("Would you like special characters in your password?")) {
    choiceArray = choiceArray.concat(specialCharacters); // Add special characters
  }

  if (confirm("Would you like numbers in your password?")) {
    choiceArray = choiceArray.concat(numericCharacters); // Add numeric characters
  }

  return true; // Return true if all criteria are successfully selected
}

// Function to generate a password based on the user's selected criteria
function generatePassword() {
  var password = "";  // Initialize an empty password string

  // Generate a random password by selecting characters from choiceArray
  for (var i = 0; i < characterLength; i++) {
    var randomIndex = Math.floor(Math.random() * choiceArray.length); // Get a random index from the choiceArray
    password = password + choiceArray[randomIndex]; // Append the selected character to the password string
  }

  return password; // Return the generated password
}

// Get references to the #generate button element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input element
function writePassword() {
  var correctPassword = getPasswordOptions(); // Get the user's password options (true or false)
  var passwordText = document.querySelector('#password'); // Reference to the input where the password will be displayed
  
  // If valid password criteria were selected, generate and display the password
  if (correctPassword) {
    var newPassword = generatePassword();
    passwordText.value = newPassword;  // Display the new password
  } else {
    passwordText.value = "";  // Clear the password input if criteria are invalid
  }
}

// Add event listener to the generate button to trigger password generation
generateBtn.addEventListener('click', writePassword);
