"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./utils/database'); // this will connect to the mongodb server
const {SECRET_KEY} = require('../config')

const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

require('../config/passport')(passport)

const app = express();


// Middleware
// bodyparser and cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

// layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

// express session
app.use(
  session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

// global vars
app.use( (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error');
  next();
})

// static files
app.use('/public/', express.static('public'));

// routes
const application_route = require('./routes/api/applications');
const user_route = require('./routes/api/user');
const pre_application_route = require('./routes/api/pre_applications');
const pre_application_form_route = require('./routes/api/pre_application_form');

// app.use('/', application_route)
app.use('/applications', application_route);
app.use('/pre_applications', pre_application_route);
app.use('/user', user_route);
app.use('/pre_application_form', pre_application_form_route);
app.use(express.Router().get('/', async (req, res) => {
  res.redirect('/applications')
}))

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
