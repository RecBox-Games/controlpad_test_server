import { send_controlpad_message } from "./controlpad.js";

//////////////////////// HANDLE MESSAGES FROM GAME /////////////////////////////

// TODO: handle messages from the game here


///////////////////////////////////////////////////////////////////////////////


// set to true to enable logs from controlpad.js
// make sure to set to false before submitting your code
export const DEBUG = false;


//////////////////////////////// Layout Elements ///////////////////////////////

document.addEventListener("viewport-change", (event) => {
    // set up the elements of your controller here. This will ensure proper
    // behavior when players change orientation of their phone.
    layoutElements(event.detail.isPortrait, event.detail.viewWidth,
                   event.detail.viewHeight);
});

function layoutElements(isPortrait, viewWidth, viewHeight) {
    // In the layout functionality below we simply switch which elements are
    // visible (the positioning of portrait vs landscape elements is defined
    // in css files in controller/styles.
    //
    // Optionally, you may also use a single element per item for both portrait
    // and landscape and change its positioning in layout functions based on
    // whether the view is portrait or landscape.
    //
    if (isPortrait) {
        document.getElementById("container-portrait").style.display = "flex";
        document.getElementById("container-landscape").style.display = "none";        
    } else {
        document.getElementById("container-portrait").style.display = "none";
        document.getElementById("container-landscape").style.display = "flex";
    }
}


////////////////////////////////////////////////////////////////////////////////

// prevent usage of input box from causing elements to scroll out of view (this
// is a default behavior we are essentially overriding)
document.getElementById("input-text-portrait").addEventListener('blur', () => {
    window.scrollTo(0, 0);
});
document.getElementById("input-text-landscape").addEventListener("blur", () => {
    window.scrollTo(0,0);
});

/////////////////////////// EXAMPLE BUTTON LISTENERS /////////////////////////////

// send message based on the id of the button in the html
document.getElementById("enter-button").addEventListener("click", () => {
    send_controlpad_message("hello");
});

document.getElementById("enter-button-landscape").addEventListener("click", () => {
    send_controlpad_message("hello");
});

document.getElementById("back-button").addEventListener("click", () => {
    send_controlpad_message("back");
});

document.getElementById("back-button-landscape").addEventListener("click", () => {
    send_controlpad_message("back");
});

// send message based on the data-message attribute of the button in the html
// this is useful if you want to send different messages based on the same
// button element
for (let button of document.getElementsByClassName("arrow-button")) {
    button.addEventListener("click", () => {
        send_controlpad_message(button.getAttribute("data-message"));
    });
}

////////////////////////////////////////////////////////////////////////////////


// Add listeners for the text input fields to send messages to the game
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


