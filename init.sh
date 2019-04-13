#!/usr/bin/env bash
NODE=./node_modules/node/bin/node

# we do this incase user is executing this script on a session without the MONGODB_PORT env var
echo -e "On which port is your mongodb server listening? (Something like \e[93m27018, 27019, 27020,\e[0m etc.)"
read input
export MONGODB_PORT=$input

echo -e "\e[91mRemoving all images in /public/media and /public/users"
find ./public/media/ -type f -not -name '*.git*' | xargs rm
find ./public/users/ -type f -not -name '*.git*' | xargs rm

echo -e "\e[32mEnsure a mongodb server is running in local project: \e[97mmongod \
--dbpath=.data/db --port $MONGODB_PORT\e[39m"
mongo localhost:$MONGODB_PORT/vrepo_db --eval "db.dropDatabase();"
$NODE db_seed.js

echo -e "\e[96mPassword for all seeded users is: \e[92m'pass'\e[96m.\n\
Useful usernames are: \e[92mtestadmin, testmod, testuser1, testuser2"
echo -e "\e[97m"
mongo localhost:$MONGODB_PORT/vrepo_db --eval "db.users.find({ uname: {\$in: \
['testadmin', 'testmod', 'testuser1', 'testuser2']} }).pretty()"

echo -e "\e[91mEnd Database Seeding"
echo -e "\e[97m\nIf this was successful, you should now run \e[96mrun.sh"
