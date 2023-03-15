// Document Object Model (DOM)
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const strongEL = document.getElementById('passwordStrength');

//Random function obj
const randomFunc = {
    lower: get_Lower,
    upper: get_Upper,
    number: get_Number,
    symbol: get_Symbol
}

//Copy to clipboard event
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied :)');
});

//Strong check
StrongChecker.addEventListener('click', () => {
    const password = resultEl.innerText;
    let strength = 0;
    if (password.match(/[a-z]/)) {
        strength++;
    }
    if (password.match(/[A-Z]/)) {
        strength++;
    }
    if (password.match(/[0-9]/)) {
        strength++;
    }
    if (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) {
        strength++;
    }
    if (password.length >= 8) {
        strength++;
    }
    if (password.length >= 15) {
        strength++;
    }
    //If no box selected
    if (password === 'Select 1 checkbox at least') {
        passwordStrength.value = 0
    } else {
        passwordStrength.value = strength
    }
})

//Checkboxes
generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});

//Generate Password function
function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    // Doesn't have a selected type
    if (typesCount === 0) {
        return 'Select 1 checkbox at least';
    }

    // Create a loop for password
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Ger char random functions
function get_Lower() {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    return lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
}

function get_Upper() {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
}

function get_Number() {
    const numberChars = "0123456789";
    return numberChars[Math.floor(Math.random() * numberChars.length)];
}

function get_Symbol() {
    const symbols = '!@#$%^&*()_+-=[]{}\\|;:\'\",.<>/?'
    return symbols[Math.floor(Math.random() * symbols.length)];
}


