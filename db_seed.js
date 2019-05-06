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
  release: new Date('1/1/10'),
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
  release: new Date('1/2/10'),
  rating: 'nr',
  tags: ['free to play', 'multiplayer', 'fps', 'western', 'action'],
  version: '1.0',
  price: 0.00,
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
  release: new Date('1/3/10'),
  rating: 'nr',
  tags: ['early access', 'rogue-like', 'multiplayer', 'co-op'],
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
  release: new Date('1/4/10'),
  rating: 'nr',
  tags: ['sandbox', 'adventure', 'survival', '2d', 'crafting'],
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
  release: new Date('1/5/10'),
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

let app6 = new Application({
  title: 'grand theft auto v',
  desc: "Los Santos is a city of bright lights, long nights and dirty secrets, and they don’t come brighter, longer or dirtier than in GTA Online: After Hours. The party starts now.",
  genre: 'action',
  platform: ['windows', 'macos', 'linux'],
  developer: 'rockstar games',
  publisher: 'rockstar games',
  release: new Date('1/6/10'),
  rating: 'nr',
  tags: ['free roam', 'role playing', 'adventure', 'sandbox'],
  version: '1.0',
  price: '29.99',
  hyperlink: 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/',
  dateAdded: new Date(),
  media_path: null
})
app6.save().then( () => {
  assoc_with_image('./db_seed_assets/gta.jpg', './public/media/', app6)
  console.log("Created app6: ", app6)
})

let app7 = new Application({
  title: 'rocket league',
  desc: "Soccer meets driving once again in the long-awaited, physics-based multiplayer-focused sequel to Supersonic Acrobatic Rocket-Powered Battle-Cars! Choose a variety of high-flying vehicles equipped with huge rocket boosters to score amazing aerial goals and pull-off incredible game-changing saves! ",
  genre: 'sports',
  platform: ['windows', 'macos', 'linux'],
  developer: 'psyonix inc',
  publisher: 'psyonix inc',
  release: new Date('1/7/10'),
  rating: 'nr',
  tags: ['sports', 'driving', 'racing', 'soccer', 'multiplayer'],
  version: '1.0',
  price: '19.99',
  hyperlink: 'https://store.steampowered.com/app/252950/Rocket_League/',
  dateAdded: new Date(),
  media_path: null
})
app7.save().then( () => {
  assoc_with_image('./db_seed_assets/rocket.jpg', './public/media/', app7)
  console.log("Created app7: ", app7)
})

let app8 = new Application({
  title: 'cuphead',
  desc: "Cuphead is a classic run and gun action game heavily focused on boss battles. Inspired by cartoons of the 1930s, the visuals and audio are painstakingly created with the same techniques of the era, i.e. traditional hand drawn cel animation, watercolor backgrounds, and original jazz recordings.",
  genre: 'platformer',
  platform: ['windows', 'macos', 'linux'],
  developer: 'studio mdhr entertainment inc.',
  publisher: 'studio mdhr entertainment inc.',
  release: new Date('1/8/10'),
  rating: 'nr',
  tags: ['2D', 'platformer', 'cartoon', 'difficult'],
  version: '1.0',
  price: '19.99',
  hyperlink: 'https://store.steampowered.com/app/268910/Cuphead/?curator_clanid=1370293',
  dateAdded: new Date(),
  media_path: null
})
app8.save().then( () => {
  assoc_with_image('./db_seed_assets/cuphead.jpg', './public/media/', app8)
  console.log("Created app8: ", app8)
})

let app9 = new Application({
  title: 'mortal kombat 11',
  desc: "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
  genre: 'fighting',
  platform: ['windows', 'macos', 'linux'],
  developer: 'netherrealm studios',
  publisher: 'warner bros interactive entertainment',
  release: new Date('1/9/10'),
  rating: 'nr',
  tags: ['fighting', 'gore', 'violent', 'multiplayer'],
  version: '1.0',
  price: '59.99',
  hyperlink: 'https://store.steampowered.com/app/976310/Mortal_Kombat11/',
  dateAdded: new Date(),
  media_path: null
})
app9.save().then( () => {
  assoc_with_image('./db_seed_assets/mk11.jpg', './public/media/', app9)
  console.log("Created app9: ", app9)
})

let app10 = new Application({
  title: 'playerunknown\'s battlegrounds',
  desc: "PLAYERUNKNOWN'S BATTLEGROUNDS is a battle royale shooter that pits 100 players against each other in a struggle for survival. Gather supplies and outwit your opponents to become the last person standing.",
  genre: 'survival',
  platform: ['windows', 'macos', 'linux'],
  developer: 'pubg corporation',
  publisher: 'pubg corporation',
  release: new Date('1/10/10'),
  rating: 'nr',
  tags: ['battle royale', 'survival', 'shooter', 'multiplayer', 'pvp'],
  version: '1.0',
  price: '29.99',
  hyperlink: 'https://store.steampowered.com/app/578080/PLAYERUNKNOWNS_BATTLEGROUNDS/',
  dateAdded: new Date(),
  media_path: null
})
app10.save().then( () => {
  assoc_with_image('./db_seed_assets/pubg.jpg', './public/media/', app10)
  console.log("Created app10: ", app10)
})

