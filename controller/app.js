import { send_controlpad_message } from "./controlpad.js";


document.getElementById("input-text-portrait").addEventListener('blur', () => {
    window.scrollTo(0, 0);
});

document.getElementById("input-text-landscape").addEventListener("blur", () => {
    window.scrollTo(0,0);
});

window.addEventListener('resize', function() {   
    window.location.reload();
});



// If you're not using any text inputs you can remove the below function
function setupInputListeners() {
    document.getElementById('send-button').addEventListener('click', function() {
        var inputText = document.getElementById('input-text-portrait').value;
        send_controlpad_message(inputText);
    });

    document.getElementById('send-button-landscape').addEventListener('click', function() {
        var inputText = document.getElementById('input-text-landscape').value;
        send_controlpad_message(inputText);
    });    
}

document.addEventListener('DOMContentLoaded', () => {
    setupInputListeners(); // can remove this line if not using any text inputs
});

