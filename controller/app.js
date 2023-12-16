import { sendControlpadMessage } from "./controlpad.js"
import { hideJoinBox, showJoinBox } from "./join.js"
import { hideWaitBox } from "./wait.js"


var newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
if (newOrientation == "landscape") document.getElementById("dpad-container-portrait").style.display = "none";
else document.getElementById("dpad-container-landscape").style.display = "none"

                          
// receive messages
document.addEventListener("controlpad-message", (event) => {
    var msg = event.detail;
    console.log("recv: " + msg);
    var parts = msg.split(":");
    // TODO: should check that parts[0] is 'state'
    var state = parts[1];
    var arg1 = parts[2];
    var arg2 = parts[3];
    var arg3 = parts[4];
    if (state == "joining") {
        showJoinBox();
    } else if (state == "playing") {
        updatePlayingState(arg1, arg2, arg3);
        hideWaitBox();
        hideJoinBox();
    }
});


// must implement this function (called by controlpads.js)
export function controlpadStart() {
    // start by getting our current state since it's very possible we're
    // reconnecting and not just connecting for the first time
    sendControlpadMessage("state-request");
    showPlayingState();
}

// must implement this function (called by controlpads.js)
// called 30 times per second
export function controlpadUpdate() {
    
}

var PLAYER_NAME = "";
var LEFT_CARD_STR = "";
var RIGHT_CARD_STR = "";

function updatePlayingState(name, left_card_str, right_card_str) {
    PLAYER_NAME = name;
    LEFT_CARD_STR = left_card_str;
    RIGHT_CARD_STR = right_card_str;
    showPlayingState();
}

function showPlayingState() {
    // name
    showName(PLAYER_NAME);
    // use a div to contain the cards
    let card_div = document.getElementById("cardDiv");
    // remove previous elements from that div
    while (card_div.firstChild) {
        card_div.removeChild(card_div.firstChild);
    }
    // size the card div
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let constraint = vw < vh ? "vw" : "vh"; // account for portrait vs landscape
    card_div.style.width = "100" + constraint;
    card_div.style.height = "58" + constraint;
    // left card
    var card_img_left = createCardElement("L", LEFT_CARD_STR);
    card_img_left.style.left = "0%";
    card_div.appendChild(card_img_left);
    // right card
    var card_img_right = createCardElement("R", RIGHT_CARD_STR);
    card_img_right.style.right = "0%";
    card_div.appendChild(card_img_right);
    // deal button
    var deal_button = createDealButton();
    card_div.appendChild(deal_button);
}


function createDealButton() {
    var img = document.createElement("img");
    // load image
    img.src = "./resources/deal.png";
    // todo other things below
    img.addEventListener("click", function() {
        sendControlpadMessage("deal");
    });
    // position the card
    img.style.position = "absolute";
    img.style.width ="40%";
    img.style.height = "35%";
    img.style.top = "105%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, 0%)";
    return img;
}

function createCardElement(side, card_str) {
    var img = document.createElement("img");
    //
    // parse card spec and set click(tap) callback
    if (card_str == "") {
        img.src = "./resources/card_none.png";
    } else {
        var parts = card_str.split(",");
        var suit = parts[0];
        var rank = parts[1];
        img.src = "./resources/card_fronts/card_" + suit + "_" + rank + ".png";
        // send card:* message on press
        let isLeft = side == "L";
        img.addEventListener("click", () => {
            sendControlpadMessage("card:" + side + "," + suit + "," + rank);
            if (isLeft) {
                LEFT_CARD_STR = "";
            } else {
                RIGHT_CARD_STR = "";
            };
            showPlayingState();
        });

    }
    //
    // position the card
    img.style.position = "absolute";
    img.style.width ="53%";
    img.style.height = "100%";
    img.style.top = "50%";
    img.style.transform = "translate(0%, -50%)";
    return img;
}

function showName(name) {
    let name_box = document.getElementById("nameBox");
    let name_line = document.getElementById("nameLine");
    name_line.textContent = name;
    name_box.style.display = "block";
}