let app11 = new Application({
  title: 'fallout 4',
  desc: "Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.",
  genre: 'rpg',
  platform: ['windows', 'macos', 'linux'],
  developer: 'bethesda game studios',
  publisher: 'bethesda game studios',
  release: new Date('1/11/10'),
  rating: 'nr',
  tags: ['open world', 'rpg', 'shooter', 'exploration', 'post apocalyptic'],
  version: '1.0',
  price: '29.99',
  hyperlink: 'https://store.steampowered.com/app/377160/Fallout_4/',
  dateAdded: new Date(),
  media_path: null
})
app11.save().then( () => {
  assoc_with_image('./db_seed_assets/fallout4.jpg', './public/media/', app11)
  console.log("Created app11: ", app11)
})

let app12 = new Application({
  title: 'legal dungeon',
  desc: "Legal Dungeon is a game about organizing Police Investigation Documents. The player must review and provide an Investigation Verdict on reports ranging from petty theft to murder, in eight different criminal cases. Weigh the value of people’s lives to unlock all the collectables.",
  genre: 'adventure',
  platform: ['windows', 'macos', 'linux'],
  developer: 'somi',
  publisher: 'somi',
  release: new Date('1/12/10'),
  rating: 'nr',
  tags: ['adventure', 'indie', 'simulation'],
  version: '1.0',
  price: '6.99',
  hyperlink: 'https://store.steampowered.com/app/1013750/Legal_Dungeon/',
  dateAdded: new Date(),
  media_path: null
})
app12.save().then( () => {
  assoc_with_image('./db_seed_assets/dungeon.jpg', './public/media/', app12)
  console.log("Created app12: ", app12)
})

let app13 = new Application({
  title: 'dodge the wall',
  desc: "Use your brain and your dexterity to fit through the hole in The Wall!",
  genre: 'casual',
  platform: ['windows', 'macos', 'linux'],
  developer: 'space dog xr',
  publisher: 'space dog xr',
  release: new Date('1/13/10'),
  rating: 'nr',
  tags: ['casual', 'indie', 'vr'],
  version: '1.0',
  price: '0.00',
  hyperlink: 'https://store.steampowered.com/app/1061600/Dodge_the_Wall/',
  dateAdded: new Date(),
  media_path: null
})
app13.save().then( () => {
  assoc_with_image('./db_seed_assets/dodge.jpg', './public/media/', app13)
  console.log("Created app13: ", app13)
})

let app14 = new Application({
  title: 'planes attack',
  desc: "Your homeland sky is under attack. Will you defend it?",
  genre: 'casual',
  platform: ['windows', 'macos', 'linux'],
  developer: 'srs games',
  publisher: 'srs games',
  release: new Date('1/14/10'),
  rating: 'nr',
  tags: ['casual', 'indie', 'simulation', 'planes'],
  version: '1.0',
  price: '6.99',
  hyperlink: 'https://store.steampowered.com/app/1053000/PLANES_ATTACK/',
  dateAdded: new Date(),
  media_path: null
})
app14.save().then( () => {
  assoc_with_image('./db_seed_assets/planes.jpg', './public/media/', app14)
  console.log("Created app14: ", app14)
})

// comments seeding with randomly selected users
let apps = [app1, app2, app3, app4, app5, app6, app7, app8, app9, app10, app11, app12, app13, app14]

apps.forEach( (app) => {
    let comment = new Comment({
        user_id: lower_user._id,
        app_id: app._id,
        uname: lower_user.uname,
        user_media_path: lower_user.media_path,
        comment: `This is a test comment. This comment was made by ${lower_user.uname} on application ${app.title}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad`
    })
    comment.save().then( () => {
        console.log(`Comment made by ${lower_user.uname} on ${app.title}`)
    })
    comment = new Comment({
        user_id: lower_user2._id,
        app_id: app._id,
        uname: lower_user2.uname,
        user_media_path: lower_user2.media_path,
        comment: `This is a test comment. This comment was made by ${lower_user2.uname} on application ${app.title}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad`
    })
    comment.save().then( () => {
        console.log(`Comment made by ${lower_user2.uname} on ${app.title}`)
    })
})

lower_users.forEach( (user) => {
  if (Math.random() < 0.75) {
    apps.forEach( (app) => {
      if (Math.random() < 0.5) {
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
