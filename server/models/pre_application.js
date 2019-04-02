'use strict';
const mongoose = require('mongoose');

const preApplicationModel = mongoose.Schema({
  title: {type: String},
  desc: {type: String},
  genre: {type: String},
  platform: {type: Array},
  developer: {type: String},
  publisher: {type: String},
  release: {type: Date},
  rating: {type: String},
  tags: {type: Array},
  version: {type: String},
  price: {type: Number},
  hyperlink: {type: String},
  dateAdded: {type: Date},
  media_path: {type: String}
},
{timestamps: true
});

module.exports = mongoose.model('pre_applications', preApplicationModel);
