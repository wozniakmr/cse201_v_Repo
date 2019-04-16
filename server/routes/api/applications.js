'use strict';
const {Application, Comment} = require('../../models');
const express = require('express');
const mongoose = require('mongoose');
const Boom = require('boom');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const {ensureUser, ensureMod} = require('../../../config/auth')

// Get all applications
router.get('/', async (req, res) => {
  console.log('router: GET applications/');
  const applications = await loadAllApplications();
  res.render('applications', {
    applications: applications,
    user: req.user
  });
});

router.get('/sort/:sort', async (req, res) => {
  console.log(`router: GET applications sort: ${req.params.sort}`)
  let applications
  if (req.params.sort == 'price_hl') {
    applications = await Application.find({}).sort( {price: 1} )
  } else if (req.params.sort == 'price_lh') {
    applications = await Application.find({}).sort( {price: -1} )
  } else if (req.params.sort == 'newest') {
    applications = await Application.find({}).sort( {release: 1} )
  } else if (req.params.sort == 'reverse_alpha') {
    applications = await Application.find({}).sort( {title: -1} )
  }

  res.render('applications', {
    applications,
    user: req.user
  })

})

// Get all applications with value matching field
// if field is 'id' or only one application is found, returns loadSpecific()
// else returns loadAppApplicationsMatching()
router.get('/:key/:val', async (req, res) => {
  console.log(`router: GET ${req.params.key} ${req.params.val}`)
  if (req.params.key == 'id') {
    const ret = await loadSpecific(req.params.val);
    const applications = await loadAllApplications();
    res.render('application', {
      application: ret.application,
      comments: ret.comments,
      applications: applications,
      user: req.user
    })
  }
  else {
    let applications;
    if (req.params.key == 'tags') {
      applications = await searchByTags(req.params.val.split(' '))
      console.log('trigger')
    }
    else {
      applications = await loadAllApplicationsMatching(
        req.params.key,
        req.params.val
      );
    }
    if (applications.length == 1) {
      const ret = await loadSpecific(applications[0]._id)
      applications = await loadAllApplications()
      res.render('application', {
        application: ret.application,
        comments: ret.comments,
        applications: applications,
        user: req.user
      })
    } else {
      res.render('applications', {
        applications: applications,
        user: req.user
      });
    }
  }
});

// Adds a comment to comments database associated with 'id'
router.post('/id/:val/comment', ensureUser, async (req, res) => {
  console.log(`router: POST comment ${req.params.id}`)
    commentOn(req.user._id, req.params.val, req.user.uname, req.user.media_path, req.body.content.trim())
    const ret = await loadSpecific(req.params.val)
    res.status(200).json({
      application: ret.application,
      comments: ret.comments,
      user: req.user
    })
});

// removes a comment from comments database
router.get('/id/:val/del/:comment_id', ensureMod, async (req, res) => {
  console.log(`router: DELETE comment ${req.params.comment_id}`)
  if (removeComment(req.params.comment_id)) {
    const ret = await loadSpecific(req.params.val)
    res.status(200).json({
      application: ret.application,
      comments: ret.comments,
      user: req.user
    })
  }
  else {
    console.log('failed')
    res.status(400).send();
  }
});


// database operations
// returns an array of all application documents
async function loadAllApplications() {
  try {
    return await Application.find({}).sort({ title: 1 });
  } catch (e) {
    throw (e)
  }
}

// returns an array of all application documents with key matching val
async function loadAllApplicationsMatching(key, val) {
  try {
    return await Application.find(
      { [key]: new RegExp(val) }
    ).sort({ title: 1 });
  } catch (e) {
    throw (e)
  }
}

async function searchByTags(val_arr) {
  let regexes = val_arr.map(x => new RegExp(x));
  try {
    return await Application.find(
      { tags: { $all: regexes } }
    )
  } catch (e) {
    throw (e)
  }
}

// returns object consisting of application document and array of comments
async function loadSpecific(app_id) {
  try {
    const application = await Application.findById(app_id)
    const comments = await Comment.find({ app_id: ObjectId(app_id) });
    return {application, comments};
  } catch (e) {
    throw (e)
  }
}

// if comment hasn't already posted, then it's saved in the comments db
function commentOn(user_id, app_id, uname, media_path, content) {
    Comment.findOne({
      comment: content,
      app_id: ObjectId(app_id),
      user_id: ObjectId(user_id)
    }).then(comment => {
      if (comment) {
        errors.push("Stop spamming comments.")
      } else {
        const comment = new Comment({
          user_id: ObjectId(user_id),
          app_id: ObjectId(app_id),
          uname: uname,
          user_media_path: media_path,
          comment: content
        });
        comment.save()
      }
    })
}

async function removeComment(comment_id) {
  try {
    await Comment.deleteOne( { _id: ObjectId(comment_id ) } );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = router;
