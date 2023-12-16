import { controlpadStart, controlpadUpdate } from "./app.js";

const box_ip = window.location.href.split('/')[2].split(':')[0];

var ws = new WebSocket("ws://" + box_ip + ":50079");

window.onload = () => {
    if (ws.readState == WebSocket.CLOSED) {
        ws = new WebSocket("ws://" + box_ip + ":50079");
    }
}

ws.onclose = (event) => {
    console.log("closed websocket");
    ws = new WebSocket("ws://" + box_ip + ":50079");
}

ws.onopen = (event) => {
    console.log("openned websocket");

    // Send the "sub ID" which confirms this device as a client and allows
    // different browser instances to be treated as different clients by
    // changing the subid
    const url_params = new URLSearchParams(window.location.search);
    const subid = url_params.get('subid');
    console.log("Sub ID: " + subid);
    var byte_array = new Uint8Array(1);
    byte_array[0] = subid;
    ws.send(byte_array.buffer);

    // receive messages
    ws.addEventListener('message', (event) => {
        var controlpad_msg_event = new CustomEvent("controlpad-message", {
            detail: event.data,
        });
        document.dispatchEvent(controlpad_msg_event);
    });

    // start app
    controlpadStart();
    setInterval(controlpadUpdate, 33);
}

// send messages
export function sendControlpadMessage(msg) {
    console.log("sending <" + msg + ">");
    ws.send(msg);
}


// handling screen changes
function screenChange() {
    location.reload();
}
window.onresize = screenChange;
window.onorientationchange = screenChange;
