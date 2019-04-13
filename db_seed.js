'use strict';
const mongoose = require('mongoose')
const assert = require('assert')
const bcrypt = require('bcrypt')
const fs = require('fs')
const {hashPassword, comparePassword} = require('./server/utils/database')
const {Application, PreApplication, Comment, User} = require('./server/models')

function assoc_with_image (from_path, to_path, obj) {
  let id = obj._id
  fs.copyFile(from_path, to_path + id, (err) => {
    if (err) throw err
  })
}

// users seeding
let admin_user = new User({
  fname: 'test',
  lname: 'admin',
  uname: 'testadmin',
  pass: bcrypt.hashSync('pass', 11),
  group: 'admin',
  media_path: null
})
admin_user.save().then(() => {
  console.log("Created testadmin: ", admin_user)
})

let mod_user = new User({
  fname: 'test',
  lname: 'mod',
  uname: 'testmod',
  pass: bcrypt.hashSync('pass', 11),
  group: 'mod',
  media_path: null
})
mod_user.save().then( () => {
  console.log("Created testmod: ", mod_user)
})

let lower_user = new User({
  fname: 'test',
  lname: 'user',
  uname: 'testuser1',
  pass: bcrypt.hashSync('pass', 11),
  group: 'user',
  media_path: '/public/users/'
})
lower_user.save().then( () => {
  assoc_with_image('./db_seed_assets/test1.png', './public/users/', lower_user)
  console.log("Created testuser: ", lower_user)
})

let lower_user2 = new User({
  fname: 'test',
  lname: 'user',
  uname: 'testuser2',
  pass: bcrypt.hashSync('pass', 11),
  group: 'user',
  media_path: '/public/users/'
})
lower_user2.save().then( () => {
  assoc_with_image('./db_seed_assets/test2.gif', './public/users/', lower_user2)
  console.log("Created testuser2: ",  lower_user)
})

// used to seed many users which will be used for comment seeding
let lower_users = []
for (let i = 3; i < 23; i++) {
  let j = lower_users.push(
    new User({
      fname: 'test',
      lname: 'user',
      uname: `testuser${Math.floor(Math.random() * 10000000)}`,
      pass: bcrypt.hashSync('pass', 11),
      group: 'user'
    })
  )
  lower_users[j-1].save()
}


// application seeding
let app1 = new Application({
  title: 'hotline miami',
  desc: "Hotline Miami is a high-octane action game overflowing with raw brutality, hard-boiled gunplay and skull crushing close combat. Set in an alternative 1989 Miami, you will assume the role of a mysterious antihero on a murderous rampage against the shady underworld at the behest of voices on your answering machine. Soon you'll find yourself struggling to get a grip of what is going on and why you are prone to these acts of violence. Rely on your wits to choreograph your way through seemingly impossible situations as you constantly find yourself outnumbered by vicious enemies. The action is unrelenting and every shot is deadly so each move must be quick and decisive if you hope to survive and unveil the sinister forces driving the bloodshed. Hotline Miami’s unmistakable visual style, a driving soundtrack, and a surreal chain of events will have you question your own thirst for blood while pushing you to the limits with a brutally unforgiving challenge.",
  genre: 'action',
  platform: ['linux', 'macos', 'windows'],
  developer: 'dennaton games',
  publisher: 'devolver digital',
  release: new Date('01/01/10'),
  rating: 'm',
  tags: ['psychedelic', 'violent', 'indie', 'action'],
  version: '1.0',
  price: '9.99',
  hyperlink: 'https://store.steampowered.com/app/219150/Hotline_Miami/',
  dateAdded: new Date(),
  media_path: null
})
app1.save().then( () => {
  assoc_with_image('./db_seed_assets/hotline.jpg', './public/media/', app1)
  console.log("Created app1: ", app1)
})

let app2 = new Application({
  title: 'fistful of frags',
  desc: "Fistful of Frags was born years ago as a Wild West themed modification for Source engine. It has been completely renewed for its Steam release, paying special attention to combat mechanics. Also please note this is a completely *free* standalone mod, no micro-transactions exist, no registration required. Just install and play. You may see ads when joining certain third party servers that host our game for free. That's however completely unrelated to FoF dev team, we do not profit from them.",
  genre: 'fps',
  platform: ['linux', 'windows', 'macos'],
  developer: 'fistful of frags team',
  publisher: 'fistful of frags team',
  release: new Date('01/02/10'),
  rating: 'nr',
  tags: ['free to play', 'multiplayer', 'fps', 'western', 'action'],
  version: '1.0',
  price: 0.01,
  hyperlink: 'https://store.steampowered.com/app/265630/Fistful_of_Frags/',
  dateAdded: new Date(),
  media_path: null
})
app2.save().then( () => {
  assoc_with_image('./db_seed_assets/fof.jpg', './public/media/', app2)
  console.log("Created app2: ", app2)
})

