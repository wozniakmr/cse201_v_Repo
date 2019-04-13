"use strict";
module.exports = {
  MONGODB_URL: (process.env.MONGODB_PORT) ?
    `mongodb://localhost:${process.env.MONGODB_PORT}/vrepo_db` :
    'mongodb://localhost:27018/vrepo_db',
  SECRET_KEY: "-'+?)ni'y$material'0Mfaf}tE#A%]Q<carrot[q.F_E/A=F~g~aVr]Jo#turtle'1hsb*=7_)gFk-tff"
}
