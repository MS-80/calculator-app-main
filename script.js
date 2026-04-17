document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".key");
    
    let currentInput = "";
    let operator = "";
    let previousInput = "";

    // Safe calculation function instead of eval()
    function calculate(a, b, op) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        
        if (isNaN(num1) || isNaN(num2)) return "0";
        
        switch(op) {
            case '+': return (num1 + num2).toString();
            case '-': return (num1 - num2).toString();
            case '*': return (num1 * num2).toString();
            case '/': 
                if (num2 === 0) return "Error";
                return (num1 / num2).toString();
            default: return b;
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.innerText;

            // Number or decimal input
            if (!isNaN(value) || value === ".") {
                // Prevent multiple decimals
                if (value === "." && currentInput.includes(".")) return;
                currentInput += value;
                display.innerText = currentInput;
            } 
            // Delete last character
            else if (value === "DEL") {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || "0";
            } 
            // Reset calculator
            else if (value === "RESET") {
                currentInput = "";
                previousInput = "";
                operator = "";
                display.innerText = "0";
            } 
            // Calculate result
            else if (value === "=") {
                if (previousInput && currentInput && operator) {
                    const result = calculate(previousInput, currentInput, operator);
                    currentInput = result;
                    display.innerText = result;
                    previousInput = "";
                    operator = "";
                }
            } 
            // Operator input
            else {
                if (currentInput) {
                    if (previousInput && operator) {
                        // Chain calculations
                        const result = calculate(previousInput, currentInput, operator);
                        previousInput = result;
                        display.innerText = result;
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value === "x" ? "*" : value;
                    currentInput = "";
                } else if (previousInput) {
                    // Change operator
                    operator = value === "x" ? "*" : value;
                }
            }
        });
    });

    // Theme management
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

    function applyTheme(themeName) {
        const root = document.documentElement;
        const theme = themes[themeName];
        if (!theme) return;
        
        Object.keys(theme).forEach(property => {
            root.style.setProperty(property, theme[property]);
        });
        
        // Save theme preference to localStorage
        localStorage.setItem('calculator-theme', themeName);
    }

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            applyTheme(e.target.id);
        });
    });

    // Load saved theme or apply default on page load
    const savedTheme = localStorage.getItem('calculator-theme') || 'theme1';
    const savedRadio = document.getElementById(savedTheme);
    if (savedRadio) {
        savedRadio.checked = true;
    }
    applyTheme(savedTheme);
});