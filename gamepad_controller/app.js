import { send_datum } from "./controlpad.js";


document.addEventListener("controlpad-message", (event) => {
    var msg = event.detail;
    console.log("recv: " + msg);
    let movePad = document.getElementById("movePad");
    movePad.style.background = msg;
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
    }
}


// Movement
let isTouchActive = false;
let touchStart = {x: 0, y: 0};
var touchPad = document.getElementById('movePad');
let stickPosition = {x: 0, y: 0};

touchPad.addEventListener('touchstart', function(e) {
    // Prevent the default highlighting behavior
    e.preventDefault();

    if (isTouchActive) { return; }

    // check for correct touch
    var touch = null;
    for (let aTouch of e.changedTouches) {
        if (aTouch.target.id == "movePad") {
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
    var rect = touchPad.getBoundingClientRect();
    touchStart.x = touchX;
    touchStart.y = touchY;
    
    // Show joystick
    JOY_BASE_IMG.style.display = "block";
    JOY_BASE_IMG.style.left = String(touchX) + "px";
    JOY_BASE_IMG.style.top = String(touchY) + "px";
    JOY_STICK_IMG.style.display = "block";
    JOY_STICK_IMG.style.left = String(touchX) + "px";
    JOY_STICK_IMG.style.top = String(touchY) + "px";
    
}, false);


touchPad.addEventListener('touchend', function(e) {
    isTouchActive = false;
    JOY_BASE_IMG.style.display = "none";
    JOY_STICK_IMG.style.display = "none";
    send_datum("stick:0,0");
}, false);

touchPad.addEventListener('touchcancel', function(e) {
    isTouchActive = false;
    JOY_BASE_IMG.style.display = "none";
    JOY_STICK_IMG.style.display = "none";
    send_datum("stick:0,0");
}, false);


var MAX_STICK_DIST = 40;

function setStickPosition(x, y) {
    const dx = x - touchStart.x;
    const dy = y - touchStart.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < MAX_STICK_DIST) {
        stickPosition.x = x;
        stickPosition.y = y;
    } else {
        const unitX = dx / distance;
        const unitY = dy / distance;
        stickPosition.x = touchStart.x + unitX * MAX_STICK_DIST;
        stickPosition.y = touchStart.y + unitY * MAX_STICK_DIST;
    }
    JOY_STICK_IMG.style.left = String(stickPosition.x) + "px";
    JOY_STICK_IMG.style.top = String(stickPosition.y) + "px";
}

var throttledDragEvent = throttle(function(e) {
    // check for correct touch
    var touch = null;
    for (let aTouch of e.changedTouches) {
        if (aTouch.target.id == "movePad") {
            touch = aTouch;
        }
    }
    if (touch == null) {
        return;
    }
    // Get the touch position
    var touchX = touch.clientX;
    var touchY = touch.clientY;

    // Set stick position
    setStickPosition(touchX, touchY);

    
    if (isTouchActive) {
        const moveX = Math.round((stickPosition.x - touchStart.x)*255/MAX_STICK_DIST);
        const moveY = Math.round((stickPosition.y - touchStart.y)*255/MAX_STICK_DIST);
        let datum = "stick:" + String(moveX) + "," + String(moveY);
        send_datum(datum);
        //console.log(datum);
    }
}, 33); // Throttle to 30 times per second (33.33 milliseconds)

// Add the throttled touchmove event listener to the element
touchPad.addEventListener('touchmove', throttledDragEvent, false);



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
    var isPortrait = windowHeight > windowWidth;
    layoutMovePad();
    layoutButtons(isPortrait);
    layoutSensitivity(isPortrait);
}

var JOY_BASE_IMG;
var JOY_STICK_IMG;

function layoutMovePad() {
    var movePad = document.getElementById('movePad');
    movePad.style.position = "absolute";
    movePad.style.bottom = "5px";
    movePad.style.left = "5px";
    //movePad.style.transform = "translate(-50%, -50%)";
    movePad.style.width = "250px";
    movePad.style.height = "250px";
    //movePad.style.border = "1px solid #bbbbbb";
    movePad.style.borderRadius = "140px";
    //
    var pad_img = document.createElement('img');
    pad_img.style.position = "absolute";
    pad_img.style.top = "50%";
    pad_img.style.left = "50%";
    pad_img.style.width = "120%";
    pad_img.style.height = "120%";
    pad_img.style.transform = "translate(-50%, -50%)";
    pad_img.style.pointerEvents = "none";
    pad_img.src = "./resources/joystick_pad.png";
    //
    var base_img = document.createElement('img');
    base_img.style.position = "absolute";
    base_img.style.width = "140px";
    base_img.style.height = "140px";
    base_img.style.transform = "translate(-50%, -50%)";
    base_img.style.pointerEvents = "none";
    base_img.src = "./resources/joystick_base2.png";
    base_img.style.display = "none";
    JOY_BASE_IMG = base_img;
    //
    var stick_img = document.createElement('img');
    stick_img.style.position = "absolute";
    stick_img.style.width = "110px";
    stick_img.style.height = "110px";
    stick_img.style.transform = "translate(-50%, -50%)";
    stick_img.style.pointerEvents = "none";
    stick_img.src = "./resources/joystick_stick.png";
    stick_img.style.display = "none";
    JOY_STICK_IMG = stick_img;
    //
    while (movePad.firstChild) {
        movePad.removeChild(movePad.firstChild);
    }
    movePad.appendChild(pad_img);
    var mainDiv = document.getElementById('mainDiv');
    mainDiv.appendChild(base_img);
    mainDiv.appendChild(stick_img);
}

