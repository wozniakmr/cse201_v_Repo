#!/usr/bin/env bash
echo -e "\e[91mRemoving all images in /public/media and /public/users"
find ./public/media/ -type f -not -name '*.git*' | xargs rm
find ./public/users/ -type f -not -name '*.git*' | xargs rm

echo -e "\e[32mEnsure a mongodb server is running in local project: \e[97mmongod \
--dbpath=.data/db --port 27018\e[39m"
mongo localhost:27018/vrepo_db --eval "db.dropDatabase();"
node db_seed.js

echo -e "\e[96mPassword for all seeded users is: \e[92m'pass'\e[96m.\n\
Useful usernames are: \e[92mtestadmin, testmod, testuser1, testuser2"
echo -e "\e[97m"
mongo localhost:27018/vrepo_db --eval "db.users.find({ uname: {\$in: \
['testadmin', 'testmod', 'testuser1', 'testuser2']} }).pretty()"

echo -e "\e[32mEnd Database Seeding"
