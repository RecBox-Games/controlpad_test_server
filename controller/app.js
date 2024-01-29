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

window.addEventListener('resize', function() {
    window.location.reload();
});


export function setupInputListeners() {
    document.getElementById('send-button').addEventListener('click', function() {
        var inputText = document.getElementById('input-text-portrait').value;
        send_datum(inputText);
    });

    document.getElementById('send-button-landscape').addEventListener('click', function() {
        var inputText = document.getElementById('input-text-landscape').value;
        send_datum(inputText);
    });    
}