var BTN_IMG_A;
var BTN_IMG_B;
var BTN_IMG_X;
var BTN_IMG_Y;

function layoutButtons(isPortrait) {
    var btnArea = document.getElementById('buttonArea');
    while (btnArea.firstChild) {
        btnArea.removeChild(btnArea.firstChild);
    }
    //
    btnArea.style.position = "absolute";
    if (isPortrait) {
        btnArea.style.bottom = "52%";
        btnArea.style.right = "5px";
    } else {
        btnArea.style.bottom = "5px";
        btnArea.style.right = "5px";
    }
    //btnArea.style.transform = "translate(-50%, -50%)";
    btnArea.style.width = "360px";
    btnArea.style.height = "270px";
    //btnArea.style.border = "1px solid #bbbbbb";
    btnArea.style.borderRadius = "40px";
    //
    var btns_img = document.createElement('img');
    btns_img.style.position = "absolute";
    btns_img.style.top = "50%";
    btns_img.style.left = "50%";
    btns_img.style.width = "100%";
    btns_img.style.height = "100%";
    btns_img.style.transform = "translate(-50%, -50%)";
    btns_img.style.pointerEvents = "none";
    //
    var a_img = btns_img.cloneNode(true);
    a_img.src = "./resources/button_pad_A.png";
    var b_img = btns_img.cloneNode(true);
    b_img.src = "./resources/button_pad_B.png";
    var x_img = btns_img.cloneNode(true);
    x_img.src = "./resources/button_pad_X.png";
    var y_img = btns_img.cloneNode(true);
    y_img.src = "./resources/button_pad_Y.png";
    //
    BTN_IMG_A = a_img;
    BTN_IMG_B = b_img;
    BTN_IMG_X = x_img;
    BTN_IMG_Y = y_img;
    btnArea.appendChild(a_img);
    btnArea.appendChild(b_img);
    btnArea.appendChild(x_img);
    btnArea.appendChild(y_img);
    //
    var b_y = newButton("22%", "3%", "42.5%", "46%", 'Y');
    btnArea.appendChild(b_y);
    var b_b = newButton("69%", "3%", "28.5%", "46%", 'B');
    btnArea.appendChild(b_b);
    var b_x = newButton("2.5%", "52%", "44.5%", "44%", 'X');
    btnArea.appendChild(b_x);
    var b_a = newButton("51%", "52%", "47%", "44%", 'A');
    btnArea.appendChild(b_a);
}

var IS_SENSITIVE = false;
var SENS_IMG;

function layoutSensitivity(isPortrait) {
    var sensButton = document.getElementById('sensitivity');
    while (sensButton.firstChild) {
        sensButton.removeChild(sensButton.firstChild);
    }
    sensButton.style.position = "absolute";
    //if (isPortrait) {
    sensButton.style.bottom = "220px";
    sensButton.style.left = "240px";
    //sensButton.style.transform = "translate(-50%, -50%)";
    sensButton.style.width = "140px";
    sensButton.style.height = "40px";
    //sensButton.style.border = "1px solid #bbbbbb";
    sensButton.style.borderRadius = "40px";
    //
    var sens_img = document.createElement('img');
    sens_img.style.position = "absolute";
    sens_img.style.top = "50%";
    sens_img.style.left = "50%";
    sens_img.style.width = "100%";
    sens_img.style.height = "100%";
    sens_img.style.transform = "translate(-50%, -50%)";
    sens_img.style.pointerEvents = "none";
    sens_img.src = "./resources/sensitivity.png";
    SENS_IMG = sens_img;
    //
    sensButton.onclick = () => {
        IS_SENSITIVE = !IS_SENSITIVE;
        if (IS_SENSITIVE) {
            MAX_STICK_DIST = 10;
            SENS_IMG.src = "./resources/sensitivity_pressed.png";
        } else {
            MAX_STICK_DIST = 50;
            SENS_IMG.src = "./resources/sensitivity.png";
        }
    };
    //
    SENS_IMG = sens_img;
    sensButton.appendChild(sens_img);
}

function newButton(x, y, width, height, name) {
    var btn = document.createElement('button');
    btn.style.position = "absolute";
    btn.style.top = y;
    btn.style.left = x;
    //btn.style.transform = "translate(-50%, -50%)";
    btn.style.width = width;
    btn.style.height = height;
    //btn.style.border = "1px solid #bbbbbb";
    btn.style.borderRadius = "40px";
    //
    var btn_img; var pressed_name; var released_name;
    if (name == 'A') {
        btn_img = BTN_IMG_A;
        released_name = "resources/button_pad_A.png";
        pressed_name = "resources/button_pad_A_pressed.png";}
    else if (name == 'B') {
        btn_img = BTN_IMG_B;
        released_name = "resources/button_pad_B.png";
        pressed_name = "resources/button_pad_B_pressed.png";}
    else if (name == 'X') {
        btn_img = BTN_IMG_X;
        released_name = "resources/button_pad_X.png";
        pressed_name = "resources/button_pad_X_pressed.png";}
    else if (name == 'Y') {
        btn_img = BTN_IMG_Y;
        released_name = "resources/button_pad_Y.png";
        pressed_name = "resources/button_pad_Y_pressed.png";}
    //
    btn.ontouchstart = () => {
        btn_img.src = pressed_name;
        send_datum("pressed:"+name);
    };
    btn.ontouchend = () => {
        btn_img.src = released_name;
        send_datum("released:"+name);
    };
    btn.ontouchcancel = () => {
        btn_img.src = released_name;
        send_datum("released:"+name);
    };
    //var btns_img = document.createElement('img');
    return btn;
}
