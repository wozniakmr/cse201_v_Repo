'use strict';
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const assert = require('assert');
const {MONGODB_URL} = require('./config');

const client = new MongoClient(MONGODB_URL, {useNewUrlParser: true});

// Creates database, collections, and default entries used in application
client.connect( (err) => {
  assert.equal(null, err);
  console.log("Successful connection with mongodb");

  const db = client.db("vrepo_db");
  // 3 test users with different privilege levels
  db.collection("users").insertMany([
    {
      fname: 'alfred',
      lname: 'admin',
      uname: 'alfredadmin',
      group: 'admin',
      pass: bcrypt.hashSync('admin pass', 11),
      media_path: null
    },
    {
      fname: 'martha',
      lname: 'mod',
      uname: 'marthamod',
      group: 'mod',
      pass: bcrypt.hashSync('mod pass', 11),
      media_path: null
    },
    {
      fname: 'david',
      lname: 'wimmel',
      uname: 'davidwimmel',
      group:  'user',
      pass: bcrypt.hashSync('david pass', 11),
      media_path: null
    }
  ], (err, result) => {
    assert.equal(null, err);
    console.log("Inserted users");
  });

  // TODO: may want to change media_path to a field which stores a BSON document or BinData (or something else) for storing .jpg files
  // TODO: this will allow users to submit images rather than relying on manually adding images to some '/images' dir
  // 3 video game applications with different fields
  db.collection("applications").insertMany([
    {
      title: 'test_app1',
      desc:  'test_app1 description. This is a description for test_app1',
      genre: 'fps',
      platform: ['linux', 'macos', 'windows'],
      developer: 'app1_dev',
      publisher: 'app1_pub',
      release: new Date(2018, 1, 1),
      rating: 'E',
      tags: ['tag1', 'tag2', 'tag3', 'test_app1'],
      version: 1.2,
      price: 12.99,
      hyperlink: 'test_app1_url',
      media_path: '/'
    },
    {
      title: 'test_app2',
      desc:  'test_app2 description. This is a description for test_app2',
      genre: 'rpg',
      platform: ['linux'],
      developer: 'app2_dev',
      publisher: 'app2_pub',
      release: new Date(2019, 12, 12),
      rating: 'T',
      tags: ['tag1', 'tag2', 'tag3', 'test_app2'],
      version: 0.4,
      price: 9.99,
      hyperlink: 'test_app2_url',
      media_path: '/'
    },
    {
      title: 'hotline miami',
      desc:  "Hotline Miami is a high-octane action game overflowing with raw brutality, hard-boiled gunplay and skull crushing close combat.",
      genre: 'action',
      platform: ['linux', 'macos', 'windows'],
      developer: "Dennaton Games",
      publisher: "Devolver Digital",
      release: new Date(2012, 10, 23),
      rating: 'M',
      tags: ['great soundtrack', 'action', 'indie', 'psychedelic', 'difficult',
       'Top-Down Shooter'],
      version: 1.2,
      price: 12.99,
      hyperlink: 'test_app1_url',
      media_path: '/'
    },
  ], (err, result) => {
    assert.equal(null, err);
    console.log("Inserted applications");
  });


  db.collection("comments").insertMany([
    {
      user_id: 'xxx',
      app_id: 'xxx',
      comment: "This is a test comment by David Wimmel for the game Hotline Miami. Is it displaying? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ], (err, result) => {
    assert.equal(null, err);
    console.log("Inserted comments");
  });

  db.collection("pre_applications").insertMany([
    {
      title: 'submitted_app',
      desc: 'desc for submitted_app',
      genre: 'some genre',
      platform: ['linux'],
      developer: 'some developer',
      publisher: 'some publisher',
      release: new Date(2019, 2, 3),
      rating: 'E',
      tags: ['tag1', 'tag2'],
      version: 1.0,
      price: 10.99,
      hyperlink: 'some link',
      date_added: new Date(),
      media_path: '/'
    }
  ], (err, result) => {
    assert.equal(null, err);
    console.log('Inserted pre-applicaitons');
  });

  console.log("===done");
  client.close();
});
