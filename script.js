document.addEventListener("DOMContentLoaded", function () {

    let currentInput = "";
    let operator = "";
    let previousInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.innerText;

            if (!isNaN(value) || value === ".") {
                currentInput += value;
                display.innerText = currentInput;
            } else if (value === "DEL") {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || "0";
            } else if (value === "RESET") {
                currentInput = "";
                previousInput = "";
                operator = "";
                display.innerText = "0";
            } else if (value === "=") {
                if (previousInput && currentInput) {
                    currentInput = eval(previousInput + operator + currentInput).toString();
                    display.innerText = currentInput;
                    previousInput = "";
                    operator = "";
                }
            } else {
                if (currentInput) {
                    previousInput = currentInput;
                    operator = value === "x" ? "*" : value; 
                    currentInput = "";
                }
            }
        });
    });
});

// Define the themes object
const themes = {
    theme1: {
        "--main-bg": "hsl(222, 26%, 31%)",
        "--toggle-bg": "hsl(223, 31%, 20%)",
        "--screen-bg": "hsl(224, 36%, 15%)",
        "--key-bg": "hsl(225, 21%, 49%)",
        "--key-shadow": "hsl(224, 28%, 35%)",
        "--key-red": "hsl(6, 63%, 50%)",
        "--key-red-shadow": "hsl(6, 70%, 34%)",
        "--key-light": "hsl(30, 25%, 89%)",
        "--key-light-shadow": "hsl(28, 16%, 65%)",
        "--text-dark": "hsl(221, 14%, 31%)",
        "--text-white": "hsl(0, 0%, 100%)"
    },
    theme2: {
        "--main-bg": "hsl(0, 0%, 90%)",
        "--toggle-bg": "hsl(0, 5%, 81%)",
        "--screen-bg": "hsl(0, 0%, 93%)",
        "--key-bg": "hsl(185, 42%, 37%)",
        "--key-shadow": "hsl(185, 58%, 25%)",
        "--key-red": "hsl(25, 98%, 40%)",
        "--key-red-shadow": "hsl(25, 99%, 27%)",
        "--key-light": "hsl(45, 7%, 89%)",
        "--key-light-shadow": "hsl(35, 11%, 61%)",
        "--text-dark": "hsl(60, 10%, 19%)",
        "--text-white": "hsl(0, 0%, 100%)"
    },
    theme3: {
        "--main-bg": "hsl(268, 75%, 9%)",
        "--toggle-bg": "hsl(268, 71%, 12%)",
        "--screen-bg": "hsl(268, 71%, 12%)",
        "--key-bg": "hsl(281, 89%, 26%)",
        "--key-shadow": "hsl(285, 91%, 52%)",
        "--key-red": "hsl(176, 100%, 44%)",
        "--key-red-shadow": "hsl(177, 92%, 70%)",
        "--key-light": "hsl(268, 47%, 21%)",
        "--key-light-shadow": "hsl(290, 70%, 36%)",
        "--text-dark": "hsl(198, 20%, 13%)",
        "--text-white": "hsl(0, 0%, 100%)"
    }
};

// Function to apply a theme
function applyTheme(theme) {
    const root = document.documentElement;
    Object.keys(theme).forEach(property => {
        root.style.setProperty(property, theme[property]);
    });
}

// Add event listeners to radio buttons
document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const selectedTheme = e.target.id; // e.g., "theme1", "theme2", "theme3"
        applyTheme(themes[selectedTheme]);
    });
});

// Apply default theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(themes.theme1); // Start with theme1 as it's checked by default
});