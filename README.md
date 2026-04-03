# Password-Generator

## 📌 Description
This is a modern, web-based password generator that allows users to create secure, random passwords using an interactive interface.

Unlike basic prompt-based generators, this version features a fully dynamic UI with sliders, checkboxes, real-time updates, password strength indicator, dark mode, and password history — all powered by JavaScript.

The application is fully responsive and works seamlessly across desktop and mobile devices.

## 🛠 Prerequisites
* A modern web browser (Chrome, Firefox, Edge, Safari)
* Internet access to view the live demo 

## 📋 Features
* Generate secure random passwords instantly
* 🎚 Adjustable password length (10–64 characters)
* 🔤 Include/exclude:
 * Lowercase letters
 * Uppercase letters
 * Numbers
 * Special characters
* Slider to control password length
* Checkboxes for selecting character types
* No more prompt() — fully visual controls
* ⚡Password regenerates automatically when:
 * Length changes
 * Character options are toggled
* 📊 Password strength indicator (Weak / Medium / Strong)
* 📋 Copy to clipboard functionality
* 🧠 Password history (stores last 10 generated passwords)
 * Click any previous password to reuse it
 * Saved in localStorage (persists after refresh)
* 🌙 Dark / Light mode toggle (saved in localStorage)
* 📱 Fully responsive design

Functionality
* Users adjust password settings using sliders and checkboxes
* The app dynamically generates a password based on selected criteria
* Strength is calculated using:
 * Length
 * Character variety (lowercase, uppercase, numbers, symbols)
* Generated passwords are:
 * Displayed instantly
 * Stored in history
* Users can:
 *  Copy passwords
 * Reuse previous ones
 * Switch themes

## 💻 Technologies Used
 Built with:
* HTML
* CSS
* JavaScript

## 🚀 Installation
No installation required. The application runs directly in a web browser.

## 📚 Usage
1. Open the Password Generator.
2. Adjust the password length using the slider.
3. Select the character types you want to include.
4. Click Generate Password (or let it auto-generate).
5. Copy the password using the Copy Password button or select from history.
6. View previously generated passwords in the History section.

## 🔗 Live Demo & Repository
Application can be viewed here:
* [Live](https://yvonnesarah.github.io/Password-Generator/)

* [Repository](https://github.com/yvonnesarah/Password-Generator)

## 🖼 Screenshot(S)
Before Design

Password Generator Interface
![Screenshot](assets/images/before/password-generator.png "Password Generator")


Password Character Selection

![Screenshot](assets/images/before/password-characters.png "Password Generator Characters")


Lowercase Letters Example


![Screenshot](assets/images/before/password-lowercase-letters.png "Password Generator Characters Lowercase Letters")


Generated Password with Lowercase Letters
![Screenshot](assets/images/before/lowercase-password.png "Lowercase Password Example")


Special Characters & Numbers Example
![Screenshot](assets/images/before/password-special-chars-numbers.png "Special Characters/numbers Password Example")

After Design

Password Generator Interface - Password Selections - History
![Screenshot](assets/images/after/password-generator.png "Password Generator")

Password Generator Interface - Dark Theme
![Screenshot](assets/images/after/password-generator-dark-theme.png "Password Generator - Dark Theme")

## 🚀 Future Improvements
* 🌟 Copy to Clipboard Feature – Allow users to copy the generated password with a single click. ✅
* 🔄 Auto-Generate on Page Load – Automatically suggest a secure password when the page loads. ✅
* 🧩 Strength Indicator – Show a password strength meter to guide users on security level. ✅
* 📱 Enhanced Mobile Experience – Improve UX for smaller screens and touch input. ✅

## 🆕 Upcoming Enhancements
* Toggle switches instead of checkboxes (improved UX) ✅
* Dark mode improvements 🌙 ✅
* Save password history enhancements ✅
* Regenerate automatically when settings change (live preview style) ✅
* Replace prompts with a modern UI (checkboxes + sliders) ✅
* Persist history using localStorage ✅
* Click history item to reuse password ✅

## 👥 Credit
Developed by Yvonne Adedeji

## 📜 License
This project is open-source. For licensing details, please refer to the LICENSE file in the repository.

## 📬 Contact
You can reach me at 📧 yvonneadedeji.sarah@gmail.com.
