@echo off

REM Check if controlpad server is already running
tasklist /FI "IMAGENAME eq controlpad_server.exe" | find /i "controlpad_server.exe" > nul
if %errorlevel% equ 0 (
    echo Closing existing controlpad_server.exe process...
    taskkill /F /IM controlpad_server.exe > nul
)

REM Check if Node.js server is already running
tasklist /FI "IMAGENAME eq node.exe" | find /i "node.exe" > nul
if %errorlevel% equ 0 (
    echo Closing existing Node.js server process...
    taskkill /F /IM node.exe > nul
)

REM Run controlpad_server.exe
start "" "controlpad_server.exe"

REM Run Node.js server
node "controlpad_web_server.js"
