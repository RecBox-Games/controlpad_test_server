import { sendControlpadMessage } from "./controlpad.js";

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('submitJoinButton').addEventListener('click', showJoinCustomConfirm);
    document.getElementById('yesJoinButton').addEventListener('click', () => confirmJoinSubmit());
    document.getElementById('noJoinButton').addEventListener('click', cancelJoinSubmit);    
});


export function showJoinBox() {
    let join_box = document.getElementById("joinBox");
    join_box.style.display = "block";
    join_box.style.top = "53%";
    let bip = document.getElementById("joinInput");
    bip.disabled = false;
    bip.style.background = "#ffffff";
    bip.style.border = "2px solid #111111";
}

export function showJoinCustomConfirm() {
    document.getElementById("customJoinConfirm").style.display = "block";
    document.getElementById("submitJoinButton").style.display = "none";
    let bip = document.getElementById("joinInput");
    bip.disabled = true;
    bip.style.background = "#eeeeee";
    bip.style.border = "2px solid #aaaaaa";
}

export function startGame(messages) {
    messages.push("start-game");
}

export function showName(name) {
    let name_box = document.getElementById("nameBox");
    let name_line = document.getElementById("nameLine");
    name_line.textContent = name;
    name_box.style.display = "block";
}

export function confirmJoinSubmit() {
    let enteredText = document.getElementById("joinInput").value;
    sendControlpadMessage("join:" + enteredText);
    document.getElementById("joinInput").value = "";
    const join_line = document.getElementById("joinLine");
    join_line.textContent = "";
    showName(enteredText);
    document.getElementById("customJoinConfirm").style.display = "none";
    document.getElementById("joinInput").style.display = "none";
}

export function hideJoinBox() {
    document.getElementById("joinBox").style.display = "none";
    document.getElementById("customJoinConfirm").style.display = "none";
    document.getElementById("submitJoinButton").style.display = "block";
}

export function cancelJoinSubmit() {
    hideJoinBox();
    showJoinBox();
}


