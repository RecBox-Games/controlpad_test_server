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
            let msg = event.data;
            console.log("received message" + '<' + msg + '>');
            console.log('^^ WASNT EXPECTING TO RECV ANY MSGS ^^');

        }
    };
};


export function send_controlpad_message(msg) {
    console.log('sending ' + msg);
    ws.send(msg);
}


