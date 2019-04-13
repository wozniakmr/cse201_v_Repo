#!/usr/bin/env bash
alias node='./node_modules/node/bin/node'
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

echo -e "\e[91mEnd Database Seeding"
echo -e "\e[97m\n\n\nRun the following commands in the ROOT of the project:\n\
1) \e[97mEnsure a mongodb session is running. Read the README if you can't figure this out\n\
2) In a separate session (use tmux or ssh again):\n\
   \e[92malias node='./node_modules/node/bin/node'\n\
   \e[92mPORT = XXXXX npm run start \e[93m(where XXXXX is some high port that no processes are listening on. e.g. 65499, 65500, etc.)\n\
\e[97m3) If all is well, the project is running and you can access it at \e[96m134.53.148.193:XXXXX\e[97m assuming you are on miami's network"
