'use strict';
const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
  user_id: {type: mongoose.Types.ObjectId},
  app_id: {type: mongoose.Types.ObjectId},
  uname: {type: String},
  user_media_path: {type: String},
  comment: {type: String},
  time: {type: Date, default: Date.now }
});

module.exports = mongoose.model('comments', commentModel);
