# CSE201 vRepo

### Description

A repository for video games. Written in nodejs/express. Stores data in mongodb database. HTML is dynamically
generated server side and asynchronously updated. Implements a variety of user groups with differing privileges:

__non-authenticated:__
- can suggest apps through a form submission
- can filter apps and view comments.
- can sign up to be a standard user

__standard user:__
- can comment on apps

__moderator:__
- can delete comments

__admin:__
- can view pending app queue and approve/deny application submissions

### Dependencies

All node modules are included in this repository, so the only dependencies necessary to run this project are
nodejs and npm. I think npm distributes node with their sofware so you should try that. [link](https://www.npmjs.com/get-npm)

### Running

1. Ensure a mongodb session is running in a separate/detached session if one isn't running already. This __always__ needs to be running.
```
mongod --dbpath .data/db --port 27018
```
2. Run __init.sh__ to seed the database
3. Read the message printed out by this script at the bottom. Follow its instructions. Basically,
you need to start the mongodb server in a separate session,
alias node to our local binary in /node_modules because the global binary on ceclnx is outdated,
then npm run start while specifying a port number as an env variable (e.g. PORT=65400 npm run start)
