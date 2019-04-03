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

1. Run __init.sh__ to populate user credentials
2. In the root of the project: 
```bash
$mongod --dbpath=.data/db --port 27018
```
3. In another terminal/session in the root of the project:
```bash
$npm run start
```
The project will be run locally and you can access it at localhost:3000
