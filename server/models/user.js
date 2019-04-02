'use strict';
const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  fname: {type: String},
  lname: {type: String},
  uname: {type: String},
  group: {type: String},
  pass: {type: String},
  media_path: {type: String}
},
{timestamps: true
});


module.exports = mongoose.model('users', userModel);
