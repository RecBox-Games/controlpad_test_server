import { send_controlpad_message } from './controlpad.js';

// Update the paths to your image files
const menuButtonImagePath = 'resources/menu.png';
const quitButtonImagePath = 'resources/quit.png';
const closePopupButtonImagePath = 'resources/x.png';

function createMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.id = 'universal-menu-button';
    menuButton.setAttribute('data-message', 'menu');
    menuButton.style.position = 'fixed';
    menuButton.style.top = '10px';
    menuButton.style.left = '10px';
    menuButton.style.zIndex = '1002';
    menuButton.style.backgroundColor = 'transparent';
    menuButton.style.border = 'none';

    const img = document.createElement('img');
    img.src = menuButtonImagePath;
    img.alt = 'Menu';
    menuButton.appendChild(img);

    menuButton.addEventListener('click', togglePopup);

    return menuButton;
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'universal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'none';

    return overlay;
}

function createPopup() {
    const popup = document.createElement('div');
    popup.id = 'universal-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '1001';
    popup.style.display = 'none';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid black';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    popup.style.width = '200px';
    popup.style.textAlign = 'center';

    document.body.appendChild(popup); // Ensure popup is added to the body
}

function togglePopup() {
    const popup = document.getElementById('universal-popup');
    const overlay = document.getElementById('universal-overlay');
    const isHidden = popup.style.display === 'none';
    popup.style.display = isHidden ? 'block' : 'none';
    overlay.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
        showMainMenu(); // Reset popup to show the main menu
    }
}

function showMainMenu() {
    const popup = document.getElementById('universal-popup');
    popup.innerHTML = ''; // Clear current content

    // Quit Button
    const quitButton = document.createElement('button');
    quitButton.id = 'quit-button';
    quitButton.style.border = 'none';
    quitButton.style.backgroundColor = 'transparent';
    quitButton.setAttribute('data-message', 'quit');
    const quitImg = document.createElement('img');
    quitImg.src = quitButtonImagePath;
    quitImg.alt = 'Quit';
    quitButton.appendChild(quitImg);
    quitButton.addEventListener('click', showPasswordPrompt);

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = 'transparent';
    const closeImg = document.createElement('img');
    closeImg.src = closePopupButtonImagePath;
    closeImg.alt = 'Close';
    closeButton.appendChild(closeImg);
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.addEventListener('click', togglePopup);

    popup.appendChild(quitButton);
    popup.appendChild(closeButton);
}

function showPasswordPrompt() {
    const popup = document.getElementById('universal-popup');
    popup.innerHTML = ''; // Clear existing content for password prompt

    const input = document.createElement('input');
    input.type = 'password';
    input.id = 'password-input';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', checkPassword);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', showMainMenu);

    popup.appendChild(input);
    popup.appendChild(submitButton);
    popup.appendChild(backButton);
}

function checkPassword() {
    const input = document.getElementById('password-input');
    if (input.value === 'demopassword') {
        send_controlpad_message('quit');
        console.log("Password correct. Action performed.");
        togglePopup(); // Optionally hide the popup
    } else {
        console.log("Incorrect password");
        // Optionally, provide user feedback here
    }
}

var windowWidth = 0;
var windowHeight = 0;

function dimsCheck() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {
        layoutElements();
    }
}

function layoutElements() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    var isPortrait = windowHeight > windowWidth;
    handleOrientation(isPortrait);
}

function handleOrientation(isPortrait) {
    if (isPortrait) {
        document.getElementById("dpad-container-portrait").style.display = "flex";
        document.getElementById("dpad-container-landscape").style.display = "none";
    } else {
        document.getElementById("dpad-container-portrait").style.display = "none";
        document.getElementById("dpad-container-landscape").style.display = "flex";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.body;
    const menuButton = createMenuButton();
    const overlay = createOverlay();
    bodyElement.appendChild(menuButton);
    bodyElement.appendChild(overlay);
    createPopup(); // Initialize the popup structure
});
