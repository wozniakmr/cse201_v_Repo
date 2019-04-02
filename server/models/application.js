'use strict';
const mongoose = require('mongoose');

const applicationModel = mongoose.Schema({
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
  media_path: {type: String}
},
{
  timestamps: true
});

module.exports = mongoose.model('applications', applicationModel);
