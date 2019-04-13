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

__If you are running this on Miami's ceclnx server, you do not need to install these.__

All node modules are included in this repository, so the only dependencies necessary to run this project are
nodejs and npm. I think npm distributes node with their sofware so you should try that. 
[link](https://www.npmjs.com/get-npm).

### Running
1. Ensure a mongodb session is running in a session if one isn't running already. 
This __always__ needs to be running. Replace XXXXX with a port like 27018, 27019, 27020, 27021, etc.
```
mongod --dbpath .data/db --port XXXXX
```
2. If this is your first time running the project or you'd like to clear the database, in a session outside
of the session running your mongodb server, run init.sh 
```
./init.sh
```
3. To serve the project, run run.sh. Read its output to get the url it's being served to.
```
./run.sh
```
