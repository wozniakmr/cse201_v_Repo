'use strict'
module.exports = {
  ensureAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user && req.user.group === 'admin') {
      return next()
    } else {
      req.flash('error', 'You are not authorized to access this resource.')
      res.redirect('/applications')
    }
  },
  ensureMod: function(req, res, next) {
    if (req.isAuthenticated() && req.user && req.user.group === 'mod') {
      return next()
    } else {
      req.flash('error', 'You are not authorized to access this resource.')
      res.redirect('/applications')
    }
  },
  ensureUser: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      req.flash('error', 'Only logged in users can post comments')
      res.redirect('/applications')
    }
  }
}
