# Password-Generator

## 📌 Description
This is a modern, web-based Password Generator that allows users to create secure, random passwords using a fully interactive interface.

It features a dynamic UI with:

Sliders for password length
Checkboxes (or toggles) for character selection
Real-time updates and live password generation
Password strength indicator (Weak / Medium / Strong)
Dark / Light / Custom theme mode
Password history stored in localStorage

The application is fully responsive and works seamlessly across desktop and mobile devices, providing a smooth and intuitive user experience.

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
* ⚡Password regenerates automatically when:
 * Length changes
 * Character options are toggled
* 📊 Password strength indicator (Weak / Medium / Strong)
* 📋 Copy to clipboard functionality
* 🧠 Password history (stores last 10 generated passwords)
 * Click a previous password to reuse it
 * Saved in localStorage (persists after refresh)
* 🌙 Dark / Light / Custom theme mode toggle (saved in localStorage)
* 📱 Fully responsive design

Functionality Overview
* Users adjust password settings using sliders and checkboxes
* The app dynamically generates a password based on selected criteria
* Strength is calculated using:
 * Password Length
 * Character variety (lowercase, uppercase, numbers, symbols)
* Generated passwords are:
 * Displayed instantly
 * Stored in history for later use
* Users can:
 *  Copy passwords
 * Reuse previous passwords
 * Switch between themes
 * Export / Clear History
 
## 💻 Technologies Used
 Built with:
* HTML
* CSS
* JavaScript

## 🚀 Installation
No installation required. The application runs directly in a web browser.

## 📚 Usage
1. Open the Password Generator in your web browser.
2. Adjust the password length using the slider.
3. Select the character types you want to include (lowercase, uppercase, numbers, symbols).
4. Click Generate Password or let it auto-generate based on your settings.
5. Copy the password using the Copy Password button or select a previous password from History.
6. View, reuse, or manage previously generated passwords in the History section.

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

Password Generator Interface - Dark Theme - Clear History Button
![Screenshot](assets/images/after/password-generator-clear-history.png "Password Generator - Dark Theme - Clear History Button")

## 🚀 Future Improvements
* 🌟 Copy to Clipboard Feature – Allow users to copy the generated password with a single click. ✅
* 🔄 Auto-Generate on Page Load – Automatically suggest a secure password when the page loads. ✅
* 🧩 Strength Indicator – Show a password strength meter to guide users on security level. ✅
* 📱 Enhanced Mobile Experience – Improve UX for smaller screens and touch input. ✅
* 🧹 Clear History Button – Allow users to clear all saved passwords from history with one click. ✅

## 🆕 Upcoming Enhancements
* Toggle switches instead of checkboxes (improved UX) ✅
* Dark mode improvements 🌙 ✅
* Save password history enhancements ✅
* Live preview-style auto-regeneration ✅
* Fully visual UI replacing prompts ✅
* Persist history with localStorage ✅
* Click history item to reuse password ✅

## 🚀 Advanced Future Improvements (Professional Level)
These enhancements aim to make the Password Generator more secure, professional, and user-friendly:

* Password History Enhancements
* ⭐ Mark passwords as favorites and visually highlight them.
* 🔄 Click history items to reuse previously generated passwords instantly.
* 🔍 Search and filter password history for faster access.

* Toast Notification System
* 💬 Context-aware toast messages for success, warnings, and info.
* ✨ Smooth fade-in/out animations for unobtrusive user feedback.

* Clipboard Security
* 🛡 Automatic clearing of clipboard after a configurable timeout.
* 🔑 Adds extra security to prevent sensitive data leaks.

* User Interface & Experience
* 💥 Shake animation for invalid inputs (e.g., no character type selected).
* 🌈 Theme-specific styling for buttons, cards, and inputs for a cohesive look.
* 🎨 Smooth fade-in transitions for dynamic UI elements.

* Password Generation Logic
* ✅ Ensures at least one character from each selected set is included.
* ⚡ Handles edge cases such as no character sets selected.

* Theme Persistence
* 💡 Selected themes are stored in localStorage and persist across sessions.
* 🎛 Applied consistently to cards, buttons, history, and input fields.

## 👥 Credit
Developed by Yvonne Adedeji

## 📜 License
This project is open-source. For licensing details, please refer to the LICENSE file in the repository.

## 📬 Contact
You can reach me at 📧 yvonneadedeji.sarah@gmail.com.
