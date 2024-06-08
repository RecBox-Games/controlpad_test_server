import { send_controlpad_message } from "./controlpad.js";


document.addEventListener("controlpad-message", (event) => {
    var msg = event.detail;
    let movePad = document.getElementById("wheelPad");
    //movePad.style.background = msg;
    //movePad.style.display = "none";
});


// Throttle function to limit the rate of execution
function throttle(func, limit) {
    var lastFunc;
    var lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}


// Movement
let isTouchActive = false;
let lastTouchAngle = 0.0;
let newTouchAngle = 0.0;
let wheelRotation = 0.0;
var touchPad = document.getElementById('wheelPad');
touchPad.style.width = "50px";
touchPad.style.height = "50px";
let stickPosition = {x: 0, y: 0};

function angle_of_touch(x, y) {
    const div = document.getElementById("wheelPad");
    const rect = div.getBoundingClientRect();
    const divX = rect.left + rect.width / 2;
    const divY = rect.top + rect.height / 2;
    const angle = Math.atan2(y - divY, x - divX);
    return angle;
}

// as a fraction (0.0 to 1.0) (i.e. not in pixels)
function dist_of_touch(x, y) {
    const div = document.getElementById("wheelPad");
    const rect = div.getBoundingClientRect();
    const divX = rect.left + rect.width / 2;
    const divY = rect.top + rect.height / 2;
    const dX = x - divX;
    const dY = y - divY;
    const angle = Math.sqrt(dX*dX + dY*dY) / (rect.width/2);
    return angle;
    
}


touchPad.addEventListener('touchstart', function(e) {
    // Prevent the default highlighting behavior
    e.preventDefault();

    if (isTouchActive) { return; }

    // check for correct touch
    var touch = null;
    for (let aTouch of e.changedTouches) {
        if (aTouch.target.id == "wheelPad") {
            touch = aTouch;
        }
    }
    if (touch == null) {
        return;
    }

    isTouchActive = true;

    // Get the touch position
    var touchX = touch.clientX;
    var touchY = touch.clientY;
    var angle = angle_of_touch(touchX, touchY);
    lastTouchAngle = angle;
    newTouchAngle = angle;
}, false);


touchPad.addEventListener('touchend', function(e) {
    isTouchActive = false;
    send_controlpad_message("stick:0,0");
}, false);

touchPad.addEventListener('touchcancel', function(e) {
    isTouchActive = false;
    send_controlpad_message("stick:0,0");
}, false);



var throttledDragEvent = throttle(function(e) {
    // check for correct touch
    var touch = null;
    for (let aTouch of e.changedTouches) {
        if (aTouch.target.id == "wheelPad") {
            touch = aTouch;
        }
    }
    if (touch == null) {
        return;
    }
    // Get the touch position
    var touchX = touch.clientX;
    var touchY = touch.clientY;

    if (isTouchActive) {
        // calculate how much the wheel should rotate by
        lastTouchAngle = newTouchAngle;
        newTouchAngle = angle_of_touch(touchX, touchY);
        var angle_diff = newTouchAngle - lastTouchAngle;
        if (angle_diff > Math.PI) {
            angle_diff -= Math.PI*2;
        } else if (angle_diff < -Math.PI) {
            angle_diff += Math.PI*2;
        }
        var dist = dist_of_touch(touchX, touchY);
        var dist_multiplier = Math.min(dist*2, 1.0);
        if (dist_multiplier < 0.15) {
            dist_multiplier = 0.0;
        }
        var rotation_amount = dist_multiplier*angle_diff;
        // rotate the wheel
        wheelRotation += rotation_amount;
        if (wheelRotation > Math.PI*2) {
            wheelRotation -= Math.PI*2;
        } else if (wheelRotation < 0.0) {
            wheelRotation += Math.PI*2;
        }
        var rotation_degrees = wheelRotation * 180 / Math.PI;
        var wheel = document.getElementById("wheel");
        wheel.style.transform = `translate(-50%, -50%) rotate(${rotation_degrees}deg)`;
        // send the rotation to the game
        send_controlpad_message(wheelRotation);
    }
}, 33); // Throttle to 30 times per second (33.33 milliseconds)

// Add the throttled touchmove event listener to the element
touchPad.addEventListener('touchmove', throttledDragEvent, false);
//touchPad.addEventListener('touchmove', () => {console.log("f");}, false);



////////////////////////////////////////////////////////////////////////////////
var windowWidth = 0;
var windowHeight = 0;

layoutElements();

function dimsCheck() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {
        layoutElements();
    }
}

setInterval(dimsCheck, 100);

function layoutElements() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    //var isPortrait = windowHeight > windowWidth;
    //touchPad.style.width = "200%";
    console.log("Asa");
    //touchPad.style.height = "300%";
    layoutMovePad();
}

function layoutMovePad() {
    var movePad = document.getElementById('wheelPad');
    movePad.style.position = "absolute";
    movePad.style.top = "50%";
    movePad.style.left = "50%";
    movePad.style.transform = "translate(-50%, -50%)";
    movePad.style.width = "100vw";
    movePad.style.height = "100vw";
    //movePad.style.border = "1px solid #bbbbbb";
    movePad.style.borderRadius = "140px";
    //
    var pad_img = document.createElement('img');
    pad_img.style.position = "absolute";
    pad_img.style.top = "50%";
    pad_img.style.left = "50%";
    pad_img.style.width = "100%";
    pad_img.style.height = "100%";
    pad_img.style.transform = "translate(-50%, -50%)";
    pad_img.style.pointerEvents = "none";
    pad_img.src = "./resources/wheel.png";
    pad_img.id = "wheel";
    console.log(pad_img.id);
    //pad_img.style.display = "none";
    //
    var center_img = document.createElement('img');
    center_img.style.position = "absolute";
    center_img.style.top = "50%";
    center_img.style.left = "50%";
    center_img.style.width = "100%";
    center_img.style.height = "100%";
    center_img.style.transform = "translate(-50%, -50%)";
    center_img.style.pointerEvents = "none";
    center_img.src = "./resources/center.png";
    //center_img.style.display = "none";
    //
    while (movePad.firstChild) {
        movePad.removeChild(movePad.firstChild);
    }
    movePad.appendChild(pad_img);
    movePad.appendChild(center_img);
}

