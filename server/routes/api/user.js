'use strict';
const {User} = require('../../models');
const {hashPassword, comparePassword} = require('../../utils/database')
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs')
const bcrypt = require('bcrypt')
const passport = require('passport')
const multer = require('multer')
const upload = multer({dest: './public/media/uploads'})
const {ensureUser} = require('../../../config/auth')

const router = express.Router();

router.get('/signup', async (req, res) => {
  console.log('router: GET /signup')
  res.render('signup_form', {

  })
})

router.post('/signup', upload.single('image'), (req, res) => {
  console.log("router: POST /signup")
  const {fname, lname, uname, pass1, pass2} = req.body
  let errors = []

  // don't need to check if all fields are filled, because this is done clientside
  if (pass1 !== pass2) {
    errors.push("Passwords don't match.")
    res.render('signup_form', {
      errors,
      fname,
      lname,
      uname
    })
  } else {
    User.findOne({ uname: uname }).then(user => {
      if (user) {
        errors.push("Username already taken.")
        res.render('signup_form', {
          errors,
          fname,
          lname,
          uname
        })
      } else {
        if (! req.file) {
          saveToUsers(fname, lname, uname, pass1, 'user', null)
          req.flash('success_msg', 'You have been successfully registered. Please log in.')
          res.status(200).send()
          res.redirect('/applications')
        } else {
          let filename = req.file.filename
          let id = saveToUsers(fname, lname, uname, pass1, 'user', '/public/users/')
          fs.rename(`./public/media/uploads/${filename}`, `./public/users/${id}`, (err) => {
            if (err) {
              console.log(err)
              throw err
            }
          })
          req.flash('success_msg', 'You have been successfully registered. Please log in.')
          res.status(200).send()
          res.redirect('/applications')
        }
      }
    })
  }
})

router.post('/login', (req, res, next) => {
  console.log("router: POST /login")
  passport.authenticate('local', {
    successRedirect: 'back',
    failureRedirect: 'back',
    failureFlash: true
  })(req, res, next);
})

router.get('/logout', ensureUser, (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully logged out.')
  res.redirect('back')
})

// database operations

function saveToUsers(fname, lname, uname, pass, group, media_path) {
  try {
    let new_user = new User()
    new_user.fname = fname
    new_user.lname = lname
    new_user.uname = uname
    new_user.pass = bcrypt.hashSync(pass, 11)
    new_user.group = group
    new_user.media_path = media_path
    new_user.save()
    return new_user._id
  } catch (e) {
    console.log(e)
    throw (e)
  }
}


module.exports = router;
