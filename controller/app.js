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
}
