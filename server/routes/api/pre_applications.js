'use strict';
const {PreApplication, Application} = require('../../models');
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Boom = require('boom');
const fs = require('fs')
const {ensureAdmin} = require('../../../config/auth')

const multer = require('multer')
const upload = multer({dest: './public/media/uploads'})

const router = express.Router();

// Get all pre_applications. Sorted by date added. Render pre_applications view
router.get('/', ensureAdmin, async (req, res) => {
  console.log('router: GET pre_applications')
  const preApplications = await loadAllPreApplications()
  res.render('pre_applications', {
    applications: preApplications,
    user: req.user
  })
});

// saves content of submitted form to pre_applications db
router.post('/', upload.single('image'), (req, res) => {
  console.log('router: POST pre_applications_form')
  // lowercase all strings
  for(let key of Object.keys(req.body)){
    if (key !== 'desc' && key != 'hyperlink' && typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].toLowerCase()
    }
  }
  if (req.file) {
    let filename = req.file.filename
    let id = saveToPreApplications(req.body)
    // rename uploaded file to the id of the pre_application
    fs.rename(`./public/media/uploads/${filename}`, `./public/media/uploads/${id}`, (err) => {
      if (err) {
        console.log(err)
        throw err
      }
    })
    res.status(200).send()
    res.redirect('/applications')
  } else {
    res.status(400).send()
    res.redirect('/pre_application_form')
  }
})


// pops the preApplication corresponding to id from preApplications db and
// pushes it to the applications db
router.get('/approve/:id', ensureAdmin, async (req, res) => {
  console.log("router: POST pre_applications/approve/:id")
  if (await pop(req.params.id)) {
    res.status(200).send()
    res.redirect('/pre_applications')
  }
  else {
    res.status(400).send()
    res.redirect('/pre_applications')
  }
})

router.get('/deny/:id', ensureAdmin, async (req, res) => {
  console.log("router: POST pre_applications/deny/:id")
  if (release(req.params.id)) {
    res.status(200).send()
    res.redirect('/pre_applications')
  } else {
    res.status(400).send()
    res.redirect('/pre_applications')
  }
})

// database operations
async function loadAllPreApplications() {
  try {
    return await PreApplication.find({}).sort({ dateAdded: 1 })
  } catch (e) {
    console.log(e)
  }
}

// used when a request form is submitted. Saves the request to pre_applications db
// stores null for media_path field
// returns id of created pre_application
function saveToPreApplications(formBody) {
  try {
    let pre_application = new PreApplication()
    pre_application.title = formBody.title
    pre_application.desc = formBody.description
    pre_application.genre = formBody.genre
    pre_application.platform = formBody.platform.trim().split(',').map(x => x.trim())
    pre_application.developer = formBody.developer
    pre_application.publisher = formBody.publisher
    pre_application.release = new Date(formBody.release.trim())
    pre_application.rating = formBody.rating
    pre_application.tags = formBody.tags.trim().split(',').map(x => x.trim())
    pre_application.version = formBody.version
    pre_application.price = Number(formBody.price)
    pre_application.hyperlink = formBody.hyperlink
    pre_application.dateAdded = new Date()
    pre_application.media_path = null

    pre_application.save()
    return pre_application._id


  } catch (e) {
    console.log(e)
    throw (e)
  }
}

// moves a pre_application with id to applications db. Moves image to proper dir
async function pop(id) {
  try {
    const ret = await PreApplication.findOne({ _id: ObjectId(id) })
    const application = new Application(ret)
    application.isNew = true
    await application.save()
    await PreApplication.deleteOne( {_id: ret._id} )
    fs.rename(`./public/media/uploads/${id}`, `./public/media/${id}`, (err) => {
      if (err) {
        console.log(err)
        throw (err)
      }
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

// remove a pre_applications with id. Deletes image
async function release(id) {
  try {
    await PreApplication.deleteOne( { _id: id} )
    fs.unlink(`./public/media/uploads/${id}`, (err) => {
      if (err) {
        console.log(err)
        throw (err)
      }
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}


module.exports = router;
