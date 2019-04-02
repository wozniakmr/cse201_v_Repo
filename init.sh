#!/usr/bin/env bash
echo -e "\e[32mEnsure a mongodb server is running in local project: mongod --dbpath=.data/db --port 27018\e[31m"
mongo localhost:27018/vrepo_db --eval "db.dropDatabase();"
node db_seed.js

mongo localhost:27018/vrepo_db --eval "db.users.findOne({ uname: 'davidwimmel' })._id"
mongo localhost:27018/vrepo_db --eval "db.applications.findOne({ title: 'hotline miami' })._id"

echo -e "\e[32mEnd"

