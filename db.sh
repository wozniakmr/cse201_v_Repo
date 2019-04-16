#!/usr/bin/env bash

if [ "${1}" != "" ]; then
    if [ "${1}" == "start" ]; then
        if [ -z ${MONGODB_PORT} ]; then
            echo -e "\e[0mOn which port is your \e[92mmongodb server\e[0m listening? (Something like \e[93m27018, 27019, 27020, \e[0metc.)"
            read input
            export MONGODB_PORT=$input
        fi
        tmux new-session -d -s 0 "mongod --dbpath .data/db --port ${MONGODB_PORT}"
        echo -e "Your mongodb server is running on port \e[96m${MONGODB_PORT}\e[0m"
    elif [ "${1}" == "stop" ]; then
        tmux kill-session -t 0
    fi
else
    echo -e "Please tell me whether to \e[91mstart\e[0m or \e[91mstop\e[0m the mongodb database"
fi
