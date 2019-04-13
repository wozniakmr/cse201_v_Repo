#!/usr/bin/env bash

trap 'echo -ne "\e[92m"' DEBUG

echo -e "\e[0mOn which port is your mongodb server listening? (Something like \e[93m27018, 27019, 27020, \e[0metc.)"
read input
export MONGODB_PORT=$input

echo -e "\e[0mOn which port would you like to run this project? (\e[93m65499, 65500, 65501,\e[0m \
or some other port other processes are not using)"
read input
export PORT=$input

echo -e "\e[0mIf the information you've submitted is correct and you have a mongodb server currently running at \
\e[92m$MONGODB_PORT, \e[0mthis project is being served to \e[96mhttp://134.53.148.193:$PORT \e[0m"

alias node='./node_modules/node/bin/node'
npm run start
