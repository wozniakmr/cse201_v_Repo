"use strict";
const mongoose = require("mongoose");
const assert = require("assert");
// require('../models');
const config = require('../../config');
const bcrypt = require('bcrypt');

mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true},
  (err) => {
    assert.equal(null, err);
  }
);


const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(11, (err, salt) => {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  });
}

const comparePassword = (raw, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(raw, hash, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
}


module.exports = {
  hashPassword,
  comparePassword
}
