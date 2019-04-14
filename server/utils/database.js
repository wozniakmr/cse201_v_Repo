"use strict";
const mongoose = require("mongoose");
const assert = require("assert");
// require('../models');
const config = require('../../config');
const bcrypt = require('bcrypt');

mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true},
  (err) => {
      if (err) {
          let error_msg =
          `
          =====================================

           Error Connecting to Mongodb server

          =====================================
          `
          let hint =
          `
          Please make sure you either:
            1) have a mongodb server running on \x1b[1m\x1b[33m${process.env.MONGODB_PORT}\x1b[1m\x1b[37m
            2) specify the correct mongodb port number when prompted
          `

          console.log('\x1b[1m\x1b[31m%s\x1b[0m', error_msg)
          console.log('\x1b[1m\x1b[37m%s\x1b[0m\n\n', hint)
        }
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
