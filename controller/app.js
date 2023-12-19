import { send_datum } from "./controlpad.js";

var newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
if (newOrientation === "landscape") {
    document.getElementById("dpad-container-portrait").style.display = "none";
    document.getElementById("dpad-container-landscape").style.display = "flex";
} else {
    document.getElementById("dpad-container-portrait").style.display = "flex";
    document.getElementById("dpad-container-landscape").style.display = "none";
}

document.getElementById("input-text-portrait").addEventListener('blur', () => {
    window.scrollTo(0, 0);
});

document.getElementById("input-text-landscape").addEventListener("blur", () => {
    window.scrollTo(0,0);
});

document.addEventListener('DOMContentLoaded', (e) => {
});

window.addEventListener('resize', function() {
    window.location.reload();
});

function openMenu() {
    console.log(newOrientation);
    if(newOrientation === "portrait") {
        document.getElementById("popup").style.display = "flex";
    }
    else {
        document.getElementById("popup-landscape").style.display = "flex";
    }
}

function closeMenu() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup-landscape").style.display = "none";
}


// Function to add event listeners to buttons
export function setupButtonListeners() {
    // Select all buttons you want to send messages
    const buttons = document.querySelectorAll('button');    
    document.getElementById('send-button').addEventListener('click', function() {
        var inputText = document.getElementById('input-text-portrait').value;
        send_datum(inputText);
    });

    document.getElementById('send-button-landscape').addEventListener('click', function() {
        var inputText = document.getElementById('input-text-landscape').value;
        send_datum(inputText);
    });
    
    buttons.forEach(button => {
        // Add click event listener to each button
        button.addEventListener('click', function() {
            // Determine what message to send based on the button's id or other attributes
            const message = this.getAttribute('data-message');
            if (message != null) send_datum(message); // Send the message through the WebSocket
        });
    });    
    document.getElementById('menu-button').addEventListener('click', openMenu);
    document.getElementById('menu-button-landscape').addEventListener('click', openMenu);
    document.getElementById('close-button').addEventListener('click', closeMenu);
    document.getElementById('close-button-landscape').addEventListener('click', closeMenu);    
}
