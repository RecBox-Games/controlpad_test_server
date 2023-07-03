#!/bin/bash

function kill_process_by_name() {
    pattern=$1
    pids=$(ps aux | grep "$pattern" | grep -v grep | awk '{print $2}')
    for pid in $pids; do
        kill -9 $pid
        echo "Killed process $pid"
    done
}

kill_process_by_name "controlpad_server"
kill_process_by_name "controlpad_web_server.js"

if [[ "$1" == "-x" ]]; then
    exit
fi

./controlpad_server &
node controlpad_web_server.js
