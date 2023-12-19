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

// style="touch-action: none;"></canvas>  
const url_arg_str = window.location.search;
const url_params = new URLSearchParams(url_arg_str);
const subid = url_params.get('subid');
const box_ip = window.location.href.split('/')[2].split(':')[0];
console.log(subid);
const ws = new WebSocket("ws://" + box_ip + ":50079");

ws.onclose = () => {
    console.log("closing");
}

// wait for websocket to connect
ws.onopen = (_event) => {
    console.log("opened websocket");
    let byte_array = new Uint8Array(1);
    byte_array[0] = subid;
    ws.send(byte_array);
    setupButtonListeners();
    ws.onmessage = async (event) => {
        if (event.data instanceof Blob) {
            const blobData = new Uint8Array(await event.data.arrayBuffer()); // Read the Blob as a Uint8Array
            // Check the first byte to trigger a reload if it's equal to 0x01
            if (blobData.length > 0 && blobData[0] === 0x01) {
                console.log("Hold your hats! It's reload time!");
                location.reload();
            }
            else {
                // Handle other binary data
                console.log("Received binary data:", blobData);
                // Handle it according to your use case.
            }
        }
        else {
            wsMessage = event.data;
        }
    };
};

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

function send_datum(msg) {
    console.log('sending ' + msg);
    ws.send(msg);
}

// Function to add event listeners to buttons
function setupButtonListeners() {
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

ws.addEventListener('message', (event) => {
    msg = event.data;
    console.log('<' + msg + '>');
    console.log('^^ WASNT EXPECTING TO RECV ANY MSGS ^^');
});

