
export function hideWaitBox() {
    document.getElementById("waitingBox").style.display = "none";
}

export function showWaitBox(wait_type) {
    if (wait_type == "unknown") {
        document.getElementById("waitingLine").innerText = "Waiting for something...";
    } else if (wait_type == "judging") {
        document.getElementById("waitingLine").innerText = "Waiting for judgements...";
    } else if (wait_type == "joined") {
        document.getElementById("waitingLine").innerText = "Waiting for the host to start the game...";
    } else if (wait_type == "round") {
        document.getElementById("waitingLine").innerText = "Waiting for other players to finish up...";
    } else if (wait_type == "other-player") {
        document.getElementById("waitingLine").innerText = "Waiting for your next prompt from another player...";
    } else {
        document.getElementById("waitingLine").innerText = "Waiting for game...";
    }
    document.getElementById("waitingBox").style.display = "block";
}


