"use strict";
const url_arg_str = window.location.search;
const url_params = new URLSearchParams(url_arg_str);
const subid = url_params.get('subid');
const box_ip = window.location.href.split('/')[2].split(':')[0];
console.log(subid);
let ws = new WebSocket("ws://" + box_ip + ":50079");
window.onload = () => {
    if (ws.readyState == WebSocket.CLOSED) {
        ws = new WebSocket("ws://" + box_ip + ":50079");
    }
};
ws.onclose = (event) => {
    console.log("closed websocket");
    ws = new WebSocket("ws://" + box_ip + ":50079");
};
// wait for websocket to connect
ws.onopen = (event) => {
    console.log("openned websocket");
    // let byte_array: Uint8Array = new Uint8Array(1);
    // byte_array[0] = subid;
    // ws.send(byte_array.buffer);
    ws.addEventListener('message', (event) => {
        // let msg = event.data;
        //     handleMessage(msg);
    });
};