let app3 = new Application({
  title: 'risk of rain 2',
  desc: "The classic multiplayer roguelike, Risk of Rain, returns with an extra dimension and more challenging action. Play solo, or team up with up to three friends to fight your way through hordes of monsters, unlock new loot, and find a way to escape the planet.",
  genre: 'action',
  platform: ['windows'],
  developer: 'hopoo games',
  publisher: 'gearbox publishing',
  release: new Date('01/03/10'),
  rating: 'nr',
  tags: ['early access', 'rogue-like', 'mutliplayer', 'co-op'],
  version: '1.0',
  price: '19.99',
  hyperlink: 'https://store.steampowered.com/app/632360/Risk_of_Rain_2/',
  dateAdded: new Date(),
  media_path: null
})
app3.save().then( () => {
  assoc_with_image('./db_seed_assets/ror.jpg', './public/media/', app3)
  console.log("Created app3: ", app3)
})

let app4 = new Application({
  title: 'terraria',
  desc: "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
  genre: 'action',
  platform: ['windows', 'macos', 'linux'],
  developer: 're-logic',
  publisher: 're-logic',
  release: new Date('01/04/10'),
  rating: 'nr',
  tags: ['sandbox', 'adventure', 'survival', '2D', 'crafting'],
  version: '1.0',
  price: '9.99',
  hyperlink: 'https://store.steampowered.com/app/105600/Terraria/',
  dateAdded: new Date(),
  media_path: null
})
app4.save().then( () => {
  assoc_with_image('./db_seed_assets/terr.jpg', './public/media/', app4)
  console.log("Created app4: ", app4)
})

let app5 = new Application({
  title: 'rimworld',
  desc: "A sci-fi colony sim driven by an intelligent AI storyteller. Inspired by Dwarf Fortress and Firefly. Generates stories by simulating psychology, ecology, gunplay, melee combat, climate, biomes, diplomacy, interpersonal relationships, art, medicine, trade, and more.",
  genre: 'strategy',
  platform: ['windows', 'macos', 'linux'],
  developer: 'ludeon studios',
  publisher: 'ludeon studios',
  release: new Date('01/05/10'),
  rating: 'nr',
  tags: ['base building', 'survival', 'strategy', 'sandbox', '2D'],
  version: '1.0',
  price: '34.99',
  hyperlink: 'https://store.steampowered.com/app/294100/RimWorld/',
  dateAdded: new Date(),
  media_path: null
})
app5.save().then( () => {
  assoc_with_image('./db_seed_assets/rim.jpg', './public/media/', app5)
  console.log("Created app5: ", app5)
})


// comments seeding with randomly selected users
let apps = [app1, app2, app3, app4, app5]
lower_users.forEach( (user) => {
  if (Math.random() < 0.75) {
    apps.forEach( (app) => {
      if (Math.random() < 0.75) {
        let comment = new Comment({
          user_id: user._id,
          app_id: app._id,
          uname: user.uname,
          user_media_path: user.media_path,
          comment: `This is a test comment. This comment was made by ${user.uname} with id ${user._id} on application ${app.title}`
        })
        comment.save().then( () => {
          console.log(`Comment made by ${user.uname} on ${app.title}`)
        })
      }
    })
  }
})


// pre_applications seeding
let papp1 = new PreApplication({
  title: 'rimworld',
  desc: "A sci-fi colony sim driven by an intelligent AI storyteller. Inspired by Dwarf Fortress and Firefly. Generates stories by simulating psychology, ecology, gunplay, melee combat, climate, biomes, diplomacy, interpersonal relationships, art, medicine, trade, and more.",
  genre: 'strategy',
  platform: ['windows', 'macos', 'linux'],
  developer: 'ludeon studios',
  publisher: 'ludeon studios',
  release: new Date('01/05/10'),
  rating: 'nr',
  tags: ['base building', 'survival', 'strategy', 'sandbox', '2D'],
  version: '1.0',
  price: '34.99',
  hyperlink: 'https://store.steampowered.com/app/294100/RimWorld/',
  dateAdded: new Date(),
  media_path: null
})
papp1.save().then( () => {
  assoc_with_image('./db_seed_assets/rim.jpg', './public/media/uploads/', papp1)
  console.log("Created pre_app1: ", papp1)
  mongoose.connection.close()
})
