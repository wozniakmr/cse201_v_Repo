'use strict'
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {User} = require('../server/models')


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'uname', passwordField: 'pass' }, (uname, pass, done) => {
      User.findOne({
        uname: uname
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Either the username or password you entered is incorrect' })
        } else {
          bcrypt.compare(pass, user.pass, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Either the username or password you entered is incorrect' })
            }
          })
        }
      })
    })
  )
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}
