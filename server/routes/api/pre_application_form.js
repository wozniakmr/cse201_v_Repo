'use strict';
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('router: GET pre_application_form');
  res.render('pre_application_form', {

  });
});

module.exports = router;
